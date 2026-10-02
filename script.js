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
  document.getElementById(pageId).classList.add('active');
}

function startAssessmentProcess() {
  const name = document.getElementById('cand-name').value.trim();
  const email = document.getElementById('cand-email').value.trim();
  const phone = document.getElementById('cand-phone').value.trim();
  const linkedin = document.getElementById('cand-linkedin').value.trim();

  const checkPolicy = document.getElementById('check-policy').checked;
  const checkW2 = document.getElementById('check-w2').checked;
  const checkProctor = document.getElementById('check-proctor').checked;
  const checkInstructions = document.getElementById('check-instructions').checked;

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
  activeQuestions = getQuestionsForCurrentAttempt();
  currentQuestionIndex = 0;

  showPage('page-2');
  loadQuestion(currentQuestionIndex);
  startTimer();
  activateTabProtection();
}

function loadQuestion(index) {
  const q = activeQuestions[index];
  document.getElementById('question-progress-label').textContent = `QUESTION ${index + 1} OF ${activeQuestions.length}`;
  document.getElementById('q-title').textContent = q.title;
  document.getElementById('q-desc').textContent = q.description;

  const codeArea = document.getElementById('current-code-answer');
  codeArea.value = userAnswers[q.id] || '';

  // Button Visibility Controls
  document.getElementById('btn-prev').style.visibility = index === 0 ? 'hidden' : 'visible';
  if (index === activeQuestions.length - 1) {
    document.getElementById('btn-next').style.display = 'none';
    document.getElementById('btn-submit').style.display = 'inline-block';
  } else {
    document.getElementById('btn-next').style.display = 'inline-block';
    document.getElementById('btn-submit').style.display = 'none';
  }
}

function saveCurrentAnswer() {
  const q = activeQuestions[currentQuestionIndex];
  const codeArea = document.getElementById('current-code-answer');
  userAnswers[q.id] = codeArea.value;
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
  timerInterval = setInterval(() => {
    timeRemaining--;
    let mins = Math.floor(timeRemaining / 60);
    let secs = timeRemaining % 60;
    display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

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
    alert("Please write solutions for all 5 questions before submitting.");
    return;
  }

  submitAssessment('Manual Submission');
}

function submitAssessment(reason) {
  clearInterval(timerInterval);
  saveCurrentAnswer();
  
  const candidateData = {
    name: document.getElementById('cand-name').value,
    email: document.getElementById('cand-email').value,
    phone: document.getElementById('cand-phone').value,
    linkedin: document.getElementById('cand-linkedin').value,
    attemptNumber: localStorage.getItem('dhl_attempts'),
    status: reason,
    submittedAt: new Date().toISOString(),
    responses: activeQuestions.map(q => ({
      questionId: q.id,
      title: q.title,
      codeAnswer: userAnswers[q.id] || 'N/A'
    }))
  };

  console.log("Candidate Final Submission Payload:", candidateData);
  
  document.getElementById('submission-message').innerHTML = `
    Your test results have been securely recorded. The <strong>DHL HR Team</strong> will review your submission and contact you directly.
  `;
  showPage('page-3');
}
