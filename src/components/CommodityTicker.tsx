import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, RefreshCw, Info } from 'lucide-react';
import { CommoditySpot } from '../types/marketplace';

interface CommodityTickerProps {
  spots: CommoditySpot[];
  onRefreshSpots?: () => void;
  onSelectCommodity?: (crop: string) => void;
}

export const CommodityTicker: React.FC<CommodityTickerProps> = ({
  spots,
  onRefreshSpots,
  onSelectCommodity,
}) => {
  const [selectedSpot, setSelectedSpot] = useState<CommoditySpot | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      if (onRefreshSpots) onRefreshSpots();
    }, 600);
  };

  return (
    <div className="w-full bg-stone-900 border-b border-stone-800 text-stone-100 py-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Header Label */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <span>Live Mandi Spot Index</span>
          </div>
          <span className="text-stone-500 text-xs hidden sm:inline" aria-hidden="true">·</span>
          <span className="text-stone-400 text-xs hidden sm:inline">Wholesale Exchange Benchmark</span>
          <button
            onClick={handleRefresh}
            title="Refresh spot rates"
            className="p-1 text-stone-400 hover:text-stone-200 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
          </button>
        </div>

        {/* Scrollable Spot Ticker Row */}
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-1 text-xs">
          {spots.map((spot) => {
            const isUp = spot.trend === 'up';
            const isDown = spot.trend === 'down';

            return (
              <button
                key={spot.id}
                onClick={() => setSelectedSpot(spot)}
                className="flex items-center gap-2 px-3 py-1.5 bg-stone-800/80 hover:bg-stone-800 rounded-md border border-stone-700/60 transition-all shrink-0 text-left cursor-pointer group"
              >
                <span className="font-medium text-stone-200 group-hover:text-white whitespace-nowrap">
                  {spot.crop}
                </span>
                <span className="font-mono tabular-nums text-stone-300 font-semibold">
                  ${spot.benchmarkPrice.toFixed(2)}
                </span>
                <span className="text-stone-500 text-[11px]">/{spot.unit}</span>
                <div
                  className={`flex items-center gap-0.5 font-mono tabular-nums font-medium text-[11px] ${
                    isUp ? 'text-emerald-400' : isDown ? 'text-rose-400' : 'text-stone-400'
                  }`}
                >
                  {isUp && <TrendingUp className="w-3 h-3" />}
                  {isDown && <TrendingDown className="w-3 h-3" />}
                  {!isUp && !isDown && <Minus className="w-3 h-3" />}
                  <span>
                    {spot.change24h > 0 ? '+' : ''}
                    {spot.change24h.toFixed(2)} ({spot.changePercent > 0 ? '+' : ''}
                    {spot.changePercent.toFixed(1)}%)
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Spot Detail Inspector Modal */}
      {selectedSpot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl max-w-lg w-full p-6 shadow-2xl text-stone-900 dark:text-stone-100">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase font-semibold text-emerald-700 dark:text-emerald-400">
                  {selectedSpot.category} · Benchmark Exchange
                </div>
                <h3 className="text-xl font-display font-bold mt-1">{selectedSpot.crop}</h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Reference Hub: {selectedSpot.marketHub}
                </p>
              </div>
              <button
                onClick={() => setSelectedSpot(null)}
                className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-stone-600 dark:text-stone-300">Spot Market Settlement</span>
                <div className="text-right">
                  <div className="text-2xl font-mono font-bold tabular-nums text-emerald-800 dark:text-emerald-400">
                    ${selectedSpot.benchmarkPrice.toFixed(2)}
                  </div>
                  <div className="text-xs text-stone-500">per {selectedSpot.unit}</div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-700 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-stone-500 dark:text-stone-400">30-Day Range:</span>
                  <div className="font-mono tabular-nums font-semibold mt-0.5">
                    ${selectedSpot.low30d.toFixed(2)} – ${selectedSpot.high30d.toFixed(2)}
                  </div>
                </div>
                <div>
                  <span className="text-stone-500 dark:text-stone-400">24h Price Action:</span>
                  <div
                    className={`font-mono tabular-nums font-semibold mt-0.5 ${
                      selectedSpot.change24h >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {selectedSpot.change24h >= 0 ? '+' : ''}${selectedSpot.change24h.toFixed(2)} ({selectedSpot.changePercent}%)
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2.5 text-xs text-stone-600 dark:text-stone-300">
              <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
              <p>
                TerraDirect benchmark rates are aggregated hourly from APMC mandis, CBOT, and international agricultural terminals. Farmers utilize this transparent floor index when quoting wholesale farm-gate contracts.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  if (onSelectCommodity) onSelectCommodity(selectedSpot.crop);
                  setSelectedSpot(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors"
              >
                Find Marketplace Sellers
              </button>
              <button
                onClick={() => setSelectedSpot(null)}
                className="px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
