<template>
	  <div id="app">
		<el-table :data="tableData" class="tb-edit" style="width: 100%" highlight-current-row @row-click="handleCurrentChange">
			<el-table-column label="新闻标题" width="180">
				<template scope="scope">
					<el-input   autosize v-model="scope.row.title" placeholder="请输入新闻标题" @change="handleEdit(scope.$index, scope.row)"></el-input>
					<span>{{scope.row.title}}</span>
				</template>
			</el-table-column>
			<el-table-column label="新闻作者" width="180">
				<template scope="scope">
					<el-input   autosize v-model="scope.row.writer" placeholder="请输入新闻作者" @change="handleEdit(scope.$index, scope.row)"></el-input>
					<span>{{scope.row.writer}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="content" label="新闻内容">
				<template scope="scope">
					<el-input  autosize v-model="scope.row.content" placeholder="请输入新闻内容" @change="handleEdit(scope.$index, scope.row)"></el-input>
					<span>{{scope.row.content}}</span>
				</template>
			</el-table-column>
			
		</el-table>
		<br>数据:{{tableData}}
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tableData: []
			}
		},
		created() {
//渲染成功
			this.getInfoList()
		},
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
			handleCurrentChange(row, event, column) {
				console.log(row, event, column, event.currentTarget)
			},
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			}
		}


	}
</script>

<style>
	.cell-edit-input .el-input,
	.el-input__inner {
		width: 100px;
	}

	.cell-icon {
		cursor: pointer;
		color: #fff;
	}
	span{
		white-space: nowrap;
	}
</style>
