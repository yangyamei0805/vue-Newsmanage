<template>
	<div class="list">
		<!-- 表格start -->
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="序号" width="180" sortable></el-table-column>
			<el-table-column prop="title" label="新闻标题" width="180" sortable></el-table-column>
			<!-- <el-table-column prop="writer" label="作者" width="180"></el-table-column> -->
			<el-table-column prop="writer" label="作者" width="180">
				<template slot-scope="scope">
					<div slot="reference" class="name-wrapper">
						<el-tag size="medium">{{ scope.row.writer }}</el-tag>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="管理新闻">
				<template slot-scope="scope">
					<el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
					<el-button size="mini" >编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
				</template>
				<!-- <el-button type="danger" @click="deletenews">删除</el-button> -->
			</el-table-column>
		</el-table>
		<!-- 表格end -->
		<!-- 编辑弹框---start -->
		<el-dialog :title="formEditTitle" :visible.sync="dialogEdittVisible" width="700px">
			<el-form  :disabled="formEditDisabled" :inline="true" ref="formEdit" :model="formEdit" class="demo-form-inline">
				<el-form-item label="新闻标题" prop="title">
					<el-input v-model="formEdit.title" placeholder="新闻标题"></el-input>
				</el-form-item>
				<el-form-item label="新闻作者" prop="writer">
					<el-input v-model="formEdit.writer" placeholder="新闻作者"></el-input>
				</el-form-item>
					</el-form>
				<el-form   :disabled="formEditDisabled" ref="formEdit" :model="formEdit" class="demo-form-inline" width="700px" >
				<el-form-item   label="新闻内容" prop="content">
					<el-input type="textarea" width="700px" :rows="10" autosize  v-model="formEdit.content" placeholder="新闻内容"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
			    <el-button @click="dialogEdittVisible = false">取 消</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹框---end -->
		<div class="page">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginations.page_index"
			 :page-sizes="paginations.page_sizes" :page-size="paginations.page_size" :layout="paginations.layout" :total="paginations.total">
			</el-pagination>
		</div>
		<!-- <el-pagination background layout="prev, pager, next" :total="44"></el-pagination> -->
	</div>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {
		name: "NewsList",
		created() {
			// this.initTableData();
			this.getInfoList()
		},
		watch: {
			deleteNewsInfo: function(newInfo, oldInfo) {
				const type = newInfo.type;
				const message = newInfo.message;
				console.log("WATCH", newInfo);
				this.$message({
					message,
					type
				});
				// this.initTableData();
				this.getInfoList();
			}
		},
		computed: mapState({
			deleteNewsInfo: state => state.deleteNewsInfo
		}),
		mounted() {
			console.log("组件已经渲染完成");
		},
		methods: {
			...mapActions(["deleteNews"]),
			handleDelete(id) {
				const me = this;
				me.$confirm("确定删除新闻?", "提示", {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					console.log("确认删除了已经");
					me.deleteNews(id);
				});
				// .catch(() => {
				//   this.$message({
				//     type: "info",
				//     message: "已取消删除"
				//   });
				// });
			},
			
			//分页start
			getInfoList() {
				this.$axios.get('http://localhost:8080/news/rest/list').then(res => {
					// const data = res.data.num;
					// console.log(num)
					// this.tableData = data;
					console.log(res.data.news)
					this.allTableData = res.data.news;
					this.setPaginations()

				})
			},
			setPaginations() {
				this.paginations.total = this.allTableData.length; //数据的数量
				this.paginations.page_index = 1; //默认显示第一页
				this.paginations.page_size = 6; //每页显示多少数据
				//显示数据
				this.tableData = this.allTableData.filter((item, index) => {
					return index < this.paginations.page_size;
				})
			},
			handleSizeChange(page_size) {
				this.paginations.page_index = 1; //第一页
				this.paginations.page_size = page_size; //每页先显示多少数据
				this.tableData = this.allTableData.filter((item, index) => {
					return index < page_size
				})
			},
			handleCurrentChange(page) {
				// 跳转页数
				//获取当前页
				let index = this.paginations.page_size * (page - 1);
				//获取总数
				let allData = this.paginations.page_size * page;

				let tablist = [];
				for (let i = index; i < allData; i++) {
					if (this.allTableData[i]) {
						tablist.push(this.allTableData[i])
					}
					this.tableData = tablist
				}
			},
			// 分页end
			/**
			 * 打开详情页
			 */
			handleDetail(index, rowData) {
				// console.log(rowData)
				this.dialogEdittVisible = true;
				this.$nextTick(() => {
					this.dialogType = 'show';
					this.formEditTitle = '详情';
					this.formEditDisabled = true;
					this.formEdit = Object.assign({}, rowData);
					this.formEdit.gender += '';
				});

			}
			// 详情end
		},
		data() {
			return {
				// total:3,
				msg: "管理新闻",
				tableData: [],
				paginations: {
					page_index: 1, //当前页
					total: 0, //总数
					page_size: 5, //一页显示多少
					page_sizes: [2, 4, 6, 8], //每页显示多少条
					layout: 'total, sizes, prev, pager, next, jumper'
				},
				allTableData: [],

				formEditTitle: '新闻详情', //新增，编辑和查看标题
				formEditDisabled: false, //编辑弹窗是否可编辑
				dialogEdittVisible: false, //编辑弹框显示
				dialogType: '', //弹框类型：add,edit,show
				formEdit: { //表单编辑
					id: null,
					title: '',
					content: '',
					writer: '',

				}
			};
		}
	};
</script>


<style scoped>
	.list {
		color: red;
	}
</style>
