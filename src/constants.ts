import { Match, Combo, Feature, Testimonial } from './types';

export const UPCOMING_MATCHES: Match[] = [
  {
    id: '1',
    team1: { name: 'CSK', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/1200px-Chennai_Super_Kings_Logo.svg.png', color: '#FFFF00' },
    team2: { name: 'MI', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/cd/Mumbai_Indians_Logo.svg/1200px-Mumbai_Indians_Logo.svg.png', color: '#004BA0' },
    date: '2026-04-05',
    time: '07:30 PM',
    venue: 'Wankhede Stadium, Mumbai',
    offer: 'Free Mocktail on every 4 & 6!',
  }
];

export const FOOD_COMBOS: Combo[] = [
  {
    id: '1',
    name: 'CSK Whistle Podu Combo',
    description: 'Classic Yellow Paneer Tikka + 2 Mocktails + Masala Fries',
    price: '₹599',
    image: 'https://picsum.photos/seed/csk/400/300',
    tag: 'Best Seller',
  },
  {
    id: '2',
    name: 'MI Powerplay Platter',
    description: 'Blueberry Cheesecake + Loaded Nachos + 2 Cold Coffees',
    price: '₹649',
    image: 'https://picsum.photos/seed/mi/400/300',
    tag: 'Match Special',
  },
  {
    id: '3',
    name: 'RCB Royal Pizza Deal',
    description: '12" Peri Peri Chicken Pizza + Garlic Bread + Coke Pitcher',
    price: '₹799',
    image: 'https://picsum.photos/seed/rcb/400/300',
  },
  {
    id: '4',
    name: 'Couple Match Night Combo',
    description: 'Any 2 Starters + 2 Main Course + 2 Desserts',
    price: '₹1299',
    image: 'https://picsum.photos/seed/couple/400/300',
    tag: 'Premium',
  }
];

export const FEATURES: Feature[] = [
  {
    id: '1',
    title: '120-inch Giant Screen',
    description: 'Crystal clear 4K projection for a stadium-like experience.',
    icon: 'Tv',
  },
  {
    id: '2',
    title: 'Surround Sound',
    description: 'Immersive Dolby Atmos audio that makes you feel the roar of the crowd.',
    icon: 'Volume2',
  },
  {
    id: '3',
    title: 'Team-based Combos',
    description: 'Specially curated food and drink deals for every match day.',
    icon: 'Utensils',
  },
  {
    id: '4',
    title: 'Fast Table Service',
    description: 'Never miss a ball with our dedicated match-day service staff.',
    icon: 'Zap',
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    comment: 'The energy here during the CSK vs MI match was insane! Best screening in Ahmedabad.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=rahul',
  },
  {
    id: '2',
    name: 'Anjali Patel',
    comment: 'Loved the food combos. The giant screen is actually giant! Highly recommended.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=anjali',
  }
];
