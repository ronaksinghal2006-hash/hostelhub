// ---------- HELPERS ----------
function pad(n) { return String(n).padStart(2, '0'); }
function getToday() { const d = new Date(); return `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`; }
function getTodayISO() { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; }
function isoToDisplay(iso) { const p = (iso || '').split('-'); return p.length === 3 ? `${p[2]}-${p[1]}-${p[0]}` : iso; }
function fmt(n) { return '₹' + Number(n).toLocaleString('en-IN'); }
function esc(str) {
  return String(str).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function uid(prefix) { return prefix + Date.now().toString().slice(-6) + Math.floor(10 + Math.random() * 90); }

function loadKey(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (e) { return fallback; }
}

// ---------- DEFAULT DATA ----------
const defaultWardens = [
  { id: 'WARDEN-01', password: 'admin@123', name: 'Chief Warden' }
];

const defaultMessMenu = [
  { day: 'Monday', b: 'Aloo Paratha, Curd', l: 'Dal Makhani, Rice, Roti', s: 'Samosa, Tea', d: 'Mix Veg, Chana Dal, Roti' },
  { day: 'Tuesday', b: 'Poha, Tea', l: 'Kadhi Pakora, Rice', s: 'Biscuit, Coffee', d: 'Aloo Jeera, Dal Fry, Roti' },
  { day: 'Wednesday', b: 'Idli Sambhar', l: 'Rajma Chawal, Salad', s: 'Bread Pakora', d: 'Matar Paneer, Roti, Rice' },
  { day: 'Thursday', b: 'Bread Butter, Eggs', l: 'Chole Bhature', s: 'Maggi, Tea', d: 'Aloo Gobi, Dal Tadka' },
  { day: 'Friday', b: 'Stuffed Paratha', l: 'Mix Veg Pulao, Raita', s: 'Puff, Coffee', d: 'Kofta Curry, Roti, Rice' },
  { day: 'Saturday', b: 'Puri Sabzi', l: 'Dal Palak, Jeera Rice', s: 'Momos, Tea', d: 'Shahi Paneer, Naan' },
  { day: 'Sunday', b: 'Uttapam, Chutney', l: 'Special Thali (Biryani)', s: 'Cake, Cold Drink', d: 'Dal Makhani, Ice Cream' }
];

const defaultStudentDB = [
  {
    id: 'CS-2026-089', password: 'ronak@123', name: 'Ronak Singhal', room: '304-B', contact: '+91 9876543210',
    payments: [
      { id: 'RCT-2026-101', type: 'Semester Mess Fee', amount: 25000, date: '10-08-2026', txnId: 'TXN-20260810-101', status: 'Paid' },
      { id: 'RCT-2026-102', type: 'Hostel Caution Deposit', amount: 5000, date: '15-07-2026', txnId: 'TXN-20260715-102', status: 'Paid' },
      { id: 'RCT-2026-103', type: 'Semester Maintenance Fee', amount: 12500, date: '30-10-2026', txnId: 'Pending', status: 'Pending' }
    ]
  },
  {
    id: 'CS-2026-090', password: 'saurabh@123', name: 'Saurabh Kumar', room: '210-A', contact: '+91 9123456789',
    payments: [
      { id: 'RCT-2026-201', type: 'Semester Mess Fee', amount: 25000, date: '11-08-2026', txnId: 'TXN-20260811-201', status: 'Paid' },
      { id: 'RCT-2026-202', type: 'Semester Maintenance Fee', amount: 12500, date: '30-10-2026', txnId: 'Pending', status: 'Unpaid' }
    ]
  },
  {
    id: 'CS-2026-091', password: 'rohit@123', name: 'Rohit', room: '105-C', contact: '+91 9988776655',
    payments: [
      { id: 'RCT-2026-301', type: 'Semester Mess Fee', amount: 25000, date: '09-08-2026', txnId: 'TXN-20260809-301', status: 'Paid' },
      { id: 'RCT-2026-302', type: 'Semester Maintenance Fee', amount: 12500, date: '22-10-2026', txnId: 'TXN-20261022-302', status: 'Paid' }
    ]
  },
  {
    id: 'CS-2026-092', password: 'satyveer@123', name: 'Satyveer', room: '112-A', contact: '+91 9812345670',
    payments: [
      { id: 'RCT-2026-401', type: 'Semester Mess Fee', amount: 25000, date: '12-08-2026', txnId: 'TXN-20260812-401', status: 'Paid' },
      { id: 'RCT-2026-402', type: 'Semester Maintenance Fee', amount: 12500, date: '30-10-2026', txnId: 'Pending', status: 'Pending' }
    ]
  }
];

const defaultComplaints = [
  { id: 'TKN-101', studentId: 'CS-2026-089', studentName: 'Ronak Singhal', room: '304-B', category: 'Plumbing', urgency: 'Emergency', description: 'Bathroom tap leaking continuously.', status: 'In Progress', date: '21-10-2026' },
  { id: 'TKN-102', studentId: 'CS-2026-090', studentName: 'Saurabh Kumar', room: '210-A', category: 'Wi-Fi', urgency: 'Medium', description: 'LAN socket speed issue.', status: 'Pending', date: '22-10-2026' }
];

const defaultGatePasses = [
  { id: 'GP-401', studentId: 'CS-2026-089', studentName: 'Ronak Singhal', date: '22-10-2026', returnTime: '08:00 PM', reason: 'Library Outing', status: 'Pending' },
  { id: 'GP-402', studentId: 'CS-2026-091', studentName: 'Rohit', date: '22-10-2026', returnTime: '09:00 PM', reason: 'Medical Checkup', status: 'Approved' }
];

const defaultNotice = { text: 'Water maintenance scheduled for Block B tomorrow morning (8 AM - 11 AM).', date: '22-10-2026' };

// ---------- PERSISTENT STATE (localStorage) ----------
let messMenu = loadKey('hh3_messMenu', defaultMessMenu);
let studentDB = loadKey('hh3_studentDB', defaultStudentDB);
let complaints = loadKey('hh3_complaints', defaultComplaints);
let gatePasses = loadKey('hh3_gatePasses', defaultGatePasses);
let notice = loadKey('hh3_notice', defaultNotice);
let wardenDB = loadKey('hh3_wardens', defaultWardens);

function saveData() {
  try {
    localStorage.setItem('hh3_messMenu', JSON.stringify(messMenu));
    localStorage.setItem('hh3_studentDB', JSON.stringify(studentDB));
    localStorage.setItem('hh3_complaints', JSON.stringify(complaints));
    localStorage.setItem('hh3_gatePasses', JSON.stringify(gatePasses));
    localStorage.setItem('hh3_notice', JSON.stringify(notice));
    localStorage.setItem('hh3_wardens', JSON.stringify(wardenDB));
  } catch (e) { alert('Storage full or blocked. Data may not be saved.'); }
}

// Seed defaults the very first time so nothing is lost on refresh
saveData();

// ---------- SESSION (stays logged in on refresh, resets when tab is closed) ----------
let currentRole = null;          // 'student' | 'warden'
let currentStudentId = null;
let currentWardenId = null;

function getCurrentStudent() { return studentDB.find(s => s.id === currentStudentId); }

function saveSession() {
  try { sessionStorage.setItem('hh3_session', JSON.stringify({ role: currentRole, id: currentRole === 'warden' ? currentWardenId : currentStudentId })); } catch (e) {}
}
function clearSession() {
  try { sessionStorage.removeItem('hh3_session'); } catch (e) {}
}

// ---------- LOGIN / LOGOUT ----------
let loginRole = 'student';

function setLoginRole(role) {
  loginRole = role;
  document.getElementById('roleStudentBtn').classList.toggle('active', role === 'student');
  document.getElementById('roleWardenBtn').classList.toggle('active', role === 'warden');
  document.getElementById('loginIdLabel').textContent = role === 'student' ? 'Student ID' : 'Warden ID';
  document.getElementById('loginId').placeholder = role === 'student' ? 'e.g. CS-2026-089' : 'e.g. WARDEN-01';
  document.getElementById('demoStudent').classList.toggle('hidden', role !== 'student');
  document.getElementById('demoWarden').classList.toggle('hidden', role !== 'warden');
  document.getElementById('loginError').classList.add('hidden');
}

function showLoginError(msg) {
  const el = document.getElementById('loginError');
  el.textContent = msg;
  el.classList.remove('hidden');
}

function handleLogin(e) {
  e.preventDefault();
  const inputId = document.getElementById('loginId').value.trim().toLowerCase();
  const inputPass = document.getElementById('loginPass').value;

  if (loginRole === 'student') {
    const stud = studentDB.find(s => s.id.toLowerCase() === inputId && s.password === inputPass);
    if (!stud) { showLoginError('Invalid Student ID or password.'); return; }
    currentRole = 'student';
    currentStudentId = stud.id;
  } else {
    const w = wardenDB.find(a => a.id.toLowerCase() === inputId && a.password === inputPass);
    if (!w) { showLoginError('Invalid Warden ID or password.'); return; }
    currentRole = 'warden';
    currentStudentId = null;
    currentWardenId = w.id;
  }

  saveSession();
  document.getElementById('loginId').value = '';
  document.getElementById('loginPass').value = '';
  document.getElementById('loginError').classList.add('hidden');
  showApp();
}

function logout() {
  if (!confirm('Logout from current session?')) return;
  currentRole = null;
  currentStudentId = null;
  currentWardenId = null;
  clearSession();
  showLogin();
}

function showLogin() {
  document.getElementById('loginView').classList.remove('hidden');
  document.getElementById('studentView').classList.add('hidden');
  document.getElementById('adminView').classList.add('hidden');
  document.getElementById('navigationTabBar').classList.add('hidden');
  document.getElementById('headerActions').classList.add('hidden');
  setLoginRole('student');
}

function showApp() {
  document.getElementById('loginView').classList.add('hidden');
  document.getElementById('navigationTabBar').classList.remove('hidden');
  document.getElementById('headerActions').classList.remove('hidden');

  if (currentRole === 'student') {
    document.getElementById('adminView').classList.add('hidden');
    document.getElementById('studentView').classList.remove('hidden');
    document.querySelectorAll('.warden-tab').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.student-tab').forEach(el => el.classList.remove('hidden'));
    document.getElementById('currentRoleText').textContent = 'Student';
    loadCurrentStudentData();
    switchStudentTab('s-dashboard', document.querySelector('.student-tab'));
  } else {
    document.getElementById('studentView').classList.add('hidden');
    document.getElementById('adminView').classList.remove('hidden');
    document.querySelectorAll('.student-tab').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('.warden-tab').forEach(el => el.classList.remove('hidden'));
    const wd = wardenDB.find(w => w.id === currentWardenId);
    document.getElementById('currentRoleText').textContent = wd ? wd.name + ' (Warden)' : 'Warden Staff';
    renderAdminDashboard();
    switchWardenTab('w-dashboard', document.querySelector('.warden-tab'));
  }
}

// ---------- TABS ----------
function switchStudentTab(tabId, btn) {
  document.querySelectorAll('.student-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.student-content').forEach(c => c.classList.add('hidden'));
  if (btn) btn.classList.add('active');
  document.getElementById(tabId).classList.remove('hidden');

  if (tabId === 's-dashboard') loadCurrentStudentData();
  if (tabId === 's-payments') renderPaymentHistory();
  if (tabId === 's-gatepass') renderGatePasses();
  if (tabId === 's-mess') renderMessMenuTables();
}

function switchWardenTab(tabId, btn) {
  document.querySelectorAll('.warden-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.warden-content').forEach(c => c.classList.add('hidden'));
  if (btn) btn.classList.add('active');
  document.getElementById(tabId).classList.remove('hidden');

  if (tabId === 'w-dashboard' || tabId === 'w-gatepass') renderAdminDashboard();
  if (tabId === 'w-mess') { renderMessMenuTables(); fillMessForm(); }
  if (tabId === 'w-fee') searchStudentHistory();
}

// ---------- STUDENT DATA ----------
function loadCurrentStudentData() {
  const stud = getCurrentStudent();
  if (!stud) { currentRole = null; clearSession(); showLogin(); return; }
  const initials = stud.name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase();

  document.getElementById('sProfileAvatar').textContent = initials;
  document.getElementById('sProfileName').textContent = stud.name;
  document.getElementById('sProfileRoom').textContent = `Room ${stud.room}`;
  document.getElementById('sProfileId').textContent = `ID: ${stud.id}`;
  document.getElementById('noticeBoardContainer').innerHTML = `<strong>📢 [${esc(notice.date)}]:</strong> ${esc(notice.text)}`;

  updateStudentFeeStats();
  renderStudentTickets();
  renderGatePasses();
  document.getElementById('passDate').value = getTodayISO();
  document.getElementById('passDate').min = getTodayISO();
}

function updateStudentFeeStats() {
  const stud = getCurrentStudent();
  let total = 0, paid = 0;
  stud.payments.forEach(p => {
    total += p.amount;
    if (p.status === 'Paid') paid += p.amount;
  });
  const left = total - paid;

  document.getElementById('feeTotalText').textContent = fmt(total);
  document.getElementById('feePaidText').textContent = fmt(paid);
  document.getElementById('feeLeftText').textContent = fmt(left);

  const payBtn = document.getElementById('payFeeBtn');
  const nextDue = stud.payments.find(p => p.status !== 'Paid');
  document.getElementById('feeDueDate').textContent = nextDue ? `Due: ${nextDue.date}` : 'No dues';

  if (left === 0) {
    document.getElementById('feeBadge').className = 'badge-status badge-paid';
    document.getElementById('feeBadge').textContent = 'All Cleared';
    document.getElementById('feeAmountText').textContent = '₹0 (Paid)';
    document.getElementById('feeAmountText').style.color = 'var(--success)';
    payBtn.textContent = 'Paid';
    payBtn.disabled = true;
  } else {
    document.getElementById('feeBadge').className = 'badge-status badge-unpaid';
    document.getElementById('feeBadge').textContent = 'Dues Pending';
    document.getElementById('feeAmountText').textContent = fmt(left);
    document.getElementById('feeAmountText').style.color = 'var(--danger)';
    payBtn.textContent = 'Pay Fees Online';
    payBtn.disabled = false;
  }
}

// ---------- PAYMENTS ----------
function payHostelFee(paymentId) {
  const stud = getCurrentStudent();
  const pendingPay = paymentId ? stud.payments.find(p => p.id === paymentId) : stud.payments.find(p => p.status !== 'Paid');

  if (!pendingPay || pendingPay.status === 'Paid') {
    alert('All dues are already cleared!');
    return;
  }

  if (confirm(`Proceed online payment of ${fmt(pendingPay.amount)} for ${pendingPay.type}?`)) {
    pendingPay.status = 'Paid';
    pendingPay.date = getToday();
    pendingPay.txnId = 'TXN-' + getToday().split('-').reverse().join('') + '-' + Math.floor(100 + Math.random() * 900);

    saveData();
    updateStudentFeeStats();
    renderPaymentHistory();
    alert('Payment successful! Receipt generated.');
  }
}

function renderPaymentHistory() {
  const stud = getCurrentStudent();
  document.getElementById('paymentHistoryTable').innerHTML = stud.payments.map(p => `
    <tr>
      <td><strong>${esc(p.id)}</strong></td>
      <td>${esc(p.type)}</td>
      <td>${fmt(p.amount)}</td>
      <td>${esc(p.date)}</td>
      <td><span class="badge-status ${p.status === 'Paid' ? 'badge-paid' : 'badge-unpaid'}">${esc(p.status)}</span></td>
      <td>
        ${p.status === 'Paid'
          ? `<button onclick="printReceiptModal('${esc(stud.id)}', '${esc(p.id)}')" class="btn-pay" style="padding:4px 10px;">Receipt Slip</button>`
          : `<button onclick="payHostelFee('${esc(p.id)}')" class="btn-pay" style="padding:4px 10px; background:var(--primary);">Pay Dues</button>`}
      </td>
    </tr>
  `).join('');
}

function printReceiptModal(studentId, paymentId) {
  const stud = studentDB.find(s => s.id === studentId);
  const p = stud && stud.payments.find(x => x.id === paymentId);
  if (!p) return;
  document.getElementById('mStudentName').textContent = stud.name;
  document.getElementById('mStudentRoll').textContent = stud.id;
  document.getElementById('mFeeType').textContent = p.type;
  document.getElementById('mAmount').textContent = fmt(p.amount);
  document.getElementById('mDate').textContent = p.date;
  document.getElementById('mReceiptId').textContent = p.id;
  document.getElementById('mTxnId').textContent = p.txnId;
  document.getElementById('receiptModal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('receiptModal').classList.add('hidden');
}

// ---------- MAINTENANCE TICKETS ----------
function handleFormSubmit(e) {
  e.preventDefault();
  const stud = getCurrentStudent();

  complaints.unshift({
    id: uid('TKN-'),
    studentId: stud.id,
    studentName: stud.name,
    room: stud.room,
    category: document.getElementById('category').value,
    urgency: document.getElementById('urgency').value,
    description: document.getElementById('description').value.trim(),
    status: 'Pending',
    date: getToday()
  });

  saveData();
  document.getElementById('complaintForm').reset();
  renderStudentTickets();
  alert('Ticket submitted!');
}

function renderStudentTickets() {
  const stud = getCurrentStudent();
  if (!stud) return;
  const container = document.getElementById('studentComplaintList');
  const query = (document.getElementById('ticketSearch').value || '').toLowerCase();
  const tickets = complaints.filter(c => c.studentId === stud.id && (c.id.toLowerCase().includes(query) || c.description.toLowerCase().includes(query)));

  if (tickets.length === 0) {
    container.innerHTML = `<p style="font-size:0.8rem; color:var(--text-muted);">No maintenance tickets found.</p>`;
    return;
  }

  container.innerHTML = tickets.map(t => `
    <div class="ticket-card">
      <div>
        <strong style="font-size:0.85rem;">${esc(t.id)}</strong>
        <span class="urgency-badge urgency-${esc(t.urgency)}">${esc(t.urgency)}</span>
        <p style="font-size:0.80rem; color:var(--text-muted); margin-top:4px;">${esc(t.description)}</p>
      </div>
      <div><span class="status-badge status-${t.status.replace(/\s+/g, '')}">${esc(t.status)}</span></div>
    </div>
  `).join('');
}

// ---------- GATE PASS ----------
function handleGatePassSubmit(e) {
  e.preventDefault();
  const stud = getCurrentStudent();
  const t = document.getElementById('passTime').value;
  let timeText = t;
  if (t) {
    const [h, m] = t.split(':').map(Number);
    timeText = `${pad(h % 12 === 0 ? 12 : h % 12)}:${pad(m)} ${h >= 12 ? 'PM' : 'AM'}`;
  }

  gatePasses.unshift({
    id: uid('GP-'),
    studentId: stud.id,
    studentName: stud.name,
    date: isoToDisplay(document.getElementById('passDate').value) || getToday(),
    returnTime: timeText,
    reason: document.getElementById('passReason').value.trim(),
    status: 'Pending'
  });
  saveData();
  e.target.reset();
  document.getElementById('passDate').value = getTodayISO();
  renderGatePasses();
  alert('Gate Pass request submitted!');
}

function passBadgeClass(status) {
  return status === 'Approved' ? 'badge-paid' : (status === 'Rejected' ? 'badge-unpaid' : 'badge-pending');
}

function renderGatePasses() {
  const stud = getCurrentStudent();
  if (!stud) return;
  const list = gatePasses.filter(g => g.studentId === stud.id);

  if (list.length === 0) {
    document.getElementById('gatePassList').innerHTML = `<p style="font-size:0.8rem; color:var(--text-muted);">No gate passes requested yet.</p>`;
    return;
  }

  document.getElementById('gatePassList').innerHTML = list.map(g => `
    <div class="ticket-card">
      <div>
        <strong>${esc(g.id)}</strong> - <span style="font-size:0.80rem; color:var(--text-muted);">${esc(g.date)} (${esc(g.returnTime)})</span>
        <p style="font-size:0.80rem; margin-top:4px;">${esc(g.reason)}</p>
      </div>
      <div><span class="badge-status ${passBadgeClass(g.status)}">${esc(g.status)}</span></div>
    </div>
  `).join('');
}

// ---------- MESS MENU ----------
function renderMessMenuTables() {
  const studentTbody = document.getElementById('messMenuTableStudent');
  const wardenTbody = document.getElementById('messMenuTableWardenPreview');

  if (studentTbody) studentTbody.innerHTML = messMenu.map(m => `
    <tr><td><strong>${esc(m.day)}</strong></td><td>${esc(m.b)}</td><td>${esc(m.l)}</td><td>${esc(m.s)}</td><td>${esc(m.d)}</td></tr>
  `).join('');
  if (wardenTbody) wardenTbody.innerHTML = messMenu.map(m => `
    <tr><td><strong>${esc(m.day)}</strong></td><td>${esc(m.b)}</td><td>${esc(m.l)}</td><td>${esc(m.s)}</td><td>${esc(m.d)}</td></tr>
  `).join('');
}

function fillMessForm() {
  const day = document.getElementById('editDay').value;
  const m = messMenu.find(x => x.day === day);
  if (!m) return;
  const map = { editBreakfast: m.b, editLunch: m.l, editSnacks: m.s, editDinner: m.d };
  Object.keys(map).forEach(id => {
    const el = document.getElementById(id);
    el.value = '';
    el.placeholder = 'Current: ' + map[id];
  });
}

function handleMessMenuUpdate(e) {
  e.preventDefault();
  const day = document.getElementById('editDay').value;
  const menuItem = messMenu.find(m => m.day === day);
  if (!menuItem) return;

  const b = document.getElementById('editBreakfast').value.trim();
  const l = document.getElementById('editLunch').value.trim();
  const sn = document.getElementById('editSnacks').value.trim();
  const d = document.getElementById('editDinner').value.trim();

  if (!b && !l && !sn && !d) { alert('Please fill at least one meal to update.'); return; }

  const changed = [];
  if (b) { menuItem.b = b; changed.push('Breakfast'); }
  if (l) { menuItem.l = l; changed.push('Lunch'); }
  if (sn) { menuItem.s = sn; changed.push('Snacks'); }
  if (d) { menuItem.d = d; changed.push('Dinner'); }

  saveData();
  renderMessMenuTables();
  fillMessForm();
  alert(`${day}: ${changed.join(', ')} updated!`);
}

// ---------- WARDEN: STUDENTS ----------
function handleAddNewStudent(e) {
  e.preventDefault();
  const name = document.getElementById('newStudName').value.trim();
  const id = document.getElementById('newStudId').value.trim();
  const password = document.getElementById('newStudPass').value;
  const room = document.getElementById('newStudRoom').value.trim();
  const contact = document.getElementById('newStudContact').value.trim();

  if (!/^[A-Za-z0-9-]+$/.test(id)) { alert('Student ID can only contain letters, numbers and hyphens.'); return; }
  if (studentDB.some(s => s.id.toLowerCase() === id.toLowerCase())) { alert(`Student ID "${id}" already exists!`); return; }

  const today = getToday();
  studentDB.push({
    id, name, password, room, contact,
    payments: [
      { id: uid('RCT-'), type: 'Semester Mess Fee', amount: 25000, date: '30-10-2026', txnId: 'Pending', status: 'Pending' },
      { id: uid('RCT-'), type: 'Semester Maintenance Fee', amount: 12500, date: '30-10-2026', txnId: 'Pending', status: 'Pending' }
    ]
  });

  saveData();
  alert(`Student ${name} (${id}) registered on ${today}!`);
  e.target.reset();
  renderAdminDashboard();
  searchStudentHistory();
}

function handleAddWarden(e) {
  e.preventDefault();
  const name = document.getElementById('newWardName').value.trim();
  const id = document.getElementById('newWardId').value.trim();
  const password = document.getElementById('newWardPass').value;

  if (!/^[A-Za-z0-9-]+$/.test(id)) { alert('Warden ID can only contain letters, numbers and hyphens.'); return; }
  if (wardenDB.some(w => w.id.toLowerCase() === id.toLowerCase())) { alert(`Warden ID "${id}" already exists!`); return; }

  wardenDB.push({ id, name, password });
  saveData();
  alert(`Warden ${name} (${id}) added!`);
  e.target.reset();
  renderWardenTable();
}

function deleteWarden(id) {
  if (id === currentWardenId) { alert('You cannot delete the account you are logged in with.'); return; }
  if (wardenDB.length <= 1) { alert('At least one warden account must remain.'); return; }
  const w = wardenDB.find(x => x.id === id);
  if (!w) return;
  if (!confirm(`Delete warden "${w.name}" (${w.id})?`)) return;
  wardenDB = wardenDB.filter(x => x.id !== id);
  saveData();
  renderWardenTable();
}

function renderWardenTable() {
  document.getElementById('adminWardenTable').innerHTML = wardenDB.map(w => `
    <tr>
      <td><strong>${esc(w.id)}</strong></td>
      <td>${esc(w.name)}${w.id === currentWardenId ? ' <span class="tag" style="margin-top:0;">You</span>' : ''}</td>
      <td>${w.id === currentWardenId
        ? '<span style="font-size:0.75rem; color:var(--text-muted);">Logged in</span>'
        : `<button onclick="deleteWarden('${esc(w.id)}')" class="btn-delete">Delete</button>`}</td>
    </tr>
  `).join('');
}

function deleteStudent(id) {
  const stud = studentDB.find(s => s.id === id);
  if (!stud) return;
  if (!confirm(`Delete student "${stud.name}" (${stud.id})?\n\nThis will also remove their payments, tickets and gate passes. This cannot be undone.`)) return;

  studentDB = studentDB.filter(s => s.id !== id);
  complaints = complaints.filter(c => c.studentId !== id);
  gatePasses = gatePasses.filter(g => g.studentId !== id);
  saveData();
  renderAdminDashboard();
  searchStudentHistory();
}

function searchStudentHistory() {
  const query = document.getElementById('lookupIdInput').value.trim().toLowerCase();
  const container = document.getElementById('lookupResultContainer');

  if (!query) {
    container.innerHTML = `<span style="color:var(--text-muted);">Showing all registered students:</span>` + renderAllStudentsTable(studentDB);
    return;
  }

  const results = studentDB.filter(s => s.name.toLowerCase().includes(query) || s.id.toLowerCase().includes(query));

  if (results.length === 0) {
    container.innerHTML = `<span style="color:var(--danger); font-weight:600;">No student match for "${esc(query)}".</span>`;
    return;
  }
  container.innerHTML = renderAllStudentsTable(results);
}

function renderAllStudentsTable(list) {
  if (list.length === 0) return `<p style="margin-top:10px; color:var(--text-muted);">No students registered.</p>`;
  let html = '';
  list.forEach(stud => {
    html += `<div style="background:white; padding:1rem; border-radius:10px; border:1px solid var(--border); margin-top:10px;">`;
    html += `<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; gap:8px; flex-wrap:wrap;">`;
    html += `<div><strong>${esc(stud.name)}</strong> (${esc(stud.id)}) - <span style="color:var(--text-muted);">Room: ${esc(stud.room)}</span></div>`;
    html += `<div style="display:flex; gap:6px;">`;
    html += `<button onclick="alert('Fee reminder SMS sent to ${esc(stud.name)}')" class="btn-pay" style="padding:4px 8px; font-size:0.75rem; background:var(--warning);">Send Fee Reminder</button>`;
    html += `<button onclick="deleteStudent('${esc(stud.id)}')" class="btn-delete">Delete Student</button>`;
    html += `</div></div>`;
    html += `<div style="overflow-x:auto;"><table style="margin-top:8px;"><thead><tr><th>Receipt ID</th><th>Fee Type</th><th>Amount</th><th>Status</th><th>Print Action</th></tr></thead><tbody>`;

    stud.payments.forEach(p => {
      html += `<tr>
        <td><strong>${esc(p.id)}</strong></td>
        <td>${esc(p.type)}</td>
        <td>${fmt(p.amount)}</td>
        <td><span class="badge-status ${p.status === 'Paid' ? 'badge-paid' : 'badge-unpaid'}">${esc(p.status)}</span></td>
        <td>
          ${p.status === 'Paid'
            ? `<button onclick="printReceiptModal('${esc(stud.id)}', '${esc(p.id)}')" class="btn-pay" style="padding:3px 8px; font-size:0.7rem;">Print Slip</button>`
            : `<span style="font-size:0.75rem; color:var(--danger);">Pending</span>`}
        </td>
      </tr>`;
    });
    html += `</tbody></table></div></div>`;
  });
  return html;
}

// ---------- WARDEN: NOTICE / DASHBOARD ----------
function handleBroadcastNotice(e) {
  e.preventDefault();
  notice = { text: document.getElementById('noticeInput').value.trim(), date: getToday() };
  saveData();
  alert('Notice broadcasted!');
  e.target.reset();
}

function renderAdminDashboard() {
  renderWardenTable();
  document.getElementById('statStudents').textContent = studentDB.length;
  document.getElementById('statPasses').textContent = gatePasses.filter(g => g.status === 'Pending').length;
  document.getElementById('statPending').textContent = complaints.filter(c => c.status === 'Pending').length;
  document.getElementById('statResolved').textContent = complaints.filter(c => c.status === 'Resolved').length;

  document.getElementById('adminStudentTable').innerHTML = studentDB.length === 0
    ? `<tr><td colspan="5" style="color:var(--text-muted);">No students registered.</td></tr>`
    : studentDB.map(s => `
    <tr>
      <td><strong>${esc(s.id)}</strong></td>
      <td>${esc(s.name)}</td>
      <td>${esc(s.room)}</td>
      <td>${esc(s.contact)}</td>
      <td><button onclick="deleteStudent('${esc(s.id)}')" class="btn-delete">Delete</button></td>
    </tr>
  `).join('');

  document.getElementById('adminGatePassTable').innerHTML = gatePasses.length === 0
    ? `<tr><td colspan="6" style="color:var(--text-muted);">No gate pass requests.</td></tr>`
    : gatePasses.map(g => `
    <tr>
      <td><strong>${esc(g.id)}</strong></td>
      <td>${esc(g.studentName)}</td>
      <td>${esc(g.date)} (${esc(g.returnTime)})</td>
      <td>${esc(g.reason)}</td>
      <td><span class="badge-status ${passBadgeClass(g.status)}">${esc(g.status)}</span></td>
      <td>
        <button onclick="updatePassStatus('${esc(g.id)}', 'Approved')" class="btn-pay" style="padding:4px 8px; font-size:0.75rem; background:var(--success);">Approve</button>
        <button onclick="updatePassStatus('${esc(g.id)}', 'Rejected')" class="btn-pay" style="padding:4px 8px; font-size:0.75rem; background:var(--danger); margin-left:4px;">Reject</button>
      </td>
    </tr>
  `).join('');

  document.getElementById('adminTicketTable').innerHTML = complaints.length === 0
    ? `<tr><td colspan="7" style="color:var(--text-muted);">No maintenance tickets.</td></tr>`
    : complaints.map(t => `
    <tr>
      <td><strong>${esc(t.id)}</strong></td>
      <td>${esc(t.studentName)} (${esc(t.room)})</td>
      <td>${esc(t.category)}</td>
      <td><span class="urgency-badge urgency-${esc(t.urgency)}">${esc(t.urgency)}</span></td>
      <td>${esc(t.description)}</td>
      <td><span class="status-badge status-${t.status.replace(/\s+/g, '')}">${esc(t.status)}</span></td>
      <td>
        <select onchange="updateTicketStatus('${esc(t.id)}', this.value)" class="form-control" style="padding:4px; font-size:0.75rem;">
          <option value="Pending" ${t.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="In Progress" ${t.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
          <option value="Resolved" ${t.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
        </select>
      </td>
    </tr>
  `).join('');
}

function updatePassStatus(id, newStatus) {
  const pass = gatePasses.find(g => g.id === id);
  if (pass) {
    pass.status = newStatus;
    saveData();
    renderAdminDashboard();
  }
}

function updateTicketStatus(id, newStatus) {
  const t = complaints.find(item => item.id === id);
  if (t) {
    t.status = newStatus;
    saveData();
    renderAdminDashboard();
  }
}

// Extra safety: flush data when tab is hidden/closed
window.addEventListener('pagehide', saveData);
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') saveData(); });

// ---------- INITIAL SETUP ----------
(function init() {
  renderMessMenuTables();
  let sess = null;
  try { sess = JSON.parse(sessionStorage.getItem('hh3_session')); } catch (e) {}

  if (sess && sess.role === 'warden' && wardenDB.some(w => w.id === sess.id)) {
    currentRole = 'warden';
    currentWardenId = sess.id;
    showApp();
  } else if (sess && sess.role === 'student' && studentDB.some(s => s.id === sess.id)) {
    currentRole = 'student';
    currentStudentId = sess.id;
    showApp();
  } else {
    clearSession();
    showLogin();
  }
})();
