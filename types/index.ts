export interface Role {
  id: string;
  title: string;
  organization: string;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  description: string;
  category: 'government' | 'legal' | 'political' | 'nonprofit';
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  category: 'education' | 'career' | 'government' | 'advocacy';
  image_url?: string | null;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  organization: string;
  content: string;
  image_url?: string | null;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  published_at: string;
  featured_image?: string | null;
  tags: string[];
}

export interface PressItem {
  id: string;
  title: string;
  outlet: string;
  date: string;
  summary: string;
  link: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at: string;
  read: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  event_type: 'speaking' | 'collaboration' | 'conference';
  registration_link?: string | null;
  capacity?: number | null;
}

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  media_type: 'image' | 'video';
  media_url: string;
  thumbnail_url?: string | null;
  category: 'leadership' | 'community' | 'events' | 'speaking' | 'personal';
  tags: string[];
  featured: boolean;
  created_at: string;
}
