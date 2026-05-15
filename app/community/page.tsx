import { Metadata } from 'next';
import { FadeIn } from '@/components/FadeIn';
import { client } from '@/sanity/client';
import { urlFor } from '@/sanity/image';

export const metadata: Metadata = {
  title: 'Community Voices | Lorna Antwi',
  description: 'What I\'m hearing in Humber River-Black Creek. Lorna Antwi is listening to residents about housing, safety, and youth opportunities.',
};

export default async function CommunityPage() {
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ galleryImages }`)
  const gallery: Array<{ _key: string; alt?: string; asset: any }> = settings?.galleryImages ?? []

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
      <section className="bg-brand-cream py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-fraunces font-bold mb-4 text-brand-slate">What I'm Hearing in Our Community.</h1>
            <p className="text-lg md:text-xl text-brand-slate/80 leading-relaxed font-medium">
              Across Humber River-Black Creek, residents are raising urgent concerns: affordability, housing instability, community safety, food insecurity, youth opportunity, and access to essential services.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Housing and Cost of Living", desc: "Families are worried about rising rent, eviction prevention, overcrowding, and homelessness. First-time homebuyers face real barriers to ownership." },
            { title: "Streets and Neighbourhoods", desc: "Residents want cleaner streets, safer public spaces, faster pothole repairs, and better infrastructure throughout the community." },
            { title: "Youth and Opportunity", desc: "Parents and young people speak about the need for more employment, mentorship, skills training, safe recreational spaces, and pathways to success." },
            { title: "Small Business", desc: "Small business owners share concerns about how difficult it is to start and sustain a business due to rising costs and limited support." },
            { title: "Seniors and Newcomers", desc: "Seniors raise concerns about affordability, accessibility, and isolation. Newcomers face barriers to employment, housing, and available resources." },
            { title: "Food Security", desc: "Many families struggle to afford groceries and basic necessities. There is a growing need for stronger community supports." }
          ].map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className="bg-white p-6 rounded-2xl shadow-sm border border-brand-slate/10 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-fraunces font-bold mb-3 text-brand-red">{item.title}</h3>
              <p className="text-brand-slate/80 leading-relaxed font-medium">{item.desc}</p>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 mb-8">
          <FadeIn>
            <h2 className="text-3xl font-fraunces font-bold mb-3 text-brand-slate text-center">In the Community</h2>
            <p className="text-lg text-brand-slate/80 text-center mb-8 max-w-2xl mx-auto font-medium">
              Moments from the campaign trail across Humber River-Black Creek.
            </p>
          </FadeIn>

          {gallery.length > 0 ? (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {gallery.map((img, idx) => (
                <FadeIn key={img._key ?? idx} delay={idx * 0.05} className="break-inside-avoid">
                  <div className="relative w-full rounded-2xl overflow-hidden shadow-sm group">
                    <img
                      src={urlFor(img).width(600).url()}
                      alt={img.alt ?? 'Campaign photo'}
                      loading="lazy"
                      className="object-cover w-full h-auto group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-brand-slate/40 border-2 border-dashed border-brand-slate/20 rounded-2xl">
              Upload gallery photos in Sanity Studio → Site Settings → Community Gallery Photos
            </div>
          )}
        </div>

        <FadeIn className="my-10 text-center max-w-4xl mx-auto">
          <blockquote className="text-2xl md:text-4xl font-fraunces font-bold text-brand-slate leading-tight">
            "Residents want leadership that listens, takes action, and works collaboratively with the community to create practical and lasting solutions."
          </blockquote>
        </FadeIn>
      </section>

      <section className="bg-brand-slate text-brand-cream py-14 px-6 text-center">
        <FadeIn className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-fraunces font-bold mb-8">Have a concern? Tell Lorna directly.</h2>
          <form
            action="mailto:campaign@lornaantwi.ca?subject=Community Concern"
            method="POST"
            encType="text/plain"
            className="flex flex-col gap-5 text-left"
          >
            <div className="grid md:grid-cols-2 gap-5">
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
              <textarea id="message" name="message" rows={4} className="px-5 py-4 rounded-xl text-brand-slate focus:outline-none focus:ring-2 focus:ring-brand-mustard" required></textarea>
            </div>
            <button type="submit" className="bg-brand-red text-white py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-opacity mt-2">
              Send Message
            </button>
          </form>
        </FadeIn>
      </section>
    </>
  );
}
