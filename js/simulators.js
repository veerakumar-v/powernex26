/**
 * POWERNEX 26 | Interactive Event Simulators
 * Powers interactive simulators for the 6 official EEE events:
 * 1. Paper Presentation (Slide deck preview & defense)
 * 2. TechMain (Speed-based oral buzzer & trivia)
 * 3. Debugging Circuit (DC troubleshooting, multimeter & laptop verification)
 * 4. Robo Relay (Voice-only guidance & 3-strike boundary tracker)
 * 5. Mission Impossible (5-checkpoint clue sequence & laptop final)
 * 6. Electro Enigma (10-second rapid visual & cinema quiz)
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. PAPER PRESENTATION SLIDE DECK SIMULATOR
  // ==========================================================================
  const paperSlides = [
    { title: "Autonomous EV Charging Infrastructure", sub: "Grid-Tie Solar Inverter & Battery Energy Storage" },
    { title: "Smart Microgrid Fault Localization", sub: "Real-Time SCADA Telemetry & Sensor Interfacing" },
    { title: "Solid-State Transformers for HVDC", sub: "Silicon-Carbide (SiC) Nanosecond Switching" },
    { title: "Power Quality Monitoring in Sub-stations", sub: "Harmonic Distortion Analysis & Predictive Alerting" }
  ];

  let currentSlideIdx = 0;
  const slideTitleEl = document.getElementById('deck-slide-title');
  const slideSubEl = document.getElementById('deck-slide-sub');
  const slideCounterEl = document.getElementById('deck-slide-counter');
  const prevSlideBtn = document.getElementById('deck-prev-btn');
  const nextSlideBtn = document.getElementById('deck-next-btn');

  function renderSlide() {
    if (slideTitleEl) slideTitleEl.textContent = paperSlides[currentSlideIdx].title;
    if (slideSubEl) slideSubEl.textContent = paperSlides[currentSlideIdx].sub;
    if (slideCounterEl) slideCounterEl.textContent = `SLIDE 0${currentSlideIdx + 1} / 0${paperSlides.length}`;
  }

  if (prevSlideBtn && nextSlideBtn) {
    prevSlideBtn.addEventListener('click', () => {
      currentSlideIdx = (currentSlideIdx - 1 + paperSlides.length) % paperSlides.length;
      renderSlide();
    });

    nextSlideBtn.addEventListener('click', () => {
      currentSlideIdx = (currentSlideIdx + 1) % paperSlides.length;
      renderSlide();
    });

    setInterval(() => {
      currentSlideIdx = (currentSlideIdx + 1) % paperSlides.length;
      renderSlide();
    }, 5500);
  }

  // ==========================================================================
  // 2. TECHMAIN SPEED BUZZER SIMULATOR
  // ==========================================================================
  const techmainQuestions = [
    { round: "R1: ELECTRICAL APTITUDE", q: "If power is tripled and resistance halved, current increases by?", a: "sqrt(6) (approx 2.45x)", pts: "+1 POINT" },
    { round: "R2: EEE TECHNICAL", q: "Which DC motor exhibits dangerously high speed at zero load?", a: "DC Series Motor", pts: "+1 POINT" },
    { round: "R1: ELECTRICAL APTITUDE", q: "Next number in series: 2, 6, 12, 20, 30, ?", a: "42 (n^2 + n)", pts: "+1 POINT" },
    { round: "R2: EEE TECHNICAL", q: "What device converts constant DC voltage into variable DC?", a: "DC Chopper", pts: "+1 POINT" }
  ];

  let techmainIdx = 0;
  const tmRoundEl = document.getElementById('tm-round-tag');
  const tmQuestionEl = document.getElementById('tm-question-text');
  const tmAnswerEl = document.getElementById('tm-answer-text');
  const tmBuzzerBtn = document.getElementById('tm-buzzer-btn');

  function cycleTechmain() {
    techmainIdx = (techmainIdx + 1) % techmainQuestions.length;
    const item = techmainQuestions[techmainIdx];
    if (tmRoundEl) tmRoundEl.textContent = item.round;
    if (tmQuestionEl) tmQuestionEl.textContent = item.q;
    if (tmAnswerEl) tmAnswerEl.textContent = `Answer: "${item.a}" [FIRST BUZZER ${item.pts}]`;
  }

  if (tmBuzzerBtn) {
    tmBuzzerBtn.addEventListener('click', () => {
      cycleTechmain();
    });
    setInterval(cycleTechmain, 5000);
  }

  // ==========================================================================
  // 3. DEBUGGING CIRCUIT SIMULATOR (DC HARDWARE TROUBLESHOOTING)
  // ==========================================================================
  const dcToggleBtn = document.getElementById('dc-circuit-toggle-btn');
  const dcVoltMeter = document.getElementById('dc-volt-meter');
  const dcCurrentMeter = document.getElementById('dc-current-meter');
  const dcStatusText = document.getElementById('dc-status-text');
  const dcVerificationBadge = document.getElementById('dc-verification-badge');

  if (dcToggleBtn) {
    let isCircuitWorking = true;

    dcToggleBtn.addEventListener('click', () => {
      isCircuitWorking = !isCircuitWorking;

      if (isCircuitWorking) {
        dcToggleBtn.textContent = 'SUPPLY: 12V DC ACTIVE';
        dcToggleBtn.classList.add('active');
        if (dcVoltMeter) dcVoltMeter.textContent = '12.08 V DC';
        if (dcCurrentMeter) dcCurrentMeter.textContent = '350 mA';
        if (dcStatusText) dcStatusText.textContent = 'CIRCUIT VERIFIED • OUTPUT STABLE';
        if (dcVerificationBadge) {
          dcVerificationBadge.textContent = 'STATUS: PASS';
          dcVerificationBadge.style.color = 'var(--emerald)';
        }
      } else {
        dcToggleBtn.textContent = 'SUPPLY: FAULT DETECTED';
        dcToggleBtn.classList.remove('active');
        if (dcVoltMeter) dcVoltMeter.textContent = '0.45 V DC (DROP)';
        if (dcCurrentMeter) dcCurrentMeter.textContent = '0 mA';
        if (dcStatusText) dcStatusText.textContent = 'OPEN / SHORT FAULT LOCATING...';
        if (dcVerificationBadge) {
          dcVerificationBadge.textContent = 'STATUS: DEBUGGING...';
          dcVerificationBadge.style.color = 'var(--volt-amber)';
        }
      }
    });
  }

  // ==========================================================================
  // 4. ROBO RELAY VOICE GUIDANCE & STRIKE SIMULATOR
  // ==========================================================================
  const roboVoiceCommands = [
    { voice: '"STEP FORWARD 3 PACES... SLOW DOWN!"', pos: "ROUTE: SECTION A", strikes: "BOUNDARY STRIKES: 0 / 3 [CLEAR]" },
    { voice: '"TURN 45 DEGREES RIGHT... STOP!"', pos: "ROUTE: OBSTACLE 2", strikes: "BOUNDARY STRIKES: 0 / 3 [CLEAR]" },
    { voice: '"SLIGHT LEFT... REACH FOR TARGET TERMINAL!"', pos: "ROUTE: CHECKPOINT B", strikes: "BOUNDARY STRIKES: 1 / 3 [WARNING 1]" },
    { voice: '"TOUCHDOWN ON PLATFORM... FINISH!"', pos: "ROUTE: GOAL LINE", strikes: "COMPLETED IN 48.2s" }
  ];

  let roboIdx = 0;
  const roboVoiceEl = document.getElementById('robo-voice-text');
  const roboPosEl = document.getElementById('robo-pos-text');
  const roboStrikesEl = document.getElementById('robo-strikes-text');

  if (roboVoiceEl && roboPosEl && roboStrikesEl) {
    setInterval(() => {
      roboIdx = (roboIdx + 1) % roboVoiceCommands.length;
      const cmd = roboVoiceCommands[roboIdx];
      roboVoiceEl.textContent = cmd.voice;
      roboPosEl.textContent = cmd.pos;
      roboStrikesEl.textContent = cmd.strikes;
    }, 4000);
  }

  // ==========================================================================
  // 5. MISSION IMPOSSIBLE 5-CHECKPOINT SIMULATOR
  // ==========================================================================
  const miSteps = [
    { step: "CHECKPOINT 1/5: OBSERVATION", clue: "CLUE 1 UNLOCKED: [TRANSFORMER TAP #7]" },
    { step: "CHECKPOINT 2/5: CIRCUIT LOGIC", clue: "CLUE 2 UNLOCKED: [INVERTER KEY]" },
    { step: "CHECKPOINT 3/5: OHM CALCULATION", clue: "CLUE 3 UNLOCKED: [RESISTANCE VALUE: 470 OHMS]" },
    { step: "CHECKPOINT 4/5: GRID DIAGRAM", clue: "CLUE 4 UNLOCKED: [RELAY COIL NODE]" },
    { step: "CHECKPOINT 5/5: SOLO LAPTOP", clue: "FINAL ATTEMPT: ATTEMPT 1/3 - ACCESS GRANTED" }
  ];

  let miIdx = 0;
  const miStepEl = document.getElementById('mi-step-tag');
  const miClueEl = document.getElementById('mi-clue-text');

  if (miStepEl && miClueEl) {
    setInterval(() => {
      miIdx = (miIdx + 1) % miSteps.length;
      miStepEl.textContent = miSteps[miIdx].step;
      miClueEl.textContent = miSteps[miIdx].clue;
    }, 3800);
  }

  // ==========================================================================
  // 6. ELECTRO ENIGMA 10-SECOND QUIZ SIMULATOR
  // ==========================================================================
  const enigmaRiddles = [
    { round: "ROUND 1: CINEMA WORD", clue: "NAME THE SCI-FI FILM INVOLVING 1.21 GIGAWATTS OF ELECTRIC POWER", answer: "ANSWER: BACK TO THE FUTURE", time: "TIME: 07s LEFT" },
    { round: "ROUND 2: ELECTRICAL CONNECTION", clue: "FLEMING + RIGHT HAND + GENERATOR = INDUCED CURRENT", answer: "ANSWER: DYNAMO PRINCIPLE", time: "TIME: 05s LEFT" },
    { round: "ROUND 3: POP CULTURE TECH", clue: "ARC REACTOR INVENTED BY TONY STARK REPRESENTS CLEAN ENERGY", answer: "ANSWER: IRON MAN", time: "TIME: 09s LEFT" }
  ];

  let enigmaIdx = 0;
  const enigmaRoundEl = document.getElementById('enigma-round-tag');
  const enigmaClueEl = document.getElementById('enigma-clue-text');
  const enigmaAnswerEl = document.getElementById('enigma-answer-text');
  const enigmaTimerEl = document.getElementById('enigma-timer-badge');

  if (enigmaRoundEl && enigmaClueEl && enigmaAnswerEl) {
    setInterval(() => {
      enigmaIdx = (enigmaIdx + 1) % enigmaRiddles.length;
      const r = enigmaRiddles[enigmaIdx];
      enigmaRoundEl.textContent = r.round;
      enigmaClueEl.textContent = r.clue;
      enigmaAnswerEl.textContent = r.answer;
      if (enigmaTimerEl) enigmaTimerEl.textContent = r.time;
    }, 4200);
  }
});
