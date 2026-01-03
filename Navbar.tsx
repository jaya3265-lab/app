
import React from 'react';
import { UserRole } from '../types';

interface NavbarProps {
  role: UserRole;
  onNavigate: (view: 'home' | 'study' | 'quiz' | 'admin' | 'dashboard') => void;
  activeView: string;
  onToggleRole: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ role, onNavigate, activeView, onToggleRole }) => {
  return (
    <>
      {/* Top Navbar (Desktop only) */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onNavigate('home')}>
              <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl overflow-hidden">
                 <span className="animate-pulse">⚓</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-none bg-clip-text text-transparent bg-gradient-to-r from-blue-900 to-red-600">
                  Kerala NCC Academy
                </span>
                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">Unity & Discipline</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => onNavigate('home')}
                className={`${activeView === 'home' ? 'text-blue-900 font-semibold' : 'text-gray-500'} hover:text-blue-700 transition-colors text-sm`}
              >
                Home
              </button>
              <button 
                onClick={() => onNavigate('study')}
                className={`${activeView === 'study' ? 'text-blue-900 font-semibold' : 'text-gray-500'} hover:text-blue-700 transition-colors text-sm`}
              >
                Study
              </button>
              <button 
                onClick={() => onNavigate('quiz')}
                className={`${activeView === 'quiz' ? 'text-blue-900 font-semibold' : 'text-gray-500'} hover:text-blue-700 transition-colors text-sm`}
              >
                Mock Exam
              </button>
              <button 
                onClick={() => onNavigate('dashboard')}
                className={`${activeView === 'dashboard' ? 'text-blue-900 font-semibold' : 'text-gray-500'} hover:text-blue-700 transition-colors text-sm`}
              >
                My Progress
              </button>
              {role === 'instructor' && (
                <button 
                  onClick={() => onNavigate('admin')}
                  className={`${activeView === 'admin' ? 'text-red-600 font-semibold' : 'text-gray-500'} hover:text-red-500 transition-colors text-sm border-l pl-6`}
                >
                  Instructor
                </button>
              )}

              <button 
                onClick={onToggleRole}
                className="ml-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all"
              >
                Role: <span className={role === 'instructor' ? 'text-red-600' : 'text-blue-600'}>{role}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Branding */}
      <div className="md:hidden bg-white border-b px-4 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center space-x-2">
           <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-white text-xs">⚓</div>
           <span className="font-bold text-sm text-blue-900">Kerala NCC Academy</span>
        </div>
        <button onClick={onToggleRole} className="text-[10px] font-black uppercase text-gray-400 bg-gray-50 px-2 py-1 rounded border">
          {role}
        </button>
      </div>

      {/* Mobile Bottom Navigation (Android style) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-1 flex justify-around items-center z-50 pb-safe shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center p-2 min-w-[64px] transition-colors ${activeView === 'home' ? 'text-blue-900' : 'text-gray-400'}`}
        >
          <svg className="w-6 h-6" fill={activeView === 'home' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-[10px] font-bold mt-1">Home</span>
        </button>

        <button 
          onClick={() => onNavigate('study')}
          className={`flex flex-col items-center p-2 min-w-[64px] transition-colors ${activeView === 'study' ? 'text-blue-900' : 'text-gray-400'}`}
        >
          <svg className="w-6 h-6" fill={activeView === 'study' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span className="text-[10px] font-bold mt-1">Study</span>
        </button>

        <button 
          onClick={() => onNavigate('quiz')}
          className={`flex flex-col items-center p-2 min-w-[64px] transition-colors ${activeView === 'quiz' ? 'text-blue-900' : 'text-gray-400'}`}
        >
          <svg className="w-6 h-6" fill={activeView === 'quiz' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          <span className="text-[10px] font-bold mt-1">Quiz</span>
        </button>

        <button 
          onClick={() => onNavigate('dashboard')}
          className={`flex flex-col items-center p-2 min-w-[64px] transition-colors ${activeView === 'dashboard' ? 'text-blue-900' : 'text-gray-400'}`}
        >
          <svg className="w-6 h-6" fill={activeView === 'dashboard' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-[10px] font-bold mt-1">Profile</span>
        </button>

        {role === 'instructor' && (
          <button 
            onClick={() => onNavigate('admin')}
            className={`flex flex-col items-center p-2 min-w-[64px] transition-colors ${activeView === 'admin' ? 'text-red-600' : 'text-gray-400'}`}
          >
            <svg className="w-6 h-6" fill={activeView === 'admin' ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="text-[10px] font-bold mt-1">Tools</span>
          </button>
        )}
      </nav>
    </>
  );
};
