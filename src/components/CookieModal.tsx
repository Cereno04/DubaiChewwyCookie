import { motion, AnimatePresence } from "motion/react";
import { X, Star, Flame, ShoppingBag } from "lucide-react";
import { CookieProduct } from "../types";

interface CookieModalProps {
  product: CookieProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectForOrder: (productId: string) => void;
}

export default function CookieModal({
  product,
  isOpen,
  onClose,
  onSelectForOrder,
}: CookieModalProps) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="cookie-detail-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#3D1B2B]/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-none border border-[#EE74AA]/35 bg-white text-[#3D1B2B] shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 rounded-none border border-[#EE74AA]/20 bg-white text-[#EE74AA] hover:text-white hover:bg-[#EE74AA] transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              
              {/* Left Column: Visual Highlight Box */}
              <div className="relative h-[250px] md:h-auto min-h-[350px] flex items-center justify-center p-8 bg-gradient-to-b from-[#FFF9FB] to-[#FFF0F4] border-r border-[#EE74AA]/10">
                {/* Glow ring in background */}
                <div 
                  className="absolute inset-0 opacity-15 blur-3xl pointer-events-none"
                  style={{ backgroundColor: product.accentColor }}
                />
                
                {product.bestseller && (
                  <span className="absolute top-6 left-6 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-none bg-[#EE74AA] text-white border border-[#EE74AA]/20">
                    Bestseller
                  </span>
                )}

                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-4/5 max-h-[80%] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.06)] transform hover:scale-103 transition-transform duration-500 z-10"
                />
              </div>

              {/* Right Column: Spec and Narrative details */}
              <div className="p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-sans tracking-[3px] uppercase text-[#EE74AA] font-bold">
                      Dubai Premium Quality
                    </span>
                    <div className="flex items-center gap-1 text-[#EE74AA]">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-extrabold">{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#3D1B2B] mb-2 tracking-tight">
                    {product.name}
                  </h3>
                  
                  <p className="text-xs text-[#3D1B2B]/60 font-sans tracking-wide mb-4 font-semibold">
                    {product.tagline}
                  </p>

                  <div className="h-px bg-[#EE74AA]/15 w-full mb-4" />

                  <p className="text-sm text-[#3D1B2B]/80 leading-relaxed mb-6 font-sans">
                    {product.description}
                  </p>

                  {/* Ingredients Section */}
                  <div className="mb-6">
                    <h4 className="text-xs font-sans tracking-wider uppercase text-[#3D1B2B]/70 mb-2 font-bold">
                      Key Premium Ingredients
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.ingredients.map((ing, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-[11px] font-sans font-semibold rounded-none bg-[#FFF9FB] border border-[#EE74AA]/15 text-[#3D1B2B]/85"
                        >
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Nutrition Grid */}
                  <div className="mb-6 bg-[#FFF9FB] border border-[#EE74AA]/15 rounded-none p-4">
                    <h4 className="text-xs font-sans tracking-wider uppercase text-[#3D1B2B]/75 mb-3 flex items-center gap-1.5 font-bold">
                      <Flame className="w-3.5 h-3.5 text-[#EE74AA]" />
                      Estimated Nutritional Values
                    </h4>
                    
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="p-2 rounded-none bg-white border border-[#EE74AA]/15 hover:border-[#EE74AA] transition-colors">
                        <div className="text-[10px] text-[#3D1B2B]/60 uppercase font-sans font-bold">Cal</div>
                        <div className="text-sm font-serif font-bold text-[#3D1B2B]">{product.nutrition.calories}</div>
                      </div>
                      <div className="p-2 rounded-none bg-white border border-[#EE74AA]/15 hover:border-[#EE74AA] transition-colors">
                        <div className="text-[10px] text-[#3D1B2B]/60 uppercase font-sans font-bold">Prot</div>
                        <div className="text-sm font-serif font-bold text-[#3D1B2B]">{product.nutrition.protein}</div>
                      </div>
                      <div className="p-2 rounded-none bg-white border border-[#EE74AA]/15 hover:border-[#EE74AA] transition-colors">
                        <div className="text-[10px] text-[#3D1B2B]/60 uppercase font-sans font-bold">Fat</div>
                        <div className="text-sm font-serif font-bold text-[#3D1B2B]">{product.nutrition.fat}</div>
                      </div>
                      <div className="p-2 rounded-none bg-white border border-[#EE74AA]/15 hover:border-[#EE74AA] transition-colors">
                        <div className="text-[10px] text-[#3D1B2B]/60 uppercase font-sans font-bold">Carbs</div>
                        <div className="text-sm font-serif font-bold text-[#3D1B2B]">{product.nutrition.carbs}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer block of Modal: Price & Action */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#EE74AA]/15">
                  <div>
                    <span className="text-[10px] text-[#3D1B2B]/50 uppercase font-sans font-bold block">
                      Price Per Cookie
                    </span>
                    <span className="text-2xl font-bold font-serif text-[#3D1B2B]">
                      ₱{product.price}
                      <span className="text-xs font-semibold text-[#3D1B2B]/50 ml-1.5 font-sans">
                        PHP
                      </span>
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectForOrder(product.id);
                      onClose();
                    }}
                    className="flex items-center gap-2 px-5 py-3 rounded-none bg-[#EE74AA] text-white hover:bg-[#EE74AA]/95 border border-transparent shadow-[#EE74AA]/25 shadow-md font-bold text-xs tracking-wider uppercase active:scale-95 transition-all cursor-pointer font-sans"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Configure Order
                  </button>
                </div>

              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
