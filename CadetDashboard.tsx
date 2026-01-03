
import React from 'react';
import { UserProgress, Badge } from '../types';
import { BADGES, NCC_TOPICS } from '../constants';

interface DashboardProps {
  progress: UserProgress;
}

export const CadetDashboard: React.FC<DashboardProps> = ({ progress }) => {
  const completionRate = (progress.completedTopicIds.length / NCC_TOPICS.length) * 100;
  
  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 col-span-1 md:col-span-2">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="mr-2">📈</span> Training Analytics
          </h2>
          <div className="flex items-center space-x-8">
            <div className="relative w-32 h-32">
               <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path className="text-gray-100" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className="text-blue-600 transition-all duration-1000" strokeDasharray={`${completionRate}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-blue-900">{Math.round(completionRate)}%</span>
                  <span className="text-[10px] text-gray-400 uppercase font-bold">Complete</span>
               </div>
            </div>
            <div className="flex-grow space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Certificate Level</span>
                <span className="font-bold text-blue-900">Level {progress.currentCertificate}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Modules Cleared</span>
                <span className="font-bold text-gray-800">{progress.completedTopicIds.length} / {NCC_TOPICS.length}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Badges Earned</span>
                <span className="font-bold text-orange-600">{progress.earnedBadgeIds.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Card */}
        <div className="bg-blue-900 p-6 rounded-2xl shadow-lg text-white flex flex-col justify-between">
           <div>
             <h3 className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-1">Active Track</h3>
             <h2 className="text-2xl font-bold">Certificate {progress.currentCertificate} Exam</h2>
           </div>
           <div className="mt-8">
             <div className="flex justify-between text-xs mb-1">
               <span>Readiness</span>
               <span>{Math.min(100, Math.round(completionRate * 1.5))}%</span>
             </div>
             <div className="w-full bg-blue-800 rounded-full h-1.5">
               <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: `${Math.min(100, completionRate * 1.5)}%` }}></div>
             </div>
           </div>
           <p className="text-[10px] text-blue-300 mt-4 italic">Finish all Specialized topics to unlock the Final Mock Exam.</p>
        </div>
      </div>

      {/* Badges Gallery */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <span className="mr-2">🏅</span> Achievement Gallery
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
          {BADGES.map((badge) => {
            const isEarned = progress.earnedBadgeIds.includes(badge.id);
            return (
              <div 
                key={badge.id} 
                className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all group ${
                  isEarned ? 'border-orange-100 bg-orange-50' : 'border-gray-50 opacity-40 grayscale'
                }`}
              >
                <span className={`text-4xl mb-3 transition-transform ${isEarned ? 'group-hover:scale-125' : ''}`}>
                  {badge.icon}
                </span>
                <span className="text-[10px] font-black uppercase text-center text-gray-800 leading-tight">
                  {badge.name}
                </span>
                <p className="text-[8px] text-gray-500 text-center mt-1 font-medium">{badge.condition}</p>
                {!isEarned && (
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                    <div className="bg-gray-400 h-full w-0"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz History */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Quiz Records</h2>
        {Object.keys(progress.quizHighScores).length > 0 ? (
          <div className="space-y-3">
            {Object.entries(progress.quizHighScores).map(([topic, score]) => (
              <div key={topic} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-50 last:border-0">
                <div className="flex items-center">
                   <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600 mr-3">✓</div>
                   <span className="text-sm font-semibold text-gray-700 capitalize">{topic}</span>
                </div>
                <div className="flex items-center space-x-4">
                   <span className="text-xs text-gray-400">High Score</span>
                   <span className="text-lg font-bold text-blue-900">{score}/5</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm italic">No mock exams attempted yet.</p>
        )}
      </div>
    </div>
  );
};
