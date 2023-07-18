<template>
  <div class="editorWrapper">
    <div class="editor-container">
                <codeJson :model-value="value"></codeJson>
              </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
import codeJson from '../components/Editor/codeJson.vue'

const jsonData =
  '[{"_id":"post 1","author":"Bob","content":"...","page_views":5},{"_id":"post 2","author":"Bob","content":"...","page_views":9},{"_id":"post 3","author":"Bob","content":"...","page_views":8},{"_id":"post 4","author":"Bob","content":"...","page_views":7}]'

export default defineComponent({
  name: 'JsonEditor',
  components: {
    codeJson
  },
  directives: {},
  setup() {
    const value = ref(JSON.parse(jsonData))
    const options = [
      {
        value: 'shadowfox',
        label: 'shadowfox'
      },
      {
        value: 'night',
        label: 'night'
      },
      {
        value: 'rubyblue',
        label: 'rubyblue'
      },
      {
        value: 'solarized',
        label: 'solarized'
      },
      {
        value: 'material-ocean',
        label: 'material-ocean'
      }
    ]
    const state = reactive({
      selectForm: {
        theme: 'material-ocean'
      }
    })
    const handleUpdate = () => {
      console.log('sss')
    }
    const handleInput = (ev: any) => {
      console.log('input handleInput', ev)
    }
    const handleChanged = (ev: any) => {
      console.log('changed handleChanged', ev)
    }
    return {
      value,
      options,
      handleUpdate,
      handleInput,
      handleChanged,
      ...toRefs(state)
    }
  }
})
</script>
<style lang="scss" scoped>
.form-container{
  text-align :left
}
.editor-container{
     position: relative;
  height: 100%;
}
.editorWrapper{
       margin-top:20px;

    .info{
        text-align: left;
    padding-left: 20px;
    margin-bottom: 20px;
    font-size: 12px;
    }
    .section{
      display:flex;
      flex-direction:row;
      justify-content: flex-start;
      align-items :center;
    }
     .el-row {
       margin-bottom: 20px;
     }

}
</style>
