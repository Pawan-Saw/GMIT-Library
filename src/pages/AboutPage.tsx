import React from 'react';
import { BookOpen, Users, Clock, Award, Target, Heart } from 'lucide-react';

export function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for excellence in all our services and continuously improve our offerings.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a strong academic community through shared knowledge and resources.'
    },
    {
      icon: Heart,
      title: 'Service',
      description: 'Dedicated to serving our students and faculty with passion and commitment.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About GMIT Library</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Galway-Mayo Institute of Technology Library has been serving the academic community 
            for over three decades, providing world-class resources and innovative digital solutions.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                To provide exceptional library services that support teaching, learning, and research 
                at GMIT. We are committed to creating an inclusive environment where knowledge is 
                accessible to all members of our community.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Through our modern digital platform, we bridge the gap between traditional library 
                services and contemporary technology needs, ensuring our users have seamless access 
                to both physical and digital resources.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-xl text-center">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-blue-900 mb-2">24/7 Access</h3>
                <p className="text-blue-700 text-sm">Always available when you need us</p>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-6 rounded-xl text-center">
                <Award className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-bold text-purple-900 mb-2">Award Winning</h3>
                <p className="text-purple-700 text-sm">Recognized for innovation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* History Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our History</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 w-3 h-3 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">1990 - Foundation</h3>
                  <p className="text-gray-600">GMIT Library was established with a vision to support academic excellence.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-purple-600 w-3 h-3 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">2010 - Digital Transformation</h3>
                  <p className="text-gray-600">Launched our first digital catalog and online borrowing system.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 w-3 h-3 rounded-full mt-2"></div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">2024 - Modern Platform</h3>
                  <p className="text-gray-600">Introduced this state-of-the-art library management system.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}