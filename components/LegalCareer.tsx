'use client';

import { motion } from 'framer-motion';
import { BookOpen, Gavel, Scale, ShieldCheck } from 'lucide-react';

const legalExpertise = [
  {
    title: 'Governance & Public Policy',
    description: 'Specialized in constitutional law, public administration, and policy reform initiatives.',
    icon: ShieldCheck,
  },
  {
    title: 'Civil Rights & Advocacy',
    description: 'Expertise in human rights law, community rights protection, and social justice litigation.',
    icon: Scale,
  },
  {
    title: 'Corporate & Commercial Law',
    description: 'Advisory services for business development, regulatory compliance, and institutional governance.',
    icon: Gavel,
  },
  {
    title: 'International Law',
    description: 'Knowledge of international treaties, diplomatic relations, and cross-border legal frameworks.',
    icon: BookOpen,
  },
];

const publications = [
  {
    title: 'Youth Participation in Democratic Governance',
    type: 'Policy Paper',
    year: '2023',
    description: 'Comprehensive analysis of youth inclusion in Liberian political processes and policy-making.',
    publisher: 'National Democratic Institute',
  },
  {
    title: 'Legal Frameworks for Women\'s Economic Empowerment',
    type: 'Research Report',
    year: '2022',
    description: 'Examination of legal barriers and policy solutions for women\'s economic participation in Liberia.',
    publisher: 'United Nations Development Programme',
  },
  {
    title: 'Constitutional Reform and Institutional Strengthening',
    type: 'Legal Analysis',
    year: '2021',
    description: 'Critical assessment of Liberia\'s constitutional framework and recommendations for institutional reform.',
    publisher: 'International Center for Transitional Justice',
  },
];

const notableCases = [
  {
    title: 'Community Land Rights Protection',
    description: 'Successfully defended community land rights against corporate encroachment, establishing precedent for indigenous rights protection.',
    outcome: 'Favorable ruling, policy reform',
    year: '2023',
  },
  {
    title: 'Youth Electoral Rights Advocacy',
    description: 'Led legal challenge to voting age restrictions, expanding democratic participation for young citizens.',
    outcome: 'Constitutional amendment passed',
    year: '2022',
  },
  {
    title: 'Anti-Corruption Institutional Reform',
    description: 'Advised on strengthening anti-corruption frameworks and institutional accountability mechanisms.',
    outcome: 'New legislation enacted',
    year: '2021',
  },
];

export default function LegalCareer() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16">
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-brand-800 via-brand-900 to-brand-900 opacity-90" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass backdrop-blur-xl">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Legal Career</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">Cases, publications, and legal expertise shaping governance and justice.</h1>
            <p className="text-lg leading-8 text-slate-300">
              A distinguished legal career focused on constitutional law, public policy, civil rights, and institutional reform in Liberia and beyond.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Areas of Expertise</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Specialized legal practice areas</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {legalExpertise.map((area, index) => {
              const Icon = area.icon;
              return (
                <motion.div
                  key={area.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.06 }}
                  className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gold/10 text-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{area.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-slate-300">{area.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Publications & Research</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Thought leadership and policy analysis</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {publications.map((pub, index) => (
              <motion.article
                key={pub.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-gold">{pub.type}</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{pub.title}</h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-brand-900/80 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
                    {pub.year}
                  </span>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-300">{pub.description}</p>
                <p className="mt-6 text-sm uppercase tracking-[0.3em] text-slate-400">{pub.publisher}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Notable Cases</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Impactful legal victories and precedents</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {notableCases.map((case_, index) => (
              <motion.article
                key={case_.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white">{case_.title}</h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.3em] text-gold">{case_.outcome}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-brand-900/80 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
                    {case_.year}
                  </span>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-300">{case_.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}