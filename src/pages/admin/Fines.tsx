import React from 'react';
import { DollarSign } from 'lucide-react';
import { useData } from '../../context/DataContext';

export function Fines() {
  const { borrowedBooks, books, students } = useData();

  const withFines = borrowedBooks
    .filter(b => (b.fine || 0) > 0)
    .map(b => ({
      ...b,
      book: books.find(x => x.id === b.bookId),
      student: students.find(x => x.id === b.studentId)
    }));

  const total = withFines.reduce((sum, b) => sum + (b.fine || 0), 0);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <DollarSign className="w-7 h-7 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Fine Collection</h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Outstanding Fines</h2>
            <span className="text-sm text-gray-600">Total: €{total.toFixed(2)}</span>
          </div>

          {withFines.length === 0 ? (
            <p className="text-gray-500">No outstanding fines</p>
          ) : (
            <div className="divide-y">
              {withFines.map(b => (
                <div key={b.id} className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">{b.book?.title}</p>
                    <p className="text-sm text-gray-600">{b.student?.name} • Due {new Date(b.dueDate).toLocaleDateString()}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm">€{(b.fine || 0).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


