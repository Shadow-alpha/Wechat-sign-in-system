// pages/leave/leave.js
const app=getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: 0,
        //教师
        info: [],
        column_teacher: ['课程号','课程名','课次','学生号','学生姓名'],
        pendingList:[],//待处理列表
        passList:[],//审核不通过列表
        solvedList:[],//审核通过列表
        //学生
        column_absence: ['课程号','课程名','课次'],
        absenceList:[],
        column_submitted: [],
        leaveList: []
    },  
     /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({type: app.globalData.type})
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        wx.setNavigationBarTitle({
            title: `${app.globalData.type?'学生':'教师'}请假`
        })
    }, 
    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        if(app.globalData.type){ this.getInfoStudentAbsence() }
        else { this.getInfoTeacher() }
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        if(app.globalData.type){ this.getInfoStudentAbsence() }
        else { this.getInfoTeacher() }
    },
    //教师
    // 获取请假信息
    getInfoTeacher(){
        wx.showLoading({
          title: '数据加载中...',
        })
        wx.request({
          url: app.globalData.ip +'/teacher_leaving_search.php',
          method: 'GET',
          data:{
              teacher_id: app.globalData.personInfo.teacher_id
          },
          success:(res)=>{
              const pending=JSON.parse(JSON.stringify(res.data[0]))
              const solved=JSON.parse(JSON.stringify(res.data[1]))
              const pass=JSON.parse(JSON.stringify(res.data[2]))
              this.projection(pending);
              this.projection(solved);
              this.projection(pass);
              this.setData({
                  info: res.data,
                  pendingList: pending,
                  solvedList: solved,
                  passList: pass
              })
          },
          complete:()=>{
              wx.hideLoading()
              wx.stopPullDownRefresh()
          }
        });
    },
    //返回需要渲染到页面上的列
    projection(arr){
        arr.forEach(function(v,i,arr){
            arr[i]=(({class_num,course_id,course_name,name,stu_id})=>({course_id,course_name,class_num,stu_id,name}))(v)
        });
        return arr;
    },
    //点击未审批记录后跳转
    leaveDecideSee(e){
        const num = e.target.dataset.num
        wx.navigateTo({
          url: '/pages/teacher/leaveDecide/leaveDecide?info='+
          JSON.stringify(this.data.info[num][e.detail])+'&isshow='+num
        })
    },
 
    //学生
    //获取缺勤记录
    getInfoStudentAbsence(){
        wx.showLoading({
          title: '数据加载中...',
        })
        wx.request({
          url: app.globalData.ip +'/student_leaving_submit_prepare.php',
          method:'GET',
          data:{
              stu_id: app.globalData.personInfo.stu_id
          },
          success:(res)=>{
              this.setData({absenceList:res.data})
          },
          complete:()=>{
              wx.hideLoading()
              wx.stopPullDownRefresh()
          }
        })
    },
    //点击缺勤记录提交信息
    leaveSubmit(e){
        wx.navigateTo({
          url: '/pages/student/leaveForm/leaveForm?classInfo='
          +JSON.stringify(this.data.absenceList[e.detail])
        })
    },
    //点击button查看请假信息
    leaveSearch(e){
        // console.log(+e.target.dataset.type)
        wx.navigateTo({
          url: '/pages/student/leaveSearch/leaveSearch?status='
          +e.target.dataset.type
        })
    }
})