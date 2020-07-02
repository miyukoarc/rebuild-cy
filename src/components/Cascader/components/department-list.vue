<template>
  <div>
      <div v-for="(item,index) in list" :key="index">{{item.name}}</div>
  </div>
</template>

<script>
export default {
    props: {
        list: Array,
        default:()=>[]
    }

}
</script>

<style>

</style>