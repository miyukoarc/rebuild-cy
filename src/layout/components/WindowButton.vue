<template>
<div>
  <div class="button-container">
      <div class="btn-min">
          <svg-icon icon-class="winfo-min" class />
      </div>
      <!-- <div class="btn-restore"></div> -->
      <div class="btn-max">
          <svg-icon icon-class="winfo-max" class />
      </div>
      <div class="btn-close">
          <svg-icon icon-class="winfo-close" class />
      </div>
  </div>

</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.button-container{
    display: flex;
    div{
        width: 48px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        color: #000;
    }
    .btn-min:hover{
        background: #f5f7fa;
    }
    .btn-restore:hover{
        background: #f5f7fa;
    }
    .btn-max:hover{
        background: #f5f7fa;
    }
    .btn-close:hover{
        color: #fff;
        background: #d51325;
    }

}
</style>