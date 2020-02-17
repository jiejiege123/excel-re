<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 23:54:33
 * @LastEditTime: 2019-09-04 09:45:15
 * @LastEditors: Please set LastEditors
 -->
<template lang="pug">
.index.layout-column
  .header.layout-row__between
    .query
      el-input.input-search(placeholder='请输入关键字' v-model='search' size="small" clearable @clear="getDataList")
        el-button(slot="append" icon="el-icon-search" type="primary" size="small" @click="doSearch")

  .table-warp.flex1.layout-column
    el-table.flex1(
      v-loading="loading"
      :data='tableData'
      style='width: 100%'
      :header-cell-style='headerStyle'
      height="250"
      border
      fit
      :cell-class-name="cellClassName"
      empty-text="没有数据")
      el-table-column(label="#" align="center" type="index" :index="indexMethod")
      el-table-column(label="企业名称" align="left" prop="comname" width="150px")
      el-table-column(
        v-for="(item,index) in tableColumn" :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
        :width="item.width"
        )
        template(slot-scope='scope')
          span {{scope.row[item.prop]}}
      el-table-column(label="操作" align="center" width="120")
        template(slot-scope='scope')
          el-button(type="success" plain size="small" @click="showDialog(scope.row)") 明细
    //- 分页
    .pages
      el-pagination(
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[20, 50, 100, 200]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total")
    //- 列表弹窗
    el-dialog.dialog-class.list-class(
      :title='dialogTitle',
      :visible.sync='dialogVisible'
      width='70%'
      append-to-body
      :before-close="handleClose"
      top="5vh"
      :close-on-click-modal='false')
      //- 物品列表
      .table-warp.flex1.layout-column(style='height:100%')
        el-table.flex1(
          v-loading="tableLoading"
          :data='tableDialogData'
          :header-cell-style='headerStyle'
          height="250"
          border
          fit
          ref="danTableRef"
          empty-text="没有数据")
          el-table-column(
            v-for="(item,index) in tableDialogColumn" :key="index"
            :label="item.label"
            :prop="item.prop"
            :align="item.align"
            :width="item.width")
            template(slot-scope='scope')
              img(
                v-if="item.type==='img'"
                :src="scope.row[item.prop] | filterImg"
                @click="showImgDanTable('danTableRef')"
                style="width:40px;height:40px;cursor: pointer")
              span(v-else) {{scope.row[item.prop]}}
    //- 图片弹窗
    image-dialog(
      :imageTitle="imageTitle"
      :imageVisible="imageVisible"
      :imgUrl="imgUrl"
      @onClose="imageVisible=false")
</template>

<script >
// import {
//   getCheckList } from '@/api/warehouses'
import { mapGetters } from 'vuex'
import ImageDialog from '@/components/ImageDialog'
import { dateForamt } from '@/utils/index'
export default {
  name: 'Index',
  components: {
    ImageDialog
  },
  filters: {
    filterImg: (val) => {
      return process.env.VUE_APP_BASE_API + val
    }
  },
  data() {
    return {
      search: '',
      dics: {},
      /** *** 表格 *** **/
      loading: false,
      tableData: [],
      tableColumn: [
        {
          prop: 'kqname',
          label: '库区名称'
        },
        {
          prop: 'pdrzh',
          label: '库管员姓名'
        },
        {
          prop: 'fzrzh',
          label: '负责人姓名'
        },
        {
          prop: 'timestamp',
          label: '清点时间'
        }
      ],
      total: 1,
      currentPage: 1,
      pageSize: 20,
      /** *** 弹窗 *** **/
      dialogTitle: '详情',
      dialogVisible: false,
      ruleForm: {},
      tableLoading: false,
      tableDialogData: [],
      tableDialogColumn: [
        {
          prop: 'kqname',
          label: '库区名称'
        },
        {
          prop: 'wptypeZh',
          label: '物品类型'
        },
        {
          prop: 'wpcodename',
          label: '物品名称'
        },
        {
          prop: 'wpnum',
          label: '物品数量'
        },
        {
          prop: 'timestamp',
          label: '清点时间'
        }
      ],
      /** *** 图片弹窗 *** **/
      imageTitle: '',
      imageVisible: false,
      imgUrl: ''
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    action() {
      return `${process.env.VUE_APP_BASE_API}/Basic/UploadImage`
    }
  },
  created() {
    // this.getDataList()
    this.getDicsDataList()
  },
  mounted() {

  },
  methods: {
    /** *** 通用 start *** **/
    headerStyle() {
      return 'background-color: #FAFAFA;'
    },
    cellClassName({ row, column, rowIndex, columnIndex }) {
      // if (column.property === 'codespvalueZh') {
      //   switch (row.codespvalue) {
      //     case '-1':
      //       // 未提交
      //       return 'approve-wait'
      //     default:
      //       return 'approve-ing'
      //   }
      // }
    },
    indexMethod(index) {
      return (index + 1) + (this.currentPage - 1) * this.pageSize
    },
    handleCurrentChange(e) {
      this.currentPage = e
      this.getDataList()
    },
    handleSizeChange(e) {
      this.pageSize = e
      this.getDataList()
    },
    doSearch() {
      this.currentPage = 1
      this.pageSize = 20
      this.getDataList()
    },
    handleClose(done) {
      done()
    },
    closeDialog() {
      this.dialogVisible = false
    },

    /** *** 通用 end *** **/


    /** *** 按钮操作 start *** **/
    /**
     * @description: 显示弹出
     * @param {type}
     * @return:
     */
    showDialog(row) {
      this.dialogVisible = true
      this.ruleForm = Object.assign({}, row)
      this.ruleForm.wpnum_list.forEach(n => {
        n.timestamp = dateForamt(new Date(n.timestamp), 'yyyy-MM-dd hh:mm:ss')
      })
      this.tableDialogData = this.ruleForm.wpnum_list
    },
    /** *** 按钮操作 end *** **/


    /** *** 接口请求 start *** **/
    /**
     * @description: 获取列表数据
     * @param {type}
     * @return:
     */
    getDataList() {
      // const params = {
      //   page: this.currentPage,
      //   pageSize: this.pageSize,
      //   keyword: this.search
      // }
      // this.loading = true
      // getCheckList(params).then(res => {
      //   this.$nextTick(() => {
      //     this.loading = false
      //   })
      //   const tableData = res.Data.Models
      //   tableData.forEach(n => {
      //     n.timestamp = dateForamt(new Date(n.timestamp), 'yyyy-MM-dd hh:mm:ss')
      //   })
      //   this.tableData = tableData
      //   this.total = res.Data.TotalCount
      // }).catch((err) => {
      //   console.error(err)
      //   this.loading = false
      // })
    },
    /**
     * @description: 获取字典值
     * @param {type}
     * @return:
     */
    getDicsDataList() {
      const data = ['爆破类型', '项目等级', '人员类型', '物资分类']
      this.loading = true
      this.$store.dispatch('dics/getDicData', data).then(res => {
        const dics = {}
        for (const key in res) {
          if (res.hasOwnProperty(key)) {
            const element = res[key]
            switch (key) {
              case '爆破类型':
                dics.bptype = element
                break
              case '项目等级':
                dics.QF0032 = element
                break
              case '人员类型':
                dics.UF002 = element
                break
              case '物资分类':
                dics.wzfl = element
                break
              default:
                break
            }
          }
        }
        this.dics = dics
        this.getDataList()
      }).catch(() => {
        this.loading = false
      })
    }
    /** *** 获取数据 end *** **/


    /** *** 其他 start *** **/

  }
}
</script>
<style lang="scss" scoped>
/***** 基本设置 start ******/
.index{
  padding: 10px 10px;
  height: calc(100vh - 90px);
}
.header{
  margin: 10px 0 15px;
  .query{
    .input-search{
      width: 200px;
    }
  }
}
.pages{
  margin-top: 20px;
}
/** *** 基本设置 end ******/
.dialog-class{
  /deep/ .el-dialog{
    min-width: 720px;
    .el-form-item__error{
      display: none
    }
  }
  /deep/ .el-dialog__body{
    height: calc(100vh - 150px);
    padding-top: 0;
    padding-bottom: 15px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    .plhj-table{
      flex: 1
    }
  }
  .dia-footer{
    width: 100% !important;
    text-align: right;
    /deep/ .el-form-item__content{
    text-align: right
    }
  }
}
.inbtn{
  padding: 5px 8px
}
.list-class{
  /deep/ .el-dialog__body{
    padding-top: 15px;
  }
}
.ullist{
  position: absolute;
  z-index: 999;
  background: rgb(48, 65, 86);
  top: 35px;
  list-style:none;
  width: 150px;
  padding: 5px 0;
  color: #f4f4f5;
  li{
    padding: 5px 15px;
    cursor: pointer;
    &:hover{
      background:#1f2d3d;
      color: rgb(64, 158, 255)
    }
  }
}
</style>
