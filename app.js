// app.js
let currentSectionIndex = 0;
let userAnswers = {}; // { questionId: value (1 or 0) }
let currentUsername = '';
let evaluationCompleted = false;
let activeRecordTimestamp = null; // timestamp of the record currently loaded; null = unsaved / new

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
            currentUsername = user;
            document.getElementById('currentUser').textContent = user;
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('appContainer').style.display = 'block';
            initializeJsonData(); // Cargar preguntas
            loadProgress();       // Restaurar progreso guardado
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

// --- REGISTER LOGIC ---
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const errorMsg   = document.getElementById('registerError');
    const successMsg = document.getElementById('registerSuccess');
    errorMsg.style.display = 'none';
    successMsg.style.display = 'none';

    const username = document.getElementById('regUsername').value.trim();
    const password = document.getElementById('regPassword').value;
    const regKey   = document.getElementById('regKey').value;

    try {
        const response = await fetch('register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, regKey })
        });
        const data = await response.json();
        if (data.success) {
            document.getElementById('registerForm').reset();
            successMsg.textContent = 'Usuario creado exitosamente. Ya puede iniciar sesión.';
            successMsg.style.display = 'block';
            setTimeout(() => switchAuthTab('login'), 2000);
        } else {
            errorMsg.textContent = data.message;
            errorMsg.style.display = 'block';
        }
    } catch (error) {
        errorMsg.textContent = 'Error de conexión con el servidor.';
        errorMsg.style.display = 'block';
    }
});

function switchAuthTab(tab) {
    const isLogin = tab === 'login';
    document.getElementById('loginForm').style.display    = isLogin ? '' : 'none';
    document.getElementById('registerForm').style.display = isLogin ? 'none' : '';
    document.getElementById('loginError').style.display   = 'none';
    document.getElementById('registerError').style.display  = 'none';
    document.getElementById('registerSuccess').style.display = 'none';
    document.getElementById('tabLogin').classList.toggle('active', isLogin);
    document.getElementById('tabRegister').classList.toggle('active', !isLogin);
}

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
    currentUsername = '';
    evaluationCompleted = false;
    userAnswers = {};
    location.reload();
}

function confirmResetProgress() {
    if (!confirm('¿Estás seguro de que deseas reiniciar toda la evaluación? Se perderán las respuestas actuales (no las guardadas en el servidor).')) return;
    userAnswers = {};
    evaluationCompleted = false;
    activeRecordTimestamp = null;
    // Clear all button selections
    document.querySelectorAll('.answer-btn').forEach(b => b.classList.remove('selected-yes', 'selected-no'));
    // Reset all section progress indicators
    evaluationData.forEach(section => updateSectionProgress(section.id));
    updateTotalProgress();
    updateSummary();
    showSection(0);
    showToast('Evaluación reiniciada', 'info');
}

// --- INITIALIZATION ---
function initializeJsonData() {
    renderNav();
    renderSections();
    updateTotalCount();
    showSection(0);
    updateSummary();
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
    
    // We store the "Score Value". 
    // If Normal: value passed is 1 for Yes. Score = 1.
    // If Inverse: value passed is 1 for Yes. Score = 0.
    
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
        const navBtns = document.querySelectorAll('.nav-btn');
        const idx = evaluationData.indexOf(section);
        if (navBtns[idx]) navBtns[idx].classList.add('completed');
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

async function saveProgress() {
    const companyName = document.getElementById('companyName').value || '';
    const evaluatorName = document.getElementById('evaluatorName').value || '';
    const companyContact = document.getElementById('companyContact').value || '';
    try {
        const response = await fetch('save_progress.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                companyName,
                evaluatorName,
                companyContact,
                answers: userAnswers,
                completed: evaluationCompleted,
                replaceTimestamp: activeRecordTimestamp  // null = new save, string = update in place
            })
        });
        const result = await response.json();
        if (result.success) {
            showToast(activeRecordTimestamp ? 'Progreso actualizado' : 'Progreso guardado', 'success');
        } else {
            showToast('Error al guardar: ' + (result.message || ''), 'error');
        }
    } catch (err) {
        showToast('Error de conexión al guardar progreso', 'error');
    }
}

