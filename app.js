// app.js
let currentSectionIndex = 0;
let userAnswers = {}; // { questionId: value (1 or 0) }

document.addEventListener('DOMContentLoaded', () => {
    // Verificar si hay fecha guardada, si no poner hoy
    const dateInput = document.getElementById('evaluationDate');
    if (!dateInput.value) {
        dateInput.valueAsDate = new Date();
    }
});

// --- LOGIN LOGIC ---
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const errorMsg = document.getElementById('loginError');

    try {
        const response = await fetch('login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass })
        });
        
        const data = await response.json();

        if (data.success) {
            document.getElementById('currentUser').textContent = user;
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('appContainer').style.display = 'block';
            initializeJsonData(); // Cargar preguntas
            showToast('Bienvenido al sistema ISO 39001', 'success');
        } else {
            errorMsg.textContent = data.message;
            errorMsg.style.display = 'block';
        }
    } catch (error) {
        errorMsg.textContent = "Error de conexión con el servidor.";
        errorMsg.style.display = 'block';
    }
});

const subsectionTitles = {
  "4.1": "4.1 Conocimiento de la organización y su contexto",
  "4.2": "4.2 Comprensión de las necesidades y expectativas de las partes interesadas",
  "4.3": "4.3 Determinación del alcance del SGSV (Actividades + Productos y/o Servicios + Limitaciones)",
  "4.4": "4.4 Sistema de gestión de la SV",
  "5.1": "5.1 Liderazgo y compromiso",
  "5.2": "5.2 Política de SV",
  "5.3": "5.3 Roles, responsabilidades y autoridades en la organización",
  "6.1": "6.1 Generalidades (Planificación)",
  "6.2": "6.2 Acciones para tratar riesgos y oportunidades",
  "6.3": "6.3 Factores de desempeño en SV",
  "6.4": "6.4 Objetivos de SV y planificación para lograrlos",
  "7.1": "7.1 Coordinación",
  "7.2": "7.2 Recursos",
  "7.3": "7.3 Competencia",
  "7.4": "7.4 Toma de conciencia",
  "7.5": "7.5 Comunicación",
  "7.6.1": "7.6.1 Información documentada",
  "7.6.2": "7.6.2 Creacion y actualización",
  "7.6.3": "7.6.3 Control de la información documentada",
  "8.1": "8.1 Planificación y control operacional",
  "8.2": "8.2 Preparación y respuesta a las emergencias",
  "9.1": "9.1 Seguimiento, medición, análisis y evaluación",
  "9.2": "9.2 Investigación de accidentes de tráfico y otros incidentes de tráfico",
  "9.3": "9.3 Auditoría interna",
  "9.4": "9.4 Revisión por la dirección",
  "10.1": "10.1 No conformidades y acciones correctivas",
  "10.2": "10.2 Mejora continua"
};

function logout() {
    location.reload();
}

// --- INITIALIZATION ---
function initializeJsonData() {
    renderNav();
    renderSections();
    updateTotalCount();
    showSection(0);
}

function updateTotalCount() {
    let total = 0;
    evaluationData.forEach(section => {
        total += section.questions.length;
    });
    document.getElementById('totalCount').textContent = total;
}

// --- RENDER FUNCTIONS ---
function renderNav() {
    const navContainer = document.getElementById('sectionNav');
    navContainer.innerHTML = '';
    
    evaluationData.forEach((section, index) => {
        const btn = document.createElement('button');
        btn.className = `nav-btn ${index === 0 ? 'active' : ''}`;
        btn.onclick = () => showSection(index);
        btn.innerHTML = `<i class="fas ${section.icon}"></i> ${section.title} <span class="badge" id="badge-${section.id}">0/${section.questions.length}</span>`;
        navContainer.appendChild(btn);
    });
}

