// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBM-uBxL1z1STakKY9wYU3LpDb-T-Qs590",
  authDomain: "dhl-assessment.firebaseapp.com",
  projectId: "dhl-assessment",
  storageBucket: "dhl-assessment.firebasestorage.app",
  messagingSenderId: "980467522269",
  appId: "1:980467522269:web:bf98f94a792082b7e15934",
  measurementId: "G-Y512RRTRKX"
};

// Initialize Firebase & Firestore
if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = (typeof firebase !== 'undefined') ? firebase.firestore() : null;

let userClientIP = '';

// Browser Restriction Check (Only Google Chrome Allowed)
(function enforceChromeOnly() {
  const ua = navigator.userAgent;
  const isFirefox = ua.includes("Firefox");
  const isEdge = ua.includes("Edg");
  const isOpera = ua.includes("OPR") || ua.includes("Opera");
  const isSafari = ua.includes("Safari") && !ua.includes("Chrome");
  const isChrome = ua.includes("Chrome") && !isEdge && !isOpera;

  if (!isChrome || isFirefox || isEdge || isOpera || isSafari) {
    window.addEventListener('DOMContentLoaded', () => {
      document.body.innerHTML = `
        <div style="background: #000; min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: monospace;">
          <div style="text-align: center; color: #FFFFFF; padding: 40px; max-width: 600px; border: 2px solid #D40511; background: #111;">
            <h1 style="color: #D40511; font-size: 24px; margin-bottom: 15px;">UNSUPPORTED BROWSER DETECTED</h1>
            <p style="color: #FFCC00; font-size: 14px; line-height: 1.6;">
              ACCESS RESTRICTED: Mozilla Firefox, Microsoft Edge, Safari, and Opera are strictly prohibited for REQ-PO47 assessment.
            </p>
            <hr style="border-color: #333; margin: 20px 0;" />
            <p style="font-size: 13px; color: #AAA;">
              Please open this assessment link exclusively using <strong>Google Chrome</strong>.
            </p>
            <div style="margin-top: 25px; padding: 12px; background: #220000; border: 1px solid #D40511; color: #FF9999; font-size: 12px;">
              For any technical assistance, please contact your consultancy recruitment team.
            </div>
          </div>
        </div>
      `;
    });
  }
})();

// Real IP Fetching & Firebase Firestore Attempt Lockout Check
(async function initIPAndFirebaseAttemptTracker() {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const data = await res.json();
    userClientIP = data.ip ? data.ip.replace(/\./g, '_') : '';
  } catch (err) {
    console.error("IP Fetch Error:", err);
  }

  // Fallback check via localStorage
  let localAttempts = parseInt(localStorage.getItem('dhl_attempts') || '1', 10);

  if (db && userClientIP) {
    try {
      const docRef = db.collection('assessment_attempts').doc(userClientIP);
      const docSnap = await docRef.get();

      if (docSnap.exists) {
        const firestoreCount = docSnap.data().attempts || 0;
        if (firestoreCount >= 2) {
          showAccessBlockedScreen();
          return;
        }

        window.addEventListener('DOMContentLoaded', () => {
          const badge = document.getElementById('attempt-badge');
          if (badge) badge.textContent = `ATTEMPT: ${firestoreCount + 1}/2`;
        });
        return;
      }
    } catch (e) {
      console.error("Firestore Lockout Verification Error:", e);
    }
  }

  if (localAttempts > 2) {
    showAccessBlockedScreen();
    return;
  }

  window.addEventListener('DOMContentLoaded', () => {
    const badge = document.getElementById('attempt-badge');
    if (badge) {
      badge.textContent = `ATTEMPT: ${localAttempts}/2`;
    }
  });

  window.currentStorageKey = 'dhl_attempts';
})();

function showAccessBlockedScreen() {
  window.addEventListener('DOMContentLoaded', () => {
    document.body.innerHTML = `
      <div style="background: #000; min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: monospace;">
        <div style="text-align: center; color: #FFFFFF; padding: 40px; max-width: 600px; border: 2px solid #D40511; background: #111;">
          <h1 style="color: #D40511; font-size: 24px; margin-bottom: 15px;">ACCESS DENIED - LIMIT EXCEEDED</h1>
          <p style="color: #FFCC00; font-size: 14px; line-height: 1.6; font-weight: bold;">
            MAXIMUM ATTEMPTS EXCEEDED (2/2)
          </p>
          <hr style="border-color: #333; margin: 20px 0;" />
          <p style="font-size: 13px; color: #AAA;">
            You have completed all allowed attempts for the REQ-PO47 assessment gateway.
          </p>
          <div style="margin-top: 25px; padding: 12px; background: #220000; border: 1px solid #D40511; color: #FF9999; font-size: 12px;">
            Please contact your consultancy recruitment team.
          </div>
        </div>
      </div>
    `;
  });
}

