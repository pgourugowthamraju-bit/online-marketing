import React from 'react';
import { Sprout, Quote, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const FoundersVision: React.FC = () => {
  return (
    <section className="w-full border-t border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-900/40 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            <Sprout className="w-4 h-4" />
            <span>Founder's Direct Commitment</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            "A transparent marketplace where farmers retain their hard-earned harvest value."
          </h2>

          <div className="relative py-4 text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed font-normal">
            <Quote className="w-8 h-8 text-emerald-700/20 dark:text-emerald-400/20 absolute -top-2 -left-4 -scale-x-100" />
            <p>
              Traditional agricultural supply chains trap growers in multi-layered broker networks where mandi prices are obscured and arbitrary weighing cuts erode up to 35% of farm revenue. I founded this platform to replace opaque intermediaries with verifiable chemical testing, fair APMC/CBOT spot benchmarks, and direct escrow contracts. When commercial buyers connect directly with farming families, both harvest quality and agricultural livelihoods flourish.
            </p>
          </div>

          <div className="pt-2 flex flex-col items-center">
            <div className="font-display font-bold text-base text-stone-900 dark:text-stone-100">
              Goutham
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 font-medium">
              Founder & Chief Agronomist · TerraDirect Agricultural Systems
            </div>
          </div>
        </div>

        {/* 3 Pillars Founded by Goutham */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-stone-200 dark:border-stone-800">
          <div className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4 shrink-0" />
              <span>0% Hidden Middleman Fees</span>
            </div>
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 mt-2">
              91%+ Direct Farm Realization
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
              Every cent negotiated on the wholesale exchange goes directly to the grower collective, backed by verified weighbridge receipts and digital escrow.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Rigorous Lab Screening</span>
            </div>
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 mt-2">
              Certified Moisture & Purity
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
              Every lot listed on the marketplace is backed by independent testing for chemical residue, aflatoxin levels, and organic compliance before dispatch.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Commercial Cold-Chain</span>
            </div>
            <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 mt-2">
              Guaranteed Freshness Retention
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
              Reefer logistics keep farm bushels at 2–4°C directly from the packing shed to the buyer's distribution hub, minimizing spoilage.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
