// pages/teacher/detailRegister/detailRegister.js
const app=getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        column:['学生姓名','学号','签到时间','签到状态'],
        registerList:[],
        index: 0, //courseList的索引号
        num: 0 //上一页的行数
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            index: +options.index,
            num: +options.num
        })
        this.getDetailInfo()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        wx.setNavigationBarTitle({
            title: `${app.globalData.courseList[this.data.index].course_id}第${this.data.num}次课签到情况`
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        this.getDetailInfo()
    },
    //获取每名学生具体签到情况
    getDetailInfo(){
        wx.showLoading({
            title: '数据加载中...',
          })
        wx.request({
            url: app.globalData.ip +'/teacher_register_search_specific.php',
            method: 'GET',
            data:{
                course_id: app.globalData.courseList[this.data.index].course_id,
                class_num: this.data.num
            },
            success:(res)=>{
                this.setData({
                    registerList: res.data,
                })
            },
            complete:()=>{
                wx.hideLoading()
                wx.stopPullDownRefresh()
            }
        })
    }
})