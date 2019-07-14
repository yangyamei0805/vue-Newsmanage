import axios from "axios";
export default {
	addNews({
		commit
	}, form) {
		// console.log("外部添加新闻", form);
		// console.log("派发对象", commit);
		console.log("submit!");
		const title = form.title;
		const wiriter = form.wiriter;
		const context = form.context;
		console.log(`【标题】${title}【作者】${wiriter}【新闻内容】${context}`);
		if (title == "" || wiriter == "" || context == "") {
			commit('addNews', "warning|请输入完整的数据|" + Math.random());
			// alert("请填写完整的数据")
			return;
		}
		axios
			.get("http://localhost:8080/news/rest/addnews/", {
				params: {
					title,
					wiriter,
					context
				}
			})
			.then(function(response) {
				console.log("xxxx",response);
				if (response.data == 1) {
					commit('addNews', "success|新闻添加成功O(∩_∩)O~" );
				} else {
					commit('addNews', "error|新闻添加失败o(╥﹏╥)o" );
				}
			})
			.catch(function(error) {
				commit('addNews', "error|新闻添加失败o(╥﹏╥)o");
			});
	},
	
	deleteNews({
		state,
		commit
	}, id) {
		console.log("得到的id值", id);
		axios
			.get("http://localhost:8080/news/rest/delnews/", {
				params: {
					id
				}
			})
			.then(function(response) {
				console.log("response值:", response)
				if (response.data == 0) {
					commit("deleteNews", {
						type: "success",
						message: "删除新闻成功O(∩_∩)O~"
					})
					// location.reload();
				} else {
					commit("deleteNews", {
						type: "error",
						message: "删除新闻失败o(╥﹏╥)o"
					})
				}
			})
			.catch(function(error) {
				commit("deleteNews", {
					type: "error",
					message: "服务器通讯失败o(╥﹏╥)o"
				})
				console.log(error);
			});
	},
modNews({
		state,
		commit
	}, id) {
		console.log("得到的id值", id);
		axios
			.get("http://localhost:8080/news/rest/modnews/", {
				params: {
					id
				}
			})
			.then(function(response) {
				console.log("response值:", response)
				if (response.data == 0) {
					commit("modNews", {
						type: "success",
						message: "修改新闻成功O(∩_∩)O~"
					})
					// location.reload();
				} else {
					commit("modNews", {
						type: "error",
						message: "修改新闻失败o(╥﹏╥)o"
					})
				}
			})
			.catch(function(error) {
				commit("modNews", {
					type: "error",
					message: "服务器通讯失败o(╥﹏╥)o"
				})
				console.log(error);
			});
	}

}
