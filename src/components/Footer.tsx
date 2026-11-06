import React from 'react';
import { Sprout, ShieldCheck, Mail, Globe2 } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: 'marketplace' | 'spots' | 'farmer' | 'rfq') => void;
  onOpenFarmerModal: () => void;
  onOpenRFQModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTab,
  onOpenFarmerModal,
  onOpenRFQModal,
}) => {
  return (
    <footer className="w-full bg-stone-900 border-t border-stone-800 text-stone-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Col */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-white font-display text-lg font-bold">
            <div className="w-7 h-7 rounded-md bg-emerald-700 flex items-center justify-center text-white">
              <Sprout className="w-4 h-4" />
            </div>
            <span>TerraDirect Agri Marketplace</span>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            Direct-from-farm commodity trading platform founded by Goutham. Connecting verified regenerative farmers, heirloom grain cooperatives, and organic producers to wholesale and retail supply chains.
          </p>
          <div className="text-xs text-emerald-400 font-medium">
            Founder: Goutham · Direct-to-Grower Agriculture Initiative
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>APMC & USDA Certified Traceability</span>
          </div>
        </div>

        {/* Commodity Hubs */}
        <div>
          <h4 className="text-xs uppercase font-semibold text-white tracking-wider mb-3">
            Commodity Sectors
          </h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>
              <button
                onClick={() => onNavigateTab('marketplace')}
                className="hover:text-white transition-colors"
              >
                Heirloom Grains & Pulses
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('marketplace')}
                className="hover:text-white transition-colors"
              >
                Fresh Harvest Vegetable Bushels
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('marketplace')}
                className="hover:text-white transition-colors"
              >
                Cold-Pressed Seed Oils
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('marketplace')}
                className="hover:text-white transition-colors"
              >
                Bio-Fertilizers & Live Compost
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('marketplace')}
                className="hover:text-white transition-colors"
              >
                Precision IoT Agri Hardware
              </button>
            </li>
          </ul>
        </div>

        {/* Trade & Farmer Tools */}
        <div>
          <h4 className="text-xs uppercase font-semibold text-white tracking-wider mb-3">
            Trading Services
          </h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li>
              <button
                onClick={() => onNavigateTab('spots')}
                className="hover:text-white transition-colors"
              >
                Live Mandi & Spot Price Index
              </button>
            </li>
            <li>
              <button
                onClick={onOpenRFQModal}
                className="hover:text-white transition-colors"
              >
                Submit Bulk Volume RFQ
              </button>
            </li>
            <li>
              <button
                onClick={onOpenFarmerModal}
                className="hover:text-white transition-colors"
              >
                Register & List Harvest Lot
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigateTab('farmer')}
                className="hover:text-white transition-colors"
              >
                Grower Quality Standards
              </button>
            </li>
            <li>
              <span className="text-stone-500">Reefer Cold-Chain Logistics</span>
            </li>
          </ul>
        </div>

        {/* Trade Assurance & Transparency */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase font-semibold text-white tracking-wider mb-3">
            Market Assurances
          </h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            All lots undergo certified moisture and chemical residue screening before dispatch. Settlements are held in escrow until physical receipt verification.
          </p>
          <div className="pt-2 text-xs text-stone-500">
            © 2026 TerraDirect Agricultural Systems Inc. Founded by Goutham.
          </div>
        </div>
      </div>
    </footer>
  );
};
