// pages/teacher/register/register.js
const app=getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        column: ['课次','签到人数','缺勤人数','请假人数'],
        registerList:[],
        index: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({index: options.index})
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        wx.setNavigationBarTitle({
            title: `${app.globalData.courseList[this.data.index].course_id}课程签到情况`
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        this.getRegisterInfo()
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        this.getRegisterInfo()
    },
    //获取签到总体信息
    getRegisterInfo(){
        wx.showLoading({
          title: '数据加载中...',
        })
        wx.request({
            url: app.globalData.ip +'/teacher_register_search_general.php',
            method: 'GET',
            data:{
                course_id: app.globalData.courseList[this.data.index].course_id
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
    },
    //点击每一行查看每名学生具体签到信息
    detailInquire(e){
        wx.navigateTo({
          url: '../detailRegister/detailRegister?num='
          +this.data.registerList[e.detail].class_num+'&index='+this.data.index
        })
    }
})