<template>
  <div>
    <el-dialog
      :title="genTitle()"
      :visible.sync="dialogVisible"
      :modal-append-to-body="false"
      append-to-body
      width="600px"
      center
      :close-on-click-modal="false"
    >
      <div>
        <component :is="event" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  components: {},
  data() {
    return {
      dialogVisible: false,
      event: "",
      eventType: ""
    };
  },
  computed: {
    ...mapState({})
  },
  mounted() {},
  updated() {},
  methods: {
    genTitle() {
      if (this.eventType == "cancelTask") {
        return "取消";
      }
    }
  }
};
</script>

<style>
</style>