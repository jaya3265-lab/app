
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { AdminPanel } from './components/AdminPanel';
import { Quiz } from './components/Quiz';
import { CadetDashboard } from './components/CadetDashboard';
import { TopicIllustration } from './components/TopicIllustration';
import { NCC_TOPICS, INITIAL_VIDEOS, BADGES } from './constants';
import { Video, StudyTopic, UserProgress, CertificateType, UserRole } from './types';
import { explainTopic } from './services/geminiService';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('cadet');
  const [activeView, setActiveView] = useState<'home' | 'study' | 'quiz' | 'admin' | 'dashboard'>('home');
  const [videos, setVideos] = useState<Video[]>(INITIAL_VIDEOS);
  const [selectedTopic, setSelectedTopic] = useState<StudyTopic | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);

  // User Progress State
  const [progress, setProgress] = useState<UserProgress>({
    completedTopicIds: [],
    quizHighScores: {},
    earnedBadgeIds: [],
    currentCertificate: CertificateType.B
  });

  // Persistence
  useEffect(() => {
    const savedVideos = localStorage.getItem('ncc_videos');
    if (savedVideos) setVideos(JSON.parse(savedVideos));

    const savedProgress = localStorage.getItem('ncc_progress');
    if (savedProgress) setProgress(JSON.parse(savedProgress));

    const savedRole = localStorage.getItem('ncc_role');
    if (savedRole) setRole(savedRole as UserRole);
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('ncc_progress', JSON.stringify(newProgress));
  };

  const handleToggleRole = () => {
    const newRole = role === 'cadet' ? 'instructor' : 'cadet';
    setRole(newRole);
    localStorage.setItem('ncc_role', newRole);
    if (newRole === 'cadet' && activeView === 'admin') setActiveView('home');
  };

  const handleAddVideo = (v: Video) => {
    const updated = [v, ...videos];
    setVideos(updated);
    localStorage.setItem('ncc_videos', JSON.stringify(updated));
  };

  const handleDeleteVideo = (id: string) => {
    const updated = videos.filter(v => v.id !== id);
    setVideos(updated);
    localStorage.setItem('ncc_videos', JSON.stringify(updated));
  };

  const completeTopic = (topicId: string) => {
    if (progress.completedTopicIds.includes(topicId)) return;
    
    const updatedTopicIds = [...progress.completedTopicIds, topicId];
    const newEarnedBadgeIds = [...progress.earnedBadgeIds];

    if (updatedTopicIds.length === 1 && !newEarnedBadgeIds.includes('first-steps')) {
      newEarnedBadgeIds.push('first-steps');
    }

    const commonTopics = NCC_TOPICS.filter(t => t.category === 'Common').map(t => t.id);
    const completedCommon = commonTopics.every(id => updatedTopicIds.includes(id));
    if (completedCommon && !newEarnedBadgeIds.includes('scholar')) {
      newEarnedBadgeIds.push('scholar');
    }

    if (topicId === 'map-reading' && !newEarnedBadgeIds.includes('tactical')) {
      newEarnedBadgeIds.push('tactical');
    }

    saveProgress({
      ...progress,
      completedTopicIds: updatedTopicIds,
      earnedBadgeIds: newEarnedBadgeIds
    });
  };

  const handleQuizComplete = (topic: string, score: number) => {
    const currentHigh = progress.quizHighScores[topic] || 0;
    const newHighScores = { ...progress.quizHighScores };
    if (score > currentHigh) newHighScores[topic] = score;

    const newEarnedBadgeIds = [...progress.earnedBadgeIds];
    if (score === 5 && !newEarnedBadgeIds.includes('marksman')) {
      newEarnedBadgeIds.push('marksman');
    }

    saveProgress({
      ...progress,
      quizHighScores: newHighScores,
      earnedBadgeIds: newEarnedBadgeIds
    });
  };

  const fetchExplanation = async (topic: StudyTopic) => {
    setIsExplaining(true);
    setSelectedTopic(topic);
    setAiExplanation(null);
    try {
      const explanation = await explainTopic(topic.title);
      setAiExplanation(explanation);
    } catch (err) {
      setAiExplanation("Error retrieving AI explanation.");
    } finally {
      setIsExplaining(false);
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'home':
        return (
          <div className="space-y-8 md:space-y-12 pb-24 md:pb-20">
            <div className="ncc-gradient text-white py-12 md:py-20 px-4 rounded-3xl overflow-hidden relative shadow-xl">
              <div className="relative z-10 text-center max-w-4xl mx-auto">
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold mb-4 tracking-wider">
                  KERALA DTE • OFFICIAL TRAINING APP
                </div>
                <h1 className="text-3xl md:text-6xl font-black mb-4 md:mb-6 tracking-tight leading-tight">
                  UNITY AND <br className="md:hidden"/> DISCIPLINE
                </h1>
                <p className="text-sm md:text-2xl text-blue-100 mb-8 font-light max-w-2xl mx-auto opacity-90 px-4">
                  Master your Certificate A, B & C exams with AI-driven insights and interactive field modules.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 px-4">
                  <button 
                    onClick={() => setActiveView('study')}
                    className="bg-white text-blue-900 px-8 py-3.5 rounded-2xl font-bold shadow-lg active:scale-95 transition-all text-sm md:text-base"
                  >
                    Start Training
                  </button>
                  <button 
                    onClick={() => setActiveView('dashboard')}
                    className="bg-blue-600/30 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 rounded-2xl font-bold shadow-lg active:scale-95 transition-all text-sm md:text-base"
                  >
                    My Analytics 📊
                  </button>
                </div>
              </div>
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
               {[
                 { label: 'Modules', val: NCC_TOPICS.length, icon: '📚' },
                 { label: 'Videos', val: videos.length, icon: '🎥' },
                 { label: 'Cleared', val: progress.completedTopicIds.length, icon: '✅' },
                 { label: 'Badges', val: progress.earnedBadgeIds.length, icon: '🎖️' },
               ].map((item, idx) => (
                 <div key={idx} className="bg-white p-4 md:p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-center">
                    <span className="text-2xl md:text-3xl mb-1">{item.icon}</span>
                    <span className="text-xl md:text-2xl font-black text-gray-800">{item.val}</span>
                    <span className="text-[9px] md:text-[10px] text-gray-400 font-bold uppercase tracking-wide">{item.label}</span>
                 </div>
               ))}
            </div>

            <section className="px-1">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">Handpicked Tutorials</h2>
                  <p className="text-xs text-gray-400">Essential field training videos</p>
                </div>
                <button onClick={() => setActiveView('study')} className="text-blue-600 font-bold text-xs hover:underline">View All &rarr;</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {videos.slice(0, 3).map((video) => (
                  <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                    <div className="aspect-video relative bg-gray-900">
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${video.youtubeId}`}
                        title={video.title}
                        allowFullScreen
                      ></iframe>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-[9px] font-bold uppercase rounded-md tracking-tight">
                          {video.category}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-blue-900 transition-colors">{video.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      case 'study':
        return (
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 pb-24 md:pb-20">
            <div className="w-full lg:w-1/3 space-y-3">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 px-1">Subjects</h2>
              <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar pb-2 lg:pb-0 space-x-3 lg:space-x-0 lg:space-y-3">
                {NCC_TOPICS.map((topic) => {
                  const isCompleted = progress.completedTopicIds.includes(topic.id);
                  const isActive = selectedTopic?.id === topic.id;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => fetchExplanation(topic)}
                      className={`flex-shrink-0 lg:w-full text-left p-4 rounded-2xl border-2 transition-all min-w-[240px] lg:min-w-0 ${
                        isActive ? 'border-blue-900 bg-blue-50 shadow-md' : 'border-gray-50 bg-white shadow-sm'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <h3 className={`font-bold text-sm ${isActive ? 'text-blue-900' : 'text-gray-900'}`}>{topic.title}</h3>
                        {isCompleted && <span className="text-green-500">●</span>}
                      </div>
                      <p className="text-[10px] text-gray-400 line-clamp-1">{topic.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
            
            <div className="w-full lg:w-2/3">
              {selectedTopic ? (
                <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in">
                  <div className="ncc-gradient p-6 md:p-10 text-white">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-blue-200 mb-2">Subject Module</div>
                    <h2 className="text-2xl md:text-4xl font-black mb-6">{selectedTopic.title}</h2>
                    <div className="flex flex-wrap items-center gap-3">
                       {progress.completedTopicIds.includes(selectedTopic.id) ? (
                         <div className="bg-green-500 text-white px-4 py-1.5 rounded-xl text-[10px] font-bold flex items-center shadow-lg">
                            CLEARED ✅
                         </div>
                       ) : (
                         <button 
                           onClick={() => completeTopic(selectedTopic.id)}
                           className="bg-white text-blue-900 px-4 py-1.5 rounded-xl text-[10px] font-bold hover:bg-blue-50 transition-colors shadow-lg active:scale-95"
                         >
                           MARK COMPLETED 🏁
                         </button>
                       )}
                       <button onClick={() => setActiveView('quiz')} className="bg-blue-800/50 hover:bg-blue-800 text-white px-4 py-1.5 rounded-xl text-[10px] font-bold transition-colors border border-white/10">
                          PRACTICE QUIZ 🎯
                       </button>
                    </div>
                  </div>
                  <div className="p-6 md:p-10 space-y-8 md:space-y-10">
                    {selectedTopic.illustrationKey && (
                      <section>
                         <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-widest opacity-50">Visual Aid</h3>
                         <TopicIllustration illustrationKey={selectedTopic.illustrationKey} />
                      </section>
                    )}

                    <section>
                      <h3 className="text-sm font-bold text-gray-800 mb-4 uppercase tracking-widest opacity-50">Lesson Notes</h3>
                      <div className="bg-gray-50 p-6 rounded-2xl text-gray-700 text-sm leading-relaxed border border-gray-100">
                        {selectedTopic.content}
                      </div>
                    </section>

                    <section className="bg-blue-50/30 p-6 rounded-2xl border border-blue-50">
                      <div className="flex items-center mb-4 text-blue-900">
                         <span className="w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center mr-2 text-xs">✨</span>
                         <h3 className="text-sm font-black uppercase tracking-widest">AI Summary</h3>
                      </div>
                      {isExplaining ? (
                        <div className="space-y-2 animate-pulse">
                          <div className="h-3 bg-blue-100 rounded w-full"></div>
                          <div className="h-3 bg-blue-100 rounded w-5/6"></div>
                          <div className="h-3 bg-blue-100 rounded w-4/6"></div>
                        </div>
                      ) : (
                        <div className="text-gray-600 text-xs md:text-sm leading-relaxed whitespace-pre-line">
                          {aiExplanation || "Click to generate breakdown."}
                        </div>
                      )}
                    </section>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-12 md:p-20 bg-white rounded-3xl border-2 border-dashed border-gray-100 text-gray-400">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">⚓</div>
                  <h3 className="text-xl font-bold text-gray-600">Choose a Module</h3>
                  <p className="mt-2 text-xs">Select a subject to begin your training session.</p>
                </div>
              )}
            </div>
          </div>
        );
      case 'quiz':
        return <div className="pb-24 md:pb-20"><Quiz onQuizComplete={handleQuizComplete} /></div>;
      case 'dashboard':
        return <div className="pb-24 md:pb-20"><CadetDashboard progress={progress} /></div>;
      case 'admin':
        return <div className="pb-24 md:pb-20"><AdminPanel onAddVideo={handleAddVideo} videos={videos} onDeleteVideo={handleDeleteVideo} /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfe]">
      <Navbar 
        role={role} 
        activeView={activeView} 
        onNavigate={setActiveView} 
        onToggleRole={handleToggleRole} 
      />
      
      <main className="flex-grow max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 md:py-8 w-full">
        {renderContent()}
      </main>

      <footer className="bg-gray-950 text-gray-500 py-12 md:py-16 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="mb-2 text-white font-bold tracking-[0.2em] text-sm uppercase">KERALA DTE NCC ACADEMY</p>
          <p className="text-[10px] max-w-sm mx-auto opacity-50">Empowering future leaders through digital training.</p>
          <div className="mt-8 pt-6 border-t border-gray-900 text-[10px]">
            &copy; {new Date().getFullYear()} Kerala NCC Portal. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
