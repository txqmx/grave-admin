<template>
  <div class="timeline_container">
    <el-button v-if="!timeList.length" @click="add">添加</el-button>
    <div v-else class="input_group" v-for="(item, index) in timeList" :key="index">
      <div class="input_item">
        <el-input v-model="item.timestamp" placeholder="请输入时间"></el-input>
      </div>
      <div class="input_item">
        <el-input v-model="item.content" autosize type="textarea" placeholder="请输入事迹"></el-input>
      </div>
      <div class="timeline_action">
        <el-icon @click="add(item)">
          <Plus />
        </el-icon>
        <el-icon @click="remove(item)">
          <Minus />
        </el-icon>
      </div>
    </div>
</div>
</template>

<script>
import { defineComponent } from 'vue';
import { Plus, Minus } from '@element-plus/icons-vue';
export default defineComponent({
  name: 'TimelineEditor',
  components: { Plus, Minus },
  inject: ['inputWidth'],
  data() {
    return {
      timeList: []
    }
  },
  props: {
    modelValue: {
      default: '',
    },
  },
  watch: {
    modelValue(val) {
      this.timeList = val ? JSON.parse(val) : []
    },
    timeList: {
      handler(val) {
        let res = null
        if (val && Array.isArray(val) && val.length) {
          res = JSON.stringify(val)
        }
        this.$emit('update:modelValue', res);
      },
      deep: true
    }
  },
  methods: {
    add(row) {
      let newItem = {
        timestamp: '',
        content: ''
      }
      let index = this.timeList.findIndex(item => item === row)
      this.timeList.splice(index + 1, 0, newItem)
    },
    remove(row) {
      let index = this.timeList.findIndex(item => item === row)
      this.timeList.splice(index, 1)
    }
  }
});
</script>

<style lang="scss" scoped>
.timeline_container {
  .input_group {
    display: flex;
    align-items: start;

    .input_item {
      display: flex;
      // display: inline-block;
      vertical-align: top;
      width: 380px;
      margin-bottom: 15px;

      &:first-child {
        width: 200px;
        margin-right: 20px;
      }
    }

    .timeline_action {
      i {
        cursor: pointer;
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-left: 10px;
      }
    }
  }
}
</style>
