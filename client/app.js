// Tab switching
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', (event) => {
    const tabName = btn.dataset.tab;
    switchTab(tabName, event);
  });
});

function switchTab(tabName, event) {
  const targetTab = document.getElementById(tabName);
  if (!targetTab) return;
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  targetTab.classList.add('active');
  const activeBtn = event?.currentTarget || event?.target || document.querySelector(`.tab-btn[data-tab="${tabName}"]`);
  if (activeBtn) activeBtn.classList.add('active');
  targetTab.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// BASIC CALCULATOR
document.getElementById('basicCalc').addEventListener('click', async () => {
  const expression = document.getElementById('basicExpr').value;
  const resEl = document.getElementById('basicResult');
  resEl.textContent = '';
  resEl.classList.remove('active');
  
  if (!expression) {
    resEl.textContent = 'Please enter an expression';
    resEl.classList.add('active');
    return;
  }

  try {
    const r = await fetch('/api/calc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'basic', expression })
    });
    const data = await r.json();
    if (!data.ok) {
      resEl.textContent = 'Error: ' + (data.error || 'Unknown');
    } else {
      resEl.innerHTML = `
        <div class="result-title">Result</div>
        <div class="result-value">${data.result}</div>
        <div class="steps">${data.steps.join('\n')}</div>
      `;
    }
    resEl.classList.add('active');
  } catch (err) {
    resEl.textContent = 'Request failed: ' + err;
    resEl.classList.add('active');
  }
});

// SCIENTIFIC CALCULATOR
const scientificOpsConfig = {
  trigonometric: [
    { name: 'func', label: 'Function', type: 'select', options: ['sin', 'cos', 'tan', 'asin', 'acos', 'atan'] },
    { name: 'angle', label: 'Angle', type: 'number' },
    { name: 'unit', label: 'Unit', type: 'select', options: ['deg', 'rad'] }
  ],
  logarithmic: [
    { name: 'func', label: 'Function', type: 'select', options: ['log', 'log10', 'log2', 'ln'] },
    { name: 'value', label: 'Value', type: 'number' }
  ],
  exponential: [
    { name: 'base', label: 'Base', type: 'number' },
    { name: 'exponent', label: 'Exponent', type: 'number' }
  ],
  root: [
    { name: 'value', label: 'Value', type: 'number' },
    { name: 'root', label: 'Root (default 2)', type: 'number' }
  ],
  factorial: [
    { name: 'n', label: 'Number', type: 'number' }
  ],
  percentage: [
    { name: 'type', label: 'Type', type: 'select', options: ['of', 'change', 'difference'] },
    { name: 'a', label: 'First Value', type: 'number' },
    { name: 'b', label: 'Second Value', type: 'number' }
  ]
};

document.getElementById('scientificOp').addEventListener('change', () => {
  const op = document.getElementById('scientificOp').value;
  const paramsEl = document.getElementById('scientificParams');
  paramsEl.innerHTML = '';
  scientificOpsConfig[op].forEach(param => {
    paramsEl.innerHTML += buildParamField(param);
  });
});

document.getElementById('scientificCalc').addEventListener('click', async () => {
  const operation = document.getElementById('scientificOp').value;
  const resEl = document.getElementById('scientificResult');
  const params = collectParams('scientificParams');
  resEl.textContent = '';
  resEl.classList.remove('active');

  try {
    const r = await fetch('/api/calc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'scientific', operation, params })
    });
    const data = await r.json();
    if (!data.ok) {
      resEl.textContent = 'Error: ' + (data.error || 'Unknown');
    } else {
      resEl.innerHTML = `
        <div class="result-title">Result</div>
        <div class="result-value">${data.result.toFixed(6)}</div>
        <div class="steps">${data.steps.join('\n')}</div>
      `;
    }
    resEl.classList.add('active');
  } catch (err) {
    resEl.textContent = 'Request failed: ' + err;
    resEl.classList.add('active');
  }
});

// Initialize scientific params on load
document.getElementById('scientificOp').dispatchEvent(new Event('change'));

// MATRIX CALCULATOR
const matrixOpsConfig = {
  add: [
    { name: 'a', label: 'Matrix A (JSON)', type: 'textarea' },
    { name: 'b', label: 'Matrix B (JSON)', type: 'textarea' }
  ],
  multiply: [
    { name: 'a', label: 'Matrix A (JSON)', type: 'textarea' },
    { name: 'b', label: 'Matrix B (JSON)', type: 'textarea' }
  ],
  determinant: [
    { name: 'matrix', label: 'Matrix (JSON)', type: 'textarea' }
  ],
  inverse: [
    { name: 'matrix', label: 'Matrix (JSON)', type: 'textarea' }
  ],
  transpose: [
    { name: 'matrix', label: 'Matrix (JSON)', type: 'textarea' }
  ]
};

document.getElementById('matrixOp').addEventListener('change', () => {
  const op = document.getElementById('matrixOp').value;
  const paramsEl = document.getElementById('matrixParams');
  paramsEl.innerHTML = '';
  matrixOpsConfig[op].forEach(param => {
    paramsEl.innerHTML += buildParamField(param);
  });
});

document.getElementById('matrixCalc').addEventListener('click', async () => {
  const operation = document.getElementById('matrixOp').value;
  const resEl = document.getElementById('matrixResult');
  resEl.textContent = '';
  resEl.classList.remove('active');

  try {
    const params = collectMatrixParams('matrixParams');
    const r = await fetch('/api/calc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'matrix', operation, params })
    });
    const data = await r.json();
    if (!data.ok) {
      resEl.textContent = 'Error: ' + (data.error || 'Unknown');
    } else {
      resEl.innerHTML = `
        <div class="result-title">Result</div>
        <div class="result-value">${JSON.stringify(data.result, null, 2)}</div>
        <div class="steps">${data.steps.join('\n')}</div>
      `;
    }
    resEl.classList.add('active');
  } catch (err) {
    resEl.textContent = 'Error: ' + err.message;
    resEl.classList.add('active');
  }
});

document.getElementById('matrixOp').dispatchEvent(new Event('change'));

// GEOMETRY CALCULATOR
const geoShapesConfig = {
  circle: [
    { name: 'prop', label: 'Property', type: 'select', options: ['area', 'circumference', 'radius_from_area'] },
    { name: 'value', label: 'Value (radius or area)', type: 'number' }
  ],
  triangle: [
    { name: 'prop', label: 'Property', type: 'select', options: ['area', 'perimeter', 'hypotenuse'] },
    { name: 'values', label: 'Values (space-separated)', type: 'text' }
  ],
  rectangle: [
    { name: 'prop', label: 'Property', type: 'select', options: ['area', 'perimeter', 'diagonal'] },
    { name: 'length', label: 'Length', type: 'number' },
    { name: 'width', label: 'Width', type: 'number' }
  ],
  sphere: [
    { name: 'prop', label: 'Property', type: 'select', options: ['volume', 'surface_area'] },
    { name: 'radius', label: 'Radius', type: 'number' }
  ],
  cylinder: [
    { name: 'prop', label: 'Property', type: 'select', options: ['volume', 'lateral_area', 'total_surface_area'] },
    { name: 'radius', label: 'Radius', type: 'number' },
    { name: 'height', label: 'Height', type: 'number' }
  ]
};

