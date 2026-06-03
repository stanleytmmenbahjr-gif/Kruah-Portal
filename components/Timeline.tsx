'use client';

import { motion } from 'framer-motion';
import { Award, CalendarDays, Globe, Sparkles } from 'lucide-react';

const timelineEvents = [
  {
    year: '2024',
    title: 'Minister of Youth and Sports',
    description: 'Leading national youth strategy, sports development, and inclusive civic programs.',
    image: '/images/image.png',
    icon: Globe,
  },
  {
    year: '2022',
    title: 'National Vice Chair, Unity Party',
    description: 'Strengthening political engagement, policy direction, and party inclusiveness.',
    image: '/images/biography.jpg',
    icon: Award,
  },
  {
    year: '2020',
    title: 'Legal Counsel & Policy Advisor',
    description: 'Providing governance counsel and rights-based advocacy for public institutions.',
    image: '/images/image.png',
    icon: Sparkles,
  },
  {
    year: '2018',
    title: 'Youth Empowerment Initiatives',
    description: 'Launched mentorship programs and leadership forums for Liberia’s next generation.',
    image: '/images/biography.jpg',
    icon: CalendarDays,
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="border-t border-white/10 px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-gold">Leadership journey</p>
          <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Expanded timeline of strategic leadership.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">
            A visual record of Cornelia’s most important milestones, from legal leadership to national youth empowerment.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block">
            <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
          </div>

          <div className="space-y-10">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`grid gap-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glass backdrop-blur-xl lg:grid-cols-[0.55fr_0.45fr] ${index % 2 !== 0 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                <div className="relative overflow-hidden rounded-[2rem] bg-cover bg-center" style={{ backgroundImage: `url(${event.image})` }}>
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="relative p-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gold/10 text-gold">
                      <event.icon className="h-7 w-7" />
                    </div>
                    <p className="mt-5 text-sm uppercase tracking-[0.3em] text-white/80">{event.year}</p>
                    <h3 className="mt-3 text-2xl font-semibold text-white">{event.title}</h3>
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-[2rem] bg-brand-900/75 p-8">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-gold">Milestone</p>
                    <p className="mt-4 text-lg leading-8 text-slate-200">{event.description}</p>
                  </div>
                  <div className="mt-8 flex items-center gap-3 text-sm text-slate-400">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold">{index + 1}</span>
                    <span>Core leadership moment with strategic national impact.</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
