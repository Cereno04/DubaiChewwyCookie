import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShoppingBag, 
  ArrowRight, 
  Star, 
  Check, 
  Heart, 
  Crown, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Gem, 
  Menu, 
  X, 
  ChevronDown, 
  Info, 
  Gift, 
  Truck 
} from "lucide-react";

import Cookie3D from "./components/Cookie3D";
import CookieModal from "./components/CookieModal";
import ReviewCarousel from "./components/ReviewCarousel";
import OrderForm from "./components/OrderForm";
import { CookieProduct } from "./types";

// Beautiful assets for our premium products
const pistachioKunafaImg = "/src/assets/images/pistachio_kunafa_truffle_1780133803959.png";

const biscoffChewyImg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' width='100%' height='100%'><defs><radialGradient id='bg_biscoff' cx='50%' cy='50%' r='50%'><stop offset='0%' stop-color='%23FFF9FB'/><stop offset='100%' stop-color='%23FFF0F3'/></radialGradient><radialGradient id='cookie_biscoff' cx='35%' cy='35%' r='65%'><stop offset='0%' stop-color='%23C68B59'/><stop offset='60%' stop-color='%23A05D2C'/><stop offset='100%' stop-color='%23773C13'/></radialGradient><linearGradient id='filling_biscoff' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23E5A96A'/><stop offset='100%' stop-color='%23B2723A'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23bg_biscoff)' rx='24'/><ellipse cx='200' cy='310' rx='110' ry='20' fill='%233D1B2B' opacity='0.15'/><circle cx='200' cy='190' r='90' fill='url(%23cookie_biscoff)'/><g transform='translate(130, 150) rotate(-10)'><rect x='0' y='0' width='140' height='75' rx='6' fill='url(%23filling_biscoff)' stroke='%235A3110' stroke-width='2.5'/><text x='70' y='44' text-anchor='middle' font-family='serif' font-weight='black' font-size='16' fill='%23FFF' letter-spacing='3'>LOTUS</text><text x='70' y='60' text-anchor='middle' font-family='sans-serif' font-size='8' font-weight='bold' fill='%23FFF' letter-spacing='1'>BISCOFF</text></g><circle cx='110' cy='220' r='4' fill='%23E5A96A'/><circle cx='290' cy='150' r='5' fill='%23E5A96A'/><circle cx='230' cy='260' r='8' fill='%23773C13'/></svg>";

const dubaiSmoothieImg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' width='100%' height='100%'><defs><radialGradient id='bg_smoothie' cx='50%' cy='50%' r='50%'><stop offset='0%' stop-color='%23FFF5F8'/><stop offset='100%' stop-color='%23FFE0EC'/></radialGradient><linearGradient id='liquid' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23EE74AA'/><stop offset='50%' stop-color='%23A3CC52'/><stop offset='100%' stop-color='%237D3558'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23bg_smoothie)' rx='24'/><ellipse cx='200' cy='340' rx='80' ry='15' fill='%233D1B2B' opacity='0.15'/><path d='M 152,110 L 248,110 L 228,310 C 226,325 174,325 172,310 Z' fill='none' stroke='%23EE74AA' stroke-width='6' opacity='0.85'/><path d='M 155,120 L 245,120 L 230,295 C 228,310 172,310 170,295 Z' fill='url(%23liquid)' opacity='0.85'/><ellipse cx='200' cy='115' rx='46' ry='20' fill='%23FFF' opacity='0.9' stroke='%23EE74AA' stroke-width='2'/><path d='M 215,50 L 195,150' stroke='%23EE74AA' stroke-width='8' stroke-linecap='round'/><path d='M 215,50 L 215,30 Q 220,20 230,24' stroke='%23EE74AA' stroke-width='8' stroke-linecap='round' fill='none'/><circle cx='180' cy='115' r='5' fill='%23C68B59'/><circle cx='210' cy='110' r='6' fill='%239BC33C'/></svg>";

const aboutBannerImg = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 400' width='100%' height='100%'><defs><linearGradient id='bannerBg' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%23FFF5F7'/><stop offset='100%' stop-color='%23FFE0E9'/></linearGradient><radialGradient id='banner_glow' cx='50%' cy='50%' r='50%'><stop offset='0%' stop-color='%23EE74AA' stop-opacity='0.15'/><stop offset='100%' stop-color='%23EE74AA' stop-opacity='0'/></radialGradient></defs><rect width='100%' height='100%' fill='url(%23bannerBg)'/><circle cx='400' cy='200' r='300' fill='url(%23banner_glow)'/><g transform='translate(400, 200)' stroke='%23EE74AA' stroke-width='1' fill='none' opacity='0.3'><circle r='120' stroke-dasharray='5,5'/><circle r='180' stroke-dasharray='10,5'/><circle r='240' stroke-dasharray='3,9'/></g><g transform='translate(250, 200) scale(1.4)'><circle cx='0' cy='0' r='50' fill='%233D1B2B'/><path d='M-15,-10 L15,-10 L20,10 L-20,10 Z' fill='%23EE74AA' opacity='0.8'/><circle cx='0' cy='0' r='8' fill='%23FFF'/></g><g transform='translate(550, 200) scale(1.1)'><circle cx='0' cy='0' r='45' fill='%23EE74AA'/><polygon points='0,-20 15,10 -15,10' fill='%23FFF'/><circle cx='0' cy='5' r='5' fill='%233D1B2B'/></g><text x='400' y='360' text-anchor='middle' font-family='serif' font-size='22' font-weight='900' fill='%233D1B2B' letter-spacing='4'>SUGARIA &amp; CO.</text><text x='400' y='380' text-anchor='middle' font-family='sans-serif' font-size='10' font-weight='bold' fill='%23EE74AA' letter-spacing='6'>CEBU&#39;S FINEST ARTISANAL TRUFFLES</text></svg>";

