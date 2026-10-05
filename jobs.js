// DHL Careers & Requisitions Module - Luxury Enterprise Edition

const dhlJobsList = [
  { id: "2504841", title: "Product Engineer", status: "On Hold", client: "Baxter / Healthcare Systems", exp: "6+ Years", skills: "Product Lifecycle Management, Medical Devices, Embedded Hardware/Software, ISO 13485" },
  { id: "2506430", title: "Embedded Software Engineer", status: "On Hold", client: "Supply Chain Automation", exp: "5+ Years", skills: "Embedded C/C++, RTOS, Microcontrollers, Firmware Development, Firmware Testing" },
  { id: "2506443", title: "Infrastructure Solution Architect", status: "On Hold", client: "Enterprise Cloud Infrastructure", exp: "10+ Years", skills: "AWS, Azure Architecture, Enterprise Networking, VMware, Terraform, Disaster Recovery" },
  { id: "2506679", title: "IT Software Engineer 4", status: "On Hold", client: "Global Digital Solutions", exp: "7+ Years", skills: "Java/J2EE, Microservices, Spring Boot, REST APIs, Kafka, SQL/NoSQL" },
  { id: "2506684", title: "Embedded C Developer", status: "On Hold", client: "Industrial Logistics Tech", exp: "5+ Years", skills: "Embedded C, Linux Kernel Drivers, Microcontrollers, CAN Bus, Device Drivers" },
  { id: "2506284", title: "Production and Infrastructure Specialist", status: "On Hold", client: "Global Operations", exp: "6+ Years", skills: "CI/CD, Monitoring Tools, Linux Administration, System Engineering, Infrastructure Ops" },
  { id: "2506554", title: "Program Manager - Data and GIS Governance", status: "On Hold", client: "Supply Network Intelligence", exp: "8+ Years", skills: "GIS Data Systems, Data Governance, Spatial Analytics, Enterprise Program Management" },
  { id: "2506937", title: "DevOps Cloud Engineer (Networking Specialist)", status: "On Hold", client: "Enterprise Cloud Security", exp: "6+ Years", skills: "AWS Networking, VPCs, DirectConnect, Kubernetes, Terraform, BGP, Security Policies" },
  { id: "2506885", title: "Controls Engineer", status: "On Hold", client: "Automated Fulfillment Centers", exp: "5+ Years", skills: "PLC Programming, Siemens S7, Allen Bradley, SCADA, Robotics & Conveyor Controls" },
  { id: "2506948", title: "IAM Audit Analyst", status: "On Hold", client: "Global Security & Risk", exp: "4+ Years", skills: "Identity & Access Management, Okta, CyberArk, SOX Compliance, User Access Review" },
  { id: "2506940", title: "DevOps Cloud Engineer (Site Reliability Focus)", status: "On Hold", client: "Global Logistics Cloud", exp: "6+ Years", skills: "SRE Principles, Prometheus, Grafana, Docker, Kubernetes, AWS Services, Incident Management" },
  { id: "2506783", title: "Manufacturing Engineer VI", status: "On Hold", client: "Advanced Logistics Hardware", exp: "12+ Years", skills: "Six Sigma Black Belt, Lean Manufacturing, Tooling, Process Optimization, Assembly Lines" },
  { id: "2506836", title: "Software Engineer", status: "On Hold", client: "Core Digital Systems", exp: "3+ Years", skills: "Java, Python, Data Structures, OOPs, SQL Databases, Git Workflows" },
  { id: "2506987", title: "IT Security Auditor", status: "On Hold", client: "Enterprise Compliance Risk", exp: "5+ Years", skills: "ISO 27001, SOC2 Type II Audits, NIST Framework, Risk Assessment, Vulnerability Scanning" },
  { id: "5072599", title: "Software Engineer 555", status: "On Hold", client: "Digital Engineering Operations", exp: "5+ Years", skills: "Core Java, Multithreading, Enterprise Architecture, Microservices, JUnit" },
  { id: "5072559", title: "Software Engineer 455", status: "On Hold", client: "Digital Engineering Operations", exp: "4+ Years", skills: "Java, Spring, RESTful Web Services, Oracle DB, Agile Methodology" },
  { id: "5073419", title: "Senior PowerBuilder / .NET Developer", status: "On Hold", client: "Legacy Integration Core", exp: "8+ Years", skills: "PowerBuilder, C# .NET Core, SQL Server, Migration Frameworks, Web APIs" },
  { id: "5074619", title: "IT / QA Test Engineer", status: "On Hold", client: "Quality & Delivery Excellence", exp: "4+ Years", skills: "Selenium WebDriver, Java Automation, TestNG, API Testing (Postman), JIRA" },
  { id: "5074409", title: "Programmer Analyst", status: "On Hold", client: "Global Warehousing Systems", exp: "5+ Years", skills: "PL/SQL, Shell Scripting, Business Logic Engineering, Data Mapping, System Integration" },
  { id: "5074439", title: "Senior Java Developer", status: "On Hold", client: "DHL W2 Assessment Core", exp: "8+ Years", skills: "Java 17+, Spring Boot, Kafka, Distributed Systems, Microservices, PostgreSQL" },
  { id: "5075309", title: "Analyst / Developer", status: "On Hold", client: "Business Operations Engineering", exp: "4+ Years", skills: "Python, SQL, Tableau/PowerBI Analytics, Business Requirements Gathering" },
  { id: "5076489", title: "Database / Programmer", status: "On Hold", client: "Data Logistics Systems", exp: "5+ Years", skills: "Oracle PL/SQL, Performance Tuning, Stored Procedures, ETL Pipelines, Indexing" },
  { id: "5076429", title: "GenAI Data Scientist", status: "On Hold", client: "AI & Autonomous Logistics", exp: "5+ Years", skills: "LLMs, LangChain, PyTorch, RAG Pipelines, Python, Vector Databases, Fine-Tuning" },
  { id: "5059559", title: "DevOps Engineer", status: "On Hold", client: "Cloud Platform Infrastructure", exp: "5+ Years", skills: "Docker, Kubernetes, Jenkins, Terraform, AWS, Ansible, CI/CD Automations" },
  { id: "5076089", title: "Quality Engineer", status: "On Hold", client: "Hardware & Quality Systems", exp: "4+ Years", skills: "Root Cause Analysis, CAPA, Quality Assurance, ISO Standards, Process Audits" },
  { id: "5073899", title: "Application Security Architect", status: "On Hold", client: "Global Cybersecurity Division", exp: "10+ Years", skills: "OWASP Top 10, SAST/DAST, Threat Modeling, DevSecOps, AppSec Governance" },
  { id: "5077019", title: "Senior BA / Data Analyst - Payment", status: "On Hold", client: "Global Financial Systems", exp: "7+ Years", skills: "Payment Gateways, SWIFT, ISO 20022, SQL Data Analysis, Wire Transfers, Financial BA" },
  { id: "5077529", title: "IT Quality Engineer", status: "Active Open", client: "Enterprise Quality Division", exp: "5+ Years", skills: "Automation Testing, Cypress, Playwright, Performance Testing (JMeter), CI Pipelines" },
  { id: "5077579", title: "Embedded Software Engineer", status: "On Hold", client: "Robotics & Telematics", exp: "5+ Years", skills: "C/C++, Embedded Linux, SPI, I2C, UART, Firmware Debugging, Oscilloscopes" },
  { id: "5078149", title: "IT Software Engineer", status: "On Hold", client: "Supply Chain Engineering", exp: "4+ Years", skills: "Full Stack Java/Angular, Web Services, MySQL, Git, Docker" },
  { id: "5070429", title: "Lead UI/UX Developer", status: "Active Open", client: "Global Front-End Innovation", exp: "8+ Years", skills: "React.js, TypeScript, Next.js, Figma, Tailwind CSS, Accessibility (WCAG)" },
  { id: "5078609", title: "Solution Architect", status: "On Hold", client: "Enterprise Architecture Board", exp: "10+ Years", skills: "Microservices Architecture, TOGAF, Enterprise Security, Cloud Native Systems" },
  { id: "5078759", title: "Sr .NET Programmer Analyst", status: "On Hold", client: "Enterprise Software Division", exp: "7+ Years", skills: "C#, .NET 8, ASP.NET Core, Entity Framework, Azure Functions, SQL Server" },
  { id: "5079729", title: "Business Analyst", status: "On Hold", client: "Logistics Process Engineering", exp: "4+ Years", skills: "BRD/FRD Documentation, Agile/Scrum, JIRA, Confluence, Process Mapping" },
  { id: "BXTRJP00028119", title: "Electrical Engineer", status: "On Hold", client: "Baxter Medical / Robotics", exp: "6+ Years", skills: "PCB Design, Altium Designer, Analog/Digital Circuits, UL Compliance, Testing" },
  { id: "5083709", title: "Java Lead Engineer", status: "On Hold", client: "DHL Technical Lead Operations", exp: "9+ Years", skills: "Java 17, Spring Cloud, Team Leadership, System Design, Kafka, AWS" },
  { id: "50836910", title: "Sr. BSA Analyst", status: "On Hold", client: "Enterprise Business Solutions", exp: "7+ Years", skills: "Enterprise Systems Analysis, Data Warehousing, SQL, Stakeholder Management" },
  { id: "50842410", title: "Lead FS Data Engineer", status: "On Hold", client: "Financial Services Data Systems", exp: "8+ Years", skills: "PySpark, Hadoop, Snowflake, Data Lakes, Airflow, Financial Reporting" },
  { id: "5074241", title: "Business Integration Project Manager", status: "Active Open", client: "Global M&A and Integration", exp: "9+ Years", skills: "PMP Certification, Cross-functional Management, ERP Integrations, Vendor Management" }
];

