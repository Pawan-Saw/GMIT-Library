import React, { useMemo, useState } from 'react';
import { UserCheck, CheckCircle, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export function IssueReturn() {
  const { books, students, borrowedBooks, borrowBook, returnBook } = useData();
  const { user } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedBook, setSelectedBook] = useState('');

  const availableBooks = useMemo(() => books.filter(b => b.status === 'available'), [books]);
  const activeBorrows = useMemo(() => borrowedBooks.filter(b => b.status === 'active'), [borrowedBooks]);

  const handleIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStudent && selectedBook) {
      borrowBook(selectedBook, selectedStudent);
      setSelectedBook('');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <UserCheck className="w-7 h-7 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Issue & Return Books</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2"><ArrowDownToLine className="w-5 h-5 text-green-600" /><span>Issue Book</span></h2>
            <form onSubmit={handleIssue} className="space-y-4">
              <select value={selectedStudent} onChange={e => setSelectedStudent(e.target.value)} className="w-full px-3 py-2 border rounded" required>
                <option value="">Select Student</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.name} • {s.studentId}</option>
                ))}
              </select>
              <select value={selectedBook} onChange={e => setSelectedBook(e.target.value)} className="w-full px-3 py-2 border rounded" required>
                <option value="">Select Book</option>
                {availableBooks.map(b => (
                  <option key={b.id} value={b.id}>{b.title} • {b.author}</option>
                ))}
              </select>
              <button type="submit" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 inline-flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Issue</span>
              </button>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2"><ArrowUpFromLine className="w-5 h-5 text-blue-600" /><span>Active Borrowings</span></h2>
            {activeBorrows.length === 0 ? (
              <p className="text-gray-500">No active borrowings</p>
            ) : (
              <div className="space-y-3">
                {activeBorrows.map(b => {
                  const book = books.find(x => x.id === b.bookId);
                  const student = students.find(x => x.id === b.studentId);
                  return (
                    <div key={b.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{book?.title}</p>
                        <p className="text-sm text-gray-600">{student?.name} • Due {new Date(b.dueDate).toLocaleDateString()}</p>
                      </div>
                      <button onClick={() => returnBook(b.id)} className="px-3 py-1 rounded-lg border text-blue-700 hover:bg-blue-50">Return</button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


