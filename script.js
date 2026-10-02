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

  // Increment attempts counter
  let attempts = parseInt(localStorage.getItem('dhl_attempts') || '0') + 1;
  localStorage.setItem('dhl_attempts', attempts);

  // Load Questions set dynamically based on attempt
  if (typeof getQuestionsForCurrentAttempt === "function") {
    activeQuestions = getQuestionsForCurrentAttempt();
  } else if (typeof testQuestions !== "undefined") {
    activeQuestions = testQuestions;
  } else {
    alert("Error loading questions. Please contact support.");
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
      submitAssessment('Time Expired');
    }
  }, 1000);
}

// Security Enforcement: Anti Tab-Switching
function activateTabProtection() {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && document.getElementById('page-2').classList.contains('active')) {
      clearInterval(timerInterval);
      alert("SECURITY VIOLATION: Tab switch or window minimization detected. Assessment is terminated and submitted.");
      submitAssessment('Security Violation (Tab Switch)');
    }
  });
}

function validateAndSubmit() {
  saveCurrentAnswer();
  let missing = false;

  activeQuestions.forEach(q => {
    if (!userAnswers[q.id] || userAnswers[q.id].trim() === "") {
      missing = true;
    }
  });

  if (missing) {
    alert("Please write solutions for all questions before submitting.");
    return;
  }

  submitAssessment('Manual Submission');
}

function submitAssessment(reason) {
  clearInterval(timerInterval);
  saveCurrentAnswer();

  const candidateData = {
    name: document.getElementById('cand-name') ? document.getElementById('cand-name').value : '',
    email: document.getElementById('cand-email') ? document.getElementById('cand-email').value : '',
    phone: document.getElementById('cand-phone') ? document.getElementById('cand-phone').value : '',
    linkedin: document.getElementById('cand-linkedin') ? document.getElementById('cand-linkedin').value : '',
    attemptNumber: localStorage.getItem('dhl_attempts') || '1',
    status: reason,
    submittedAt: new Date().toISOString(),
    responses: activeQuestions.map(q => ({
      questionId: q.id,
      title: q.title,
      codeAnswer: userAnswers[q.id] || 'N/A'
    }))
  };

  console.log("Candidate Final Submission Payload:", candidateData);

  const subMsg = document.getElementById('submission-message');
  if (subMsg) {
    subMsg.innerHTML = `
      Your test results have been securely recorded. The <strong>DHL HR Team</strong> will review your submission and contact you directly.
    `;
  }
  showPage('page-3');
}
