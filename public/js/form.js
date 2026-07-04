function openModal() {
  document.getElementById('modal').classList.add('active')
  document.getElementById('modal-overlay').classList.add('active')
}

function closeModal() {
  document.getElementById('modal').classList.remove('active')
  document.getElementById('modal-overlay').classList.remove('active')
  document.getElementById('form-error').textContent = ''
}

async function submitForm() {
  const name = document.getElementById('f-name').value.trim()
  const hostel = document.getElementById('f-hostel').value
  const roomNumber = document.getElementById('f-room').value.trim()
  const description = document.getElementById('f-desc').value.trim()
  const phone = document.getElementById('f-phone').value.trim()
  const errorEl = document.getElementById('form-error')

  if (!name || !hostel || !roomNumber || !phone) {
    errorEl.textContent = 'Please fill all required fields.'
    return
  }
  if (!/^\d{10}$/.test(phone)) {
    errorEl.textContent = 'Phone must be exactly 10 digits.'
    return
  }

  const result = await addStudent({ name, hostel, roomNumber, description, phone })

  if (result._id) {
    closeModal()
    document.getElementById('f-name').value = ''
    document.getElementById('f-hostel').value = ''
    document.getElementById('f-room').value = ''
    document.getElementById('f-desc').value = ''
    document.getElementById('f-phone').value = ''
    loadStudents()
    loadStats()
  } else {
    errorEl.textContent = result.errors?.[0]?.msg || 'Something went wrong.'
  }
}