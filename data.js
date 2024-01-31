const shopObj = [
    {
      id: 0,
      icon: "./img/shopIcons/0_tryHarder.png",
      name: "Try Harder",
      cost: 10,
      clicksPerSecond: 0.1,
      count: 0,
    },
    {
      id: 1,
      icon: "./img/shopIcons/1_linkIndeed.png",
      name: "LinkIndeed Premium",
      cost: 50,
      clicksPerSecond: 1,
      count: 0,
    },
    {
      id: 2,
      icon: "./img/shopIcons/2_sixerr.png",
      name: "Outsource to Sixerr",
      cost: 100,
      clicksPerSecond: 5,
      count: 0,
    },
    {
      id: 3,
      icon: "./img/shopIcons/3_jobPortal.png",
      name: "Job Portal",
      cost: 200,
      clicksPerSecond: 10,
      count: 0,
    },
    {
      id: 4,
      icon: "./img/shopIcons/4_unemployment.png",
      name: "Unemployed on a Monday",
      cost: 300,
      clicksPerSecond: 20,
      count: 0,
    },
    {
      id: 5,
      icon: "./img/shopIcons/5_someGuy.png",
      name: "Some guy you know who works at career services",
      cost: 400,
      clicksPerSecond: 100,
      count: 0,
    },
  ];