function injectJobsModalHTML() {
  if (document.getElementById('jobs-modal')) return;

  const modalDiv = document.createElement('div');
  modalDiv.id = 'jobs-modal';
  modalDiv.style.cssText = 'display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.92); z-index:9999; backdrop-filter:blur(8px); overflow-y:auto; padding:30px 15px;';
  
  modalDiv.innerHTML = `
    <div style="max-width:1150px; margin:auto; background:#111; border:1px solid #D40511; border-radius:8px; padding:30px; color:#FFF; font-family:'Segoe UI', Arial, sans-serif; box-shadow:0 15px 40px rgba(212,5,17,0.4);">
      
      <!-- Modal Top Header -->
      <div style="display:flex; justify-space-between; align-items:center; border-bottom:2px solid #D40511; padding-bottom:18px; margin-bottom:22px;">
        <div>
          <h2 style="color:#FFCC00; margin:0; font-size:24px; font-weight:900; letter-spacing:1px; text-transform:uppercase;">DHL GLOBAL CAREERS & EXECUTIVE REQUISITIONS</h2>
          <p style="color:#AAA; margin:6px 0 0 0; font-size:13px;">Managed Talent Network | Exclusive Authorized Vendor Submissions</p>
        </div>
        <button onclick="closeJobsModal()" style="background:#D40511; color:#FFF; border:none; padding:10px 20px; font-weight:bold; cursor:pointer; border-radius:4px; font-size:13px;">✕ CLOSE PORTAL</button>
      </div>

      <!-- Job List Cards Container -->
      <div id="job-cards-container" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(340px, 1fr)); gap:18px; max-height:55vh; overflow-y:auto; padding-right:10px;">
      </div>

      <!-- Detailed JD View & Dynamic Application Form -->
      <div id="job-detail-view" style="display:none; margin-top:25px; background:#181818; border:1px solid #D40511; padding:28px; border-radius:6px; box-shadow:0 5px 20px rgba(0,0,0,0.8);">
        
        <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom:1px solid #333; padding-bottom:15px;">
          <div>
            <h3 id="jd-title" style="color:#FFCC00; margin:0 0 6px 0; font-size:22px; font-weight:800;">Job Title</h3>
            <p style="color:#888; font-size:13px; margin:0;">REQUISITION ID: <span id="jd-req-id" style="color:#FFF; font-weight:bold;">-</span> | CLIENT DIVISION: <span id="jd-client" style="color:#00FF66; font-weight:bold;">-</span></p>
          </div>
          <span id="jd-status-badge" style="background:#00FF66; color:#000; font-weight:bold; padding:4px 10px; font-size:11px; border-radius:3px;">ACTIVE REQUISITION</span>
        </div>
        
        <!-- Detailed JD Text Content -->
        <div style="margin:20px 0; padding-top:10px; color:#DDD; font-size:14px; line-height:1.7;" id="jd-body"></div>

        <!-- Luxury Application Form -->
        <form id="job-apply-form" onsubmit="event.preventDefault(); submitJobApplication();" style="margin-top:25px; border-top:2px solid #D40511; padding-top:22px;">
          <h4 style="color:#FFCC00; margin:0 0 18px 0; font-size:17px; letter-spacing:0.5px; text-transform:uppercase;">APPLY & SUBMIT CANDIDATE DOSSIER</h4>
          
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
            <div>
              <label style="font-size:12px; color:#AAA; display:block; margin-bottom:5px;">Full Name *</label>
              <input type="text" id="app-fullname" placeholder="John Doe" required style="width:100%; background:#222; border:1px solid #444; color:#FFF; padding:11px; border-radius:4px; box-sizing:border-box;">
            </div>

            <div>
              <label style="font-size:12px; color:#AAA; display:block; margin-bottom:5px;">Email Address *</label>
              <input type="email" id="app-email" placeholder="john.doe@domain.com" required style="width:100%; background:#222; border:1px solid #444; color:#FFF; padding:11px; border-radius:4px; box-sizing:border-box;">
            </div>

            <div>
              <label style="font-size:12px; color:#AAA; display:block; margin-bottom:5px;">Contact Number *</label>
              <input type="tel" id="app-phone" placeholder="+1 (555) 000-0000" required style="width:100%; background:#222; border:1px solid #444; color:#FFF; padding:11px; border-radius:4px; box-sizing:border-box;">
            </div>

            <div>
              <label style="font-size:12px; color:#AAA; display:block; margin-bottom:5px;">Work Authorization / Visa Status *</label>
              <input type="text" id="app-visa" placeholder="US Citizen / Green Card / H1B / CPT / OPT" required style="width:100%; background:#222; border:1px solid #444; color:#FFF; padding:11px; border-radius:4px; box-sizing:border-box;">
            </div>

            <!-- Submitting Agency & W2 Employer Selection -->
            <div style="grid-column:span 2; display:grid; grid-template-columns:1fr 1fr; gap:16px; background:#111; padding:15px; border:1px solid #333; border-radius:5px;">
              <div>
                <label style="font-size:12px; color:#FFCC00; display:block; margin-bottom:5px; font-weight:bold;">Submitting Agency</label>
                <input type="text" value="Truspary Consulting" readonly style="width:100%; background:#1a1a1a; border:1px solid #444; color:#00FF66; font-weight:bold; padding:11px; border-radius:4px; box-sizing:border-box;">
              </div>

              <div>
                <label style="font-size:12px; color:#FFCC00; display:block; margin-bottom:5px; font-weight:bold;">Employer W2 Entity *</label>
                <select id="app-w2-select" onchange="toggleCustomW2Input(this.value)" required style="width:100%; background:#222; border:1px solid #444; color:#FFF; padding:11px; border-radius:4px; box-sizing:border-box;">
                  <option value="">-- Select W2 Employer --</option>
                  <option value="Truspary Consulting Inc.">Truspary Consulting Inc. (Direct W2)</option>
                  <option value="Eternease Tech Services">Eternease Tech Services</option>
                  <option value="Baxter Healthcare Systems W2">Baxter Healthcare Systems (Partner W2)</option>
                  <option value="DHL Global Logistics W2 Entity">DHL Global Logistics (Direct Employer)</option>
                  <option value="OTHER">Other (Specify Custom Employer)</option>
                </select>
              </div>

              <!-- Custom W2 Input Field (Shown if 'OTHER' selected) -->
              <div id="custom-w2-container" style="display:none; grid-column:span 2; margin-top:5px;">
                <label style="font-size:12px; color:#FFCC00; display:block; margin-bottom:5px;">Specify Custom W2 Employer Name *</label>
                <input type="text" id="app-custom-w2" placeholder="Type candidate's exact W2 employer name..." style="width:100%; background:#222; border:1px solid #FFCC00; color:#FFF; padding:11px; border-radius:4px; box-sizing:border-box;">
              </div>
            </div>

            <!-- Resume File Upload -->
            <div style="grid-column:span 2;">
              <label style="font-size:12px; color:#AAA; display:block; margin-bottom:5px;">Upload Updated Candidate Resume (PDF / DOCX):</label>
              <input type="file" required style="background:#222; border:1px solid #444; color:#FFF; padding:10px; border-radius:4px; width:100%; box-sizing:border-box;">
            </div>
          </div>

          <button type="submit" style="margin-top:22px; width:100%; background:#D40511; color:#FFF; padding:14px; border:none; font-weight:800; font-size:15px; cursor:pointer; border-radius:4px; letter-spacing:1px; text-transform:uppercase;">
            SUBMIT DOSSIER VIA TRUSPARY CONSULTING
          </button>
        </form>
      </div>

    </div>
  `;
  document.body.appendChild(modalDiv);
}

