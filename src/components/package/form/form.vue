<template>
  <el-form
    ref="form"
    class="form_container"
    :model="formData"
    v-bind="$attrs"
    :rules="rules"
  >
    <el-row v-for="(col, index) in gridFormDesc" :key="index">
      <el-col
        v-for="(formItem, index) in col"
        :key="index"
        :span="24 / (formItem.row || row)"
      >
        <el-form-item :label="formItem.label" :prop="formItem.field">
          <slot v-if="formItem.slot" :name="field"></slot>
          <component
            v-else
            :is="formItem.type"
            v-bind="{ ...defaultProp, ...formItem.attrs }"
            v-on="formItem.on"
            :options="formItem._options"
            v-model="formData[formItem.field]"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { defineComponent, h } from 'vue';
export default defineComponent({
  name: 'FormContainer',
  data() {
    return {
      gridFormDesc: [],
      formData: {},
      rules: {},
    };
  },
  provide() {
    return {
      parent: 'form',
      inputWidth: this.inputWidth,
      labelWidth: '',
    };
  },
  created() {
    this.initData();
    this.initFormDesc()
  },
  props: {
    inputWidth: {
      type: String,
      default: '200px',
    },
    defaultData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    defaultProp: {
      default: () => {
        return {
          clearable: true,
        };
      },
    },
    formDesc: {
      type: Array,
      required: true,
      default: () => [],
    },
    row: {
      default: 1,
    },
    // 校检规则
    rules: {
      type: Object,
      default() {
        return {};
      },
    },
    required: Boolean,
    // 提交函数
    requestFn: Function,
  },
  computed: {
    // gridFormDesc() {
    //   let row = [];
    //   let col = [];
    //   let a = ['TextEditor', 'FileUploadEditor', 'RichEditor'];
    //   for (var i = 0; i < this.formDesc.length; i++) {
    //     let item = this.formDesc[i]
    //     if(item.attrs){
    //       for(let o in item.attrs){
    //         if(typeof item.attrs[o] === 'function'){
    //           item.attrs[o] = item.attrs[o](this.defaultData)
    //         }
    //       }
    //     }
    //     if (a.includes(item.type)) {
    //       item.row = 1;
    //       if (col.length) {
    //         row.push([...col]);
    //         col = [];
    //       }
    //       row.push([item]);
    //     } else {
    //       col.push(item);
    //       if (col.length === this.row) {
    //         row.push([...col]);
    //         col = [];
    //       }
    //     }
    //   }
    //   if (col.length) {
    //     row.push([...col]);
    //   }
    //   return row;
    // },
  },
  watch: {
    defaultData() {
      this.initDefaultData();
    },
  },
  methods: {
    initFormDesc(){
      let row = [];
      let col = [];
      let a = ['TextEditor', 'FileUploadEditor', 'RichEditor'];
      for (var i = 0; i < this.formDesc.length; i++) {
        let item = {...this.formDesc[i]}
        if(item.attrs){
          let copyAttrs = {}
          for(let o in item.attrs){
            copyAttrs[o] = item.attrs[o]
            if(typeof item.attrs[o] === 'function'){
              copyAttrs[o] = item.attrs[o](this.defaultData)
            }
          }
          item.attrs = copyAttrs
        }
        if (a.includes(item.type)) {
          item.row = 1;
          if (col.length) {
            row.push([...col]);
            col = [];
          }
          row.push([item]);
        } else {
          col.push(item);
          if (col.length === this.row) {
            row.push([...col]);
            col = [];
          }
        }
      }
      if (col.length) {
        row.push([...col]);
      }
      this.gridFormDesc = row
    },

    initData() {
      let formData = {};
      let rules = {};
      this.formDesc.forEach((item) => {
        if (item.field) {
          formData[item.field] = this.defaultData[item.field] || null;
          rules[item.field] = this.initRules(item);
          if (item.options) {
            item._options = this.initOptions(item);
          }
        }
      });
      this.formData = formData;
      this.rules = rules;
    },

    initDefaultData() {
      this.$refs['form'].resetFields();
      for (let i in this.formData) {
        this.formData[i] = this.defaultData[i];
      }
    },

    initRules(formItem) {
      let formRules = [];
      if (formItem.rules) {
        if (formItem.rules.required) {
          formRules.push({
            required: true,
            message: ['InputEditor'].includes(formItem.type)
              ? `请输入${formItem.label}`
              : `请选择${formItem.label}`,
          });
        }
        return formRules;
      } else {
        return null;
      }
    },

    initOptions(formItem) {
      let options = formItem.options;
      if (options instanceof Array) {
        return options;
      } else if (options instanceof Function) {
        return options(formData);
      } else if (options instanceof Promise) {
        options.then((res) => {
          return res;
        });
      } else {
        return [];
      }
    },

    submitForm() {
      return new Promise((resolve, reject) => {
        this.$refs['form'].validate((valid, invalidFields) => {
          if (valid) {
            resolve({ ...this.defaultData, ...this.formData });
          }
        });
      });
    },
  },
});
</script>

<style lang="scss" scoped></style>
