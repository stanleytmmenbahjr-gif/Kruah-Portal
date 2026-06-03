'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Camera } from 'lucide-react';
import { MediaItem } from '../types';

const galleryImages = [
  'community-workshop.jpg',
  'gallery1.jpg',
  'gallery2.jpg',
  'gallery3.jpg',
  'gallery4.jpg',
  'gallery5.jpg',
  'gallery6.jpg',
  'gallery7.jpg',
  'gallery8.jpg',
  'gallery9.jpg',
  'gallery10.jpg',
  'gallery11.jpg',
  'gallery12.jpg',
  'gallery13.jpg',
  'gallery14.jpg',
  'gallery15.jpg',
  'gallery16.jpg',
  'gallery17.jpg',
  'gallery18.jpg',
  'gallery19.jpg',
  'gallery20.jpg',
  'gallery21.jpg',
  'gallery22.jpg',
  'gallery23.jpg',
  'gallery24.jpg',
  'gallery25.jpg',
  'gallery26.jpg',
  'gallery27.jpg',
  'gallery28.jpg',
  'gallery29.jpg',
  'gallery30.jpg',
];

const galleryVideos = [
  {
    filename: 'galleryvideo1.mp4',
    title: 'Gallery Video 1',
    description: 'Video highlight from Cornelia’s leadership journey and community engagement.',
    thumbnail: '/images/gallery/gallery1.jpg',
    category: 'speaking' as const,
    tags: ['video', 'leadership', 'highlight'],
    featured: true,
  },
  {
    filename: 'galleryvideo2.mp4',
    title: 'Gallery Video 2',
    description: 'Video highlight from Cornelia’s leadership journey and community engagement.',
    thumbnail: '/images/gallery/gallery2.jpg',
    category: 'community' as const,
    tags: ['video', 'community', 'highlight'],
    featured: false,
  },
  {
    filename: 'galleryvideo3.mp4',
    title: 'Gallery Video 3',
    description: 'Video highlight from Cornelia’s leadership journey and community engagement.',
    thumbnail: '/images/gallery/gallery3.jpg',
    category: 'events' as const,
    tags: ['video', 'events', 'highlight'],
    featured: false,
  },
  {
    filename: 'galleryvideo4.mp4',
    title: 'Gallery Video 4',
    description: 'Video highlight from Cornelia’s leadership journey and community engagement.',
    thumbnail: '/images/gallery/gallery4.jpg',
    category: 'personal' as const,
    tags: ['video', 'personal', 'highlight'],
    featured: false,
  },
];

const categories_list = ['leadership', 'community', 'events', 'speaking', 'personal'] as const;

const imageItems: MediaItem[] = galleryImages.map((img, index) => ({
  id: String(index + 1),
  title: `Gallery Photo ${index + 1}`,
  description: 'A moment from Cornelia’s leadership journey and community engagement.',
  media_type: 'image',
  media_url: `/images/gallery/${img}`,
  category: categories_list[index % categories_list.length],
  tags: ['leadership', 'community', 'engagement'],
  featured: index < 5,
  created_at: new Date(Date.now() - index * 86400000).toISOString(),
}));

const videoItems: MediaItem[] = galleryVideos.map((video, index) => ({
  id: String(imageItems.length + index + 1),
  title: video.title,
  description: video.description,
  media_type: 'video',
  media_url: `/images/gallery/${video.filename}`,
  thumbnail_url: video.thumbnail,
  category: video.category,
  tags: video.tags,
  featured: video.featured,
  created_at: new Date(Date.now() - (imageItems.length + index) * 86400000).toISOString(),
}));

const mediaItems: MediaItem[] = [...imageItems, ...videoItems];

const categories = [
  { id: 'all', label: 'All Media', icon: Camera },
  { id: 'leadership', label: 'Leadership', icon: Camera },
  { id: 'community', label: 'Community', icon: Camera },
  { id: 'events', label: 'Events', icon: Camera },
  { id: 'speaking', label: 'Speaking', icon: Camera },
  { id: 'personal', label: 'Personal', icon: Camera },
];

interface LightboxProps {
  item: MediaItem | null;
  onClose: () => void;
}

function Lightbox({ item, onClose }: LightboxProps) {
  if (!item) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-[2rem] bg-white/5 shadow-glass backdrop-blur-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            aria-label="Close gallery lightbox"
            className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="relative">
            {item.media_type === 'video' ? (
              <video
                src={item.media_url}
                poster={item.thumbnail_url || undefined}
                controls
                className="max-h-[80vh] max-w-full object-contain"
              />
            ) : (
              <img
                src={item.media_url}
                alt={item.title}
                className="max-h-[80vh] max-w-full object-contain"
              />
            )}
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-slate-300">{item.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs text-gold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);

  const filteredItems = selectedCategory === 'all'
    ? mediaItems
    : mediaItems.filter(item => item.category === selectedCategory);

  const featuredItems = mediaItems.filter(item => item.featured);

  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16">
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-brand-800 via-brand-900 to-brand-900 opacity-90" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass backdrop-blur-xl">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Gallery & Media</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">Photo and video portfolio showcasing leadership in action.</h1>
            <p className="text-lg leading-8 text-slate-300">
              A curated collection of moments from community engagements, leadership forums, speaking events, and transformative initiatives across Liberia and beyond.
            </p>
          </div>
        </div>

        {/* Featured Gallery */}
        <div className="mb-16">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Featured Media</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Highlights from key moments</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="group cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-glass backdrop-blur-xl transition hover:-translate-y-1 hover:border-gold/50"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.thumbnail_url || item.media_url}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  {item.media_type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="rounded-full bg-gold/90 p-4 text-black">
                        <Play className="h-8 w-8" />
                      </div>
                    </div>
                  )}
                  <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-brand-900/80 px-3 py-1 text-xs uppercase tracking-[0.3em] text-gold">
                    Featured
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white group-hover:text-gold transition">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300 line-clamp-2">{item.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-gold">
                    <span className="uppercase tracking-[0.3em]">View Media</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition ${
                    selectedCategory === category.id
                      ? 'border-gold bg-gold text-black'
                      : 'border-white/10 bg-white/5 text-white hover:border-gold/50 hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.06 }}
              className="group cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-glass backdrop-blur-xl transition hover:-translate-y-1 hover:border-gold/50"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.thumbnail_url || item.media_url}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                {item.media_type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="rounded-full bg-gold/90 p-3 text-black">
                      <Play className="h-6 w-6" />
                    </div>
                  </div>
                )}
                <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-brand-900/80 px-2 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
                  {item.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white group-hover:text-gold transition line-clamp-1">{item.title}</h3>
                <p className="mt-2 text-sm leading-5 text-slate-300 line-clamp-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} />
      </div>
    </section>
  );
}