// pages/student/register/register.js
const app=getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        column: ['课次','签到时间','签到状态'],
        registerList: [],
        index: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({index: options.index})
        this.getSignInfo()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        wx.setNavigationBarTitle({
            title: `${app.globalData.courseList[this.data.index].course_name}课程签到情况`
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        this.getSignInfo()
    },
    //获取学生签到信息
    getSignInfo(){
        wx.showLoading({
          title: '数据加载中...',
        })
        wx.request({
            url: app.globalData.ip +'/student_register_search.php',
            method: 'GET',
            data:{
                stu_id: app.globalData.personInfo.stu_id,
                course_id: app.globalData.courseList[this.data.index].course_id
            },
            success:(res)=>{
               this.setData({
                   registerList: res.data
               })
            },
            complete:()=>{
                wx.hideLoading()
                wx.stopPullDownRefresh()
            }
          })
    }
})