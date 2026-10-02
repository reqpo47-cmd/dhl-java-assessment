// Sync Header Attempt Badge
(function syncAttemptBadge() {
  const attempts = localStorage.getItem('dhl_attempts') || '1';
  const badge = document.getElementById('attempt-badge');
  if (badge) {
    badge.textContent = `ATTEMPT: ${attempts} / 2`;
  }
})();
// Enterprise Portal Initialization Animation Logic
window.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.getElementById('splash-progress');
  const statusText = document.getElementById('splash-status');
  const splash = document.getElementById('splash-screen');

  const steps = [
    { pct: '25%', text: 'AUTHENTICATING DHL ENTERPRISE GATEWAY...' },
    { pct: '55%', text: 'LOADING REQ-PO47 ASSESSMENT MODULES...' },
    { pct: '85%', text: 'ENCRYPTING PROCTORING & IP SESSION...' },
    { pct: '100%', text: 'PORTAL READY. LAUNCHING ENVIRONMENT...' }
  ];

  let currentStep = 0;
  const interval = setInterval(() => {
    if (currentStep < steps.length) {
      if (progressBar) progressBar.style.width = steps[currentStep].pct;
      if (statusText) statusText.textContent = steps[currentStep].text;
      currentStep++;
    } else {
      clearInterval(interval);
      setTimeout(() => {
        if (splash) {
          splash.style.opacity = '0';
          splash.style.visibility = 'hidden';
        }
      }, 400);
    }
  }, 450);
});
let timeRemaining = 45 * 60; // 45 Minutes
let timerInterval = null;
let currentQuestionIndex = 0;
let activeQuestions = [];
let userAnswers = {};

// Block Copy, Paste, Cut, Right-Click
document.addEventListener('copy', (e) => e.preventDefault());
document.addEventListener('paste', (e) => e.preventDefault());
document.addEventListener('cut', (e) => e.preventDefault());
document.addEventListener('contextmenu', (e) => e.preventDefault());

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
}

function startAssessmentProcess() {
  const name = document.getElementById('cand-name') ? document.getElementById('cand-name').value.trim() : '';
  const email = document.getElementById('cand-email') ? document.getElementById('cand-email').value.trim() : '';
  const phone = document.getElementById('cand-phone') ? document.getElementById('cand-phone').value.trim() : '';
  const linkedin = document.getElementById('cand-linkedin') ? document.getElementById('cand-linkedin').value.trim() : '';

  const checkPolicy = document.getElementById('check-policy') ? document.getElementById('check-policy').checked : false;
  const checkW2 = document.getElementById('check-w2') ? document.getElementById('check-w2').checked : false;
  const checkProctor = document.getElementById('check-proctor') ? document.getElementById('check-proctor').checked : false;
  const checkInstructions = document.getElementById('check-instructions') ? document.getElementById('check-instructions').checked : false;

  if (!name || !email || !phone || !linkedin) {
    alert("Please complete all candidate profile fields before proceeding.");
    return;
  }

  if (!checkPolicy || !checkW2 || !checkProctor || !checkInstructions) {
    alert("You must acknowledge all mandatory compliance, policy, and candidate instruction items to proceed.");
    return;
  }

  // Pre-fill Page 3 fields with Page 1 inputs
  if (document.getElementById('final-cand-name')) document.getElementById('final-cand-name').value = name;
  if (document.getElementById('final-cand-email')) document.getElementById('final-cand-email').value = email;
  if (document.getElementById('final-cand-phone')) document.getElementById('final-cand-phone').value = phone;

  // Increment attempts counter
  let attempts = parseInt(localStorage.getItem('dhl_attempts') || '0') + 1;
  localStorage.setItem('dhl_attempts', attempts);

  // Load Questions set dynamically
  if (typeof getQuestionsForCurrentAttempt === "function") {
    activeQuestions = getQuestionsForCurrentAttempt();
  } else if (typeof testQuestions !== "undefined") {
    activeQuestions = testQuestions;
  } else {
    alert("Error loading question set. Please refresh.");
    return;
  }

  currentQuestionIndex = 0;

  showPage('page-2');
  loadQuestion(currentQuestionIndex);
  startTimer();
  activateTabProtection();
}

function loadQuestion(index) {
  if (!activeQuestions || activeQuestions.length === 0) return;

  const q = activeQuestions[index];
  document.getElementById('question-progress-label').textContent = `QUESTION ${index + 1} OF ${activeQuestions.length}`;
  document.getElementById('q-title').textContent = q.title;
  document.getElementById('q-desc').textContent = q.description;

  const codeArea = document.getElementById('current-code-answer');
  if (codeArea) {
    codeArea.value = userAnswers[q.id] || '';
  }

  // Button Visibility Controls
  const prevBtn = document.getElementById('btn-prev');
  const nextBtn = document.getElementById('btn-next');
  const submitBtn = document.getElementById('btn-submit');

  if (prevBtn) prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';

  if (index === activeQuestions.length - 1) {
    if (nextBtn) nextBtn.style.display = 'none';
    if (submitBtn) submitBtn.style.display = 'inline-block';
  } else {
    if (nextBtn) nextBtn.style.display = 'inline-block';
    if (submitBtn) submitBtn.style.display = 'none';
  }
}

