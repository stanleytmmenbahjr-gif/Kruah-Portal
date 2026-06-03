'use client';

import { useEffect, useState } from 'react';
import { Globe, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const impactStats = [
  { label: 'Youth Mentored', value: 120, suffix: '+', icon: Users, description: 'Young leaders trained through mentorship programs and national initiatives.' },
  { label: 'Policy Initiatives', value: 18, suffix: '', icon: ShieldCheck, description: 'Legislative and governance efforts shaped for sustainable national impact.' },
  { label: 'Leadership Forums', value: 45, suffix: '+', icon: Globe, description: 'Forums, town halls, and workshops convened to mobilize communities.' },
  { label: 'Years in Service', value: 14, suffix: '+', icon: TrendingUp, description: 'Years of dedicated public service in law, policy, and youth empowerment.' },
];

function useCountUp(end: number, duration = 1200) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const stepTime = Math.max(Math.floor(duration / end), 20);
    const interval = window.setInterval(() => {
      start += 1;
      if (start >= end) {
        window.clearInterval(interval);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => window.clearInterval(interval);
  }, [end, duration]);

  return count;
}

export default function Impact() {
  const tickerItems = [...impactStats, ...impactStats];

  return (
    <section id="impact" className="border-t border-white/10 px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_0.95fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gold">Impact in action</p>
            <h2 className="text-4xl font-semibold text-white sm:text-5xl">Results that reflect national ambition.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Cornelia’s leadership is defined by measurable progress in governance, youth empowerment, legal advocacy, and national collaboration. These metrics show a track record of action and the momentum behind her vision.
            </p>
            <div className="mt-10 rounded-[2rem] border border-gold/20 bg-brand-800/80 p-8 shadow-glass backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-gold">Impact highlight</p>
              <h3 className="mt-4 text-2xl font-semibold text-white">Strategic programs that empower tomorrow’s leaders.</h3>
              <p className="mt-4 text-slate-300">
                From mentorship initiatives to policy advocacy, Cornelia has delivered programs that lift communities and set a new standard for inclusive national leadership.
              </p>
            </div>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {impactStats.map((stat) => (
              <ImpactCard key={stat.label} stat={stat} />
            ))}
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-[2rem] border border-white/10 bg-brand-800/70 py-8 shadow-glass backdrop-blur-xl">
          <div className="relative overflow-hidden px-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand-900/100 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-900/100 to-transparent" />

            <motion.div
              initial={{ x: 0 }}
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
              className="flex min-w-[200%] gap-6 py-4 transform -skew-x-6"
            >
              {tickerItems.map((stat, index) => (
                <div
                  key={`${stat.label}-${index}`}
                  className="min-w-[320px] rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-glass backdrop-blur-xl text-left transform skew-x-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gold/10 text-gold">
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-3xl font-semibold text-white">{stat.value}{stat.suffix}</p>
                      <p className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-sm leading-6 text-slate-300">{stat.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactCard({ stat }: { stat: (typeof impactStats)[number] }) {
  const count = useCountUp(stat.value, 1200);
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gold/10 text-gold">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-3xl font-semibold text-white">{count}{stat.suffix}</p>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-slate-400">{stat.label}</p>
        </div>
      </div>
      <p className="mt-6 text-sm leading-6 text-slate-300">{stat.description}</p>
    </motion.div>
  );
}
