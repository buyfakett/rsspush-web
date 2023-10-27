<template>
  <div class="Header">
    <el-header>
      <div class="title">
        rsspush后台管理
      </div>
      <div class="head-icon">
        <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80">
        <i class="fa fa-caret-down"/>
      </div>
    </el-header>
  </div>

</template>

<script>
export default {
  data(){
    return {

    }
  }
}
</script>
<style lang="scss">
.Header{
  .el-header{
    background-color: skyblue;
    line-height: 60px;
    display: flex;
    color: white;
    justify-content: space-between;
    .head-icon{
      cursor: pointer;
      width: 60px;
      height: 50px;
      img{
        width: 40px;
        height: 40px;
        border-radius: 10px;
        margin-top: 10px;
      }
      .fa-caret-down{
        //margin-bottom: 10px;
        margin-left: 10px;
        color: black;
      }
    }
    .title{
      font-size: 24px;
      width: 200px;
    }
  }
}

</style>