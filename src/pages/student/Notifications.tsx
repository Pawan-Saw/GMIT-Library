import React from 'react';
import { Bell, CheckCircle, Info, AlertTriangle, XCircle, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export function Notifications() {
  const { user } = useAuth();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();

  const myNotifications = notifications
    .filter(n => n.userId === user?.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getBadgeClass = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'warning':
        return 'bg-orange-100 text-orange-800';
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Bell className="w-7 h-7 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          </div>
          <button
            onClick={() => user && markAllNotificationsRead(user.id)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Mark all as read
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          {myNotifications.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No notifications yet</p>
          ) : (
            <div className="space-y-3">
              {myNotifications.map((n) => (
                <div
                  key={n.id}
                  className={`flex items-start justify-between p-4 rounded-lg border ${n.read ? 'bg-white border-gray-200' : 'bg-blue-50 border-blue-200'}`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      {getIcon(n.type)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeClass(n.type)}`}>{n.type.toUpperCase()}</span>
                        <h3 className="font-semibold text-gray-900">{n.title}</h3>
                      </div>
                      <p className="text-gray-700 mt-1 text-sm">{n.message}</p>
                      <div className="flex items-center space-x-1 text-gray-500 text-xs mt-2">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(n.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  {!n.read && (
                    <button
                      onClick={() => markNotificationRead(n.id)}
                      className="text-blue-700 hover:text-blue-900 text-sm"
                    >
                      Mark read
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


