import React, { useState } from 'react';
import { Plus, Minus, MapPin, Eye, Check } from 'lucide-react';
import { Product } from '../types/marketplace';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
}) => {
  const [quantity, setQuantity] = useState(product.minOrderQty);
  const [imgError, setImgError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Compute effective tier price based on current quantity
  const matchedTier = [...product.wholesaleTiers]
    .reverse()
    .find((tier) => quantity >= tier.minQty);
  const effectivePrice = matchedTier ? matchedTier.price : product.pricePerUnit;

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(product.stockQty, prev + (product.unit.includes('tonne') ? 1 : product.minOrderQty)));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(product.minOrderQty, prev - (product.unit.includes('tonne') ? 1 : product.minOrderQty)));
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  return (
    <article className="group flex flex-col bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      {/* Product Image Stage */}
      <div className="relative aspect-4/3 w-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 dark:bg-stone-800 text-stone-500 p-6 text-center">
            <span className="text-xs uppercase font-semibold tracking-wider text-emerald-700 dark:text-emerald-400">
              {product.category}
            </span>
            <span className="text-sm font-medium text-stone-700 dark:text-stone-300 mt-1">
              {product.variety}
            </span>
          </div>
        )}

        {/* Quick View Button Overlay */}
        <button
          onClick={() => onViewDetails(product)}
          className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white rounded-lg shadow-xs backdrop-blur-xs transition-colors"
          title="Inspect Lab Specifications"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Quiet Harvest Freshness Text (Zero Pill) */}
        <div className="absolute bottom-2 left-2 text-[11px] font-medium text-stone-100 bg-stone-950/70 backdrop-blur-xs px-2 py-0.5 rounded-sm">
          Harvested {product.freshnessDays} {product.freshnessDays === 1 ? 'day' : 'days'} ago
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex flex-col flex-1">
        {/* Unboxed Metadata with Typographic Separators */}
        <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
          <span className="uppercase tracking-wider font-semibold text-emerald-800 dark:text-emerald-400">
            {product.category}
          </span>
          <span aria-hidden="true">·</span>
          <span>{product.grade}</span>
          {product.organic && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-stone-600 dark:text-stone-300">Organic</span>
            </>
          )}
        </div>

        {/* Product Title */}
        <h3
          onClick={() => onViewDetails(product)}
          className="mt-2 text-base font-semibold text-stone-900 dark:text-stone-100 leading-snug line-clamp-1 hover:text-emerald-800 dark:hover:text-emerald-400 cursor-pointer transition-colors"
        >
          {product.title}
        </h3>

        {/* Variety Subtext */}
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
          {product.variety}
        </p>

        {/* Farm & Origin Geolocation */}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-300">
          <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          <span className="truncate">{product.farmName}</span>
          <span className="text-stone-400" aria-hidden="true">·</span>
          <span className="text-stone-500 dark:text-stone-400 truncate">{product.location}</span>
        </div>

        {/* Price & Packaging Row */}
        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-mono font-bold tabular-nums text-stone-900 dark:text-stone-50">
                ${effectivePrice.toFixed(2)}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400">/{product.unit}</span>
            </div>
            {matchedTier && matchedTier.discountPercent && matchedTier.discountPercent > 0 ? (
              <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-mono">
                {matchedTier.discountPercent}% bulk tier savings
              </span>
            ) : (
              <span className="text-[11px] text-stone-400">
                MOQ: {product.minOrderQty} {product.unit}
              </span>
            )}
          </div>

          <div className="text-right text-[11px] text-stone-500 dark:text-stone-400 font-mono tabular-nums">
            Stock: {product.stockQty.toLocaleString()} {product.unit}
          </div>
        </div>

        {/* Wholesale Tier Hint Bar */}
        {product.wholesaleTiers.length > 1 && (
          <div className="mt-3 py-1.5 px-2 bg-stone-50 dark:bg-stone-800/60 rounded-md border border-stone-200/60 dark:border-stone-700/60 text-[11px] text-stone-600 dark:text-stone-300 flex items-center justify-between">
            <span className="text-stone-500 dark:text-stone-400">Next tier:</span>
            <span className="font-mono tabular-nums font-medium text-emerald-800 dark:text-emerald-400">
              {product.wholesaleTiers[1].minQty}+ {product.unit} @ ${product.wholesaleTiers[1].price.toFixed(2)}
            </span>
          </div>
        )}

        {/* Interactive Order Action Strip */}
        <div className="mt-4 pt-2 flex items-center gap-2">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-lg bg-stone-50 dark:bg-stone-800">
            <button
              onClick={handleDecrement}
              disabled={quantity <= product.minOrderQty}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono tabular-nums text-xs font-semibold text-stone-900 dark:text-stone-100 min-w-10 text-center">
              {quantity}
            </span>
            <button
              onClick={handleIncrement}
              disabled={quantity >= product.stockQty}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg shadow-xs transition-colors whitespace-nowrap ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-white'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Batch</span>
              </>
            ) : (
              <span>Add to Order</span>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
