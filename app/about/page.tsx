import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'About Lorna Antwi | Toronto City Council Ward 7',
  description: 'Rooted in service. Built for our community. Read about Lorna Antwi\'s story and why she is running for Toronto City Council.',
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Lorna Antwi",
            "jobTitle": "Political Candidate for Toronto City Council",
            "url": "https://lornaantwi.ca",
            "image": "https://picsum.photos/seed/lorna_portrait/800/1000",
            "description": "Running for Toronto City Council in Humber River-Black Creek (Ward 7)."
          })
        }}
      />
      <section className="px-6 py-12 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-10">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-fraunces font-bold mb-4 text-brand-slate">My Story.</h1>
            <p className="text-xl md:text-3xl font-fraunces text-brand-red italic">Rooted in service. Built for our community.</p>
          </FadeIn>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          <FadeIn className="lg:w-1/3 sticky top-32">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://picsum.photos/seed/lorna/800/1000"
                alt="Lorna Antwi in the community"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </FadeIn>

          <div className="lg:w-2/3 prose prose-lg prose-slate max-w-none prose-p:leading-relaxed prose-p:mb-6 font-medium text-brand-slate/90">
            <FadeIn>
              <p>
                My connection to Humber River-Black Creek is both personal and professional. I attended Brookview Middle School and later studied at Seneca Polytechnic at York — experiences that shaped my understanding of the community and the importance of opportunity, education, and support for young people and families.
              </p>
              <p>
                Over the years I have worked closely with children, youth, families, seniors, newcomers, and refugees from many backgrounds. Through community advocacy and social services, I have helped residents facing housing instability, food insecurity, unemployment, mental health challenges, and barriers to opportunity — building meaningful relationships throughout the ward and a deep understanding of both its challenges and its strengths.
              </p>
            </FadeIn>

            <FadeIn className="my-10">
              <blockquote className="text-2xl md:text-3xl font-fraunces font-bold text-brand-red leading-tight border-none p-0">
                "Every resident deserves access to opportunity, support, safety, and leadership that is present, accountable, and community-focused."
              </blockquote>
            </FadeIn>

            <FadeIn>
              <h2 className="text-3xl font-fraunces font-bold mb-4 text-brand-slate">Why I'm Running</h2>
              <p>
                I am running because the people of Humber River-Black Creek deserve leadership that is present, compassionate, and focused on real solutions. Through years of work in community advocacy and social services — including as a counsellor with Toronto Shelter & Support Services — I have seen firsthand the challenges residents face: rising housing costs, food insecurity, unemployment, mental health struggles, and a lack of opportunities for youth and families.
              </p>
              <p>
                I have listened to single parents worried about rent, youth searching for mentorship, seniors struggling with affordability, and newcomers navigating a new city. These experiences showed me that our community needs a strong voice at City Hall — someone connected to the community, who understands its realities, and is committed to creating safer neighbourhoods, affordable housing, and stronger supports for all.
              </p>
            </FadeIn>

            <FadeIn className="mt-10 text-center">
              <blockquote className="text-2xl md:text-4xl font-fraunces font-bold text-brand-mustard leading-tight mb-8">
                "This campaign is about service, representation, and building a stronger future together."
              </blockquote>
              <Link href="/volunteer" className="bg-brand-slate text-brand-cream px-10 py-4 rounded-full font-bold text-lg inline-block hover:bg-opacity-90 transition-opacity no-underline">
                Volunteer With Me
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
