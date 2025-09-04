import React from 'react';
import { User, Mail, GraduationCap, Calendar, BookOpen, Award, QrCode } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export function StudentProfile() {
  const { user } = useAuth();
  const { borrowedBooks } = useData();

  const studentBorrowedBooks = borrowedBooks.filter(b => b.studentId === user?.id);
  const totalBorrowed = studentBorrowedBooks.length;
  const currentlyBorrowed = studentBorrowedBooks.filter(b => b.status === 'active').length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Digital Student ID</h1>
          <p className="text-gray-600 text-lg">Your official GMIT Library identification</p>
        </div>

        {/* Digital ID Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 mb-8 text-white shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">GMIT Library</h2>
                <p className="text-blue-100 text-sm">Student ID Card</p>
              </div>
            </div>
            
            <div className="bg-white/20 p-3 rounded-lg">
              <QrCode className="w-8 h-8" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-1">{user?.name}</h3>
                <p className="text-blue-100">Computer Science Student</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-200">Student ID</p>
                  <p className="font-bold text-lg">{user?.studentId}</p>
                </div>
                <div>
                  <p className="text-blue-200">Year</p>
                  <p className="font-bold text-lg">3rd Year</p>
                </div>
                <div>
                  <p className="text-blue-200">Status</p>
                  <p className="font-bold text-green-300">Active</p>
                </div>
                <div>
                  <p className="text-blue-200">Expires</p>
                  <p className="font-bold">June 2025</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-32 h-32 bg-white/20 rounded-2xl flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Full Name</p>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Email Address</p>
                  <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <GraduationCap className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Department</p>
                  <p className="font-medium text-gray-900">Computer Science</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="text-sm text-gray-600">Enrollment Date</p>
                  <p className="font-medium text-gray-900">September 2022</p>
                </div>
              </div>
            </div>
          </div>

          {/* Library Statistics */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Library Statistics</h2>
            
            <div className="space-y-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-900">{totalBorrowed}</p>
                <p className="text-blue-700">Total Books Borrowed</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-xl font-bold text-green-900">{currentlyBorrowed}</p>
                  <p className="text-green-700 text-sm">Currently Borrowed</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-xl font-bold text-purple-900">0</p>
                  <p className="text-purple-700 text-sm">Outstanding Fines</p>
                </div>
              </div>

              {/* Achievements */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  <span>Achievements</span>
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-yellow-800 text-sm">First Book Borrowed</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-800 text-sm">Regular Reader (10+ books)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}