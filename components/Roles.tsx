'use client';

import { motion } from 'framer-motion';
import { Briefcase, Globe, ShieldCheck, Users } from 'lucide-react';
import type { Role } from '../types';

const roles: Role[] = [
  {
    id: 'minister-youth-sports',
    title: 'Minister of Youth and Sports',
    organization: 'Republic of Liberia',
    start_date: '2024',
    end_date: null,
    is_current: true,
    description:
      'Leading national youth strategy, sports infrastructure modernization, and inclusive civic engagement programs across Liberia.',
    category: 'government',
  },
  {
    id: 'unity-party-vice-chair',
    title: 'National Vice Chair',
    organization: 'Unity Party',
    start_date: '2022',
    end_date: null,
    is_current: true,
    description:
      'Steering party governance, strengthening inter-party relations, and increasing youth participation in Liberia’s political processes.',
    category: 'political',
  },
  {
    id: 'attorney-at-law',
    title: 'Attorney at Law',
    organization: 'Henries, Kruahs & Associates',
    start_date: '2020',
    end_date: '2024',
    is_current: false,
    description:
      'Provided legal counsel on governance, civil rights, and public policy matters while advising institutions and NGOs on legal strategy.',
    category: 'legal',
  },
  {
    id: 'advocacy-leader',
    title: 'Youth Advocacy Leader',
    organization: 'National Civic Partnership',
    start_date: '2018',
    end_date: '2022',
    is_current: false,
    description:
      'Built groundbreaking youth mentorship, civic education, and leadership development programs for communities across Liberia.',
    category: 'nonprofit',
  },
];

const roleHighlights = [
  {
    title: 'Policy leadership',
    description: 'Develop and execute national policies focused on youth empowerment and civic inclusion.',
    icon: ShieldCheck,
  },
  {
    title: 'Strategic governance',
    description: 'Guide public-sector initiatives that strengthen institutions and deliver measurable impact.',
    icon: Globe,
  },
  {
    title: 'Community impact',
    description: 'Mobilize youth networks, mentorship programs, and advocacy campaigns for sustainable change.',
    icon: Users,
  },
  {
    title: 'Legal excellence',
    description: 'Provide trusted counsel on governance, compliance, and public policy.',
    icon: Briefcase,
  },
];

export default function Roles() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16">
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-brand-800 via-brand-900 to-brand-900 opacity-90" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass backdrop-blur-xl">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Government & Political Roles</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">Detailed leadership roles shaping national policy and youth inclusion.</h1>
            <p className="text-lg leading-8 text-slate-300">
              Explore the roles that define Cornelia’s governance impact, political leadership, legal expertise, and community-focused advocacy work.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {roles.map((role, index) => (
            <motion.article
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-gold">{role.organization}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{role.title}</h2>
                </div>
                <span className="rounded-full border border-white/10 bg-brand-900/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">
                  {role.is_current ? 'Current' : 'Past'}
                </span>
              </div>
              <p className="mt-5 text-sm uppercase tracking-[0.3em] text-slate-400">
                {role.start_date} — {role.end_date ?? 'Present'}
              </p>
              <p className="mt-6 text-base leading-7 text-slate-300">{role.description}</p>
              <div className="mt-8 space-y-3">
                <p className="text-sm uppercase tracking-[0.3em] text-gold">Key priorities</p>
                <ul className="space-y-3 text-slate-300">
                  <li>• Deepening youth representation in policy decisions.</li>
                  <li>• Strengthening governance through legal and political strategy.</li>
                  <li>• Delivering measurable outcomes for community development.</li>
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {roleHighlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={highlight.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.06 }}
                className="rounded-[2rem] border border-white/10 bg-brand-900/80 p-8 shadow-glass backdrop-blur-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gold/10 text-gold">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{highlight.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-300">{highlight.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
