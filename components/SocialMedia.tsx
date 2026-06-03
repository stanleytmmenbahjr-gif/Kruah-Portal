'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Linkedin, Twitter } from 'lucide-react';
import Script from 'next/script';

const socialProfiles = {
  twitter: 'CorneliaWK',
  linkedin: 'cornelia-wonkerleh-kruah',
  instagram: 'cornelia_wk',
};

export default function SocialMedia() {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16">
      <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
      <Script src="https://platform.linkedin.com/badges/js/profile.js" strategy="lazyOnload" />
      <Script src="https://www.instagram.com/embed.js" strategy="lazyOnload" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-glass backdrop-blur-xl">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm uppercase tracking-[0.3em] text-gold">Social Media</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">Embedded feeds for Twitter, LinkedIn, and Instagram</h1>
            <p className="text-lg leading-8 text-slate-300">
              Showcase real-time social engagement with embedded profiles and selected posts from Cornelia’s leadership channels.
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 pb-4">
              <Twitter className="h-6 w-6 text-gold" />
              <h2 className="text-xl font-semibold text-white">Twitter Feed</h2>
            </div>
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-brand-900/80 p-4">
              <a
                className="twitter-timeline"
                data-height="520"
                data-theme="dark"
                href={`https://twitter.com/${socialProfiles.twitter}?ref_src=twsrc%5Etfw`}
              >
                Tweets by @{socialProfiles.twitter}
              </a>
            </div>
            <a
              href={`https://twitter.com/${socialProfiles.twitter}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold"
            >
              Visit Twitter profile <ArrowRight className="h-4 w-4" />
            </a>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 pb-4">
              <Linkedin className="h-6 w-6 text-gold" />
              <h2 className="text-xl font-semibold text-white">LinkedIn Profile</h2>
            </div>
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-brand-900/80 p-6 text-center">
              <div
                className="LI-profile-badge mx-auto"
                data-version="v1"
                data-size="medium"
                data-locale="en_US"
                data-type="horizontal"
                data-theme="dark"
                data-vanity={socialProfiles.linkedin}
              />
            </div>
            <a
              href={`https://www.linkedin.com/in/${socialProfiles.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold"
            >
              View LinkedIn profile <ArrowRight className="h-4 w-4" />
            </a>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 pb-4">
              <Instagram className="h-6 w-6 text-gold" />
              <h2 className="text-xl font-semibold text-white">Instagram Post</h2>
            </div>
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-brand-900/80 p-4">
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={`https://www.instagram.com/p/Cg5wLwXMB1z/`}
                data-instgrm-version="14"
                style={{ background: '#000', margin: '0 auto', maxWidth: '540px', width: '100%' }}
              >
                <a href={`https://www.instagram.com/${socialProfiles.instagram}/`} target="_blank" rel="noreferrer">
                  View Instagram post
                </a>
              </blockquote>
            </div>
            <a
              href={`https://www.instagram.com/${socialProfiles.instagram}/`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold"
            >
              Visit Instagram profile <ArrowRight className="h-4 w-4" />
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