function renderSections() {
    const container = document.getElementById('evaluationSections');
    container.innerHTML = '';
 
    evaluationData.forEach((section, index) => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = `evaluation-section ${index === 0 ? 'active' : ''}`;
        sectionDiv.id = `section-${index}`;
 
        let html = `
            <div class="evaluation-header">
                <div>
                    <h2><i class="fas ${section.icon}"></i> ${section.title}</h2>
                    <p>${section.description}</p>
                </div>
                <div class="clause-badge">ISO 39001</div>
            </div>
            <div class="question-list">
        `;
 
        let lastSubsection = '';
        section.questions.forEach((q, qIndex) => {
            // Busca prefijos detallados como 7.6.1 o 9.1 primero; si no hay, toma el general (ej: 7.6)
            const match = q.text.match(/^(\d+\.\d+\.\d+|\d+\.\d+)/);
            let currentPrefix = match ? match[1] : null;
 
            if (currentPrefix && currentPrefix !== lastSubsection) {
                const subsectionTitle = subsectionTitles[currentPrefix] || currentPrefix;
                html += `<div class="subsection-title">${subsectionTitle}</div>`;
                lastSubsection = currentPrefix;
            }
 
            // Botón de respuesta inversa
            const yesLabel = q.isInverse ? "Sí (Mal)" : "Sí";
            const noLabel = q.isInverse ? "No (Bien)" : "No";
 
            html += `
                <div class="question-item" id="q-item-${q.id}">
                    <div class="question-content">
                        <div class="question-text">
                            <span class="question-number">${qIndex + 1}</span>
                            <p>${q.text}</p>
                        </div>
                        <div class="answer-buttons">
                            <button class="answer-btn" onclick="selectAnswer('${section.id}', '${q.id}', 1, ${q.isInverse || false}, this)">Sí</button>
                            <button class="answer-btn" onclick="selectAnswer('${section.id}', '${q.id}', 0, ${q.isInverse || false}, this)">No</button>
                        </div>
                    </div>
                </div>
            `;
        });
 
        html += `</div>
            <div class="section-score">
                <div class="score-circle" id="score-circle-${section.id}" style="--score: 0">
                    <span class="score-value" id="score-val-${section.id}">0%</span>
                </div>
                <div class="score-info">
                    <h4>Puntuación de Sección</h4>
                    <p>Basado en respuestas afirmativas válidas.</p>
                </div>
                <span class="score-badge needs-improvement" id="score-badge-${section.id}">Pendiente</span>
            </div>
        `;
 
        sectionDiv.innerHTML = html;
        container.appendChild(sectionDiv);
    });
}

// --- LOGIC HANDLERS ---
function selectAnswer(sectionId, questionId, value, isInverse, btnElement) {
    // Logic: 
    // Normal: Yes(1) = Good, No(0) = Bad.
    // Inverse: Yes(1) = Bad, No(0) = Good.
    
    let scoreValue = 0;
    if (isInverse) {
        scoreValue = value === 1 ? 0 : 1; 
    } else {
        scoreValue = value;
    }

    userAnswers[questionId] = scoreValue;

    // UI Update
    const parent = btnElement.parentNode;
    const buttons = parent.querySelectorAll('.answer-btn');
    buttons.forEach(b => {
        b.classList.remove('selected-yes', 'selected-no');
    });

    if (value === 1) btnElement.classList.add('selected-yes');
    else btnElement.classList.add('selected-no');

    updateSectionProgress(sectionId);
    updateTotalProgress();
}

function updateSectionProgress(sectionId) {
    const section = evaluationData.find(s => s.id === sectionId);
    let answered = 0;
    let scoreSum = 0;

    section.questions.forEach(q => {
        if (userAnswers.hasOwnProperty(q.id)) {
            answered++;
            scoreSum += userAnswers[q.id];
        }
    });

    // Update Badge
    const badge = document.getElementById(`badge-${sectionId}`);
    badge.textContent = `${answered}/${section.questions.length}`;
    if (answered === section.questions.length) {
        document.querySelector(`.nav-btn[onclick*="${evaluationData.indexOf(section)}"]`).classList.add('completed');
    }

    // Update Section Score Visuals
    const percentage = answered === 0 ? 0 : Math.round((scoreSum / section.questions.length) * 100); // Score based on total questions, assuming 0 for unanswered
    // Actually, let's show score relative to potential (100% if all correct so far? No, strict mode: unanswered is 0)
    
    // Strict calculation: Score / Total Questions
    const strictPercentage = Math.round((scoreSum / section.questions.length) * 100);

    const circle = document.getElementById(`score-circle-${sectionId}`);
    const valText = document.getElementById(`score-val-${sectionId}`);
    const statusBadge = document.getElementById(`score-badge-${sectionId}`);

    circle.style.setProperty('--score', strictPercentage);
    valText.textContent = `${strictPercentage}%`;

    // Status classes
    statusBadge.className = 'score-badge';
    if (strictPercentage >= 90) {
        statusBadge.classList.add('excellent');
        statusBadge.textContent = 'Excelente';
    } else if (strictPercentage >= 75) {
        statusBadge.classList.add('good');
        statusBadge.textContent = 'Bueno';
    } else if (strictPercentage >= 50) {
        statusBadge.classList.add('acceptable');
        statusBadge.textContent = 'Aceptable';
    } else {
        statusBadge.classList.add('needs-improvement');
        statusBadge.textContent = 'Crítico';
    }
}

