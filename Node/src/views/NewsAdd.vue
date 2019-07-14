
<template>
  <div class="add">
    <!-- xxxx {{infoSuccess}} -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="新闻名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="新闻作者">
        <el-input v-model="form.writer"></el-input>
      </el-form-item>
      <el-form-item label="新闻内容">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addNews(form)">添加新闻</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- <input ref="title" name="title" type="text" placeholder="请输入新闻标题" />
    <input ref="writer" type="text" placeholder="请输入作者" />
    <input ref="content" type="text" placeholder="请输入新闻内容" />-->
    <!-- <input type="text" v-model="msg"> -->
    <!-- <input type="button" value="更改数据" @click="reverseMessage"> -->
    <!-- <input type="button" value="提交新闻" @click="submitNews" /> -->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "NewsAdd",
  watch: {
    // 如果 `infoSuccess` 发生改变，这个函数就会运行
    infoSuccess: function(newInfo, oldInfo) {
      const [type, message,randomstr] = newInfo.split("|");
      console.log("WATCH", newInfo);
      this.$message({
        message,
        type
      });
    }
  },
  computed: mapState({
    infoSuccess: state => state.infoSuccess
  }),
  data() {
    return {
      //infoSuccess: this.$store.state.infoSuccess,
      titlemsg: "添加新闻",
      form: {
        title: "",
        writer: "",
        content: ""
      }
    };
  },
  methods: {
    ...mapActions(["addNews"]),
		resetForm(form) {
			console.log(this.form)
			// this.$refs['form'].resetFields()
			this.form.title="";
			this.form.content="";
			this.form.writer="";
		}
		
    // onSubmit() {
    //   console.log("submit!");
    //   const title = this.form.title;
    //   const writer = this.form.writer;
    //   const content = this.form.content;
    //   console.log(`【标题】${title}【作者】${writer}【新闻内容】${content}`);
    //    if (title == "" || writer == "" || content == "") {
    //     this.$message({
    //       message: "新闻数据添加不全o(╯□╰)o",
    //       type: "warning"
    //     });
    //     return;
    //   }
    //   const me = this;
    // },
    // submitNews() {
    //   // const title = this.$refs.title.value;
    //   // const writer = this.$refs.writer.value;
    //   // const content = this.$refs.content.value;
    //   const title = this.form.title;
    //   const writer = this.form.writer;
    //   const content = this.form.content;
    //   console.log(`用户输入${title}【新闻内容】${content}`);
    //   if (title == "" || writer == "" || content == "") {
    //     this.$message({
    //       message: "新闻数据添加不全o(╯□╰)o",
    //       type: "warning"
    //     });
    //     return;
    //   }
    //   const me = this;
    //   this.$axios
    //     .get("http://localhost:8080/news/rest/addnews/", {
    //       params: {
    //         title,
    //         writer,
    //         content
    //       }
    //     })
    //     .then(function(response) {
    //       console.log("结果", response);
    //       if (response.data == 1) {
    //         console.log("注意this", me);
    //         me.$message({
    //           message: "新闻添加成功O(∩_∩)O~",
    //           type: "success"
    //         });
    //       } else {
    //         me.$message.error("新闻添加失败o(╥﹏╥)o");
    //       }
    //     })
    //     .catch(function(error) {
    //       me.$message.error("新闻添加失败o(╥﹏╥)o");
    //       console.log(error);
    //     });
    // }
    // reverseMessage: function() {
    //   this.msg = Math.random();
    // }
  }
};
</script>


<style scoped>
.add {
  color: yellowgreen;
}
</style>