const heroCookieImg = pistachioKunafaImg;

const COOKIES_PRODUCTS: CookieProduct[] = [
  {
    id: "dubai-chewy",
    name: "Dubai Chewy Cookie",
    tagline: "Our original signature creation stuffed with golden crunchy kunafa and pistachios.",
    price: 99,
    description: "Our absolute signature masterpiece. A thick, chewy gourmet cookie shell hand-dusted with premium cocoa powder, split open with a warm bite to reveal an overflowing, vivid green pistachio cream center. Infused with crispy, golden toasted kunafa (kataifi) pastry shreds for the ultimate satisfying crunch. Sparkled with genuine 24-karat edible gold flake accents.",
    image: pistachioKunafaImg,
    accentColor: "#8faf3f",
    rating: 4.9,
    ingredients: ["Organic Sicilian Pistachios", "Crispy Toasted Kunafa", "Premium Cocoa Shell", "24K Edible Gold Leaf", "Satin Chocolate Paste"],
    nutrition: {
      calories: 340,
      protein: "6g",
      fat: "16g",
      carbs: "42g"
    },
    bestseller: true
  },
  {
    id: "biscoff-chewy",
    name: "Biscoff Chewy Cookie",
    tagline: "Molten Lotus Biscoff cookie butter core wrapped in a chewy caramelized base.",
    price: 99,
    description: "The dream cookie for caramelized biscuit lovers. A warm, intensely chewy spiced cookie base loaded with authentic Lotus Biscoff biscuit crumbs and packed with a velvety molten Biscoff cookie butter center. Generously soft, deliciously spiced, and incredibly satisfying in every single bite.",
    image: biscoffChewyImg,
    accentColor: "#d4af37",
    rating: 4.8,
    ingredients: ["Lotus Biscoff Cookie Butter", "Caramelized Spiced Biscuit", "Premium Cream Butter", "Brown Sugar Base"],
    nutrition: {
      calories: 310,
      protein: "4g",
      fat: "12g",
      carbs: "46g"
    }
  },
  {
    id: "dubai-smoothie",
    name: "Dubai Chewy Smoothie",
    tagline: "A thick, velvety signature shake filled with premium pistachios and cookie crunch.",
    price: 199,
    description: "A luxurious state of cold indulgence. Rich, thick, and ultra-creamy smoothie blended to perfection with our signature imported pistachio paste, sweet vanilla essence, and a touch of roasted elements. Standard-topped with sweet white cream swirls and a dusting of crispy golden kunafa pastry flakes.",
    image: dubaiSmoothieImg,
    accentColor: "#ee74aa",
    rating: 4.8,
    ingredients: ["Premium Pistachio Gelato Base", "Whipped Milk Crumb", "Gourmet Vanilla Infusion", "Crushed Gold Wheat Kunafa Flakes"],
    nutrition: {
      calories: 420,
      protein: "8g",
      fat: "15g",
      carbs: "50g"
    }
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<CookieProduct | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderProductId, setOrderProductId] = useState<string>("dubai-chewy");
  const [likedCookies, setLikedCookies] = useState<Record<string, boolean>>({});

  const handleOpenDetails = (product: CookieProduct) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const scrollToSection = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Header offset
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleSelectForOrder = (productId: string) => {
    setOrderProductId(productId);
    // Smooth scroll to order section
    const orderSection = document.getElementById("order");
    if (orderSection) {
      const yOffset = -80;
      const y = orderSection.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedCookies((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div className="min-h-screen text-[#3D1B2B] bg-white font-sans antialiased relative selection:bg-[#EE74AA] selection:text-white overflow-x-hidden">
      
      {/* SHIMMER AMBIENT DECORATIONS */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#EE74AA]/10 blur-[125px] pointer-events-none z-0" />
      <div className="absolute top-[30%] left-0 w-[400px] h-[400px] rounded-full bg-[#EE74AA]/5 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-10 w-[600px] h-[600px] rounded-full bg-[#EE74AA]/10 blur-[130px] pointer-events-none z-0" />

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#EE74AA]/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-3 group">
            {/* High-fidelity vector logo matching Sugaria & Co. brand mark */}
            <svg
              className="w-11 h-11 transition-transform duration-300 group-hover:scale-110 shrink-0"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M34 50C30 50 26 44 26 38C26 28 35 24 43 26C45 18 55 18 57 26C65 24 74 28 74 38C74 44 70 50 66 50"
                stroke="#EE74AA"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M38 50C36 50 35 52 35 54C35 58 39 61 50 62C61 61 65 58 65 54C65 52 64 50 62 50"
                stroke="#EE74AA"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M50 32C45 32 42.5 35 45 40C47.5 45 50 49 50 49C50 49 52.5 45 55 40C57.5 35 55 32 50 32Z"
                stroke="#EE74AA"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="#EE74AA"
                fillOpacity="0.19"
              />
            </svg>
            <div className="flex flex-col select-none">
              <span className="font-script text-[#EE74AA] text-2xl tracking-normal leading-none mb-0.5 font-normal">
                Sugária
              </span>
              <span className="font-sans text-[8px] font-bold tracking-[0.25em] text-[#3D1B2B]/70 uppercase leading-none">
                & CO.
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 font-semibold text-[11px] uppercase tracking-[0.2em] text-[#3D1B2B]/70">
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="text-[#EE74AA] border-b border-[#EE74AA] transition-all py-1">
              Home
            </a>
            <a href="#menu" onClick={(e) => scrollToSection("menu", e)} className="hover:text-[#EE74AA] transition-colors py-1">
              Our Menu
            </a>
            <a href="#features" onClick={(e) => scrollToSection("features", e)} className="hover:text-[#EE74AA] transition-colors py-1">
              Secrets
            </a>
            <a href="#story" onClick={(e) => scrollToSection("story", e)} className="hover:text-[#EE74AA] transition-colors py-1">
              About
            </a>
            <a href="#testimonials" onClick={(e) => scrollToSection("testimonials", e)} className="hover:text-[#EE74AA] transition-colors py-1">
              Reviews
            </a>
          </nav>

          {/* CTA Header Action */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#order"
              onClick={(e) => scrollToSection("order", e)}
              className="flex items-center gap-2 text-[10px] font-sans font-extrabold tracking-widest uppercase bg-[#EE74AA] text-white py-3 px-6 rounded-none shadow-lg hover:bg-[#EE74AA]/90 hover:shadow-[#EE74AA]/20 hover:-translate-y-0.5 transition-all"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Order Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-none border border-[#EE74AA]/20 text-[#3D1B2B] hover:text-[#EE74AA] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-20 inset-x-0 bg-white/95 z-30 border-b border-[#EE74AA]/20 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4 font-sans font-semibold text-xs uppercase tracking-[0.2em]">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); setMobileMenuOpen(false); }}
                className="text-[#3D1B2B] py-2 border-b border-[#EE74AA]/10"
              >
                Home
              </a>
              <a 
                href="#menu" 
                onClick={(e) => scrollToSection("menu", e)}
                className="text-[#3D1B2B]/80 py-2 border-b border-[#EE74AA]/10 hover:text-[#EE74AA]"
              >
                Our Menu
              </a>
              <a 
                href="#features" 
                onClick={(e) => scrollToSection("features", e)}
                className="text-[#3D1B2B]/80 py-2 border-b border-[#EE74AA]/10 hover:text-[#EE74AA]"
              >
                Secrets
              </a>
              <a 
                href="#story" 
                onClick={(e) => scrollToSection("story", e)}
                className="text-[#3D1B2B]/80 py-2 border-b border-[#EE74AA]/10 hover:text-[#EE74AA]"
              >
                About
              </a>
              <a 
                href="#testimonials" 
                onClick={(e) => scrollToSection("testimonials", e)}
                className="text-[#3D1B2B]/80 py-2 border-b border-[#EE74AA]/10 hover:text-[#EE74AA]"
              >
                Reviews
              </a>
              <a
                href="#order"
                onClick={(e) => scrollToSection("order", e)}
                className="flex items-center justify-center gap-2 text-center text-[10px] tracking-widest font-bold uppercase bg-[#EE74AA] text-white py-4 rounded-none mt-2 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                Order In Messenger
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 md:py-24" id="hero-section">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Hero Left Content Text */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6 text-center lg:text-left z-10 px-4 sm:px-0">
            
            <div className="space-y-4 md:space-y-6">
              <span className="text-[#EE74AA] text-xs uppercase tracking-[0.3em] font-bold block">
                Artisanal Premium Sweets
              </span>
              
              {/* Giant Title Typography in playfair display */}
              <h1 className="font-serif text-[42px] xs:text-[48px] sm:text-[60px] lg:text-[72px] leading-[0.9] sm:leading-[0.85] font-black text-[#3D1B2B] tracking-tight">
                Experience<br/>the Rich Taste<br/>
                <span className="text-[#EE74AA] italic">Taste.</span>
              </h1>

              <p className="text-[#3D1B2B]/75 text-sm max-w-sm mx-auto lg:mx-0 leading-relaxed font-sans mt-2">
                Freshly baked, soft, chewy, and filled with premium ingredients. Enjoy a delightful cookie experience with rich flavors and the perfect texture in every bite. 🍪✨
              </p>
            </div>

            {/* Hero Buttons CTA - sharp corners rounded-none */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#order"
                onClick={(e) => scrollToSection("order", e)}
                className="w-full sm:w-auto px-8 py-3 bg-[#EE74AA] text-white text-xs uppercase tracking-widest font-bold rounded-none hover:bg-[#EE74AA]/90 hover:shadow-lg hover:shadow-[#EE74AA]/20 transition-all text-center"
              >
                Order Now
              </a>
              <a
                href="#menu"
                onClick={(e) => scrollToSection("menu", e)}
                className="w-full sm:w-auto px-8 py-3 border border-[#EE74AA] text-[#EE74AA] text-xs uppercase tracking-widest font-bold rounded-none hover:bg-[#EE74AA]/5 transition-colors text-center"
              >
                View Menu
              </a>
            </div>

            {/* Editorial citation in bottom left */}
            <div className="mt-6 space-y-4 text-left hidden lg:block">
              <div className="h-px w-24 bg-[#EE74AA]"></div>
              <div className="text-[11px] italic text-[#3D1B2B]/60 leading-relaxed max-w-sm">
                "Every bite tastes fresh and delicious. The perfect balance of sweetness and chewiness makes these cookies truly unforgettable."<br/>
                <span className="font-bold uppercase tracking-widest not-italic text-[#3D1B2B] mt-1 block text-[9px]">
                  — Sugaria & Co.
                </span>
              </div>
            </div>

          </div>

          {/* Hero Right: Beautiful static cookie art layout */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[450px] py-6 select-none">
            {/* Background luxury glowing circles */}
            <div className="absolute w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] bg-[#EE74AA]/8 rounded-full blur-3xl -z-10 animate-pulse duration-[8000ms]" />
            <div className="absolute w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] bg-[#EE74AA]/4 rounded-full blur-2xl -z-10" />

            {/* Orbiting premium circular thin accent lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full border border-[#EE74AA]/15 flex items-center justify-center animate-[spin_40s_linear_infinite]">
                 <div className="absolute w-full h-full border border-dashed border-[#EE74AA]/8 rounded-full scale-95" />
              </div>
            </div>

            {/* floating premium sparkles */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-10 right-10 text-[#EE74AA]/50 pointer-events-none"
            >
              <Sparkles className="w-8 h-8 md:w-10 md:h-10 animate-pulse" />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-8 left-12 text-[#EE74AA]/45 pointer-events-none"
            >
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 animate-pulse" />
            </motion.div>

            {/* Giant Luxury Hero Cookie Image Wrapper with elegant interactive float animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative z-10"
            >
              <motion.div
                animate={{ 
                  y: [0, -12, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6, 
                  ease: "easeInOut" 
                }}
                className="relative group cursor-pointer"
              >
                {/* Under-glow shadow on hover */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-[#EE74AA]/10 to-transparent rounded-full blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-700 -z-10" />
                
                {/* Main Cookie Image */}
                <img
                  src={heroCookieImg}
                  alt="Dubai Chewy Cookie Signature"
                  referrerPolicy="no-referrer"
                  className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] lg:w-[410px] lg:h-[410px] object-contain drop-shadow-[0_25px_35px_rgba(238,116,170,0.15)] transition-transform duration-700 group-hover:scale-104"
                />

                {/* Gourmet Signature Badge */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 bg-[#EE74AA] border border-white/20 text-white py-2 px-3.5 flex items-center gap-1.5 shadow-2xl backdrop-blur-md self-center pointer-events-none"
                >
                  <Crown className="w-3.5 h-3.5 text-white animate-pulse" />
                  <span className="text-[9px] font-mono tracking-[0.2em] uppercase font-bold text-white">
                    VIRAL SIGNATURE
                  </span>
                </motion.div>

                {/* Artisan Note */}
                <div className="absolute -top-4 -left-4 font-serif text-[11px] uppercase tracking-[0.15em] text-[#EE74AA] border border-[#EE74AA]/20 px-3 py-1.5 bg-white/95 backdrop-blur-xs hidden sm:block">
                  Artisanal Craft
                </div>
              </motion.div>
            </motion.div>

            {/* Click to interactive element guide */}
            <div className="mt-6 md:mt-8 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EE74AA] animate-ping" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#3D1B2B]/60">
                Baked Fresh Daily In Dubai
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* STRIP FEATURED STATUS METRICS */}
      <section className="border-y border-[#EE74AA]/10 bg-[#FFF5F8] py-8 md:py-12 z-10" id="stats-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#EE74AA]/10">
            <div className="pt-4 first:pt-0 md:pt-0">
              <span className="font-serif text-3xl md:text-4xl font-black text-[#3D1B2B] block">
                18,400+
              </span>
              <span className="text-[10px] text-[#3D1B2B]/70 uppercase font-bold tracking-[0.2em] block mt-1 font-sans">
                Cookies Rolled Today
              </span>
            </div>
            <div className="pt-4 first:pt-0 md:pt-0">
              <span className="font-serif text-3xl md:text-4xl font-black text-[#3D1B2B] block flex items-center justify-center gap-1">
                4.9<Star className="w-5 h-5 fill-current text-[#EE74AA] stroke-none shrink-0" />
              </span>
              <span className="text-[10px] text-[#3D1B2B]/70 uppercase font-bold tracking-[0.2em] block mt-1 font-sans">
                Gourmet Star Rating
              </span>
            </div>
            <div className="pt-4 first:pt-0 md:pt-0 font-serif">
              <span className="font-serif text-3xl md:text-4xl font-black text-[#3D1B2B] block">
                100% Gold
              </span>
              <span className="text-[10px] text-[#3D1B2B]/70 uppercase font-bold tracking-[0.2em] block mt-1 font-sans">
                Fine Luxury Garnish
              </span>
            </div>
            <div className="pt-4 first:pt-0 md:pt-0 font-serif">
              <span className="font-serif text-3xl md:text-4xl font-black text-[#EE74AA] block">
                150
              </span>
              <span className="text-[10px] text-[#3D1B2B]/70 uppercase font-bold tracking-[0.2em] block mt-1 font-sans">
                Sold
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION (Secrets) */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 scroll-mt-20" id="features">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20 px-4 sm:px-0">
          <span className="text-[#EE74AA] text-xs uppercase tracking-[0.3em] font-bold block mb-2">
            Uncompromising Excellence
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3D1B2B] tracking-tight">
            Quality You Can Taste
          </h2>
          <p className="text-sm text-[#3D1B2B]/70 mt-3 leading-relaxed font-sans">
            We ensure consistency, freshness, and satisfaction in every bite.
          </p>
        </div>

        {/* Bento features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Feature 1 */}
          <div className="bg-white border border-[#EE74AA]/20 p-6 rounded-none relative overflow-hidden group shadow-sm transition-all hover:shadow-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#EE74AA]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
            
            <div className="w-10 h-10 bg-[#EE74AA]/10 rounded-full flex items-center justify-center text-[#EE74AA] border border-[#EE74AA]/20 mb-6 relative">
              <Sparkles className="w-4 h-4" />
            </div>

            <h3 className="text-lg font-serif font-bold text-[#3D1B2B] mb-2 tracking-tight">
              Premium Ingredients
            </h3>
            <p className="text-xs text-[#3D1B2B]/70 leading-relaxed font-sans">
              We import real Sicilian pistachios and organic single-origin cocoa mass from trusted fair-trade farmers to lay a glorious flavor baseline.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white border border-[#EE74AA]/20 p-6 rounded-none relative overflow-hidden group shadow-sm transition-all hover:shadow-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#EE74AA]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
            
            <div className="w-10 h-10 bg-[#EE74AA]/10 rounded-full flex items-center justify-center text-[#EE74AA] border border-[#EE74AA]/20 mb-6 relative">
              <Clock className="w-4 h-4" />
            </div>

            <h3 className="text-lg font-serif font-bold text-[#3D1B2B] mb-2 tracking-tight">
              Freshly Baked Daily
            </h3>
            <p className="text-xs text-[#3D1B2B]/70 leading-relaxed font-sans">
              No cold-storage inventory. Our master patisserie cooks hand-knead, package, and bake each order on the morning of requested transit.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white border border-[#EE74AA]/20 p-6 rounded-none relative overflow-hidden group shadow-sm transition-all hover:shadow-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#EE74AA]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
            
            <div className="w-10 h-10 bg-[#EE74AA]/10 rounded-full flex items-center justify-center text-[#EE74AA] border border-[#EE74AA]/20 mb-6 relative">
              <Flame className="w-4 h-4" />
            </div>

            <h3 className="text-lg font-serif font-bold text-[#3D1B2B] mb-2 tracking-tight">
              Rich Chocolate Filling
            </h3>
            <p className="text-xs text-[#3D1B2B]/70 leading-relaxed font-sans">
               Split the cookie to unleash the slow flowing, velvety pistachio and praline cream, heavily fortified with the satisfying crisp kunafa pastry threads.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white border border-[#EE74AA]/20 p-6 rounded-none relative overflow-hidden group shadow-sm transition-all hover:shadow-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#EE74AA]/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
            
            <div className="w-10 h-10 bg-[#EE74AA]/10 rounded-full flex items-center justify-center text-[#EE74AA] border border-[#EE74AA]/20 mb-6 relative">
               <Truck className="w-4 h-4" />
            </div>

            <h3 className="text-lg font-serif font-bold text-[#3D1B2B] mb-2 tracking-tight">
              Fast Delivery
            </h3>
            <p className="text-xs text-[#3D1B2B]/70 leading-relaxed font-sans">
              Shipped within Dubai in our chilled logistics vans within 45 mins. Freshness factor guaranteed from the warm oven to your doorstep.
            </p>
          </div>

        </div>

      </motion.div>
    </section>

      {/* PRODUCTS SECTION (Lux Menu) */}
      <section className="py-20 md:py-28 bg-[#FFFFFF] border-y border-[#EE74AA]/15 relative scroll-mt-20" id="menu">
        <div className="absolute inset-0 bg-[#EE74AA]/[0.02] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6 sm:px-8"
        >
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 px-4 sm:px-0">
            <div>
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#EE74AA] block mb-2">
                Pure Dessert Luxury
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3D1B2B] tracking-tight">
                Freshly Baked Daily
              </h2>
            </div>
            <p className="text-sm text-[#3D1B2B]/75 max-w-sm md:text-right font-sans leading-relaxed">
              Made fresh to ensure every bite is soft, chewy, and delicious.
            </p>
          </div>

          {/* Core products listing cards in modular white format */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COOKIES_PRODUCTS.map((prod) => {
              const isLiked = likedCookies[prod.id] || false;
              
              return (
                <div
                  key={prod.id}
                  className="group relative bg-white border border-[#EE74AA]/20 rounded-none p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#EE74AA] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#EE74AA]/10 z-10 overflow-hidden"
                >
                  {prod.bestseller && (
                    <div className="absolute top-4 left-4 z-20 px-3 py-1 text-[9px] font-sans font-extrabold uppercase tracking-widest rounded-none bg-[#EE74AA] text-white shadow-md flex items-center gap-1">
                      <Crown className="w-3 h-3 text-white stroke-[2]" />
                      Bestseller
                    </div>
                  )}

                  {/* Like Button */}
                  <button
                    onClick={(e) => toggleLike(prod.id, e)}
                    className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full border border-[#EE74AA]/15 bg-white flex items-center justify-center text-[#3D1B2B]/40 hover:text-red-500 hover:border-red-500/20 transition-all active:scale-90 cursor-pointer"
                    aria-label={`Like ${prod.name}`}
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : "fill-none"}`} />
                  </button>

                  <div>
                    {/* Visual box wrapper */}
                    <div className="relative h-64 w-full flex items-center justify-center bg-[#FFF9FB] rounded-none overflow-hidden mb-6 group-hover:bg-[#FFF0F4] transition-all duration-300">
                      {/* Interactive glow inside card */}
                      <div 
                        className="absolute w-28 h-28 rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-300 pointer-events-none"
                        style={{ backgroundColor: prod.accentColor }}
                      />
                      
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-4/5 max-h-[85%] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.1)] group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex items-center gap-1 text-[#EE74AA] mb-2">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span className="text-xs font-bold font-sans">{prod.rating}</span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#3D1B2B] leading-snug tracking-tight mb-2">
                      {prod.name}
                    </h3>

                    <p className="text-xs text-[#3D1B2B]/75 leading-relaxed font-sans line-clamp-2 mb-6">
                      {prod.tagline}
                    </p>
                  </div>

                  {/* Buy / details button */}
                  <div className="pt-4 border-t border-[#EE74AA]/15 flex items-center justify-between gap-4 mt-auto">
                    <div>
                      <span className="text-[10px] text-[#3D1B2B]/60 uppercase font-sans block">
                        Price Per Cookie
                      </span>
                      <span className="text-xl font-serif font-bold text-[#3D1B2B]">
                        ₱{prod.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenDetails(prod)}
                        className="w-8 h-8 rounded-none border border-[#EE74AA]/30 text-[#EE74AA] hover:text-white hover:bg-[#EE74AA] flex items-center justify-center transition-colors cursor-pointer"
                        title="View nutritional specifications"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleSelectForOrder(prod.id)}
                        className="px-4 py-2.5 rounded-none bg-[#EE74AA] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#EE74AA]/90 hover:shadow-lg hover:shadow-[#EE74AA]/20 shadow-md active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        Order Box
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </motion.div>
      </section>

      {/* ABOUT / STORY SECTION (Heritage) */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 sm:px-8 lg:px-8 scroll-mt-20" id="story">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          
          {/* Banner Left Frame */}
          <div className="lg:col-span-6 relative group">
            {/* Outline frame border decoration - square corners */}
            <div className="absolute -inset-2 border border-[#EE74AA]/25 rounded-none pointer-events-none group-hover:border-[#EE74AA]/45 transition-colors duration-500" />
            
            <div className="relative overflow-hidden rounded-none border border-[#EE74AA]/15 shadow-2xl bg-white">
              <img
                src={aboutBannerImg}
                alt="Dubai Chewy Cookies Stack"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transform scale-100 group-hover:scale-102 transition-transform duration-700 brightness-[0.95]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40" />
              
              {/* Dynamic stamp details absolute - clean solid style */}
              <div className="absolute bottom-6 left-6 right-6 backdrop-blur-md bg-white/95 border border-[#EE74AA]/20 p-4 rounded-none flex items-center justify-between gap-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#EE74AA]/10 flex items-center justify-center text-[#EE74AA]">
                    <Gem className="w-5 h-5 fill-current" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest block text-[#EE74AA]">
                      Original Seal of Quality
                    </span>
                    <span className="text-xs font-bold text-[#3D1B2B] block mt-0.5">
                      100% Certified Safe Edible Gold Flake
                    </span>
                  </div>
                </div>
                <div className="text-right font-sans font-bold text-[9px] text-[#3D1B2B]/50 uppercase tracking-widest leading-normal">
                  SHIRAZ WHEAT • 100%
                </div>
              </div>

            </div>
          </div>

          {/* Story Narrative Right */}
          <div className="lg:col-span-6 space-y-6 px-4 sm:px-0">
            <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#EE74AA] block">
              Our Story
            </span>
            
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3D1B2B] tracking-tight leading-tight">
              Proudly Made in Cebu City
            </h2>

            <p className="text-sm text-[#3D1B2B]/85 leading-relaxed font-sans">
              Dubai Chewwy Cookie was created in Cebu City, Philippines, with a simple goal: to bring a unique and delicious cookie experience to every customer. Inspired by premium flavors and crafted with care, our cookies are made to satisfy every sweet craving. 
            </p>

            <p className="text-sm text-[#3D1B2B]/85 leading-relaxed font-sans">
             Each cookie is freshly baked to achieve the perfect soft and chewy texture. We combine rich chocolate, crunchy kunafa, and carefully selected ingredients to create a delightful balance of flavor and texture in every bite.
            </p>

            <div className="h-px bg-[#EE74AA]/15 w-full my-6" />

            <div className="grid grid-cols-2 gap-6 pt-2">
              <div className="space-y-1">
                <span className="text-[#3D1B2B] font-bold text-sm flex items-center gap-1.5 font-serif uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-[#EE74AA]" />
                  Soft & Chewy Perfection
                </span>
                <p className="text-xs text-[#3D1B2B]/70 leading-relaxed font-sans">
                 Freshly baked to deliver the perfect soft and chewy texture in every bite. 🍪🤎
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[#3D1B2B] font-bold text-sm flex items-center gap-1.5 font-serif uppercase tracking-wider">
                  <Flame className="w-4 h-4 text-[#EE74AA]" />
                  Delight in Every Bite
                </span>
                <p className="text-xs text-[#3D1B2B]/70 leading-relaxed font-sans">
                  Enjoy the perfect combination of sweetness, chewiness, and premium flavor.
                </p>
              </div>
            </div>

          </div>

        </motion.div>
      </section>

      {/* ORDER CONFIGURATOR SECTION (Order Builder) */}
      <section className="py-20 md:py-28 bg-[#FFF9FB] border-y border-[#EE74AA]/15 relative scroll-mt-20" id="order">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6 sm:px-8"
          id="order-builder-section"
        >
          
          <div className="text-center max-w-2xl mx-auto mb-16 px-4 sm:px-0">
            <span className="text-[#EE74AA] text-xs uppercase tracking-[0.3em] font-bold block mb-2">
              Tailored Gourmet Experiency
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3D1B2B] tracking-tight">
             Freshly Baked & Delivered
            </h2>
            <p className="text-sm text-[#3D1B2B]/70 mt-3 leading-relaxed font-sans">
              Every batch is made fresh to ensure the perfect chewy texture and delicious taste. Whether for yourself, family, or special occasions, we've got your cookie cravings covered. 🍪✨
            </p>
          </div>

          {/* Form component */}
          <OrderForm
            products={COOKIES_PRODUCTS}
            selectedProductId={orderProductId}
            onSelectProduct={setOrderProductId}
          />

        </motion.div>
      </section>

      {/* TESTIMONIALS SECTION (Reviews) */}
      <section className="py-20 md:py-28 bg-white border-b border-[#EE74AA]/10 scroll-mt-20" id="testimonials">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6 sm:px-8"
        >
          
          <div className="text-center max-w-2xl mx-auto mb-12 px-4 sm:px-0">
            <span className="text-[#EE74AA] text-xs uppercase tracking-[0.3em] font-bold block mb-2">
              Customer Reviews
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#3D1B2B] tracking-tight">
              What Our Customers Say
            </h2>
            <p className="text-sm text-[#3D1B2B]/70 mt-3 font-sans">
              Read genuine feedback from people who enjoy our soft, chewy, and delicious cookies..
            </p>
          </div>

          <ReviewCarousel />

        </motion.div>

      </section>

      {/* ACCORDION FAQ SECTION */}
      <section className="py-20 md:py-24 max-w-4xl mx-4 sm:mx-auto px-6 sm:px-8 bg-white rounded-none border border-[#EE74AA]/25 mb-20 mt-16 shadow-xl shadow-[#EE74AA]/5 scroll-mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
        <div className="text-center mb-12 px-4 sm:px-0">
          <span className="text-[#EE74AA] text-xs uppercase tracking-[0.2em] font-bold block mb-1">
            Answers & Clarity
          </span>
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#3D1B2B] tracking-tight">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "How does the crisp Kunafa texture stay crunchy inside?",
              a: "We pre-bake and toast our kataifi shreds in dynamic ghee with organic glucose sugars. This chemical glazing forms an light protective crust around each thread, keeping it exceptionally crispy to the bite even when bathed in rich pistachio cream and roasted oils."
            },
            {
              q: "What makes the gold leaf safe to consume?",
              a: "We only use premium, certified 24-karat edible gold dust and flakes. It is physically inert, hypoallergenic, FDA/EU certified for catering use, and designed specifically for high-end dessert garnishing."
            },
            {
              q: "How fast do you dispatch order shipments?",
              a: "Orders finalized before 1:00 PM are baked and delivered same-day in our luxury chilled box fleet within Dubai and Sharjah. Other UAE Emirates (Abu Dhabi, Ajman, RAK) are delivered early next-day."
            },
            {
              q: "Can I customize the corporate boxes or custom events?",
              a: "Absolutely. We provide corporate wax-seal styling, custom emerald packaging branding, and private catering events. Contact our team directly via the Facebook Messenger link below with custom coordinates."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#FFF9FB] border border-[#EE74AA]/15 rounded-none p-5 md:p-6">
              <h4 className="text-sm md:text-base font-bold text-[#3D1B2B] mb-2 font-serif">
                Q: {item.q}
              </h4>
              <p className="text-xs text-[#3D1B2B]/75 leading-relaxed font-sans">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>

      {/* FB MESSENGER & DIRECT ENGAGEMENT FOOTER CALLOUT */}
      <section className="bg-[#EE74AA] text-white border-t border-transparent pt-20 pb-12" id="contact-footer">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-6">
            <a href="#" className="flex items-center gap-3 group">
              {/* High-fidelity vector logo matching Sugaria & Co. brand mark */}
              <svg
                className="w-11 h-11 transition-transform duration-300 group-hover:scale-110 shrink-0 bg-white rounded-full p-1"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M34 50C30 50 26 44 26 38C26 28 35 24 43 26C45 18 55 18 57 26C65 24 74 28 74 38C74 44 70 50 66 50"
                  stroke="#EE74AA"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M38 50C36 50 35 52 35 54C35 58 39 61 50 62C61 61 65 58 65 54C65 52 64 50 62 50"
                  stroke="#EE74AA"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M50 32C45 32 42.5 35 45 40C47.5 45 50 49 50 49C50 49 52.5 45 55 40C57.5 35 55 32 50 32Z"
                  stroke="#EE74AA"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="#EE74AA"
                  fillOpacity="0.19"
                />
              </svg>
              <div className="flex flex-col select-none">
                <span className="font-script text-white text-2xl tracking-normal leading-none mb-0.5 font-normal">
                  Sugária
                </span>
                <span className="font-sans text-[8px] font-bold tracking-[0.25em] text-white/80 uppercase leading-none">
                  & CO.
                </span>
              </div>
            </a>

            <p className="text-xs text-white/85 leading-relaxed max-w-sm font-sans">
             We sold out 150 pieces yesterday and honestly, we’re still processing the love. Every order, every support, every bite means the world to us.
             From something new and tiny to something that got so much big love already, thank you for being part of this sweet beginning. More flavors, more minis, and more exciting drops coming soon.
            </p>

            {/* Social Links Panel */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/sugariaco.ceb"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 rounded-full border border-white/20 text-white/80 hover:text-[#EE74AA] hover:bg-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 bg-white/5 cursor-pointer"
                aria-label="Visit our Facebook Page"
              >
                <svg 
                  className="w-5 h-5 flex-shrink-0 fill-current transition-transform duration-300 group-hover:scale-110" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/sugariaco.ceb"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-11 h-11 rounded-full border border-white/20 text-white/80 hover:text-[#EE74AA] hover:bg-white flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 bg-white/5 cursor-pointer"
                aria-label="Direct Messenger chat"
              >
                <svg 
                  className="w-5 h-5 flex-shrink-0 fill-current transition-transform duration-300 group-hover:scale-110" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.14 2 11.25c0 2.41 1.02 4.6 2.73 6.13.15.13.24.33.24.53l-.01 1.7c0 .44.43.78.85.63l1.91-.7c.15-.06.32-.05.46.02 1.18.42 2.44.67 3.82.67 5.52 0 10-4.14 10-9.25C22 6.14 17.52 2 12 2zm1.18 11.59l-2.45-2.61c-.34-.36-.91-.36-1.25 0l-3.83 4.1c-.49.52-1.21-.13-.81-.73l4.11-6.1c.34-.51.91-.51 1.25 0l2.45 2.61c.34.36.91.36 1.25 0l3.83-4.1c.49-.52 1.21.13.81.73l-4.11 6.1c-.34.52-.91.52-1.25 0z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: High-end Location Coordinates */}
          <div className="md:col-span-3 space-y-4">
            <h5 className="font-serif text-xs font-bold uppercase tracking-widest text-white">
              Baking Studios
            </h5>
            <ul className="space-y-3.5 text-xs text-white/85 font-sans">
              <li className="flex gap-2 items-start">
                <MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>
                 Mambaling, Cebu City, Philippines
                </span>
              </li>
              <li className="flex gap-2 items-start">
                <Clock className="w-4 h-4 text-white shrink-0 mt-0.5" />
                <span>
                  We're Open: 7:00 AM – 11:00 PM <br />
                  Logistics Dispatch: 8:00 AM – 8:00 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact Information */}
          <div className="md:col-span-4 space-y-4">
            <h5 className="font-serif text-xs font-bold uppercase tracking-widest text-white">
              Premium Concierge
            </h5>
            <ul className="space-y-3 text-xs text-white/85 font-sans">
              <li className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <a href="tel:+63321234567" className="hover:text-white transition-colors">
                  +63 32 123 4567 (Hotline)
                </a>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <a href="mailto:concierge@sugariaco.com" className="hover:text-white transition-colors block truncate">
                  concierge@sugariaco.com
                </a>
              </li>
              <li className="pt-2">
                <p className="text-[10px] text-white/60 leading-relaxed italic font-sans animate-pulse">
                  *Need an urgent custom batch, custom gold monogramming, or bespoke boxes for dinner parties? Email or hotline our concierge team 24/7.
                </p>
              </li>
            </ul>
          </div>

        </div>

        {/* Small bottom Copyright section */}
        <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
          <p className="text-[10px] font-mono text-white/60">
            © 2026 Sugaria & Co. Registered Trademark Cebu Department of Trade and Industry. All Rights Reserved.
          </p>
          <p className="text-[10px] font-mono text-white/60 flex items-center gap-1.5 justify-center">
            <span>Powered by</span>
            <span className="text-white font-sans font-bold tracking-wider uppercase bg-white/10 px-1.5 py-0.5">Sugaria & Co.</span>
          </p>
        </div>
      </section>

      {/* DETAIL MODAL OVERLAY */}
      <CookieModal
        product={selectedProduct}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelectForOrder={handleSelectForOrder}
      />

    </div>
  );
}
