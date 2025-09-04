import React, { useMemo, useState } from 'react';
import { Users, Plus, Search, Edit3, Trash2, Check, X } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Student } from '../../types';

export function ManageStudents() {
  const { students, addStudent, updateStudent, deleteStudent } = useData();
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    studentId: '',
    department: '',
    year: 1,
    joinDate: new Date().toISOString().slice(0, 10)
  });

  const filtered = useMemo(() =>
    students.filter(s => [s.name, s.email, s.studentId].some(v => v.toLowerCase().includes(query.toLowerCase()))),
    [students, query]
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) {
      updateStudent(editing.id, form as Partial<Student>);
    } else {
      addStudent({ ...form, profileImage: undefined });
    }
    setShowForm(false);
    setEditing(null);
    setForm({ name: '', email: '', studentId: '', department: '', year: 1, joinDate: new Date().toISOString().slice(0, 10) });
  };

  const startEdit = (student: Student) => {
    setEditing(student);
    setForm({
      name: student.name,
      email: student.email,
      studentId: student.studentId,
      department: student.department,
      year: student.year,
      joinDate: student.joinDate
    });
    setShowForm(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Users className="w-7 h-7 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Manage Students</h1>
          </div>
          <button onClick={() => { setEditing(null); setShowForm(true); }} className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-6 flex items-center">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <input
            placeholder="Search by name, email, or ID"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full outline-none"
          />
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="divide-y">
            {filtered.map(student => (
              <div key={student.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-semibold text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-600">{student.email} • {student.studentId}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => startEdit(student)} className="px-3 py-1 rounded-lg border text-gray-700 hover:bg-gray-50"><Edit3 className="w-4 h-4" /></button>
                  <button onClick={() => deleteStudent(student.id)} className="px-3 py-1 rounded-lg border text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-center text-gray-500 py-10">No students found</p>
            )}
          </div>
        </div>

        {showForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-xl w-full p-6">
              <h2 className="text-xl font-bold mb-4">{editing ? 'Edit Student' : 'Add Student'}</h2>
              <form onSubmit={submit} className="space-y-4">
                <input className="w-full px-3 py-2 border rounded" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                <div className="grid grid-cols-2 gap-3">
                  <input className="px-3 py-2 border rounded" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                  <input className="px-3 py-2 border rounded" placeholder="Student ID" value={form.studentId} onChange={e => setForm({ ...form, studentId: e.target.value })} required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input className="px-3 py-2 border rounded" placeholder="Department" value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} required />
                  <input type="number" className="px-3 py-2 border rounded" placeholder="Year" value={form.year} onChange={e => setForm({ ...form, year: Number(e.target.value) })} min={1} max={5} />
                </div>
                <input type="date" className="w-full px-3 py-2 border rounded" value={form.joinDate} onChange={e => setForm({ ...form, joinDate: e.target.value })} />
                <div className="flex items-center justify-end space-x-2">
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg border text-gray-700 hover:bg-gray-50 inline-flex items-center space-x-2"><X className="w-4 h-4" /><span>Cancel</span></button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 inline-flex items-center space-x-2"><Check className="w-4 h-4" /><span>Save</span></button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