const mainAchievementsObj = [
    // manual click achievements
    { 
      icon: "./img/achievementIcons/manualClick/icon_click_achievement.png",
      iconFalse: "./img/achievementIcons/manualClick/icon_click_achievement_false.png",
      clicks: 1, 
      message1: "Your first click!",
      message2: "Hopefully this will lead to somewhere.. eventually",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/manualClick/icon_click_achievement.png",
      iconFalse: "./img/achievementIcons/manualClick/icon_click_achievement_false.png",
      clicks: 2,
      message1: "You manually applied to 2 jobs!",
      message2: "test2",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/manualClick/icon_click_achievement.png",
      iconFalse: "./img/achievementIcons/manualClick/icon_click_achievement_false.png",
      clicks: 3, 
      message1: "You manually applied to 3 jobs!", 
      message2: "test3",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/manualClick/icon_click_achievement.png",
      iconFalse: "./img/achievementIcons/manualClick/icon_click_achievement_false.png",
      clicks: 4, 
      message1: "You manually applied to 4 jobs!", 
      message2: "test4",
      displayed: false,
    },
  
    // job application achievements
    { 
      icon: "./img/achievementIcons/jobApp/icon_jobapp_achievement.png",
      iconFalse: "./img/achievementIcons/jobApp/icon_jobapp_achievement_false.png",
      apps: 69, 
      message1: "You applied to 69 jobs!",
      message2: "Nice",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/jobApp/icon_jobapp_achievement.png",
      iconFalse: "./img/achievementIcons/jobApp/icon_jobapp_achievement_false.png",
      apps: 420, 
      message1: "You applied to 420 jobs!",
      message2: "Nice",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/jobApp/icon_jobapp_achievement.png",
      iconFalse: "./img/achievementIcons/jobApp/icon_jobapp_achievement_false.png",
      apps: 6969,
      message1: "You applied to 6969 jobs!",
      message2: "Nice x 101",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/jobApp/icon_jobapp_achievement.png",
      iconFalse: "./img/achievementIcons/jobApp/icon_jobapp_achievement_false.png",
      apps: 8000,
      message1: "You applied to 8000 jobs!",
      message2: "You feel kinda empty inside",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/jobApp/icon_jobapp_achievement.png",
      iconFalse: "./img/achievementIcons/jobApp/icon_jobapp_achievement_false.png",
      apps: 10000,
      message1: "You applied to 10000 jobs!",
      message2: "You feel kinda empty inside",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/jobApp/icon_jobapp_achievement.png",
      iconFalse: "./img/achievementIcons/jobApp/icon_jobapp_achievement_false.png",
      apps: 42069, 
      message1: "You applied to 42069 jobs!", 
      message2: "You blow a small puff of air out of your nostrils",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/jobApp/icon_jobapp_achievement.png",
      iconFalse: "./img/achievementIcons/jobApp/icon_jobapp_achievement_false.png",
      apps: 69420, 
      message1: "You applied to 69420 jobs!", 
      message2: "You blow a small puff of air out of your nostrils",
      displayed: false,
    },
  
    // rejection achievements
    { 
      icon: "./img/achievementIcons/rejection/icon_rejection_achievement.gif",
      iconFalse: "./img/achievementIcons/rejection/icon_rejection_achievement_false.png",
      rejections: 1, 
      message1: "1 rejection",
      message2: "your 1st rejection!",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/rejection/icon_rejection_achievement.gif",
      iconFalse: "./img/achievementIcons/rejection/icon_rejection_achievement_false.png",
      rejections: 5,
      message1: "5 rejections",
      message2: "frick",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/rejection/icon_rejection_achievement.gif",
      iconFalse: "./img/achievementIcons/rejection/icon_rejection_achievement_false.png",
      rejections: 10,
      message1: "10 rejections",
      message2: "fricky frick",
      displayed: false,
    },
  
    // bad random event achievements
    { 
      icon: "./img/achievementIcons/badEvent/icon_badEvent_achievement.png",
      iconFalse: "./img/achievementIcons/badEvent/icon_badEvent_achievement_false.png",
      badEvents: 10,
      message1: "10 bad things happened",
      message2: "Well, gosh darn it!",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/badEvent/icon_badEvent_achievement.png",
      iconFalse: "./img/achievementIcons/badEvent/icon_badEvent_achievement_false.png",
      badEvents: 100,
      message1: "100 bad things happened to you",
      message2: "*Wiggles index finger* well just my luck!",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/badEvent/icon_badEvent_achievement.png",
      iconFalse: "./img/achievementIcons/badEvent/icon_badEvent_achievement_false.png",
      badEvents: 250,
      message1: "250 bad things happened to you",
      message2: "insertFunnyLame joke",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/badEvent/icon_badEvent_achievement.png",
      iconFalse: "./img/achievementIcons/badEvent/icon_badEvent_achievement_false.png",
      badEvents: 500, 
      message1: "500 bad things happened to you",
      message2: "You stare into the vast space of nothingness",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/badEvent/icon_badEvent_achievement.png",
      iconFalse: "./img/achievementIcons/badEvent/icon_badEvent_achievement_false.png",
      badEvents: 1000, 
      message1: "1000 bad things happened to you",
      message2: "You blow a small puff of air out of your nostrils",
      displayed: false,
    },
  
    // good random event achievements
  { 
      icon: "./img/achievementIcons/goodEvent/icon_goodEvent_achievement.png",
      iconFalse: "./img/achievementIcons/goodEvent/icon_goodEvent_achievement_false.png",
      goodEvents: 10,
      message1: "10 good things happened",
      message2: "Maybe I'll get at least an interview!",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/goodEvent/icon_goodEvent_achievement.png",
      iconFalse: "./img/achievementIcons/goodEvent/icon_goodEvent_achievement_false.png",
      goodEvents: 100,
      message1: "100 good things happened to you",
      message2: "You feel kinda good about yourself!",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/goodEvent/icon_goodEvent_achievement.png",
      iconFalse: "./img/achievementIcons/goodEvent/icon_goodEvent_achievement_false.png",
      goodEvents: 250,
      message1: "250 good things happened to you",
      message2: "insertFunnyLame joke",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/goodEvent/icon_goodEvent_achievement.png",
      iconFalse: "./img/achievementIcons/goodEvent/icon_goodEvent_achievement_false.png",
      goodEvents: 500, 
      message1: "500 good things happened to you",
      message2: "*rubs chin*" ,
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/goodEvent/icon_goodEvent_achievement.png",
      iconFalse: "./img/achievementIcons/goodEvent/icon_goodEvent_achievement_false.png",
      goodEvents: 1000, 
      message1: "1000 good things happened to you",
      message2: "You blow a small puff of air out of your nostrils",
      displayed: false,
    },
    // total random event achievements
  
    { 
      icon: "./img/achievementIcons/totalRandomEvent/icon_totalRandom_achievement.png",
      iconFalse: "./img/achievementIcons/totalRandomEvent/icon_totalRandom_achievement_false.png",
      totalRandom: 25,
      message1: "25 random things happened",
      message2: "rawr xD random!!1!11!!!",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/totalRandomEvent/icon_totalRandom_achievement.png",
      iconFalse: "./img/achievementIcons/totalRandomEvent/icon_totalRandom_achievement_false.png",
      totalRandom: 200,
      message1: "200 random things happened to you",
      message2: "wow freaking random!!!!",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/totalRandomEvent/icon_totalRandom_achievement.png",
      iconFalse: "./img/achievementIcons/totalRandomEvent/icon_totalRandom_achievement_false.png",
      totalRandom: 500,
      message1: "500 random things happened to you",
      message2: "some of these random things happened repeated",
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/totalRandomEvent/icon_totalRandom_achievement.png",
      iconFalse: "./img/achievementIcons/totalRandomEvent/icon_totalRandom_achievement_false.png",
      totalRandom: 1000, 
      message1: "1000 random things happened to you",
      message2: "*claps big floppy feet together*" ,
      displayed: false,
    },
    { 
      icon: "./img/achievementIcons/totalRandomEvent/icon_totalRandom_achievement.png",
      iconFalse: "./img/achievementIcons/totalRandomEvent/icon_totalRandom_achievement_false.png",
      totalRandom: 1500, 
      message1: "1500 random things happened to you",
      message2: "*slaps belly and spits out a tooth* well if it isn't my belly??",
      displayed: false,
    },
  ];