document.getElementById('geoShape').addEventListener('change', () => {
  const shape = document.getElementById('geoShape').value;
  const paramsEl = document.getElementById('geoParams');
  paramsEl.innerHTML = '';
  geoShapesConfig[shape].forEach(param => {
    paramsEl.innerHTML += buildParamField(param);
  });
});

document.getElementById('geoCalc').addEventListener('click', async () => {
  const shape = document.getElementById('geoShape').value;
  const resEl = document.getElementById('geoResult');
  resEl.textContent = '';
  resEl.classList.remove('active');

  try {
    const params = collectGeoParams('geoParams', shape);
    const r = await fetch('/api/calc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'geometry', operation: shape, params })
    });
    const data = await r.json();
    if (!data.ok) {
      resEl.textContent = 'Error: ' + (data.error || 'Unknown');
    } else {
      resEl.innerHTML = `
        <div class="result-title">Result</div>
        <div class="result-value">${data.result.toFixed(4)}</div>
        <div class="steps">${data.steps.join('\n')}</div>
      `;
    }
    resEl.classList.add('active');
  } catch (err) {
    resEl.textContent = 'Error: ' + err.message;
    resEl.classList.add('active');
  }
});

document.getElementById('geoShape').dispatchEvent(new Event('change'));

// STATISTICS CALCULATOR
const statsOpsConfig = {
  mean: [
    { name: 'values', label: 'Values (space-separated)', type: 'text' }
  ],
  median: [
    { name: 'values', label: 'Values (space-separated)', type: 'text' }
  ],
  mode: [
    { name: 'values', label: 'Values (space-separated)', type: 'text' }
  ],
  variance: [
    { name: 'values', label: 'Values (space-separated)', type: 'text' },
    { name: 'sample', label: 'Sample variance', type: 'checkbox' }
  ],
  standardDeviation: [
    { name: 'values', label: 'Values (space-separated)', type: 'text' },
    { name: 'sample', label: 'Sample std dev', type: 'checkbox' }
  ],
  quartiles: [
    { name: 'values', label: 'Values (space-separated)', type: 'text' }
  ],
  combination: [
    { name: 'n', label: 'n', type: 'number' },
    { name: 'r', label: 'r', type: 'number' }
  ],
  permutation: [
    { name: 'n', label: 'n', type: 'number' },
    { name: 'r', label: 'r', type: 'number' }
  ]
};

document.getElementById('statOp').addEventListener('change', () => {
  const op = document.getElementById('statOp').value;
  const paramsEl = document.getElementById('statParams');
  paramsEl.innerHTML = '';
  statsOpsConfig[op].forEach(param => {
    paramsEl.innerHTML += buildParamField(param);
  });
});

document.getElementById('statCalc').addEventListener('click', async () => {
  const operation = document.getElementById('statOp').value;
  const resEl = document.getElementById('statResult');
  resEl.textContent = '';
  resEl.classList.remove('active');

  try {
    const params = collectStatsParams('statParams', operation);
    const r = await fetch('/api/calc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'statistics', operation, params })
    });
    const data = await r.json();
    if (!data.ok) {
      resEl.textContent = 'Error: ' + (data.error || 'Unknown');
    } else {
      resEl.innerHTML = `
        <div class="result-title">Result</div>
        <div class="result-value">${typeof data.result === 'object' ? JSON.stringify(data.result, null, 2) : data.result.toFixed(4)}</div>
        <div class="steps">${data.steps.join('\n')}</div>
      `;
    }
    resEl.classList.add('active');
  } catch (err) {
    resEl.textContent = 'Error: ' + err.message;
    resEl.classList.add('active');
  }
});

document.getElementById('statOp').dispatchEvent(new Event('change'));

// FINANCE CALCULATOR
const financeOpsConfig = {
  simpleInterest: [
    { name: 'principal', label: 'Principal', type: 'number' },
    { name: 'rate', label: 'Annual Rate (%)', type: 'number' },
    { name: 'time', label: 'Time (years)', type: 'number' }
  ],
  compoundInterest: [
    { name: 'principal', label: 'Principal', type: 'number' },
    { name: 'rate', label: 'Annual Rate (%)', type: 'number' },
    { name: 'time', label: 'Time (years)', type: 'number' },
    { name: 'compounds', label: 'Compounding (1=annual, 12=monthly)', type: 'number' }
  ],
  futureValueAnnuity: [
    { name: 'payment', label: 'Payment per period', type: 'number' },
    { name: 'rate', label: 'Rate per period (%)', type: 'number' },
    { name: 'periods', label: 'Number of periods', type: 'number' }
  ],
  presentValueAnnuity: [
    { name: 'payment', label: 'Payment per period', type: 'number' },
    { name: 'rate', label: 'Rate per period (%)', type: 'number' },
    { name: 'periods', label: 'Number of periods', type: 'number' }
  ],
  loanPayment: [
    { name: 'principal', label: 'Loan amount', type: 'number' },
    { name: 'monthlyRate', label: 'Monthly rate (%)', type: 'number' },
    { name: 'months', label: 'Loan term (months)', type: 'number' }
  ],
  roi: [
    { name: 'initialInvestment', label: 'Initial Investment', type: 'number' },
    { name: 'finalValue', label: 'Final Value', type: 'number' }
  ],
  depreciation: [
    { name: 'cost', label: 'Original Cost', type: 'number' },
    { name: 'salvageValue', label: 'Salvage Value', type: 'number' },
    { name: 'life', label: 'Useful Life (years)', type: 'number' }
  ],
  breakEvenPoint: [
    { name: 'fixedCosts', label: 'Fixed Costs', type: 'number' },
    { name: 'variableCostPerUnit', label: 'Variable Cost per Unit', type: 'number' },
    { name: 'pricePerUnit', label: 'Selling Price per Unit', type: 'number' }
  ]
};

document.getElementById('financeOp').addEventListener('change', () => {
  const op = document.getElementById('financeOp').value;
  const paramsEl = document.getElementById('financeParams');
  paramsEl.innerHTML = '';
  financeOpsConfig[op].forEach(param => {
    paramsEl.innerHTML += buildParamField(param);
  });
});

