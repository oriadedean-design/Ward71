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
      {/* JSON-LD Person schema for SEO */}
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
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <FadeIn>
            <h1 className="text-6xl md:text-8xl font-fraunces font-bold mb-6 text-brand-slate">My Story.</h1>
            <p className="text-2xl md:text-4xl font-fraunces text-brand-red italic">Rooted in service. Built for our community.</p>
          </FadeIn>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <FadeIn className="lg:w-1/3 sticky top-32">
            <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
              <Image 
                src="https://picsum.photos/seed/lorna_about/800/1000" 
                alt="Lorna Antwi in the community" 
                fill 
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </FadeIn>
          
          <div className="lg:w-2/3 prose prose-xl prose-slate max-w-none prose-p:leading-relaxed prose-p:mb-8 font-medium text-brand-slate/90">
            <FadeIn>
              <p>
                My connection to the diverse Humber River-Black Creek community is both personal and professional. I attended Brookview Middle School and later studied at Seneca Polytechnic at York, experiences that helped shape my understanding of the community and the importance of opportunity, education, and support systems for young people and families.
              </p>
              <p>
                Over the years, I have worked closely with and supported children, youth, parents, families, seniors, individuals, newcomers, and refugees from many different cultural and socioeconomic backgrounds. Through my work in community advocacy and social services, I have helped residents facing housing instability, food insecurity, unemployment, mental health challenges, and barriers to opportunity.
              </p>
              <p>
                I have supported families with affordable housing resources and eviction prevention, connected youth to employment, mentorship, and skills training opportunities, and advocated for individuals who often feel unheard or overlooked. These experiences have allowed me to build meaningful relationships throughout Humber River-Black Creek and better understand both the challenges and strengths within our community.
              </p>
              <p>
                Humber River-Black Creek is one of the most diverse and resilient communities in Toronto. Our community is filled with hardworking families, passionate youth, seniors, newcomers, and community leaders who care deeply about creating a safer, stronger, and more inclusive future.
              </p>
            </FadeIn>
            
            <FadeIn className="my-16">
              <blockquote className="text-3xl md:text-4xl font-fraunces font-bold text-brand-red leading-tight border-none p-0">
                "Every resident deserves access to opportunity, support, safety, and leadership that is present, accountable, and community-focused."
              </blockquote>
            </FadeIn>

            <FadeIn>
              <h2 className="text-4xl font-fraunces font-bold mb-8 text-brand-slate">Why I'm Running</h2>
              <p>
                I am stepping up to run for office because I believe the people of Humber River-Black Creek deserve leadership that is present, accountable, compassionate, and focused on real solutions. Through my years of working in community advocacy and social services, including working with the Toronto Shelter & Support Services as a counsellor for the City of Toronto, I have seen firsthand the challenges many residents are facing: rising housing costs, food insecurity, unemployment, mental health struggles, community safety concerns, and the lack of opportunities available to many youth and families.
              </p>
              <p>
                The inspiration to run came from the people I have worked with and supported over the years. I have listened to single parents worried about paying rent, youth searching for opportunities and mentorship, seniors struggling with affordability, newcomers trying to build stable lives, and families navigating difficult circumstances while still fighting for a better future.
              </p>
              <p>
                These experiences showed me that our community needs leadership that not only understands these challenges, but is willing to take action and advocate for meaningful change. I am running because I care deeply about this community and believe residents deserve a strong voice at City Hall: someone who is connected to the community, understands the realities people face, and is committed to creating safer neighbourhoods, affordable housing, economic opportunities, and stronger supports for all residents.
              </p>
            </FadeIn>

            <FadeIn className="mt-16 text-center">
              <blockquote className="text-3xl md:text-5xl font-fraunces font-bold text-brand-mustard leading-tight mb-12">
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
