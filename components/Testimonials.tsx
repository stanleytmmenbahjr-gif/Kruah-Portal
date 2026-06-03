'use client';

import { motion } from 'framer-motion';
import { PlayCircle, MessageCircle, HeartHandshake, Globe } from 'lucide-react';

const testimonials = [
  {
    name: 'Ellen Johnson Sirleaf',
    title: 'Former President of Liberia',
    quote: 'Cornelia combines legal rigor with visionary leadership to inspire youth, women, and national transformation.',
    initials: 'EJS',
    color: 'from-amber-500 to-orange-500',
  },
  {
    name: 'Sam Powell',
    title: 'Youth Movement Leader',
    quote: 'Her policy work is grounded, practical, and deeply committed to Liberia’s future.',
    initials: 'SP',
    color: 'from-cyan-400 to-blue-500',
  },
  {
    name: 'Alicia Kwarteng',
    title: 'Advocacy Partner',
    quote: 'Cornelia has built a trusted platform where community impact meets national strategy.',
    initials: 'AK',
    color: 'from-fuchsia-500 to-violet-500',
  },
];

const mediaStories = [
  {
    label: 'Leadership in action',
    description: 'A short visual recap of Cornelia’s youth empowerment initiatives and policy forums.',
  },
  {
    label: 'Policy voices',
    description: 'Highlighted moments from national events, interviews, and advocacy sessions.',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-t border-white/10 px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Testimonials & Media</p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Praise from national leaders and strategic partners.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            Trusted recommendations and media highlights that reinforce Cornelia’s leadership credibility and public impact.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.95fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-gold">Featured story</p>
                <h3 className="mt-3 text-3xl font-semibold text-white">Youth empowerment through national dialogue.</h3>
              </div>
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gold/10 text-gold">
                <PlayCircle className="h-8 w-8" />
              </div>
            </div>

            <div className="mt-10 space-y-6">
              <div className="h-72 overflow-hidden rounded-[2rem] bg-black/80 text-white shadow-inner">
                <video
                  className="h-full w-full object-cover"
                  src="/videos/highlight.mp4"
                  controls
                  preload="metadata"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {mediaStories.map((story) => (
                  <div key={story.label} className="rounded-3xl border border-white/10 bg-brand-900/80 p-6">
                    <p className="text-sm uppercase tracking-[0.3em] text-gold">{story.label}</p>
                    <p className="mt-4 text-sm leading-6 text-slate-300">{story.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl"
              >
                <div className="flex items-center gap-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${testimonial.color} text-sm font-semibold text-white`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-slate-400">{testimonial.title}</p>
                  </div>
                </div>
                <p className="mt-6 text-lg leading-8 text-slate-200">“{testimonial.quote}”</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
