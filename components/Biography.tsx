'use client';

import { motion } from 'framer-motion';
import { Award, Briefcase, Globe, HeartHandshake } from 'lucide-react';

const strengths = [
  { title: 'Legal Authority', description: 'Experienced attorney, policy advisor, and advocate for justice and institutional reform.', icon: Award },
  { title: 'Youth Leadership', description: 'Champion for young people with youth empowerment programs and national mentorship.', icon: HeartHandshake },
  { title: 'Political Vision', description: 'Driving inclusive governance and strategic political engagement at the national level.', icon: Globe },
  { title: 'Public Service', description: 'Proven record in government leadership, law, and national development.', icon: Briefcase },
];

export default function Biography() {
  return (
    <section id="about" className="border-t border-white/10 px-6 py-20 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_0.75fr] lg:items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }}>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-gold">Biography</p>
            <h2 className="text-4xl font-semibold text-white sm:text-5xl">Cornelia’s story of law, leadership, and national impact.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Cornelia Wonkerleh Kruah is a Liberian lawyer, national political leader, and Minister of Youth and Sports. With a legal foundation, she blends policy expertise with youth advocacy and governance leadership to shape Liberia’s future.
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Her work focuses on empowering young people, protecting justice, and building partnerships across government, civil society, and international stakeholders.
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {strengths.map((strength) => (
                <div key={strength.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glass backdrop-blur-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gold/10 text-gold">
                      <strength.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-white">{strength.title}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{strength.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.75 }} className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl">
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-gold/10 via-white/5 to-gold/5 p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,175,55,0.18),_transparent_40%)]" />
              <div className="relative">
                <div className="h-96 rounded-[2rem] bg-[url('/images/biography.jpg')] bg-cover bg-center" />
                <div className="mt-8 rounded-3xl border border-white/10 bg-brand-900/80 p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-gold">Signature values</p>
                  <ul className="mt-5 space-y-4 text-slate-300">
                    <li>• Transformative youth empowerment through policy and mentorship.</li>
                    <li>• Legal excellence rooted in accountability and rights protection.</li>
                    <li>• Inclusive governance for Liberia’s sustainable growth.</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
