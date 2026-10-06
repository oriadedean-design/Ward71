import { Metadata } from 'next';
import { FadeIn } from '@/components/FadeIn';
import { InquiryForm } from '@/components/InquiryForm';
import { getCommunityContent } from '@/lib/content';
import { urlFor } from '@/sanity/image';

export const metadata: Metadata = {
  title: 'Community',
  description: 'What Lorna Antwi is hearing in Humber River-Black Creek. Residents are speaking up about housing, safety, food security, youth opportunity, and more.',
  openGraph: {
    title: 'Community Voices | Lorna Antwi for Toronto City Council',
    description: 'What residents across Humber River-Black Creek are saying — and how Lorna is listening.',
    url: 'https://www.lornaantwi.com/community',
  },
  alternates: { canonical: 'https://www.lornaantwi.com/community' },
};

export default async function CommunityPage() {
  const c = await getCommunityContent()
  const gallery = c.gallery.filter((img) => img?.asset)

  return (
    <>
      <section className="bg-brand-cream py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-fraunces font-bold mb-4 text-brand-slate">{c.hero.heading}</h1>
            <p className="text-lg md:text-xl text-brand-slate/80 leading-relaxed font-medium">
              {c.hero.intro}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-12 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {c.concerns.map((item, idx) => (
            <FadeIn key={idx} delay={idx * 0.1} className="bg-white p-6 rounded-2xl shadow-sm border border-brand-slate/10 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-fraunces font-bold mb-3 text-brand-red">{item.title}</h3>
              <p className="text-brand-slate/80 leading-relaxed font-medium">{item.description}</p>
            </FadeIn>
          ))}
        </div>

        <div className="mt-12 mb-8">
          <FadeIn>
            <h2 className="text-3xl font-fraunces font-bold mb-3 text-brand-slate text-center">{c.gallerySection.heading}</h2>
            <p className="text-lg text-brand-slate/80 text-center mb-8 max-w-2xl mx-auto font-medium">
              {c.gallerySection.intro}
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
              Upload gallery photos in Sanity Studio → Pages → Community → Photo gallery
            </div>
          )}
        </div>

        <FadeIn className="my-10 text-center max-w-4xl mx-auto">
          <blockquote className="text-2xl md:text-4xl font-fraunces font-bold text-brand-slate leading-tight">
            &ldquo;{c.quote}&rdquo;
          </blockquote>
        </FadeIn>
      </section>

      <section className="bg-brand-slate text-brand-cream py-14 px-6 text-center">
        <FadeIn className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-fraunces font-bold mb-8">{c.inquiry.heading}</h2>
          <InquiryForm />
        </FadeIn>
      </section>
    </>
  );
}
