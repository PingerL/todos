//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    istrue:false,
    todos: wx.getStorageSync('todos') || [], // 设置初始值，从缓存中获取或设置为空数组
    msg:''
  },
  // inputChangehandle 函数，当输入框输入内容改变时，将输入的值保存到 data 上去，使用 this.setData() 方法
  inputChangehandle(e){
    this.setData({msg:e.detail.value})
  },
  // addToHandle 函数用来将新增的事件添加进 todos ，并更新缓存中的数据
  addToHandle(){
    if(!this.data.msg) {
      wx.showToast({title:'事件不能为空',icon:'none'})
      return
    }
    let todo = this.data.todos
    todo.push({
      name:this.data.msg,
      completed:false
    })
    this.setData({
      todos:todo,
      msg:''
      })
    this.addToLocalHandle()
  },
  // addToLocalHandle 函数用来将数据更新到缓存中
  addToLocalHandle(){
    console.log('setlocalstage')
    let todos = this.data.todos
    wx.setStorageSync('todos', todos)
    console.log('setok')
  },
  // toggleTodoHandle 函数用来切换任务的完成状态
  toggleTodoHandle(e){
    // console.log(e.currentTarget.dataset.index)
    // 切换当前 item 的完成状态
    let item = this.data.todos[e.currentTarget.dataset.index]
    item.completed = !item.completed
    this.setData({todos:this.data.todos})
    this.addToLocalHandle()
  },
  // removeTodoHandle 函数用来删除任务事件
  removeTodoHandle(e){
    let item = e.currentTarget.dataset.index
    this.data.todos.splice(item,1)
    this.setData({ todos: this.data.todos })
    // 删除事件的同时清除缓存,再将数据重新缓存
    wx.clearStorage()
    this.addToLocalHandle()
  }
})
