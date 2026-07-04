const loginTab = document.getElementById('tab-login')
const registerTab = document.getElementById('tab-register')
const formLogin = document.getElementById('form-login')
const formRegister = document.getElementById('form-register')

loginTab.addEventListener('click', () => {
  loginTab.classList.add('active')
  registerTab.classList.remove('active')
  formLogin.classList.remove('hidden')
  formRegister.classList.add('hidden')
})

registerTab.addEventListener('click', () => {
  registerTab.classList.add('active')
  loginTab.classList.remove('active')
  formRegister.classList.remove('hidden')
  formLogin.classList.add('hidden')
})

document.getElementById('btn-login').addEventListener('click', async () => {
  const email = document.getElementById('login-email').value.trim()
  const password = document.getElementById('login-password').value.trim()
  const errorEl = document.getElementById('login-error')

  if (!email || !password) {
    errorEl.textContent = 'Please fill all fields'
    return
  }
  if (!email.endsWith('@thapar.edu')) {
    errorEl.textContent = 'Only @thapar.edu email IDs are allowed'
    return
  }

  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  const data = await res.json()

  if (res.ok) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    window.location.href = '/'
  } else {
    errorEl.textContent = data.message
  }
})

document.getElementById('btn-register').addEventListener('click', async () => {
  const name = document.getElementById('reg-name').value.trim()
  const email = document.getElementById('reg-email').value.trim()
  const password = document.getElementById('reg-password').value.trim()
  const errorEl = document.getElementById('reg-error')

  if (!name || !email || !password) {
    errorEl.textContent = 'Please fill all fields'
    return
  }
  if (!email.endsWith('@thapar.edu')) {
    errorEl.textContent = 'Only @thapar.edu email IDs are allowed'
    return
  }
  if (password.length < 6) {
    errorEl.textContent = 'Password must be at least 6 characters'
    return
  }

  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  })
  const data = await res.json()

  if (res.ok) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    window.location.href = '/'
  } else {
    errorEl.textContent = data.message
  }
})