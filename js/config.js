/**
 * POWERNEX 26 | National Level EEE Technical Symposium
 * Master Source of Truth Configuration Store
 * Based strictly on POWERNEX_26_WEBSITE_MASTER_FINAL_DRAFT.md
 */

const POWERNEX_CONFIG = {
  general: {
    title: "POWERNEX 26",
    edition: "National Level Technical Symposium",
    department: "Department of Electrical and Electronics Engineering (EEE)",
    institution: "University College of Engineering, Ariyalur",
    website: "https://auucea.edu.in",
    affiliation: "(A Constituent College of Anna University, Chennai)",
    tagline: "Think Electric. Think Future. Be the Change!",
    brandLine: "Powering Innovation for a Better Tomorrow",
    description: "A premier technical symposium organized by the Department of Electrical and Electronics Engineering, University College of Engineering, Ariyalur. Open to students from all departments to showcase technical knowledge, circuit debugging, creative strategy, and competitive engineering skills.",
    eventDate: "2026-10-08T08:30:00+05:30",
    eventDateDisplay: "08 October 2026",
    onlineRegDeadline: "07 October 2026, 6:00 PM",
    onSpotRegDeadline: "08 October 2026, 8:30 AM",
    reportingTime: "8:30 AM",
    eventTimeWindow: "8:30 AM - 5:00 PM (Main Programme begins at 9:00 AM)",
    venue: "Campus Auditorium, University College of Engineering, Ariyalur",
    registrationFee: 150,
    registrationFeeDisplay: "Rs. 150 per participant",
    registrationNote: "Charged per person (e.g. 4-member team pays Rs. 600 total). Students from all departments are eligible.",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSf4ZvPh7lYtd8h5oPpaSLUJMSXtntyTyIukRaRylSjwKcnkEQ/viewform?pli=1",
    rulebookLink: "#rulebook",
    officialEmail: "arunannamalai7939@gmail.com",
    helplinePhone1: "7339086778",
    helplinePhone2: "+91 93603 41413",
    prizes: {
      first: "Rs. 500",
      second: "Rs. 400",
      third: "Rs. 300",
      championship: "Overall Championship Trophy"
    }
  },

  stats: [
    { value: "08 OCT", label: "Event Date", desc: "8:30 AM - 5:00 PM" },
    { value: "6 Major", label: "Symposium Events", desc: "3 Tech + 3 Non-Tech" },
    { value: "All Depts", label: "Open Eligibility", desc: "Open to All College Students" },
    { value: "Rs. 150", label: "All-Inclusive Fee", desc: "Lunch, Kit & Certificate" }
  ],

  prizesList: [
    { rank: "01", title: "First Place", amount: "Rs. 500", icon: "trophy", badge: "GOLD CHAMPION", desc: "Cash prize + Official Merit Certificate + Recognition" },
    { rank: "02", title: "Second Place", amount: "Rs. 400", icon: "award", badge: "SILVER RUNNER-UP", desc: "Cash prize + Official Merit Certificate + Recognition" },
    { rank: "03", title: "Third Place", amount: "Rs. 300", icon: "medal", badge: "BRONZE 2ND RUNNER", desc: "Cash prize + Official Merit Certificate + Recognition" },
    { rank: "CHAMP", title: "Overall Championship Trophy", amount: "CHAMPIONSHIP", icon: "crown", badge: "ROLLING TROPHY", desc: "Awarded to the college that records the highest number of event wins across POWERNEX 26" }
  ],

  // 3 Technical + 3 Non-Technical Events
  events: {
    technical: [
      {
        id: "paper-presentation",
        number: "01",
        name: "Paper Presentation",
        tagline: "Research, Innovation & Idea Defense",
        badge: "TECHNICAL 01",
        teamSize: "Open / No fixed maximum team size",
        slot: "7 Mins Presentation + 3 Mins Jury Q&A = 10 Mins Total",
        venue: "Seminar Hall / Auditorium",
        deadline: "Online submission on or before 07 Oct 2026 (On-spot screening allowed)",
        desc: "Present an original idea, concept, study or engineering solution clearly before the faculty judging panel. The topic is open to any suitable technical, engineering, innovation, research, or problem-solving domain.",
        objective: "Give participants a platform to present an original idea, concept, study or solution clearly before the judging panel. The topic is open and not restricted to a fixed theme.",
        format: "Double-column IEEE conference format. Abstract ≤ 250 words, full paper ≤ 15 pages. Plagiarism threshold <15%. Pre-screening for originality.",
        rules: [
          "Topic is open: participants may select any technical, engineering, renewable, AI, or problem-solving domain.",
          "No fixed maximum team size; every member must be individually registered at Rs. 150.",
          "Participants/teams must submit their idea/title/short concept for organizer screening on or before 07 October 2026.",
          "On-spot participants are permitted: their idea will be screened at the venue before presenting.",
          "Presentation duration is strictly 7 minutes followed by 3 minutes of jury Q&A.",
          "Plagiarism and direct copying are prohibited. External references and datasets must be cited.",
          "An AI-detector score alone is not sufficient evidence for disqualification; demonstrable understanding in Q&A is essential."
        ],
        tieBreaker: "1. Higher Originality / Innovation assessment; 2. Higher Technical Depth / Feasibility; 3. Higher Q&A Defense score; 4. Common jury tie-break question.",
        disqualification: "Substantial plagiarism, false authorship, presenting another's work as own, inability to explain submitted work, unauthorized outside assistance."
      },
      {
        id: "techmain",
        number: "02",
        name: "TechMain",
        tagline: "Speed-Based Technical & Aptitude Trivia",
        badge: "TECHNICAL 02",
        teamSize: "Strictly Individual",
        slot: "60 Questions (2 Rounds × 30 Questions)",
        venue: "Main Auditorium",
        deadline: "On-site live competition",
        desc: "A fast-paced individual quiz that tests general aptitude and Electrical & Electronics Engineering trivia across mixed difficulty levels suitable for students from all years.",
        objective: "Test individual speed, general aptitude, and EEE technical understanding under rapid oral response conditions.",
        format: "Round 1: 30 Questions on General / Aptitude. Round 2: 30 Questions on EEE Technical Trivia. Oral speed answering. First recognized correct answer gets point. No negative marking.",
        rules: [
          "Participation is strictly individual. Multiple students from the same college participate as individual competitors.",
          "Total of 60 questions: Round 1 (30 General/Aptitude) + Round 2 (30 EEE Technical).",
          "Questions are asked by the event coordinator; participants answer orally.",
          "Speed-based: the first valid audible correct answer recognized by the coordinator receives the point.",
          "Zero negative marking: no penalty points deducted for incorrect attempts.",
          "Mobile phones, smartwatches, and internet search are strictly prohibited during active rounds."
        ],
        tieBreaker: "1. Higher correct answers in Round 2 (EEE Technical); 2. Faster valid response performance; 3. Sudden-death technical trivia questions.",
        disqualification: "Unauthorized device usage, internet search, copying, outside prompting, answer sharing, or accessing question material in advance."
      },
      {
        id: "debugging-circuit",
        number: "03",
        name: "Debugging Circuit",
        tagline: "DC Hardware Troubleshooting & Practical Wiring",
        badge: "TECHNICAL 03",
        teamSize: "2 to 4 Participants",
        slot: "Medium to Complicated DC Circuit Challenge",
        venue: "Power Electronics / Circuit Lab",
        deadline: "Bring Laptop & Charger (Mandatory)",
        desc: "Test practical circuit understanding, connection accuracy, troubleshooting ability, and speed by assembling, testing, and demonstrating a working DC circuit from a provided reference.",
        objective: "Diagnose faults, assemble breadboard circuits, and demonstrate a working DC circuit from a reference specification in the shortest valid time.",
        format: "DC circuits only (No AC tasks). Components & reference diagram provided by organizers. Participants must bring their own laptop. Phones, calculators & internet are allowed.",
        rules: [
          "Team size is 2 to 4 participants.",
          "Scope is DC circuits only (Medium to Complicated). No AC circuit task.",
          "Organizers provide circuit components and reference circuit specification.",
          "Participants MUST bring their own laptop, charger, and accessories. Organizers will not provide personal laptops.",
          "Mobile phones, calculators, and internet access ARE ALLOWED for circuit reference and simulation.",
          "Teams assemble, troubleshoot, and debug until the circuit works correctly.",
          "When ready, the team requests verification. The circuit must be demonstrated working to the coordinator/judge.",
          "No negative marking or deduction for failed intermediate attempts. Fastest verified working circuit wins."
        ],
        tieBreaker: "1. Precise coordinator finish verification timestamp; 2. Sudden-death short debugging circuit task.",
        disqualification: "Using hidden pre-assembled circuits/modules, copying another team's physical connections, tampering with equipment, or violating DC safety limits."
      }
    ],

    nonTechnical: [
      {
        id: "robo-relay",
        number: "01",
        name: "Robo Relay",
        tagline: "Blindfolded Voice-Guided Coordination Challenge",
        badge: "NON-TECHNICAL 01",
        teamSize: "Exactly 2 Participants",
        slot: "Voice-Guided Timed Obstacle Course",
        venue: "Indoor Sports Complex / Open Arena",
        deadline: "Live timed runs",
        desc: "A high-stakes two-person communication and coordination challenge in which one blindfolded performer completes a marked route/task guided solely by the spoken voice instructions of their sighted teammate.",
        objective: "Test precision communication, active listening, and spatial coordination under voice-only constraints.",
        format: "1 Blindfolded Performer + 1 Verbal Instructor. Spoken voice commands only. 3-strike boundary rule. Fastest valid completion wins.",
        rules: [
          "Team consists of exactly 2 members: 1 blindfolded performer + 1 sighted verbal instructor.",
          "Guidance is strictly voice-only: spoken instructions only.",
          "Hand gestures, written clues, displayed text, drawing, or non-verbal assistance are strictly prohibited.",
          "Boundary/Line Rule: 1st violation = Strike 1 warning; 2nd violation = Strike 2 warning; 3rd violation = Immediate Disqualification.",
          "A disqualified attempt does NOT restart from the beginning.",
          "Blindfold must remain properly worn throughout the active run.",
          "Ranking is based on shortest valid completion time with all tasks accomplished."
        ],
        tieBreaker: "1. Fewer boundary strikes; 2. Higher task accuracy; 3. Short sudden-death Robo Relay course under same voice rules.",
        disqualification: "Third boundary violation, lifting/peeking through blindfold, using gestures/written clues, or receiving help from anyone outside the registered instructor."
      },
      {
        id: "mission-impossible",
        number: "02",
        name: "Mission Impossible",
        tagline: "5-Checkpoint Logic, Memory & Final Laptop Challenge",
        badge: "NON-TECHNICAL 02",
        teamSize: "Exactly 2 Participants",
        slot: "5 Sequential Checkpoints (Ends with Solo Laptop Final)",
        venue: "Multipurpose Hall & Lab Station",
        deadline: "Sequential clue challenge",
        desc: "A two-member, five-checkpoint challenge testing observation, logic, memory, communication drawing, and clue interpretation, culminating in a single-player laptop final challenge.",
        objective: "Navigate 5 intense checkpoints to earn 4 secret clues and solve the final laptop challenge in the shortest total time.",
        format: "Checkpoint 1 (Observation) → Checkpoint 2 (Word Logic) → Checkpoint 3 (Card Memory) → Checkpoint 4 (Drawing) → Checkpoint 5 (Final Laptop Solo Challenge).",
        rules: [
          "Team consists of exactly 2 participants.",
          "Checkpoint 1 (Observation): Observe scene arrangement (e.g. desk/room setup) → Earn Clue 1.",
          "Checkpoint 2 (Logic / Word): Solve word-shuffle / hidden-word challenge → Earn Clue 2.",
          "Checkpoint 3 (Card Memory): Complete flipped cards / matching pairs challenge → Earn Clue 3.",
          "Checkpoint 4 (Communication Drawing): One teammate draws silently to communicate concept to guesser → Earn Clue 4.",
          "Checkpoint 5 (Final Laptop): ONLY ONE teammate attempts alone at a laptop. Combines all 4 clues to answer the final challenge. Max 3 answer attempts. The second teammate must remain silent without assisting.",
          "Total valid completion time across all 5 checkpoints determines the winner."
        ],
        tieBreaker: "1. Faster Final Laptop Station completion time; 2. Sudden-death clue/logic challenge between one selected member from tied teams.",
        disqualification: "Unauthorized device usage, outside assistance, receiving help from the second teammate during the solo laptop final, exchanging clues, or tampering with station materials."
      },
      {
        id: "electro-enigma",
        number: "03",
        name: "Electro Enigma",
        tagline: "Rapid 10-Second Visual & Cinema Quiz Showdown",
        badge: "NON-TECHNICAL 03",
        teamSize: "2 Participants",
        slot: "3 Rounds (10 Seconds Per Question)",
        venue: "Auditorium Stage",
        deadline: "Live buzzer / rapid rounds",
        desc: "A three-round, two-member entertainment quiz challenge built around quick thinking, visual word association, movie/cinema clues, and lateral puzzle-solving.",
        objective: "Quick visual association and cultural/cinematic trivia under a strict 10-second countdown.",
        format: "3 Rounds. 10 seconds per question. Zero negative marking. Includes Movie-Based Round & Picture Combination / Visual Word Round.",
        rules: [
          "Team consists of 2 participants.",
          "Total of 3 rounds with 10 seconds allotted per question.",
          "Confirmed round concepts include Movie-Based Round and Picture Combination / Visual Word Association Round.",
          "No negative marking: incorrect answers do not deduct points.",
          "Unauthorized search or cheating results in immediate disqualification, not negative points.",
          "Accumulated correct answers across the 3 rounds determine the final ranking."
        ],
        tieBreaker: "1. Higher score in the final completed round; 2. Higher number of total correct answers; 3. Sudden-death tie-break questions.",
        disqualification: "Answer copying, outside assistance, unauthorized internet search, or accessing question material in advance."
      }
    ]
  },

  agenda: [
    {
      time: "By 8:30 AM",
      title: "Reporting Deadline for On-Spot Registration",
      desc: "On-spot registration closes strictly at 8:30 AM. Late arrivals cannot be accommodated for on-spot entry.",
      tags: ["Auditorium Foyer", "Reporting Deadline"]
    },
    {
      time: "8:30 AM - 10:00 AM",
      title: "Registration Verification & Welcome Kit Distribution",
      desc: "Check-in at the registration desks. Collect official welcome kit (file/folder, note/notepad, pen), food coupons, and participant credentials.",
      tags: ["Auditorium Foyer", "Kit & Pass Distribution"]
    },
    {
      time: "9:00 AM",
      title: "Main Programme Activities Begin",
      desc: "Welcome greetings, orientation, venue briefing, and schedule overview for all registered college delegations.",
      tags: ["Campus Auditorium", "Programme Start"]
    },
    {
      time: "10:00 AM - 11:00 AM",
      title: "Grand Inauguration Ceremony",
      desc: "Traditional lighting of the lamp, presidential address by Principal and HOD (EEE) Dr. S. Senthilkumar, and symposium keynote address.",
      tags: ["Campus Auditorium", "Keynote & Inauguration"]
    },
    {
      time: "11:00 AM - 1:00 PM",
      title: "Technical Events Arena",
      desc: "Concurrent competitions: Paper Presentation (Seminar Hall), TechMain oral speed trivia (Auditorium), and Debugging Circuit DC troubleshooting (Power Lab).",
      tags: ["Seminar Hall", "Auditorium", "Circuit Lab"]
    },
    {
      time: "1:00 PM - 2:00 PM",
      title: "Deluxe Lunch Break & Networking",
      desc: "Delicious hot lunch and refreshments provided for all registered participants. Network with fellow engineering delegations.",
      tags: ["Dining Hall", "Lunch & Refreshments"]
    },
    {
      time: "2:00 PM - 4:00 PM",
      title: "Non-Technical Events Arena",
      desc: "High-octane competitions: Robo Relay blindfolded course, Mission Impossible 5-checkpoint challenge, and Electro Enigma visual quiz.",
      tags: ["Indoor Arena", "Multipurpose Hall", "Auditorium Stage"]
    },
    {
      time: "4:00 PM - 4:15 PM",
      title: "Transition & Result Finalization Break",
      desc: "Coordinators and judges verify score sheets, validate completion times, and finalize podium standings.",
      tags: ["Jury Secretariat", "Score Audit"]
    },
    {
      time: "4:15 PM - 5:00 PM",
      title: "Valedictory, Prize Distribution & Overall Championship",
      desc: "Awarding of cash prizes (Rs. 500, Rs. 400, Rs. 300), participation certificates, and crowning the Overall Championship College Trophy.",
      tags: ["Campus Auditorium", "Prizes & Championship Trophy"]
    }
  ],

  faqs: [
    {
      cat: "eligibility",
      q: "Who is eligible to participate in POWERNEX 26?",
      a: "Students from ALL departments and years are welcome to participate. You do not need to belong to the Electrical and Electronics Engineering department. Choose events that match your interests, skills, or technical knowledge."
    },
    {
      cat: "registration",
      q: "What is included in the Rs. 150 registration fee?",
      a: "The Rs. 150 fee includes event registration, welcome kit (note/notepad, pen, and file/folder), deluxe lunch/food, refreshments, and an official participation certificate. There is no separate certificate fee."
    },
    {
      cat: "registration",
      q: "Is the Rs. 150 fee charged per team or per participant?",
      a: "It is charged per participant. For example, a team of four members pays Rs. 600 in total. All team members must be registered."
    },
    {
      cat: "registration",
      q: "What are the registration deadlines for online and on-spot?",
      a: "Online registration closes at 6:00 PM on 07 October 2026. On-spot registration is available on event day (08 October 2026) but closes strictly at 8:30 AM."
    },
    {
      cat: "technical",
      q: "Can I participate in multiple technical and non-technical events?",
      a: "Yes. There is no fixed limit on the number of events you may register for. However, you are responsible for avoiding timetable clashes between morning technical events (11:00 AM - 1:00 PM) and afternoon non-technical events (2:00 PM - 4:00 PM)."
    },
    {
      cat: "technical",
      q: "Do I need to bring my own laptop?",
      a: "Yes! The organizers will not provide personal laptops. Debugging Circuit participants MUST bring their own laptop, charger, and required accessories. For other events, bring a laptop if your presentation or preparation requires it."
    },
    {
      cat: "technical",
      q: "What are the rules for Paper Presentation topics?",
      a: "The Paper Presentation has an OPEN topic. Participants may choose any suitable technical, engineering, innovation, research, or problem-solving topic. Ideas must be submitted online on or before 07 October 2026, or screened on-spot at the venue."
    },
    {
      cat: "general",
      q: "Do I need to bring my college ID card?",
      a: "Yes! A valid college/student ID card is strictly compulsory for verification at the registration desk for every participant."
    },
    {
      cat: "general",
      q: "Where will POWERNEX 26 be conducted and how do we reach?",
      a: "POWERNEX 26 takes place at the Campus Auditorium, University College of Engineering, Kavanur, Tamil Nadu 621731 (Plus Code: 45JX+669). Buses connect directly from Ariyalur Railway Station (ALU) and Ariyalur Central Bus Stand to the campus gate."
    }
  ],

    developer: {
    name: "Veerakumar V",
    role: "Full-Stack Web Architect",
    dept: "2nd Year, Department of Electrical & Electronics Engineering",
    institution: "University College of Engineering, Ariyalur",
    email: "uceadeveloper@gmail.com",
    instagram: "https://instagram.com/mr_veerakumar.v"
  },
  coordinators: {
    hod: {
      name: "Dr. S. Senthilkumar",
      role: "Head of Department (EEE)",
      institution: "University College of Engineering, Ariyalur"
    },
    students: [
      {
        name: "Mr. Yuvanraj A.",
        role: "Student Coordinator",
        phone: "7339086778",
        email: "yuvanraj2505@gmail.com"
      },
      {
        name: "Mr. Arun Annamalai G.",
        role: "Student Coordinator",
        phone: "+91 93603 41413",
        email: "arunannamalai7939@gmail.com"
      }
    ]
  }
};
