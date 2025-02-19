// pages/teacher/codeSearch/codeSearch.js
const app=getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: 0,
        column:['课次','签到日期','开始时间','结束时间'],
        codeList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({index: +options.index})
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        wx.setNavigationBarTitle({
            title: app.globalData.courseList[this.data.index].course_id+"已发布签到"
        })
    },
    //生命周期函数--监听页面显示
    onShow() {
        this.getCodeInfo()
    },

    //获取该课程所有已发布二维码信息
    getCodeInfo(){
        wx.showLoading({
          title: '数据加载中...',
        })
        wx.request({
            url: app.globalData.ip +'/teacher_class_delete_prepare.php',
            method: 'GET',
            data:{
                course_id: app.globalData.courseList[this.data.index].course_id
            },
            success:(res)=>{
                this.setData({codeList: res.data})
            },
            complete:()=>{ wx.hideLoading() }
        })
    },
    //点击每一行可查看相应二维码并选择撤销
    checkQrcode(e){
        wx.navigateTo({
          url: '/pages/teacher/codeCheck/codeCheck?index='+this.data.index
          +'&info='+JSON.stringify(this.data.codeList[e.detail])
        })
    }
})