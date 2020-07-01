<template>
  <div>
    <div v-if="item.children">
      <div class="corporation-container">
        <div class="corporation">
          <div class="corp-name">{{item.name}}</div>
          <div class="department">
            <div v-for="(part,index) in item.department" :key="index">{{part.name}}</div>
          </div>
        </div>
        <el-complex-collapse-item v-for="(child,index) in item.children" :key="index" :item="child"></el-complex-collapse-item>
      </div>
    </div>
    <div v-else class="corporation-container">
      <div class="corporation">
        <div class="corp-name">{{item.name}}</div>
        <div class="department">
          <div v-for="(part,index) in item.department" :key="index">{{part.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElComplexCollapseItem',
  props: {
    item: Object
  }
}
</script>

<style>
</style>