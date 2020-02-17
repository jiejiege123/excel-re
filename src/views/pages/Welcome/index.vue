<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 23:54:33
 * @LastEditTime: 2019-09-03 10:28:12
 * @LastEditors: Please set LastEditors
 -->
<template lang="pug">
.index.layout-column__between
  div 给你一颗小心心

</template>

<script >

export default {
  name: 'Index',
  components: {

  },
  data() {
    return {

    }
  },
  computed: {

  },
  created() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.index{
  background: #f0f2f5;
  height: 100%;
  padding: 15px;
  // flex-wrap: wrap;
  // &>div{
  //   width: 33%;
  //   background: #fff;
  //   height: 45%;
  // }
  /deep/ .el-row{
    height: 49%;
    .el-col{
      height: 100%;
    }
  }
}
.default{
  height:100%;
  width:100%;
  background: #fff
}
</style>
