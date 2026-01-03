
import React from 'react';

interface IllustrationProps {
  illustrationKey: string;
}

export const TopicIllustration: React.FC<IllustrationProps> = ({ illustrationKey }) => {
  switch (illustrationKey) {
    case 'drill_formations':
      return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-inner">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Formation Schematic: Line & Column</h4>
          <div className="flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0">
            {/* Line Formation */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-blue-600 mb-2">LINE (Rank)</span>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-6 h-6 bg-blue-900 rounded-sm flex items-center justify-center text-[8px] text-white">C</div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-2">Side-by-side arrangement</p>
            </div>
            {/* Column Formation */}
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-bold text-red-600 mb-2">COLUMN (File)</span>
              <div className="flex flex-col space-y-2">
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="w-6 h-6 bg-red-800 rounded-sm flex items-center justify-center text-[8px] text-white">C</div>
                ))}
              </div>
              <p className="text-[10px] text-gray-400 mt-2">One behind another</p>
            </div>
          </div>
        </div>
      );

    case 'rifle_parts':
      return (
        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">.22 Rifle Key Components</h4>
          <div className="relative h-40 bg-white rounded-lg border border-dashed border-gray-200 flex items-center justify-center">
             <div className="w-4/5 h-2 bg-gray-800 rounded-full relative">
                {/* Barrel */}
                <div className="absolute top-0 left-0 w-3/4 h-full bg-gray-700 rounded-l-full"></div>
                {/* Butt */}
                <div className="absolute top-[-10px] right-0 w-24 h-12 bg-amber-800 rounded-r-lg"></div>
                {/* Sight */}
                <div className="absolute top-[-4px] left-10 w-2 h-2 bg-gray-900"></div>
                <div className="absolute top-[-4px] right-32 w-2 h-2 bg-gray-900"></div>
                
                {/* Labels */}
                <div className="absolute top-[-25px] left-10 text-[8px] font-bold text-gray-500">Muzzle</div>
                <div className="absolute top-4 right-32 text-[8px] font-bold text-gray-500">Trigger Guard</div>
                <div className="absolute top-[-25px] right-5 text-[8px] font-bold text-gray-500">Butt Plate</div>
             </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
             <div className="p-2 bg-white rounded text-[10px] border border-gray-100"><strong>Calibre:</strong> .22 inch</div>
             <div className="p-2 bg-white rounded text-[10px] border border-gray-100"><strong>Length:</strong> 43 inches</div>
          </div>
        </div>
      );

    case 'map_signs':
      return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Conventional Map Symbols</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: 'Temple', icon: '🛕', color: 'bg-orange-50' },
              { name: 'Bridge', icon: '🌉', color: 'bg-blue-50' },
              { name: 'Fort', icon: '🏰', color: 'bg-red-50' },
              { name: 'Orchard', icon: '🌳', color: 'bg-green-50' },
              { name: 'P.O', icon: '📮', color: 'bg-gray-50' },
              { name: 'T.O', icon: '📠', color: 'bg-gray-50' },
              { name: 'Spring', icon: '⛲', color: 'bg-blue-50' },
              { name: 'Church', icon: '⛪', color: 'bg-purple-50' }
            ].map((item, idx) => (
              <div key={idx} className={`${item.color} p-4 rounded-xl flex flex-col items-center justify-center border border-current opacity-20`}>
                <span className="text-2xl mb-1">{item.icon}</span>
                <span className="text-[10px] font-bold text-gray-700">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 'leadership_traits':
      return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100">
           <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">The Leadership Pillar</h4>
           <div className="flex justify-center items-center py-4">
              <div className="relative w-48 h-48 flex items-center justify-center">
                 <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse opacity-20"></div>
                 <div className="w-24 h-24 bg-blue-900 rounded-full flex items-center justify-center text-white font-black text-xs z-10 shadow-xl">LEADER</div>
                 {/* Trait Satellites */}
                 <div className="absolute top-0 w-full text-center text-[8px] font-black text-blue-900 uppercase">Courage</div>
                 <div className="absolute bottom-0 w-full text-center text-[8px] font-black text-blue-900 uppercase">Endurance</div>
                 <div className="absolute left-0 h-full flex items-center text-[8px] font-black text-blue-900 uppercase -rotate-90 origin-center">Decisiveness</div>
                 <div className="absolute right-0 h-full flex items-center text-[8px] font-black text-blue-900 uppercase rotate-90 origin-center">Integrity</div>
              </div>
           </div>
        </div>
      );

    case 'map_unity':
      return (
        <div className="bg-indigo-900 p-8 rounded-2xl text-white relative overflow-hidden">
           <div className="relative z-10 flex flex-col items-center">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 text-indigo-300">National Integration</h4>
              <div className="text-5xl mb-6">🇮🇳</div>
              <div className="grid grid-cols-2 gap-4 w-full">
                 <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-[10px] font-bold text-indigo-200">Diversity</p>
                    <p className="text-[9px] mt-1 opacity-70 italic">Religion, Language, Culture</p>
                 </div>
                 <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm border border-white/10">
                    <p className="text-[10px] font-bold text-indigo-200">Unity</p>
                    <p className="text-[9px] mt-1 opacity-70 italic">National Identity, Goals</p>
                 </div>
              </div>
           </div>
           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"></div>
        </div>
      );

    default:
      return (
        <div className="bg-gray-50 p-10 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400">
           <span className="text-sm italic">Detailed visual coming soon for this module.</span>
        </div>
      );
  }
};