// Enterprise Portal Initialization Animation Logic
window.addEventListener('DOMContentLoaded', () => {
  let attemptsCount = parseInt(localStorage.getItem('dhl_attempts') || '1', 10);
  if (attemptsCount > 2) return;

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

async function startAssessmentProcess() {
  if (db && userClientIP) {
    try {
      const docRef = db.collection('assessment_attempts').doc(userClientIP);
      const docSnap = await docRef.get();
      if (docSnap.exists && docSnap.data().attempts >= 2) {
        alert("Maximum attempts limit reached (2/2). Access blocked.");
        return;
      }
    } catch (e) {
      console.error("Firebase Pre-start Check Error:", e);
    }
  }

  let attempts = parseInt(localStorage.getItem('dhl_attempts') || '1', 10);

  if (attempts > 2) {
    alert("Maximum attempts limit reached (2/2). Access blocked.");
    return;
  }

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

  const badge = document.getElementById('attempt-badge');
  if (badge) {
    badge.textContent = `ATTEMPT: ${attempts}/2`;
  }

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

  // Next question jaane se pehle check karein ki current answer blank na ho
  if (direction > 0) {
    const q = activeQuestions[currentQuestionIndex];
    const currentAns = userAnswers[q.id] ? userAnswers[q.id].trim() : '';

    if (!currentAns) {
      alert(`PLEASE ANSWER QUESTION ${currentQuestionIndex + 1}!\n\nYou must provide a code response/solution before moving to the next question.`);
      return;
    }
  }

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
    const page2 = document.getElementById('page-2');
    if (document.hidden && page2 && page2.classList.contains('active')) {
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
  saveCurrentAnswer();

  // Time ya Security violation par direct submit karne dein
  const isViolation = reason && (reason.includes('Security') || reason.includes('Time'));

  if (!isViolation) {
    // Check karein ki saare questions answered hain ya nahi
    const unansweredQuestions = [];
    activeQuestions.forEach((q, idx) => {
      if (!userAnswers[q.id] || userAnswers[q.id].trim() === '') {
        unansweredQuestions.push(idx + 1);
      }
    });

    if (unansweredQuestions.length > 0) {
      alert(`INCOMPLETE ASSESSMENT!\n\nYou have unanswered questions: Question ${unansweredQuestions.join(', ')}.\n\nPlease complete all architectural coding solutions before submitting.`);
      return;
    }
  }

  clearInterval(timerInterval);
  showPage('page-3');
}

async function executeFinalSubmission() {
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

  // Answer Evaluation Logic
  const evalResult = (typeof evaluateCandidateResponses === "function") 
    ? evaluateCandidateResponses(activeQuestions, userAnswers)
    : { passed: false, score: 0, total: 5 };

  let currentAttempts = parseInt(localStorage.getItem('dhl_attempts') || '1', 10);

  const candidatePayload = {
    candidateName: name,
    email: email,
    phone: phone,
    consultingAgency: finalAgencyName,
    earliestJoining: joining,
    workAuthorization: workAuth,
    attemptNumber: currentAttempts.toString(),
    submittedAt: new Date().toISOString(),
    responses: activeQuestions.map(q => ({
      questionId: q.id,
      title: q.title,
      codeAnswer: userAnswers[q.id] || 'N/A'
    }))
  };

  console.log("DHL Enterprise Final Payload Transmitted:", candidatePayload);

  // Firestore Database Attempt Entry Record
  if (db && userClientIP) {
    try {
      const docRef = db.collection('assessment_attempts').doc(userClientIP);
      const docSnap = await docRef.get();
      let prevCount = docSnap.exists ? (docSnap.data().attempts || 0) : 0;
      await docRef.set({
        ip: userClientIP,
        attempts: prevCount + 1,
        lastSubmittedAt: new Date().toISOString(),
        candidateName: name,
        email: email
      }, { merge: true });
    } catch (e) {
      console.error("Firebase Database Submission Record Error:", e);
    }
  }

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
    { at: 100, text: 'EVALUATION COMPLETE!' }
  ];

  const interval = setInterval(() => {
    progress += 2;
    if (percentText) percentText.textContent = `${progress}%`;
    
    // Update SVG stroke circle dash offset
    const offset = circumference - (progress / 100) * circumference;
    if (stroke) {
      stroke.style.strokeDashoffset = offset;
      if (progress > 80) {
        stroke.style.stroke = evalResult.passed ? '#00FF66' : '#D40511';
      }
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

        // Increment attempt in localStorage after submission
        localStorage.setItem('dhl_attempts', (currentAttempts + 1).toString());

        // Page 4 UI Text updates depending on evaluation
        const ackTitle = document.querySelector('#page-4 h2, #page-4 h3');
        const ackStatus = document.getElementById('ack-status') || document.querySelector('#page-4 .status-text');

        if (evalResult.passed) {
          if (ackTitle) {
            ackTitle.textContent = "ASSESSMENT SUCCESSFULLY SUBMITTED!";
            ackTitle.style.color = "#00FF66";
          }
          if (ackStatus) {
            ackStatus.textContent = "Logged & Verified";
            ackStatus.style.color = "#00FF66";
          }
        } else {
          alert("ASSESSMENT UNSUCCESSFUL!\n\nYour technical responses did not meet the required passing criteria.\n\nBefore re-attempting, please contact your consultancy recruitment team.");

          if (ackTitle) {
            ackTitle.textContent = "ASSESSMENT EVALUATION FAILED!";
            ackTitle.style.color = "#D40511";
          }
          if (ackStatus) {
            ackStatus.textContent = "REJECTED / UNMET THRESHOLD";
            ackStatus.style.color = "#D40511";
          }
        }

        // Populate Page 4 Confirmation Receipt
        if (document.getElementById('ack-name')) document.getElementById('ack-name').textContent = name;
        if (document.getElementById('ack-agency')) document.getElementById('ack-agency').textContent = finalAgencyName;
        if (document.getElementById('ack-joining')) document.getElementById('ack-joining').textContent = joining;
        
        showPage('page-4');
      }, 500);
    }
  }, 40);
}
