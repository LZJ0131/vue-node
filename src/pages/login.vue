<template>
  <div class="loginbox">
    <p>用户登录</p>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button>注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password:''
      }
    };
  },
  methods: {
    onSubmit() {
      var that=this;
      if(!that.form.username){
        that.$message({
          message:'请输入用户名',
          type:'error'
        })
        return false;
      }
      if(!that.form.password){
        that.$message({
          message:'请输入密码',
          type:'error'
        })
        return false;
      }
      that.$api.login(that.form).then(res=>{
        // if(!res.status){
        //   that.$message({
        //     message:'填写出错'
        //   })
        // }
      })
    }
  }
};
</script>

<style scoped>
.loginbox{
  position: fixed;
  left:0;
  right: 0;
  bottom: 0;
  top:0;
  margin: auto;
  background: #fff;
  width: 500px;
  height: 300px;
}
.loginbox p{
  text-align: center;
  margin-bottom: 20px;
}
.loginbox .el-form{
  padding: 0 20px;
}
</style>
