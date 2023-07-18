<template>
  <div class="tree-detail-container">
    <MemberForm v-show="currentRow.id" v-model="currentRow" @submit="submit" />
  </div>
</template>

<script>
import api from '../api';
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import MemberForm from '../components/MemberForm.vue';
export default defineComponent({
  name: 'TreeDetail',
  components: { Plus, MemberForm },
  data() {
    return {
      pageId: this.$route.query.id,
      currentRow: '',
    };
  },
  mounted() {
    this.$store.commit('setBackRoute', {
      name: 'TreeCreate',
      params: {
        reload: true,
      },
    });
    this.getMemberItem(this.pageId);
  },
  methods: {
    async getMemberItem(id) {
      const res = await api.getMemberItem({
        id,
        child: true,
        mate: true,
      });
      this.currentRow = res;
      if (this.$route.meta.backInfo) {
        this.$route.meta.backInfo.title = res.name;
      }
    },
    submit() {
      this.$router.push({
        name: 'TreeCreate',
        params: {
          reload: true,
        },
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.tree-detail-container {
}
</style>
