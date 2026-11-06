import React from 'react';
import { Search, ShieldCheck, Truck, Scale, Award } from 'lucide-react';
import { HERO_IMAGE } from '../data/mockData';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onExploreCatalog: () => void;
  onOpenFarmerPortal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  onExploreCatalog,
  onOpenFarmerPortal,
}) => {
  return (
    <section className="relative w-full border-b border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950 overflow-hidden">
      {/* Background Banner with Measured Scrim */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt="Sunlit organic farm harvest with freshly picked crops in wooden crates"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/75 to-stone-900/40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-2xl">
          <div className="text-emerald-400 text-sm font-semibold tracking-wide uppercase mb-3">
            Founded by Goutham · Direct Farm-Gate Commodity Exchange
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight text-balance">
            Direct from verified growers. Transparent agriculture trade.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-stone-200 leading-relaxed font-normal">
            Eliminate intermediary markups. Source certified heirloom grains, fresh harvest bushels, cold-pressed oils, and precision agronomy inputs directly from verified farm estates.
          </p>

          {/* Search Bar Input */}
          <div className="mt-8 relative max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hard red wheat, organic produce crates, cold-pressed oils, seed lots..."
                className="w-full pl-12 pr-28 py-3.5 text-sm bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder-stone-500 rounded-lg shadow-lg border border-stone-300 dark:border-stone-700 focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-24 text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 mr-2"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onExploreCatalog}
                className="absolute right-2 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          {/* Primary Quick Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onExploreCatalog}
              className="px-5 py-2.5 text-sm font-semibold text-stone-950 bg-stone-100 hover:bg-white rounded-lg shadow-xs transition-colors"
            >
              Browse Active Lots
            </button>
            <button
              onClick={onOpenFarmerPortal}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-emerald-700/80 hover:bg-emerald-700 border border-emerald-500/30 rounded-lg backdrop-blur-xs transition-colors"
            >
              List Harvest as Farmer
            </button>
          </div>
        </div>

        {/* 4-Column Proof & Trust Strip */}
        <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-white">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-white">100% Traceable Provenance</div>
              <div className="text-xs text-stone-300 mt-0.5">Direct geolocation & farm lot inspection</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Scale className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-white">Standard Mandi Pricing</div>
              <div className="text-xs text-stone-300 mt-0.5">Real-time benchmark index & volume tiers</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-white">Lab Chemical Certification</div>
              <div className="text-xs text-stone-300 mt-0.5">Certified moisture, purity & residue testing</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-white">Reefer Cold-Chain Ready</div>
              <div className="text-xs text-stone-300 mt-0.5">Temperature-controlled regional freight</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
