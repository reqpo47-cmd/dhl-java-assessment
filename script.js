let timeRemaining = 45 * 60; // 45 Minutes in seconds
let timerInterval = null;
let attempts = parseInt(localStorage.getItem('dhl_attempts') || '0');

// Block Copy, Paste, Cut, Right-Click
document.addEventListener('copy', (e) => e.preventDefault());
document.addEventListener('paste', (e) => e.preventDefault());
document.addEventListener('cut', (e) => e.preventDefault());
document.addEventListener('contextmenu', (e) => e.preventDefault());

function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

function goToInstructions() {
  const name = document.getElementById('cand-name').value.trim();
  const email = document.getElementById('cand-email').value.trim();
  const phone = document.getElementById('cand-phone').value.trim();

  if (!name || !email || !phone) {
    alert("Please fill in all candidate details.");
    return;
  }

  if (attempts >= 2) {
    alert("Maximum attempt limit reached (2 attempts allowed per candidate/system). Access denied.");
    return;
  }

  showPage('page-2');
}

function startAssessment() {
  attempts++;
  localStorage.setItem('dhl_attempts', attempts);

  showPage('page-3');
  renderQuestions();
  startTimer();
  activateTabProtection();
}

function renderQuestions() {
  const container = document.getElementById('questions-container');
  container.innerHTML = testQuestions.map(q => `
    <div class="question-block">
      <div class="question-title">${q.title}</div>
      <div class="question-desc">${q.description}</div>
      <textarea class="code-editor" id="ans-${q.id}" placeholder="Write your Java code and architectural solution here..." required></textarea>
    </div>
  `).join('');
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
      alert("Time is up! Submitting your answers automatically.");
      submitAssessment('Time Expired');
    }
  }, 1000);
}

// Security Enforcement: Anti Tab-Switching
function activateTabProtection() {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && document.getElementById('page-3').classList.contains('active')) {
      clearInterval(timerInterval);
      alert("SECURITY VIOLATION: You switched tabs or minimized the browser window. Your test is terminated and submitted.");
      submitAssessment('Security Breach (Tab Switch Detected)');
    }
  });
}

function submitAssessment(reason) {
  clearInterval(timerInterval);
  
  const candidateData = {
    name: document.getElementById('cand-name').value,
    email: document.getElementById('cand-email').value,
    phone: document.getElementById('cand-phone').value,
    status: reason,
    submittedAt: new Date().toISOString(),
    responses: testQuestions.map(q => ({
      questionId: q.id,
      title: q.title,
      codeAnswer: document.getElementById(`ans-${q.id}`) ? document.getElementById(`ans-${q.id}`).value : 'N/A'
    }))
  };

  console.log("Candidate Final Submission:", candidateData);
  
  document.getElementById('submission-message').innerHTML = `
    <strong>Status:</strong> Submitted (${reason})<br>
    Your test results are logged. The recruitment team will reach out to <strong>${candidateData.email}</strong>.
  `;
  showPage('page-4');
}
