const Student = require('../models/Student')

const getAll = async (req, res, next) => {
  try {
    const { hostel, sort } = req.query
    const filter = { isActive: true }
    if (hostel) filter.hostel = hostel

    let sortOption = { createdAt: -1 }
    if (sort === 'oldest') sortOption = { createdAt: 1 }
    if (sort === 'name') sortOption = { name: 1 }
    if (sort === 'room') sortOption = { roomNumber: 1 }

    const students = await Student.find(filter).sort(sortOption)
    res.json(students)
  } catch (err) {
    next(err)
  }
}

const getStats = async (req, res, next) => {
  try {
    const count = await Student.countDocuments({ isActive: true })
    res.json({ students: count, rooms: count })
  } catch (err) {
    next(err)
  }
}

const create = async (req, res, next) => {
  try {
    const student = await Student.create(req.body)
    res.status(201).json(student)
  } catch (err) {
    next(err)
  }
}

const remove = async (req, res, next) => {
  try {
    await Student.findByIdAndUpdate(req.params.id, { isActive: false })
    res.json({ message: 'Removed successfully' })
  } catch (err) {
    next(err)
  }
}

module.exports = { getAll, getStats, create, remove }