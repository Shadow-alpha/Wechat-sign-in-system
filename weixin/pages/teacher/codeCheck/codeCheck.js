import drawQrcode from '../../../utils/weapp.qrcode.esm.js'

const app=getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        index: 0,
        info: {}, //储存二维码背后信息
        course_id: '',
        course_name: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({ 
            index: +options.index,
            info: JSON.parse(options.info),
            course_id: app.globalData.courseList[+options.index].course_id,
            course_name: app.globalData.courseList[+options.index].course_name
        })
        this.generateQrcode()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        wx.setNavigationBarTitle({
            title: "查看签到二维码"
        })
    },
    //绘制二维码
    generateQrcode(){
        const text={
            course_id: this.data.course_id,
            class_num: this.data.info.class_num,
            date: this.data.info.date,
            start_time: this.data.info.start_time,
            end_time: this.data.info.end_time
        }
        drawQrcode({
            width: 300, 
            height: 300, 
            canvasId: 'sign',
            background:'#ffffff', 
            foreground: '#2bb15e', 
            text: JSON.stringify(text), 
            image: {
              imageResource: '/image/index_logo.png',
              dx: 120,
              dy: 120,
              dWidth: 60,
              dHeight: 60
            }
          })
    },
    //点击撤销按钮
    tapRegret(){
        wx.showModal({
          title: '提示',
          content: '你确定要撤销本次签到吗？',
          complete: (res) => {
            if (res.confirm) {
                this.regreteSign()
            }
          }
        })
    },
    //撤销确定后的后台请求
    regreteSign(){
        wx.showLoading({
            title: '正在撤销中...',
        })
        wx.request({
            url: app.globalData.ip +'/teacher_class_delete.php',
            method: 'GET',
            data:{
                course_id: this.data.course_id,
                class_num: this.data.info.class_num
            },
            success:(res)=>{
                if(res.data===1){
                    wx.showToast({
                        title: '撤销成功',
                        icon: 'success'
                    })
                    setTimeout(function(){ wx.navigateBack()},1500)
                }else{
                    wx.showToast({
                        title: '撤销失败，请稍后再试',
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
    }
})