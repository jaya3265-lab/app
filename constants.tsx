
import { StudyTopic, CertificateType, Video, Badge } from './types';

export const NCC_TOPICS: StudyTopic[] = [
  {
    id: 'drill',
    title: 'Drill with Arms and Without Arms',
    category: 'Common',
    description: 'The foundation of discipline in the NCC.',
    content: 'Drill is defined as being instructed in military exercises which involve movements in unison. Principles of Drill: Smartness, Steadiness, and Coordination.',
    illustrationKey: 'drill_formations'
  },
  {
    id: 'weapon-training',
    title: 'Weapon Training (.22 Rifle)',
    category: 'Common',
    description: 'Characteristics and handling of the .22 Deluxe Rifle.',
    content: 'The .22 Deluxe Rifle is used for target practice. Calibre: .22 inch, Weight: 8 lbs 10 oz, Length: 43 inches, Mag capacity: 5 rounds.',
    illustrationKey: 'rifle_parts'
  },
  {
    id: 'nat-int',
    title: 'National Integration',
    category: 'Common',
    description: 'Unity in diversity and the role of NCC.',
    content: 'National Integration means the feeling of togetherness and unity among the people of a country. Factors affecting national integration: Casteism, Communalism, Regionalism.',
    illustrationKey: 'map_unity'
  },
  {
    id: 'map-reading',
    title: 'Map Reading',
    category: 'Specialized',
    description: 'Understanding conventional signs and navigation.',
    content: 'A map is a representation of a portion of the earth’s surface. Types of North: True North, Magnetic North, Grid North.',
    illustrationKey: 'map_signs'
  },
  {
    id: 'leadership',
    title: 'Leadership & Personality Development',
    category: 'Common',
    description: 'Traits of a good leader and self-improvement.',
    content: 'Leadership is the art of influencing others to accomplish a mission. Traits: Alertness, Courage, Decisiveness, Dependability, Endurance, Enthusiasm, Initiative.',
    illustrationKey: 'leadership_traits'
  }
];

export const INITIAL_VIDEOS: Video[] = [
  {
    id: 'v1',
    title: 'NCC Drill Commands Explained',
    youtubeId: 'q6v2Yn0mHSw',
    category: 'Drill',
    certificateLevel: [CertificateType.A, CertificateType.B]
  },
  {
    id: 'v2',
    title: 'Weapon Training: .22 Rifle Handling',
    youtubeId: 'fN_3j6yX3Ww',
    category: 'Weapon Training',
    certificateLevel: [CertificateType.B, CertificateType.C]
  }
];

export const BADGES: Badge[] = [
  {
    id: 'first-steps',
    name: 'Diligent Cadet',
    icon: '🎖️',
    description: 'Complete your first study topic.',
    condition: 'Complete 1 Topic'
  },
  {
    id: 'marksman',
    name: 'Top Scorer',
    icon: '🎯',
    description: 'Score 100% on any AI Mock Quiz.',
    condition: 'Perfect Quiz Score'
  },
  {
    id: 'scholar',
    name: 'Training Scholar',
    icon: '📖',
    description: 'Complete all Common subjects topics.',
    condition: 'All Common Topics'
  },
  {
    id: 'tactical',
    name: 'Tactical Expert',
    icon: '🧭',
    description: 'Complete the Map Reading specialized module.',
    condition: 'Complete Map Reading'
  }
];
