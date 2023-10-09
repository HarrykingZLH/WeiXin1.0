// pages/modes/modes.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        number: 10,
        jettonPlayer1: 1000,
        jettonPlayer2: 1000
    },

    // 在游戏模式选择页面的.js文件中
    LocalBattles: function () {
        wx.navigateTo({
            url: '/pages/vsgame/vsgame?param1=10&param2=1000&param3=1000',
        });
    },

    startMediumMode: function () {
      // 处理选择中等模式的逻辑
      // 可以跳转到中等模式游戏页面
    },
    startHardMode: function () {
      // 处理选择困难模式的逻辑
      // 可以跳转到困难模式游戏页面
    },

    goToHomePage: function () {
        wx.navigateTo({
            url: '/pages/home/home' // 规则页面的路径，根据实际路径进行调整
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