document.getElementById('financeCalc').addEventListener('click', async () => {
  const operation = document.getElementById('financeOp').value;
  const resEl = document.getElementById('financeResult');
  resEl.textContent = '';
  resEl.classList.remove('active');

  try {
    const params = collectFinanceParams('financeParams', operation);
    const r = await fetch('/api/calc', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'finance', operation, params })
    });
    const data = await r.json();
    if (!data.ok) {
      resEl.textContent = 'Error: ' + (data.error || 'Unknown');
    } else {
      resEl.innerHTML = `
        <div class="result-title">Result</div>
        <div class="result-value">${data.result.toFixed(2)}</div>
        <div class="steps">${data.steps.join('\n')}</div>
      `;
    }
    resEl.classList.add('active');
  } catch (err) {
    resEl.textContent = 'Error: ' + err.message;
    resEl.classList.add('active');
  }
});

document.getElementById('financeOp').dispatchEvent(new Event('change'));

// FORMULA LIBRARY
document.getElementById('formulaSearch-btn').addEventListener('click', async () => {
  const q = document.getElementById('formulaSearch').value;
  const category = document.getElementById('formulaCategory').value;
  const resEl = document.getElementById('formulasResult');
  resEl.textContent = 'Searching...';
  resEl.classList.add('active');

  try {
    let url = '/api/formulas?limit=12';
    if (q) url += '&q=' + encodeURIComponent(q);
    if (category) url += '&category=' + encodeURIComponent(category);

    const r = await fetch(url);
    const data = await r.json();
    if (!data.ok || !data.results || data.results.length === 0) {
      resEl.innerHTML = '<p>No formulas found.</p>';
    } else {
      resEl.innerHTML = '<div class="formula-result">' + 
        data.results.map(f => `
          <div class="formula-item" onclick="viewFormulaDetail('${f.id}')">
            <div class="formula-name">${f.name}</div>
            <div class="formula-category">${f.category}</div>
            <div class="formula-desc">${f.description}</div>
          </div>
        `).join('') + 
        '</div>';
    }
  } catch (err) {
    resEl.textContent = 'Error: ' + err.message;
  }
});

async function viewFormulaDetail(id) {
  try {
    const r = await fetch('/api/formulas/' + id);
    const data = await r.json();
    if (!data.ok) {
      alert('Error loading formula');
      return;
    }
    const f = data.formula;
    document.getElementById('formulaModalTitle').textContent = f.name;
    document.getElementById('formulaModalBody').innerHTML = `
      <p><strong>Category:</strong> ${f.category}</p>
      <p><strong>Formula:</strong> ${f.formula}</p>
      <p><strong>Description:</strong> ${f.description}</p>
      <p><strong>Variables:</strong> ${JSON.stringify(f.variables, null, 2)}</p>
      <p><strong>Derivation:</strong> ${f.derivation}</p>
      <p><strong>Examples:</strong> ${f.examples.map(e => `${e.problem} → ${e.solution}`).join('; ')}</p>
      <p><strong>Practical Uses:</strong> ${f.practicalUses.join(', ')}</p>
    `;
    document.getElementById('formulaModal').classList.add('active');
  } catch (err) {
    alert('Error: ' + err.message);
  }
}

function closeFormulaModal() {
  document.getElementById('formulaModal').classList.remove('active');
}

// HELPER FUNCTIONS
function buildParamField(param) {
  if (param.type === 'select') {
    return `
      <div class="form-group">
        <label>${param.label}:</label>
        <select id="param-${param.name}">
          ${param.options.map(o => `<option value="${o}">${o}</option>`).join('')}
        </select>
      </div>
    `;
  } else if (param.type === 'checkbox') {
    return `
      <div class="form-group">
        <label><input type="checkbox" id="param-${param.name}" /> ${param.label}</label>
      </div>
    `;
  } else if (param.type === 'textarea') {
    return `
      <div class="form-group">
        <label>${param.label}:</label>
        <textarea id="param-${param.name}" placeholder="e.g., [[1, 2], [3, 4]]"></textarea>
      </div>
    `;
  } else {
    return `
      <div class="form-group">
        <label>${param.label}:</label>
        <input type="number" id="param-${param.name}" step="any" />
      </div>
    `;
  }
}

function collectParams(containerId) {
  const params = {};
  document.querySelectorAll(`#${containerId} input, #${containerId} select`).forEach(el => {
    if (el.id.startsWith('param-')) {
      const name = el.id.replace('param-', '');
      params[name] = el.type === 'checkbox' ? el.checked : (isNaN(el.value) ? el.value : parseFloat(el.value));
    }
  });
  return params;
}

function collectMatrixParams(containerId) {
  const params = {};
  document.querySelectorAll(`#${containerId} textarea`).forEach(el => {
    if (el.id.startsWith('param-')) {
      const name = el.id.replace('param-', '');
      params[name] = JSON.parse(el.value);
    }
  });
  return params;
}

function collectGeoParams(containerId, shape) {
  const params = { prop: document.querySelector(`#${containerId} select`).value };
  document.querySelectorAll(`#${containerId} input[type="number"], #${containerId} input[type="text"]`).forEach(el => {
    if (el.id.startsWith('param-')) {
      const name = el.id.replace('param-', '');
      if (name === 'values') {
        params[name] = el.value.split(' ').map(Number);
      } else {
        params[name] = parseFloat(el.value);
      }
    }
  });
  return params;
}

function collectStatsParams(containerId, operation) {
  const params = {};
  document.querySelectorAll(`#${containerId} input, #${containerId} select`).forEach(el => {
    if (el.id.startsWith('param-')) {
      const name = el.id.replace('param-', '');
      if (name === 'values') {
        params[name] = el.value.split(' ').map(Number);
      } else if (el.type === 'checkbox') {
        params[name] = el.checked;
      } else {
        params[name] = isNaN(el.value) ? el.value : parseFloat(el.value);
      }
    }
  });
  return params;
}

function collectFinanceParams(containerId, operation) {
  const params = {};
  document.querySelectorAll(`#${containerId} input, #${containerId} select`).forEach(el => {
    if (el.id.startsWith('param-')) {
      const name = el.id.replace('param-', '');
      const val = parseFloat(el.value);
      // Convert percentages to decimals
      if ((name === 'rate' || name === 'monthlyRate') && !isNaN(val)) {
        params[name] = val / 100;
      } else {
        params[name] = val;
      }
    }
  });
  return params;
}

// ============ AI ASSISTANT ============
let aiCurrentMode = 'text'; // text, voice, ocr

document.getElementById('aiTextInput-btn').addEventListener('click', () => {
  aiCurrentMode = 'text';
  document.getElementById('aiTextSection').style.display = 'block';
  document.getElementById('aiVoiceSection').style.display = 'none';
  document.getElementById('aiOCRSection').style.display = 'none';
  document.getElementById('aiResult').classList.remove('active');
});

document.getElementById('aiVoiceInput-btn').addEventListener('click', () => {
  if (!voiceModule.isSupported()) {
    alert('Voice input is not supported in your browser');
    return;
  }
  aiCurrentMode = 'voice';
  document.getElementById('aiTextSection').style.display = 'none';
  document.getElementById('aiVoiceSection').style.display = 'block';
  document.getElementById('aiOCRSection').style.display = 'none';
  document.getElementById('aiResult').classList.remove('active');
});

