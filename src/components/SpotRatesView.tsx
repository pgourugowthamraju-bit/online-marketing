import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, RefreshCw, Scale, Search, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { CommoditySpot } from '../types/marketplace';

interface SpotRatesViewProps {
  spots: CommoditySpot[];
  onRefresh: () => void;
  onSelectCommodityForCatalog: (cropName: string) => void;
  onRequestRFQ: (cropName: string) => void;
}

export const SpotRatesView: React.FC<SpotRatesViewProps> = ({
  spots,
  onRefresh,
  onSelectCommodityForCatalog,
  onRequestRFQ,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', 'Grains', 'Oilseeds', 'Paddy & Rice', 'Vegetable Oils', 'Fresh Produce'];

  const filteredSpots = spots.filter((s) => {
    const matchesCat = filterCategory === 'all' || s.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesSearch =
      s.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.marketHub.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="text-xs uppercase font-semibold text-emerald-800 dark:text-emerald-400 tracking-wider">
            Agricultural Commodities Intelligence
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 dark:text-stone-50 mt-1">
            Live Mandi & Spot Benchmark Index
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
            Real-time terminal floor prices aggregated across APMC mandis, CBOT, and regional grain exchanges. Standardize fair-trade contracts between direct growers and wholesale buyers.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onRefresh}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Update Spot Rates</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Category Segmented Tabs */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                filterCategory === cat
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-50 shadow-xs font-semibold'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {cat === 'all' ? 'All Commodities' : cat}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter by crop or mandi hub..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100"
          />
        </div>
      </div>

      {/* Spot Price Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/50 text-stone-600 dark:text-stone-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-4">Commodity Crop</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Trading Mandi Hub</th>
                <th className="py-3 px-4 text-right">Benchmark Price</th>
                <th className="py-3 px-4 text-right">24h Price Action</th>
                <th className="py-3 px-4 text-right">30-Day Range</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 font-normal text-stone-800 dark:text-stone-200">
              {filteredSpots.map((spot) => {
                const isUp = spot.trend === 'up';
                const isDown = spot.trend === 'down';

                return (
                  <tr key={spot.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-stone-900 dark:text-stone-100">
                      {spot.crop}
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 dark:text-stone-400">
                      {spot.category}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 dark:text-stone-300">
                      {spot.marketHub}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold text-stone-900 dark:text-stone-50">
                      ${spot.benchmarkPrice.toFixed(2)}{' '}
                      <span className="text-stone-400 font-normal">/{spot.unit}</span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums font-medium">
                      <span
                        className={`inline-flex items-center gap-0.5 ${
                          isUp
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : isDown
                            ? 'text-rose-600 dark:text-rose-400'
                            : 'text-stone-500'
                        }`}
                      >
                        {isUp && <TrendingUp className="w-3.5 h-3.5" />}
                        {isDown && <TrendingDown className="w-3.5 h-3.5" />}
                        {!isUp && !isDown && <Minus className="w-3.5 h-3.5" />}
                        {spot.change24h > 0 ? '+' : ''}${spot.change24h.toFixed(2)} (
                        {spot.changePercent > 0 ? '+' : ''}
                        {spot.changePercent}%)
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono tabular-nums text-stone-500 dark:text-stone-400">
                      ${spot.low30d.toFixed(2)} – ${spot.high30d.toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onSelectCommodityForCatalog(spot.crop)}
                          className="px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded transition-colors"
                        >
                          Find Lots
                        </button>
                        <button
                          onClick={() => onRequestRFQ(spot.crop)}
                          className="px-2.5 py-1 text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded transition-colors"
                        >
                          RFQ Tender
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Explanatory Mandi Benchmark Info Card */}
      <div className="mt-8 p-5 bg-stone-100 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700 flex flex-col sm:flex-row items-start gap-4">
        <Scale className="w-6 h-6 text-emerald-700 dark:text-emerald-400 shrink-0 mt-1" />
        <div className="text-xs text-stone-600 dark:text-stone-300 space-y-1">
          <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
            How TerraDirect Mandi Rates Work
          </h4>
          <p>
            Mandi floor benchmarks are compiled from physical agricultural grain mandis, oilseed trade associations, and agricultural exchange clearing houses. TerraDirect connects buyers directly with registered growers, ensuring farmers receive up to 88-92% of the wholesale terminal value—eliminating the standard 25-35% middleman brokerage spread.
          </p>
        </div>
      </div>
    </div>
  );
};
