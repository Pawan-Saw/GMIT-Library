import { BookOpen, Users, AlertTriangle, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { StatCard } from '../../components/UI/StatCard';
import { useData } from '../../context/DataContext';

export function AdminDashboard() {
  const { dashboardStats, books, borrowedBooks, students } = useData();

  const recentBorrowings = borrowedBooks
    .sort((a, b) => new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime())
    .slice(0, 5);

  const popularBooks = books
    .map(book => ({
      ...book,
      borrowCount: borrowedBooks.filter(b => b.bookId === book.id).length
    }))
    .sort((a, b) => b.borrowCount - a.borrowCount)
    .slice(0, 5);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard 🛠️</h1>
              <p className="text-green-100 text-lg">Library Management Overview</p>
              <p className="text-green-200 mt-2">Monitor and manage all library operations</p>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-green-100">
              <Calendar className="w-5 h-5" />
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            title="Total Books"
            value={dashboardStats.totalBooks}
            icon={BookOpen}
            trend={{ value: '+5 this week', type: 'positive' }}
            theme="blue"
          />
          <StatCard
            title="Issued Books"
            value={dashboardStats.issuedBooks}
            icon={Users}
            theme="orange"
          />
          <StatCard
            title="Total Students"
            value={dashboardStats.totalStudents}
            icon={Users}
            trend={{ value: '+12 this month', type: 'positive' }}
            theme="green"
          />
          <StatCard
            title="Overdue Books"
            value={dashboardStats.overdueBooks}
            icon={AlertTriangle}
            theme="red"
          />
          <StatCard
            title="Total Fines"
            value={`€${dashboardStats.totalFines}`}
            icon={DollarSign}
            theme="purple"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Borrowings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Borrowings</h2>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              
              <div className="space-y-4">
                {recentBorrowings.map((borrowRecord) => {
                  const book = books.find(b => b.id === borrowRecord.bookId);
                  const student = students.find(s => s.id === borrowRecord.studentId);
                  
                  return (
                    <div key={borrowRecord.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{book?.title}</p>
                          <p className="text-gray-600 text-sm">by {student?.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">
                          {new Date(borrowRecord.borrowDate).toLocaleDateString()}
                        </p>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          borrowRecord.status === 'active' ? 'bg-green-100 text-green-800' :
                          borrowRecord.status === 'overdue' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {borrowRecord.status.charAt(0).toUpperCase() + borrowRecord.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  );
                })}
                
                {recentBorrowings.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No recent borrowings</p>
                )}
              </div>
            </div>
          </div>

          {/* Popular Books */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Popular Books</h2>
              <div className="space-y-4">
                {popularBooks.map((book, index) => (
                  <div key={book.id} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{book.title}</p>
                      <p className="text-gray-600 text-xs">{book.borrowCount} borrows</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <a
                  href="/admin/books"
                  className="block p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 hover:from-green-100 hover:to-green-200 transition-colors group"
                >
                  <p className="font-medium text-green-900 group-hover:text-green-700">Add New Book</p>
                  <p className="text-green-600 text-sm">Expand the collection</p>
                </a>
                
                <a
                  href="/admin/students"
                  className="block p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:from-blue-100 hover:to-blue-200 transition-colors group"
                >
                  <p className="font-medium text-blue-900 group-hover:text-blue-700">Manage Students</p>
                  <p className="text-blue-600 text-sm">View student accounts</p>
                </a>
                
                <a
                  href="/admin/reports"
                  className="block p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200 hover:from-purple-100 hover:to-purple-200 transition-colors group"
                >
                  <p className="font-medium text-purple-900 group-hover:text-purple-700">Generate Reports</p>
                  <p className="text-purple-600 text-sm">Export library data</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}