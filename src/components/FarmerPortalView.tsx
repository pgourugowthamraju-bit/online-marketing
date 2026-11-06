import React from 'react';
import { PlusCircle, Sprout, ShieldCheck, TrendingUp, CheckCircle, MapPin, Package } from 'lucide-react';
import { Product } from '../types/marketplace';

interface FarmerPortalViewProps {
  products: Product[];
  onOpenListingModal: () => void;
  onViewProduct: (product: Product) => void;
}

export const FarmerPortalView: React.FC<FarmerPortalViewProps> = ({
  products,
  onOpenListingModal,
  onViewProduct,
}) => {
  // Calculate farmer hub statistics
  const totalLots = products.length;
  const totalStockKg = products.reduce((acc, p) => acc + p.stockQty, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="text-xs uppercase font-semibold text-emerald-800 dark:text-emerald-400 tracking-wider">
            Founded by Goutham · Verified Grower Gateway
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 dark:text-stone-50 mt-1">
            Grower & Producer Operations Portal
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
            Directly connect your harvest with commercial mills, artisan food brands, and retail grocers. Under Founder Goutham's grower-first charter, enjoy 0% middleman deductions and guaranteed escrow payouts.
          </p>
        </div>

        <button
          onClick={onOpenListingModal}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-colors shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish New Harvest Lot</span>
        </button>
      </div>

      {/* 3 Overview Stat Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Active Farm Lots</span>
            <Sprout className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-mono tabular-nums font-bold text-stone-900 dark:text-stone-100">
            {totalLots}
          </div>
          <div className="mt-1 text-xs text-stone-500">Live in marketplace catalog</div>
        </div>

        <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Listed Inventory Volume</span>
            <Package className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-mono tabular-nums font-bold text-stone-900 dark:text-stone-100">
            {totalStockKg.toLocaleString()} units
          </div>
          <div className="mt-1 text-xs text-stone-500">Across grains, produce & cold-pressed oils</div>
        </div>

        <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
          <div className="flex items-center justify-between">
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">Grower Realization Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
          </div>
          <div className="mt-2 text-2xl font-mono tabular-nums font-bold text-emerald-800 dark:text-emerald-400">
            91.4%
          </div>
          <div className="mt-1 text-xs text-stone-500">Vs 64% in conventional wholesale mandis</div>
        </div>
      </div>

      {/* Active Listings Grid */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display font-bold text-lg text-stone-900 dark:text-stone-100">
            Current Farm Listings in Exchange
          </h3>
          <span className="text-xs text-stone-500 font-mono">
            {products.length} commodities listed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs uppercase font-semibold text-emerald-800 dark:text-emerald-400">
                    {p.category} · {p.grade}
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">Lot #{p.id.slice(-6)}</span>
                </div>
                <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm mt-1">
                  {p.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{p.farmName} · {p.location}</span>
                </div>

                <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-stone-500">Base Price:</span>
                    <div className="font-mono tabular-nums font-bold text-stone-900 dark:text-stone-100">
                      ${p.pricePerUnit.toFixed(2)}/{p.unit}
                    </div>
                  </div>
                  <div>
                    <span className="text-stone-500">Remaining Stock:</span>
                    <div className="font-mono tabular-nums font-semibold text-stone-800 dark:text-stone-200">
                      {p.stockQty.toLocaleString()} {p.unit}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">
                  Harvest: {p.harvestDate}
                </span>
                <button
                  onClick={() => onViewProduct(p)}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-md transition-colors"
                >
                  View Lot Specs
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Standards & Escrow Protection */}
      <div className="mt-12 p-6 rounded-2xl bg-stone-100 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700">
        <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100 mb-2">
          Grower Protection & Direct Settlement Guarantees
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-stone-600 dark:text-stone-300 mt-4">
          <div>
            <div className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
              Zero Intermediary Deductions
            </div>
            <p>
              Buyers pay directly for your freight and listed unit price. There are no commission clawbacks, hidden weighing cuts, or market fee reductions.
            </p>
          </div>
          <div>
            <div className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
              Escrow Weighbridge Clearance
            </div>
            <p>
              Funds are placed into a verified agricultural escrow upon order dispatch and released within 24 hours of weighbridge receipt confirmation.
            </p>
          </div>
          <div>
            <div className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
              Independent Quality Dispute Resolution
            </div>
            <p>
              In the event of quality questions, accredited third-party labs inspect moisture, aflatoxin, and grain purity according to predetermined contract tolerances.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
