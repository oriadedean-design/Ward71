'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';

export function ImpactMeter() {
  const [currentAmount, setCurrentAmount] = useState(1250);
  const targetAmount = 25000;
  
  // In a full Sanity implementation, this would fetch the milestone document:
  /*
  useEffect(() => {
    async function fetchMilestone() {
      try {
        const response = await fetch('/api/milestone');
        const data = await response.json();
        if (data.currentAmount) {
          setCurrentAmount(data.currentAmount);
        }
      } catch (error) {
        console.error('Failed to fetch milestone:', error);
      }
    }
    fetchMilestone();
    
    // Optional polling for live updates
    const interval = setInterval(fetchMilestone, 30000); // 30s
    return () => clearInterval(interval);
  }, []);
  */

  const percentage = Math.min(100, Math.max(0, (currentAmount / targetAmount) * 100));

  return (
    <section className="py-20 px-6 bg-white rounded-3xl shadow-sm border border-brand-slate/10 max-w-7xl mx-auto my-24 w-full">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-fraunces font-bold mb-4">Help us reach our ${targetAmount.toLocaleString()} grassroots goal.</h2>
          <p className="text-xl text-brand-slate/60 mb-8 font-medium">
            Currently raised: ${currentAmount.toLocaleString()}
          </p>
          
          <div className="w-full bg-brand-cream rounded-full h-8 mb-6 overflow-hidden border border-brand-slate/10 relative">
            <div 
              className="bg-brand-forest h-full absolute left-0 top-0 transition-all duration-1000 ease-out" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          
          <p className="text-xl text-brand-slate/80 mb-10 font-medium leading-relaxed">
            This campaign is powered by people, not corporate PACs. Every dollar goes directly into community outreach.
          </p>
          
          <Link href="/donate" className="bg-brand-red text-white px-10 py-5 rounded-full font-bold text-xl inline-block hover:bg-opacity-90 transition-opacity">
            Contribute Now
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
