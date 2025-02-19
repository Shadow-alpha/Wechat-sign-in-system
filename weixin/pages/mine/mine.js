// pages/mine/mine.js
const app=getApp()

Page({
    // 页面的初始数据
    data: {
        type: 0,
        personInfo:{}
    },
    // 生命周期函数--监听页面加载
    onLoad(options) {
        this.setData({
            type: app.globalData.type,
            personInfo: app.globalData.personInfo
        })
    },
    // 生命周期函数--监听页面初次渲染完成
    onReady() {
        wx.setNavigationBarTitle({
            title: "我的"
        })
    },
    //点击退出登录后
    handleExit(){
        wx.showModal({
          title: '提示',
          content: '您确定要退出登录吗？',
          complete: (res) => {
            if (res.confirm) {
                app.globalData.personInfo={}
                app.globalData.courseList=[]
                wx.reLaunch({
                  url: '/pages/index/index'
               })
            }
          }
        })
    }
})