function updateTotalProgress() {
    const totalQuestions = parseInt(document.getElementById('totalCount').textContent);
    const answeredCount = Object.keys(userAnswers).length;
    
    document.getElementById('answeredCount').textContent = answeredCount;
    const percent = Math.round((answeredCount / totalQuestions) * 100);
    document.getElementById('progressPercent').textContent = `${percent}%`;
    document.getElementById('progressBar').style.width = `${percent}%`;
}

// --- NAVIGATION ---
function showSection(index) {
    if (index < 0 || index >= evaluationData.length) return;
    
    document.querySelectorAll('.evaluation-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    
    document.getElementById(`section-${index}`).classList.add('active');
    document.querySelectorAll('.nav-btn')[index].classList.add('active');
    
    currentSectionIndex = index;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextSection() {
    showSection(currentSectionIndex + 1);
}

function previousSection() {
    showSection(currentSectionIndex - 1);
}

function saveProgress() {
    // Simulación de guardado local
    localStorage.setItem('iso_answers', JSON.stringify(userAnswers));
    showToast('Progreso guardado localmente', 'success');
}

// --- RESULTS & CHART ---
let radarChartInstance = null;

function calculateResults() {
    let totalScore = 0;
    let totalPossible = 0;
    const sectionScores = [];

    evaluationData.forEach(section => {
        let secScore = 0;
        section.questions.forEach(q => {
            secScore += userAnswers[q.id] || 0;
        });
        const percent = Math.round((secScore / section.questions.length) * 100);
        sectionScores.push(percent);
        
        totalScore += secScore;
        totalPossible += section.questions.length;
    });

    const globalAverage = Math.round((totalScore / totalPossible) * 100);
    return { sectionScores, globalAverage };
}

function showResults() {
    const { sectionScores, globalAverage } = calculateResults();
    
    document.getElementById('overallScoreValue').textContent = `${globalAverage}%`;
    const statusEl = document.getElementById('overallStatus');
    
    if(globalAverage >= 85) {
        statusEl.textContent = "Listo para Certificación";
        statusEl.style.backgroundColor = "rgba(0,200,150,0.3)";
    } else if (globalAverage >= 60) {
        statusEl.textContent = "Requiere Ajustes Menores";
        statusEl.style.backgroundColor = "rgba(255,184,0,0.3)";
    } else {
        statusEl.textContent = "No Apto / Crítico";
        statusEl.style.backgroundColor = "rgba(255,71,87,0.3)";
    }

    // Render List
    const listContainer = document.getElementById('sectionResults');
    listContainer.innerHTML = '';
    
    evaluationData.forEach((section, idx) => {
        const score = sectionScores[idx];
        let colorClass = 'needs-improvement';
        if(score >= 90) colorClass = 'excellent';
        else if(score >= 75) colorClass = 'good';
        else if(score >= 50) colorClass = 'acceptable';

        listContainer.innerHTML += `
            <div class="section-result-item">
                <i class="fas ${section.icon}"></i>
                <span class="section-result-name">${section.title}</span>
                <div class="section-result-bar">
                    <div class="section-result-fill ${colorClass}" style="width: ${score}%"></div>
                </div>
                <span class="section-result-percent">${score}%</span>
            </div>
        `;
    });

    // Chart
    renderChart(sectionScores);
    
    document.getElementById('resultsModal').classList.add('active');
}

function renderChart(dataValues) {
    const ctx = document.getElementById('radarChart').getContext('2d');
    
    if (radarChartInstance) {
        radarChartInstance.destroy();
    }

    radarChartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: evaluationData.map(s => s.title),
            datasets: [{
                label: 'Cumplimiento %',
                data: dataValues,
                backgroundColor: 'rgba(206, 0, 155, 0.2)',
                borderColor: '#ce009b',
                pointBackgroundColor: '#f000b5',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#ce009b',
                borderWidth: 2
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: 'rgba(255,255,255,0.1)' },
                    grid: { color: 'rgba(255,255,255,0.1)' },
                    pointLabels: {
                        color: '#a0a0b0',
                        font: { size: 10, family: 'Outfit' }
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        color: 'rgba(255,255,255,0.5)',
                        stepSize: 20
                    },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function closeModal() {
    document.getElementById('resultsModal').classList.remove('active');
}

// --- PDF GENERATION ---
async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const company = document.getElementById('companyName').value || "Empresa No Definida";
    const { sectionScores, globalAverage } = calculateResults();
    
    // Colors
    const primaryColor = [206, 0, 155]; // #ce009b
    const darkColor = [20, 20, 30];

    // Header
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text("Informe de Pre-Evaluación ISO 39001", 105, 18, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(company, 105, 28, { align: 'center' });
    
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 15, 50);
    doc.text(`Evaluador: ${document.getElementById('evaluatorName').value || 'N/A'}`, 15, 55);

    // Score Summary
    doc.setFontSize(14);
    doc.setTextColor(...primaryColor);
    doc.text("Resumen de Cumplimiento", 15, 70);
    
    doc.setDrawColor(200, 200, 200);
    doc.line(15, 72, 195, 72);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Puntuación Global: ${globalAverage}%`, 15, 82);

    // Insert Chart Image
    const canvas = document.getElementById('radarChart');
    const chartImg = canvas.toDataURL('image/png', 1.0);
    doc.addImage(chartImg, 'PNG', 55, 90, 100, 100);

    // Section Breakdown (Table)
    const tableData = evaluationData.map((section, i) => {
        return [section.title, `${sectionScores[i]}%`];
    });

    doc.autoTable({
        startY: 200,
        head: [['Sección', 'Cumplimiento']],
        body: tableData,
        theme: 'grid',
        headStyles: { fillColor: primaryColor },
        styles: { fontSize: 10 }
    });

    // PAGE 2: Recomendaciones
    doc.addPage();
    
    doc.setFontSize(16);
    doc.setTextColor(...primaryColor);
    doc.text("Plan de Acción y Recomendaciones", 15, 20);
    doc.line(15, 22, 195, 22);

    let currentY = 35;

    // General Rec
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text("Recomendación General:", 15, currentY);
    currentY += 7;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const splitGeneral = doc.splitTextToSize(generalRecommendation, 180);
    doc.text(splitGeneral, 15, currentY);
    currentY += splitGeneral.length * 5 + 10;

    // Specific Recommendations (Logic: Score < 60% is strict fail)
    // El prompt dice "si se tienen la mayoria de alguna seccion calificadas mal".
    // Interpretación: Score <= 50%
    
    const failedSections = [];
    evaluationData.forEach((section, idx) => {
        if (sectionScores[idx] <= 50) {
            failedSections.push(section);
        }
    });

    if (failedSections.length > 0) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(200, 50, 50);
        doc.text("Áreas Críticas Detectadas:", 15, currentY);
        currentY += 10;

        failedSections.forEach(sec => {
            // Check page break
            if (currentY > 270) { doc.addPage(); currentY = 20; }

            doc.setFontSize(11);
            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'bold');
            doc.text(`• ${sec.title}:`, 15, currentY);
            currentY += 6;
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            const splitRec = doc.splitTextToSize(sec.recommendation, 170);
            doc.text(splitRec, 20, currentY);
            currentY += splitRec.length * 5 + 8;
        });
    } else {
        doc.setFontSize(11);
        doc.setTextColor(0, 150, 0);
        doc.text("No se detectaron secciones críticas por debajo del umbral del 50%.", 15, currentY);
        currentY += 15;
    }

    // Disclaimer footer
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text("Propiedad de la Información: Este reporte es confidencial y propiedad exclusiva de Qualitas.", 105, 290, { align: 'center' });
    }

    doc.save(`PreCertificacion_ISO39001_${company.replace(/\s+/g, '_')}.pdf`);
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'fa-info-circle';
    if(type === 'success') icon = 'fa-check-circle';
    if(type === 'error') icon = 'fa-exclamation-circle';
    
    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100px)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}