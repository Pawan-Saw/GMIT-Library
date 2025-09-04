import React, { useState } from 'react';
import { Send, BookOpen, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export function RequestBook() {
  const { user } = useAuth();
  const { addNotification } = useData();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // In a real app we'd persist the request. Here, notify admin + student.
    addNotification({
      userId: user!.id,
      title: 'Book request submitted',
      message: `Your request for "${title}" has been received. We'll notify you when it's available.`,
      type: 'success'
    });

    // Notify admin mock (assuming admin id is '2' from mock users)
    addNotification({
      userId: '2',
      title: 'New book request',
      message: `${user?.name} requested "${title}" by ${author || 'Unknown Author'}.`,
      type: 'info'
    });

    setTitle('');
    setAuthor('');
    setIsbn('');
    setNotes('');
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Request a Book</h1>
          <p className="text-gray-600 text-lg">Can't find a book? Send us a request.</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          {submitted && (
            <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Your request was submitted successfully.</span>
            </div>
          )}

          <form onSubmit={submitRequest} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Book Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="e.g., Domain-Driven Design"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g., Eric Evans"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ISBN (optional)</label>
                <input
                  value={isbn}
                  onChange={(e) => setIsbn(e.target.value)}
                  placeholder="e.g., 978-0321125217"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Any additional details, edition, reason for request, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-500 text-sm">
                <BookOpen className="w-4 h-4" />
                <span>Requests are reviewed within 2-3 business days</span>
              </div>
              <button
                type="submit"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Submit Request</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


