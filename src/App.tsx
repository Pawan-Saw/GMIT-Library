import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Navbar } from './components/Layout/Navbar';
import { Sidebar } from './components/Layout/Sidebar';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { BookCatalog } from './pages/student/BookCatalog';
import { BorrowedBooks } from './pages/student/BorrowedBooks';
import { StudentProfile } from './pages/student/StudentProfile';
import { Notifications } from './pages/student/Notifications';
import { RequestBook } from './pages/student/RequestBook';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageBooks } from './pages/admin/ManageBooks';
import { ManageStudents } from './pages/admin/ManageStudents';
import { IssueReturn } from './pages/admin/IssueReturn';
import { Fines } from './pages/admin/Fines';
import { Reports } from './pages/admin/Reports';

// Protected Route Component
function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode, requiredRole?: 'student' | 'admin' }) {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Layout wrapper for portal pages
function PortalLayout({ children, portalType }: { children: React.ReactNode, portalType: 'student' | 'admin' }) {
  return (
    <div className="flex">
      <Sidebar portalType={portalType} />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}

function AppContent() {
  return (
    <div className="min-h-screen bg-gray-100" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        
        {/* Student Portal Routes */}
        <Route path="/student/dashboard" element={
          <ProtectedRoute requiredRole="student">
            <PortalLayout portalType="student">
              <StudentDashboard />
            </PortalLayout>
          </ProtectedRoute>
        } />
        <Route path="/student/catalog" element={
          <ProtectedRoute requiredRole="student">
            <PortalLayout portalType="student">
              <BookCatalog />
            </PortalLayout>
          </ProtectedRoute>
        } />
        <Route path="/student/borrowed" element={
          <ProtectedRoute requiredRole="student">
            <PortalLayout portalType="student">
              <BorrowedBooks />
            </PortalLayout>
          </ProtectedRoute>
        } />
        <Route path="/student/profile" element={
          <ProtectedRoute requiredRole="student">
            <PortalLayout portalType="student">
              <StudentProfile />
            </PortalLayout>
          </ProtectedRoute>
        } />
        <Route path="/student/notifications" element={
          <ProtectedRoute requiredRole="student">
            <PortalLayout portalType="student">
              <Notifications />
            </PortalLayout>
          </ProtectedRoute>
        } />
        <Route path="/student/request" element={
          <ProtectedRoute requiredRole="student">
            <PortalLayout portalType="student">
              <RequestBook />
            </PortalLayout>
          </ProtectedRoute>
        } />
        
        {/* Admin Portal Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute requiredRole="admin">
            <PortalLayout portalType="admin">
              <AdminDashboard />
            </PortalLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/books" element={
          <ProtectedRoute requiredRole="admin">
            <PortalLayout portalType="admin">
              <ManageBooks />
            </PortalLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/students" element={
          <ProtectedRoute requiredRole="admin">
            <PortalLayout portalType="admin">
              <ManageStudents />
            </PortalLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/issue-return" element={
          <ProtectedRoute requiredRole="admin">
            <PortalLayout portalType="admin">
              <IssueReturn />
            </PortalLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/fines" element={
          <ProtectedRoute requiredRole="admin">
            <PortalLayout portalType="admin">
              <Fines />
            </PortalLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute requiredRole="admin">
            <PortalLayout portalType="admin">
              <Reports />
            </PortalLayout>
          </ProtectedRoute>
        } />

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <AppContent />
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;