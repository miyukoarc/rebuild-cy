# 注意
样板模块url为/department/list，已在白名单中，直接访问即可

# vue规范
## API
$emit操作必须必须必须在改组件beforeDetroy生命周期中销毁，所有类似操作必须闭环
## methods
只包括直接修改data，提交form表单等操作
抽象的数据处理方法归纳到utils中，随引随用
## template
html语句内复杂禁止使用复杂逻辑判断，computed代替
## component
无状态（没有单独的data需要管理，纯展示组件）组件使用functionnal组件

******






# javascript规范

## 语法规范
尽可能少使用es5语法，统一使用箭头函数处理this指向问题

## utils
_除非无替代方法，禁止通过污染prototype的方式绑定方法_
数据处理方法抽象，并抽取，在utils文件夹下封装，随引随用
根据功能撰写jsDOC注释
例如
	/**
	*判断是否为空对象
	*@param {object} obj 
	*/
	export const isEmptyObject = (obj)=>{
		for (let key in obj) {
			return false
		} return true
	}
******






#  store规范

## state
### 列表类
基本状态：list currentRow loading
### 其他类别

## mutation
### 命名 （操作+数据）
操作（大写）：SET，SAVE，TOGGLE，CHANGE
下划线
数据（大写）：DATA。。。
例如：
	SAVE_LIST(state,payload){
		state.list = payload
	}

## action
### 命名（小驼峰）
例如getMyInfo（与api命名相同）
使用*Promise*对象包裹
有*then*有*catch*，抛出错误打印，
只在*action*中进行*commit*和*async*操作
例如：
	getMyInfo({commit},payload){
		return new Promise((resolve,reject)=>{
			getMyInfo(payload).then(()=>{
				resolve()
			}).catch(err=>{
				
				reject(err)
			})
		})
	}
******






# AJAX规范
使用axios对接后台
store统一处理ajax请求，命名与action相同，方便action统一处理,采用函数表达式/声明均可
返回一个axios对象
命名可以参考swagger-ui的url
例如:
要求写遵循jsDOC规范，写注释
    /**
    *获取我的用户信息
    *@param {object} payload
    */
    export const getUserList = (payload)=>{
    	return request({
    		url: '/user/getUserList',
    		method: 'get',
    		params: payload
    	})
    }
******

# mock数据
rebuild采用koa2构建了一个假后台，具体写法参考server目录




# 业务抽象
例如：
	@components/panel.vue
	/detail.vue
	/list.vue
	/event-create.vue
	/event-edit.vue
	/dialog.vue
页面主体为list，点击对应行弹出panel组件（Global），显示详细信息detail组件（Pravite），
点击对应create/edit/delete按钮，弹出dialog（Private）。根据按钮不同渲染不同的form表单


# electron说明
本项目采用electron-packager打包
background.js,为主进程