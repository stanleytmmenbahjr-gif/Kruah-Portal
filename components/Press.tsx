'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Megaphone } from 'lucide-react';

const pressItems = [
  {
    title: 'Liberia Today: Leadership for a New Generation',
    outlet: 'Liberia Today',
    date: 'April 2025',
    summary: 'An in-depth profile on Cornelia’s work in youth empowerment, legal reform, and national development.',
    link: '#',
  },
  {
    title: 'The African Voice: Women Leading Change',
    outlet: 'The African Voice',
    date: 'February 2025',
    summary: 'Feature coverage highlighting policy leadership, community advocacy, and cross-border collaboration.',
    link: '#',
  },
  {
    title: 'Global Policy Review: Governance & Gender',
    outlet: 'Global Policy Review',
    date: 'December 2024',
    summary: 'Analysis of legal and governance initiatives with a focus on women’s economic empowerment.',
    link: '#',
  },
];

const pressRelease = {
  title: 'FOR IMMEDIATE RELEASE: Presidential-Approved MVTC Reforms',
  date: 'March 24, 2026',
  paragraphs: [
    'The Ministry of Youth and Sports today announced a comprehensive package of government-approved reforms at the Monrovia Vocational Training Center (MVTC), Liberia\'s flagship technical and vocational training institution. The reforms, submitted to His Excellency President Joseph Nyuma Boakai, Sr. and granted provisional Presidential approval on March 20, 2026, will be implemented over a twelve-month pilot cycle beginning immediately.',
    'Following a comprehensive assessment of MVTC by Minister Atty. Cornelia Wonkerleh Kruah, the Ministry presented a reform brief to the Executive Mansion outlining both the untapped potential and the structural challenges facing the institution. In his response, President Boakai acknowledged that while MVTC has the infrastructure to support up to 3,000 students annually, current enrollment stands at fewer than 800, a gap attributable primarily to the financial barriers facing prospective trainees.',
    'The President granted provisional approval for a full package of reforms to be piloted over the next twelve months, with outcomes to be monitored and evaluated before broader implementation.',
    'Effective immediately, the Ministry has cancelled all training material costs and uniform fees for students enrolled at MVTC. Students who have already paid the US$25 uniform fee will not lose those funds; all such payments will be credited toward graduation fees.',
    'Young people who previously sat and passed the MVTC entrance examination but were unable to enroll due to limited capacity or financial constraints are strongly encouraged to present themselves for registration immediately. The Ministry has confirmed that adequate arrangements are in place to facilitate a smooth and inclusive enrollment process.',
    'Over the twelve-month pilot cycle, the approved reforms will introduce dedicated transportation support, recruit additional instructors and technical staff, authorize MVTC to engage in revenue-generating production activities, and shorten the training cycle from eighteen months to twelve months.',
    'The reform agenda will prioritize training tracks that reflect employer demand in mining, renewable energy and solar technology, agro-processing and food production, digital services and ICT, hospitality and tourism, and healthcare support services.',
    '“For too long, financial barriers and a mismatch between training and opportunity have kept our young people out of productive pathways,” said Minister Kruah. “With the President’s approval and the support of this Government, we are dismantling those barriers, modernizing how we train, and ensuring that MVTC becomes an institution that connects young Liberians to the economy, not just to a certificate. This pilot is our commitment to getting it right before we scale.”',
    'The Ministry will closely monitor enrollment growth, student retention, training outcomes, and revenue generation from production activities throughout the pilot, informing a broader TVET strategy and progress toward sustainability.',
    'The Ministry of Youth and Sports calls on all eligible young Liberians to register at MVTC and take advantage of this renewed opportunity to build skills, gain experience, and pursue a productive future. Registration is ongoing.',
  ],
  followUrl: 'https://www.facebook.com/share/p/1XnWFQnxgD/?mibextid=wwXIfr',
  photo: {
    src: '/images/image.png',
    alt: 'MVTC vocational training students and reform announcement',
    caption: 'One official photo representing the MVTC reform announcement for the press release.',
  },
};

const pressKitResources = [
  { title: 'Media Kit', description: 'Download the official press kit with biography, headshots, and speaking topics.', url: '#' },
  { title: 'Press Releases', description: 'Latest announcements on initiatives, appointments, and national programs.', url: '#' },
  { title: 'Interview Requests', description: 'Submit your media inquiry for interviews and comments.', url: '#' },
  { title: 'Photo Assets', description: 'Access approved high-resolution images for editorial use.', url: '#' },
];

export default function Press() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16">
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-brand-800 via-brand-900 to-brand-900 opacity-90" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass backdrop-blur-xl">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Press & Interviews</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">Media kit, coverage, and interview opportunities</h1>
            <p className="text-lg leading-8 text-slate-300">
              A centralized media hub with recent press coverage, downloadable assets, and interview request channels for Cornelia Winnerleh Kruah.
            </p>
          </div>
        </div>

        <div className="mb-16 rounded-[2rem] border border-gold/20 bg-brand-900/80 p-10 shadow-glass backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-gold">Official Press Release</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{pressRelease.title}</h2>
            </div>
            <span className="rounded-full border border-white/10 bg-brand-900/80 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">
              {pressRelease.date}
            </span>
          </div>
          <div className="mt-8 space-y-5 text-slate-300">
            {pressRelease.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-7">{paragraph}</p>
            ))}
            <p className="text-sm leading-7">
              Follow{' '}
              <a
                href={pressRelease.followUrl}
                target="_blank"
                rel="noreferrer"
                className="text-gold underline-offset-4 transition hover:text-white hover:underline"
              >
                this Facebook update
              </a>{' '}
              for more updates on the MVTC reform pilot.
            </p>
          </div>

          <div className="mt-10">
            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-glass backdrop-blur-xl">
              <div className="relative aspect-[16/9] w-full">
                <Image src={pressRelease.photo.src} alt={pressRelease.photo.alt} fill className="object-cover" />
              </div>
              <div className="space-y-3 p-5">
                <p className="text-sm font-semibold text-white">{pressRelease.photo.caption}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Photo credit: MVTC media team</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16 grid gap-6 lg:grid-cols-3">
          {pressKitResources.map((resource, index) => (
            <motion.div
              key={resource.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.06 }}
              className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gold/10 text-gold">
                <Megaphone className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">{resource.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-300">{resource.description}</p>
              <a href={resource.url} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                View resource <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          ))}
        </div>

        <div>
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Featured Coverage</p>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Recent interviews and featured stories</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {pressItems.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-gold">{item.outlet}</p>
                    <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                  </div>
                  <span className="rounded-full border border-white/10 bg-brand-900/80 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-300">
                    {item.date}
                  </span>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-300">{item.summary}</p>
                <a href={item.link} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold">
                  Read the story <ArrowRight className="h-4 w-4" />
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}