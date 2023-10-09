Page({
    data: {
        player: "player1",
        number: 10,
        count: 1,
        jettonPlayer1: 1000,
        jettonPlayer2: 1000,
        multiplierOptions: [0, 1, 2, 3],
        sum: 1,
        isMultiplierEnabled: false,

        playerDice1: [], // 玩家1的骰子，每个骰子包括 value 属性
        playerLock1: [], // 玩家1锁定的骰子，每个骰子包括 value 属性
        playerHaveLock1: 0,
        hasThrownDice1: false, // 重置投掷标志
        player1Multiplier: 0,
        

        playerDice2: [], // 玩家2的骰子，每个骰子包括 value 属性
        playerLock2: [], // 玩家2锁定的骰子，每个骰子包括 value 属性
        playerHaveLock2: 0,
        hasThrownDice2: false, // 重置投掷标志
        player2Multiplier: 0,

        diceImages: { // 存储骰子图片地址的字典
            1: '/images/骰子/dice-1.png',
            2: '/images/骰子/dice-2.png',
            3: '/images/骰子/dice-3.png',
            4: '/images/骰子/dice-4.png',
            5: '/images/骰子/dice-5.png',
            6: '/images/骰子/dice-6.png',
        },
        rounds: 0, // 回合计数
    },
  
    onLoad: function (option) {
        // 初始化游戏数据和界面
        const number = Number(option.param1);
        const jettonPlayer1 = Number(option.param2);
        const jettonPlayer2 = Number(option.param3);
        
        this.setData({
            number,
            jettonPlayer1,
            jettonPlayer2,
        });
        
        this.showGameSettingsModal();
        this.initGame();

    },

    showGameSettingsModal() {
        wx.showModal({
            title: '游戏设置',

            content: '玩家1的筹码：' + this.data.jettonPlayer1 + '\r\n玩家2的筹码：' + this.data.jettonPlayer2 + '\r\n局数：' + this.data.number,
            confirmText: '确定',
            confirmColor: '#007bff',
            cancelText: '设置', // 显示取消按钮
            cancelColor: '#333',

            success: function (res) {
                if (res.confirm) {
                    return;
                } else if (res.cancel) {
                    wx.navigateTo({
                        url: '/pages/settings/settings',
                    });
                }
            },
        });
      },

    initGame: function () {
        // 初始化玩家和对手的骰子数据
        this.setData({
            playerDice1: [1, 2, 3, 4, 5], // 示例数据，根据实际情况设置骰子的值
            playerLock1: [], // 玩家1锁定的骰子，每个骰子包括 value 属性
            playerHaveLock1: 0,
            hasThrownDice1: false, // 重置投掷标志
            player1Multiplier: 0,
            

            playerDice2: [6, 5,4, 3, 2], // 示例数据，根据实际情况设置骰子的值
            playerLock2: [], // 玩家2锁定的骰子，每个骰子包括 value 属性
            playerHaveLock2: 0,
            hasThrownDice2: false, // 重置投掷标志
            player2Multiplier: 0,

            rounds:1,
            sum: 1,
            isMultiplierEnabled: false,
        });
    },
  

    // 玩家投掷骰子逻辑
    throwDicePlayer1: function () {
        if (this.warning1('player1') || this.warning3(this.data.hasThrownDice1)) 
            return;

        // 实现玩家投掷骰子的逻辑，更新玩家骰子数据
        const playerDice1 = this.generateRandomDiceValues(this.data.playerDice1.length);
        const sum = this.data.sum + this.data.player1Multiplier + this.data.player2Multiplier;
        this.setData({
            playerDice1,
            sum,
            player1Multiplier: 0,
            player2Multiplier: 0,
            hasThrownDice1: true, // 标记为已投掷
            isMultiplierEnabled: false,
        });

        if (this.data.rounds == 3) {
            this.endTurn_player1;
        }
    },
  

    // 实现锁定骰子的逻辑，将骰子从投掷区移动到锁定区
    lockDicePlayer1: function (e) {
        if (this.warning1('player1') || this.warning2(this.data.hasThrownDice1)) 
            return;


        // 示例代码，根据实际情况处理骰子的锁定
        const id = e.currentTarget.dataset.id;
        const idx = e.currentTarget.dataset.key;

        // 从玩家骰子中移除该值的骰子并加入玩家锁定区
        const playerDice1 = this.data.playerDice1.filter((val, index, arr) => {
            return index !== idx;
        })
        const playerLock1 = this.data.playerLock1;
        playerLock1.push(id);

        this.setData({
            playerDice1,
            playerLock1
        });
    },
  
    // 解锁骰子
    unlockDicePlayer1: function (e) {
        if (this.warning1('player1') || this.warning2(this.data.hasThrownDice1)) 
            return;


        // 示例代码，根据实际情况处理骰子的锁定
        const id = e.currentTarget.dataset.id;
        const idx = e.currentTarget.dataset.key;

        if (idx < this.data.playerHaveLock1) {
            wx.showToast({
                title: '已锁定！',
                icon: 'none',
                duration: 2000,
            });
            return;
        }

        // 从玩家骰子中移除该值的骰子并加入玩家锁定区
        const playerLock1 = this.data.playerLock1.filter((val, index, arr) => {
            return index !== idx;
        })
        const playerDice1 = this.data.playerDice1;
        playerDice1.push(id);

        this.setData({
            playerDice1,
            playerLock1
        });
    },
  
    // 结束回合逻辑
    endTurn_player1: function () {
        if (this.warning1('player1') || this.warning2(this.data.hasThrownDice1)) 
            return;

        wx.showToast({
            title: '玩家1回合结束',
            icon: 'none',
            duration: 2000,
        });

        if (this.data.rounds == 3) {
            const currentPage = getCurrentPages().pop();
            const playerLock1 = this.data.playerLock1
            playerLock1.push(...currentPage.data.playerDice1);
            this.setData({   
                playerDice1: [],
                playerLock1
            });
        }

        // 实现结束回合逻辑，切换玩家并更新游戏状态
        const player = this.data.player == 'player1' ? 'player2' : 'player1';
        const playerHaveLock1 = this.data.playerLock1.length;
        this.setData({
            player,
            playerHaveLock1,
            hasThrownDice1: false
        });
    },

    // 玩家投掷骰子逻辑
    throwDicePlayer2: function () {
        if (this.warning1('player2') || this.warning3(this.data.hasThrownDice2)) 
            return;


        // 实现玩家投掷骰子的逻辑，更新玩家骰子数据
        const playerDice2 = this.generateRandomDiceValues(this.data.playerDice2.length);
        this.setData({
            playerDice2,
            hasThrownDice2: true, // 标记为已投掷
        });

        if (this.data.rounds == 3) {
            this.endTurn_player2;
        }
    },
  

    // 实现锁定骰子的逻辑，将骰子从投掷区移动到锁定区
    lockDicePlayer2: function (e) {
        if (this.warning1('player2') || this.warning2(this.data.hasThrownDice2))
            return;


        // 示例代码，根据实际情况处理骰子的锁定
        const id = e.currentTarget.dataset.id;
        const idx = e.currentTarget.dataset.key;

        // 从玩家骰子中移除该值的骰子并加入玩家锁定区
        const playerDice2 = this.data.playerDice2.filter((val, index, arr) => {
            return index !== idx;
        })
        const playerLock2 = this.data.playerLock2;
        playerLock2.push(id);

        this.setData({
            playerDice2,
            playerLock2
        });

    },
  
    // 解锁骰子
    unlockDicePlayer2: function (e) {
        if (this.warning1('player2') || this.warning2(this.data.hasThrownDice2)) 
            return;

        // 示例代码，根据实际情况处理骰子的锁定
        const id = e.currentTarget.dataset.id;
        const idx = e.currentTarget.dataset.key;
        
        if (idx < this.data.playerHaveLock2) {
            wx.showToast({
                title: '已锁定！',
                icon: 'none',
                duration: 2000,
            });
            return;
        }

        // 从玩家骰子中移除该值的骰子并加入玩家锁定区
        const playerLock2 = this.data.playerLock2.filter((val, index, arr) => {
            return index !== idx;
        })
        const playerDice2 = this.data.playerDice2;
        playerDice2.push(id);

        this.setData({
            playerDice2,
            playerLock2
        });
    },
  
    // 结束回合逻辑
    endTurn_player2: function () {
        if (this.warning1('player2') || this.warning2(this.data.hasThrownDice2))
            return;

        wx.showToast({
            title: '玩家2回合结束',
            icon: 'none',
            duration: 2000,
        });

        // 实现结束回合逻辑，切换玩家并更新游戏状态
        const player = this.data.player == 'player2' ? 'player1' : 'player2';
        const playerHaveLock2 = this.data.playerLock2.length;
        
        this.setData({
            player,
            playerHaveLock2,
            hasThrownDice2: false,
        });

        if (this.data.rounds == 3) {
            const currentPage = getCurrentPages().pop();
            const playerLock2 = this.data.playerLock2;
            const playerHaveLock2 = this.data.playerLock2.length;
            playerLock2.push(...currentPage.data.playerDice2);
            this.setData({
                playerHaveLock2,
                playerDice2: [],
                playerLock2
            });
            //游戏结算
            this.calcScore();

            const count = this.data.count + 1;

            if (count > this.data.number || this.data.jettonPlayer1 <= 0 || this.data.jettonPlayer2 <= 0) {
                if (this.data.jettonPlayer1 != this.data.jettonPlayer2) {
                    const flag = this.data.jettonPlayer1 > this.data.jettonPlayer2 ? 1 : 2; 
                    wx.showModal({
                        title: '游戏结算',
                        content: '恭喜玩家' + flag + '获得本局游戏的胜利!\r\n玩家1的筹码：' + this.data.jettonPlayer1 + '\r\n玩家2的筹码：' + this.data.jettonPlayer2 + '\r\n局数：' + (count - 1),
                        confirmText: '再来一局',
                        confirmColor: '#007bff',
                        cancelText: '返回主页', // 显示取消按钮
                        cancelColor: '#333',
                        success: function (res) {
                            if (res.confirm) {
                                wx.navigateTo({
                                    url: '/pages/modes/modes',
                                });
                            } else if (res.cancel) {
                                wx.navigateTo({
                                    url: '/pages/home/home',
                                });
                            }
                        },
                    });
                } else {
                    wx.showModal({
                        title: '游戏结算',
                        content: '本局游戏平局！\r\n玩家1的筹码：' + this.data.jettonPlayer1 + '\r\n玩家2的筹码：' + this.data.jettonPlayer2 + '\r\n局数：' + (count - 1),
                        confirmText: '再来一局',
                        confirmColor: '#007bff',
                        cancelText: '返回主页', // 显示取消按钮
                        cancelColor: '#333',
                        success: function (res) {
                            if (res.confirm) {
                                wx.navigateTo({
                                    url: '/pages/vsgame/vsgame',
                                });
                            } else if (res.cancel) {
                                wx.navigateTo({
                                    url: '/pages/home/home',
                                });
                            }
                        },
                    });
                }
            }
            
            this.setData({count})
            this.initGame();
            return;
        }

        this.setData({
            isMultiplierEnabled: true,
            rounds: this.data.rounds+1
        });

        wx.showToast({
            title: '请选择倍率！',
            icon: 'none',
            duration: 2000,
        });

    },

    //倍率选择
    handleMultiplierChange: function (e) {
        console.log(e)
        const playerIndex = e.currentTarget.dataset.id; // 获取是哪个玩家的选择器
        const selectedMultiplier = this.data.multiplierOptions[e.detail.value];
    
        // 根据玩家选择的倍率，更新对应玩家的倍率数据
        if (playerIndex === '1') {
          this.setData({
            player1Multiplier: selectedMultiplier,
          });
        } else if (playerIndex === '2') {
          this.setData({
            player2Multiplier: selectedMultiplier,
          });
        }
      },

    // 生成随机骰子值
    generateRandomDiceValues(numDice) {
        var randomValues = [];
        for (let i = 0; i < numDice; i++) {
            // 生成1到6之间的随机整数作为骰子值
            randomValues.push(parseInt(Math.random()*6,10)+1);
        }
        return randomValues;
    },

    //算分
    calcScore () {
        const score1 = this.get_total_score(this.data.playerLock1);
        const score2 = this.get_total_score(this.data.playerLock2);

        if (score1 > score2) {
            const temp = (score1-score2) * this.data.sum;
            const jettonPlayer1 = this.data.jettonPlayer1 + temp;
            const jettonPlayer2 = this.data.jettonPlayer2 - temp;
            wx.showToast({
                title: '玩家1胜，得'+ temp + '筹码',
                icon: 'none',
                duration: 2000,
            });
            this.setData({
                jettonPlayer1,
                jettonPlayer2,
            });
        } else if (score1 < score2) {
            const temp = (score2-score1) * this.data.sum;
            const jettonPlayer1 = this.data.jettonPlayer1 - temp;
            const jettonPlayer2 = this.data.jettonPlayer2 + temp;
            wx.showToast({
                title: '玩家2胜，得'+ temp + '筹码',
                icon: 'none',
                duration: 2000,
            });
            this.setData({
                jettonPlayer1,
                jettonPlayer2,
            });
        } else {
            wx.showToast({
                title: '平局',
                icon: 'none',
                duration: 2000,
            });
        }
        this.setData({
            sum: 1
        });
    },

    get_total_score(alist) {
        alist.sort((a, b) => a - b);
        let total_score = alist.reduce((sum, val) => sum + val, 0);
        total_score += this.extra_bonus(alist);
        return total_score;
    },
    
    extra_bonus(arr) {
        let num = Array(7).fill(0);
    
        for (let i = 0; i < 5; i++) {
            num[arr[i]] += 1;
        }
    
        let arr_dist = [];
        for (let i = 0; i < arr.length - 1; i++) {
            arr_dist.push(arr[i + 1] - arr[i]);
        }
    
        if (arr_dist.filter(item => item === 0).length === 4) {
            return 100;
        } else if (arr_dist.filter(item => item === 1).length === 4) {
            return 60;
        } else if (arr_dist.filter(item => item === 0).length === 3 && (arr[1] === arr[3])) {
            return 40;
        } else if ([1, 2, 3, 4].every(i => num[i] >= 1)) {
            return 30;
        } else if ([2, 3, 4, 5].every(i => num[i] >= 1)) {
            return 30;
        } else if ([3, 4, 5, 6].every(i => num[i] >= 1)) {
            return 30;
        } else if (arr_dist.filter(item => item === 0).length === 3 && (arr[1] !== arr[3])) {
            return 20;
        } else if (arr_dist.filter(item => item === 0).length === 2) {
            return 10;
        } else {
            return 0;
        }
    },
    
    warning1 (player) {
        if (this.data.player != player) {
            wx.showToast({
                title: '现在不是您的回合！',
                icon: 'none',
                duration: 2000,
            });
            return true; // 如果在上一回合锁定的骰子列表中，直接返回
        }
        return false;
    },

    warning2 (hasThrownDice) {
        if (!hasThrownDice) {
            wx.showToast({
                title: '请先投掷！',
                icon: 'none',
                duration: 2000,
            });
            return true; // 如果在上一回合锁定的骰子列表中，直接返回
        }
        return false;
    },
    
    warning3 (hasThrownDice) {
        if (hasThrownDice) {
            wx.showToast({
                title: '本回合已投掷！',
                icon: 'none',
                duration: 2000,
            });
            return true; // 如果在上一回合锁定的骰子列表中，直接返回
        }
        return false;
    }

});
  