function toggleCustomW2Input(val) {
  const container = document.getElementById('custom-w2-container');
  const customInput = document.getElementById('app-custom-w2');
  if (val === 'OTHER') {
    container.style.display = 'block';
    customInput.required = true;
  } else {
    container.style.display = 'none';
    customInput.required = false;
  }
}

function openJobsModal() {
  injectJobsModalHTML();
  const container = document.getElementById('job-cards-container');
  if (container) {
    container.innerHTML = dhlJobsList.map(job => `
      <div style="background:#1c1c1c; border:1px solid #333; padding:16px; border-radius:6px; transition:0.2s;" onmouseover="this.style.borderColor='#FFCC00'" onmouseout="this.style.borderColor='#333'">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <h4 style="color:#FFF; margin:0 0 8px 0; font-size:15px; font-weight:700;">${job.title}</h4>
          <span style="background:${job.status.includes('Active') ? '#00FF66' : '#FFCC00'}; color:#000; font-size:10px; font-weight:800; padding:3px 7px; border-radius:3px; font-family:sans-serif;">${job.status}</span>
        </div>
        <p style="color:#888; font-size:12px; margin:0 0 6px 0;">REQ ID: <strong style="color:#DDD;">${job.id}</strong></p>
        <p style="color:#AAA; font-size:12px; margin:0 0 14px 0;">Domain: ${job.client}</p>
        <button onclick="viewJobDetail('${job.id}')" style="background:transparent; border:1px solid #D40511; color:#D40511; padding:8px 12px; font-size:12px; font-weight:800; cursor:pointer; border-radius:4px; width:100%; text-transform:uppercase;">VIEW DETAILED JD & APPLY</button>
      </div>
    `).join('');
  }
  document.getElementById('jobs-modal').style.display = 'block';
}

