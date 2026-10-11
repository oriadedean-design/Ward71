import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';

type Item = { title: string; description: string };

// The campaign platform cards, shared by the home page and /platform. A card
// with a full plan (see content/policies) links to it.
export function PlatformGrid({
  items,
  links = {},
}: {
  items: Item[];
  links?: Record<string, { href: string; label: string }>;
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, idx) => {
        const link = links[item.title];
        return (
          <FadeIn key={item.title || idx} delay={idx * 0.1} className="bg-surface p-6 rounded-2xl shadow-sm border border-ink/5 hover:shadow-md transition-shadow flex flex-col">
            <h3 className="text-xl font-fraunces font-bold mb-3">
              {link ? <Link href={link.href} className="hover:text-accent">{item.title}</Link> : item.title}
            </h3>
            <p className="text-ink/80 leading-relaxed">{item.description}</p>
            {link && (
              <Link href={link.href} className="mt-4 inline-flex items-center min-h-[44px] font-bold text-accent hover:underline underline-offset-2">
                {link.label}
              </Link>
            )}
          </FadeIn>
        );
      })}
    </div>
  );
}
