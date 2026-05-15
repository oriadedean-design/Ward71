'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FadeIn } from '@/components/FadeIn';

export default function VolunteerPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedRole, setSelectedRole] = useState('');

  const questions = [
    {
      question: "What type of work energizes you the most?",
      options: [
        { label: "Talking to people and building connections", roles: ["Door Knocking and Canvassing", "Phone Banking"] },
        { label: "Organizing things and keeping data clean", roles: ["Data Entry and Admin"] },
        { label: "Being behind the scenes making things run", roles: ["Event Support and Setup", "Data Entry and Admin"] },
        { label: "Creating content and spreading the word", roles: ["Social Media Support", "Community Outreach"] }
      ]
    },
    {
      question: "What is your preferred environment for volunteering?",
      options: [
        { label: "Outdoors and in the neighborhood", roles: ["Door Knocking and Canvassing", "Community Outreach"] },
        { label: "From the comfort of my home", roles: ["Phone Banking", "Social Media Support", "Data Entry and Admin"] },
        { label: "In a dynamic, fast-paced setting", roles: ["Event Support and Setup"] }
      ]
    },
    {
      question: "Which of these skills best describes you?",
      options: [
        { label: "Great listener and empathetic", roles: ["Door Knocking and Canvassing", "Phone Banking"] },
        { label: "Tech savvy and detail-oriented", roles: ["Data Entry and Admin", "Social Media Support"] },
        { label: "Strong physical stamina and hands-on", roles: ["Event Support and Setup", "Community Outreach"] },
        { label: "Creative and good with words", roles: ["Social Media Support"] }
      ]
    }
  ];

  const handleAnswerSelect = (questionIndex: number, optionIndex: number) => {
    const newAnswers = { ...answers, [questionIndex]: questions[questionIndex].options[optionIndex].label };
    setAnswers(newAnswers);

    if (Object.keys(newAnswers).length === questions.length) {
      calculateBestFit(newAnswers);
    }
  };

  const calculateBestFit = (finalAnswers: Record<number, string>) => {
    const roleCounts: Record<string, number> = {};

    questions.forEach((q, qIndex) => {
      const selectedOptionLabel = finalAnswers[qIndex];
      const option = q.options.find(o => o.label === selectedOptionLabel);
      if (option) {
        option.roles.forEach(r => {
          roleCounts[r] = (roleCounts[r] || 0) + 1;
        });
      }
    });

    let bestRole = "Community Outreach";
    let max = 0;
    Object.entries(roleCounts).forEach(([role, count]) => {
      if (count > max) {
        max = count;
        bestRole = role;
      }
    });

    setSelectedRole(bestRole);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(3);
  };

  const currentQuestionIdx = Object.keys(answers).length;

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto min-h-[70vh]">
      {step === 1 && (
        <FadeIn>
          <div className="text-center max-w-4xl mx-auto mb-8">
            <h1 className="text-4xl md:text-6xl font-fraunces font-bold mb-3 text-brand-slate">Join the Team.</h1>
            <p className="text-xl font-medium text-brand-slate/80">Every role matters. Let's find your best fit.</p>
          </div>

          <div className="max-w-2xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-brand-slate/10">
            {currentQuestionIdx < questions.length && (
              <div>
                <p className="text-brand-red font-bold uppercase tracking-wider mb-3 text-sm">
                  Question {currentQuestionIdx + 1} of {questions.length}
                </p>
                <h2 className="text-xl md:text-2xl font-fraunces font-bold mb-6 text-brand-slate">
                  {questions[currentQuestionIdx].question}
                </h2>

                <div className="flex flex-col gap-3">
                  {questions[currentQuestionIdx].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSelect(currentQuestionIdx, idx)}
                      className="text-left px-5 py-4 rounded-xl border-2 border-brand-slate/10 hover:border-brand-mustard hover:bg-brand-cream/30 transition-all font-medium text-brand-slate"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </FadeIn>
      )}

      {step === 2 && (
        <FadeIn className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <button
              onClick={() => { setStep(1); setAnswers({}); }}
              className="text-brand-slate/60 hover:text-brand-red font-medium mb-6 inline-block"
            >
              &larr; Retake quiz
            </button>
            <h1 className="text-3xl md:text-4xl font-fraunces font-bold mb-4 text-brand-slate">Sign up to volunteer</h1>
            <p className="text-lg font-medium text-brand-slate/80">Your matched role: <strong className="text-brand-red">{selectedRole}</strong></p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-brand-slate/10 flex flex-col gap-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="mb-2 font-bold text-brand-slate" htmlFor="name">Name</label>
                <input id="name" type="text" className="px-5 py-4 bg-white border-2 border-brand-slate/20 rounded-xl text-brand-slate focus:outline-none focus:border-brand-mustard focus:ring-0" required />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-bold text-brand-slate" htmlFor="email">Email</label>
                <input id="email" type="email" className="px-5 py-4 bg-white border-2 border-brand-slate/20 rounded-xl text-brand-slate focus:outline-none focus:border-brand-mustard focus:ring-0" required />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label className="mb-2 font-bold text-brand-slate" htmlFor="phone">Phone</label>
                <input id="phone" type="tel" className="px-5 py-4 bg-white border-2 border-brand-slate/20 rounded-xl text-brand-slate focus:outline-none focus:border-brand-mustard focus:ring-0" required />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-bold text-brand-slate" htmlFor="postal">Postal code</label>
                <input id="postal" type="text" className="px-5 py-4 bg-white border-2 border-brand-slate/20 rounded-xl text-brand-slate focus:outline-none focus:border-brand-mustard focus:ring-0" maxLength={7} required />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-bold text-brand-slate" htmlFor="role">Role</label>
              <input id="role" type="text" value={selectedRole} readOnly className="px-5 py-4 bg-brand-slate/5 border-2 border-brand-slate/10 rounded-xl text-brand-slate/60 font-medium cursor-not-allowed" />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 font-bold text-brand-slate" htmlFor="availability">When are you available?</label>
              <textarea id="availability" rows={3} placeholder="E.g., Weekday evenings, Saturdays..." className="px-5 py-4 bg-white border-2 border-brand-slate/20 rounded-xl text-brand-slate focus:outline-none focus:border-brand-mustard focus:ring-0" required></textarea>
            </div>

            <button type="submit" className="bg-brand-red text-white py-4 mt-2 rounded-full font-bold text-xl hover:bg-opacity-90 transition-opacity w-full text-center">
              Sign Me Up
            </button>
          </form>
        </FadeIn>
      )}

      {step === 3 && (
        <FadeIn className="max-w-2xl mx-auto text-center py-8">
          <div className="w-20 h-20 bg-brand-forest/10 text-brand-forest rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-fraunces font-bold mb-4 text-brand-slate">Thank you for volunteering.</h1>
          <p className="text-lg font-medium text-brand-slate/80 mb-10">Someone from the team will be in touch within 48 hours.</p>

          <div className="bg-white p-8 rounded-3xl shadow-lg border border-brand-slate/10">
            <h2 className="text-xl font-fraunces font-bold mb-3 text-brand-slate">Would you also like to contribute to the campaign?</h2>
            <p className="font-medium text-brand-slate/70 mb-6">Grassroots donations help us build momentum.</p>
            <div className="flex flex-col items-center gap-4">
              <Link href="/donate" className="bg-brand-red text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-opacity w-full max-w-sm text-center">
                Donate Now
              </Link>
              <Link href="/" className="text-brand-slate/60 hover:text-brand-slate font-medium underline underline-offset-4">
                No thanks, just volunteering
              </Link>
            </div>
          </div>
        </FadeIn>
      )}
    </section>
  );
}
