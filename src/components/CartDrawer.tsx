import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Truck, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { CartItem, Order } from '../types/marketplace';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOrderSuccess: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<'cart' | 'checkout'>('cart');
  const [freightType, setFreightType] = useState<'Reefer Cold Chain' | 'Standard Dry Bulk' | 'Direct Farm Gate Pickup'>('Reefer Cold Chain');
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerPhone, setBuyerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Net-30 Ag Credit' | 'Cash on Delivery (COD)' | 'Instant Bank Transfer / ACH'>('Net-30 Ag Credit');

  const subtotal = cartItems.reduce((acc, item) => acc + item.effectiveUnitPrice * item.quantity, 0);

  const freightCost =
    cartItems.length === 0
      ? 0
      : freightType === 'Reefer Cold Chain'
      ? 45.0
      : freightType === 'Standard Dry Bulk'
      ? 25.0
      : 0.0;

  const grandTotal = subtotal + freightCost;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const newOrder: Order = {
      id: `TD-${Date.now().toString().slice(-6)}`,
      items: [...cartItems],
      subtotal,
      freightCost,
      freightType,
      total: grandTotal,
      buyerName: buyerName || 'Direct Agriculture Buyer',
      buyerEmail: buyerEmail || 'purchasing@grower-direct.com',
      buyerPhone: buyerPhone || '+1 (555) 438-2910',
      deliveryAddress: deliveryAddress || '742 Evergreen Agricultural Hub, Central Warehouse #4',
      paymentMethod,
      createdAt: new Date().toISOString(),
      status: 'Order Confirmed',
      estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    };

    onOrderSuccess(newOrder);
    onClearCart();
    setStep('cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-lg">
                {step === 'cart' ? 'Agricultural Batch Order' : 'Logistics & Checkout'}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {cartItems.length} {cartItems.length === 1 ? 'commodity lot' : 'commodity lots'} selected
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {step === 'cart' ? (
              <>
                {cartItems.length === 0 ? (
                  <div className="text-center py-16 flex flex-col items-center">
                    <Truck className="w-12 h-12 text-stone-300 dark:text-stone-700 mb-3" />
                    <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                      Your commodity batch is empty
                    </p>
                    <p className="text-xs text-stone-500 mt-1 max-w-xs">
                      Explore heirloom grains, certified cold-pressed oils, or fresh harvest crates in the marketplace catalog.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40 flex gap-3"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          className="w-16 h-16 rounded-lg object-cover shrink-0 border border-stone-200 dark:border-stone-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                              {item.product.title}
                            </h4>
                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-stone-400 hover:text-rose-600 transition-colors p-0.5"
                              title="Remove lot"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 truncate">
                            {item.product.farmName} · {item.product.grade}
                          </div>

                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center border border-stone-300 dark:border-stone-700 rounded-md bg-white dark:bg-stone-900">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(
                                    item.product.id,
                                    Math.max(item.product.minOrderQty, item.quantity - (item.product.unit.includes('tonne') ? 1 : item.product.minOrderQty))
                                  )
                                }
                                className="px-2 py-0.5 text-xs text-stone-600 dark:text-stone-300 hover:text-stone-900"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 font-mono text-xs tabular-nums font-semibold">
                                {item.quantity} {item.product.unit}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateQuantity(
                                    item.product.id,
                                    Math.min(item.product.stockQty, item.quantity + (item.product.unit.includes('tonne') ? 1 : item.product.minOrderQty))
                                  )
                                }
                                className="px-2 py-0.5 text-xs text-stone-600 dark:text-stone-300 hover:text-stone-900"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <div className="text-right">
                              <div className="font-mono text-xs font-bold tabular-nums text-stone-900 dark:text-stone-100">
                                ${(item.effectiveUnitPrice * item.quantity).toFixed(2)}
                              </div>
                              <div className="text-[10px] text-stone-500 font-mono">
                                @${item.effectiveUnitPrice.toFixed(2)}/{item.product.unit}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Freight Option Selector in Cart */}
                    <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                        Select Freight Handling Method
                      </label>
                      <div className="space-y-1.5">
                        <label
                          className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer text-xs transition-colors ${
                            freightType === 'Reefer Cold Chain'
                              ? 'border-emerald-700 dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                              : 'border-stone-200 dark:border-stone-800'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="freight"
                              checked={freightType === 'Reefer Cold Chain'}
                              onChange={() => setFreightType('Reefer Cold Chain')}
                              className="text-emerald-700 focus:ring-emerald-600"
                            />
                            <div>
                              <span className="font-semibold text-stone-900 dark:text-stone-100">
                                Reefer Cold-Chain Freight
                              </span>
                              <p className="text-[11px] text-stone-500">
                                2-4°C climate monitored pallet transport
                              </p>
                            </div>
                          </div>
                          <span className="font-mono tabular-nums font-semibold">$45.00</span>
                        </label>

                        <label
                          className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer text-xs transition-colors ${
                            freightType === 'Standard Dry Bulk'
                              ? 'border-emerald-700 dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                              : 'border-stone-200 dark:border-stone-800'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="freight"
                              checked={freightType === 'Standard Dry Bulk'}
                              onChange={() => setFreightType('Standard Dry Bulk')}
                              className="text-emerald-700 focus:ring-emerald-600"
                            />
                            <div>
                              <span className="font-semibold text-stone-900 dark:text-stone-100">
                                Standard Dry Logistics
                              </span>
                              <p className="text-[11px] text-stone-500">
                                Ambient covered carrier for grains & dry seed
                              </p>
                            </div>
                          </div>
                          <span className="font-mono tabular-nums font-semibold">$25.00</span>
                        </label>

                        <label
                          className={`flex items-center justify-between p-2.5 rounded-lg border cursor-pointer text-xs transition-colors ${
                            freightType === 'Direct Farm Gate Pickup'
                              ? 'border-emerald-700 dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                              : 'border-stone-200 dark:border-stone-800'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="freight"
                              checked={freightType === 'Direct Farm Gate Pickup'}
                              onChange={() => setFreightType('Direct Farm Gate Pickup')}
                              className="text-emerald-700 focus:ring-emerald-600"
                            />
                            <div>
                              <span className="font-semibold text-stone-900 dark:text-stone-100">
                                Direct Farm Gate Pickup
                              </span>
                              <p className="text-[11px] text-stone-500">
                                Buyer arranges truck or local farm collection
                              </p>
                            </div>
                          </div>
                          <span className="font-mono tabular-nums font-semibold text-emerald-700">Free ($0)</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Checkout Form Step */
              <form id="checkout-form" onSubmit={handleCheckout} className="space-y-4">
                <div className="p-3 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200 dark:border-stone-700 text-xs">
                  <span className="text-stone-500">Dispatch Freight:</span>
                  <div className="font-semibold text-stone-800 dark:text-stone-200 mt-0.5">
                    {freightType} (${freightCost.toFixed(2)})
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Buyer / Entity Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Rachel Foster or Artisan Grain Mills LLC"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="buyer@domain.com"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      Dispatch Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      placeholder="+1 (555) 019-2831"
                      className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Destination Warehouse / Facility Address *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Bay #3, 1040 Agri-Logistics Blvd, Salinas Valley, CA 93901"
                    className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                    Commercial Settlement Terms
                  </label>
                  <div className="space-y-1.5 text-xs">
                    <label className="flex items-center gap-2 p-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/40 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'Net-30 Ag Credit'}
                        onChange={() => setPaymentMethod('Net-30 Ag Credit')}
                        className="text-emerald-700"
                      />
                      <div>
                        <span className="font-semibold">Net-30 Ag Trade Credit</span>
                        <p className="text-[11px] text-stone-500">Invoiced upon weighbridge delivery receipt</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/40 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'Cash on Delivery (COD)'}
                        onChange={() => setPaymentMethod('Cash on Delivery (COD)')}
                        className="text-emerald-700"
                      />
                      <div>
                        <span className="font-semibold">Cash on Delivery (COD) / Gate Inspection</span>
                        <p className="text-[11px] text-stone-500">Settled upon physical lot inspection & moisture check</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-2 p-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/40 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'Instant Bank Transfer / ACH'}
                        onChange={() => setPaymentMethod('Instant Bank Transfer / ACH')}
                        className="text-emerald-700"
                      />
                      <div>
                        <span className="font-semibold">Instant Bank ACH / Escrow Transfer</span>
                        <p className="text-[11px] text-stone-500">Protected escrow until delivery release</p>
                      </div>
                    </label>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Footer Subtotal & Actions */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50">
              <div className="space-y-1.5 text-xs mb-4">
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Produce & Grains Subtotal:</span>
                  <span className="font-mono tabular-nums font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-stone-600 dark:text-stone-400">
                  <span>Logistics Handling:</span>
                  <span className="font-mono tabular-nums font-semibold">
                    {freightCost > 0 ? `$${freightCost.toFixed(2)}` : 'Free ($0.00)'}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex justify-between text-sm font-bold text-stone-900 dark:text-stone-100">
                  <span>Grand Total:</span>
                  <span className="font-mono tabular-nums text-lg text-emerald-800 dark:text-emerald-400">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {step === 'cart' ? (
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full py-3 px-4 text-xs font-semibold rounded-lg text-white bg-emerald-800 hover:bg-emerald-900 shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Proceed to Dispatch Logistics</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="py-3 px-3 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="flex-1 py-3 px-4 text-xs font-semibold rounded-lg text-white bg-emerald-800 hover:bg-emerald-900 shadow-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm & Dispatch Batch Order</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
