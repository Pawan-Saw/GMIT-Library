import React, { useState } from 'react';
import { Search, Filter, BookOpen, Eye } from 'lucide-react';
import { BookCard } from '../../components/UI/BookCard';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Book } from '../../types';

export function BookCatalog() {
  const { books, borrowBook } = useData();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const genres = ['all', ...Array.from(new Set(books.map(book => book.genre)))];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    const matchesStatus = selectedStatus === 'all' || book.status === selectedStatus;
    
    return matchesSearch && matchesGenre && matchesStatus;
  });

  const handleBorrowBook = (book: Book) => {
    if (book.status === 'available' && user?.id) {
      borrowBook(book.id, user.id);
      alert(`You have successfully borrowed "${book.title}"`);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Book Catalog</h1>
          <p className="text-gray-600 text-lg">Discover and borrow from our extensive collection</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre}
                </option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="borrowed">Borrowed</option>
              <option value="reserved">Reserved</option>
            </select>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredBooks.length} of {books.length} books
          </p>
          <div className="flex items-center space-x-2 text-gray-600">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Sort by relevance</span>
          </div>
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onAction={book.status === 'available' ? handleBorrowBook : () => setSelectedBook(book)}
              actionLabel={book.status === 'available' ? 'Borrow' : 'View Details'}
              showStatus={true}
            />
          ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Book Details Modal */}
        {selectedBook && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
                  <button
                    onClick={() => setSelectedBook(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    {selectedBook.coverImage ? (
                      <img 
                        src={selectedBook.coverImage} 
                        alt={selectedBook.title}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedBook.title}</h3>
                    <p className="text-gray-600 mb-4">by {selectedBook.author}</p>
                    
                    <div className="space-y-3 mb-6">
                      <div><strong>ISBN:</strong> {selectedBook.isbn}</div>
                      <div><strong>Genre:</strong> {selectedBook.genre}</div>
                      <div><strong>Published:</strong> {selectedBook.publishedYear}</div>
                      <div><strong>Status:</strong> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          selectedBook.status === 'available' ? 'bg-green-100 text-green-800' :
                          selectedBook.status === 'borrowed' ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {selectedBook.status.charAt(0).toUpperCase() + selectedBook.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">{selectedBook.description}</p>
                    
                    {selectedBook.status === 'available' && (
                      <button
                        onClick={() => {
                          handleBorrowBook(selectedBook);
                          setSelectedBook(null);
                        }}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
                      >
                        Borrow This Book
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}