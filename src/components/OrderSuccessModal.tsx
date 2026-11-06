import React from 'react';
import { CheckCircle2, X, Download, Truck, Calendar, MapPin, Building2 } from 'lucide-react';
import { Order } from '../types/marketplace';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden my-8 text-stone-900 dark:text-stone-100">
        {/* Header */}
        <div className="p-6 bg-emerald-800 text-white text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-7 h-7 text-emerald-300" />
          </div>
          <h3 className="font-display font-bold text-xl">Agricultural Order Confirmed</h3>
          <p className="text-xs text-emerald-100 mt-1">
            Order Reference: <span className="font-mono font-bold tracking-wider">{order.id}</span>
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto text-xs">
          {/* Dispatch Notice */}
          <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700 flex items-start gap-3">
            <Truck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-stone-900 dark:text-stone-100">
                Logistics: {order.freightType}
              </div>
              <div className="text-stone-500 mt-0.5">
                Estimated Farm Gate Dispatch: <span className="font-mono font-medium">{order.estimatedDeliveryDate}</span>
              </div>
            </div>
          </div>

          {/* Delivery & Billing */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700">
            <div>
              <span className="text-stone-500">Destination:</span>
              <div className="font-medium mt-0.5 truncate">{order.deliveryAddress}</div>
            </div>
            <div>
              <span className="text-stone-500">Commercial Terms:</span>
              <div className="font-medium mt-0.5 truncate">{order.paymentMethod}</div>
            </div>
          </div>

          {/* Itemized Lots */}
          <div>
            <div className="font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Reserved Farm Lots:
            </div>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold truncate">{item.product.title}</div>
                    <div className="text-[11px] text-stone-500 truncate">
                      {item.product.farmName} · {item.quantity} {item.product.unit} @ ${item.effectiveUnitPrice.toFixed(2)}
                    </div>
                  </div>
                  <div className="font-mono tabular-nums font-bold text-right ml-3">
                    ${(item.effectiveUnitPrice * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="pt-3 border-t border-stone-200 dark:border-stone-800 space-y-1">
            <div className="flex justify-between text-stone-500">
              <span>Lot Subtotal:</span>
              <span className="font-mono tabular-nums">${order.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>Freight Handling:</span>
              <span className="font-mono tabular-nums">
                {order.freightCost > 0 ? `$${order.freightCost.toFixed(2)}` : 'Free ($0.00)'}
              </span>
            </div>
            <div className="flex justify-between font-bold text-sm text-stone-900 dark:text-stone-100 pt-1 border-t border-stone-200 dark:border-stone-700">
              <span>Total Invoiced:</span>
              <span className="font-mono tabular-nums text-emerald-800 dark:text-emerald-400">
                ${order.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 dark:bg-stone-900/60 border-t border-stone-200 dark:border-stone-800 flex items-center justify-end gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print Bill of Lading</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg transition-colors"
          >
            Return to Marketplace
          </button>
        </div>
      </div>
    </div>
  );
};
