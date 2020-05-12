<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-17 23:54:33
 * @LastEditTime: 2019-09-04 09:45:15
 * @LastEditors: Please set LastEditors
 -->
<template lang="pug">
.index.layout-column(v-loading="jiaZai")
  .header.layout-row__between
    .query.layout-row.align-center
      .input-item.layout-row.align-center
        .label() 选择类型：
        el-input.input-search(
          v-model='type'
          size="mini"
          autocomplete = "new-password"
          placeholder='需要有唯一性')
      .input-item.layout-row.align-center
        .label() 计算名称：
        el-input.input-search(
          v-model='prop'
          size="mini"
          autocomplete = "new-password"
          placeholder='要算的表头名')
      span(@click="daoruF")
        <vue-xlsx-table @on-select-file="handleSelectedFile" style="margin-right:15px">导入</vue-xlsx-table>
      .input-item.layout-row.align-center
        .label() 选择类型：
        el-input.input-search(
          v-model='ygtype'
          size="mini"
          autocomplete = "new-password"
          placeholder='需要有唯一性')
      .input-item.layout-row.align-center
        .label() 分布：
        el-input.input-search(
          v-model='ygprop'
          size="mini"
          autocomplete = "new-password"
          placeholder='要算的表头名')
      span(@click="daoruFY")
        <vue-xlsx-table @on-select-file="handleStaffsFile">导入员工表</vue-xlsx-table>
    .operation
      export-excel(
        tableId="#exportTab1"
        fileName="美餐人力"
      )
  .forms.layout-row
    .form-list.layout-row
      .spp.layout-row 原始表格：
        .clr_g {{ysRow}}
        | 行 金额：
        .clr_r {{ysSum}}
      .spp.layout-row 数据处理：
        .clr_g {{ysDsRow}}
        |行 金额：
        .clr_r {{ysDsSum}}
    .form-list.layout-row
      .spp.layout-row 员工表格：
        .clr_g {{ygRow}}
        | 行
      .spp.layout-row 数据处理：
        .clr_g {{ygDsRow}}
        | 行 金额：
        .clr_r {{ygDsSum}}
    .form-list.layout-row
      .spp.layout-row 原始多余数据：
        .clr_r {{ysDy}}
      .spp.layout-row 员工多余表格行号：
        .clr_r {{ygDy}}
  .table-warp.flex1.layout-column
    el-table.flex1#exportTab1(
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
      //- el-table-column(label="企业名称" align="left" prop="comname" width="150px")
      el-table-column(
        v-for="(item,index) in tableColumn" :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
        :width="item.width"
        )
        template(slot-scope='scope')
          span {{scope.row[item.prop]}}
      el-table-column(label="支付" prop="支付" align="center" width="100" fixed="right")
    //- 分页
    .pages
      el-pagination(
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[20, 50, 100, 200, 3000]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total")
</template>

<script >
import { mapGetters } from 'vuex'
import { arryIdSum, ptwop } from '@/utils/index'
import ExportExcel from '@/components/ExportExcel'

export default {
  name: 'Index',
  components: {
    ExportExcel
  },
  filters: {
    filterImg: (val) => {
      return process.env.VUE_APP_BASE_API + val
    }
  },
  data() {
    return {

      /** *** 表格 *** **/
      loading: false,
      tableData: [],
      tableColumn: [
        {
          prop: '员工编号',
          label: '员工编号'
        },
        {
          prop: '员工姓名',
          label: '员工姓名'
        },
        {
          prop: '*所属公司',
          label: '*所属公司'
        },
        {
          prop: '一级部门',
          label: '一级部门'
        },
        {
          prop: '二级部门',
          label: '二级部门'
        },
        {
          prop: '三级部门',
          label: '三级部门'
        },
        {
          prop: 'ERP部门',
          label: 'ERP部门'
        },
        {
          prop: '部门编码',
          label: '部门编码'
        },
        {
          prop: '工作城市',
          label: '工作城市'
        },
        {
          prop: '*编制类型',
          label: '*编制类型'
        },
        {
          prop: '一级成本中心',
          label: '一级成本中心'
        },
        {
          prop: '二级成本中心',
          label: '二级成本中心'
        },
        {
          prop: '三级成本中心',
          label: '三级成本中心'
        },
        {
          prop: '成本中心编码',
          label: '成本中心编码'
        },
        {
          prop: '项目',
          label: '项目'
        },
        {
          prop: '项目编码',
          label: '项目编码'
        },
        {
          prop: '1月人力分布',
          label: '1月人力分布'
        },
        {
          prop: '电话',
          label: '电话'
        }
      ],
      total: 1,
      currentPage: 1,
      pageSize: 3000,
      /** *** 弹窗 *** **/
      dialogTitle: '详情',
      dialogVisible: false,
      ruleForm: {},
      /** *** 表格数据对比 *** **/
      mc: [],
      jiaZai: false,
      type: '下单人员工ID',
      prop: '企业实付金额',
      ygtype: '员工编号',
      ygprop: '1月人力分布',
      ysRow: '-',
      ysSum: 0,
      ysDsRow: '-',
      ysDsSum: 0,
      ygRow: '-',
      ygDsRow: '-',
      ygDsSum: 0,
      ysDy: '-',
      ygDy: '-'

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
    // this.getDicsDataList()
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
    daoruF() {
      if (!this.type || !this.prop) {
        this.$message.error('请先填写类型和计算名称')
      }
    },
    daoruFY() {
      if (!this.ysSum) {
        this.$message.error('请先导入匹配文件')
      } else {
        if (!this.ygtype || !this.ygprop) {
          this.$message.error('请先填写类型和计算名称')
        }
      }
    },
    handleSelectedFile(convertedData) {
      console.log(convertedData)
      this.jiaZai = true
      const body = convertedData.body
      this.ysRow = body.length
      let sum1 = 0

      if (body[1].hasOwnProperty(this.prop) && body[1].hasOwnProperty(this.type)) {
        body.forEach(n => {
          sum1 = parseFloat(n[this.prop]) + sum1
        })
        this.ysSum = sum1.toFixed(2)

        this.mc = arryIdSum(body, this.type, this.prop)
        console.log(this.mc)
        let sum = 0
        this.mc.forEach(n => {
          sum = parseFloat(n[this.prop]) + sum
        })
        this.ysDsRow = this.mc.length
        this.ysDsSum = sum.toFixed(2)

        this.$nextTick(() => {
          this.jiaZai = false
        })
        this.$message.success('导入成功, 请继续导入员工表')
      } else {
        this.jiaZai = false
        this.$message.error('请输入正确的数据,并重新导入')
      }
    },
    handleStaffsFile(convertedData) {
      const body = convertedData.body
      this.$message.success('导入成功')
      // 遍历员工

      if (body[1].hasOwnProperty(this.ygprop) && body[1].hasOwnProperty(this.ygtype)) {
        this.jiaZai = true
        let sum = 0

        this.ysDy = []
        this.ygDy = []
        body.forEach((n, index) => {
          // 在遍历美餐 找到数据
          if (!n[this.ygtype]) {
            this.ygDy.push(index + 2)
          }
          const line = this.mc.find(e => n[this.ygtype] === e[this.type])
          if (line) {
            console.log(ptwop(n[this.ygprop]))
            n['支付'] = ptwop(n[this.ygprop]) * line[this.prop]
          } else {
            n['支付'] = 0
          }
          sum = sum + n['支付']
        })
        this.ygRow = body.length


        this.mc.forEach(e => {
          const line = body.find(n => n[this.ygtype] === e[this.type])
          if (line) {
            e['支付'] = line[this.prop]
          } else {
            this.ysDy.push(e[this.type])
            e['支付'] = 0
          }
        })

        this.tableData = body
        this.total = body.length
        this.ygDsRow = this.total
        this.ygDsSum = sum
        this.jiaZai = false
        this.$message.success('处理完成')
      } else {
        this.jiaZai = false
        this.$message.error('请输入正确的数据,并重新导入')
      }
    }
    /** *** 按钮操作 end *** **/


    /** *** 接口请求 start *** **/

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
    width: 500px;
    .input-search{
      width: 120px;
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
.input-item{
  margin-right: 20px
}
.label{
  white-space : nowrap
}
.label:before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
}
.forms{
  .form-list{
    margin-right: 20px;
    .spp{
      margin-right: 10px;
    }
  }
}
.colr{

}
.red{

}
</style>
