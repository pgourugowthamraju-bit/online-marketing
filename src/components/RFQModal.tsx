import React, { useState } from 'react';
import { X, Send, FileText, CheckCircle2 } from 'lucide-react';
import { RFQItem } from '../types/marketplace';

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRFQ: (rfq: RFQItem) => void;
  prefilledCrop?: string;
}

export const RFQModal: React.FC<RFQModalProps> = ({
  isOpen,
  onClose,
  onSubmitRFQ,
  prefilledCrop = '',
}) => {
  if (!isOpen) return null;

  const [cropRequested, setCropRequested] = useState(prefilledCrop || 'Heirloom Hard Red Wheat Grain');
  const [buyerName, setBuyerName] = useState('');
  const [buyerCompany, setBuyerCompany] = useState('');
  const [category, setCategory] = useState('grains');
  const [targetVolume, setTargetVolume] = useState<number>(2000);
  const [unit, setUnit] = useState('kg');
  const [targetPricePerUnit, setTargetPricePerUnit] = useState<number>(1.80);
  const [deliveryZip, setDeliveryZip] = useState('97201');
  const [deliveryDate, setDeliveryDate] = useState('2026-11-25');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropRequested || !buyerName || !buyerCompany) return;

    const newRfq: RFQItem = {
      id: `rfq-${Date.now().toString().slice(-4)}`,
      buyerName,
      buyerCompany,
      cropRequested,
      category,
      targetVolume: Number(targetVolume),
      unit,
      targetPricePerUnit: Number(targetPricePerUnit),
      deliveryZip,
      deliveryDate,
      status: 'Open',
      dateSubmitted: new Date().toISOString().split('T')[0],
      notes,
      quotesCount: 1, // simulated initial matching grower
    };

    onSubmitRFQ(newRfq);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden my-8 text-stone-900 dark:text-stone-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-stone-900 dark:bg-stone-100 flex items-center justify-center text-white dark:text-stone-900">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg">Wholesale Commodity RFQ</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">Request for Quote directly to regional growers</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center flex flex-col items-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mb-3 animate-in zoom-in" />
            <h4 className="text-lg font-bold font-display">RFQ Broadcast to Verified Growers</h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 max-w-sm">
              Your volume tender for <span className="font-semibold text-stone-800 dark:text-stone-200">{targetVolume.toLocaleString()} {unit} {cropRequested}</span> has been routed to 12 matching farm collectives. Growers will submit counter-bids within 4 business hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Requested Agricultural Commodity *
              </label>
              <input
                type="text"
                required
                value={cropRequested}
                onChange={(e) => setCropRequested(e.target.value)}
                placeholder="e.g. Organic Hard Red Winter Wheat or Basmati Rice"
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Procurement Officer Name *
                </label>
                <input
                  type="text"
                  required
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="e.g. Rachel Chen"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Company / Organization *
                </label>
                <input
                  type="text"
                  required
                  value={buyerCompany}
                  onChange={(e) => setBuyerCompany(e.target.value)}
                  placeholder="e.g. Apex Artisanal Milling Co."
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-700">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Target Volume *
                </label>
                <input
                  type="number"
                  required
                  value={targetVolume}
                  onChange={(e) => setTargetVolume(parseInt(e.target.value) || 1)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono font-bold rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Unit
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                >
                  <option value="kg">kg</option>
                  <option value="crate (12kg)">crate (12kg)</option>
                  <option value="sack (25kg)">sack (25kg)</option>
                  <option value="tonne">metric tonne</option>
                  <option value="bottle (500ml)">bottle (500ml)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Target Price / Unit ($)
                </label>
                <input
                  type="number"
                  step="0.05"
                  value={targetPricePerUnit}
                  onChange={(e) => setTargetPricePerUnit(parseFloat(e.target.value) || 0)}
                  className="w-full px-2.5 py-1.5 text-xs font-mono font-bold rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Destination Postal / Zip Code
                </label>
                <input
                  type="text"
                  value={deliveryZip}
                  onChange={(e) => setDeliveryZip(e.target.value)}
                  placeholder="e.g. 97201 (Portland, OR)"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  Desired Delivery Window
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Quality Criteria & Special Handling (Moisture, Palletization, Lab Certification)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specific protein levels, organic cert requirement, pallet exchange, reefer temperature range..."
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
              />
            </div>

            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-stone-600 dark:text-stone-300 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold rounded-lg text-white bg-emerald-800 hover:bg-emerald-900 shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit RFQ Tender</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