async function loadProgress() {
    try {
        const response = await fetch('load_progress.php');
        const data = await response.json();
        if (!data.success || !data.found || !data.records || data.records.length === 0) {
            updateSummary();
            return;
        }
        // Auto-load the most recent record (index 0 = newest)
        applyRecord(data.records[0]);
        updateSavedListButton(data.records.length);
        const n = data.records.length;
        showToast(`Progreso restaurado (${n} guardado${n > 1 ? 's' : ''} disponible${n > 1 ? 's' : ''})`, 'info');
    } catch (err) {
        updateSummary();
    }
}

// Restores app state from a record object
function applyRecord(record) {
    activeRecordTimestamp = record.timestamp || null;
    document.getElementById('companyName').value = record.companyName || '';
    document.getElementById('evaluatorName').value = record.evaluatorName || '';
    document.getElementById('companyContact').value = record.companyContact || '';
    if (record.answers && typeof record.answers === 'object') {
        userAnswers = record.answers;
        document.querySelectorAll('.answer-btn').forEach(b => b.classList.remove('selected-yes', 'selected-no'));
        evaluationData.forEach(section => {
            section.questions.forEach(q => {
                if (!userAnswers.hasOwnProperty(q.id)) return;
                const qItem = document.getElementById('q-item-' + q.id);
                if (!qItem) return;
                const buttons = qItem.querySelectorAll('.answer-btn');
                const storedScore = userAnswers[q.id];
                const isInverse = q.isInverse || false;
                const yesWasClicked = isInverse ? storedScore === 0 : storedScore === 1;
                if (yesWasClicked) { if (buttons[0]) buttons[0].classList.add('selected-yes'); }
                else               { if (buttons[1]) buttons[1].classList.add('selected-no'); }
            });
            updateSectionProgress(section.id);
        });
        updateTotalProgress();
    }
    evaluationCompleted = !!record.completed;
    updateSummary();
}

// Opens the modal listing all saved records for the user
async function openSavedListModal() {
    const modal = document.getElementById('savedListModal');
    const listEl = document.getElementById('savedRecordsList');
    listEl.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 24px;"><i class="fas fa-spinner fa-spin"></i> Cargando...</p>';
    modal.classList.add('active');
    try {
        const response = await fetch('load_progress.php');
        const data = await response.json();
        if (!data.success || !data.found || !data.records || data.records.length === 0) {
            listEl.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 24px;">No hay registros guardados.</p>';
            return;
        }
        updateSavedListButton(data.records.length);
        window._savedRecords = data.records;
        const total = getTotalQuestionCount();
        listEl.innerHTML = `
            <div style="margin-bottom:16px;display:flex;justify-content:flex-end;">
                <button class="btn btn-secondary" onclick="newSaveFromList()" style="font-size:13px;padding:8px 16px;">
                    <i class="fas fa-plus"></i> Nuevo Guardado
                </button>
            </div>
        ` + data.records.map((rec, i) => {
            const answered = Object.keys(rec.answers || {}).length;
            const pct = total > 0 ? Math.round((answered / total) * 100) : 0;
            const ts = rec.timestamp || '(sin fecha)';
            const company = rec.companyName || '—';
            const badge = rec.completed
                ? `<span style="background:rgba(0,200,150,0.15);color:var(--success);padding:2px 10px;border-radius:20px;font-size:11px;font-weight:600;">Completado</span>`
                : `<span style="background:rgba(255,184,0,0.15);color:var(--warning);padding:2px 10px;border-radius:20px;font-size:11px;font-weight:600;">Pendiente</span>`;
            return `
                <div class="saved-record-item">
                    <div class="saved-record-info">
                        <div class="saved-record-company">${company}</div>
                        <div class="saved-record-meta">
                            <span><i class="fas fa-clock"></i> ${ts}</span>
                            <span><i class="fas fa-tasks"></i> ${answered}/${total} &nbsp;(${pct}%)</span>
                            ${badge}
                        </div>
                    </div>
                    <button class="btn btn-secondary" onclick="loadRecordFromList(${i})" style="padding:8px 18px;font-size:13px;flex-shrink:0;">
                        <i class="fas fa-upload"></i> Cargar
                    </button>
                </div>`;
        }).join('');
    } catch (err) {
        listEl.innerHTML = '<p style="color: var(--danger); text-align: center; padding: 24px;">Error al obtener los guardados.</p>';
    }
}

function loadRecordFromList(index) {
    const records = window._savedRecords;
    if (!records || !records[index]) return;
    applyRecord(records[index]);
    closeSavedListModal();
    showToast('Registro cargado correctamente', 'success');
}

function closeSavedListModal() {
    document.getElementById('savedListModal').classList.remove('active');
}

