// pages/student/leaveSearch/leaveSearch.js
const app=getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: 0,
        column: ['课程号','课程名','课次','请假时间','请假理由'],
        leaveList: [],
        showList: []
    },
     /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({status: +options.status})
        this.getInfoSubmitted()
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        let title="请假记录"
        switch(this.data.status){
            case 1: title="待审核"+title; break;
            case 2: title="已通过"+title; break;
            case 3: title="未通过"+title; break;
        }
        wx.setNavigationBarTitle({
            title: title
        })
    },
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        this.getInfoSubmitted()
    },
   
    //获取自己的请假记录
    getInfoSubmitted(){
        wx.showLoading({
          title: '数据加载中...',
        })
        wx.request({
            url: app.globalData.ip +'/student_leaving_search.php',
            method:'GET',
            data:{
                stu_id: app.globalData.personInfo.stu_id,
                type: this.data.status
            },
            success:(res)=>{
                const showList=JSON.parse(JSON.stringify(res.data))
                this.projection(showList)
                this.setData({ 
                    leaveList: res.data,
                    showList: showList
                })
            },
            complete:()=>{
                wx.hideLoading()
                wx.stopPullDownRefresh()
            }
          })
    },
    projection(arr){
        arr.forEach(function(v,i,arr){
            arr[i]=(({class_num,course_id,course_name,leave_time,reason})=>({course_id,course_name,class_num,leave_time,reason}))(v)
        });
    },
    //长按撤回请假
    longPress(e){
        if(this.data.status===1){
            wx.showModal({
                title: '提示',
                content: '你确认撤销吗？',
                complete: (res) => {
                    if (res.confirm) {
                        this.leaveRegret(e.detail)
                    }
                }
            })
        }
    },
    //撤回请假的后端请求
    leaveRegret(index){
        wx.showLoading({
          title: '正在处理中...',
        })
        wx.request({
            url: app.globalData.ip +'/student_leaving_delete.php',
            method:'GET',
            data:{
                code: this.data.leaveList[index].code
            },
            success:(res)=>{
                if(res.data){
                    wx.showToast({
                        title: '撤销成功',
                        icon: 'success'
                    })
                    setTimeout(function(){ wx.navigateBack() }, 1500)
                }else{ 
                    wx.showToast({
                        title: '撤销失败',
                        icon: 'error'
                    })
                }
            },
            fail:(res)=>{
                wx.showToast({
                  title: '系统繁忙',
                  icon: 'error'
                })
            }
          })
    }
})