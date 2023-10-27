<template>
  <div>
    <el-table
        :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        border
        style="width: 100%">
      <el-table-column
          prop="id"
          label="id"
          width="center">
      </el-table-column>
      <el-table-column
          prop="rss_uri"
          label="rss地址"
          width="center">
      </el-table-column>
      <el-table-column
          prop="timestamp"
          label="最后更新时间"
          :formatter="TimeStampFormatter"
          width="center">
      </el-table-column>
      <el-table-column
          prop="detection_time"
          label="检查时间"
          :formatter="DateTimeFormatter"
          width="center">
      </el-table-column>
      <el-table-column
          width="center"
          label="操作">
        <template>
          <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>
<script>
import {rss_list} from "@/api/rss";
import {format_date} from "@/common/util/utils";

export default {

  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 20,
      total: 0,
      params: {},
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
      this.params.pageSize = val
      this.getList(this.params)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.params.page = val
      this.getList(this.params)
    },
    getList(params) {
      rss_list(params)
          .then(res => {
                if (res.code === 0) {
                  console.log(res)
                  this.total = res.count
                  this.tableData = res.data
                }
          })
    },
    DateTimeFormatter(row){
      return row.detection_time.toString() + "m"
    },
    TimeStampFormatter(row){
      return format_date(row.timestamp, 'Y-m-d H:i:s')
    }
  },
  created() {
    this.params.pageSize = this.pageSize
    this.params.page = this.currentPage
    this.getList(this.params)
  }
}
</script>
<style lang="scss">
.el-pagination{
  margin-top: 30px;
  text-align: right;
}

</style>