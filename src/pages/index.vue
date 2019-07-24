<template>
  <div id="index" class="clearfix">
    <div class="right_menu">
      <topmenu activeIndex="1"></topmenu>
      <div class="right_menu-userbox">
        <ul class="search_box clearfix">
          <li>
            <span>姓名:</span>
            <div class="inputbox">
              <el-input v-model="search.name" placeholder="请输入内容"></el-input>
            </div>
          </li>
          <li>
            <span>用户名:</span>
            <div class="inputbox">
              <el-input v-model="search.username" placeholder="请输入内容"></el-input>
            </div>
          </li>
          <li>
            <span>性别:</span>
            <el-select v-model="search.sex" placeholder="请选择">
              <el-option value>无限制</el-option>
              <el-option value="0" label="女">女</el-option>
              <el-option value="1" label="男">男</el-option>
            </el-select>
          </li>

          <li class="searchbtn clearfix">
            <el-button type="primary" @click="searchclick()">搜索</el-button>
            <el-button type="warning" @click="clearnull()">清空</el-button>
          </li>
        </ul>
        <el-table
          :data="userarray"
          style="width:100%;"
          max-height="700px"
          :default-sort="{prop: 'id', order: 'ascending'}">
          <el-table-column prop="id" label="用户id"></el-table-column>
          <el-table-column prop="user_name" label="姓名"></el-table-column>
          <el-table-column prop="user_phone" label="用户名"></el-table-column>
          <el-table-column prop="user_sex" label="性别">
            <template slot-scope="scope">
              <el-tag>{{scope.row.user_sex==1?'男':'女'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="user_status" label="用户状态">
            <template slot-scope="scope">
              <el-tag
                :type="scope.row.user_status==1?'success':'danger'"
              >{{scope.row.user_status==1?'正常':'禁用'}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click.native.prevent="changeinfo(scope.row)" type="text">修改</el-button>
              <el-button
                @click.native.prevent="delinfo(scope.row.id,scope.row.user_status)"
                type="text"
              >{{scope.row.user_status==1?'禁用':'启用'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="obj">
        <el-form-item label="用户id" label-width="120px">
          <el-input v-model="obj.id" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="120px">
          <el-input v-model="obj.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="obj.phone" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="120px">
          <el-radio v-model="obj.sex" label="0">女</el-radio>
          <el-radio v-model="obj.sex" label="1">男</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="surechange()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import topmenu from "../components/TopMenu";

export default {
  name: "index",
  components: {
    topmenu: topmenu
  },
  data() {
    return {
      dialogFormVisible: false,
      userarray: [],
      radio: "1",
      obj: {
        id: 0,
        name: "",
        phone: "",
        sex: "1"
      },
      search: {
        name: "",
        username: "",
        sex: ""
      }
    };
  },
  methods: {
    // 获取用户列表
    getuser() {
      var that = this;
      that.$api.getuser().then(res => {
        if (res.status == 200) {
          that.userarray = res.data.userarray;
        }
      });
    },
    // 修改用户信息
    changeinfo(obj) {
      var that = this;
      that.dialogFormVisible = true;
      that.obj = {
        id: obj.id,
        name: obj.user_name,
        phone: obj.user_phone,
        sex: String(obj.user_sex)
      };
    },
    // 删除用户
    delinfo(id, status) {
      var that = this;
      that.$api
        .deluser({
          id: id,
          status: status
        })
        .then(res => {
          if (res.status == 200) {
            that.$message({
              message: "操作成功",
              type: "success"
            });
            that.getuser();
          }
        });
    },
    // 确认修改用户
    surechange() {
      var that = this;
      if (that.obj.name == "") {
        that.$message.error({
          message: "姓名不能为空"
        });
      } else {
        that.dialogFormVisible = false;
        that.$api.changeuser(that.obj).then(res => {
          if (res.status == 200) {
            if (res.data.result == "success") {
              that.$message({
                message: "修改成功",
                type: "success"
              });
              that.getuser();
            } else {
              that.$message.error({
                message: "修改失败"
              });
            }
          }
        });
      }
    },
    // 搜索
    searchclick() {
      var that = this;
      if (
        that.search.name == "" &&
        that.search.username == "" &&
        that.search.sex == ""
      ) {
        that.getuser();
      } else {
        that.$api.searchuser(that.search).then(res => {
          if (res.status == 200) {
            that.userarray = res.data.userarray;
          }
        });
      }
    },
    // 清空
    clearnull() {
      var that = this;
      that.$set(that.search, "name", "");
      that.$set(that.search, "username", "");
      that.$set(that.search, "sex", "");
      that.getuser();
    }
  },
  mounted() {
    var that = this;
    that.getuser();
  }
};
</script>

<style scoped>
.inputbox {
  display: inline-block;
}
.bannerbox {
  width: 100%;
  height: 200px;
  background: #ffffff;
  margin-bottom: 20px;
}
.right_menu-userbox {
  width: 100%;
  background: #ffffff;
  padding: 20px;
}

.search_box {
  margin-bottom: 30px;
}
.search_box li {
  float: left;
  margin-right: 15px;
}
.search_box li > span {
  font-size: 14px;
}
.search_box li input {
  padding-left: 8px;
}
.search_box li.searchbtn {
  cursor: pointer;
}
.right_menu-userbox table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e6e6e6;
}
.right_menu-userbox table th {
  border: 1px solid #e6e6e6;
  line-height: 40px;
  font-size: 14px;
}
.right_menu-userbox table td {
  border: 1px solid #e6e6e6;
  line-height: 40px;
  font-size: 14px;
}
.userbox_op li {
  float: left;
  margin-left: 10px;
  cursor: pointer;
}
.bombbox {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: block;
  background: rgba(0, 0, 0, 0.2);
}
.bombbox .bombbox-change {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 500px;
  height: 300px;
  background: #ffffff;
  padding: 20px;
}
.bombbox-change li {
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
}
.bombbox-change span {
  float: left;
  width: 80px;
  text-align: right;
}
.bombbox-change div {
  float: left;
  width: 300px;
  text-align: left;
  margin-left: 20px;
}
.searchbtn div {
  float: left;
  margin-right: 16px;
  padding: 0 15px;
  border: 1px solid #e6e6e6;
}
</style>