const upgradeAchievementsObj = [
// TRY HARDER [0]
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade0: 1, 
    message1: "Own 1 Try Harder",
    message2: "Your first time actually trying!",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade0: 10,
    message1: "Own 10 Try Harders",
    message2: "insert funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade0: 50,
    message1: "Own 50 Try Harders",
    message2: "insert funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade0: 100,
    message1: "Own 100 Try Harders",
    message2: "insert funny excerpt",
    displayed: false, 
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade0: 500,
    message1: "Own 500 Try Harders",
    message2: "insert funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade0: 1000,
    message1: "Own 1000 Try Harders",
    message2: "insert funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade0: 2500,
    message1: "Own 2500 Try Harders",
    message2: "insert funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade0: 5000,
    message1: "Own 5000 Try Harders",
    message2: "insert funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade0: 10000,
    message1: "Own 10000 Try Harders",
    message2: "insert funny excerpt",
    displayed: false,
},

// LinkIndeed PREMIUM [1]
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade1: 1, 
    message1: "Own 1 LinkIndeed Premium",
    message2: "$40 a month huh?",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    message1: "Bill Gates thanks you",
    upgrade2: 10,
    message2: "Own 10 LinkIndeed Premiums",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade1: 50,
    message1: "Own 50 LinkIndeed Premiums",
    message2: "insert funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade1: 100,
    message1: "Own 100 LinkIndeed Premiums",
    message2: "insert funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade1: 500,
    message1: "Own 500 LinkIndeed Premiums",
    message2: "insert funny excerpt",
    displayed: false,
},


// OUTSOURCE TO FIVERR [2]
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade2: 1, 
    message1: "First outsourced applier",
    message2: "Thank you Mr. Patel!",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade2: 2,
    message1: "Own 2 outsourced worker",
    message2: "TEST 2",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade2: 3,
    message1: "Own 3 Fiverr outsources",
    message2: "insert funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade2: 4,
    message1: "Own 100 Fiverr outsources",
    message2: "insert funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade2: 5,
    message1: "Own 500 Fiverr outsources",
    message2: "insert funny excerpt",
    displayed: false,
},



//  SEVERANCES [3]
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade3: 1, 
    message1: "Own 1 severance",
    message2: "insert funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade3: 2,
    message1: "Own 2 severances",
    message2: "insert funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade3: 3,
    message1: "Own 25 upgrades",
    message2: "insert funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade3: 4,
    message1: "Own 100 upgrades",
    message2: "insert funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade3: 5,
    message1: "Own 500 upgrades",
    message2: "insert funny excerpt",
    displayed: false,
},

// ADD MORE WHEN NEEDED

//  UNEMPLOYMENT [4]
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade4: 1, 
    message1: "Own 1 unemployment",
    message2: "insert funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade4: 2,
    message1: "Own 2 unemployments",
    message2: "insert funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade4: 3, 
    message1: "Own 3 unemployments",
    message2: "insert funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade4: 4,
    message1: "Own 4 unemployments",
    message2: "insert funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade4: 5,
    message1: "Own 5 unemployments",
    message2: "insert funny excerpt",
    displayed: false,
},

