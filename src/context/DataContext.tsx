import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book, BorrowedBook, Student, Notification, DashboardStats } from '../types';

interface DataContextType {
  books: Book[];
  borrowedBooks: BorrowedBook[];
  students: Student[];
  notifications: Notification[];
  dashboardStats: DashboardStats;
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (id: string, student: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  borrowBook: (bookId: string, studentId: string) => void;
  returnBook: (borrowId: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (userId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'The Art of Computer Programming',
    author: 'Donald E. Knuth',
    isbn: '978-0201896831',
    genre: 'Computer Science',
    status: 'available',
    publishedYear: 1968,
    description: 'A comprehensive monograph written by computer scientist Donald Knuth.',
    coverImage: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '2',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    isbn: '978-0132350884',
    genre: 'Programming',
    status: 'borrowed',
    publishedYear: 2008,
    description: 'A handbook of agile software craftsmanship.',
    coverImage: 'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=200'
  },
  {
    id: '3',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    isbn: '978-0262033848',
    genre: 'Computer Science',
    status: 'available',
    publishedYear: 2009,
    description: 'A comprehensive textbook on computer algorithms.',
    coverImage: 'https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg?auto=compress&cs=tinysrgb&w=200'
  }
];

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@student.gmit.ie',
    studentId: 'ST2024001',
    department: 'Computer Science',
    year: 3,
    profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    joinDate: '2022-09-01'
  }
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [borrowedBooks, setBorrowedBooks] = useState<BorrowedBook[]>([]);
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const dashboardStats: DashboardStats = {
    totalBooks: books.length,
    issuedBooks: borrowedBooks.filter(b => b.status === 'active').length,
    totalStudents: students.length,
    overdueBooks: borrowedBooks.filter(b => b.status === 'overdue').length,
    totalFines: borrowedBooks.reduce((sum, b) => sum + (b.fine || 0), 0)
  };

  const addBook = (book: Omit<Book, 'id'>) => {
    const newBook = { ...book, id: Date.now().toString() };
    setBooks(prev => [...prev, newBook]);
  };

  const updateBook = (id: string, updatedBook: Partial<Book>) => {
    setBooks(prev => prev.map(book => 
      book.id === id ? { ...book, ...updatedBook } : book
    ));
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent = { ...student, id: Date.now().toString() };
    setStudents(prev => [...prev, newStudent]);
  };

  const updateStudent = (id: string, updatedStudent: Partial<Student>) => {
    setStudents(prev => prev.map(student => 
      student.id === id ? { ...student, ...updatedStudent } : student
    ));
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  const borrowBook = (bookId: string, studentId: string) => {
    const borrowDate = new Date();
    const dueDate = new Date(borrowDate);
    dueDate.setDate(dueDate.getDate() + 14); // 2 weeks

    const newBorrow: BorrowedBook = {
      id: Date.now().toString(),
      bookId,
      studentId,
      borrowDate: borrowDate.toISOString(),
      dueDate: dueDate.toISOString(),
      status: 'active'
    };

    setBorrowedBooks(prev => [...prev, newBorrow]);
    updateBook(bookId, { status: 'borrowed' });
  };

  const returnBook = (borrowId: string) => {
    const borrow = borrowedBooks.find(b => b.id === borrowId);
    if (borrow) {
      setBorrowedBooks(prev => prev.map(b => 
        b.id === borrowId ? { ...b, status: 'returned' } : b
      ));
      updateBook(borrow.bookId, { status: 'available' });
    }
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = (userId: string) => {
    setNotifications(prev => prev.map(n => n.userId === userId ? { ...n, read: true } : n));
  };

  return (
    <DataContext.Provider value={{
      books,
      borrowedBooks,
      students,
      notifications,
      dashboardStats,
      addBook,
      updateBook,
      deleteBook,
      addStudent,
      updateStudent,
      deleteStudent,
      borrowBook,
      returnBook
      ,
      addNotification,
      markNotificationRead,
      markAllNotificationsRead
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}