'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Users, Lightbulb } from 'lucide-react';

const empowermentPrograms = [
  {
    title: 'Youth Leadership Academy',
    description: 'Comprehensive leadership training program equipping young Liberians with governance, entrepreneurship, and civic engagement skills.',
    participants: '500+ graduates',
    impact: '85% employment rate',
    icon: GraduationCap,
  },
  {
    title: 'Women\'s Economic Empowerment',
    description: 'Nationwide program providing legal aid, business training, and financial literacy to women entrepreneurs.',
    participants: '2,000+ women',
    impact: '$500K+ in micro-loans',
    icon: Briefcase,
  },
  {
    title: 'Community Mentorship Network',
    description: 'Peer-to-peer mentorship program connecting experienced leaders with emerging talent across Liberia.',
    participants: '1,000+ connections',
    impact: '60% career advancement',
    icon: Users,
  },
  {
    title: 'Innovation Hub',
    description: 'Technology and innovation center fostering entrepreneurship and digital skills development.',
    participants: '300+ startups',
    impact: '$2M+ in funding secured',
    icon: Lightbulb,
  },
];

const successStories = [
  {
    name: 'Sarah Johnson',
    role: 'Youth Leader & Entrepreneur',
    story: 'Through the Youth Leadership Academy, Sarah developed the skills to launch her own tech startup, creating jobs for 15 young Liberians.',
    achievement: 'Founded successful tech company, employs 15 people',
  },
  {
    name: 'Mary Williams',
    role: 'Women\'s Rights Advocate',
    story: 'With support from the Women\'s Economic Empowerment program, Mary established a cooperative that now serves 200 women farmers.',
    achievement: 'Built cooperative serving 200 women farmers',
  },
  {
    name: 'David Brown',
    role: 'Community Organizer',
    story: 'The mentorship program connected David with experienced leaders, enabling him to launch community development initiatives.',
    achievement: 'Launched 5 community development projects',
  },
];

const empowermentStats = [
  { label: 'Youth Trained', value: '5,000+', description: 'Young leaders equipped with skills for national development' },
  { label: 'Women Empowered', value: '3,000+', description: 'Women supported through economic and leadership programs' },
  { label: 'Jobs Created', value: '1,200+', description: 'Employment opportunities generated through entrepreneurship initiatives' },
  { label: 'Communities Served', value: '150+', description: 'Local communities reached through development programs' },
];

export default function YouthEmpowerment() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16">
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-brand-800 via-brand-900 to-brand-900 opacity-90" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass backdrop-blur-xl">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Women & Youth Empowerment</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">Dedicated hub for empowering the next generation of Liberian leaders.</h1>
            <p className="text-lg leading-8 text-slate-300">
              Comprehensive programs and initiatives designed to build capacity, create opportunities, and foster sustainable development through youth and women empowerment.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Empowerment Programs</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Transformative initiatives driving change</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {empowermentPrograms.map((program, index) => {
              const Icon = program.icon;
              return (
                <motion.div
                  key={program.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gold/10 text-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{program.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{program.description}</p>
                  <div className="mt-6 flex items-center justify-between text-sm">
                    <span className="text-gold">{program.participants}</span>
                    <span className="text-slate-400">{program.impact}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Success Stories</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Real impact from empowered individuals</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {successStories.map((story, index) => (
              <motion.article
                key={story.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl"
              >
                <div>
                  <h3 className="text-xl font-semibold text-white">{story.name}</h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.3em] text-gold">{story.role}</p>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-300">{story.story}</p>
                <p className="mt-6 text-sm font-medium text-slate-400">{story.achievement}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Impact Statistics</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Measurable outcomes from empowerment initiatives</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {empowermentStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.06 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl text-center"
              >
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
                <p className="mt-4 text-sm leading-6 text-slate-300">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}