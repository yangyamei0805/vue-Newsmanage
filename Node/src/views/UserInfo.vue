
<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in carouselList" :key="item.key">
      <img :src="item.src">
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data () {
   return {
    carouselList: [
      {key: '1', src: '../assets/imgs/bg02', desc: 'xxxx'},
      {key: '2', src: '../../../../assets/imgs/bg02.jpg', desc: 'xxxx'},
	  {key: '3', src: '../../assets/imgs/bg05.jpg', desc: 'xxxx'},
	  {key: '4', src: '../../../assets/imgs/bg02.jpg', desc: 'xxxx'}
    ]
    }
  }
}
</script>


<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>