document.getElementById('aiOCRInput-btn').addEventListener('click', () => {
  if (!ocrModule.isSupported) {
    alert('OCR requires camera/file upload support');
  }
  aiCurrentMode = 'ocr';
  document.getElementById('aiTextSection').style.display = 'none';
  document.getElementById('aiVoiceSection').style.display = 'none';
  document.getElementById('aiOCRSection').style.display = 'block';
  document.getElementById('aiResult').classList.remove('active');
});

// Text Input
document.getElementById('aiSolve-btn').addEventListener('click', async () => {
  const problem = document.getElementById('aiProblem').value;
  if (!problem.trim()) {
    alert('Please enter a problem');
    return;
  }
  await solveMathProblem(problem);
});

// Voice Input
let isVoiceListening = false;

document.getElementById('aiVoiceStart-btn').addEventListener('click', () => {
  isVoiceListening = true;
  document.getElementById('aiVoiceStart-btn').style.display = 'none';
  document.getElementById('aiVoiceStop-btn').style.display = 'block';
  document.getElementById('aiVoiceSolve-btn').style.display = 'none';
  document.getElementById('aiVoiceTranscript').value = '';
  
  voiceModule.startListening(
    (interim) => {
      document.getElementById('aiVoiceTranscript').value = voiceModule.getTranscript() + interim;
    },
    (final) => {
      document.getElementById('aiVoiceTranscript').value = final;
      isVoiceListening = false;
      document.getElementById('aiVoiceStart-btn').style.display = 'block';
      document.getElementById('aiVoiceStop-btn').style.display = 'none';
      if (final.trim()) {
        document.getElementById('aiVoiceSolve-btn').style.display = 'block';
      }
    }
  );
});

document.getElementById('aiVoiceStop-btn').addEventListener('click', () => {
  voiceModule.stopListening();
  isVoiceListening = false;
  document.getElementById('aiVoiceStart-btn').style.display = 'block';
  document.getElementById('aiVoiceStop-btn').style.display = 'none';
});

document.getElementById('aiVoiceSolve-btn').addEventListener('click', async () => {
  const problem = document.getElementById('aiVoiceTranscript').value;
  if (!problem.trim()) {
    alert('Please record a problem first');
    return;
  }
  await solveMathProblem(problem);
});

// OCR Input
document.getElementById('aiOCRProcess-btn').addEventListener('click', async () => {
  const fileInput = document.getElementById('aiOCRUpload');
  if (!fileInput.files.length) {
    alert('Please select an image file');
    return;
  }
  
  const file = fileInput.files[0];
  const result = await ocrModule.extractText(file);
  
  if (result.ok) {
    document.getElementById('aiOCRText').value = result.text;
    document.getElementById('aiOCRSolve-btn').style.display = 'block';
  } else {
    alert('OCR failed: ' + result.error);
  }
});

document.getElementById('aiOCRSolve-btn').addEventListener('click', async () => {
  const problem = document.getElementById('aiOCRText').value;
  if (!problem.trim()) {
    alert('Please extract text from image first');
    return;
  }
  await solveMathProblem(problem);
});

// Solve math problem
async function solveMathProblem(problem) {
  const resultEl = document.getElementById('aiResult');
  document.getElementById('aiSolutionText').textContent = 'Loading...';
  resultEl.classList.add('active');
  
  try {
    const r = await fetch('/api/ai/solve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problem })
    });
    const data = await r.json();
    
    if (!data.ok) {
      document.getElementById('aiSolutionText').textContent = 'Error: ' + (data.error || 'Unknown');
    } else {
      document.getElementById('aiSolutionText').innerHTML = `
        <strong>Problem:</strong> ${problem}<br><br>
        <strong>Solution:</strong><br>
        ${data.solution || data.result}
      `;
      
      if (data.steps) {
        document.getElementById('aiSteps').innerHTML = `
          <strong>Steps:</strong><br>
          ${Array.isArray(data.steps) ? data.steps.join('<br>') : data.steps}
        `;
      }
      
      if (data.concepts && data.concepts.length) {
        document.getElementById('aiConceptsList').innerHTML = data.concepts
          .map(c => `<div>• ${c}</div>`)
          .join('');
      }
    }
  } catch (err) {
    document.getElementById('aiSolutionText').textContent = 'Request failed: ' + err;
  }
}

// ============ LEARNING MODULES ============
async function loadLearningModules() {
  try {
    const r = await fetch('/api/learning');
    const data = await r.json();
    
    if (data.ok) {
      // Load categories
      const catSelect = document.getElementById('learningCategoryFilter');
      const cats = new Set(data.modules.map(m => m.category));
      cats.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        catSelect.appendChild(opt);
      });
      
      // Display modules
      displayLearningModules(data.modules);
    }
  } catch (err) {
    console.error('Failed to load modules:', err);
  }
}

function displayLearningModules(modules) {
  const listEl = document.getElementById('learningModulesList');
  listEl.innerHTML = '';
  
  modules.forEach(mod => {
    const card = document.createElement('div');
    card.style.cssText = 'padding: 1rem; background: rgba(74, 158, 255, 0.05); border: 1px solid rgba(74, 158, 255, 0.2); border-radius: 8px; cursor: pointer; transition: all 0.3s ease;';
    card.innerHTML = `
      <div style="font-weight: 600; color: #4a9eff; margin-bottom: 0.3rem;">${mod.title}</div>
      <div style="font-size: 0.85rem; color: #b0c4de; margin-bottom: 0.5rem;">${mod.category} • ${mod.level}</div>
      <div style="font-size: 0.9rem; color: #b0c4de;">${mod.duration} min</div>
    `;
    card.addEventListener('click', () => viewLearningModule(mod.id));
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-2px)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
    listEl.appendChild(card);
  });
}

async function viewLearningModule(id) {
  try {
    const r = await fetch(`/api/learning/${id}`);
    const data = await r.json();
    
    if (data.ok) {
      const module = data.module;
      const detailEl = document.getElementById('learningDetail');
      let content = `
        <div class="result-title">${module.title}</div>
        <div style="color: #b0c4de; margin: 0.5rem 0; font-size: 0.9rem;">${module.description}</div>
      `;
      
      if (module.content && module.content.sections) {
        module.content.sections.forEach(section => {
          content += `
            <div style="margin-top: 1rem; padding: 0.5rem; background: rgba(123, 104, 238, 0.05); border-left: 4px solid #7b68ee; border-radius: 4px;">
              <strong style="color: #7b68ee;">${section.title}</strong>
              <div style="margin-top: 0.5rem; font-size: 0.9rem; line-height: 1.6;">${section.content}</div>
              ${section.examples ? `<div style="margin-top: 0.5rem; padding: 0.5rem; background: rgba(74, 158, 255, 0.05); border-radius: 4px; font-family: monospace; font-size: 0.85rem;">${section.examples}</div>` : ''}
            </div>
          `;
        });
      }
      
      detailEl.innerHTML = content;
      detailEl.classList.add('active');
    }
  } catch (err) {
    console.error('Failed to load module:', err);
  }
}

