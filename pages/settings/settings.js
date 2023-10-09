// settings.js
Page({
    data: {
      totalRounds: 10, // 总局数
      player1Chips: 1000, // 玩家1的筹码
      player2Chips: 1000, // 玩家2的筹码
    },
  
    // 提交表单
    submitForm: function (e) {
        const formData = e.detail.value;
        // 根据用户输入的值更新游戏变量
        this.setData({
            totalRounds: formData.totalRounds,
            player1Chips: formData.player1Chips,
            player2Chips: formData.player2Chips,
        });
      
        wx.navigateTo({
            url: '/pages/vsgame/vsgame?param1='+ this.data.totalRounds + '&param2=' + this.data.player1Chips + '&param3=' + this.data.player2Chips,
        });
    },
  
    // 返回到模式选择页面
    goToHomePage: function () {
        wx.navigateTo({
            url: '/pages/modes/modes' // 规则页面的路径，根据实际路径进行调整
        });
    },
  });
  