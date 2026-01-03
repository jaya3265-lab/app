
export enum CertificateType {
  A = 'A',
  B = 'B',
  C = 'C'
}

export interface Video {
  id: string;
  title: string;
  youtubeId: string;
  category: string;
  certificateLevel: CertificateType[];
}

export interface StudyTopic {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'Common' | 'Specialized';
  illustrationKey?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  condition: string;
}

export interface UserProgress {
  completedTopicIds: string[];
  quizHighScores: Record<string, number>;
  earnedBadgeIds: string[];
  currentCertificate: CertificateType;
}

export type UserRole = 'cadet' | 'instructor';
