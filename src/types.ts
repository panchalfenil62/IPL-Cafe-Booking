export interface Match {
  id: string;
  team1: { name: string; logo: string; color: string };
  team2: { name: string; logo: string; color: string };
  date: string;
  time: string;
  venue: string;
  offer: string;
}

export interface Combo {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  tag?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
  avatar: string;
}