//  SOME GUY [5]
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade5: 1, 
    message1: "Know 1 guy who work in the unemployment office",
    message2: "funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade5: 2,
    message1: "Know 2 guys who work in the unemployment office",
    message2: "funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade5: 3, 
    message1: "Know 3 guys who work in the unemployment office",
    message2: "funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade5: 4,
    message1: "Know 4 guys who work in the unemployment office",
    message2: "funny excerpt",
    displayed: false,
},
{ 
    icon: "./img/achievementIcons/upgrade/icon_upgrade_achievement.png",
    iconFalse: "./img/achievementIcons/upgrade/icon_upgrade_achievement_false.png",
    upgrade5: 5, 
    message1: "Know 5 guys who work in the unemployment office",
    message2: "funny excerpt",
    displayed: false,
},
  ];

const randomEventPool = [
// Random NEGATIVE events
    {
    icon: "./img/randomIcons/icon_randomevent_bad.png",
    color: "red",
    message1: "randomEventBad",
    },


// Random POSITIVE events
{
    icon: "./img/randomIcons/icon_randomevent_good.png",
    color: "green",
    message1: "randomEventGood",
},

  ];

const randomRejectionPool = [
    {
      id: 0,
      icon: "./img/randomIcons/icon_rejection.png",
      color: "grey",
      message1: "Thank you for your interest, unfortunately..",
    },
    {
      id: 1,
      icon: "./img/randomIcons/icon_rejection.png",
      color: "grey",
      message1: "Your app was impressive, but..",
    },
    {
      id: 2,
      icon: "./img/randomIcons/icon_rejection.png",
      color: "grey",
      message1: "We appreciate your effort, but..",
    },
    {
      id: 3,
      icon: "./img/randomIcons/icon_rejection.png",
      color: "grey",
      message1: "Despite your skills, unfortunately..",
    },
    {
      id: 4,
      icon: "./img/randomIcons/icon_rejection.png",
      color: "grey",
      message1: "Regrettably, your submission falls short..",
    },
    {
      id: 5,
      icon: "./img/randomIcons/icon_rejection.png",
      color: "grey",
      message1: "We regret to inform you, but..",
    },
    {
      id: 6,
      icon: "./img/randomIcons/icon_rejection.png",
      color: "grey",
      message1: "Your application was considered, however..",
    },
    {
      id: 7,
      icon: "./img/randomIcons/icon_rejection.png",
      color: "grey",
      message1: "Despite your potential, we must..",
    },
    {
      id: 8,
      icon: "./img/randomIcons/icon_rejection.png",
      color: "grey",
      message1: "We regretfully inform you that..",
    },
    {
      id: 9,
      icon: "./img/randomIcons/icon_rejection.png",
      color: "grey",
      message1: "Despite your efforts, we must..",
    },
    {
      id: 10,
      icon: "./img/randomIcons/icon_rejection.png",
      color: "grey",
      message1: "We appreciate your interest, however..",
    },
    {
      id: 11,
      icon: "./img/randomIcons/icon_rejection.png",
      color: "grey",
      message1: "Your skills are commendable, but..",
    },
    {
      id: 12,
      icon: "./img/randomIcons/icon_rejection.png",
      color: "grey",
      message1: "We regret to inform you that..",
    },
    {
      id: 13,
      icon: "./img/randomIcons/icon_rejection.png",
      color: "grey",
      message1: "Despite your dedication, unfortunately..",
    },
    {
      id: 14,
      icon: "./img/randomIcons/icon_rejection.png",
      color: "grey",
      message1: "Regrettably, your application did not meet..",
    },
    {
      id: 15,
      icon: "./img/randomIcons/icon_rejection.png",
      color: "grey",
      message1: "We regretfully inform you that..",
    },
    {
      id: 16,
      icon: "./img/randomIcons/icon_rejection.png",
      color: "grey",
      message1: "Despite your potential, we must..",
    },
    {
      id: 17,
      icon: "./img/randomIcons/icon_rejection.png",
      color: "grey",
      message1: "Thank you for your submission, unfortunately..",
    },
    // Add more rejection events as needed
  ];

export {shopObj, mainAchievementsObj, upgradeAchievementsObj, randomEventPool, randomRejectionPool};