import React from 'react';
import { FileText, Download } from 'lucide-react';
import { useData } from '../../context/DataContext';

export function Reports() {
  const { books, borrowedBooks, students, dashboardStats } = useData();

  const handleExportJSON = () => {
    const data = { books, borrowedBooks, students, dashboardStats, generatedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `library-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <FileText className="w-7 h-7 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <p className="text-sm text-gray-600">Total Books</p>
            <p className="text-3xl font-bold text-gray-900">{dashboardStats.totalBooks}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <p className="text-sm text-gray-600">Issued Books</p>
            <p className="text-3xl font-bold text-gray-900">{dashboardStats.issuedBooks}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <p className="text-sm text-gray-600">Overdue Books</p>
            <p className="text-3xl font-bold text-gray-900">{dashboardStats.overdueBooks}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mt-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">Export Data</h2>
              <p className="text-sm text-gray-600">Download a JSON snapshot of current data</p>
            </div>
            <button onClick={handleExportJSON} className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
              <Download className="w-4 h-4" />
              <span>Export JSON</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


