import React from 'react';
import { PlusCircle, FileText, Building2, MapPin, Calendar, Clock, CheckCircle } from 'lucide-react';
import { RFQItem } from '../types/marketplace';

interface RFQDeskViewProps {
  rfqs: RFQItem[];
  onOpenRFQModal: () => void;
}

export const RFQDeskView: React.FC<RFQDeskViewProps> = ({ rfqs, onOpenRFQModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="text-xs uppercase font-semibold text-emerald-800 dark:text-emerald-400 tracking-wider">
            Commercial Procurement Desk
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-stone-900 dark:text-stone-50 mt-1">
            Bulk Commodity RFQ & Volume Tenders
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
            Contract directly for multi-ton grain shipments, seasonal produce supply agreements, and custom cold-pressed oil press runs with verified farm collectives.
          </p>
        </div>

        <button
          onClick={onOpenRFQModal}
          className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-xs transition-colors shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Wholesale RFQ Tender</span>
        </button>
      </div>

      {/* Active Tenders List */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-base text-stone-900 dark:text-stone-100">
            Active Tender Inquiries ({rfqs.length})
          </h3>
          <span className="text-xs text-stone-500">
            Live grower counter-bidding enabled
          </span>
        </div>

        <div className="space-y-4">
          {rfqs.map((rfq) => (
            <div
              key={rfq.id}
              className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5"
            >
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono font-bold text-stone-900 dark:text-stone-100 uppercase">
                    Tender #{rfq.id}
                  </span>
                  <span className="text-stone-400" aria-hidden="true">·</span>
                  <span className="text-stone-500">Submitted {rfq.dateSubmitted}</span>
                  <span className="text-stone-400" aria-hidden="true">·</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    {rfq.status}
                  </span>
                </div>

                <h4 className="text-base font-bold text-stone-900 dark:text-stone-50">
                  {rfq.cropRequested}
                </h4>

                <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 dark:text-stone-300">
                  <div className="flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-stone-400" />
                    <span>{rfq.buyerCompany} ({rfq.buyerName})</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>Destination: {rfq.deliveryZip}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    <span>Target Delivery: {rfq.deliveryDate}</span>
                  </div>
                </div>

                {rfq.notes && (
                  <p className="text-xs text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/40 p-2.5 rounded-lg border border-stone-200/60 dark:border-stone-700/60">
                    <span className="font-semibold text-stone-700 dark:text-stone-300">Specs: </span>
                    {rfq.notes}
                  </p>
                )}
              </div>

              {/* Volume & Price Box */}
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center border-t md:border-t-0 md:border-l border-stone-100 dark:border-stone-800 pt-3 md:pt-0 md:pl-6 shrink-0 gap-2">
                <div className="text-left md:text-right">
                  <div className="text-xs text-stone-500">Target Volume:</div>
                  <div className="text-lg font-mono font-bold tabular-nums text-stone-900 dark:text-stone-100">
                    {rfq.targetVolume.toLocaleString()} {rfq.unit}
                  </div>
                </div>

                <div className="text-left md:text-right">
                  <div className="text-xs text-stone-500">Target Price / Unit:</div>
                  <div className="text-sm font-mono font-semibold tabular-nums text-emerald-800 dark:text-emerald-400">
                    ${rfq.targetPricePerUnit.toFixed(2)} / {rfq.unit}
                  </div>
                </div>

                <div className="mt-1 text-xs text-stone-500 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{rfq.quotesCount} Grower {rfq.quotesCount === 1 ? 'quote' : 'quotes'} received</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
