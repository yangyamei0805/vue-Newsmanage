<template>
  <div class="basetable" v-loading="loading" element-loading-text="拼命加载中">
    <div class="selectMenu">
      <!-- <el-date-picker v-model="value6" type="daterange" placeholder="选择日期范围">
      </el-date-picker> -->
      <el-button type="primary" @click="add">新增</el-button>
    </div>
    <div class="tableMain">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="新闻标题" width="180">
        </el-table-column>
        <el-table-column prop="writer" label="新闻作者" width="180">
        </el-table-column>
       <el-table-column prop="writer" label="发布时间" width="180">
       </el-table-column>
        <el-table-column prop="content" label="新闻内容">
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- <div class="page">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
      </el-pagination>
    </div> -->
    <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="新闻标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新闻作者" :label-width="formLabelWidth">
          <el-input v-model="form.writer" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新闻内容" :label-width="formLabelWidth">
          <el-input v-model="form.content" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { reformat } from '../components/reformartDate'

export default {
  data() {
    return {
      loading: true,
      tableData: [],
      dialogFormVisible: false,
      formLabelWidth: '80px',
      form: {},
      value6: '',
      currentPage3: 1,
      currentIndex: '',
    }
  },
  created() {
    setTimeout(() => {
      this.loading = false
    }, 1500),
	this.getInfoList()
  },
  methods: {
	  
    showTime() {
      this.$alert(this.value6, '起止时间', {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: '已显示'
          })
        }
      })
    },
	getInfoList() {
		this.$axios.get('http://localhost:8080/news/rest/list').then(res => {
			// const data = res.data.num;
			// console.log(num)
			// this.tableData = data;
			console.log(res.data.news)
			this.tableData = res.data.news;
		})
	},
    add() {
      this.form = {
        title: '',
        writer: '',
        content: '',
        
      }
      this.dialogFormVisible = true
    },
    update() {
      this.form.date = reformat(this.form.date)
      this.tableData.push(this.form)
      this.dialogFormVisible = false
    },
    handleEdit(index, row) {
      this.form = this.tableData[index]
      this.currentIndex = index
      this.dialogFormVisible = true
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    cancel() {
      this.dialogFormVisible = false
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  },
}
</script>
<style >
.basetable {
  .selectMenu {}
  .tableMain {
    margin: {
      top: 10px;
    }
  }
  .page {
    float: right;
    margin: {
      top: 10px;
    }
  }
}
</style>
