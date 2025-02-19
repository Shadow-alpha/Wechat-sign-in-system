import drawQrcode from '../../../utils/weapp.qrcode.esm.js'
const app=getApp()

const datetime=new Date()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: {},
        courseList: [],
        course_index: 0,
        date: datetime.getFullYear()+'-'+(datetime.getMonth()+1)+'-'+datetime.getDate(),
        start_time: '00:00',
        end_time: '23:59',
        former: '00:00',
        latter: '23:59',
        isabled: true,
        class_num: 0
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            courseList: JSON.parse(options.courseList)
        })
     },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        wx.setNavigationBarTitle({
            title: "签到二维码"
        })
    },
    //picker的change事件函数，将数据与页面绑定
    courseChange(e){
        this.setData({
            course_index: +e.detail.value
        })
    },
    dateChange(e){
        this.setData({
            date: e.detail.value
        })
    },
    timeChange(e){
        if(e.target.dataset.type==="start"){
            this.setData({
                start_time: e.detail.value,
                former: e.detail.value
            })
        }else if(e.target.dataset.type==="end"){
            this.setData({
                end_time: e.detail.value,
                latter: e.detail.value
            })
        }
    },
    //判断提交时间是否在过去
    isPast(){
        const date=new Date(this.data.date+' '+this.data.end_time)
        const now=new Date()
        return date < now
    },
    //请求生成签到信息
    sendInfo(){
        wx.showLoading({
          title: '正在生成中...',
        })
        wx.request({
            url: app.globalData.ip +'/teacher_class_release.php',
            method:'GET',
            data:{
              course_id: this.data.courseList[this.data.course_index].course_id,
              date: this.data.date,
              start_time: this.data.start_time,
              end_time: this.data.end_time
            },
            success:(res)=>{
               if(res.data){
                   wx.showToast({
                     title: '二维码发布成功',
                     icon:'success'
                   })
                   this.setData({ 
                       isabled: false,
                       class_num: res.data
                  })
                   this.generateQrcode()
               }else{
                   wx.showToast({
                     title: '请求失败',
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
    //点击生成二维码后处理
    formSubmit(e){
        if(this.isPast()){
            wx.showToast({
              title: '请勿填过去时间',
              icon: 'error'
            })
            return ;
        }
        this.sendInfo()
    },
    //根据填写的信息绘制二维码
    generateQrcode(){
        const text={
            course_id: this.data.courseList[this.data.course_index].course_id,
            class_num: this.data.class_num,
            date: this.data.date,
            start_time: this.data.start_time,
            end_time: this.data.end_time
        }
        this.setData({ info: text })
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
    }
})