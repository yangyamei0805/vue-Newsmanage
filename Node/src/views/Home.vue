<template>
	    <div class="">

		<el-input type="search" v-model="search" style="width: 100%" placeholder="请输入关键字"></el-input>        
		 <el-table :data="tables" style="width: 100%" max-height=500>
			 <el-table-column label="新闻标题">
				 <template slot-scope="scope">    
				 	<span class="col-cont" v-html="showDate(scope.row.title)"></span>
				</template>
			</el-table-column>
		 	<el-table-column label="新闻作者">
				<template slot-scope="scope">
					 <span class="col-cont" v-html="showDate(scope.row.writer)"></span>
				</template>
				</el-table-column>
			        <el-table-column label="新闻内容">
				<template slot-scope="scope">
				 	<span class="col-cont" v-html="showDate(scope.row.content)"></span>
				</template>
				 </el-table-column>    
		</el-table> 
	</div>
	 
</template>

<script>
	export default {
		data() {
			return {
				search: '',
				tableData: []
			}
		},
		created() {
			this.getInfoList()
		},
		components: {},
		computed: {
			// 实时监听表格
			tables: function() {
				const search = this.search
				if (search) {
					return this.tableData.filter(dataNews => {
						return Object.keys(dataNews).some(key => {
							return String(dataNews[key]).toLowerCase().indexOf(search) > -1
						})
					})
				}
				return this.tableData
			}
		},
		mounted() {},
		methods: {
			getInfoList() {
				this.$axios.get('http://localhost:8080/news/rest/list').then(res => {

					// const data = res.data.num;
					// console.log(num)
					// this.tableData = data;
					console.log(res.data.news)
					this.tableData = res.data.news;


				})
			},
			// 筛选变色
			showDate(val) {
				val = val + '';
				if (val.indexOf(this.search) !== -1 && this.search !== '') {
					return val.replace(this.search, '<font color="#409EFF">' + this.search + '</font>')
				} else {
					return val
				}
			}
		}
	}
</script>
