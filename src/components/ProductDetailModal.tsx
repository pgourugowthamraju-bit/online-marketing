import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, MapPin, Calendar, Clock, PackageCheck, Award } from 'lucide-react';
import { Product } from '../types/marketplace';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onRequestRFQ: (cropName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onRequestRFQ,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(product.minOrderQty);
  const [activeTab, setActiveTab] = useState<'specs' | 'tiers' | 'grower'>('specs');
  const [added, setAdded] = useState(false);

  const matchedTier = [...product.wholesaleTiers]
    .reverse()
    .find((tier) => quantity >= tier.minQty);
  const effectivePrice = matchedTier ? matchedTier.price : product.pricePerUnit;
  const lineTotal = effectivePrice * quantity;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden my-8 text-stone-900 dark:text-stone-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="uppercase font-semibold tracking-wider text-emerald-800 dark:text-emerald-400">
              {product.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>Lot ID #{product.id.toUpperCase()}</span>
            <span aria-hidden="true">·</span>
            <span>{product.grade}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Split 2-Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Left: Product Image & Freshness Card */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-stone-950/80 backdrop-blur-xs text-white text-xs font-medium px-2.5 py-1 rounded-sm">
                Harvested {product.freshnessDays} days ago
              </div>
            </div>

            {/* Farm Origin Box */}
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs uppercase font-semibold tracking-wider text-stone-500 dark:text-stone-400">
                    Grower & Origin
                  </div>
                  <div className="text-sm font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                    {product.farmName}
                  </div>
                  <div className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                    Managed by {product.farmerName} · {product.location}
                  </div>
                </div>
              </div>

              {/* Certifications Row (Zero Pill - Unboxed text) */}
              <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-700 flex flex-wrap items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                {product.certifications.map((cert, idx) => (
                  <span key={cert} className="font-medium text-stone-800 dark:text-stone-200">
                    {cert}
                    {idx < product.certifications.length - 1 && <span className="text-stone-400 ml-2" aria-hidden="true">·</span>}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Technical Specs & Purchasing Module */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-display font-bold text-stone-900 dark:text-stone-50 leading-snug">
                {product.title}
              </h2>
              <p className="text-xs text-emerald-800 dark:text-emerald-400 font-medium mt-1">
                {product.variety}
              </p>

              <p className="text-xs text-stone-600 dark:text-stone-300 mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Spec Segmented Tabs */}
              <div className="mt-5 flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`flex-1 py-1.5 rounded-md transition-colors ${
                    activeTab === 'specs'
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                  }`}
                >
                  Lab Specs
                </button>
                <button
                  onClick={() => setActiveTab('tiers')}
                  className={`flex-1 py-1.5 rounded-md transition-colors ${
                    activeTab === 'tiers'
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                  }`}
                >
                  Bulk Tiers
                </button>
                <button
                  onClick={() => setActiveTab('grower')}
                  className={`flex-1 py-1.5 rounded-md transition-colors ${
                    activeTab === 'grower'
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-semibold'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
                  }`}
                >
                  Logistics
                </button>
              </div>

              {/* Tab Contents */}
              <div className="mt-4 min-h-[140px]">
                {activeTab === 'specs' && (
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/60">
                      <span className="text-stone-500 dark:text-stone-400">Moisture Index:</span>
                      <div className="font-mono tabular-nums font-semibold mt-0.5">
                        {product.moisturePercent ? `${product.moisturePercent}% (Optimum)` : 'Standard Grade'}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/60">
                      <span className="text-stone-500 dark:text-stone-400">Purity Content:</span>
                      <div className="font-mono tabular-nums font-semibold mt-0.5">
                        {product.purityPercent ? `${product.purityPercent}% Certified` : '99.0% Field Standard'}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/60">
                      <span className="text-stone-500 dark:text-stone-400">Harvest Date:</span>
                      <div className="font-mono tabular-nums font-semibold mt-0.5">
                        {product.harvestDate}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/60">
                      <span className="text-stone-500 dark:text-stone-400">Shelf Retention:</span>
                      <div className="font-semibold mt-0.5 truncate">{product.shelfLife}</div>
                    </div>
                  </div>
                )}

                {activeTab === 'tiers' && (
                  <div className="space-y-2 text-xs">
                    <div className="text-stone-500 dark:text-stone-400 font-medium mb-1">
                      Volume Discount Tiers (Direct Farm Contract):
                    </div>
                    {product.wholesaleTiers.map((tier, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-2 rounded-md border ${
                          quantity >= tier.minQty
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 font-medium'
                            : 'bg-stone-50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-700'
                        }`}
                      >
                        <span className="font-mono">
                          {tier.minQty}+ {product.unit}
                        </span>
                        <div className="flex items-center gap-2">
                          {tier.discountPercent && (
                            <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono">
                              save {tier.discountPercent}%
                            </span>
                          )}
                          <span className="font-mono tabular-nums font-bold">
                            ${tier.price.toFixed(2)} / {product.unit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'grower' && (
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/60">
                      <span className="text-stone-500 dark:text-stone-400">Packaging Type:</span>
                      <div className="font-medium mt-0.5">{product.packagingType}</div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800/40 border border-stone-200/60 dark:border-stone-700/60">
                      <span className="text-stone-500 dark:text-stone-400">Available Lot Size:</span>
                      <div className="font-mono tabular-nums font-medium mt-0.5">
                        {product.stockQty.toLocaleString()} {product.unit} remaining at farm-gate
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contiguous Purchase Module */}
            <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800">
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <span className="text-2xl font-mono font-bold tabular-nums text-stone-900 dark:text-white">
                    ${effectivePrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-400 ml-1">/{product.unit}</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-stone-500">Lot Subtotal:</div>
                  <div className="text-sm font-mono font-bold tabular-nums text-emerald-800 dark:text-emerald-400">
                    ${lineTotal.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Quantity Stepper & Buttons */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-800 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(product.minOrderQty, q - (product.unit.includes('tonne') ? 1 : 5)))}
                    className="px-2.5 py-1 text-stone-700 dark:text-stone-200 hover:text-stone-950 font-bold"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || product.minOrderQty;
                      setQuantity(Math.min(product.stockQty, Math.max(product.minOrderQty, val)));
                    }}
                    className="w-16 text-center font-mono text-xs font-semibold bg-transparent focus:outline-hidden"
                  />
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stockQty, q + (product.unit.includes('tonne') ? 1 : 5)))}
                    className="px-2.5 py-1 text-stone-700 dark:text-stone-200 hover:text-stone-950 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg shadow-xs transition-colors ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                  }`}
                >
                  {added ? 'Added to Batch Order' : 'Add Lot to Order'}
                </button>

                <button
                  onClick={() => {
                    onRequestRFQ(product.title);
                    onClose();
                  }}
                  className="py-2.5 px-3 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg transition-colors"
                >
                  Request RFQ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
