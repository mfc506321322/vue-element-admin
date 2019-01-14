<template>
  <div class="users-container">
    <el-dialog title="信息修改" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" :maxLength="11" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.address" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="infoChangeEnter">确 定</el-button>
      </div>
    </el-dialog>
    <div class="list-container">
      <el-table 
      :data="tableData" 
      style="width: 100%"
      stripe
      border
      >
        <el-table-column prop="id" label="ID" width="40"></el-table-column>
        <el-table-column prop="create_time" label="日期" width="110"></el-table-column>
        <el-table-column prop="username" label="姓名" width="120"></el-table-column>
        <el-table-column prop="phone" label="电话" width="110"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button> -->
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="page-count"
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {getUserList,setUserInfo} from '@/api/users';
import {parseTime} from '@/utils/index';
export default {
  name: "Users",
  data() {
    return {
      tableData: [],
      total:0,
      dialogFormVisible: false,
      form: {},
      formLabelWidth: '120px',
      total: 0
    };
  },
  created () {
    this.getListLen();
  },
  mounted () {
    /* getUserList().then(res => {
      res.data.data.list.forEach((val,ind) => {
        val.id = (ind+1);
        val.create_time = parseTime(+val.create_time).split(' ')[0];
      })
      console.log(res.data.data.list);
      this.tableData = res.data.data.list;
      this.total = res.data.data.list.length;
    }) */
    this.getListData(1);
  },
  methods: {
    handleCurrentChange(val) {
      this.getListData(val);
    },
    handleEdit(index, row) {
      console.log(index, row);
      this.form = this.tableData[index];
      this.dialogFormVisible = true;
    },
    infoChangeEnter(){
      console.log(this.form);
      this.dialogFormVisible = false;
      setUserInfo(this.form).then(res => {
        console.log(res);
      })
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    getListData(page){
      getUserList(page).then(res => {
        res.data.data.list.forEach((val,ind) => {
          val.id = (ind+1);
          val.create_time = parseTime(+val.create_time).split(' ')[0];
        })
        // console.log(res.data.data.list);
        this.tableData = res.data.data.list;
        // this.total = res.data.data.list.length;
      })
    },
    async getListLen(){
      let i = 1;
      let listLen = 1;
      this.total = 0;
      while(listLen > 0){
        await getUserList(i).then(res => {
          listLen = res.data.data.list.length;
          this.total += res.data.data.list.length;
          i++;
        })
      }
      console.log(this.total);
    }
  }
};
</script>
<style lang="scss" scoped>
.users-container {
  .list-container {
    padding: 20px;
  }
}
.page-count{
  margin-top: 20px;
}
</style>
