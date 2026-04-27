export interface NumberCharacter {
  id: string;
  value: number;
  name: string;
  description: string;
  color: string;
  textColor: string;
  imageUrl?: string;
  isOC?: boolean;
}

export const INITIAL_NUMBERS: NumberCharacter[] = [
  { id: 'n0', value: 0, name: 'Zero', description: 'The beginning of everything.', color: '#FF6B6B', textColor: '#FFFFFF' },
  { id: 'n1', value: 1, name: 'One', description: 'Leader of the pack.', color: '#4ECDC4', textColor: '#FFFFFF' },
  { id: 'n2', value: 2, name: 'Two', description: 'Always looks for a pair.', color: '#45B7D1', textColor: '#FFFFFF' },
  { id: 'n3', value: 3, name: 'Three', description: 'A triangular friend.', color: '#96CEB4', textColor: '#FFFFFF' },
  { id: 'n4', value: 4, name: 'Four', description: 'Stable and square.', color: '#FFEEAD', textColor: '#1A1A1A' },
  { id: 'n5', value: 5, name: 'Five', description: 'High-five master!', color: '#D4A5A5', textColor: '#FFFFFF' },
  { id: 'n6', value: 6, name: 'Six', description: 'A perfect roll.', color: '#9B59B6', textColor: '#FFFFFF' },
  { id: 'n7', value: 7, name: 'Seven', description: 'Lucky streak.', color: '#3498DB', textColor: '#FFFFFF' },
  { id: 'n8', value: 8, name: 'Eight', description: 'Infinity in disguise.', color: '#E67E22', textColor: '#FFFFFF' },
  { id: 'n9', value: 9, name: 'Nine', description: 'The last of the singles.', color: '#E74C3C', textColor: '#FFFFFF' },
  { id: 'n10', value: 10, name: 'Ten', description: 'The ultimate double-digit! Badge by @JOAOPEDROeULIANA.', color: '#2ECC71', textColor: '#FFFFFF', imageUrl: '/artifacts/number_ten_badge.png' },
];

export const OC_NUMBERS: NumberCharacter[] = [
  { id: 'oc1', value: 11, name: 'Eleven', description: 'The mystical twin prime.', color: '#FFD700', textColor: '#1A1A1A', isOC: true },
  { id: 'oc2', value: 12, name: 'Dozen', description: 'A baker\'s delight. Perfect for donuts.', color: '#FF4500', textColor: '#FFFFFF', isOC: true },
  { id: 'oc3', value: '5.7', name: 'Version 5.7', description: 'The legendary update point.', color: '#000000', textColor: '#00FF00', isOC: true },
];
