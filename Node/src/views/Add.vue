<template>
	<div class="add">
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
			<el-form-item label="发布时间">
				<el-time-picker v-model="form.publish_time" style="width: 100%;"></el-time-picker>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitNews">添加新闻</el-button>
				<el-button @click="resetForm">重置</el-button>
			</el-form-item>
		</el-form>
		<!-- <input ref="title" name="title" type="text" placeholder="请输入新闻标题" />
    <input ref="writer" type="text" placeholder="请输入作者" />
    <input ref="content" type="text" placeholder="请输入新闻内容" /> -->
		<!-- <input type="text" v-model="msg"> -->
		<!-- <input type="button" value="更改数据" @click="reverseMessage"> -->
		<!-- <input type="button" value="提交新闻" @click="submitNews" /> -->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: "",
				form: {
					title: "",
					writer: "",
					content: "",
					publish_time: "",
				}
			};
		},
		methods: {
			submitNews() {
				const title = this.form.title;
				const writer = this.form.writer;
				const content = this.form.content;
				const publish_time = this.form.publish_time;
				console.log(`用户输入${title}【新闻内容】${content}`);
				if (title == "" || writer == "" || content == "" || publish_time == "") {
					this.$message({
						message: "新闻数据添加不全o(╯□╰)o",
						type: "warning"
					});
					return;
				}
				const me = this;
				this.$axios
					.get("http://localhost:8080/new/rest/addnews/", {
						params: {
							title,
							writer,
							content
						}
					})
					.then(function(response) {
						console.log("结果", response);
						if (response.data == 1) {
							console.log("注意this", me);
							me.$message({
								message: "新闻添加成功O(∩_∩)O~",
								type: "success"
							});
						} else {
							me.$message.error("新闻添加失败o(╥﹏╥)o");
						}
					})
					.catch(function(error) {
						me.$message.error("新闻添加失败o(╥﹏╥)o");
						console.log(error);
					});
			},
			// reverseMessage: function() {
			//   this.msg = Math.random();
			// }
			resetForm(form) {
				console.log(this.form)
				// this.$refs['form'].resetFields()
				this.form.title="";
				this.form.content="";
				this.form.writer="";
				this.form.publish_time="";
			}
		}
	};
</script>
<style scoped>
	.add {
		color: yellowgreen;
	}
</style>