document.getElementById('learningFilter-btn').addEventListener('click', async () => {
  const level = document.getElementById('learningLevelFilter').value;
  const category = document.getElementById('learningCategoryFilter').value;
  
  let url = '/api/learning?';
  if (level) url += `level=${level}&`;
  if (category) url += `category=${category}`;
  
  try {
    const r = await fetch(url.replace(/&$/, ''));
    const data = await r.json();
    if (data.ok) {
      displayLearningModules(data.modules);
    }
  } catch (err) {
    console.error('Filter failed:', err);
  }
});

// Load learning modules on page load
window.addEventListener('load', loadLearningModules);

// ============ QUIZZES ============
let currentQuiz = null;
let quizAnswers = {};

async function loadQuizzes() {
  try {
    const r = await fetch('/api/quizzes');
    const data = await r.json();
    
    if (data.ok) {
      displayQuizzes(data.quizzes);
    }
  } catch (err) {
    console.error('Failed to load quizzes:', err);
  }
}

function displayQuizzes(quizzes) {
  const listEl = document.getElementById('quizzesList');
  listEl.innerHTML = '';
  
  quizzes.forEach(quiz => {
    const card = document.createElement('div');
    card.style.cssText = 'padding: 1rem; background: rgba(123, 104, 238, 0.05); border: 1px solid rgba(123, 104, 238, 0.2); border-radius: 8px; cursor: pointer; transition: all 0.3s ease;';
    card.innerHTML = `
      <div style="font-weight: 600; color: #7b68ee; margin-bottom: 0.3rem;">${quiz.title}</div>
      <div style="font-size: 0.85rem; color: #b0c4de; margin-bottom: 0.5rem;">${quiz.difficulty} • ${quiz.questionCount} questions • ${quiz.timeLimit} min</div>
      <div style="font-size: 0.9rem; color: #b0c4de;">${quiz.description}</div>
    `;
    card.addEventListener('click', () => startQuiz(quiz.id));
    card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-2px)');
    card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
    listEl.appendChild(card);
  });
}

async function startQuiz(quizId) {
  try {
    const r = await fetch(`/api/quizzes/${quizId}`);
    const data = await r.json();
    
    if (data.ok) {
      currentQuiz = data.quiz;
      quizAnswers = {};
      displayQuizQuestions();
      document.getElementById('quizzesListView').style.display = 'none';
      document.getElementById('quizTakingView').style.display = 'block';
    }
  } catch (err) {
    console.error('Failed to load quiz:', err);
  }
}

function displayQuizQuestions() {
  const headerEl = document.getElementById('quizHeader');
  headerEl.innerHTML = `
    <div class="result-title">${currentQuiz.title}</div>
    <div style="font-size: 0.9rem; color: #b0c4de;">${currentQuiz.difficulty} • Time limit: ${currentQuiz.timeLimit} minutes</div>
  `;
  
  const questionsEl = document.getElementById('quizQuestions');
  questionsEl.innerHTML = '';
  
  currentQuiz.questions.forEach((q, index) => {
    const qDiv = document.createElement('div');
    qDiv.style.cssText = 'margin-bottom: 1.5rem; padding: 1rem; background: rgba(74, 158, 255, 0.05); border: 1px solid rgba(74, 158, 255, 0.2); border-radius: 8px;';
    
    let content = `
      <div style="font-weight: 600; color: #4a9eff; margin-bottom: 1rem;">Q${index + 1}: ${q.question}</div>
    `;
    
    if (q.type === 'multiple_choice') {
      content += `<div style="margin-top: 0.5rem;">`;
      q.options.forEach(opt => {
        content += `
          <label style="display: block; margin-bottom: 0.5rem; cursor: pointer;">
            <input type="radio" name="q${q.id}" value="${opt.id}" style="margin-right: 0.5rem;" 
              ${quizAnswers[q.id] === opt.id ? 'checked' : ''}>
            ${opt.text}
          </label>
        `;
      });
      content += `</div>`;
    } else {
      content += `
        <input type="text" id="ans${q.id}" value="${quizAnswers[q.id] || ''}" 
          placeholder="Your answer" style="width: 100%; margin-top: 0.5rem;" />
      `;
    }
    
    qDiv.innerHTML = content;
    questionsEl.appendChild(qDiv);
  });
  
  // Add event listeners
  currentQuiz.questions.forEach(q => {
    if (q.type === 'multiple_choice') {
      document.querySelectorAll(`input[name="q${q.id}"]`).forEach(inp => {
        inp.addEventListener('change', (e) => {
          quizAnswers[q.id] = e.target.value;
        });
      });
    }
  });
}

