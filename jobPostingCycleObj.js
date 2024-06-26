const jobPostingCycleObj = [
    {
        id: 0,
        icon: "./img/jobPostingIcons/0.png",
        title: "Office Bubble Maker",
        location: "Walla Walla, WA",
        pay: "$12/hr - $20/hr",
        employee: "10-30",
        skill: "Being fun, exhalation",
        company: "Alooba Bababoo Inc.",
        about: "Do you thrive in a boring and uneventful work environment? Then this job is the perfect fit for you! Join our team as our Office Bubble Maker and add some fun to your mundane!",
        responsibilities: [
            "Blow bubbles in the office to create a light and airy atmosphere",
            "Keep bubbles flowing throughout the day to ensure a fun and engaging workplace",
            "Pop any bubbles that get too big or distracting",
            "Schedule regular bubble breaks for employees",
        ],
        qualifications: [
            "Experience blowing bubbles (preferably in an office setting)",
            "Ability to multitask and bubble at the same time",
            "Strong lung capacity for long-lasting bubbles",
            "Proficiency in scented and non-toxic bubble formula",
        ],
    },
    {
        id: 1,
        icon: "./img/jobPostingIcons/1.png",
        title: "Professional Eraser",
        location: "Dubuque, Iowa, USA",
        pay: "$60,000/yr - $70,000/yr",
        employee: "10-14",
        skill: "Quick Thinking, Attention to Detail",
        company: "Completely Clean Erasers",
        about: "Do you love to erase? Do you spend way too much time erasing tiny mistakes? Then we have the perfect job for you! Be the ultimate eraser champion at our company and proudly declare to the world that you erase for a living.",
        responsibilities: [
          "Erase typos, erasure smudges, and dust",
          "Lead eraser workshop and conferences",
          "Test and review different erasing techniques and tools",
          "Attend company team building outings and all-eraser events"
        ],
        qualifications: [
          "Must have at least 2 years of erasing experience",
          "Bachelor's degree in Fine Erasing",
          "In-depth knowledge of various eraser models",
          "Patience and determination when facing difficult erasures"
        ]
    },
    {
        id: 2,
        icon: "./img/jobPostingIcons/2.png",
        title: "Chores Schedulist",
        company: "Big Click's Mustard",
        location: "Mustardville, USA",
        pay: "$65k/yr - $85k/yr",
        employee: "100-500",
        skill: "HR, Excel",
        about: "Are you a master of micromanagement? Do you have the ability to schedule the mundane tasks of daily life with extreme precision? Then the Council of Chores Scheduling Wizard just might be the position for you! Put your organizational skills to the test and join our team today.",
        responsibilities: [
            "Create complex schedules for household chores, including but not limited to vacuuming, laundry, and dishwashing",
            "Coordinate with other members of the household to ensure seamless execution of assigned chores",
            "Implement a reward system to motivate household members to complete their chores in a timely manner",
            "Maintain a detailed log of completed tasks and provide a monthly report to the Council of Chores",
        ],
        qualifications: [
            "Excellent time management and organizational skills",
            "At least 2 years of experience in scheduling and task delegation (experience in household management is a plus)",
            "Strong communication skills with the ability to mediate conflicts and enforce deadlines",
            "Proficient in Excel and other scheduling software (ability to use a crystal ball is a plus)",
        ]
    },
    {
        id: 3,
        icon: "./img/jobPostingIcons/3.png",
        title: "Nap Time Coordinator",
        location: "Seattle, WA",
        pay: "$40k/yr - $45k/yr",
        employee: "10-30",
        skill: "Time Management, can read",
        company: "Snooze Inc.",
        about: "We are looking for a highly skilled Nap Time Coordinator to join our team! As a Nap Time Coordinator, you will be responsible for ensuring that all employees get sufficient naps throughout the workday.",
        responsibilities: [
            "Create nap schedules for all employees, taking into account individual preferences and sleep patterns",
            "Monitor employees to ensure they are napping at their designated times and for appropriate durations",
            "Maintain nap room cleanliness and stock with necessary supplies, such as pillows and blankets",
            "Be available for nap-related emergencies and provide on-call nap support if needed",
        ],
        qualifications: [
            "Experience in sleep science or a related field",
            "Excellent time management skills and ability to handle multiple napping schedules",
            "Strong attention to detail and ability to identify when an employee is faking a nap",
            "Passion for promoting a healthy work-life balance",
        ]
    },
    {
        id: 4,
        icon: "./img/jobPostingIcons/4.png",
        title: "Brunch Coordinator",
        location: "Austin, TX",
        pay: "$40k/yr - $45k/yr",
        employee: "50-150",
        skill: "Woodcraft, HVAC",
        company: "Bottomless Mimosas Inc.",
        about: "We are seeking an enthusiastic Brunch Coordinator to join our team. The ideal candidate will be a master of all things brunch, with the ability to plan the perfect mimosa-fueled weekend meal.",
        responsibilities: [
            "Coordinate all aspects of our monthly brunch events, from menu planning to reservation handling",
            "Manage a team of brunch specialists, ensuring toast and eggs are cooked to perfection",
            "Liaise with local farmers and coffee roasters to source the freshest, tastiest ingredients",
            "Be the go-to expert on brunch trends and innovations, from avocado toast to beet lattes",
        ],
        qualifications: [
            "1+ years of experience hosting epic brunches at home",
            "Excellent organizational skills and ability to multitask",
            "Passion for all things food and drink, with a particular interest in mid-morning meals",
            "Ability to handle high-stress situations, such as a run on mimosa flutes during peak hours",
        ]
    },
    {
        id: 5,
        icon: "./img/jobPostingIcons/5.png",
        title: "First Impression Giver",
        location: "Fool's Emerald, Canada",
        pay: "80k/yr - 90k/yr",
        employee: "1,000 - 5,000+",
        skill: "Vision, can smell",
        company: "1st and 4most Corp.",
        about: "Be the face of our company and make the first encounter a memorable one for our clients and employees. You will contribute greatly to our company's reputation and branding.",
        responsibilities: [
            "Greet visitors and answer phone calls with a smile",
            "Maintain a positive and welcoming atmosphere at all times",
            "Provide insightful small talk to make visitors feel at ease",
            "Make sure the reception area is well-stocked with newspapers, magazines, and unnecessary office gadgets",
        ],
        qualifications: [
            "1-2 years of experience in customer service or hospitality (realistic)",
            "Must be able to maintain a fake smile at all times",
            "Exudes extreme enthusiasm and energy, even before coffee",
            "Ability to pretend to be interested in mundane small talk topics",
        ]
    },
    {
        id: 6,
        icon: "./img/jobPostingIcons/6.png",
        title: "Sand Removal Engineer",
        location: "Cornwall, Canada",
        pay: "$60k/yr - $90k/yr",
        employee: "10-30",
        skill: "Corn, agriculture",
        company: "Grains Away Inc.",
        about: "The Sand Removal Engineer is responsible for removing tiny sand particles that have taken over the office.",
        responsibilities: [
            "Vacuum and mop entire office daily",
            "Dig through carpet fibers with tweezers to find rogue sand particles",
            "Develop new and improved sand resistance techniques",
            "Maintain sand-free environment for employees, including pocket sand surveillance",
        ],
        qualifications: [
            "Basic knowledge of housekeeping and janitorial work",
            "Experience with sand removal preferred",
            "Strong attention to detail",
            "Ability to withstand tiny sand particles in every nook and cranny",
        ]
    },
    {
        id: 7,
        icon: "./img/jobPostingIcons/7.png",
        title: "Information Hoarder",
        location: "Dayton, CA",
        pay: "$60k/yr - $100k/yr",
        employee: "2 - ??",
        skill: "Paranoia, anxiety",
        company: "Data Thieves Inc.",
        about: "As an Information Hoarder, you will be responsible for hoarding valuable data from different sources and designing ways to steal competitors' data.",
        responsibilities: [
            "Identify and collect crucial data from various sources, such as digital and paper documents, interviews, and social media",
            "Analyze and summarize data to fit our company's needs, often with limited details and biased assumptions",
            "Strategize and execute plans to steal competitors' data through questionable and unethical means",
            "Maintain confidentiality and peak paranoia while guarding against potential data security breaches",
        ],
        qualifications: [
            "Experience with data collection and analysis methods, including research design and database management",
            "Knowledge of current trends and techniques in data security, preferably with hacker-like skills and a disregard for morality and ethics",
            "Excellent communication and interpersonal skills, especially when bribing, blackmailing, or threatening people to get their data",
            "Attention to detail and analytical thinking, with the ability to make unfounded and outrageous claims based on limited data",
        ]
    },
    {
        id: 8,
        icon: "./img/jobPostingIcons/8.png",
        title: "Office Printerologist",
        location: "Chicago, IL",
        pay: "$40k/yr - $60k/yr",
        employee: "15-80",
        skill: "Hands, fingers, toes",
        company: "Ergonomic Toner and Ink Co.",
        about: "We're looking for someone to keep our office toner cartridges in tip-top shape.",
        responsibilities: [
            "Accurately organize and rearrange toner cartridges",
            "Keep track of office supplies inventory",
            "Occasionally pat office dog",
            "Ensure toner cartridges are in the correct color order",
        ],
        qualifications: [
            "Must be physically able to lift 50lbs of toner",
            "Experience with Microsoft Office and Google Suite",
            "Ability to multitask and prioritize tasks",
            "Basic office supply knowledge",
        ]
    },
    {
        id: 9,
        icon: "./img/jobPostingIcons/9.png",
        title: "Pro Meeting Attendant",
        location: "Winnipeg, Canada",
        pay: "$41,000/yr - $101,000/yr",
        employee: "100-150",
        skill: "Strategic planning, note-taking",
        company: "Meeting Magic Inc.",
        about: "Do you find yourself enjoying boring, mundane meetings? Do you love taking notes and planning out your day in excruciating detail? Then we have the job for you! Join our team as a Professional Meeting Attendant and fulfill your dreams of becoming the most organized and efficient employee in the world.",
        responsibilities: [
          "Take comprehensive and detailed notes during meetings, including action items and follow up tasks.",
          "Assist with scheduling and coordinating meeting times and locations.",
          "Occasionally order lunch for the team during extra-long meetings.",
          "Participate in the thrilling task of setting up conference calls and virtual meetings."
        ],
        qualifications: [
          "At least 2 years of experience attending meetings (and not falling asleep).",
          "Exceptional note-taking and organization skills.",
          "Proficient in using Microsoft Office.",
          "A high tolerance for caffeine and small talk."
        ]
    },
    {
        id: 10,
        icon: "./img/jobPostingIcons/10.png",
        title: "Executive Seat Warmer",
        location: "Sacramento, CA",
        pay: "$29k/yr - $42k/yr",
        employee: "1.7",
        skill: "warmth, having a butt",
        company: "Hobby Hibernators Inc",
        about: "Are you tired of your boring office job? Do you want to feel needed and appreicated? Apply now to be our Exective Seat Warmer!",
        responsibilities: [
            "Entire that office chairs are at a comfortable and welcoming temperature before meetings.",
            "Act as a human security system to keep office chairs safe from theft.",
            "Maintain office chair decoration and cleanliness to boost office morale.",
            "Develop and implement new methods of seat warming that will enhance office productivity.",
        ],
        qualifications: [
            "Must be abl to tolerate sitting for long periods of time.",
            "Excellent sense of humor and ability to make inanimate objects feel special.",
            "Expert level skills in using a chair, including but not limited to cleaning, spinning, and rocking back and forth.",
            "Ability to handle high-stress situatioons, such as a chair malfunction or relocation.",
        ]
    },
    {
        id: 11,
        icon: "./img/jobPostingIcons/11.png",
        title: "Coffee Stirring Agent",
        location: "Muffinville, USA",
        pay: "$25/hr - $42/hr",
        employee: "exactly 49",
        skill: "Finger stirring, heat resistance",
        company: "Caffeine Symphony",
        about: "Join our team at Caffeine Symphony and become a maestro of stirring! Dive into the world of coffee with us.",
        responsibilities: [
          "Expertly stir coffee with various utensils",
          "Conduct daily coffee aroma evaluations",
          "Attend impromptu air guitar sessions",
          "Collaborate on coffee-themed poetry"
        ],
        qualifications: [
          "Must have a black belt in coffee stirring",
          "Experience in coffee brewing (instant coffee counts)",
          "Ability to distinguish between light and dark roasts",
          "Willingness to participate in coffee-themed karaoke"
        ],
      },
      {
        id: 12,
        icon: "./img/jobPostingIcons/12.png",
        title: "Toothpick Architect",
        location: "Pretzel Springs, Canada",
        pay: "$32/hr - $52/hr",
        employee: "Around 35 toothpick enthusiasts",
        skill: "Advanced toothpick engineering, Toothpick juggling",
        company: "Bamboo Bliss",
        about: "Embrace the world of toothpick architecture at Bamboo Bliss! We design groundbreaking structures with the humble toothpick.",
        responsibilities: [
          "Construct miniature toothpick skyscrapers",
          "Host toothpick design thinking sessions",
          "Participate in toothpick bridge-building competitions",
          "Develop toothpick-based art installations"
        ],
        qualifications: [
          "Master's degree in Toothpickology",
          "Ability to create toothpick mazes",
          "Experience in toothpick origami",
          "Expertise in the delicate art of toothpick balancing"
        ],
      },
      {
        id: 13,
        icon: "./img/jobPostingIcons/13.png",
        title: "Lawn Flamingo Breeder",
        location: "Arghkansas, USA",
        pay: "$25/hr - $38/hr",
        employee: "50-100",
        skill: "Flamingo herding, lawn decoration design",
        company: "Flamingo-Go Enterprises",
        about: "Join our team as a Lawn Flamingo Breeder and be part of a flock-tastic journey. Embrace the chaos of organizing lawn ornaments that defy gravity and make lawns the talk of the town.",
        responsibilities: [
          "Coordinate the strategic placement of Lawn Flamingos in a synchronized dance pattern",
          "Collaborate with the imaginary Flamingo Fashion Council on new trends",
          "Organize team-building exercises with invisible colleagues",
          "Ensure the happiness of our invisible Flamingo Whisperer"
        ],
        qualifications: [
          "Experience in lawn decoration or imaginary animal husbandry",
          "Ability to speak Flamingo and interpret their subtle dance moves",
          "Expertise in color coordination with invisible objects",
          "Proven skill in managing invisible deadlines"
        ],
      },
      {
        id: 14,
        icon: "./img/jobPostingIcons/14.png",
        title: "Bubble Wrap Popper",
        location: "Whoopee City, Canada",
        pay: "$19/hr - $28/hr",
        employee: "10-50",
        skill: "Precision popping, Bubble wrap sculpture",
        company: "Bubble Bursts Inc.",
        about: "At Bubble Bursts Incorporated, we're looking for a Bubble Wrap Popper to join our revolutionary team. Transform everyday popping into an art form and burst your way into a bubbly career.",
        responsibilities: [
          "Expertly pop Bubble Wrap to create mesmerizing sculptures",
          "Invent new bubble wrap popping techniques and share them with the team",
          "Participate in Bubble Wrap popping contests (no losers allowed)",
          "Conduct bubble wrap sound therapy sessions for stressed colleagues"
        ],
        qualifications: [
          "Mastery in the art of Bubble Wrap popping",
          "Ability to think outside the bubble",
          "Experience in bubble wrap recycling programs",
          "Attention to detail, especially when counting popped bubbles"
        ],
      },
];

export { jobPostingCycleObj };