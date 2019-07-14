import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import {
	mutations
} from './mutations'


Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// 左侧菜单栏数据
		menuItems: [{
				name: 'home', // 要跳转的路由名称 不是路径
				size: 18, // icon大小
				type: 'md-home', // icon类型
				text: '主页' // 文本内容
			},
			{
				text: '新闻管理',
				type: 'ios-paper',
				children: [{
						type: 'md-lock',
						name: 'newsadd',
						text: '添加新闻vuex'
					}, {
						type: 'md-person',
						name: 'newslist',
						text: '管理新闻vuex',
					}, {
						type: 'ios-grid',
						name: 't1',
						text: '管理新闻vue'
					}, {
						type: 'ios-notifications-outline',
						name: 'add',
						text: '添加新闻vue'
					},{
						type: 'ios-grid',
						name: 'password',
						text: '测试用的'
					},{
						type: 'md-person',
						name: 'userinfo',
						text: '关于我'
					}


				]
			}
		],
		//提交数据是否成功
		infoSuccess: "",
		deleteNewsInfo: {
			type: "",
			message: ""
		},
		modNewsInfo: {
			type: "",
			message: ""
		}
	},
	actions,
	mutations
	// mutations: {
	// 	setMenus(state, items) {
	// 		state.menuItems = [...items]
	// 	},
	// }
})



//1.掌管了整个项目的状态
//2.不需要再对应的组件内部再去使用data
//3.actions用户能够点击action
//4.action调用mutations 修改状态
