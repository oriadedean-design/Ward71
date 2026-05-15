import { Metadata } from 'next';
import { FadeIn } from '@/components/FadeIn';

export const metadata: Metadata = {
  title: 'Community Voices | Lorna Antwi',
  description: 'What I\'m hearing in Humber River-Black Creek. Lorna Antwi is listening to residents about housing, safety, and youth opportunities.',
};

export default function CommunityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Community Town Hall",
            "startDate": "2026-06-01T18:00",
            "endDate": "2026-06-01T20:00",
            "location": {
              "@type": "Place",
              "name": "Community Center",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Ward 7 Ave",
                "addressLocality": "Toronto",
                "postalCode": "M3N",
                "addressRegion": "ON",
                "addressCountry": "CA"
              }
            }
          })
        }}
      />
      <section className="bg-brand-cream py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-fraunces font-bold mb-8 text-brand-slate">What I'm Hearing in Our Community.</h1>
            <p className="text-xl md:text-2xl text-brand-slate/80 leading-relaxed font-medium">
              When speaking with residents across Humber River-Black Creek, the most urgent concerns I hear are affordability, housing instability, rising rent costs, community safety, food insecurity, youth opportunities, mental health support, and access to essential services.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Housing and Cost of Living",
              desc: "Many residents are struggling with rising costs and rent prices. Families are worried about affordable housing, eviction prevention, overcrowding, and homelessness. First-time homebuyers face barriers to ownership."
            },
            {
              title: "Streets and Neighbourhoods",
              desc: "Residents want cleaner streets, safer public spaces, faster pothole repairs, and better infrastructure throughout the community."
            },
            {
              title: "Youth and Opportunity",
              desc: "Parents and young people speak about the need for more youth employment, mentorship programs, skills training, safe recreational spaces, and pathways to long-term success."
            },
            {
              title: "Small Business",
              desc: "Small business owners and aspiring entrepreneurs share concerns about how difficult it is to start and sustain a business due to rising costs and limited support."
            },
            {
              title: "Seniors and Newcomers",
              desc: "Seniors raise concerns about affordability, accessibility, and isolation. Newcomers and refugees face barriers to employment, housing, and navigating available resources."
            },
            {
              title: "Food Security",
              desc: "Many families struggle to afford groceries and basic necessities. There is a growing need for stronger community supports and accessible programs."
            }
          ].map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className="bg-white p-8 rounded-2xl shadow-sm border border-brand-slate/10 hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-fraunces font-bold mb-4 text-brand-red">{item.title}</h3>
              <p className="text-brand-slate/80 leading-relaxed text-lg font-medium">{item.desc}</p>
            </FadeIn>
          ))}
        </div>

        <div className="mt-24 mb-12">
          <FadeIn>
            <h2 className="text-4xl font-fraunces font-bold mb-6 text-brand-slate text-center">Community Voices</h2>
            <p className="text-xl text-brand-slate/80 text-center mb-12 max-w-2xl mx-auto font-medium">
              Real stories and support from our neighbours in Humber River-Black Creek.
            </p>
          </FadeIn>
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {[
              { src: "https://picsum.photos/seed/lorna1/600/800", alt: "Lorna speaking with a store owner", quote: "Lorna understands the challenges small businesses face on Jane Street.", author: "Maria, Small Business Owner", aspect: "aspect-[3/4]" },
              { src: "https://picsum.photos/seed/lorna2/600/400", alt: "Lorna at a community BBQ", quote: "She’s been doing the work for years. We need that voice at City Hall.", author: "David, Resident", aspect: "aspect-[3/2]" },
              { src: "https://picsum.photos/seed/lorna3/600/600", alt: "Lorna mentoring youth", quote: "An inspiration and a true leader for the next generation.", author: "Sarah, Youth Worker", aspect: "aspect-square" },
              { src: "https://picsum.photos/seed/lorna4/600/900", alt: "Lorna at a town hall meeting", quote: "Finally, someone who listens and takes action on housing affordability.", author: "Ken, Tenant Advocate", aspect: "aspect-[2/3]" },
              { src: "https://picsum.photos/seed/lorna5/600/500", alt: "Lorna participating in a neighborhood cleanup", quote: "She cares about our streets and our safety. She has my vote.", author: "Elena, Local Parent", aspect: "aspect-[5/4]" },
              { src: "https://picsum.photos/seed/lorna6/600/700", alt: "Lorna talking with seniors", quote: "Lorna makes sure seniors aren't forgotten in Ward 7.", author: "George, Downsview Resident", aspect: "aspect-[6/7]" }
            ].map((img, idx) => (
              <FadeIn key={idx} delay={idx * 0.1} className="break-inside-avoid">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-brand-slate/10 group">
                  <div className={`relative w-full ${img.aspect} overflow-hidden`}>
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6">
                    <p className="font-fraunces text-xl text-brand-slate mb-4 italic">"{img.quote}"</p>
                    <p className="font-bold text-brand-red tracking-wider uppercase text-sm">{img.author}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        
        <FadeIn className="my-24 text-center max-w-4xl mx-auto">
          <blockquote className="text-3xl md:text-5xl font-fraunces font-bold text-brand-slate leading-tight mb-12">
            "Residents want leadership that listens, takes action, and works collaboratively with the community to create practical and lasting solutions."
          </blockquote>
        </FadeIn>
      </section>

      <section className="bg-brand-slate text-brand-cream py-24 px-6 text-center">
        <FadeIn className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-fraunces font-bold mb-10">Have a concern? Tell Lorna directly.</h2>
          <form 
            action="mailto:campaign@lornaantwi.ca?subject=Community Concern" 
            method="POST" 
            encType="text/plain"
            className="flex flex-col gap-6 text-left"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label className="mb-2 font-medium" htmlFor="name">Name</label>
                <input id="name" name="name" type="text" className="px-5 py-4 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard" required />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-medium" htmlFor="email">Email</label>
                <input id="email" name="email" type="email" className="px-5 py-4 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard" required />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium" htmlFor="postal">Postal Code</label>
              <input id="postal" name="postal" type="text" className="px-5 py-4 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard" maxLength={7} />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-medium" htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} className="px-5 py-4 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard" required></textarea>
            </div>
            <button type="submit" className="bg-brand-red text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-opacity mt-4">
              Send Message
            </button>
          </form>
        </FadeIn>
      </section>
    </>
  );
}
