<template>
  <div>
    <el-upload
      v-model:file-list="fileList"
      accept="image/*"
      ref="fileUpload"
      :action="`${baseUrl}/api/file/upload`"
      list-type="picture-card"
      :on-success="uploadSuccess"
    >
      <el-icon>
        <Plus />
      </el-icon>
    </el-upload>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import {baseUrl} from '../api/index.js'
export default defineComponent({
  name: 'ImgUpload',
  components: { Plus },
  data() {
    return {
      baseUrl: baseUrl
    };
  },
  mounted(){
    console.log(this.modelValue)
  },
  props:["modelValue"],
  computed:{
    fileList:{
        get(){
          if(this.modelValue){
            return this.modelValue.map(item => {
                return {name: '', url: item}
            })
          } else {
            return []
          }    
        }
    }
  },
  methods:{
    uploadSuccess(res, file, files){
        if(res.status === 200){
            this.$emit("update:modelValue", [...this.modelValue, res.data.fileUrl])
        }  
    }
  }
});
</script>

<style></style>
