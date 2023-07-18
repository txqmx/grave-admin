<template>
  <div>
    <table-container
      ref="tableContainer"
      :tableDesc="tableDesc"
      :config="tableConfig"
      @add="handleAdd"
    >
    </table-container>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue';
export default defineComponent({
  data() {
    return {
      tableDesc: [
        {
          prop: 'id',
          label: 'id',
        },
        {
          prop: 'name',
          label: '名字',
          defaultVaule: (row) => {
            return row['name'];
          },
        },
      ],
      tableConfig: {
        dataSource: {
          method: 'get',
          url: '/api/genealogy/list',
          data: {},
        },
      },
    };
  },
  mounted(){
    this.$refs.tableContainer.getTableList()
  },
  methods:{
    handleAdd(){
        this.$router.push({
            name: 'GenealogyDetail'
        })
    }
  }
});
</script>

<style lang="scss" scoped></style>
