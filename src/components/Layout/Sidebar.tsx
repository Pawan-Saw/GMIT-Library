import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Users, CreditCard, Bell, FileQuestion as FileRequest, Settings, BookMarked, UserCheck, DollarSign, FileText, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  portalType: 'student' | 'admin';
}

export function Sidebar({ portalType }: SidebarProps) {
  const location = useLocation();
  const { logout, user } = useAuth();
  
  const studentLinks = [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/student/catalog', icon: BookOpen, label: 'Book Catalog' },
    { to: '/student/borrowed', icon: BookMarked, label: 'Borrowed Books' },
    { to: '/student/profile', icon: CreditCard, label: 'Digital ID' },
    { to: '/student/notifications', icon: Bell, label: 'Notifications' },
    { to: '/student/request', icon: FileRequest, label: 'Request Book' },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/books', icon: BookOpen, label: 'Manage Books' },
    { to: '/admin/students', icon: Users, label: 'Manage Students' },
    { to: '/admin/issue-return', icon: UserCheck, label: 'Issue & Return' },
    { to: '/admin/fines', icon: DollarSign, label: 'Fine Collection' },
    { to: '/admin/reports', icon: FileText, label: 'Generate Reports' },
  ];

  const links = portalType === 'student' ? studentLinks : adminLinks;
  const theme = portalType === 'student' ? 'blue' : 'green';
  const gradientClass = theme === 'blue' 
    ? 'from-blue-600 to-blue-700' 
    : 'from-green-600 to-green-700';
  const hoverClass = theme === 'blue' 
    ? 'hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200' 
    : 'hover:bg-green-50 hover:text-green-700 hover:border-green-200';
  const activeClass = theme === 'blue'
    ? 'bg-blue-50 text-blue-700 border-blue-200'
    : 'bg-green-50 text-green-700 border-green-200';

  return (
    <div className="w-64 bg-white h-screen shadow-xl flex flex-col">
      {/* Header */}
      <div className={`bg-gradient-to-r ${gradientClass} p-6 text-white`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg">GMIT Library</h2>
            <p className="text-sm opacity-90 capitalize">{portalType} Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.to;
          
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 border border-transparent ${
                isActive 
                  ? activeClass
                  : `text-gray-700 ${hoverClass}`
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900 text-sm">{user?.name}</p>
            <p className="text-gray-500 text-xs">{user?.email}</p>
          </div>
        </div>
        
        <button
          onClick={logout}
          className="flex items-center justify-center space-x-2 w-full px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}