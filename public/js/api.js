const API = '/api/students'

function getToken() {
  return localStorage.getItem('token')
}

async function getStudents(hostel = '', sort = 'newest') {
  const params = new URLSearchParams()
  if (hostel) params.append('hostel', hostel)
  if (sort) params.append('sort', sort)
  const res = await fetch(`${API}?${params}`)
  return res.json()
}

async function getStats() {
  const res = await fetch(`${API}/stats`)
  return res.json()
}

async function addStudent(data) {
  const res = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(data)
  })
  return res.json()
}