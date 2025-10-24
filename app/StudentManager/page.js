'use client'
import React, { useEffect, useState } from 'react'
import { database } from '@/app/utils/firebaseConfig'
import { get, ref, update } from 'firebase/database'

const StudentTable = () => {
  const [students, setStudents] = useState([])
  const [filtered, setFiltered] = useState([])
  const [filters, setFilters] = useState({
    addno: '',
    course: '',
    semester: ''
  })
  const [editId, setEditId] = useState(null)
  const [editData, setEditData] = useState({})
  const [openfine, setOpenfine] = useState(null)

  // ✅ Fetch Students
  const fetchStudents = async () => {
    try {
      const studentsRef = ref(database, 'user')
      const snapshot = await get(studentsRef)
      if (snapshot.exists()) {
        const data = snapshot.val()
        const formatted = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value,
        }))
        setStudents(formatted)
        setFiltered(formatted)
      } else {
        setStudents([])
        setFiltered([])
      }
    } catch (err) {
      console.error('Error fetching students:', err)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  // ✅ Filtering
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    const newFilters = { ...filters, [name]: value.toLowerCase() }
    setFilters(newFilters)

    const filteredData = students.filter((student) => {
      const admissionMatch = student.addno?.toLowerCase().includes(newFilters.addno)
      const courseMatch = student.course?.toLowerCase().includes(newFilters.course)
      const semesterMatch = student.semester?.toString().toLowerCase().includes(newFilters.semester)
      return admissionMatch && courseMatch && semesterMatch
    })

    setFiltered(filteredData)
  }

  // ✅ Edit handlers
  const handleEdit = (student) => {
    setEditId(student.id)
    setEditData({ ...student })
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData({ ...editData, [name]: value })
  }

  const handleSave = async () => {
    try {
      const studentRef = ref(database, `user/${editId}`)
      await update(studentRef, editData)
      alert('Student data updated successfully!')
      setEditId(null)
      fetchStudents()
    } catch (err) {
      console.error('Error updating data:', err)
      alert('Failed to update student data.')
    }
  }

  // ✅ fine view toggle
  const togglefine = (studentId) => {
    setOpenfine(openfine === studentId ? null : studentId)
  }

  // ✅ Handle fine payment toggle
  const handleFinePaidChange = async (studentId, fineKey, isPaid) => {
    try {
      const fineRef = ref(database, `user/${studentId}/fine/${fineKey}`)
      await update(fineRef, { isPaid })
      fetchStudents() // refresh list after update
    } catch (err) {
      console.error('Error updating fine:', err)
      alert('Failed to update fine status.')
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-semibold mb-6">Student List</h1>

      {/* 🔍 Search Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          name="addno"
          placeholder="Search by Admission No"
          value={filters.addno}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="course"
          placeholder="Search by course"
          value={filters.course}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="semester"
          placeholder="Search by Semester"
          value={filters.semester}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 📋 Data Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase">Name</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase">Admission No</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase">Course</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase">Semester</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase">Email</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase">fine</th>
              <th className="px-6 py-3 text-left font-medium text-gray-600 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filtered.length > 0 ? (
              filtered.map((student) => (
                <React.Fragment key={student.id}>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {editId === student.id ? (
                        <input
                          name="name"
                          value={editData.name || ''}
                          onChange={handleEditChange}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        student.name
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {editId === student.id ? (
                        <input
                          name="addno"
                          value={editData.addno || ''}
                          onChange={handleEditChange}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        student.addno
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {editId === student.id ? (
                        <input
                          name="course"
                          value={editData.course || ''}
                          onChange={handleEditChange}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        student.course
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {editId === student.id ? (
                        <input
                          name="semester"
                          value={editData.semester || ''}
                          onChange={handleEditChange}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        student.semester
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {editId === student.id ? (
                        <input
                          name="email"
                          value={editData.email || ''}
                          onChange={handleEditChange}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        student.email
                      )}
                    </td>

                    {/* 👇 fine Button */}
                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      <button
                        onClick={() => togglefine(student.id)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        {openfine === student.id ? 'Hide' : 'View'}
                      </button>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                      {editId === student.id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={handleSave}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditId(null)}
                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEdit(student)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>

                  {/* 🔽 Fine Details Row */}
                  {openfine === student.id && (
                    <tr>
                      <td colSpan={7} className="bg-gray-50 p-4">
                        {student.fine ? (
                          <table className="min-w-full border border-gray-300 rounded">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="p-2 text-left">Book ID</th>
                                <th className="p-2 text-left">Amount</th>
                                <th className="p-2 text-left">delayedDays</th>
                                <th className="p-2 text-left">Paid</th>
                              </tr>
                            </thead>
                            <tbody>
                              {Object.entries(student.fine).map(([fineKey, fine]) => (
                                <tr key={fineKey} className="border-t">
                                  <td className="p-2">{fine.id}</td>
                                  <td className="p-2">{fine.fine}</td>
                                  <td className="p-2">{fine.delayedDays}</td>
                                  <td className="p-2">
                                    <input
                                      type="checkbox"
                                      disabled={fine.isPaid}
                                      checked={fine.isPaid || false}
                                      onChange={(e) =>
                                        handleFinePaidChange(student.id, fineKey, e.target.checked)
                                      }
                                    />{' '}
                                    {fine.isPaid ? 'Paid' : 'Unpaid'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <p className="text-gray-500 text-sm">No fine found.</p>
                        )}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No students found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StudentTable
