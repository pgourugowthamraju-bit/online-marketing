/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  INITIAL_PRODUCTS,
  INITIAL_COMMODITY_SPOTS,
  INITIAL_RFQS,
} from './data/mockData';
import {
  Product,
  CartItem,
  CommoditySpot,
  RFQItem,
  Order,
  Category,
} from './types/marketplace';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CommodityTicker } from './components/CommodityTicker';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { FarmerListingModal } from './components/FarmerListingModal';
import { RFQModal } from './components/RFQModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { SpotRatesView } from './components/SpotRatesView';
import { FarmerPortalView } from './components/FarmerPortalView';
import { RFQDeskView } from './components/RFQDeskView';
import { FoundersVision } from './components/FoundersVision';
import { Footer } from './components/Footer';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'marketplace' | 'spots' | 'farmer' | 'rfq'>('marketplace');

  // Dark Theme State
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('terradirect_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('terradirect_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('terradirect_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Products State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('terradirect_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('terradirect_products', JSON.stringify(products));
  }, [products]);

  // Commodity Spots State
  const [spots, setSpots] = useState<CommoditySpot[]>(INITIAL_COMMODITY_SPOTS);

  // RFQ State
  const [rfqs, setRfqs] = useState<RFQItem[]>(() => {
    const saved = localStorage.getItem('terradirect_rfqs');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_RFQS;
      }
    }
    return INITIAL_RFQS;
  });

  useEffect(() => {
    localStorage.setItem('terradirect_rfqs', JSON.stringify(rfqs));
  }, [rfqs]);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('terradirect_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('terradirect_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Completed Orders State
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFarmerModalOpen, setIsFarmerModalOpen] = useState(false);
  const [isRFQModalOpen, setIsRFQModalOpen] = useState(false);
  const [rfqPrefillCrop, setRfqPrefillCrop] = useState('');

  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [organicOnly, setOrganicOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'freshness'>('featured');

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      const matchedTier = [...product.wholesaleTiers]
        .reverse()
        .find((tier) => quantity >= tier.minQty);
      const effectiveUnitPrice = matchedTier ? matchedTier.price : product.pricePerUnit;

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        const newTier = [...product.wholesaleTiers]
          .reverse()
          .find((tier) => newQty >= tier.minQty);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          effectiveUnitPrice: newTier ? newTier.price : product.pricePerUnit,
        };
        return updated;
      } else {
        return [...prev, { product, quantity, effectiveUnitPrice }];
      }
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          const matchedTier = [...item.product.wholesaleTiers]
            .reverse()
            .find((tier) => quantity >= tier.minQty);
          return {
            ...item,
            quantity,
            effectiveUnitPrice: matchedTier ? matchedTier.price : item.product.pricePerUnit,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => setCartItems([]);

  // Farmer New Product Handler
  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  // RFQ Submission Handler
  const handleAddRFQ = (newRfq: RFQItem) => {
    setRfqs((prev) => [newRfq, ...prev]);
  };

  // Spot Rates Refresh Simulation
  const handleRefreshSpots = () => {
    setSpots((prev) =>
      prev.map((spot) => {
        const delta = (Math.random() - 0.48) * 4;
        const newPrice = Math.max(10, spot.benchmarkPrice + delta);
        const change24h = newPrice - (spot.benchmarkPrice - spot.change24h);
        return {
          ...spot,
          benchmarkPrice: Math.round(newPrice * 100) / 100,
          change24h: Math.round(change24h * 100) / 100,
          changePercent: Math.round((change24h / newPrice) * 1000) / 10,
          trend: change24h >= 0 ? 'up' : 'down',
          lastUpdated: 'Just now',
        };
      })
    );
  };

  // Filtered & Sorted Products
  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.variety.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.farmName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesOrganic = !organicOnly || p.organic;
    return matchesCat && matchesSearch && matchesOrganic;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.pricePerUnit - b.pricePerUnit;
    if (sortBy === 'price-desc') return b.pricePerUnit - a.pricePerUnit;
    if (sortBy === 'freshness') return a.freshnessDays - b.freshnessDays;
    return 0; // featured default
  });

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      {/* 3-Zone Top Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Live Mandi Spot Price Ticker */}
      <CommodityTicker
        spots={spots}
        onRefreshSpots={handleRefreshSpots}
        onSelectCommodity={(crop) => {
          setSearchQuery(crop.split(' ')[0]);
          setActiveTab('marketplace');
        }}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'marketplace' && (
          <>
            {/* Hero Banner Section */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onExploreCatalog={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenFarmerPortal={() => setIsFarmerModalOpen(true)}
            />

            {/* Catalog & Filter Section */}
            <div id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
                <div>
                  <div className="text-xs uppercase font-semibold text-emerald-800 dark:text-emerald-400 tracking-wider">
                    Traceable Agricultural Supply
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 dark:text-stone-50 mt-1">
                    Direct Farm Harvest Catalog
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1">
                    Verified crop lots with laboratory moisture, purity, and chemical screening certificates.
                  </p>
                </div>

                {/* Secondary Actions */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    onClick={() => setIsFarmerModalOpen(true)}
                    className="px-3.5 py-2 text-xs font-semibold text-emerald-900 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                  >
                    + List Farm Harvest
                  </button>
                  <button
                    onClick={() => {
                      setRfqPrefillCrop('');
                      setIsRFQModalOpen(true);
                    }}
                    className="px-3.5 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                  >
                    Wholesale RFQ
                  </button>
                </div>
              </div>

              {/* Segmented Filter Bar & Controls */}
              <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Category Segmented Tabs */}
                <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-900 rounded-xl overflow-x-auto no-scrollbar border border-stone-200/60 dark:border-stone-800">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                      selectedCategory === 'all'
                        ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    All Commodities
                  </button>
                  <button
                    onClick={() => setSelectedCategory('grains')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                      selectedCategory === 'grains'
                        ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    Heirloom Grains
                  </button>
                  <button
                    onClick={() => setSelectedCategory('produce')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                      selectedCategory === 'produce'
                        ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    Fresh Produce Crates
                  </button>
                  <button
                    onClick={() => setSelectedCategory('oils')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                      selectedCategory === 'oils'
                        ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    Cold-Pressed Oils
                  </button>
                  <button
                    onClick={() => setSelectedCategory('supplies')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                      selectedCategory === 'supplies'
                        ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    Bio-Fertilizers & Soil
                  </button>
                  <button
                    onClick={() => setSelectedCategory('equipment')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                      selectedCategory === 'equipment'
                        ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs font-semibold'
                        : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                    }`}
                  >
                    Precision IoT Hardware
                  </button>
                </div>

                {/* Quick Filters & Sorting */}
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-xs font-medium text-stone-700 dark:text-stone-300 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={organicOnly}
                      onChange={(e) => setOrganicOnly(e.target.checked)}
                      className="rounded text-emerald-700 focus:ring-emerald-600 dark:bg-stone-900"
                    />
                    <span>Organic Certified Only</span>
                  </label>

                  <div className="h-4 w-px bg-stone-200 dark:bg-stone-800 hidden sm:block" />

                  <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400">
                    <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-2.5 py-1.5 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-medium"
                    >
                      <option value="featured">Featured Harvest Lots</option>
                      <option value="freshness">Freshest Harvest First</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Active Search / Filter Count */}
              {(searchQuery || selectedCategory !== 'all' || organicOnly) && (
                <div className="mt-4 flex items-center justify-between text-xs text-stone-500">
                  <div>
                    Showing <span className="font-semibold text-stone-800 dark:text-stone-200">{sortedProducts.length}</span> lot {sortedProducts.length === 1 ? 'match' : 'matches'}
                    {searchQuery && ` for "${searchQuery}"`}
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setOrganicOnly(false);
                    }}
                    className="text-emerald-700 dark:text-emerald-400 hover:underline"
                  >
                    Reset all filters
                  </button>
                </div>
              )}

              {/* Product Grid: 3-Column Desktop, 2-Column Tablet, Generous Whitespace */}
              {sortedProducts.length > 0 ? (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {sortedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onViewDetails={(p) => setSelectedProduct(p)}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-stone-100 dark:bg-stone-900/50 rounded-2xl border border-stone-200 dark:border-stone-800 mt-8">
                  <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                    No agricultural lots match your criteria
                  </p>
                  <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                    Try broadening your search term or request a custom procurement contract via our RFQ desk.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setOrganicOnly(false);
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors"
                  >
                    Reset Search & Filters
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* Live Mandi Spot View */}
        {activeTab === 'spots' && (
          <SpotRatesView
            spots={spots}
            onRefresh={handleRefreshSpots}
            onSelectCommodityForCatalog={(crop) => {
              setSearchQuery(crop.split(' ')[0]);
              setActiveTab('marketplace');
            }}
            onRequestRFQ={(crop) => {
              setRfqPrefillCrop(crop);
              setIsRFQModalOpen(true);
            }}
          />
        )}

        {/* Farmer Portal View */}
        {activeTab === 'farmer' && (
          <FarmerPortalView
            products={products}
            onOpenListingModal={() => setIsFarmerModalOpen(true)}
            onViewProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {/* Bulk RFQ Desk View */}
        {activeTab === 'rfq' && (
          <RFQDeskView
            rfqs={rfqs}
            onOpenRFQModal={() => {
              setRfqPrefillCrop('');
              setIsRFQModalOpen(true);
            }}
          />
        )}
      </main>

      {/* Founder's Vision & Charter */}
      <FoundersVision />

      {/* Footer */}
      <Footer
        onNavigateTab={(tab) => setActiveTab(tab)}
        onOpenFarmerModal={() => setIsFarmerModalOpen(true)}
        onOpenRFQModal={() => {
          setRfqPrefillCrop('');
          setIsRFQModalOpen(true);
        }}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onRequestRFQ={(crop) => {
          setRfqPrefillCrop(crop);
          setIsRFQModalOpen(true);
        }}
      />

      {/* Farmer Listing Modal */}
      <FarmerListingModal
        isOpen={isFarmerModalOpen}
        onClose={() => setIsFarmerModalOpen(false)}
        onAddProduct={handleAddProduct}
      />

      {/* RFQ Tender Modal */}
      <RFQModal
        isOpen={isRFQModalOpen}
        onClose={() => setIsRFQModalOpen(false)}
        onSubmitRFQ={handleAddRFQ}
        prefilledCrop={rfqPrefillCrop}
      />

      {/* Slide-over Cart & Freight Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onOrderSuccess={(order) => {
          setIsCartOpen(false);
          setConfirmedOrder(order);
        }}
      />

      {/* Confirmed Order Modal */}
      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />
    </div>
  );
}
