// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    startGame: function () {
        wx.showModal({
            title: '游戏开始',
            content: '提示：开始前请认真阅读游戏规则！',
            confirmText: '确定',
            confirmColor: '#007bff',
            cancelText: '规则', // 显示取消按钮
            cancelColor: '#333',
            success: function (res) {
                if (res.confirm) {
                    // 用户点击确定按钮后的操作
                    wx.navigateTo({
                    url: '/pages/modes/modes' // 规则页面的路径，根据实际路径进行调整
                    });
                } else if (res.cancel) {
                    // 用户点击取消按钮后的操作，跳转到规则页面
                    wx.navigateTo({
                        url: '/pages/rules/rules' // 规则页面的路径，根据实际路径进行调整
                    });
                }
            }
        });
    },

    openRules: function () {
        wx.navigateTo({
            url: '/pages/rules/rules' // 规则页面的路径，根据实际路径进行调整
        });
    },
      



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})