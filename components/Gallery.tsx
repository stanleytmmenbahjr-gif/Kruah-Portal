'use client';

import { motion } from 'framer-motion';

const galleryItems = [
  { src: '/images/gallery/leadership-keynote.jpg', label: 'Leadership Keynote' },
  { src: '/images/gallery/portrait-session.jpg', label: 'Executive Portrait' },
  { src: '/images/gallery/cultural-ceremony.jpg', label: 'Community Workshop' },
  { src: '/images/gallery/conference-hall.jpg', label: 'Youth Summit Hall' },
  { src: '/images/gallery/ministry-partnership.jpg', label: 'Ministry Partnership' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="border-t border-white/10 px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Gallery & media</p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Visual stories from leadership in action.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Select highlights from Cornelia’s public engagements, mentorship sessions, and strategic forums.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {galleryItems.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-glass backdrop-blur-xl"
            >
              <div className="relative h-72 bg-cover bg-center transition duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${item.src})` }} />
              <div className="p-6">
                <p className="text-lg font-semibold text-white">{item.label}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">A visual highlight from Cornelia’s leadership portfolio.</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
