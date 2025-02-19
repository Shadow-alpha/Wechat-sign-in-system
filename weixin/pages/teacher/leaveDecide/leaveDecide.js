// pages/teacher/leaveDecide/leaveDecide.js
const app=getApp()

Page({
    /**
     * 页面的初始数据
     */
    data: {
        leaveInfo:[],
        isshow: true
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({ 
            leaveInfo:JSON.parse(options.info),
            isshow: !(+options.isshow)
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        wx.setNavigationBarTitle({
            title: "请假审批"
        })
    },
    //将请假信息发送到后台
    sendLeaveInfo(decision){
        wx.showLoading({
          title: '正在处理中...',
        })
        wx.request({
            url: app.globalData.ip +'/teacher_leaving_decide.php',
            method: 'GET',
            data:{
                code: this.data.leaveInfo.code,
                decision: decision
            },
            success:(res)=>{
                if(res.data===1){
                    wx.showToast({
                      title: '提交成功',
                      icon: 'success',
                    })
                    setTimeout(function(){
                        wx.navigateBack()
                    },1500)
                }else{
                    wx.showToast({
                        title: '提交失败，请稍后再试',
                        icon: 'error'
                    })
                }
            },
            fail:()=>{
                wx.showToast({
                    title: '系统繁忙，请稍后再试',
                    icon: 'error'
                })         
            }
        })
    },
    //点击按钮后处理过程
    leaveCheck(e){
        const content= +e.target.dataset.decision?'通过':'不通过'
        wx.showModal({
            title: '提示',
            content: `你确定选择 ${content} 吗？`,
            complete: (res) => {
                if (res.confirm) {
                    this.sendLeaveInfo(+e.target.dataset.decision)
                }
            }
        })
    }
})