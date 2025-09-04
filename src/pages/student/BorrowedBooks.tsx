import React from 'react';
import { Clock, AlertTriangle, CheckCircle, Calendar, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export function BorrowedBooks() {
  const { user } = useAuth();
  const { borrowedBooks, books, returnBook } = useData();

  const studentBorrowedBooks = borrowedBooks.filter(b => b.studentId === user?.id);

  const getBorrowedBookDetails = (borrowId: string) => {
    const borrow = borrowedBooks.find(b => b.id === borrowId);
    const book = borrow ? books.find(b => b.id === borrow.bookId) : null;
    return { borrow, book };
  };

  const handleReturnBook = (borrowId: string) => {
    returnBook(borrowId);
    alert('Book returned successfully!');
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Borrowed Books</h1>
          <p className="text-gray-600 text-lg">Manage your current and past book loans</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {studentBorrowedBooks.filter(b => b.status === 'active').length}
                </p>
                <p className="text-gray-600">Currently Borrowed</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {studentBorrowedBooks.filter(b => b.status === 'overdue').length}
                </p>
                <p className="text-gray-600">Overdue Books</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {studentBorrowedBooks.filter(b => b.status === 'returned').length}
                </p>
                <p className="text-gray-600">Books Returned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Borrowings */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Active Borrowings</h2>
          
          {studentBorrowedBooks.filter(b => b.status === 'active').length > 0 ? (
            <div className="space-y-4">
              {studentBorrowedBooks
                .filter(b => b.status === 'active')
                .map((borrowRecord) => {
                  const { book } = getBorrowedBookDetails(borrowRecord.id);
                  const daysUntilDue = getDaysUntilDue(borrowRecord.dueDate);
                  const isOverdue = daysUntilDue < 0;
                  
                  return (
                    <div key={borrowRecord.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="w-16 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-6 h-6 text-gray-400" />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-900 mb-1">{book?.title}</h3>
                            <p className="text-gray-600 mb-2">by {book?.author}</p>
                            
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-600">
                                  Borrowed: {new Date(borrowRecord.borrowDate).toLocaleDateString()}
                                </span>
                              </div>
                              
                              <div className={`flex items-center space-x-1 ${isOverdue ? 'text-red-600' : 'text-blue-600'}`}>
                                <Clock className="w-4 h-4" />
                                <span>
                                  Due: {new Date(borrowRecord.dueDate).toLocaleDateString()}
                                  {isOverdue && ` (${Math.abs(daysUntilDue)} days overdue)`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            isOverdue 
                              ? 'bg-red-100 text-red-800'
                              : daysUntilDue <= 3
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {isOverdue ? 'Overdue' : daysUntilDue <= 3 ? 'Due Soon' : 'Active'}
                          </span>
                          
                          <button
                            onClick={() => handleReturnBook(borrowRecord.id)}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-sm"
                          >
                            Return Book
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No Active Borrowings</h3>
              <p className="text-gray-600 mb-4">You don't have any books borrowed at the moment</p>
              <a
                href="/student/catalog"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                <BookOpen className="w-5 h-5" />
                <span>Browse Catalog</span>
              </a>
            </div>
          )}
        </div>

        {/* History */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Borrowing History</h2>
          
          {studentBorrowedBooks.filter(b => b.status === 'returned').length > 0 ? (
            <div className="space-y-3">
              {studentBorrowedBooks
                .filter(b => b.status === 'returned')
                .map((borrowRecord) => {
                  const { book } = getBorrowedBookDetails(borrowRecord.id);
                  
                  return (
                    <div key={borrowRecord.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-gray-900">{book?.title}</p>
                          <p className="text-gray-600 text-sm">by {book?.author}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Borrowed: {new Date(borrowRecord.borrowDate).toLocaleDateString()}</p>
                        <p className="text-sm text-green-600">Returned</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">No borrowing history available</p>
          )}
        </div>
      </div>
    </div>
  );
}