function closeJobsModal() {
  const modal = document.getElementById('jobs-modal');
  if (modal) modal.style.display = 'none';
}

function viewJobDetail(reqId) {
  const job = dhlJobsList.find(j => j.id === reqId);
  if (!job) return;

  document.getElementById('jd-title').textContent = job.title;
  document.getElementById('jd-req-id').textContent = job.id;
  document.getElementById('jd-client').textContent = job.client;

  document.getElementById('jd-body').innerHTML = `
    <p style="margin-top:0;"><strong>Position Overview:</strong> DHL Global Supply Chain & Enterprise Technology Engineering Services is actively seeking a high-caliber <strong>${job.title}</strong> for key long-term initiatives under <strong>${job.client}</strong>.</p>
    
    <p style="color:#FFCC00; font-weight:bold; margin-bottom:6px;">Key Responsibilities & Scope:</p>
    <ul style="margin-top:0; padding-left:20px;">
      <li>Architect, build, and deploy enterprise-grade scalable solutions adhering to strict DHL global delivery guidelines.</li>
      <li>Perform rigorous system diagnostics, code reviews, performance tuning, and automated integration evaluations.</li>
      <li>Partner directly with cross-functional architecture, DevOps, security, and executive vendor management teams.</li>
      <li>Maintain enterprise compliance, robust security posture, and seamless data governance across environments.</li>
    </ul>

    <p style="color:#FFCC00; font-weight:bold; margin-bottom:6px;">Required Qualifications & Tech Stack:</p>
    <p style="margin-top:0;"><strong>Experience Level:</strong> ${job.exp}<br>
    <strong>Core Technical Competencies:</strong> <span style="color:#00FF66;">${job.skills}</span></p>
  `;

  document.getElementById('job-detail-view').style.display = 'block';
  document.getElementById('job-detail-view').scrollIntoView({ behavior: 'smooth' });
}

function submitJobApplication() {
  const name = document.getElementById('app-fullname').value;
  const selectW2 = document.getElementById('app-w2-select').value;
  const customW2 = document.getElementById('app-custom-w2').value;

  const finalW2Employer = (selectW2 === 'OTHER' && customW2.trim() !== '') ? customW2.trim() : selectW2;

  alert(`DOSSIER SUBMITTED SUCCESSFULLY!\n\nCandidate: ${name}\nSubmitting Agency: Truspary Consulting\nEmployer W2 Entity: ${finalW2Employer}\n\nYour application, visa credentials, and encrypted resume have been routed directly to DHL Talent Acquisition.`);
  
  closeJobsModal();
}

// Auto Inject listener
document.addEventListener('DOMContentLoaded', () => {
  injectJobsModalHTML();
});
