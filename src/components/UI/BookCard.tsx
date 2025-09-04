import React from 'react';
import { Book, User, Calendar } from 'lucide-react';
import { Book as BookType } from '../../types';

interface BookCardProps {
  book: BookType;
  onAction?: (book: BookType) => void;
  actionLabel?: string;
  showStatus?: boolean;
}

export function BookCard({ book, onAction, actionLabel = 'View', showStatus = true }: BookCardProps) {
  const statusColors = {
    available: 'bg-green-100 text-green-800',
    borrowed: 'bg-orange-100 text-orange-800',
    reserved: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        {book.coverImage ? (
          <img 
            src={book.coverImage} 
            alt={book.title}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <Book className="w-12 h-12 text-gray-400" />
          </div>
        )}
        {showStatus && (
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[book.status]}`}>
            {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{book.title}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <User className="w-4 h-4 mr-2" />
            <span>{book.author}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{book.publishedYear}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{book.description}</p>
        
        <div className="flex items-center justify-between">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
            {book.genre}
          </span>
          
          {onAction && (
            <button
              onClick={() => onAction(book)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 text-sm font-medium"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}