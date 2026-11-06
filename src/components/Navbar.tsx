import React from 'react';
import { ShoppingBag, Sun, Moon, Sprout } from 'lucide-react';

interface NavbarProps {
  activeTab: 'marketplace' | 'spots' | 'farmer' | 'rfq';
  setActiveTab: (tab: 'marketplace' | 'spots' | 'farmer' | 'rfq') => void;
  cartCount: number;
  onOpenCart: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  onOpenCart,
  isDark,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => setActiveTab('marketplace')}
          className="flex items-center gap-2.5 text-left text-stone-900 dark:text-stone-50 font-display text-xl font-bold tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white shadow-xs">
            <Sprout className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span>TerraDirect</span>
        </button>

        {/* Zone 2: 4-5 Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600 dark:text-stone-300">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-emerald-700 dark:hover:text-emerald-400 ${
              activeTab === 'marketplace'
                ? 'text-emerald-800 dark:text-emerald-400 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-700'
                : ''
            }`}
          >
            Marketplace
          </button>
          <button
            onClick={() => setActiveTab('spots')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-emerald-700 dark:hover:text-emerald-400 ${
              activeTab === 'spots'
                ? 'text-emerald-800 dark:text-emerald-400 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-700'
                : ''
            }`}
          >
            Live Mandi Rates
          </button>
          <button
            onClick={() => setActiveTab('farmer')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-emerald-700 dark:hover:text-emerald-400 ${
              activeTab === 'farmer'
                ? 'text-emerald-800 dark:text-emerald-400 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-700'
                : ''
            }`}
          >
            Farmer Portal
          </button>
          <button
            onClick={() => setActiveTab('rfq')}
            className={`transition-colors whitespace-nowrap shrink-0 hover:text-emerald-700 dark:hover:text-emerald-400 ${
              activeTab === 'rfq'
                ? 'text-emerald-800 dark:text-emerald-400 font-semibold underline underline-offset-8 decoration-2 decoration-emerald-700'
                : ''
            }`}
          >
            Bulk RFQ Desk
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Utility */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-white bg-emerald-800 dark:bg-emerald-700 hover:bg-emerald-900 dark:hover:bg-emerald-600 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Batch</span>
            {cartCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-mono font-bold bg-amber-400 text-stone-950 rounded-sm tabular-nums">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
