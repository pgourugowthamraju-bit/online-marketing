import React, { useState } from 'react';
import { X, Sprout, Check, UploadCloud } from 'lucide-react';
import { Product } from '../types/marketplace';

interface FarmerListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => void;
}

export const FarmerListingModal: React.FC<FarmerListingModalProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [variety, setVariety] = useState('');
  const [category, setCategory] = useState<'grains' | 'produce' | 'oils' | 'supplies' | 'equipment'>('grains');
  const [pricePerUnit, setPricePerUnit] = useState<number>(3.50);
  const [unit, setUnit] = useState('kg');
  const [minOrderQty, setMinOrderQty] = useState<number>(25);
  const [stockQty, setStockQty] = useState<number>(1000);
  const [farmName, setFarmName] = useState('');
  const [farmerName, setFarmerName] = useState('');
  const [location, setLocation] = useState('');
  const [certifications, setCertifications] = useState('USDA Organic, Non-GMO Verified');
  const [grade, setGrade] = useState<'A1 Export' | 'Grade A Premium' | 'Food Service Grade' | 'Certified Seed'>('A1 Export');
  const [packagingType, setPackagingType] = useState('25kg breathable woven jute bag');
  const [moisturePercent, setMoisturePercent] = useState<number>(11.5);
  const [purityPercent, setPurityPercent] = useState<number>(99.5);
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState('/src/assets/images/product_heirloom_grains_1793956741128.jpg');
  const [success, setSuccess] = useState(false);

  const imagePresets = [
    { label: 'Heirloom Grains', url: '/src/assets/images/product_heirloom_grains_1793956741128.jpg' },
    { label: 'Fresh Harvest Crate', url: '/src/assets/images/product_fresh_produce_crate_1793956741649.jpg' },
    { label: 'Cold-Pressed Oils', url: '/src/assets/images/product_coldpressed_oils_1793956742521.jpg' },
    { label: 'Precision Agri Tech', url: '/src/assets/images/product_smart_agri_equipment_1793956743106.jpg' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !farmName || !location) return;

    const certList = certifications
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const newProduct: Product = {
      id: `farm-lot-${Date.now()}`,
      title,
      variety: variety || 'Farm Gate Selection',
      category,
      pricePerUnit: Number(pricePerUnit),
      unit,
      minOrderQty: Number(minOrderQty),
      stockQty: Number(stockQty),
      harvestDate: new Date().toISOString().split('T')[0],
      freshnessDays: 1,
      farmName,
      farmerName: farmerName || 'Verified Independent Grower',
      location,
      certifications: certList.length > 0 ? certList : ['Grower Certified'],
      grade,
      moisturePercent: Number(moisturePercent),
      purityPercent: Number(purityPercent),
      packagingType,
      description: description || `Freshly harvested ${variety || title} from ${farmName}. Tested for moisture, residue, and grading purity.`,
      image: selectedImage,
      wholesaleTiers: [
        { minQty: Number(minOrderQty), price: Number(pricePerUnit) },
        { minQty: Number(minOrderQty) * 4, price: Math.round(Number(pricePerUnit) * 0.88 * 100) / 100, discountPercent: 12 },
        { minQty: Number(minOrderQty) * 16, price: Math.round(Number(pricePerUnit) * 0.75 * 100) / 100, discountPercent: 25 },
      ],
      organic: certList.some((c) => c.toLowerCase().includes('organic')),
      labTested: true,
      shelfLife: '12 Months standard farm storage'
    };

    onAddProduct(newProduct);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden my-8 text-stone-900 dark:text-stone-100">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-emerald-700 flex items-center justify-center text-white">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg">List Your Harvest Lot</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">Direct-to-buyer farm gateway</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Row 1: Crop Title & Variety */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Crop / Product Name *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Heirloom Sonora Wheat Grain"
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Variety / Cultivar Spec
              </label>
              <input
                type="text"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                placeholder="e.g. Heritage Soft White Winter"
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Row 2: Category, Grade, Packaging */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
              >
                <option value="grains">Heirloom Grains & Pulses</option>
                <option value="produce">Fresh Harvest Bushels</option>
                <option value="oils">Cold-Pressed Oils</option>
                <option value="supplies">Bio-Fertilizers & Soil Inputs</option>
                <option value="equipment">Precision Agronomy Equipment</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Quality Grade
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value as any)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
              >
                <option value="A1 Export">A1 Export Grade</option>
                <option value="Grade A Premium">Grade A Premium</option>
                <option value="Food Service Grade">Food Service Grade</option>
                <option value="Certified Seed">Certified Seed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Packaging Spec
              </label>
              <input
                type="text"
                value={packagingType}
                onChange={(e) => setPackagingType(e.target.value)}
                placeholder="25kg jute sack, 12kg crate"
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
              />
            </div>
          </div>

          {/* Row 3: Pricing, Units, MOQ, Available Stock */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-3 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-700">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Base Price ($) *
              </label>
              <input
                type="number"
                step="0.05"
                required
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(parseFloat(e.target.value) || 0)}
                className="w-full px-2.5 py-1.5 text-xs font-mono font-bold rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Unit of Measure
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
              >
                <option value="kg">per kg</option>
                <option value="crate (12kg)">crate (12kg)</option>
                <option value="sack (25kg)">sack (25kg)</option>
                <option value="bottle (500ml)">bottle (500ml)</option>
                <option value="tonne">metric tonne</option>
                <option value="unit kit">unit kit</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Min Order (MOQ)
              </label>
              <input
                type="number"
                value={minOrderQty}
                onChange={(e) => setMinOrderQty(parseInt(e.target.value) || 1)}
                className="w-full px-2.5 py-1.5 text-xs font-mono rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Total Stock
              </label>
              <input
                type="number"
                value={stockQty}
                onChange={(e) => setStockQty(parseInt(e.target.value) || 1)}
                className="w-full px-2.5 py-1.5 text-xs font-mono rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900"
              />
            </div>
          </div>

          {/* Row 4: Farm & Grower Provenance */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Farm / Estate Name *
              </label>
              <input
                type="text"
                required
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                placeholder="e.g. Willow Creek Organic Growers"
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Farmer / Manager
              </label>
              <input
                type="text"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                placeholder="e.g. Julian Hayes"
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Location (State, Region) *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Yakima Valley, WA"
                className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
              />
            </div>
          </div>

          {/* Row 5: Lab Purity & Moisture */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Moisture %
              </label>
              <input
                type="number"
                step="0.1"
                value={moisturePercent}
                onChange={(e) => setMoisturePercent(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                Purity %
              </label>
              <input
                type="number"
                step="0.1"
                value={purityPercent}
                onChange={(e) => setPurityPercent(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-xs font-mono rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
              />
            </div>
          </div>

          {/* Certifications */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Certifications (comma-separated)
            </label>
            <input
              type="text"
              value={certifications}
              onChange={(e) => setCertifications(e.target.value)}
              placeholder="USDA Organic, Non-GMO Verified, Global GAP"
              className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800"
            />
          </div>

          {/* Image Presets */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
              Select Commodity Photography Asset
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {imagePresets.map((img) => (
                <button
                  type="button"
                  key={img.url}
                  onClick={() => setSelectedImage(img.url)}
                  className={`p-1.5 rounded-lg border text-left flex flex-col items-center gap-1.5 transition-all ${
                    selectedImage === img.url
                      ? 'border-emerald-700 dark:border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 ring-1 ring-emerald-600'
                      : 'border-stone-200 dark:border-stone-700 hover:border-stone-400'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    className="w-full aspect-4/3 object-cover rounded-md"
                  />
                  <span className="text-[11px] font-medium text-stone-700 dark:text-stone-300 truncate w-full text-center">
                    {img.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Agronomy & Harvesting Notes
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Soil type, irrigation method, drying process, sensory aroma, and harvest conditions..."
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
              className={`px-5 py-2.5 text-xs font-semibold rounded-lg text-white shadow-xs transition-colors flex items-center gap-1.5 ${
                success ? 'bg-emerald-600' : 'bg-emerald-800 hover:bg-emerald-900'
              }`}
            >
              {success ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Harvest Lot Published</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-4 h-4" />
                  <span>Publish Farm Listing</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