document.getElementById('quizSubmit-btn').addEventListener('click', async () => {
  // Collect answers
  currentQuiz.questions.forEach(q => {
    if (q.type === 'short_answer') {
      quizAnswers[q.id] = document.getElementById(`ans${q.id}`).value;
    }
  });
  
  // Submit to server
  try {
    const answers = currentQuiz.questions.map((q, i) => quizAnswers[q.id]);
    const r = await fetch(`/api/quizzes/${currentQuiz.id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ answers })
    });
    const data = await r.json();
    
    if (data.ok) {
      displayQuizResults(data);
    }
  } catch (err) {
    alert('Error submitting quiz: ' + err);
  }
});

function displayQuizResults(data) {
  const resultsEl = document.getElementById('quizResults');
  resultsEl.innerHTML = `
    <div class="result-title">Quiz Complete!</div>
    <div style="font-size: 1.3rem; color: #4a9eff; margin: 1rem 0;">
      Score: <strong>${data.score}%</strong> (${data.correctCount}/${data.totalCount})
    </div>
    <div style="color: ${data.passed ? '#00aa00' : '#ff6b6b'}; font-weight: 600; margin-bottom: 1rem;">
      ${data.passed ? '✓ PASSED' : '✗ FAILED'}
    </div>
  `;
  
  data.results.forEach((r, i) => {
    const rDiv = document.createElement('div');
    rDiv.style.cssText = `margin-bottom: 1rem; padding: 1rem; background: ${r.correct ? 'rgba(0, 170, 0, 0.05)' : 'rgba(255, 107, 107, 0.05)'}; border-left: 4px solid ${r.correct ? '#00aa00' : '#ff6b6b'}; border-radius: 4px;`;
    rDiv.innerHTML = `
      <div style="font-weight: 600; color: ${r.correct ? '#00aa00' : '#ff6b6b'};">
        Q${i + 1}: ${r.correct ? '✓ Correct' : '✗ Incorrect'}
      </div>
      <div style="margin-top: 0.5rem; font-size: 0.9rem; color: #b0c4de;">
        Your answer: <strong>${r.userAnswer}</strong>
        ${!r.correct && r.correctAnswer ? `<br>Correct answer: <strong>${r.correctAnswer}</strong>` : ''}
      </div>
      ${r.explanation ? `<div style="margin-top: 0.5rem; padding: 0.5rem; background: rgba(123, 104, 238, 0.1); border-radius: 4px; font-size: 0.9rem;">${r.explanation}</div>` : ''}
    `;
    resultsEl.appendChild(rDiv);
  });
  
  document.getElementById('quizTakingView').style.display = 'none';
  document.getElementById('quizResultsView').style.display = 'block';
}

document.getElementById('quizBack-btn').addEventListener('click', () => {
  document.getElementById('quizzesListView').style.display = 'block';
  document.getElementById('quizTakingView').style.display = 'none';
  currentQuiz = null;
  quizAnswers = {};
});

document.getElementById('quizReturnToList-btn').addEventListener('click', () => {
  document.getElementById('quizzesListView').style.display = 'block';
  document.getElementById('quizResultsView').style.display = 'none';
  currentQuiz = null;
  quizAnswers = {};
});

// Load quizzes on page load
document.addEventListener('DOMContentLoaded', loadQuizzes);

// Reveal on scroll using IntersectionObserver
function initRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.08 });

  // Reveal static elements like top-nav and hero
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Stagger reveal for formula items when their container appears
  const formulaContainer = document.getElementById('aiFormulasList');
  if (formulaContainer) {
    const fo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll('.formula-item');
          items.forEach((it, i) => setTimeout(() => it.classList.add('visible'), i * 80));
          fo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fo.observe(formulaContainer);
  }
}

function initTheme() {
  const btn = document.getElementById('themeToggleBtn');
  const saved = localStorage.getItem('theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  if (saved === 'light' || (!saved && prefersLight)) {
    document.body.classList.add('light-theme');
    if (btn) btn.textContent = '☀️';
  } else {
    document.body.classList.remove('light-theme');
    if (btn) btn.textContent = '🌙';
  }
  if (btn) {
    btn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      btn.textContent = isLight ? '☀️' : '🌙';
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initRevealAnimations();
  initTheme();
});

// ============ FORMULA SIMPLIFICATION FOR KIDS ============
function convertToSimpleFormula(latexFormula, formulaName) {
  // Dictionary of simple explanations for common formulas
  const simpleFormulas = {
    'Triangle Area': 'Area = (1/2) × Base × Height\n\n🎯 To find the size of a triangle, take half of the base times the height.',
    'Square and Rectangle Area': 'Area = Length × Width\n\n🎯 To find the size of a rectangle, multiply length by width.',
    'Trapezoid Area': 'Area = (1/2) × (Base 1 + Base 2) × Height\n\n🎯 Add the two bases, divide by 2, then multiply by height.',
    'Ellipse Area': 'Area = π × a × b\n\n🎯 Multiply π by both the long radius and short radius.',
    'Regular Polygon Area': 'Area = (1/2) × Apothem × Perimeter\n\n🎯 Half of apothem times the distance around the shape.',
    'Cube and Rectangular Prism Volume': 'Volume = Length × Width × Height\n\n🎯 Multiply all three measurements to find how much space inside.',
    'Sphere Volume': 'Volume = (4/3) × π × r³\n\n🎯 Multiply 4/3 by π by radius cubed.',
    'Cylinder Volume': 'Volume = π × r² × Height\n\n🎯 Multiply π by radius squared by the height.',
    'Cone Volume': 'Volume = (1/3) × π × r² × Height\n\n🎯 One-third of π times radius squared times height.',
    'Pyramid Volume': 'Volume = (1/3) × Base Area × Height\n\n🎯 One-third of the base area times the height.',
    'Pythagorean Theorem': 'a² + b² = c²\n\n🎯 Square both short sides and add them. The sum equals the long side squared.',
    'Circle Area and Circumference': 'Area = π × r², Circumference = 2 × π × r\n\n🎯 Area: π times radius squared. Circumference: 2 times π times radius.',
    'Triangle Sum of Angles': 'Angle 1 + Angle 2 + Angle 3 = 180°\n\n🎯 All three angles in any triangle always add up to 180 degrees.',
    'Distance Formula': 'Distance = √((x₂ - x₁)² + (y₂ - y₁)²)\n\n🎯 Find the distance between two points on a map.',
    'Midpoint Formula': 'Midpoint = ((x₁ + x₂)/2, (y₁ + y₂)/2)\n\n🎯 Find the middle point between two locations.',
    'Sine Rule': 'a/sin(A) = b/sin(B) = c/sin(C)\n\n🎯 The sides and angles of a triangle relate in a special way.',
    'Cosine Rule': 'c² = a² + b² - 2×a×b×cos(C)\n\n🎯 A way to find sides when the Pythagorean theorem doesn\'t work.',
    'Pythagorean Identity': 'sin²(θ) + cos²(θ) = 1\n\n🎯 A special relationship between sine and cosine.',
    'Double Angle Formulas': 'sin(2θ) = 2×sin(θ)×cos(θ), cos(2θ) = cos²(θ) - sin²(θ)\n\n🎯 Ways to find sine and cosine of double angles.',
    'Addition Formulas': 'sin(A ± B) = sin(A)×cos(B) ± cos(A)×sin(B)\n\n🎯 How to find sine of added or subtracted angles.',
    'Power Rule (Derivative)': 'Derivative of x^n = n × x^(n-1)\n\n🎯 A shortcut to find how fast something is changing.',
    'Power Rule (Integration)': 'Integral of x^n = x^(n+1)/(n+1) + C\n\n🎯 The opposite of a derivative.',
    'Product Rule': 'Derivative of f×g = f\'×g + f×g\'\n\n🎯 How to find the derivative of two things multiplied.',
    'Quotient Rule': 'Derivative of f/g = (f\'×g - f×g\')/g²\n\n🎯 How to find the derivative of one thing divided by another.',
    'Chain Rule': 'Derivative of f(g(x)) = f\'(g(x)) × g\'(x)\n\n🎯 How to find derivatives of complicated functions.',
    'Arithmetic Sequence': 'nth term = First term + (n-1) × Common difference\n\n🎯 Find any number in a pattern that increases by the same amount.',
    'Geometric Sequence': 'nth term = First term × Ratio^(n-1)\n\n🎯 Find any number in a pattern that multiplies by the same amount.',
    'Geometric Series Sum': 'Sum = First term × (1 - Ratio^n) / (1 - Ratio)\n\n🎯 Add up all numbers in a multiplying pattern.',
    'Normal Distribution': 'The bell curve shape of data\n\n🎯 Shows how data is spread out around the middle value.',
    'Standard Deviation': 'Standard Deviation = √(Sum of (value - average)² / count)\n\n🎯 Measures how spread out numbers are from the average.',
    'Kinetic Energy': 'KE = (1/2) × Mass × Velocity²\n\n🎯 Energy something has because it\'s moving.',
    "Ohm's Law": 'Voltage = Current × Resistance\n\n🎯 How voltage, current, and resistance relate in electricity.',
    'Compound Interest': 'Amount = Principal × (1 + Rate/Periods)^(Periods × Time)\n\n🎯 How money grows in a bank account over time.',
    'Simple Interest': 'Interest = Principal × Rate × Time\n\n🎯 Extra money earned on savings.',
    'Probability Rule': 'Probability = Favorable outcomes / Total outcomes\n\n🎯 The chance of something happening.',
    'Addition Rule': 'P(A or B) = P(A) + P(B) - P(A and B)\n\n🎯 Probability of one thing or another happening.',
    'Multiplication Rule': 'P(A and B) = P(A) × P(B given A)\n\n🎯 Probability of two things both happening.',
    'Combinations': 'Combinations = n! / (r! × (n-r)!)\n\n🎯 Ways to choose items when order doesn\'t matter.',
    'Permutations': 'Permutations = n! / (n-r)!\n\n🎯 Ways to arrange items when order matters.',
    'Product of Powers': 'a^m × a^n = a^(m+n)\n\n🎯 When multiplying powers with same base, add the exponents.',
    'Quotient of Powers': 'a^m ÷ a^n = a^(m-n)\n\n🎯 When dividing powers with same base, subtract the exponents.',
    'Power of a Power': '(a^m)^n = a^(m×n)\n\n🎯 When raising a power to a power, multiply the exponents.',
    'Product of Radicals': '√a × √b = √(ab)\n\n🎯 Multiply what\'s inside the square roots.',
    'Quotient of Radicals': '√a / √b = √(a/b)\n\n🎯 Divide what\'s inside the square roots.',
    'Rationalization': '1/√a = √a/a\n\n🎯 Remove the square root from the bottom.',
    'Logarithm Product Rule': 'log(mn) = log(m) + log(n)\n\n🎯 The log of a product equals the sum of logs.',
    'Logarithm Quotient Rule': 'log(m/n) = log(m) - log(n)\n\n🎯 The log of a fraction equals the difference of logs.',
    'Logarithm Power Rule': 'log(m^n) = n × log(m)\n\n🎯 The log of a power equals the exponent times the log.',
    'Change of Base Formula': 'log_b(a) = log_c(a) / log_c(b)\n\n🎯 Convert from one log base to another base.',
    'Binomial Theorem': '(a + b)^n = sum of all combinations\n\n🎯 Expand something squared or cubed or to any power.',
    'Complex Number Magnitude': '|a + bi| = √(a² + b²)\n\n🎯 Find the size/length of a complex number.',
    'Complex Number Multiplication': '(a + bi) × (c + di) = (ac - bd) + (ad + bc)i\n\n🎯 How to multiply complex numbers.',
    "De Moivre's Theorem": '[r(cos θ + i sin θ)]^n = r^n(cos(nθ) + i sin(nθ))\n\n🎯 Raise complex numbers to powers.',
    'Vector Magnitude': '|v| = √(x² + y² + z²)\n\n🎯 Find the length of a vector.',
    'Dot Product': 'a · b = |a| × |b| × cos(θ)\n\n🎯 Multiply two vectors to get a single number.',
    'Cross Product': 'a × b = |a| × |b| × sin(θ) × n\n\n🎯 Multiply two 3D vectors to get another vector.',
  };

  // Return simple explanation if we have it
  if (simpleFormulas[formulaName]) {
    return simpleFormulas[formulaName];
  }

  // Fallback: Try to convert LaTeX to simple text
  let simple = latexFormula
    .replace(/\\/g, '')
    .replace(/frac{/g, '(')
    .replace(/}{/g, '/')
    .replace(/}/g, ')')
    .replace(/\^/g, '^')
    .replace(/alpha/g, 'α')
    .replace(/beta/g, 'β')
    .replace(/theta/g, 'θ')
    .replace(/sqrt/g, '√')
    .replace(/pi/g, 'π');

  return simple || 'See the formula above';
}

// Render LaTeX to HTML using KaTeX if available, otherwise escape and show raw
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderLatex(latex, displayMode = false) {
  try {
    if (window.katex && typeof window.katex.renderToString === 'function') {
      return katex.renderToString(latex || '', { throwOnError: false, displayMode });
    }
  } catch (e) {
    console.warn('KaTeX render error:', e);
  }
  // Fallback: escaped preformatted text
  return `<pre style="white-space: pre-wrap; font-family: monospace; color: #7b68ee;">${escapeHTML(latex || '')}</pre>`;
}

// ============ AI FORMULA SEARCH (ChatGPT-Like) ============
document.getElementById('aiFormulaSearch-btn').addEventListener('click', async () => {
  const query = document.getElementById('aiFormulaQuery').value.trim();
  
  if (!query) {
    alert('Please enter a question or topic');
    return;
  }
  
  await searchFormulasWithAI(query);
});

// Allow Enter key to trigger search
document.getElementById('aiFormulaQuery').addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && e.ctrlKey) {
    document.getElementById('aiFormulaSearch-btn').click();
  }
});

async function searchFormulasWithAI(query) {
  const resultEl = document.getElementById('aiFormulaResult');
  const textEl = document.getElementById('aiFormulaSearchText');
  const listEl = document.getElementById('aiFormulasList');
  
  textEl.textContent = 'Searching for relevant formulas...';
  listEl.innerHTML = '';
  resultEl.classList.add('active');
  
  try {
    const response = await fetch('/api/ai/formulas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    
    const data = await response.json();
    
    if (!data.ok) {
      textEl.textContent = 'Error: ' + (data.error || 'Unknown error');
      return;
    }
    
    // Display topic and explanation
    textEl.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <div style="color: #4a9eff; font-weight: 600; margin-bottom: 0.5rem;">Topic: ${data.topic}</div>
        <div style="color: #b0c4de; line-height: 1.6; margin-bottom: 0.5rem;">${data.explanation}</div>
        ${data.usageGuide ? `<div style="color: #7b68ee; font-style: italic; margin-top: 0.5rem;">${data.usageGuide}</div>` : ''}
      </div>
    `;
    
    // Display formulas
    if (data.formulas && data.formulas.length > 0) {
      listEl.innerHTML = `<div style="color: #4a9eff; font-weight: 600; margin-bottom: 1rem;">Found ${data.formulaCount} Formula(s):</div>`;
      
      data.formulas.forEach(formula => {
        const formulaCard = document.createElement('div');
        formulaCard.style.cssText = `
          margin-bottom: 1rem;
          padding: 1rem;
          background: rgba(74, 158, 255, 0.05);
          border: 1px solid rgba(74, 158, 255, 0.2);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        `;
        
        const practicalUses = formula.practicalUses ? formula.practicalUses.join(', ') : 'General use';
        
        // Convert LaTeX formula to simple English for kids
        const simpleFormula = convertToSimpleFormula(formula.formula, formula.name);
        
        formulaCard.innerHTML = `
          <div class="formula-name">${formula.name}</div>
          <div style="background: rgba(123, 104, 238, 0.12); padding: 0.7rem; border-radius: 6px; margin-bottom: 0.5rem;">
            <div style="font-size: 0.82rem; color: #bcd0ee; margin-bottom: 0.25rem;">📝 Simple Explanation</div>
            <div style="font-size: 0.93rem; color: #e6eef8; line-height: 1.4; font-family: 'Segoe UI', sans-serif; font-weight: 500; white-space:pre-wrap;">
              ${simpleFormula}
            </div>
          </div>
          <div class="formula-desc">${formula.description}</div>
          <div class="katex-display">${renderLatex(formula.formula, true)}</div>
          <div class="formula-meta">
            <span>📁 ${formula.category}</span>
            <span>💡 ${practicalUses}</span>
          </div>
          <div class="formula-actions">
            <button class="formula-view-btn" type="button">View Formula</button>
          </div>
        `;
        
        formulaCard.addEventListener('mouseenter', () => {
          formulaCard.style.transform = 'translateY(-2px)';
          formulaCard.style.boxShadow = '0 6px 20px rgba(74, 158, 255, 0.2)';
        });
        
        formulaCard.addEventListener('mouseleave', () => {
          formulaCard.style.transform = 'translateY(0)';
          formulaCard.style.boxShadow = 'none';
        });
        
        // Add click to view details
        formulaCard.addEventListener('click', () => viewFormulaDetail(formula));
        
        listEl.appendChild(formulaCard);
      });
    } else {
      listEl.innerHTML = '<div style="color: #b0c4de; font-style: italic;">No formulas found for this query. Try different keywords.</div>';
    }
    
  } catch (err) {
    console.error('Formula search error:', err);
    textEl.textContent = 'Error searching formulas: ' + err.message;
  }
}

function viewFormulaDetail(formula) {
  // Create a detailed view modal
  const simpleFormula = convertToSimpleFormula(formula.formula, formula.name);
  
  let detailsHTML = `
    <div style="background: rgba(123, 104, 238, 0.1); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
      <div style="font-size: 1.2rem; color: #4a9eff; font-weight: 600; margin-bottom: 1rem;">${formula.name}</div>
      
      <div style="background: rgba(123, 104, 238, 0.2); padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem;">
        <div style="color: #4a9eff; font-weight: 600; margin-bottom: 0.5rem;">📝 Simple Explanation:</div>
        <div style="color: #e6eef8; font-size: 0.95rem; white-space: pre-wrap; line-height: 1.6; font-family: 'Segoe UI', sans-serif;">
          ${simpleFormula}
        </div>
      </div>

      <div style="background: rgba(123, 104, 238, 0.1); padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem;">
        <div style="color: #7b68ee; font-weight: 600; margin-bottom: 0.5rem;">📐 Official Formula:</div>
        <div style="text-align: center;">${renderLatex(formula.formula, true)}</div>
      </div>
      
      <div style="margin-bottom: 1rem;">
        <div style="color: #4a9eff; font-weight: 600; margin-bottom: 0.5rem;">📖 What is it:</div>
        <div style="color: #b0c4de;">${formula.description}</div>
      </div>
  `;
  
  // Variables
  if (formula.variables) {
    detailsHTML += `
      <div style="margin-bottom: 1rem;">
        <div style="color: #4a9eff; font-weight: 600; margin-bottom: 0.5rem;">Variables:</div>
        <div style="color: #b0c4de;">
    `;
    for (const [key, value] of Object.entries(formula.variables)) {
      detailsHTML += `<div style="margin-bottom: 0.3rem;"><strong>${key}</strong>: ${value}</div>`;
    }
    detailsHTML += `</div></div>`;
  }
  
  // Examples
  if (formula.examples && formula.examples.length > 0) {
    detailsHTML += `
      <div style="margin-bottom: 1rem;">
        <div style="color: #4a9eff; font-weight: 600; margin-bottom: 0.5rem;">Examples:</div>
    `;
    formula.examples.forEach(ex => {
      detailsHTML += `
        <div style="background: rgba(26, 42, 58, 0.5); padding: 0.5rem; border-radius: 4px; margin-bottom: 0.5rem; color: #b0c4de; font-size: 0.9rem;">
          <div><strong>Problem:</strong> ${ex.problem}</div>
          <div style="color: #7b68ee;"><strong>Solution:</strong> ${ex.solution}</div>
        </div>
      `;
    });
    detailsHTML += `</div>`;
  }
  
  // Practical Uses
  if (formula.practicalUses && formula.practicalUses.length > 0) {
    detailsHTML += `
      <div style="margin-bottom: 1rem;">
        <div style="color: #4a9eff; font-weight: 600; margin-bottom: 0.5rem;">Practical Applications:</div>
        <ul style="color: #b0c4de; margin-left: 1.5rem;">
    `;
    formula.practicalUses.forEach(use => {
      detailsHTML += `<li>${use}</li>`;
    });
    detailsHTML += `</ul></div>`;
  }
  
  // Derivation
  if (formula.derivation) {
    detailsHTML += `
      <div style="background: rgba(123, 104, 238, 0.05); padding: 0.75rem; border-left: 4px solid #7b68ee; border-radius: 4px;">
        <div style="color: #7b68ee; font-weight: 600; margin-bottom: 0.5rem;">How It's Derived:</div>
        <div style="color: #b0c4de; font-size: 0.9rem;">${formula.derivation}</div>
      </div>
    `;
  }
  
  detailsHTML += `</div>`;
  
  // Update the result element with detailed view
  const resultEl = document.getElementById('aiFormulaResult');
  resultEl.innerHTML = `
    <div class="result-title">${formula.name} - Detailed View</div>
    ${detailsHTML}
    <button id="aiFormulaBack-btn" style="background: linear-gradient(135deg, #4a9eff 0%, #7b68ee 100%); border: none; cursor: pointer; font-weight: 600; margin-top: 1rem; padding: 0.6rem 1.2rem; border-radius: 6px; color: #e6eef8;">← Back to Results</button>
  `;
  
  document.getElementById('aiFormulaBack-btn').addEventListener('click', () => {
    // Re-trigger the search to go back to list
    const query = document.getElementById('aiFormulaQuery').value;
    if (query) {
      searchFormulasWithAI(query);
    }
  });
}
