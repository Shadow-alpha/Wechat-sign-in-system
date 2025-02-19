// pages/student/leaveForm/leaveForm.js
const app=getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        reason:'',
        count: 0,
        classInfo:{}
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({classInfo: JSON.parse(options.classInfo)})
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        wx.setNavigationBarTitle({
            title: "请假申请"
        })
    },
    //点击提交
    tapSubmit(e){
        if(this.data.count >= 10){
            wx.showModal({
                title: '提示',
                content: '你确定提交吗？',
                complete: (res) => {
                    if (res.confirm) {
                        this.submitLeave()
                    }
                }
            })
        }else{
            wx.showToast({
              title: '请填写不少于10个字',
              icon: 'none'
            })
        }
    },
    // 提交请假记录后的后端请求
    submitLeave(){
        const date=new Date()
        const datetime=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
            +' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        wx.showLoading({
          title: '正在处理中...'
        })
        wx.request({
            url: app.globalData.ip +'/student_leaving_submit.php',
            method: 'GET',
            data:{
                course_id: this.data.classInfo.course_id,
                class_num: this.data.classInfo.class_num,
                stu_id: app.globalData.personInfo.stu_id,
                leave_time: datetime,
                reason: this.data.reason
            },
            success:(res)=>{
                let title=""
                let icon='error'
                switch(res.data){
                    case 1: title="请假提交成功"; icon='success'; break; //请假成功
                    case 2: title="请勿重复提交"; break; //重复提交
                    default: title="请假失败，请稍后再试";break;
                }
                wx.showToast({
                    title: title,
                    icon: icon
                })
                setTimeout(function(){
                    wx.navigateBack()
                },1500)
            },
            fail:()=>{
                wx.showToast({
                    title: '系统繁忙，请稍后再试',
                    icon: 'error'
                })
            }
        })
    },

    //输入框的input事件，显示输入字数
    countLength(e){
        this.setData({
            reason: e.detail.value,
            count: e.detail.cursor
        })
    }
})