export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  studentId?: string;
  profileImage?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  status: 'available' | 'borrowed' | 'reserved';
  publishedYear: number;
  description: string;
  coverImage?: string;
}

export interface BorrowedBook {
  id: string;
  bookId: string;
  studentId: string;
  borrowDate: string;
  dueDate: string;
  status: 'active' | 'overdue' | 'returned';
  fine?: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  year: number;
  profileImage?: string;
  joinDate: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  read: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalBooks: number;
  issuedBooks: number;
  totalStudents: number;
  overdueBooks: number;
  totalFines: number;
}