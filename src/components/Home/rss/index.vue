<template>
  <div>
    <div class="add">
      <el-button type="primary" @click="add_rss()">新增</el-button>
      <el-button type="warning" @click="refresh_push()">刷新push</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="id" width="60px"/>
      <el-table-column prop="rss_uri" label="rss地址" width="center"/>
      <el-table-column prop="timestamp_text" label="最后更新时间" width="center"/>
      <el-table-column prop="detection_time_text" label="检查时间" width="center"/>
      <el-table-column width="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit_rss(scope.row)">修改rss地址</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="delete_rss(scope.row.id)">删除</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit_push(scope.row.id)">修改推送</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizeList"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
    <el-dialog :title="rss_title_state ? '添加rss地址' : '修改rss地址'" :visible.sync="rssFormVisible">
      <el-form :model="rssForm">
        <el-form-item label="rss地址：" label-width="80px">
          <el-input v-model="rssForm.rss_uri" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="rss_button(rssForm)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改push" :visible.sync="pushFormVisible">
      <el-form :model="pushForm">
        <el-form-item label="推送模式：" label-width="200px">
          <el-input v-model="pushForm.push_type" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="rss_button()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { rss, delete_rss, rss_list } from "@/api/rss";
import { format_date } from "@/common/util/utils";
import { get_push, refresh_push } from "@/api/push";

export default {

  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      pageSizeList: [5, 10, 20, 30, 40],
      total: 0,
      params: {},
      rssFormVisible: false,
      pushFormVisible: false,
      rssForm: {
        rss_uri: "",
      },
      pushForm: {
        push_type: "",
        ding_access_token: "",
        ding_keyword: "",
        wechat_app_id: "",
        wechat_template_id: "",
        wechat_to_user_ids: "",
      },
      rss_title_state: true,
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
                  this.total = res.count
                  this.tableData = res.data
                  this.tableData.forEach((item) => {
                    item.detection_time === null ? item.detection_time_text = '' : item.detection_time_text = item.detection_time + "m"
                    item.timestamp === null ? item.timestamp_text = '' : item.timestamp_text = format_date(item.timestamp, 'Y-m-d H:i:s')
                  })
                }
          })
    },
    refresh_push(){
      refresh_push()
          .then(res => {
            if (res.code === 0) {
              this.getList(this.params)
            }
          })
    },
    delete_rss(id){
      let data = {id: id}
      delete_rss(data)
          .then(res => {
            if (res.code === 0) {
              this.getList(this.params)
            }
          })
    },
    edit_rss(row){
      this.rss_title_state = false
      this.rssForm = {...row}
      this.rssFormVisible = true
    },
    add_rss(){
      this.rss_title_state = true
      this.rssForm.rss_uri = ""
      this.rssFormVisible = true
    },
    rss_button(rssForm){
        rss(this.rss_title_state ? 'POST' : 'PUT', rssForm)
            .then(res => {
              if (res.code === 0){
                this.rssFormVisible = false
                this.getList(this.params)
              }
            })
    },
    edit_push(id){
      let params = {rss_id: id}
      this.pushFormVisible = true
      get_push(params)
          .then(res => {
            console.log(res)
          })
    },
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
.add{
  margin: 10px 10px;
  text-align: left;
}

</style>