function saveCurrentAnswer() {
  if (!activeQuestions || activeQuestions.length === 0) return;
  const q = activeQuestions[currentQuestionIndex];
  const codeArea = document.getElementById('current-code-answer');
  if (q && codeArea) {
    userAnswers[q.id] = codeArea.value;
  }
}

function navigateQuestion(direction) {
  saveCurrentAnswer();
  currentQuestionIndex += direction;
  if (currentQuestionIndex < 0) currentQuestionIndex = 0;
  if (currentQuestionIndex >= activeQuestions.length) currentQuestionIndex = activeQuestions.length - 1;
  loadQuestion(currentQuestionIndex);
}

function startTimer() {
  const display = document.getElementById('timer-display');
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    timeRemaining--;
    let mins = Math.floor(timeRemaining / 60);
    let secs = timeRemaining % 60;
    if (display) {
      display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      alert("Time expired! Submitting your assessment automatically.");
      goToAgencyVerification('Time Expired');
    }
  }, 1000);
}

// Security Enforcement: Anti Tab-Switching
function activateTabProtection() {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && document.getElementById('page-2').classList.contains('active')) {
      clearInterval(timerInterval);
      alert("SECURITY VIOLATION: Tab switch or window minimization detected. Directing to final submission.");
      goToAgencyVerification('Security Violation (Tab Switch)');
    }
  });
}

function handleAgencyChange(selectElem) {
  const otherGroup = document.getElementById('other-agency-group');
  const otherInput = document.getElementById('other-agency-input');
  if (selectElem.value === 'OTHER') {
    otherGroup.style.display = 'block';
    otherInput.required = true;
  } else {
    otherGroup.style.display = 'none';
    otherInput.required = false;
    otherInput.value = '';
  }
}

function goToAgencyVerification(reason) {
  clearInterval(timerInterval);
  saveCurrentAnswer();
  showPage('page-3');
}

function executeFinalSubmission() {
  const name = document.getElementById('final-cand-name').value.trim();
  const phone = document.getElementById('final-cand-phone').value.trim();
  const email = document.getElementById('final-cand-email').value.trim();
  
  const agencySelect = document.getElementById('agency-select').value;
  const otherAgency = document.getElementById('other-agency-input').value.trim();
  const joining = document.getElementById('joining-timeline').value;
  const workAuth = document.getElementById('work-authorization').value;
  const declChecked = document.getElementById('check-final-decl').checked;

  if (!name || !phone || !email || !agencySelect || !joining || !workAuth) {
    alert("Please complete all candidate and consulting agency verification fields.");
    return;
  }

  if (agencySelect === 'OTHER' && !otherAgency) {
    alert("Please specify the exact name of your consulting firm.");
    return;
  }

  if (!declChecked) {
    alert("You must acknowledge the candidate authorization declaration before submitting.");
    return;
  }

  const finalAgencyName = agencySelect === 'OTHER' ? otherAgency : agencySelect;

  const candidatePayload = {
    candidateName: name,
    email: email,
    phone: phone,
    consultingAgency: finalAgencyName,
    earliestJoining: joining,
    workAuthorization: workAuth,
    attemptNumber: localStorage.getItem('dhl_attempts') || '1',
    submittedAt: new Date().toISOString(),
    responses: activeQuestions.map(q => ({
      questionId: q.id,
      title: q.title,
      codeAnswer: userAnswers[q.id] || 'N/A'
    }))
  };

  console.log("DHL Enterprise Final Payload Transmitted:", candidatePayload);

  // Trigger Animated Circular Processing Overlay
  const overlay = document.getElementById('processing-overlay');
  const stroke = document.getElementById('circle-stroke');
  const percentText = document.getElementById('loader-percentage');
  const statusText = document.getElementById('loader-status');

  if (overlay) overlay.style.display = 'flex';

  const circumference = 408; // 2 * Math.PI * 65
  let progress = 0;

  const statusMessages = [
    { at: 15, text: 'ENCRYPTING CANDIDATE CODE PAYLOAD...' },
    { at: 40, text: 'RUNNING SECURITY & PROCTORING INTEGRITY CHECKS...' },
    { at: 70, text: 'AUTHENTICATING VENDOR AGENCY CREDENTIALS...' },
    { at: 90, text: 'TRANSMITTING REQ-PO47 RESULTS TO DHL TALENT VAULT...' },
    { at: 100, text: 'SUBMISSION VERIFIED & SECURED!' }
  ];

  const interval = setInterval(() => {
    progress += 2;
    if (percentText) percentText.textContent = `${progress}%`;
    
    // Update SVG stroke circle dash offset
    const offset = circumference - (progress / 100) * circumference;
    if (stroke) {
      stroke.style.strokeDashoffset = offset;
      if (progress > 80) stroke.style.stroke = '#00FF66'; // Green on near complete
    }

    // Dynamic Status Update
    const currentMsg = statusMessages.find(m => m.at === progress);
    if (currentMsg && statusText) {
      statusText.textContent = currentMsg.text;
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        if (overlay) overlay.style.display = 'none';

        // Populate Page 4 Confirmation Receipt
        document.getElementById('ack-name').textContent = name;
        document.getElementById('ack-agency').textContent = finalAgencyName;
        document.getElementById('ack-joining').textContent = joining;

        showPage('page-4');
      }, 500);
    }
  }, 40);
}
