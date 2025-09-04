import React from 'react';
import { BookOpen, Clock, AlertTriangle, CheckCircle, User, Calendar } from 'lucide-react';
import { StatCard } from '../../components/UI/StatCard';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export function StudentDashboard() {
  const { user } = useAuth();
  const { books, borrowedBooks } = useData();

  const studentBorrowedBooks = borrowedBooks.filter(b => b.studentId === user?.id);
  const activeBorrows = studentBorrowedBooks.filter(b => b.status === 'active');
  const overdueBorrows = studentBorrowedBooks.filter(b => b.status === 'overdue');

  const recentActivity = [
    { action: 'Borrowed', book: 'Clean Code', date: '2024-01-15', status: 'success' },
    { action: 'Returned', book: 'JavaScript Guide', date: '2024-01-10', status: 'success' },
    { action: 'Reserved', book: 'Python Cookbook', date: '2024-01-08', status: 'info' }
  ];

  const quickActions = [
    { title: 'Browse Catalog', description: 'Discover new books', link: '/student/catalog' },
    { title: 'Request Book', description: 'Request unavailable books', link: '/student/request' },
    { title: 'View Profile', description: 'Check your digital ID', link: '/student/profile' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
              <p className="text-blue-100 text-lg">Student ID: {user?.studentId}</p>
              <p className="text-blue-200 mt-2">Ready to explore new knowledge today?</p>
            </div>
            <div className="hidden md:block">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Available Books"
            value={books.filter(b => b.status === 'available').length}
            icon={BookOpen}
            trend={{ value: '+50 this week', type: 'positive' }}
            theme="blue"
          />
          <StatCard
            title="Currently Borrowed"
            value={activeBorrows.length}
            icon={Clock}
            theme="orange"
          />
          <StatCard
            title="Overdue Books"
            value={overdueBorrows.length}
            icon={AlertTriangle}
            theme="red"
          />
          <StatCard
            title="Books Read"
            value={12}
            icon={CheckCircle}
            trend={{ value: '+3 this month', type: 'positive' }}
            theme="green"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' : 
                      activity.status === 'info' ? 'bg-blue-500' : 'bg-orange-500'
                    }`}></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        {activity.action} "{activity.book}"
                      </p>
                      <div className="flex items-center space-x-1 text-gray-500 text-sm">
                        <Calendar className="w-3 h-3" />
                        <span>{activity.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <a
                    key={index}
                    href={action.link}
                    className="block p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 hover:from-blue-100 hover:to-purple-100 transition-colors group"
                  >
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{action.description}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Upcoming Due Dates */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Upcoming Due Dates</h2>
              {activeBorrows.length > 0 ? (
                <div className="space-y-3">
                  {activeBorrows.slice(0, 3).map((borrow) => {
                    const book = books.find(b => b.id === borrow.bookId);
                    const dueDate = new Date(borrow.dueDate);
                    const isOverdue = dueDate < new Date();
                    
                    return (
                      <div key={borrow.id} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-900 text-sm">{book?.title}</p>
                        <p className={`text-xs ${isOverdue ? 'text-red-600' : 'text-gray-600'}`}>
                          Due: {dueDate.toLocaleDateString()}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No books currently borrowed</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}