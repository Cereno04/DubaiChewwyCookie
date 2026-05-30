import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  Calendar, 
  User, 
  MapPin, 
  Phone, 
  MessageCircleCode, 
  Check, 
  Copy, 
  HelpCircle,
  Truck,
  Flame
} from "lucide-react";
import { CookieProduct, CustomOrder } from "../types";

const getSizesForProduct = (productId: string) => {
  if (productId === "dubai-smoothie") {
    return [
      { id: "smoothie", name: "Classic Smoothie (12oz)", weight: "12oz", price: 199, scale: "Classic" }
    ];
  }
  return [
    { id: "reg", name: "Regular Size (48-50g)", weight: "48-50g", price: 99, scale: "Regular" },
    { id: "mini", name: "Mini Size (15-18g)", weight: "15-18g", price: 35, scale: "Mini" }
  ];
};

interface OrderFormProps {
  products: CookieProduct[];
  selectedProductId: string;
  onSelectProduct: (id: string) => void;
}

export default function OrderForm({
  products,
  selectedProductId,
  onSelectProduct,
}: OrderFormProps) {
  const [selectedSizeId, setSelectedSizeId] = useState("reg");
  const [quantity, setQuantity] = useState(0); // Default is 0 pieces
  const [deliveryDate, setDeliveryDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  
  const [orderPlacedState, setOrderPlacedState] = useState<"idle" | "success">("idle");
  const [copiedLink, setCopiedLink] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableSizes = getSizesForProduct(selectedProductId);

  useEffect(() => {
    const list = getSizesForProduct(selectedProductId);
    if (!list.some((s) => s.id === selectedSizeId)) {
      setSelectedSizeId(list[0].id);
    }
  }, [selectedProductId]);

  const chosenProduct = products.find((p) => p.id === selectedProductId) || products[0];
  const chosenSize = availableSizes.find((s) => s.id === selectedSizeId) || availableSizes[0];

  // Price Calculations
  let cookieTotal = 0;
  if (chosenSize.id === "mini") {
    // Mini bundle: 35 per pc, 3 for 99, 10 for 299
    const numTens = Math.floor(quantity / 10);
    const remainderAfterTens = quantity % 10;
    const numThrees = Math.floor(remainderAfterTens / 3);
    const numSingles = remainderAfterTens % 3;
    cookieTotal = numTens * 299 + numThrees * 99 + numSingles * 35;
  } else {
    cookieTotal = chosenSize.price * quantity;
  }
  const subtotal = cookieTotal;
  const deliveryFee = subtotal === 0 ? 0 : (subtotal >= 1000 ? 0 : 150); // Free delivery above 1000 pesos, 0 if subtotal is 0
  const totalCost = subtotal === 0 ? 0 : subtotal + deliveryFee;

  const validateForm = () => {
    const tempErrors: Record<string, string> = {};
    if (!customerName.trim()) tempErrors.customerName = "Name is required";
    if (!customerPhone.trim()) tempErrors.customerPhone = "Contact number is required";
    if (!deliveryAddress.trim()) tempErrors.deliveryAddress = "Delivery address is required";
    if (!deliveryDate) tempErrors.deliveryDate = "Selection of date is required";
    if (quantity <= 0) tempErrors.quantity = "Please select at least 1 piece to order";
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (customerEmail && !emailPattern.test(customerEmail)) {
      tempErrors.customerEmail = "Invalid email formatting";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const getFormulatedOrderText = () => {
    return `*SUGÁRIA & CO. LUXURY COOKIE ORDER SUMMARY*
----------------------------------------
🍪 *Flavor:* ${chosenProduct?.name}
📏 *Size:* ${chosenSize.name}
🔢 *Quantity:* ${quantity} Pieces

👤 *Customer Details:*
• Name: ${customerName}
• Phone: ${customerPhone}
• Email: ${customerEmail || "N/A"}
• Delivery Address: ${deliveryAddress}
• Requested Delivery Date: ${deliveryDate}

💵 *Financial Breakdown:*
• Cookies Subtotal: ₱${cookieTotal}
• Courier Shipping: ${deliveryFee === 0 ? "FREE (Premium Chilled Shipping)" : `₱${deliveryFee}`}
👑 *TOTAL AMOUNT:* ₱${totalCost}

*(Note: Automatically copied to your clipboard. Paste this directly in the FB Messenger chat to finalize payment and dispatch!)*`;
  };

  const handleMessengerRedirect = () => {
    // Generate order summary with whatever information is entered
    const orderText = getFormulatedOrderText();
    
    // Copy summary table to clipboard
    navigator.clipboard.writeText(orderText).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 5000);
    }).catch((err) => {
      console.warn("Clipboard failed, proceeding to redirect:", err);
    });

    setOrderPlacedState("success");

    // Direct redirection to the Facebook Page
    const fbPageUrl = "https://www.facebook.com/sugariaco.ceb";
    
    try {
      const win = window.open(fbPageUrl, "_blank");
      if (!win || win.closed || typeof win.closed === "undefined") {
        window.location.href = fbPageUrl;
      }
    } catch (e) {
      window.location.href = fbPageUrl;
    }
  };

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12" id="order-customizer-grid">
      
      {/* LEFT BLOCK: Configurator (Steps) */}
      <div className="lg:col-span-7 space-y-8 md:space-y-12">
        
        {/* Step 1: Cookie Selection */}
        <div className="bg-white border border-[#EE74AA]/20 rounded-none p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-[#EE74AA] text-white font-bold flex items-center justify-center text-sm font-serif">
              01
            </span>
            <h4 className="text-xl font-serif font-bold text-[#3D1B2B] tracking-tight">
              Select Your Cookie Flavor
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {products.map((p) => (
              <button
                key={p.id}
                onClick={() => onSelectProduct(p.id)}
                className={`relative overflow-hidden rounded-none border-2 p-4 text-left transition-all duration-300 cursor-pointer ${
                  selectedProductId === p.id
                    ? "bg-[#FFF9FB] border-[#EE74AA] shadow-sm"
                    : "bg-white border-[#EE74AA]/15 hover:bg-[#FFF9FB] hover:border-[#EE74AA]/45"
                }`}
              >
                <div className="h-24 flex items-center justify-center mb-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-[85%] object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.08)] transform hover:scale-103 transition-transform"
                  />
                </div>
                
                <h5 className="font-bold text-sm text-[#3D1B2B] leading-tight line-clamp-1 font-serif">
                  {p.name}
                </h5>
                <p className="text-xs text-[#3D1B2B]/60 font-sans mt-1">
                  ₱{p.price} / pc
                </p>

                {selectedProductId === p.id && (
                  <div className="absolute top-2 right-2 p-1 bg-[#EE74AA] text-white border border-[#EE74AA]/20 rounded-full shadow-md">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Select Cookie Size */}
        <div className="bg-white border border-[#EE74AA]/20 rounded-none p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-[#EE74AA] text-white font-bold flex items-center justify-center text-sm font-serif">
              02
            </span>
            <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <h4 className="text-xl font-serif font-bold text-[#3D1B2B] tracking-tight">
                {selectedProductId === "dubai-smoothie" ? "Select Smoothie Size" : "Select Cookie Size & Weight"}
              </h4>
              <span className="text-xs font-sans text-[#EE74AA] font-extrabold tracking-wider uppercase animate-pulse">
                {selectedProductId === "dubai-smoothie" ? "Perfect sweet drink blend" : "Sensational Chewiness!"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {availableSizes.map((size) => (
              <button
                key={size.id}
                type="button"
                onClick={() => setSelectedSizeId(size.id)}
                className={`w-full relative overflow-hidden rounded-none border-2 text-left p-4 flex flex-col justify-between h-36 transition-all duration-300 cursor-pointer ${
                  selectedSizeId === size.id
                    ? "border-[#EE74AA] bg-[#FFF9FB] shadow-sm ring-1 ring-[#EE74AA]"
                    : "bg-white border-[#EE74AA]/15 hover:bg-[#FFF9FB] hover:border-[#EE74AA]/30"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-[#EE74AA] uppercase tracking-widest font-extrabold">
                      {size.scale} Option
                    </span>
                    {size.id === "mini" && (
                      <span className="text-[9px] bg-[#FFF0F4] border border-[#EE74AA]/20 text-[#EE74AA] px-1.5 py-0.5 font-sans font-bold uppercase rounded-none leading-none">
                        Bundle available
                      </span>
                    )}
                  </div>
                  <h5 className="font-bold text-sm text-[#3D1B2B] font-serif mt-2 leading-tight">
                    {size.name}
                  </h5>
                  {size.id === "mini" && (
                    <span className="text-[10px] text-[#EE74AA] font-sans font-bold mt-1 block">
                      3 for ₱99 • 10 for ₱299
                    </span>
                  )}
                </div>

                <div className="flex items-end justify-between mt-3">
                  <span className="text-lg font-bold font-serif text-[#3D1B2B]">
                    ₱{size.price}
                  </span>
                  
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                    selectedSizeId === size.id 
                      ? "border-[#EE74AA] bg-[#EE74AA]" 
                      : "border-[#EE74AA]/20"
                  }`}>
                    {selectedSizeId === size.id && <Check className="w-3 h-3 text-white stroke-[3]" />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Choose Quantity */}
        <div className="bg-white border border-[#EE74AA]/20 rounded-none p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-8 rounded-full bg-[#EE74AA] text-white font-bold flex items-center justify-center text-sm font-serif">
              03
            </span>
            <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <h4 className="text-xl font-serif font-bold text-[#3D1B2B] tracking-tight">
                Choose Box Quantity
              </h4>
              <span className="text-xs font-sans text-[#3D1B2B]/60 md:text-right font-medium">
                Freshly baked upon request
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 bg-[#FFF9FB] rounded-none p-5 border border-[#EE74AA]/15">
            {/* Custom counter */}
            <div className="flex items-center bg-white border border-[#EE74AA]/20 rounded-none p-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(0, quantity - 1))}
                className="w-10 h-10 outline-none hover:bg-[#FFF9FB] rounded-none text-[#3D1B2B] font-bold text-lg transition-colors cursor-pointer"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="font-serif font-bold text-lg text-[#3D1B2B] w-14 text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 outline-none hover:bg-[#FFF9FB] rounded-none text-[#3D1B2B] font-bold text-lg transition-colors cursor-pointer"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Quick pre-select buttons */}
            <div className="flex flex-wrap gap-2 w-full">
              {[1, 4, 6, 12].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setQuantity(num)}
                  className={`flex-1 min-w-[60px] py-2.5 px-3 rounded-none border font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    quantity === num
                      ? "bg-[#EE74AA] text-white border-[#EE74AA] shadow-sm"
                      : "bg-white border-[#EE74AA]/20 hover:bg-[#FFF9FB] text-[#3D1B2B]/75"
                  }`}
                >
                  {num} Pack
                </button>
              ))}
            </div>
          </div>
          {errors.quantity && (
            <p className="text-xs font-bold text-red-600 mt-2 block animate-pulse" id="input-quantity">
              ⚠️ {errors.quantity}
            </p>
          )}
          <p className="text-[11px] font-sans text-[#3D1B2B]/60 mt-3 text-right">
            Min. order: 1 piece • Order 12+ for automatic 10% premium packaging upgrade!
          </p>
        </div>

        {/* Step 4: Delivery Logistics */}
        <div className="bg-white border border-[#EE74AA]/25 rounded-none p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#EE74AA] text-white font-bold flex items-center justify-center text-sm font-serif">
              04
            </span>
            <h4 className="text-xl font-serif font-bold text-[#3D1B2B] tracking-tight">
              Delivery Information
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Delivery Date */}
            <div className="flex flex-col gap-1.5" id="input-deliveryDate">
              <label className="text-xs font-sans text-[#3D1B2B] font-bold uppercase tracking-wider block">
                Delivery Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full bg-white border border-[#EE74AA]/20 rounded-none py-3 px-4 text-sm text-[#3D1B2B] focus:outline-[#EE74AA] focus:border-[#EE74AA] transition-all cursor-pointer"
                />
              </div>
              {errors.deliveryDate && (
                <p className="text-[10px] font-bold text-red-600 mt-1 font-sans">{errors.deliveryDate}</p>
              )}
            </div>

            {/* Customer Name */}
            <div className="flex flex-col gap-1.5" id="input-customerName">
              <label className="text-xs font-sans text-[#3D1B2B] font-bold uppercase tracking-wider block">
                Your Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Maria Teresa"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-white border border-[#EE74AA]/20 rounded-none py-3 px-4 text-sm text-[#3D1B2B] focus:outline-[#EE74AA] focus:border-[#EE74AA] transition-all"
                />
              </div>
              {errors.customerName && (
                <p className="text-[10px] font-bold text-red-600 mt-1 font-sans">{errors.customerName}</p>
              )}
            </div>

            {/* Delivery Phone */}
            <div className="flex flex-col gap-1.5" id="input-customerPhone">
              <label className="text-xs font-sans text-[#3D1B2B] font-bold uppercase tracking-wider block">
                Philippines Contact Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="e.g. +63 917 123 4567"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full bg-white border border-[#EE74AA]/20 rounded-none py-3 px-4 text-sm text-[#3D1B2B] focus:outline-[#EE74AA] focus:border-[#EE74AA] transition-all"
                />
              </div>
              {errors.customerPhone && (
                <p className="text-[10px] font-bold text-red-600 mt-1 font-sans">{errors.customerPhone}</p>
              )}
            </div>

            {/* Customer Email */}
            <div className="flex flex-col gap-1.5" id="input-customerEmail">
              <label className="text-xs font-sans text-[#3D1B2B] font-bold uppercase tracking-wider block">
                Email Address (Optional)
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="e.g. maria@gmail.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full bg-white border border-[#EE74AA]/20 rounded-none py-3 px-4 text-sm text-[#3D1B2B] focus:outline-[#EE74AA] focus:border-[#EE74AA] transition-all"
                />
              </div>
              {errors.customerEmail && (
                <p className="text-[10px] font-bold text-red-600 mt-1 font-sans">{errors.customerEmail}</p>
              )}
            </div>

          </div>

          {/* Delivery Address */}
          <div className="flex flex-col gap-1.5" id="input-deliveryAddress">
            <label className="text-xs font-sans text-[#3D1B2B] font-bold uppercase tracking-wider block">
              Detailed Delivery Address *
            </label>
            <textarea
              placeholder="e.g., 123 Rizal Ave, Brgy. Central, Quezon City, Metro Manila, Philippines"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              rows={2}
              className="w-full bg-white border border-[#EE74AA]/20 rounded-none p-4 text-sm text-[#3D1B2B] placeholder-[#3D1B2B]/35 focus:outline-[#EE74AA] focus:border-[#EE74AA] transition-all resize-none"
            />
            {errors.deliveryAddress && (
              <p className="text-[10px] font-bold text-red-600 mt-1 font-sans">{errors.deliveryAddress}</p>
            )}
            <p className="text-[10px] font-sans text-[#3D1B2B]/50 mt-1">
              Please include house number, street, barangay, city, and landmarks if any.
            </p>
          </div>
        </div>

      </div>

      {/* RIGHT BLOCK: Stick Order Calculation Invoice Summary (Sticky) */}
      <div className="lg:col-span-5">
        <div className="sticky top-24 space-y-6">
          <div className="bg-[#FFF9FB] border border-[#EE74AA]/30 rounded-none p-6 md:p-8 shadow-sm relative overflow-hidden">
            
            {/* Pink decorative border top accent */}
            <div className="absolute top-0 inset-x-0 h-1 bg-[#EE74AA]" />
            
            <div className="flex items-center justify-between gap-2 mb-6">
              <h4 className="text-base md:text-lg font-serif font-bold tracking-tight text-[#3D1B2B] uppercase">
                Luxury Order Invoice
              </h4>
              <span className="text-[10px] font-sans py-1 px-2.5 rounded-none bg-[#EE74AA]/10 text-[#EE74AA] font-bold border border-[#EE74AA]/20">
                CONCIERGE REVIEW
              </span>
            </div>

            {/* Selected item detail review */}
            <div className="flex items-center gap-4 bg-white hover:bg-[#FFF9FB] p-4 rounded-none border border-[#EE74AA]/15 transition-all duration-300 mb-6 shadow-sm">
              <img
                src={chosenProduct?.image}
                alt={chosenProduct?.name}
                referrerPolicy="no-referrer"
                className="w-16 h-16 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.06)] shrink-0"
              />
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-sans text-[#EE74AA] uppercase tracking-wider block font-bold">
                  Chosen Flavor & Size
                </span>
                <h5 className="font-bold text-sm text-[#3D1B2B] truncate font-serif">
                  {chosenProduct?.name}
                </h5>
                <span className="text-xs font-sans text-[#3D1B2B]/60 mt-0.5 block font-medium">
                  {chosenSize.id === "mini" ? (
                    <>
                      ₱{cookieTotal} total ({chosenSize.weight}) <span className="text-[#EE74AA] font-bold">Applied Bundle!</span>
                    </>
                  ) : (
                    <>
                      ₱{chosenSize.price} × {quantity} ({chosenSize.weight})
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* Calculations lines */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#3D1B2B]/65 font-medium">Cookies Subtotal</span>
                <span className="text-[#3D1B2B] font-serif font-bold">₱{cookieTotal.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#3D1B2B]/65 font-medium flex items-center gap-1 font-sans">
                  Premium Delivery
                  <HelpCircle className="w-3.5 h-3.5 text-[#3D1B2B]/40 hover:text-[#EE74AA] cursor-help" title="Free on orders above ₱1,000!" />
                </span>
                <span className="text-[#3D1B2B] font-serif font-bold">
                  {deliveryFee === 0 ? "FREE" : `₱${deliveryFee.toLocaleString()}`}
                </span>
              </div>

              {deliveryFee > 0 && (
                <div className="bg-[#EE74AA]/10 p-2.5 rounded-none border border-[#EE74AA]/15 text-center">
                  <p className="text-[10px] text-[#3D1B2B]/75 leading-relaxed font-sans font-medium">
                    ✨ Add <span className="font-bold text-[#3D1B2B]">₱{(1000 - subtotal).toFixed(0)}</span> more for <span className="text-[#EE74AA] font-bold uppercase">FREE</span> Delivery!
                  </p>
                </div>
              )}

              <div className="h-px bg-[#EE74AA]/15 w-full my-4" />

              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[10px] text-[#3D1B2B]/60 uppercase font-sans font-bold tracking-wider block">
                    GRAND TOTAL VALUED
                  </span>
                  <span className="text-xs text-[#EE74AA] block font-serif italic mt-0.5">
                    VAT Included
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-[#3D1B2B] font-serif">
                    ₱{totalCost.toLocaleString()}
                  </span>
                  <p className="text-[10px] text-[#EE74AA] mt-1 block font-sans font-semibold uppercase tracking-wider">
                     PHP (Philippine Peso)
                  </p>
                </div>
              </div>
            </div>

            {/* Sticky warning info */}
            <div className="bg-white rounded-none p-4 border border-[#EE74AA]/15 space-y-2.5 mb-6 text-[11px] leading-relaxed shadow-sm">
              <div className="flex items-start gap-2">
                <Truck className="w-4 h-4 text-[#EE74AA] shrink-0 mt-0.5" />
                <p className="text-[#3D1B2B]/75">
                  <span className="text-[#3D1B2B] font-bold">Direct Express Dispatch:</span> Arrives fresh in refrigerated premium fleet within Metro Manila & surrounding areas.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <MessageCircleCode className="w-4 h-4 text-[#EE74AA] shrink-0 mt-0.5" />
                <p className="text-[#3D1B2B]/75">
                  <span className="text-[#3D1B2B] font-bold">One-Click Checkout:</span> Clicking below compiles details, copies to clipboard, and connects you to our live chat to finalise delivery!
                </p>
              </div>
            </div>

            {/* Checkout Action Trigger Button */}
            <button
              onClick={handleMessengerRedirect}
              className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-none bg-[#EE74AA] text-white border border-transparent shadow-[#EE74AA]/25 shadow-lg hover:bg-[#EE74AA]/90 hover:shadow-xl font-bold tracking-wider uppercase text-xs md:text-sm active:scale-[0.98] transition-all cursor-pointer z-10 font-sans"
            >
              <MessageCircleCode className="w-5 h-5 fill-current shrink-0" />
              Order Through Facebook Messenger
            </button>

            {/* Copied helper */}
            <AnimatePresence>
              {copiedLink && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute bottom-20 inset-x-6 text-center bg-emerald-50 border border-emerald-300 text-emerald-800 py-2.5 px-4 rounded-none text-xs font-sans font-bold shadow-md backdrop-blur-md"
                >
                  📝 Order details compiled and copied to clipboard! Ready to paste in Messenger.
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-center text-[10px] text-[#3D1B2B]/50 mt-4 leading-relaxed font-sans">
              *By clicking above, you'll be redirected to our Facebook Page to message us with your clipboard order details.
            </p>
          </div>

          {/* Prompt success message state */}
          {orderPlacedState === "success" && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white border-2 border-emerald-600 rounded-none p-6 text-center shadow-lg relative"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center mb-3 shadow-sm">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h5 className="font-bold text-[#3D1B2B] text-base mb-1 font-serif">
                Order Generated!
              </h5>
              <p className="text-xs text-[#3D1B2B]/80 leading-relaxed mb-4 font-sans">
                Your order is loaded and copied to your clipboard. Click the button below to visit our Facebook Page, paste your order details to message us, and complete your checkout.
              </p>
              
              <div className="flex flex-col gap-2 justify-center">
                <a
                  href="https://www.facebook.com/sugariaco.ceb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-transparent shadow-md flex items-center justify-center gap-1.5"
                >
                  <MessageCircleCode className="w-4 h-4 fill-current shrink-0" />
                  Go to Facebook Page
                </a>
                <button
                  onClick={() => setOrderPlacedState("idle")}
                  className="px-4 py-2 rounded-none hover:bg-gray-50 text-[#3D1B2B]/70 font-bold text-[10px] uppercase tracking-wider transition-all cursor-pointer border border-gray-200 mt-1"
                >
                  Modify Configuration
                </button>
              </div>
            </motion.div>
          )}

        </div>
      </div>

    </div>
  );
}
