

// Redirect to login if not logged in
if (!localStorage.getItem('token')) {
  window.location.href = '/login.html'
}

const currentUser = JSON.parse(localStorage.getItem('user') || '{}')

let allStudents = []

function getInitial(name) {
  return name ? name.charAt(0).toUpperCase() : '?'
}

function timeAgo(date) {
  const diff = Math.floor((Date.now() - new Date(date)) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago'
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago'
  return Math.floor(diff / 86400) + 'd ago'
}

function renderTable(students) {
  const tbody = document.getElementById('student-table-body')
  if (!students.length) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty">No students found</td></tr>'
    return
  }
  tbody.innerHTML = students.map(s => `
    <tr>
      <td>
        <div class="student-info">
          <div class="avatar">${getInitial(s.name)}</div>
          <div>
            <div class="student-name">${s.name}</div>
            <div class="student-time">${timeAgo(s.createdAt)}</div>
          </div>
        </div>
      </td>
      <td>
        <span class="badge badge-hostel">📍 ${s.hostel}</span>
        <span class="badge badge-room">🏢 ${s.roomNumber}</span>
      </td>
      <td class="preferences">${s.description || 'No description provided'}</td>
      <td class="phone">+91 ${s.phone}</td>
      <td>
        <a class="btn-whatsapp" href="https://wa.me/91${s.phone}?text=${encodeURIComponent(`Hi ${s.name}! I saw your room swap listing on Swapy. I'm interested in swapping rooms with you. Let's connect!`)}" target="_blank">
  💬 Contact on WhatsApp
</a>
      </td>
    </tr>
  `).join('')
}

async function loadStudents() {
  const hostel = document.getElementById('filter-hostel').value
  const sort = document.getElementById('filter-sort').value
  allStudents = await getStudents(hostel, sort)
  applySearch()
}

function applySearch() {
  const q = document.getElementById('search').value.toLowerCase()
  const filtered = allStudents.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.roomNumber.toLowerCase().includes(q)
  )
  renderTable(filtered)
}

async function loadStats() {
  const stats = await getStats()
  document.getElementById('stat-students').textContent = stats.students
  document.getElementById('stat-rooms').textContent = stats.rooms
}

document.getElementById('search').addEventListener('input', applySearch)
document.getElementById('filter-hostel').addEventListener('change', loadStudents)
document.getElementById('filter-sort').addEventListener('change', loadStudents)

// Show logged in user name and logout button
const userEl = document.getElementById('user-info')
if (userEl) userEl.textContent = currentUser.name || ''

document.getElementById('btn-logout')?.addEventListener('click', () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.href = '/login.html'
})

loadStudents()
loadStats()