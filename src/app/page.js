"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import {
  Building,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ChevronRight,
  Layers,
  ShieldCheck,
  Calculator,
  Info,
  Menu,
  X,
  FileText,
  Compass,
  ArrowUpRight,
  Coffee,
  Activity,
  Route,
  Navigation
} from "lucide-react";

// Framer Motion scroll reveal component - once: true for smooth load reveals
function ScrollReveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-85px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Staggered word animation
function SplitText({ text, className = "" }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-3">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.0, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smart Reveal Navbar Logic
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollYRef = useRef(0);

  // Scroll variables for hero parallax
  const heroRef = useRef(null);
  const { scrollY, scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastScrollYRef.current;
    if (latest > 100) {
      if (diff > 5) {
        setShowNavbar(false);
      } else if (diff < -5) {
        setShowNavbar(true);
      }
    } else {
      setShowNavbar(true);
    }
    lastScrollYRef.current = latest;
  });

  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  // Accordion Blueprint Studio State
  const [activePlan, setActivePlan] = useState("824");
  const plans = [
    { id: "824", title: "1 BHK (824 Sq. Ft.)", image: "/images/plan-824.png", type: "Type B", bed: "1 BHK", size: 824, toilets: "1 Toilet", balcony: "4 Ft. Wide Balcony", rate: "₹53.56 L" },
    { id: "1160", title: "2 BHK (1160 Sq. Ft.)", image: "/images/plan-1160.png", type: "Type A3", bed: "2 BHK", size: 1160, toilets: "2 Toilets", balcony: "5 Ft. Wide Balcony", rate: "₹75.40 L" },
    { id: "1360", title: "2 BHK (1360 Sq. Ft.)", image: "/images/plan-1360.png", type: "Type A2", bed: "2 BHK", size: 1360, toilets: "2 Toilets", balcony: "4 Ft. 6 In. Wide Balcony", rate: "₹88.40 L" },
    { id: "1410", title: "2 BHK (1410 Sq. Ft.)", image: "/images/plan-1410.png", type: "Type A1", bed: "2 BHK", size: 1410, toilets: "2 Toilets", balcony: "4 Ft. 6 In. Wide Balcony", rate: "₹91.65 L" }
  ];

  const currentPlanDetails = plans.find(p => p.id === activePlan);

  // Interactive blueprint CAD crosshair coords
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHoveringBlueprint, setIsHoveringBlueprint] = useState(false);
  const blueprintViewerRef = useRef(null);

  const handleMouseMoveBlueprint = (e) => {
    if (!blueprintViewerRef.current) return;
    const rect = blueprintViewerRef.current.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setCoords({ x, y });
  };

  // Specification Chips State
  const [activeSpecTab, setActiveSpecTab] = useState("Structural Elements");
  const specCategories = ["Structural Elements", "Premium Finishes", "Modern Systems"];
  const specifications = [
    {
      category: "Structural Elements",
      title: "Jindal Structural Steel",
      sub: "Reinforcement Framework",
      desc: "Grade Fe 550D TMT bars ensuring premium tensile strength, high elongation, and superior earthquake-resistant foundation stability."
    },
    {
      category: "Structural Elements",
      title: "Ultratech or JK Cement",
      sub: "Monolithic Structural Core",
      desc: "Certified high-grade OPC & PPC cement blends ensuring exceptionally high concrete compressive strength and lasting corrosion resistance."
    },
    {
      category: "Structural Elements",
      title: "Earthquake-Resistant RCC Framed Design",
      sub: "Seismic Safety Standard",
      desc: "Structural engineering optimized for Seismic Zone V compliance, utilising deep pile foundations and premium strength columns."
    },
    {
      category: "Premium Finishes",
      title: "Asian, Berger, or Nerolac Paints",
      sub: "Wall Coatings & Textures",
      desc: "Premium acrylic emulsion interior paint with smooth silk finish, paired with eco-friendly anti-fungal exterior weather-shield paint coats."
    },
    {
      category: "Premium Finishes",
      title: "Luxury Vitrified Tiling",
      sub: "Flooring surfaces",
      desc: "Double-charged, low-porosity vitrified floor tiling matching premium stone aesthetics, offering outstanding scratch and stain resistance."
    },
    {
      category: "Premium Finishes",
      title: "Modular Kitchen Provisions",
      sub: "Culinary Spaces",
      desc: "Granite counter slab with high-end polished finish and stainless steel sink, paired with designer ceramic tiles above the counter."
    },
    {
      category: "Modern Systems",
      title: "Hindware or Parryware Chinaware",
      sub: "Premium Bathroom Fixtures",
      desc: "Anti-microbial, stain-resistant vitreous china toilet fixtures paired with modern dual-flush technology to optimize water usage."
    },
    {
      category: "Modern Systems",
      title: "Concealed Plumbing & Fitting",
      sub: "Water Infrastructure",
      desc: "Corrosion-free CPVC/PPR pipes ensuring leak-proof operations and maintenance-free longevity, paired with premium chrome-plated fittings."
    },
    {
      category: "Modern Systems",
      title: "Fire-Resistant Concealed Wiring",
      sub: "Electrical Backbone",
      desc: "Flame-Retardant Low Smoke (FRLS) copper wiring inside high-impact PVC conduits, complete with modular switches and protective MCBs."
    }
  ];

  const filteredSpecs = specifications.filter(spec => spec.category === activeSpecTab);

  // Dynamic Milestone Estimator State
  const [selectedPlanId, setSelectedPlanId] = useState("824");
  const [paymentPlan, setPaymentPlan] = useState("flexi"); // "flexi" or "construction"
  const [activeLedgerIndex, setActiveLedgerIndex] = useState(0);

  const estimatorPlan = plans.find(p => p.id === selectedPlanId);
  const baseRate = 6500;
  const rawCost = estimatorPlan.size * baseRate;

  const paymentSchedules = {
    standard: [
      { step: "Booking Amount", pct: 20, label: "Immediate on booking" },
      { step: "Second Milestone", pct: 30, label: "Within 60 days / agreement milestone" },
      { step: "Possession Handover", pct: 50, label: "At final registry & keys handover" }
    ]
  };

  const activeSchedule = paymentSchedules.standard;

  // Dynamic MapLibre WebGL 3D Flight & Toggle State
  const [maplibreLoaded, setMaplibreLoaded] = useState(false);
  const [activeMapTab, setActiveMapTab] = useState("3d"); // "3d" or "2d"
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const videoRef = useRef(null);

  const mapSectionRef = useRef(null);
  const isMapInView = useInView(mapSectionRef, { once: false, margin: "-120px 0px" });

  const isHeroInView = useInView(heroRef, { once: false, margin: "-10px 0px" });

  // GPU optimization: pause video decoding when hero section is not in view
  useEffect(() => {
    if (!videoRef.current) return;
    if (isHeroInView) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isHeroInView]);

  useEffect(() => {
    // Append maplibre assets to head
    const link = document.createElement("link");
    link.href = "https://unpkg.com/maplibre-gl@4.0.0/dist/maplibre-gl.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://unpkg.com/maplibre-gl@4.0.0/dist/maplibre-gl.js";
    script.async = true;
    script.onload = () => {
      setMaplibreLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!maplibreLoaded || !mapContainerRef.current || activeMapTab !== "3d") return;

    // style mapping combining satellite imagery with CartoDB transparent street & town labels
    const mapStyle = {
      version: 8,
      sources: {
        "satellite-tiles": {
          type: "raster",
          tiles: [
            "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          ],
          tileSize: 256,
          attribution: "Esri, Maxar"
        },
        "street-roads": {
          type: "raster",
          tiles: [
            "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
          ],
          tileSize: 256,
          attribution: "Esri"
        },
        "street-labels": {
          type: "raster",
          tiles: [
            "https://a.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png",
            "https://b.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png",
            "https://c.basemaps.cartocdn.com/rastertiles/voyager_only_labels/{z}/{x}/{y}.png"
          ],
          tileSize: 256
        }
      },
      layers: [
        {
          id: "satellite-layer",
          type: "raster",
          source: "satellite-tiles",
          minzoom: 0,
          maxzoom: 19
        },
        {
          id: "roads-layer",
          type: "raster",
          source: "street-roads",
          minzoom: 0,
          maxzoom: 19
        },
        {
          id: "labels-layer",
          type: "raster",
          source: "street-labels",
          minzoom: 0,
          maxzoom: 19
        }
      ]
    };

    const map = new window.maplibregl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: [78.03, 30.29], // Start wide over Dehradun foothills
      zoom: 9.5,
      pitch: 0,
      bearing: 0,
      interactive: false,
      attributionControl: false
    });

    // Create custom pulsing map marker for Beacon Green One site coordinates
    const el = document.createElement("div");
    el.style.position = "relative";
    el.style.width = "10px";
    el.style.height = "10px";
    el.style.borderRadius = "50%";
    el.style.backgroundColor = "#4E3629";
    el.style.border = "1.5px solid #C5A880";
    el.style.boxShadow = "0 0 8px rgba(0,0,0,0.5)";

    const pulseRing = document.createElement("div");
    pulseRing.className = "pulse-marker-ring"; // Pulse ring CSS class
    el.appendChild(pulseRing);

    const label = document.createElement("div");
    label.style.position = "absolute";
    label.style.bottom = "16px";
    label.style.left = "50%";
    label.style.transform = "translateX(-50%)";
    label.style.backgroundColor = "#211611";
    label.style.color = "#FBFBFA";
    label.style.fontFamily = "Cormorant Garamond, serif";
    label.style.fontSize = "9px";
    label.style.fontWeight = "bold";
    label.style.letterSpacing = "0.15em";
    label.style.textTransform = "uppercase";
    label.style.padding = "3px 8px";
    label.style.borderRadius = "4px";
    label.style.border = "0.5px solid #C5A880";
    label.style.whiteSpace = "nowrap";
    label.style.boxShadow = "0 3px 6px rgba(0,0,0,0.3)";
    label.innerText = "Beacon Green One";
    el.appendChild(label);

    new window.maplibregl.Marker({ element: el })
      .setLngLat([78.09921591481071, 30.385040940751615])
      .addTo(map);

    mapRef.current = map;

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [maplibreLoaded, activeMapTab]);

  // Slower, cinematic scroll triggered flight loop with proper timeout clearance
  useEffect(() => {
    if (!mapRef.current || activeMapTab !== "3d" || !isMapInView) return;

    let active = true;
    let startTimeout = null;
    let cycleTimeout = null;

    const runFlightLoop = () => {
      if (!active || !mapRef.current) return;

      // 1. Reset to wide regional view
      mapRef.current.jumpTo({
        center: [78.03, 30.29],
        zoom: 9.5,
        pitch: 0,
        bearing: 0
      });

      // 2. Perform 9.5-second cinematic flight path (Centering exactly over Challang coordinates)
      startTimeout = setTimeout(() => {
        if (!active || !mapRef.current) return;

        mapRef.current.flyTo({
          center: [78.09921591481071, 30.385040940751615], // Focused exactly on project coordinates
          zoom: 13.6, // Zoom backed out to 13.6 to keep Rajpur text labels in frame
          pitch: 58,
          bearing: 42,
          duration: 9500,
          essential: true
        });

        // 3. Pause for 3s at destination (Total cycle 9.5s + 3s + 1.5s margin = 14s)
        cycleTimeout = setTimeout(() => {
          if (active) {
            runFlightLoop();
          }
        }, 14000);

      }, 1500);
    };

    runFlightLoop();

    return () => {
      active = false;
      if (startTimeout) clearTimeout(startTimeout);
      if (cycleTimeout) clearTimeout(cycleTimeout);
    };
  }, [isMapInView, activeMapTab]);

  // Form State
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", tourDate: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", phone: "", tourDate: "", message: "" });
    }, 4000);
  };

  return (
    <div className="flex-1 flex flex-col font-sans select-none relative pb-16 md:pb-0 bg-grain bg-[#FAF9F6] text-[#211611] overflow-x-hidden">

      {/* 4-COLUMN ARCHITECTURAL NEWSPAPER GRID LINE SYSTEM */}
      <div className="absolute inset-y-0 left-[25%] w-[0.5px] bg-[#C5A880]/15 pointer-events-none z-0" />
      <div className="absolute inset-y-0 left-[50%] w-[0.5px] bg-[#C5A880]/10 pointer-events-none z-0" />
      <div className="absolute inset-y-0 left-[75%] w-[0.5px] bg-[#C5A880]/15 pointer-events-none z-0" />

      {/* DOTTED CARDSTOCK PRINT PATTERN BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-30 opacity-[0.02] bg-dots" />

      {/* 0. DETAILED ARCHITECTURAL HEADER (With Smart Scroll Hide/Reveal & Gold catalog detailing) */}
      <motion.div
        animate={{ y: showNavbar ? 0 : -90 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 w-full"
      >
        <header className="bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#C5A880]/30 py-3.5 px-4 sm:px-8 md:px-12 flex justify-between items-center shadow-sm relative">
          {/* Subtle catalog grid guide markers */}
          <div className="absolute top-0 bottom-0 left-[25%] w-[0.5px] bg-[#C5A880]/10 pointer-events-none hidden md:block" />
          <div className="absolute top-0 bottom-0 left-[75%] w-[0.5px] bg-[#C5A880]/10 pointer-events-none hidden md:block" />

          {/* Main Logo & Identity */}
          <a href="#hero" className="flex items-center gap-3 group relative z-10">
            <div className="w-9 h-9 rounded-lg bg-transparent flex items-center justify-center group-hover:scale-[1.05] transition-transform duration-300 relative overflow-hidden">
              <img
                src="/images/beacon-logo.png"
                alt="Beacon Hill Estate Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="font-serif font-extrabold tracking-widest text-[#211611] text-xs sm:text-sm block leading-none">BEACON HILLS ESTATE</span>
              <span className="text-[7px] font-mono tracking-widest text-[#C5A880] uppercase block mt-1">DEHRADUN FOOTHILLS LEAFLET</span>
            </div>
          </a>

          {/* Compass & Coordinates Widget (Center) */}
          <div className="hidden xl:flex items-center gap-4 font-mono text-[8px] tracking-[0.2em] text-[#C5A880] group/compass">
            <Compass className="text-[#C5A880] w-3 h-3 transition-transform duration-700 group-hover/compass:rotate-180" />
            <span>SEC-10 CHALLANG</span>
            <span className="text-[#C5A880]/40">|</span>
            <span>30.3165° N</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#211611]/85 relative z-10">
            <a href="#gallery" className="hover:text-[#C5A880] transition-colors relative group/link py-1 flex items-center gap-1">
              <span className="text-[7.5px] font-mono text-[#C5A880]/60">01/</span> NARRATIVE
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C5A880] transition-all duration-300 group-hover/link:w-full" />
            </a>
            <a href="#connectivity" className="hover:text-[#C5A880] transition-colors relative group/link py-1 flex items-center gap-1">
              <span className="text-[7.5px] font-mono text-[#C5A880]/60">02/</span> CONNECTIVITY
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover/link:w-full" />
            </a>
            <a href="#blueprints" className="hover:text-[#C5A880] transition-colors relative group/link py-1 flex items-center gap-1">
              <span className="text-[7.5px] font-mono text-[#C5A880]/60">03/</span> STUDIO
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover/link:w-full" />
            </a>
            <a href="#specifications" className="hover:text-[#C5A880] transition-colors relative group/link py-1 flex items-center gap-1">
              <span className="text-[7.5px] font-mono text-[#C5A880]/60">04/</span> SPECS
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover/link:w-full" />
            </a>
            <a href="#estimator" className="hover:text-[#C5A880] transition-colors relative group/link py-1 flex items-center gap-1">
              <span className="text-[7.5px] font-mono text-[#C5A880]/60">05/</span> ESTIMATOR
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C5A880] transition-all duration-300 group-hover/link:w-full" />
            </a>
            <a
              href="#capture"
              className="bg-wood-button hover:bg-wood-button-hover text-[#FBFBFA] px-4 py-2 rounded-none font-mono text-[8px] tracking-[0.2em] font-bold uppercase transition-all duration-300 relative group"
            >
              {/* Draft ticks */}
              <div className="absolute -top-[1.5px] -left-[1.5px] w-1.5 h-1.5 border-t border-l border-[#C5A880] group-hover:border-transparent" />
              <div className="absolute -bottom-[1.5px] -right-[1.5px] w-1.5 h-1.5 border-b border-r border-[#C5A880] group-hover:border-transparent" />
              REQUEST TOUR
            </a>
          </nav>

          {/* Mobile Menu Icon */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-[#211611] focus:outline-none z-10 border border-[#C5A880]/20 rounded-md bg-[#FAF9F6]/80"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </header>
        {/* Fine double horizontal ledger frame lines */}
        <div className="w-full h-[1px] bg-[#C5A880]/15" />
      </motion.div>

      {/* Mobile Nav Overlay (Premium card overlay) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed inset-x-4 top-20 z-40 bg-[#FAF9F6] border border-[#C5A880]/30 rounded-2xl flex flex-col p-6 gap-4 lg:hidden shadow-xl"
          >
            <div className="text-[8px] font-mono text-[#C5A880] border-b border-stone-100 pb-2">
              CATALOG INDEX / BEACON GREEN ONE
            </div>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-serif border-b border-stone-150 pb-1.5 text-[#211611] flex justify-between items-center"
            >
              <span>Narrative</span>
              <span className="font-mono text-[9px] text-[#C5A880]">01</span>
            </a>
            <a
              href="#connectivity"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-serif border-b border-stone-150 pb-1.5 text-[#211611] flex justify-between items-center"
            >
              <span>Foothill Connectivity</span>
              <span className="font-mono text-[9px] text-[#C5A880]">02</span>
            </a>
            <a
              href="#blueprints"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-serif border-b border-stone-150 pb-1.5 text-[#211611] flex justify-between items-center"
            >
              <span>Blueprint Studio</span>
              <span className="font-mono text-[9px] text-[#C5A880]">03</span>
            </a>
            <a
              href="#specifications"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-serif border-b border-stone-150 pb-1.5 text-[#211611] flex justify-between items-center"
            >
              <span>Specification Sheets</span>
              <span className="font-mono text-[9px] text-[#C5A880]">04</span>
            </a>
            <a
              href="#estimator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-serif border-b border-stone-150 pb-1.5 text-[#211611] flex justify-between items-center"
            >
              <span>Investment Estimator</span>
              <span className="font-mono text-[9px] text-[#C5A880]">05</span>
            </a>
            <a
              href="#capture"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-wood-button hover:bg-wood-button-hover text-[#FBFBFA] py-3 text-center text-xs font-semibold tracking-widest mt-2 block font-mono uppercase rounded-xl"
            >
              BOOK PRIVATE TOUR
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO CANVAS (Newspaper Cover layout) */}
      <section id="hero" ref={heroRef} className="max-w-6xl mx-auto pt-24 px-6 pb-8 relative z-10">

        {/* DECOUPLED STABLE MOUNTAIN SVG BACKGROUND (Triggers on load, lag-free) */}
        <div className="absolute inset-x-0 top-16 h-48 flex justify-center items-center pointer-events-none z-0 overflow-visible opacity-80">
          <svg
            viewBox="0 0 1000 240"
            className="w-full max-w-4xl h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Mountain Peak 1 (Left) - Preloaded Static (Muted Gray-Gold for immediate visual grounding) */}
            <path
              d="M 50 210 L 250 85 L 430 210"
              stroke="#B39B78"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.4"
            />

            {/* Mountain Ridge line (Left) - Preloaded Static */}
            <path
              d="M 250 85 Q 262 135 258 210"
              stroke="#B39B78"
              strokeWidth="1.0"
              strokeDasharray="3 3"
              opacity="0.3"
            />

            {/* Mountain Peak 2 (Center-Right High) - Animates every time in viewport */}
            <motion.path
              d="M 310 210 L 580 30 L 820 210"
              stroke="#C5A880"
              strokeWidth="3.0"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.75"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 4.5, ease: [0.25, 1, 0.5, 1], delay: 0.5 }}
            />

            {/* Mountain Ridge contour (Center High) - Animated */}
            <motion.path
              d="M 580 30 Q 594 110 575 210"
              stroke="#C5A880"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              opacity="0.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 3.5, ease: "easeOut", delay: 1.2 }}
            />

            {/* Mountain Peak 3 (Far Right Minor) - Animated Drawing */}
            <motion.path
              d="M 720 210 L 860 115 L 970 210"
              stroke="#C5A880"
              strokeWidth="2.0"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 3.5, ease: [0.25, 1, 0.5, 1], delay: 0.8 }}
            />

            {/* Horizon Line - Animated */}
            <motion.path
              d="M 20 210 L 980 210"
              stroke="#C5A880"
              strokeWidth="1.0"
              opacity="0.25"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 4.0, ease: "linear" }}
            />
          </svg>
        </div>

        <ScrollReveal className="flex flex-col relative">

          <div className="text-center mb-0 mt-2 relative">
            <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.4em] text-[#C5A880] block mb-3 font-semibold relative z-10">
              BEACON GREEN ONE
            </span>
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl tracking-[-0.03em] leading-[0.92] text-[#211611] font-light uppercase relative z-10">
              <SplitText text="Elevated Living" />
            </h1>
          </div>

          {/* Panoramic Framed Building Render — optimized taller aspect ratio on mobile, compressed 2.4MB video */}
          <div className="w-full aspect-[16/10] sm:aspect-[2.17/1] rounded-2xl overflow-hidden shadow-2xl border border-[#C5A880]/100 relative group my-4 bg-[#211611]">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(197,168,128,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(197,168,128,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none opacity-30 z-10" />

            <motion.div
              style={{ y: heroImgY, opacity: heroOpacity }}
              className="absolute inset-0 w-full h-[106%] -top-[6%] overflow-hidden group-hover:scale-[1.01] transition-transform duration-[5s] ease-out"
            >
              <video
                ref={videoRef}
                src="/images/hero-render.mp4"
                poster="/images/hero-render-alt2.png"
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </div>

          {/* Newspaper metadata rules */}
          <div className="border-t border-b border-[#C5A880]/30 py-3.5 my-3 grid grid-cols-3 text-center font-mono text-[9px] uppercase tracking-[0.25em] text-[#C5A880] gap-4">
            <span className="text-left hidden sm:inline">COORDINATES: 30.3165° N</span>
            <span className="sm:text-center text-left">PLOT NO 10, MAUZA CHALLANG</span>
            <span className="text-right">ELEVATION 647M</span>
          </div>

          {/* Asymmetric 3-Column Editorial Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-6 items-start text-[#211611]">

            <div className="md:col-span-6 pr-4">
              <p className="font-serif text-lg leading-relaxed text-[#211611] font-light">
                Elevated Living Between Mountains and Modernity. Dehradun&apos;s first budget premium housing project in the foothills of Mussoorie Hills.
              </p>
              <p className="font-sans text-xs text-stone-555 leading-relaxed font-light mt-3">
                A harmonious fusion of architectural luxury, pristine clean mountain air, and rapid urban connectivity. Constructed around safety, efficiency, and boutique layout blueprints.
              </p>
            </div>

            <div className="md:col-span-3 font-mono text-[9px] text-[#C5A880] uppercase tracking-widest space-y-1 pt-1">
              <div className="text-stone-500 font-bold mb-2">PROJECT DOSSIER:</div>
              <div>CLASSIFICATION: PREMIUM RESIDENCES</div>
              <div>TIERS: 1 BHK & 2 BHK CONFIGS</div>
              <div>LOCALE: MUSSOORIE FOOTHILLS</div>
              <div>STATUS: RERA REGISTERED</div>
            </div>

            <div className="md:col-span-3 flex flex-col sm:flex-row md:flex-col gap-2.5 pt-1">
              <a
                href="#blueprints"
                className="w-full text-center bg-wood-button hover:bg-wood-button-hover text-[#FBFBFA] px-5 py-3 rounded-full text-[10px] font-semibold uppercase tracking-wider hover:scale-[1.02] hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                Explore Blueprints
              </a>
              <a
                href="#capture"
                className="w-full text-center border border-[#C5A880]/30 text-[#211611] bg-white/70 hover:bg-white px-5 py-3 rounded-full text-[10px] font-semibold uppercase tracking-wider hover:scale-[1.02] transition-all duration-300 cursor-pointer"
              >
                Book Private Tour
              </a>
            </div>

          </div>

        </ScrollReveal>
      </section>

      {/* 2. MONOLITHIC NARRATIVE (The Trust Gallery with Swaying Watermark) */}
      <section id="gallery" className="py-20 px-6 md:px-12 relative overflow-hidden bg-grain bg-[#FAF9F6] border-y-[3px] border-double border-[#C5A880]/40">

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">

          <ScrollReveal className="max-w-2xl text-center md:text-left flex flex-col items-center md:items-start mb-12 relative w-full">

            {/* HERITAGE WATERMARK CENTERED VERTICALLY BEHIND THE PARAGRAPH BLOCK */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 select-none opacity-15">
              <span className="font-serif text-[8rem] sm:text-[11rem] lg:text-[14rem] text-[#C5A880] tracking-tighter uppercase font-bold whitespace-nowrap">
                Heritage
              </span>
            </div>

            <div className="w-16 h-[1.5px] bg-[#C5A880] mb-8 relative z-10" />
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A880] block mb-4 font-semibold relative z-10">THE TRUST GALLERY</span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#211611] leading-[1.15] tracking-tight mb-8 relative z-10">
              Quiet luxury projection, built on nearly three decades of structural value.
            </h2>

            <div className="font-sans text-stone-655 space-y-6 text-sm sm:text-base leading-relaxed font-light text-justify relative z-10">
              <p className="first-letter:font-serif first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:font-bold first-letter:text-pine">
                For nearly three decades, our group has meticulously constructed trust and architectural worth across the National Capital Region (NCR). Every concrete pillar, cantilever structure, and layout design is engineered around structural safety, space efficiency, and premium aesthetic finishes.
              </p>
              <p>
                With <strong>Beacon Green One</strong>, we now introduce our custom, community-centric premium housing tier to the serene valley of Uttarakhand. Anchored at the foothills of the Mussoorie Hills in Dehradun, this residential masterwork pairs the refreshing, clean climate of a hill sanctuary with the modern construction standards and comfort of elite suburban condominiums.
              </p>
            </div>
          </ScrollReveal>

          {/* FRAMED EDITORIAL PHOTO SPREAD */}
          <ScrollReveal className="w-full mt-2" delay={0.2}>
            <div className="border border-[#C5A880]/30 p-3 bg-[#FAF9F6] shadow-xl rounded-xl">
              <div className="w-full aspect-[2.17/1] overflow-hidden rounded-lg bg-stone-100">
                <img
                  src="/images/hero-render-alt.png"
                  alt="Beacon Green One Front Facade View B"
                  className="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-[4s]"
                />
              </div>
              <div className="mt-3 flex justify-between font-mono text-[8px] text-[#C5A880] uppercase tracking-widest px-1">
                <span>FIGURE 1.0 — FRONT ELEVATION VIEW B</span>
                <span>ARCHITECTURAL RENDERING</span>
              </div>
            </div>
          </ScrollReveal>

          {/* ABOUT BEACON HILLS ESTATE */}
          <ScrollReveal className="w-full mt-16 pt-16 border-t border-[#C5A880]/30 relative pb-4" delay={0.3}>
            {/* Left Side Building Towers (Bottom aligned of Development Vision section) */}
            <div className="absolute left-[-2rem] sm:left-[-5rem] md:left-[-8rem] lg:left-[-11rem] -bottom-6 pointer-events-none z-0 opacity-40">
              <svg className="w-40 sm:w-52 md:w-64 h-64" viewBox="0 0 300 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M 10 240 L 10 70 L 100 70 L 100 240"
                  stroke="#C5A880" strokeWidth="1.5" strokeDasharray="4 4"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 3, ease: "easeOut" }}
                />
                <motion.path
                  d="M 30 90 H 80 M 30 120 H 80 M 30 150 H 80 M 30 180 H 80 M 30 210 H 80"
                  stroke="#C5A880" strokeWidth="1" opacity="0.6"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 2.5, delay: 0.5 }}
                />
                <motion.path
                  d="M 120 240 L 120 20 L 230 20 L 230 240"
                  stroke="#C5A880" strokeWidth="2"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 3.5, ease: "easeOut", delay: 0.3 }}
                />
                <motion.path
                  d="M 140 50 H 210 M 140 80 H 210 M 140 110 H 210 M 140 140 H 210 M 140 170 H 210 M 140 200 H 210"
                  stroke="#C5A880" strokeWidth="1" strokeDasharray="3 3" opacity="0.7"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 3, delay: 0.8 }}
                />
                <motion.path d="M 0 240 H 280" stroke="#C5A880" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Right Side Building Towers (Bottom aligned of Development Vision section) */}
            <div className="absolute right-[-2rem] sm:right-[-5rem] md:right-[-8rem] lg:right-[-11rem] -bottom-6 pointer-events-none z-0 opacity-40">
              <svg className="w-40 sm:w-52 md:w-64 h-64" viewBox="0 0 300 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M 70 240 L 70 30 L 180 30 L 180 240"
                  stroke="#C5A880" strokeWidth="2"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 3.5, ease: "easeOut", delay: 0.2 }}
                />
                <motion.path
                  d="M 90 60 H 160 M 90 90 H 160 M 90 120 H 160 M 90 150 H 160 M 90 180 H 160 M 90 210 H 160"
                  stroke="#C5A880" strokeWidth="1" strokeDasharray="3 3" opacity="0.7"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 3, delay: 0.7 }}
                />
                <motion.path
                  d="M 200 240 L 200 80 L 290 80 L 290 240"
                  stroke="#C5A880" strokeWidth="1.5" strokeDasharray="4 4"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 3, ease: "easeOut", delay: 0.4 }}
                />
                <motion.path
                  d="M 220 105 H 270 M 220 135 H 270 M 220 165 H 270 M 220 195 H 270"
                  stroke="#C5A880" strokeWidth="1" opacity="0.6"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: false }} transition={{ duration: 2.5, delay: 1 }}
                />
                <motion.path d="M 20 240 H 300" stroke="#C5A880" strokeWidth="1.5" />
              </svg>
            </div>

            <div className="max-w-3xl mx-auto relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-[1.5px] bg-[#C5A880]" />
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                  DEVELOPMENT VISION
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#211611] tracking-tight mb-8">
                About Beacon Hills Estate
              </h3>

              <div className="font-sans text-stone-655 space-y-6 text-sm sm:text-base leading-relaxed font-light text-justify">
                <p>
                  Beacon Hills Estate is a professionally managed real estate development company committed to creating thoughtfully designed spaces defined by quality, transparency, and enduring value. With a strategic focus on Uttarakhand and Delhi NCR, the company brings together contemporary design, disciplined execution, responsible development, and a deep understanding of how people aspire to live.
                </p>
                <p>
                  Beacon Green One, the company’s flagship development in Dehradun, reflects this vision through boutique scale, premium living, nature-led surroundings, and strong long-term value. Conceived as a limited collection of thoughtfully planned 1 and 2 BHK residences, the project combines privacy, modern conveniences, premium specifications, and a peaceful setting near the foothills of Mussoorie. It represents the beginning of Beacon Hills Estate’s wider vision to develop distinctive residential, commercial, villa, group-housing, and mixed-use projects across Uttarakhand and Delhi NCR.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* LEADERSHIP SECTION */}
          <ScrollReveal className="w-full mt-16 pt-16 border-t border-[#C5A880]/30" delay={0.4}>
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col items-end text-right mb-2">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-[1.5px] bg-[#C5A880]" />
                  <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A880] font-semibold">
                    LEADERSHIP & GOVERNANCE
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-[#211611] tracking-tight">
                  Leadership
                </h3>
              </div>

              {/* Leadership Container with 50% Photo Overlap Escaping Box */}
              <div className="relative pt-0 md:pl-28 mt-3 flex flex-col-reverse md:block">
                {/* Text Box Container */}
                <div className="bg-[#FAF9F6] border border-[#C5A880]/30 p-6 sm:p-8 md:p-10 md:pl-36 rounded-2xl shadow-sm relative overflow-hidden">
                  {/* Subtle drafting watermark accent */}
                  <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full border border-[#C5A880]/10 pointer-events-none" />

                  {/* Bio & Details */}
                  <div className="space-y-4 relative z-10">
                    <div className="text-right">
                      <h4 className="font-serif text-2xl sm:text-3xl text-[#211611] font-semibold">
                        Mr. Hemant Kumar Singh
                      </h4>
                      <span className="text-xs font-mono uppercase tracking-widest text-[#C5A880] font-bold block mt-1">
                        Chairman
                      </span>
                    </div>

                    <div className="font-sans text-stone-655 text-sm leading-relaxed font-light space-y-4 text-justify">
                      <p>
                        Mr. Hemant Kumar Singh is a seasoned real estate developer and promoter with more than three decades of experience in the Indian real estate and construction industry. During his career, he has developed and delivered over 12 million sq. ft. across multiple residential, commercial, institutional, and mixed-use developments. His experience spans high-rise apartment buildings, group-housing projects, luxury villas, plotted developments, farmhouses, builder floors, office towers, retail complexes, malls, hotels, hospitals, and government-tendered construction across Delhi NCR, Uttar Pradesh, Uttarakhand, and other key markets in North India.
                      </p>
                      <p>
                        Known for his hands-on leadership and end-to-end development expertise, Mr. Hemant Kumar Singh has led projects from land acquisition and strategic planning through construction, quality oversight, and final delivery. His approach is defined by disciplined execution, thoughtful decision-making, strong professional relationships, and an unwavering commitment to completing every project he undertakes. As Chairman of Beacon Hills Estate, he is personally overseeing the planning and execution of Beacon Green One, ensuring that every aspect of the development reflects the standards, accountability, and experience built over his distinguished career.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chairman Image — 50% Escaping Outside the Text Box on Desktop */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 md:-left-8 z-20 pointer-events-auto hidden md:block">
                  <div className="w-56 lg:w-64 aspect-[4/5] bg-stone-100 border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.22)] rounded-2xl overflow-hidden relative group hover:scale-[1.03] hover:-rotate-1 transition-transform duration-500">
                    {/* Corner masking tape graphic for physical photo look */}
                    <div className="absolute top-3 -left-6 w-20 h-6 bg-[#C5A880]/30 border border-[#C5A880]/50 -rotate-45 pointer-events-none z-10 backdrop-blur-xs shadow-xs" />
                    <div className="absolute bottom-3 -right-6 w-20 h-6 bg-[#C5A880]/30 border border-[#C5A880]/50 -rotate-45 pointer-events-none z-10 backdrop-blur-xs shadow-xs" />

                    <img
                      src="/images/hemant-kumar-singh.jpg"
                      alt="Mr. Hemant Kumar Singh - Chairman"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3 font-mono text-[9px] text-[#C5A880] uppercase tracking-widest text-center">
                    <span>CHAIRMAN • BEACON HILLS ESTATE</span>
                  </div>
                </div>

                {/* Mobile View Chairman Photo (Comes FIRST on mobile before text) */}
                <div className="md:hidden flex flex-col items-center mb-3 mt-2 relative z-20">
                  <div className="w-48 aspect-[4/5] bg-stone-100 border-4 border-white shadow-xl rounded-xl overflow-hidden relative">
                    <img
                      src="/images/hemant-kumar-singh.jpg"
                      alt="Mr. Hemant Kumar Singh - Chairman"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="mt-2 font-mono text-[9px] text-[#C5A880] uppercase tracking-widest">
                    <span>CHAIRMAN • BEACON HILLS ESTATE</span>
                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* 3. LANDMARK MATRIX (Tabbed 3D Flight & 2D Street Navigation Card with scroll-triggered drawing road corridor backdrop) */}
      <section id="connectivity" ref={mapSectionRef} className="py-20 px-6 md:px-12 bg-grain bg-[#F4F3EE] relative border-b border-stone-200/60 overflow-hidden">

        {/* RAJPUR ROAD — narrow centered strip only, high contrast golden labels, slow cinematic animation */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-48 pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 200 600" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">

            {/* Road body — cinematic slow draw, bottom to top (GPU-accelerated CSS) */}
            <path
              d="M 100 650 C 88 520, 115 390, 96 250 C 80 130, 102 30, 108 -50"
              stroke="#C5A880"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.35"
              className={isMapInView ? "animate-draw-road" : ""}
            />

            {/* Center dashes — static path, always visible */}
            <path
              d="M 100 650 C 88 520, 115 390, 96 250 C 80 130, 102 30, 108 -50"
              stroke="#FAF9F6"
              strokeWidth="1.5"
              strokeDasharray="10 14"
              strokeLinecap="round"
              opacity="0.65"
            />

            {/* Labels fade in early during drawing animation (GPU-accelerated CSS) */}
            <g className={isMapInView ? "animate-fade-labels" : "opacity-0"}>
              {/* Bottom location — horizontal, centred on strip */}
              <text x="100" y="588" fill="#C5A880" fontFamily="monospace" fontSize="9" letterSpacing="1.5" fontWeight="bold" textAnchor="middle">DEHRADUN VALLEY</text>
              {/* Middle road label — rotated, sits lower (y=470) to avoid being hidden behind cards */}
              <text x="115" y="470" fill="#C5A880" fontFamily="monospace" fontSize="10" letterSpacing="0.8" fontWeight="bold" transform="rotate(-90, 115, 470)">RAJPUR ROAD</text>
              {/* Top location — horizontal, centred on strip */}
              <text x="100" y="22" fill="#C5A880" fontFamily="monospace" fontSize="9" letterSpacing="1.5" fontWeight="bold" textAnchor="middle">MUSSOORIE FOOTHILLS</text>
            </g>
          </svg>
        </div>

        <div className="w-full max-w-6xl mx-auto relative z-10">

          <ScrollReveal className="mb-14">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A880] block mb-2 font-semibold">CONNECTIVITY INDEX</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#211611] tracking-tight">PREMIUM LOCATION</h2>
            <p className="mt-2 text-stone-555 font-sans text-sm font-light">Proximity to primary healthcare, hospitality, and highway corridors.</p>
          </ScrollReveal>

          {/* Location Grid: Zone A (Header + Landmarks) and Zone B (Header + Map) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-16 items-start">

            {/* Column 1: Zone A Header + Local Proximity Landmarks */}
            <div className="col-span-1 lg:col-span-7 flex flex-col">
              <ScrollReveal>
                <div className="flex items-center justify-between border-b border-[#C5A880]/30 pb-3 mb-6 h-[38px]">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#C5A880] font-semibold">Zone A • Core Regional Landmarks</h3>
                </div>
              </ScrollReveal>

              <ScrollReveal className="flex flex-col">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "Rajpur Road", dist: "Under 5 KM", detail: "Central commercial high-street & retail sector", icon: Compass },
                    { name: "Starbucks Cafe", dist: "Under 5 KM", detail: "Premium dining & lifestyle coffee hub", icon: Coffee },
                    { name: "Marriott Hotel", dist: "Under 5 KM", detail: "Five-star hospitality & banquets", icon: Building },
                    { name: "Max Speciality Hospital", dist: "Under 5 KM", detail: "Primary 24/7 advanced medical care", icon: Activity },
                    { name: "Delhi-Dehradun Corridor", dist: "Under 3 Hrs", detail: "Express highway link to National Capital", icon: Route },
                    { name: "Mussoorie Hills Bypass", dist: "25 Mins Link", detail: "Fast mountain bypass route corridor", icon: Navigation }
                  ].map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={index}
                        className="group flex flex-col justify-between p-4 bg-[#FAF9F6]/90 backdrop-blur-sm border border-stone-200 hover:border-[#C5A880] rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-[#4E3629]/5 border border-[#C5A880]/30 flex items-center justify-center text-[#4E3629] group-hover:bg-[#4E3629] group-hover:text-white transition-all duration-300">
                            <IconComponent size={14} className="group-hover:scale-110 transition-transform" />
                          </div>
                          <div>
                            <h4 className="font-serif text-base text-[#211611] font-semibold leading-none group-hover:text-[#4E3629] transition-colors">{item.name}</h4>
                            <span className="font-mono text-[9px] text-[#C5A880] block mt-1 tracking-wider uppercase font-semibold">{item.dist}</span>
                          </div>
                        </div>
                        <p className="text-[11px] text-stone-505 font-sans leading-relaxed font-light">{item.detail}</p>
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>

            {/* Column 2: Zone B Header + 3D Map vs 2D Viewport */}
            <div className="col-span-1 lg:col-span-5 flex flex-col">
              <ScrollReveal>
                <div className="flex justify-between items-center border-b border-[#C5A880]/30 pb-3 mb-6 h-[38px]">
                  <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-[#C5A880] font-semibold">Zone B • Map Views</h3>
                  <div className="bg-[#FAF9F6] border border-stone-300/80 rounded-lg p-0.5 flex gap-0.5">
                    <button
                      onClick={() => setActiveMapTab("3d")}
                      className={`px-3 py-1 text-[9px] font-semibold uppercase tracking-wider rounded transition-all cursor-pointer ${activeMapTab === "3d"
                        ? "bg-wood-button text-white"
                        : "text-stone-555 hover:text-[#211611]"
                        }`}
                    >
                      3D Flight
                    </button>
                    <button
                      onClick={() => setActiveMapTab("2d")}
                      className={`px-3 py-1 text-[9px] font-semibold uppercase tracking-wider rounded transition-all cursor-pointer ${activeMapTab === "2d"
                        ? "bg-wood-button text-white"
                        : "text-stone-555 hover:text-[#211611]"
                        }`}
                    >
                      2D Road Map
                    </button>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal className="flex flex-col">

                {/* Map Wrapper Panel */}
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#C5A880]/20 bg-[#211611] relative group shadow-2xl mb-4">

                  {activeMapTab === "3d" ? (
                    /* Dynamic MapLibre GL JS Container */
                    <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />
                  ) : (
                    // Practical 2D Google Maps Embed with Pin
                    <iframe
                      className="absolute inset-0 w-full h-full border-none filter grayscale-[10%] contrast-[105%]"
                      src="https://maps.google.com/maps?q=30.385040940751615,78.09921591481071&t=m&z=15&ie=UTF8&iwloc=&output=embed"
                      allowFullScreen
                    />
                  )}

                </div>

                {/* Persistent Google Maps Direct Navigation CTA Button */}
                <a
                  href="https://maps.google.com/?q=30.385040940751615,78.09921591481071"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-wood-button hover:bg-wood-button-hover text-white text-[10px] font-semibold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:scale-[1.01]"
                >
                  <MapPin size={12} className="text-[#C5A880]" />
                  Open Location in Google Maps
                </a>

              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* 4. ACCORDION BLUEPRINT STUDIO */}
      <section id="blueprints" className="bg-grain bg-wood-dark bg-wood-lines text-[#FBFBFA] py-20 px-6 md:px-12 relative overflow-hidden border-b border-stone-900">
        <div className="absolute inset-0 bg-[radial-gradient(#C5A880_1px,transparent_1px)] [background-size:28px_28px] opacity-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">

          <ScrollReveal className="mb-14">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A880] block mb-2 font-semibold">ACCORDION BLUEPRINT STUDIO</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 tracking-tight">FLOOR PLANS</h2>
            <p className="mt-2 text-stone-400 font-sans text-sm font-light">Premium 1 BHK and 2 BHK offerings</p>
          </ScrollReveal>

            {/* Sticky split desktop interface */}
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* Left side: sticky control tabs — hidden on mobile to prioritize immediate blueprint visibility */}
            <div className="hidden lg:block lg:w-1/3 lg:sticky lg:top-28 space-y-3">
              {plans.map((plan) => {
                const isActive = activePlan === plan.id;
                return (
                  <button
                    key={plan.id}
                    onClick={() => setActivePlan(plan.id)}
                    onMouseEnter={() => setActivePlan(plan.id)}
                    className={`w-full text-left p-5 rounded-xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${isActive
                      ? "bg-[#4E3629]/30 border-[#C5A880] text-[#FBFBFA] shadow-lg shadow-black/20"
                      : "bg-wood-dark/60 border-stone-850 text-stone-400 hover:border-stone-700 hover:text-stone-200"
                      }`}
                  >
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider block text-[#C5A880] mb-0.5 font-semibold">{plan.type}</span>
                      <h4 className="font-serif text-base font-medium">{plan.title}</h4>
                    </div>
                    <ArrowRight size={14} className={`transition-all duration-300 ${isActive ? "translate-x-1 text-[#C5A880]" : "opacity-20 group-hover:opacity-60"}`} />
                  </button>
                );
              })}
            </div>

            {/* Right side: dynamic animated card */}
            <div className="w-full lg:w-2/3">
              <div className="bg-[#FAF9F6] rounded-2xl p-5 sm:p-6 md:p-8 border border-[#C5A880]/30 shadow-2xl relative flex flex-col justify-between text-[#211611]">

                {/* Top details badge */}
                <div className="flex flex-wrap justify-between items-center pb-4 border-b border-stone-200 gap-4 mb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] block font-semibold">CAD BLUEPRINT SCHEMATIC</span>
                    <h3 className="font-serif text-xl text-charcoal font-semibold mt-1">
                      {currentPlanDetails.title}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <span className="bg-[#4E3629]/10 text-[#4E3629] border border-[#C5A880]/30 font-mono text-xs px-3 py-0.5 rounded-full font-semibold">
                      {currentPlanDetails.bed}
                    </span>
                    <span className="bg-stone-200/50 text-stone-600 font-mono text-xs px-3 py-0.5 rounded-full">
                      {currentPlanDetails.toilets}
                    </span>
                  </div>
                </div>

                {/* Main floor plan dynamic graphic viewer with CAD crosshairs */}
                <div
                  ref={blueprintViewerRef}
                  onMouseMove={handleMouseMoveBlueprint}
                  onMouseEnter={() => setIsHoveringBlueprint(true)}
                  onMouseLeave={() => setIsHoveringBlueprint(false)}
                  className="relative min-h-[250px] md:min-h-[320px] bg-white rounded-xl flex items-center justify-center border border-stone-200 overflow-hidden py-4 cursor-crosshair"
                >
                  <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-stone-300" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-stone-300" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-stone-300" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-stone-300" />

                  {/* Dynamic interactive CAD coordinate tracker overlay */}
                  <AnimatePresence>
                    {isHoveringBlueprint && (
                      <>
                        {/* Horizontal Line */}
                        <motion.div
                          className="absolute left-0 right-0 h-[0.5px] bg-[#C5A880]/50 pointer-events-none z-10"
                          style={{ top: coords.y }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                        {/* Vertical Line */}
                        <motion.div
                          className="absolute top-0 bottom-0 w-[0.5px] bg-[#C5A880]/50 pointer-events-none z-10"
                          style={{ left: coords.x }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                        {/* Coords label tag */}
                        <motion.div
                          className="absolute bg-[#211611] text-[#FBFBFA] px-2 py-1 rounded text-[8px] font-mono pointer-events-none z-20 shadow-md border border-[#C5A880]/30"
                          style={{ left: coords.x + 12, top: coords.y + 12 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          X: {coords.x} Y: {coords.y}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>

                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentPlanDetails.id}
                      src={currentPlanDetails.image}
                      alt={currentPlanDetails.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1.0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="max-h-[240px] md:max-h-[300px] object-contain px-4 drop-shadow-md relative z-0"
                    />
                  </AnimatePresence>
                </div>

                {/* Legend specs summary list */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6 pt-6 border-t border-stone-200 text-charcoal font-sans text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-[#C5A880] uppercase tracking-widest block mb-1 font-semibold">BSP Estimate</span>
                    <strong className="font-serif text-base text-[#4E3629] font-bold block mt-0.5">{currentPlanDetails.rate}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1 font-semibold">Super Builtup Area</span>
                    <strong className="font-serif text-base font-semibold text-[#211611] block mt-0.5">{currentPlanDetails.size} Sq. Ft.</strong>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-1 font-semibold">Balcony Layout</span>
                    <strong className="font-serif text-base font-semibold text-[#211611] block mt-0.5">{currentPlanDetails.balcony}</strong>
                  </div>
                </div>

                {/* Mobile compact plan switcher buttons */}
                <div className="lg:hidden flex flex-wrap gap-2 mt-6 pt-6 border-t border-stone-200 justify-center">
                  {plans.map((plan) => {
                    const isActive = activePlan === plan.id;
                    return (
                      <button
                        key={plan.id}
                        onClick={() => setActivePlan(plan.id)}
                        className={`px-3 py-2 rounded-lg border text-[10px] font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-wood-button text-white font-bold"
                            : "bg-white border-stone-300 text-stone-600 hover:border-stone-450"
                        }`}
                      >
                        {plan.bed} ({plan.size} SQFT)
                      </button>
                    );
                  })}
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. INTEGRATED SPECIFICATION CHIPS (With rich scroll-triggered architectural blueprint drawing sheet) */}
      <section id="specifications" className="py-20 px-6 md:px-12 bg-grain bg-[#FAF9F6] border-b border-stone-200/80 overflow-hidden relative">

        {/* RICH DRAFTING BLUEPRINT SHEET BACKDROP — contained header band (h-[240px]), static grid lines, hidden on mobile for performance */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[240px] pointer-events-none z-0 opacity-25 hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 1200 240" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">

            {/* Static horizontal blueprint grid lines — zero runtime animation cost */}
            {[40, 80, 120, 160, 200].map((y, idx) => (
              <line
                key={`grid-y-${idx}`}
                x1="0" y1={y} x2="1200" y2={y}
                stroke="#C5A880" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.25"
              />
            ))}

            {/* Static vertical blueprint grid lines — zero runtime animation cost */}
            {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100].map((x, idx) => (
              <line
                key={`grid-x-${idx}`}
                x1={x} y1="0" x2={x} y2="240"
                stroke="#C5A880" strokeWidth="0.5" strokeDasharray="2 6" opacity="0.25"
              />
            ))}

            {/* Winding Compass drafting curves (visible in center-top) */}
            <motion.path
              d="M 600 220 A 120 120 0 0 1 600 20"
              stroke="#C5A880" strokeWidth="0.75" strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
            <motion.path
              d="M 600 220 A 80 80 0 0 1 600 60"
              stroke="#C5A880" strokeWidth="0.75"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />

            {/* Handdrawn Horizontal TMT Steel Bar 1 (Ribbed Double Outline Style at Y=130) */}
            <motion.path
              d="M 100 130 C 400 132, 800 128, 1100 130"
              stroke="#C5A880"
              strokeWidth="2.0"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.8, ease: "easeInOut" }}
            />

            {/* TMT Rib Ticks */}
            {[140, 200, 260, 320, 380, 440, 500, 560, 620, 680, 740, 800, 860, 920, 980].map((x, i) => (
              <motion.path
                key={`rib1-${i}`}
                d={`M ${x} 127 L ${x + 4} 133`}
                stroke="#C5A880"
                strokeWidth="1.0"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
              />
            ))}

            {/* Handdrawn Stirrup wire links vertically */}
            {[180, 300, 420, 540, 660, 780].map((x, idx) => (
              <motion.path
                key={`tie-${idx}`}
                d={`M ${x} 118 L ${x} 142`}
                stroke="#C5A880"
                strokeWidth="0.8"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.0, ease: "easeOut", delay: idx * 0.1 }}
              />
            ))}

            {/* Handdrawn blueprint notes & texts */}
            <motion.g
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, delay: 1.0 }}
            >
              <text x="120" y="115" fill="#4E3629" fontFamily="monospace" fontSize="8" fontWeight="bold">TMT Fe 550D DETAIL</text>
              <text x="320" y="115" fill="#C5A880" fontFamily="monospace" fontSize="7">STIRRUPS LINK: 150MM C/C</text>
              <text x="750" y="180" fill="#C5A880" fontFamily="monospace" fontSize="8" fontWeight="bold">RCC BEAM SECTION B-B</text>
              <text x="750" y="195" fill="#C5A880" fontFamily="monospace" fontSize="7">WIDTH: 230mm | DEPTH: 450mm</text>
            </motion.g>

            {/* Column Cross Section details (Top Right) */}
            <motion.rect
              x="750" y="30" width="120" height="120"
              stroke="#C5A880" strokeWidth="0.8" strokeDasharray="3 3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            {/* Vertical rods in column section */}
            {[765, 855].map((x) =>
              [45, 135].map((y) => (
                <motion.circle
                  key={`rod-${x}-${y}`} cx={x} cy={y} r="4"
                  fill="#4E3629" stroke="#C5A880" strokeWidth="0.75"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                />
              ))
            )}
          </svg>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">

          <ScrollReveal className="text-center mb-14">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A880] block mb-2 font-semibold">APPROVED MAKES</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#211611] tracking-tight">MATERIAL CLASSIFICATIONS</h2>
            <p className="mt-2 text-stone-555 font-sans text-sm font-light max-w-xl mx-auto">Toggle structural and utility filters to view certified, premium brands and systems.</p>

            {/* Selection chips */}
            <div className="flex flex-wrap justify-center gap-2.5 mt-6">
              {specCategories.map((cat) => {
                const isActive = activeSpecTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveSpecTab(cat)}
                    className="relative px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer overflow-hidden border border-stone-200 bg-white"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeSpecTabBg"
                        className="absolute inset-0 bg-wood-button"
                        transition={{ type: "spring", stiffness: 350, damping: 28 }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? "text-[#FBFBFA]" : "text-stone-600 hover:text-charcoal"}`}>
                      {cat}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Cards */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredSpecs.map((spec) => (
                <motion.div
                  layout
                  key={spec.title}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl border-[0.5px] border-stone-300 flex flex-col justify-between min-h-[220px] hover:shadow-md hover:border-[#C5A880]/60 transition-all duration-300 group shadow-sm relative overflow-hidden"
                >
                  {/* Subtle technical background grid only visible on hover */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(197,168,128,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(197,168,128,0.02)_1px,transparent_1px)] bg-[size:12px_12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] shrink-0" />
                      <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block font-semibold">{spec.sub}</span>
                    </div>
                    <h4 className="font-serif text-lg text-charcoal font-semibold mb-2 leading-snug group-hover:text-[#4E3629] transition-colors">
                      {spec.title}
                    </h4>
                    <p className="text-stone-555 text-xs leading-relaxed font-light font-sans text-justify">
                      {spec.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex justify-between items-center text-[9px] font-mono text-[#C5A880] tracking-wider uppercase font-semibold relative z-10">
                    <span>Approved Make Certified</span>
                    <ShieldCheck size={14} className="text-[#4E3629]" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 6. DYNAMIC MILESTONE ESTIMATOR (With scroll-triggered animated calculations backdrop) */}
      <section id="estimator" className="py-20 px-6 md:px-12 bg-grain bg-[#F4F3EE] border-b border-stone-200/60 overflow-hidden relative">

        {/* HARDWARE-ACCELERATED SCHEMATIC GRID ENVELOPE */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-15">
          <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Dimensioning lines */}
            <motion.path
              d="M 120 70 L 880 70"
              stroke="#C5A880"
              strokeWidth="1.0"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
            <motion.path
              d="M 120 60 L 120 80"
              stroke="#C5A880"
              strokeWidth="1.25"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
            <motion.path
              d="M 880 60 L 880 80"
              stroke="#C5A880"
              strokeWidth="1.25"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />

            {/* Formula notations & text */}
            <text x="500" y="60" fill="#C5A880" fontFamily="monospace" fontSize="8" letterSpacing="3" fontWeight="bold" textAnchor="middle">TOTAL BSP = AREA × ₹6,500/SQFT</text>
            <text x="135" y="100" fill="#C5A880" fontFamily="monospace" fontSize="7" opacity="0.8">MILESTONES: 20% + 30% + 50% HANDOVER</text>
          </svg>
        </div>

        <div className="w-full max-w-6xl mx-auto relative z-10">

          <ScrollReveal className="mb-14 text-center md:text-left">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A880] block mb-2 font-semibold">INVESTMENT LEDGER</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#211611] tracking-tight">DUE MILESTONE ESTIMATOR</h2>
            <p className="mt-2 text-stone-555 font-sans text-sm font-light">Real-time installment ledger calculation. Click segments below to view active highlights.</p>
          </ScrollReveal>

          {/* Estimator Main Grid — Robust 2 column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

            {/* Left Parameters Card — subtle background sketch watermark layout */}
            <ScrollReveal className="bg-[#FAF9F6]/95 backdrop-blur-sm border border-[#C5A880]/30 rounded-2xl p-6 sm:p-8 w-full flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="relative z-10 flex-1 flex flex-col justify-between">
                
                {/* Inputs Content */}
                <div className="w-full md:max-w-[65%] z-10 relative">
                  <div className="flex items-center gap-3 mb-6">
                    <Calculator className="text-[#4E3629]" size={20} />
                    <h3 className="font-serif text-lg text-charcoal font-semibold">Estimate Parameters</h3>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="plan-select" className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] block mb-2 font-semibold">Select Apartment Size</label>
                    <select
                      id="plan-select"
                      value={selectedPlanId}
                      onChange={(e) => setSelectedPlanId(e.target.value)}
                      className="w-full bg-white border border-[#C5A880]/30 rounded-xl px-4 py-2.5 text-sm text-charcoal focus:outline-none focus:border-[#C5A880] font-serif font-medium cursor-pointer"
                    >
                      {plans.map((p) => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#C5A880] block mb-2 font-semibold">Payment Milestone Schedule</label>
                    <div className="bg-[#4E3629]/5 border border-[#C5A880]/30 rounded-xl p-3 flex justify-between items-center text-xs font-mono">
                      <span className="text-[#211611] font-semibold">Standard Possession Plan</span>
                      <span className="text-[#4E3629] font-bold">20% • 30% • 50%</span>
                    </div>
                  </div>

                  {/* DYNAMIC PROGRESS BAR (Click triggers highlight ledger rows) */}
                  <div className="mt-6 pt-4 border-t border-stone-100">
                    <label className="text-[9px] font-mono uppercase tracking-widest text-[#C5A880] block mb-2 font-semibold">Installment Division Graphic</label>
                    <div className="w-full h-4 bg-stone-100 rounded-full overflow-hidden flex gap-[2px] p-[2px]">
                      {activeSchedule.map((milestone, idx) => {
                        const isSelected = activeLedgerIndex === idx;
                        return (
                          <motion.div
                            key={idx}
                            layout
                            initial={{ width: 0 }}
                            animate={{ width: `${milestone.pct}%` }}
                            onClick={() => setActiveLedgerIndex(idx)}
                            className={`h-full rounded-full cursor-pointer transition-colors relative group ${isSelected ? "bg-[#C5A880]" : "bg-[#4E3629]"
                              }`}
                            title={`${milestone.step}: ${milestone.pct}%`}
                          >
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                          </motion.div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between text-[9px] font-mono text-stone-400 mt-2">
                      <span>Booking ({activeSchedule[0].pct}%)</span>
                      <span>Handover ({activeSchedule[activeSchedule.length - 1].pct}%)</span>
                    </div>
                  </div>
                </div>

                {/* Subtle blueprint calculator watermark background badge */}
                <div className="absolute top-6 right-2 md:right-4 opacity-[0.18] pointer-events-none scale-[0.8] sm:scale-[0.95] md:scale-100 origin-top-right z-0">
                  <svg className="w-[145px] aspect-[155/240]" viewBox="0 0 155 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Outer frame */}
                    <motion.rect
                      x="2" y="2" width="151" height="236" rx="6"
                      stroke="#C5A880" strokeWidth="1.2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    {/* LCD Screen */}
                    <motion.rect
                      x="12" y="12" width="131" height="34" rx="3"
                      stroke="#C5A880" strokeWidth="0.8" strokeDasharray="2 2"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.0 }}
                    />
                    <text x="18" y="22" fill="#C5A880" fontFamily="monospace" fontSize="5" fontWeight="bold">RATE/SQFT</text>
                    <text x="136" y="36" fill="#4E3629" fontFamily="monospace" fontSize="13" fontWeight="bold" textAnchor="end">6,500.00</text>

                    {/* Keypad loop rendering buttons */}
                    {[0, 1, 2, 3].map((row) =>
                      [0, 1, 2, 3].map((col) => {
                        const x = 12 + col * 33;
                        const y = 60 + row * 28;
                        const keyLabels = [
                          ["7", "8", "9", "÷"],
                          ["4", "5", "6", "×"],
                          ["1", "2", "3", "-"],
                          ["C", "0", "=", "+"]
                        ];
                        const label = keyLabels[row][col];
                        return (
                          <g key={`calc-btn-inner-${row}-${col}`}>
                            <motion.rect
                              x={x} y={y} width="25" height="22" rx="2"
                              stroke="#C5A880" strokeWidth="0.75"
                              initial={{ pathLength: 0 }}
                              whileInView={{ pathLength: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: (row + col) * 0.05 }}
                            />
                            <text x={x + 12.5} y={y + 14} fill="#C5A880" fontFamily="monospace" fontSize="8" textAnchor="middle" opacity="0.8">{label}</text>
                          </g>
                        );
                      })
                    )}

                    {/* Annotations */}
                    <text x="12" y="185" fill="#4E3629" fontFamily="monospace" fontSize="6.5" fontWeight="bold">CALC UNIT TYPE-9A</text>
                    <text x="12" y="193" fill="#C5A880" fontFamily="monospace" fontSize="5">LEDFORD DRAFT SCHEMATIC</text>
                  </svg>
                </div>

              </div>

              <div className="mt-6 p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-start gap-3 text-xs text-stone-600 leading-relaxed font-light">
                <Info className="text-[#4E3629]" size={16} />
                <div>
                  <strong className="block font-medium mb-0.5 text-charcoal">BSP Formula Rate: ₹6,500 / Sq. Ft.</strong>
                  Calculated values denote Base Selling Price. Additional charges like mandatory GST, stamp duty registration, and power backup utility links are billed extra at handover.
                </div>
              </div>
            </ScrollReveal>

            {/* LEDGER DETAILS CARD — w-full within 2-column grid */}
            <ScrollReveal className="bg-wood-dark bg-wood-lines text-[#FBFBFA] border border-[#C5A880]/20 rounded-2xl p-6 sm:p-8 w-full flex flex-col justify-between shadow-xl" delay={0.2}>
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-stone-855">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-widest text-[#C5A880] block font-semibold">ESTIMATED TOTAL BSP OUTLAY</span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-stone-100 font-bold mt-1">
                      ₹{rawCost.toLocaleString("en-IN")}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-stone-555 block mt-1 font-semibold">SPECIFICATIONS</span>
                    <span className="text-[#C5A880] text-xs font-mono block mt-1">{estimatorPlan.size} sqft × 6.5K</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3.5">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-stone-500 block mb-2 font-semibold">INSTALLMENT LEDGER VALUE</span>

                  {activeSchedule.map((milestone, idx) => {
                    const dueAmt = (milestone.pct / 100) * rawCost;
                    const isSelected = activeLedgerIndex === idx;
                    return (
                      <motion.div
                        key={idx}
                        onClick={() => setActiveLedgerIndex(idx)}
                        animate={{
                          backgroundColor: isSelected ? "rgba(197, 168, 128, 0.12)" : "rgba(0,0,0,0)",
                          borderColor: isSelected ? "#C5A880" : "rgba(255,255,255,0.06)"
                        }}
                        className="flex justify-between items-start text-xs border border-transparent border-b pb-3 p-2 rounded-lg cursor-pointer transition-all duration-300"
                      >
                        <div className="pr-4">
                          <div className="font-serif text-stone-200 font-medium flex items-center gap-2">
                            <span className={`text-[9px] font-mono w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 transition-colors ${isSelected ? "bg-[#C5A880] text-[#211611]" : "bg-[#C5A880]/10 text-[#C5A880]"
                              }`}>
                              {idx + 1}
                            </span>
                            {milestone.step}
                          </div>
                          <span className="text-[10px] text-stone-400 font-sans block mt-0.5 pl-6.5 font-light">{milestone.label}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <strong className="font-mono text-stone-200 text-sm font-semibold">₹{dueAmt.toLocaleString("en-IN")}</strong>
                          <span className="text-[9px] text-[#C5A880] font-mono block mt-0.5 font-semibold">{milestone.pct}%</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-855 flex justify-between items-center text-xs">
                <span className="text-stone-400 font-light">Total Base Structural Price</span>
                <span className="font-mono font-bold text-[#C5A880] bg-[#C5A880]/10 px-3 py-1 rounded">100% BSP</span>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* 7. CAPTURE LEDGER FOOTER */}
      <footer id="capture" className="bg-grain bg-wood-dark bg-wood-lines text-[#FBFBFA] pt-24 pb-12 px-6 md:px-12 relative border-t border-stone-900">
        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pb-16 border-b border-stone-800/80">

            <div className="flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#C5A880] block mb-2 font-semibold">LOCATION REGISTRY</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-stone-100 tracking-tight leading-tight mb-8">
                  Register site query to arrange physical verification tour.
                </h2>

                <div className="space-y-6 text-sm font-light text-stone-400 font-sans">
                  <div className="flex items-start gap-4">
                    <MapPin className="text-[#C5A880] shrink-0 mt-1" size={18} />
                    <div>
                      <strong className="text-stone-200 font-medium block mb-1">Site Plot Address</strong>
                      Plot No 10, Orchid Park Extension, Mauza Challang,<br />
                      Pargana Parwa Doon, Dehradun, Uttarakhand
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Building className="text-[#C5A880] shrink-0 mt-1" size={18} />
                    <div>
                      <strong className="text-stone-200 font-medium block mb-1">Corporate Head Office</strong>
                      A-46 Sector-136, Noida, Uttar Pradesh - 201305
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="text-[#C5A880] shrink-0 mt-1" size={18} />
                    <div>
                      <strong className="text-stone-200 font-medium block mb-1">Electronic Mail Registry</strong>
                      <a href="mailto:info.beacongreen@gmail.com" className="text-[#C5A880] hover:underline font-mono">
                        info.beacongreen@gmail.com
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              <div className="mt-12 text-[10px] text-stone-550 leading-relaxed font-light border-t border-stone-800/60 pt-6">
                All floor plans, specifications, and layout drawings are conceptual. Renders are computer-generated impressions subject to revision under local state RERA guidelines.
              </div>
            </div>

            <div className="bg-[#FAF9F6] border border-[#C5A880]/30 rounded-2xl p-8 relative overflow-hidden shadow-xl text-[#211611]">
              <h3 className="font-serif text-xl text-[#211611] font-semibold mb-2">Book Site Visit</h3>
              <p className="text-xs text-stone-550 font-sans font-light mb-6">Schedule an exclusive physical verification. Enter parameters below.</p>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">

                <div>
                  <label htmlFor="form-name" className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block mb-1.5 font-semibold">Your Name</label>
                  <input
                    id="form-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter name"
                    className="w-full bg-white border border-stone-250 rounded-xl px-4 py-3 text-[#211611] placeholder-stone-400 focus:outline-none focus:border-[#C5A880] transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="form-email" className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block mb-1.5 font-semibold">Email Address</label>
                    <input
                      id="form-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="email@domain.com"
                      className="w-full bg-white border border-stone-250 rounded-xl px-4 py-3 text-[#211611] placeholder-stone-400 focus:outline-none focus:border-[#C5A880] transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="form-phone" className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block mb-1.5 font-semibold">Phone Number</label>
                    <input
                      id="form-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full bg-white border border-stone-250 rounded-xl px-4 py-3 text-[#211611] placeholder-stone-400 focus:outline-none focus:border-[#C5A880] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="form-date" className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block mb-1.5 font-semibold">Proposed Visit Date</label>
                  <input
                    id="form-date"
                    type="date"
                    name="tourDate"
                    value={formData.tourDate}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-stone-250 rounded-xl px-4 py-3 text-[#211611] placeholder-stone-400 focus:outline-none focus:border-[#C5A880] transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="form-message" className="text-[9px] font-mono text-stone-500 uppercase tracking-widest block mb-1.5 font-semibold">Additional Queries / Custom Requirements</label>
                  <textarea
                    id="form-message"
                    name="message"
                    rows="3"
                    value={formData.message}
                    placeholder="E.g., custom configuration requests..."
                    onChange={handleInputChange}
                    className="w-full bg-white border border-stone-250 rounded-xl px-4 py-3 text-[#211611] placeholder-stone-400 focus:outline-none focus:border-[#C5A880] transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-wood-button hover:bg-wood-button-hover text-[#FBFBFA] font-sans font-semibold tracking-wider uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-black/20"
                >
                  Submit Registration
                  <ArrowUpRight size={14} />
                </button>

                {formSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 bg-[#4E3629] flex flex-col items-center justify-center text-center p-6 text-[#FBFBFA] z-20"
                  >
                    <ShieldCheck size={48} className="mb-4 text-[#FBFBFA]" />
                    <h4 className="font-serif text-2xl font-bold mb-2">Registration Logged</h4>
                    <p className="text-xs text-stone-205 font-sans max-w-xs leading-relaxed">
                      Verification files sent to <strong className="text-white">{formData.email}</strong>. Our relationship officer will reach out shortly to align schedules.
                    </p>
                  </motion.div>
                )}

              </form>
            </div>

          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-[11px] font-mono text-stone-500 gap-4">
            <div>
              &copy; {new Date().getFullYear()} BEACON GREEN ONE. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-pine-light transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-pine-light transition-colors">Specification Ledger</a>
              <a href="#" className="hover:text-[#C5A880] transition-colors">RERA Certification</a>
            </div>
          </div>

        </div>
      </footer>

      {/* 8. MOBILE PERSISTENT FLOATING CONTACT BAR (<1024px) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F6] border-t border-stone-200/80 flex py-3 px-4 justify-around items-center shadow-lg">
        <a
          href="tel:+919999999999"
          className="flex-1 flex flex-col items-center text-[#211611] hover:text-[#4E3629] transition-colors border-r border-stone-200"
        >
          <Phone size={18} />
          <span className="text-[9px] font-semibold mt-1 tracking-wider uppercase">Direct Call</span>
        </a>
        <a
          href="mailto:info.beacongreen@gmail.com"
          className="flex-1 flex flex-col items-center text-[#211611] hover:text-[#4E3629] transition-colors border-r border-stone-200"
        >
          <Mail size={18} />
          <span className="text-[9px] font-semibold mt-1 tracking-wider uppercase">Email Inquiry</span>
        </a>
        <a
          href="#capture"
          className="flex-1 flex flex-col items-center text-[#4E3629] hover:text-[#2A1E17] transition-colors"
        >
          <FileText size={18} />
          <span className="text-[9px] font-semibold mt-1 tracking-wider uppercase">Book Visit</span>
        </a>
      </div>

    </div>
  );
}
