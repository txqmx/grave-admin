<template>
  <div :class="$options.name">
    <el-dialog
      v-if="dialogVisible"
      v-model="dialogVisible"
      width="700px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div class="cropper_scale">
        <el-radio-group v-model="scale" @change="scaleChange">
          <el-radio
            v-for="item in scaleList"
            :key="item.value"
            :label="item.value"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </div>
      <div class="cropper-container">
        <div class="cropper_left">
          <vue-cropper
            ref="cropper"
            :img="option.img"
            :output-size="option.size"
            :output-type="option.outputType"
            :info="true"
            :full="option.full"
            :can-move="option.canMove"
            :can-move-box="option.canMoveBox"
            :fixed-box="option.fixedBox"
            :original="option.original"
            :auto-crop="option.autoCrop"
            :auto-crop-width="option.autoCropWidth"
            :auto-crop-height="option.autoCropHeight"
            :center-box="option.centerBox"
            :high="option.high"
            :info-true="option.infoTrue"
            @realTime="realTime"
            :enlarge="option.enlarge"
            :fixed="option.fixed"
            :fixed-number="option.fixedNumber"
          />
        </div>
        <!-- 预览 -->
        <div class="cropper_right">
          <div class="prive-el">
            <div class="preview" :style="previews.div">
              <img :src="previews.url" :style="previews.img" />
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="saveImg">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import { VueCropper } from 'vue-cropper';
import 'vue-cropper/dist/index.css';
export default defineComponent({
  name: 'Cropper',
  components: {
    VueCropper,
  },
  data() {
    return {
      previews: {},
      scale: 0,
      scaleList: [
        { value: 0, label: '自动', scale:[]},
        { value: 1, label: '4:3', scale:[4,3]},
        { value: 3, label: '3:4(头像)', scale:[3,4]},
        { value: 4, label: '16:9(轮播图)', scale:[16,9]},
        { value: 5, label: '9:16', scale:[9,16]},
        { value: 6, label: '1:1', scale:[1,1]},
      ],
      option: {
        img: '', // 裁剪图片的地址
        size: 1, // 裁剪生成图片的质量
        info: true, // 裁剪框的大小信息
        full: false, // 是否输出原图比例的截图 默认false
        outputType: 'jpeg', // 裁剪生成图片的格式 默认jpg
        canMove: true, // 上传图片是否可以移动
        fixedBox: false, // 固定截图框大小 不允许改变
        original: false, // 上传图片按照原始比例渲染
        canMoveBox: true, // 截图框能否拖动
        autoCrop: true, // 是否默认生成截图框
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 300, // 默认生成截图框宽度
        autoCropHeight: 300, // 默认生成截图框高度
        centerBox: true, // 截图框是否被限制在图片里面
        high: false, // 是否按照设备的dpr 输出等比例图片
        enlarge: 1, // 图片根据截图框输出比例倍数
        mode: 'contain', // 图片默认渲染方式
        maxImgSize: 2000, // 限制图片最大宽度和高度
        // limitMinSize: [112, 112], // 更新裁剪框最小属性
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        fixed: false, // 是否开启截图框宽高固定比例  (默认:true)
        fixedNumber: [], // 截图框的宽高比例
        canScale: true,
      },
      dialogVisible: false,
      file: '',
      success: () => {}, // 回调方法
    };
  },
  methods: {
    // 初始化数据
    initCropper(file, options) {
      console.log('裁剪前', file);
      this.file = file;
      this.option.img = window.URL.createObjectURL(file);
      this.option = Object.assign(this.option, options);
      if (options.success) {
        this.success = options.success;
      }
      this.dialogVisible = true;
    },
    // 切换比例
    scaleChange(val){
      this.option.fixed = !!val
      let cur =  this.scaleList.find(item => item.value == val)
      this.option.fixedNumber = cur.scale
      this.$refs.cropper.refresh()
    },
    // 裁剪时触发的方法，用于实时预览
    realTime(data) {
      this.previews = data;
    },
    // 取消关闭弹框
    handleClose() {
      this.dialogVisible = false;
      this.$emit('colse-dialog', false);
    },
    // 获取裁剪之后的图片，默认blob，也可以获取base64的图片
    saveImg() {
      this.$refs.cropper.getCropBlob((data) => {
        let file = new File([data], this.file.name, { type: 'image/jpeg' });
        console.log('裁剪后', file);
        this.success(file);
        this.dialogVisible = false;
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.cropper-container {
  overflow: auto;
  display: flex;
  justify-content: space-between;
  .cropper_left {
    height: 300px;
    width: 300px;
  }
  .cropper_right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;

    .prive-el {
      height: 300px;
      width: 300px;
      text-align: center;
      overflow: hidden;
      background: #ededed;
      border: 1px solid #ededed;
      display: flex;
      align-items: center;
      justify-content: center;
      .preview {
        overflow: hidden;
      }
    }
  }
}
</style>
