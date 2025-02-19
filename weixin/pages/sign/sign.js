// pages/sign/sign.js
const app=getApp()

Page({
    // 页面的初始数据
    data: {
        type: 0,
        columnList:['课程编号','课程名称','上课教室'],
        courseList:[],
        signList: [],
        codeInfo:{}
    },
    
    // 生命周期函数--监听页面加载
    onLoad(options) {
        this.setData({
            type: app.globalData.type,
            courseList: app.globalData.courseList
        })
    },
    onReady(){
        wx.setNavigationBarTitle({
            title: `${app.globalData.type?'学生':'教师'}签到`
        })
    },
    //教师部分
    //点击查询这门课每个课次签到统计情况
    teacherInquire(e){
        wx.navigateTo({
          url: '/pages/teacher/register/register?index='+e.detail
        })
    },
    //点击发布二维码
    publishSign(){
        wx.navigateTo({
          url: '/pages/teacher/qrcode/qrcode?courseList='+
          JSON.stringify(this.data.courseList)
        })
    },
    //点击查看已发布的二维码信息
    qrcodeInquire(e){
        wx.navigateTo({
          url: '/pages/teacher/codeSearch/codeSearch?index='+e.detail
        })
    },
    //学生部分
    //查询签到情况
    studentInquire(e){
        wx.navigateTo({
          url: '/pages/student/register/register?index='+e.detail,
        })
    },
    //学生扫码后业务
    studentTap(){
        wx.scanCode({
            onlyFromCamera: true,
            scanType: 'qrCode',
            success:(res)=>{
                this.setData({ codeInfo: JSON.parse(res.result)||{} })
                if(this.data.codeInfo){
                    this.scanRequest()
                }else{
                    wx.showToast({
                      title: '该二维码不是签到二维码',
                      icon: 'error'
                    })
                }
            },
            fail:(res)=>{
                wx.showToast({
                    title: '扫码失败',
                    icon: 'error'
                })
            }
        })
    },
    //扫码成功后请求
    scanRequest(){
        const date=new Date()
        const datetime=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
            +' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()
        wx.showLoading({
            title: '正在处理中...',
        })
        wx.request({
            url: app.globalData.ip +'/student_register_submit.php',
            method: 'GET',
            data: {
                stu_id: app.globalData.personInfo.stu_id,
                course_id: this.data.codeInfo.course_id,
                class_num: this.data.codeInfo.class_num,
                sign_time: datetime
            },
            success:(res)=>{
                let title=''
                let icon='error'
                switch(res.data){
                    case 0: title="你没有选这门课"; break;
                    case 1: title="签到成功"; icon='success'; break;
                    case 2: title="签到还未开始"; break;
                    case 3: title="签到已经结束"; break;
                    case 4: title="请勿重复签到"; break;
                    case 5: title="签到已撤销"; break;
                    default: title="该二维码不是签到二维码";
                }
                wx.showToast({
                    title: title,
                    icon: icon
                })
            },
            fail:(res)=>{
                wx.showToast({
                    title: '处理失败',
                    icon: 'error'
                })
            }
        })
    }
})