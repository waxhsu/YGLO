const cutsceneObj = [
    {
        id: 0,
        clicksReq: 20,
        file: "./img/cutscene/0.png",
        displayed: false,
        },
    {
        id: 1,
        clicksReq: 25,
        file: "./img/cutscene/1.png",
        displayed: false,
    },
    {
        id: 2,
        clicksReq: 30,
        file: "./img/cutscene/2.gif",
        displayed: false,
    },
    ]
  
  

const minigameObj = [
    // check requirements for minigames
    { 
      bossReqApps: 150, 
      bossIcon: "./img/minigame/boss1/bossIcon1.png",
      bossMessage: "enter boss1 challenge prompt",
      bossAsset: "./img/minigame/boss1/boss1.png",
      bossBullet1: "./img/minigame/boss1/bullet1-1.png",
      bossBullet2: "./img/minigame/boss1/bullet1-2.png",
      unlocked: false,
    },
    { 
      bossReqApps: 1500, 
      bossIcon: "./img/minigame/boss2/bossIcon2.png",
      bossMessage: "enter boss2 challenge prompt",
      bossAsset: "./img/minigame/boss2/boss2.png",
      bossBullet1: "./img/minigame/boss2/bullet2-1.png",
      bossBullet2: "./img/minigame/boss2/bullet2-2.png",
      unlocked: false,
    },
    { 
      bossReqApps: 5000, 
      bossIcon: "./img/minigame/boss3/bossIcon3.png",
      bossMessage: "enter boss3 challenge prompt",
      bossAsset: "./img/minigame/boss3/boss3.png",
      bossBullet1: "./img/minigame/boss3/bullet3-1.png",
      bossBullet2: "./img/minigame/boss3/bullet3-2.png",
      unlocked: false,
    },
  
    ];
    
    export { cutsceneObj, minigameObj };
    