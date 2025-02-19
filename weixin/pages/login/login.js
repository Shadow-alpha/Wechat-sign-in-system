// pages/login/login.js
const app=getApp()

Page({
    // 页面的初始数据
    data: {
        identity: '', //教师or学生,用于渲染页面
        type: null,  // 0 or 1,用于发送给后端
        page: '', // teacher or student,用于发送请求给不同文件
        isnull: false,
        islogin: true
    },
    // 生命周期函数--监听页面加载
    onLoad(option) {
        let identity = option.identity==="教师"?0:1
        let page = option.identity==="教师"?'teacher':'student'
        this.setData({
            identity: option.identity,
            type: identity,
            page: page
        })
    },
    // 生命周期函数--监听页面初次渲染完成
    onReady() {
        wx.setNavigationBarTitle({
            title: `${this.data.identity}登录`
        })
    },
    //点击登录按钮后处理
    formSubmit(e) {
        var id = e.detail.value.id
        var password = e.detail.value.password
        if (!id || !password) {
            this.setData({
                isnull: true
            })
        } else {
            this.setData({
                isnull: false
            })
            wx.request({
                url: app.globalData.ip +'/account_verify.php',
                header: { 'Content-Type': 'application/x-www-form-urlencoded' },
                method: 'POST',
                data:{
                    type: this.data.type,
                    id: id,
                    password: password
                },
                success:(res)=>{
                    if(res.data===0){
                        this.setData({ islogin: false})
                    }else{
                        app.globalData.type=this.data.type
                        this.getInfo(id)
                    }
                },
                fail:(res)=>{
                    wx.showToast({
                      title: '系统繁忙',
                      icon: 'error'
                    })
                }
            })
        }
    },
    //登录成功后获取个人信息和相关课程信息 并 跳转页面
    getInfo(id){
        wx.request({
            url: app.globalData.ip +`/${this.data.page}_prepare.php`,
            method: 'GET',
            data:{
                type: app.globalData.type,
                id: id
            },
            success:(res)=>{
                app.globalData.personInfo=res.data.shift()
                app.globalData.courseList=res.data
                wx.switchTab({
                    url: "/pages/sign/sign"
                  })
            },
            fail:(res)=>{
                wx.showToast({
                    title: '获取信息失败',
                    icon: 'error'
                  })
            }
          })
    }
})