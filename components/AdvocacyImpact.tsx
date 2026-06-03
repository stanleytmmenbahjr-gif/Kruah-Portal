'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Target, Award } from 'lucide-react';

const impactMetrics = [
  {
    label: 'Youth Mentored',
    value: 120,
    suffix: '+',
    description: 'Young leaders trained through mentorship programs and national initiatives.',
    icon: Users,
  },
  {
    label: 'Communities Impacted',
    value: 45,
    suffix: '+',
    description: 'Local communities reached through advocacy and development programs.',
    icon: Heart,
  },
  {
    label: 'Policy Initiatives',
    value: 18,
    suffix: '',
    description: 'Legislative and governance efforts shaped for sustainable national impact.',
    icon: Target,
  },
  {
    label: 'Awards & Recognition',
    value: 12,
    suffix: '',
    description: 'National and international awards for leadership and community service.',
    icon: Award,
  },
];

const impactStories = [
  {
    title: 'Youth Leadership Academy',
    description: 'Established a comprehensive leadership training program that has equipped over 500 young Liberians with skills in governance, entrepreneurship, and civic engagement.',
    impact: '500+ graduates, 85% employment rate',
    year: '2023',
  },
  {
    title: 'Women\'s Economic Empowerment Initiative',
    description: 'Launched a nationwide program providing legal aid, business training, and financial literacy to women entrepreneurs across Liberia.',
    impact: '2,000+ women supported, $500K+ in micro-loans',
    year: '2022',
  },
  {
    title: 'Community Land Rights Protection',
    description: 'Led successful legal campaigns protecting indigenous land rights and establishing community governance frameworks.',
    impact: '15 communities protected, precedent-setting rulings',
    year: '2021',
  },
  {
    title: 'Digital Inclusion Program',
    description: 'Implemented technology training and digital literacy programs in rural communities, bridging the digital divide.',
    impact: '10,000+ individuals trained, 50 communities connected',
    year: '2020',
  },
];

const advocacyAreas = [
  {
    title: 'Youth Empowerment',
    description: 'Building the next generation of leaders through education, mentorship, and opportunity creation.',
  },
  {
    title: 'Women\'s Rights',
    description: 'Advocating for gender equality, economic empowerment, and political participation.',
  },
  {
    title: 'Community Development',
    description: 'Strengthening local governance and sustainable development initiatives.',
  },
  {
    title: 'Digital Inclusion',
    description: 'Ensuring equitable access to technology and digital opportunities for all Liberians.',
  },
];

export default function AdvocacyImpact() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16">
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-brand-800 via-brand-900 to-brand-900 opacity-90" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass backdrop-blur-xl">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Advocacy & Community Impact</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">Measurable impact through advocacy, mentorship, and community development.</h1>
            <p className="text-lg leading-8 text-slate-300">
              A track record of transformative initiatives that have empowered communities, advanced policy reform, and created lasting opportunities for Liberians.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Impact Metrics</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Quantifiable results from community-focused initiatives</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {impactMetrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.06 }}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl text-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gold/10 text-gold mx-auto">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-6 text-3xl font-semibold text-white">{metric.value}{metric.suffix}</p>
                  <p className="mt-3 text-sm uppercase tracking-[0.3em] text-slate-400">{metric.label}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{metric.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Impact Stories</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Transformative initiatives that created lasting change</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {impactStories.map((story, index) => (
              <motion.article
                key={story.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{story.title}</h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.3em] text-gold">{story.impact}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-brand-900/80 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
                    {story.year}
                  </span>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-300">{story.description}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Advocacy Focus Areas</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Key areas of community advocacy and development</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {advocacyAreas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.06 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl"
              >
                <h3 className="text-xl font-semibold text-white">{area.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-300">{area.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}