<template>
  <div class="ChannelDataStatistics">
    <el-table stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="客服账号"
        width="180">
        <template slot-scope="scope">
          <span v-text="scope.row.userName.split('-')[1]"></span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="客服名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="departmentNames"
        label="业务类型">
      </el-table-column>
      <el-table-column
        prop="autoAllocate"
        label="自动分配">
        <template slot-scope="scope">
          <span :class="{'el-icon-success': (scope.row.autoAllocate === 1), 'el-icon-error': (scope.row.autoAllocate === 0)}"></span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 5, 15, 50]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'ChannelDataStatistics',
  data () {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 5,
      total: 0
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      var start = (this.currentPage - 1) * this.pagesize
      this.$ajax.post('operator.do', {
        method: 'searchGrid',
        companyPk: 'ff80808160e57a370160e844f4340002',
        BSLoginCode: '9UbX2QgI11tNe3D6vq5rDnZFdd7ZbB8G',
        clientType: 'BS',
        offset: start,
        start: start,
        limit: this.pagesize
      }
        , s => {
      }
        , f => {
        this.changeData(f)
      })
    },
    changeData (datas) {
      this.total = datas.sum
      this.tableData = []
      for (var i in datas.root) {
        var item = datas.root[i]
        this.tableData.push({
          userName: item.userName,
          name: item.name,
          departmentNames: item.departmentNames,
          autoAllocate: item.autoAllocate
        })
      }
    },
    handleSizeChange (val) {
      this.pagesize = val
      this.getData()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.getData()
    }
  }
}
</script>
