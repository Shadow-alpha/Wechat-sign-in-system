// pages/first/first.js
Page({
    // 页面的初始数据
    data: {
        ischecked: false //是否勾选checkbox
    },
    // 生命周期函数--监听页面初次渲染完成
    onReady() {
        wx.setNavigationBarTitle({
            title: '身份选择'
        })
    },
    //勾选左下角checkbox
    handlecheck(e) {
        this.setData({
            ischecked: !this.data.ischecked
        })
    },
    //点击登录按钮
    handleclick(e) {
        if (this.data.ischecked) {
            wx.navigateTo({
                url: "/pages/login/login?identity=" + e.target.dataset.identity
            })
        } else {
            wx.showToast({
                title: "请先阅读并同意《微信点名系统说明》",
                icon: 'none'
            })
        }
    }
})