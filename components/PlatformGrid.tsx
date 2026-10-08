import { FadeIn } from '@/components/FadeIn';

// The campaign platform cards, shared by the home page and /platform.
export function PlatformGrid({ items }: { items: Array<{ title: string; description: string }> }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, idx) => (
        <FadeIn key={item.title || idx} delay={idx * 0.1} className="bg-surface p-6 rounded-2xl shadow-sm border border-ink/5 hover:shadow-md transition-shadow">
          <h3 className="text-xl font-fraunces font-bold mb-3">{item.title}</h3>
          <p className="text-ink/80 leading-relaxed">{item.description}</p>
        </FadeIn>
      ))}
    </div>
  );
}
