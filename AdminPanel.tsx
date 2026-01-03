
import React, { useState } from 'react';
import { Video, CertificateType } from '../types';

interface AdminPanelProps {
  onAddVideo: (video: Video) => void;
  videos: Video[];
  onDeleteVideo: (id: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onAddVideo, videos, onDeleteVideo }) => {
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [category, setCategory] = useState('Drill');
  const [levels, setLevels] = useState<CertificateType[]>([CertificateType.B]);

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ytId = extractYoutubeId(youtubeUrl);
    if (!ytId) {
      alert("Invalid YouTube URL");
      return;
    }

    const newVideo: Video = {
      id: Date.now().toString(),
      title,
      youtubeId: ytId,
      category,
      certificateLevel: levels
    };

    onAddVideo(newVideo);
    setTitle('');
    setYoutubeUrl('');
    alert("Video added successfully!");
  };

  const toggleLevel = (level: CertificateType) => {
    if (levels.includes(level)) {
      setLevels(levels.filter(l => l !== level));
    } else {
      setLevels([...levels, level]);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Study Video</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Map Reading Basics for B Certificate"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
            <input
              type="text"
              required
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
              >
                <option>Drill</option>
                <option>Weapon Training</option>
                <option>National Integration</option>
                <option>Map Reading</option>
                <option>Leadership</option>
                <option>Social Service</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Certificates</label>
              <div className="flex space-x-2 pt-2">
                {[CertificateType.A, CertificateType.B, CertificateType.C].map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => toggleLevel(l)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                      levels.includes(l) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Level {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-900 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Add Video to Resources
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Manage Current Videos ({videos.length})</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Levels</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {videos.map((v) => (
                <tr key={v.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{v.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{v.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {v.certificateLevel.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => onDeleteVideo(v.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
