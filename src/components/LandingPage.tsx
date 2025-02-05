import React, { useEffect, useState } from 'react';
import {
  Shuffle,
  Table,
  FileText,
  Layers,
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: 'landing' | 'shuffle' | 'viewer' | 'manual' | 'merge') => void;
}

const tools = [
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    description: 'Access the Google Sheets Dashboard',
    icon: ExternalLink,
    gradient: 'from-purple-500 to-pink-500',
    delay: '0'
  },
  {
    id: 'viewer',
    name: 'Table Viewer',
    description:
      'View, manage, and analyze phone numbers from CSV files with advanced features',
    icon: Table,
    gradient: 'from-teal-500 to-cyan-500',
    delay: '100'
  },
  {
    id: 'shuffle',
    name: 'Manual Shuffle',
    description:
      'Manually input and process phone numbers with bulk operations and CSV management',
    icon: Shuffle,
    gradient: 'from-emerald-500 to-teal-500',
    delay: '200'
  },
  {
    id: 'manual',
    name: 'Number Shuffler',
    description:
      'Generate intelligent variations of phone numbers using advanced algorithms',
    icon: FileText,
    gradient: 'from-cyan-500 to-amber-500',
    delay: '300'
  },
  {
    id: 'merge',
    name: 'Merge Files',
    description:
      'Combine multiple CSV files, remove duplicates, and split into manageable chunks',
    icon: Layers,
    gradient: 'from-amber-500 to-emerald-500',
    delay: '400'
  }
];

function LandingPage({ onNavigate }: LandingPageProps) {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Update clock and date every second
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
      setCurrentDate(
        now.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      );
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Header Section with Modern Clock and Date on the Right */}
      <div className="group relative overflow-hidden rounded-2xl p-1 animate-scaleIn">
        <div
          className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
          style={{ backgroundImage: 'linear-gradient(to right, from-indigo-400, to-pink-400)' }}
        ></div>
        <div className="relative bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 transition-all duration-500 group-hover:border-white/20">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent text-center mb-4 animate-fadeIn">
            Albatross Communication Services
          </h2>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent text-center mb-4 animate-fadeIn">
            ||
          </h3>
          {/* Modern Clock & Date container aligned to the right */}
          <div className="flex justify-end items-center space-x-8 animate-fadeIn">
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
                {currentTime}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-medium bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent drop-shadow-lg">
                {currentDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          // For the Google Sheets card, we add extra classes to center it.
          const isGoogleSheets = tool.id === 'google-sheets';
          return (
            <button
              key={tool.id}
              onClick={() => {
                if (tool.id === 'google-sheets') {
                  window.open('https://tayasarbhat.github.io/GSN/', '_blank');
                } else {
                  onNavigate(tool.id as any);
                }
              }}
              style={{ animationDelay: `${tool.delay}ms` }}
              className={`group relative overflow-hidden rounded-2xl p-1 animate-scaleIn ${
                isGoogleSheets ? 'md:col-span-2 mx-auto' : ''
              }`}
            >
              <div
                className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                style={{
                  backgroundImage: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`
                }}
              />
              <div className="relative h-full bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10 transition-all duration-500 group-hover:border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${tool.gradient} transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/50 transform translate-x-0 group-hover:translate-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                  {tool.name}
                </h2>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {tool.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default LandingPage;