// Detaches from the current loaded record so the next save creates a new entry
function newSaveFromList() {
    activeRecordTimestamp = null;
    closeSavedListModal();
    showToast('El próximo guardado creará un registro nuevo', 'info');
}

function updateSavedListButton(count) {
    const btn = document.getElementById('savedListBtn');
    if (btn) btn.innerHTML = `<i class="fas fa-folder-open"></i> Ver Guardados (${count})`;
}

function getTotalQuestionCount() {
    return evaluationData.reduce((sum, s) => sum + s.questions.length, 0);
}

function updateSummary() {
    const answeredCount = Object.keys(userAnswers).length;
    const completedCount = evaluationCompleted ? 1 : 0;
    // Pending: has some answers but evaluation not yet completed
    const pendingCount = (answeredCount > 0 && !evaluationCompleted) ? 1 : 0;
    document.getElementById('summaryCompleted').textContent = completedCount;
    document.getElementById('summaryPending').textContent = pendingCount;
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
    // Mark evaluation as completed when user views results
    if (Object.keys(userAnswers).length === getTotalQuestionCount()) {
        evaluationCompleted = true;
        updateSummary();
    }

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

    // Compute clause-based scores (clauses 4–10) matching the PDF table
    const _clauseOrder  = ['4','5','6','7','8','9','10'];
    const _clauseChartLabels = [
        '4. Contexto de la organización',
        '5. Liderazgo',
        '6. Planificación',
        '7. Apoyo',
        '8. Operación',
        '9. Evaluación del desempeño',
        '10. Mejora'
    ];
    const _cMap = {}, _csMap = {};
    evaluationData.forEach(sec => {
        sec.questions.forEach(q => {
            const m = q.text.match(/^(\d+)\./);
            if (m) {
                const n = m[1];
                _cMap[n]  = (_cMap[n]  || 0) + 1;
                _csMap[n] = (_csMap[n] || 0) + (userAnswers[q.id] || 0);
            }
        });
    });
    const clauseScores = _clauseOrder.map(n => {
        const total = _cMap[n] || 0;
        return total > 0 ? Math.round((_csMap[n] || 0) / total * 100) : 0;
    });

    radarChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: _clauseChartLabels,
            datasets: [{
                label: 'Cumplimiento %',
                data: clauseScores,
                backgroundColor: 'rgba(0, 150, 174, 0.20)',
                borderColor: '#0096AE',
                pointBackgroundColor: '#0096AE',
                pointBorderColor: '#941B80',
                pointHoverBackgroundColor: '#941B80',
                pointHoverBorderColor: '#0096AE',
                pointRadius: 5,
                pointHoverRadius: 7,
                borderWidth: 2.5,
                fill: true,
                tension: 0
            }]
        },
        options: {
            maintainAspectRatio: false,
            layout: { padding: { top: 16, bottom: 55, left: 8, right: 8 } },
            scales: {
                x: {
                    grid: { color: 'rgba(0,0,0,0.07)' },
                    ticks: {
                        color: '#222222',
                        font: { size: 10, family: 'Outfit', weight: '500' },
                        maxRotation: 45,
                        minRotation: 30,
                        autoSkip: false
                    }
                },
                y: {
                    min: 0,
                    max: 100,
                    grid: { color: 'rgba(0,0,0,0.08)' },
                    ticks: {
                        color: '#222222',
                        font: { size: 10, family: 'Outfit' },
                        stepSize: 20,
                        callback: v => v + '%'
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        title: items => _clauseChartLabels[items[0].dataIndex] || '',
                        label: item => ` Cumplimiento: ${item.raw}%`
                    }
                }
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
    
    // Colors – Qualitas brand
    const primaryColor = [148, 28, 128];   // Morado Qualitas #941B80
    const aquaColor    = [0, 150, 173];    // Aqua Qualitas #0096AE

    // Load logo
    let logoData = null;
    try {
        const logoEl = new Image();
        logoEl.src = 'logo.png';
        await new Promise(resolve => { logoEl.onload = resolve; logoEl.onerror = resolve; });
        if (logoEl.complete && logoEl.naturalWidth > 0) {
            const lc = document.createElement('canvas');
            lc.width = logoEl.naturalWidth;
            lc.height = logoEl.naturalHeight;
            lc.getContext('2d').drawImage(logoEl, 0, 0);
            logoData = lc.toDataURL('image/png');
        }
    } catch(e) {}

    // Header
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, 210, 40, 'F');

    if (logoData) {
        doc.addImage(logoData, 'PNG', 5, 4, 28, 32);
    }

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(19);
    doc.setFont('helvetica', 'bold');
    doc.text("Informe de Pre-Evaluación ISO 39001", 125, 17, { align: 'center' });

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(company, 125, 28, { align: 'center' });

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

    // Puntuación Global con color según rango
    const _scoreBoxColor = globalAverage >= 90 ? [135, 206, 250] :
                           globalAverage >= 85 ? [144, 238, 144] :
                           globalAverage >= 80 ? [255, 255, 153] : [255, 182, 193];
    doc.setFillColor(..._scoreBoxColor);
    doc.roundedRect(15, 76, 100, 10, 2, 2, 'F');
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.text(`Puntuación Global: ${globalAverage}%`, 20, 83);

    // Insert Chart Image
    const canvas = document.getElementById('radarChart');
    const chartImg = canvas.toDataURL('image/png', 1.0);
    doc.addImage(chartImg, 'PNG', 25, 90, 160, 80);

    // ── Criteria / Scoring Reference Tables (page 1, after chart) ───────────
    const _clauseLabels = {
        '4':  '4. Contexto de la organización',
        '5':  '5. Liderazgo',
        '6':  '6. Planificación',
        '7':  '7. Apoyo',
        '8':  '8. Operación',
        '9':  '9. Evaluación del desempeño',
        '10': '10. Mejora'
    };
    const _clauseMap = {};
    const _clauseScoreMap = {};
    evaluationData.forEach(sec => {
        sec.questions.forEach(q => {
            const m = q.text.match(/^(\d+)\./);
            if (m) {
                _clauseMap[m[1]] = (_clauseMap[m[1]] || 0) + 1;
                if (userAnswers[q.id] === 1) {
                    _clauseScoreMap[m[1]] = (_clauseScoreMap[m[1]] || 0) + 1;
                }
            }
        });
    });
    const _clauseRows = Object.keys(_clauseLabels).map(n => {
        const total = _clauseMap[n] || 0;
        const result = _clauseScoreMap[n] || 0;
        const pct = total > 0 ? Math.round((result / total) * 100) : 0;
        return [_clauseLabels[n], result, `${pct}%`];
    });

    // Left table: Rangos de gestión (legend / criteria)
    doc.autoTable({
        startY: 174,
        margin: { left: 14, right: 120 },
        head: [['Rangos de gestión', 'Ponderación']],
        body: [
            ['Sobresaliente', '90% al 100%'],
            ['Bueno',          '85% al 89%'],
            ['Aceptable',      '80% al 84%'],
            ['Necesita mejorar', '< 80%']
        ],
        theme: 'grid',
        headStyles: { fillColor: primaryColor, fontSize: 8, halign: 'center' },
        styles: { fontSize: 8 },
        columnStyles: { 1: { halign: 'center' } },
        didParseCell: data => {
            if (data.section === 'body' && data.column.index === 0) {
                const bg = [
                    [135, 206, 250],
                    [144, 238, 144],
                    [255, 255, 153],
                    [255, 182, 193]
                ];
                data.cell.styles.fillColor = bg[data.row.index];
                data.cell.styles.textColor = [0, 0, 0];
            }
        }
    });

    // Right table: ISO clause — Resultado + % Cumplimiento (colored)
    doc.autoTable({
        startY: 174,
        margin: { left: 105, right: 10 },
        head: [
            [{ content: 'ISO 39001:2012 Sistema de gestión de seguridad vial', colSpan: 3, styles: { halign: 'center' } }],
            ['Cláusula', 'Resultado', '% Cumplimiento']
        ],
        body: _clauseRows,
        theme: 'grid',
        headStyles: { fillColor: primaryColor, fontSize: 8, halign: 'center' },
        styles: { fontSize: 8 },
        columnStyles: {
            0: { cellWidth: 58 },
            1: { cellWidth: 14, halign: 'center' },
            2: { cellWidth: 23, halign: 'center' }
        },
        didParseCell: data => {
            if (data.section === 'body' && data.column.index === 2) {
                const pct = parseInt(data.cell.raw);
                let bg;
                if (pct >= 90)      bg = [135, 206, 250];
                else if (pct >= 85) bg = [144, 238, 144];
                else if (pct >= 80) bg = [255, 255, 153];
                else                bg = [255, 182, 193];
                data.cell.styles.fillColor = bg;
                data.cell.styles.textColor = [0, 0, 0];
            }
        }
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