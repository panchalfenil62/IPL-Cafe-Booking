/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,
  useNavigate
} from 'react-router-dom';
import { 
  Tv, 
  Volume2, 
  Utensils, 
  Zap, 
  MessageCircle, 
  Calendar, 
  Users, 
  MapPin, 
  Instagram, 
  Phone, 
  Clock, 
  Star,
  ChevronRight,
  Menu,
  X,
  Trophy,
  Download,
  Settings,
  ArrowLeft,
  ExternalLink,
  Lock,
  Save,
  LogOut,
  Image as ImageIcon
} from 'lucide-react';
import { FOOD_COMBOS, FEATURES, TESTIMONIALS } from './constants';
import { Match } from './types';

const TEAM_LOGOS: Record<string, string> = {
  'CSK': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/CSK/logos/LogoOutline/CSK.png',
  'CHENNAI SUPER KINGS': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/CSK/logos/LogoOutline/CSK.png',
  'MI': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/MI/logos/LogoOutline/MI.png',
  'MUMBAI INDIANS': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/MI/logos/LogoOutline/MI.png',
  'RCB': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/logos/LogoOutline/RCB.png',
  'ROYAL CHALLENGERS BANGALORE': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/logos/LogoOutline/RCB.png',
  'ROYAL CHALLENGERS BENGALURU': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RCB/logos/LogoOutline/RCB.png',
  'KKR': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/KKR/logos/LogoOutline/KKR.png',
  'KOLKATA KNIGHT RIDERS': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/KKR/logos/LogoOutline/KKR.png',
  'RR': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RR/logos/LogoOutline/RR.png',
  'RAJASTHAN ROYALS': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/RR/logos/LogoOutline/RR.png',
  'DC': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/DC/logos/LogoOutline/DC.png',
  'DELHI CAPITALS': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/DC/logos/LogoOutline/DC.png',
  'GT': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/logos/LogoOutline/GT.png',
  'GUJARAT TITANS': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/GT/logos/LogoOutline/GT.png',
  'LSG': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/LSG/logos/LogoOutline/LSG.png',
  'LUCKNOW SUPER GIANTS': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/LSG/logos/LogoOutline/LSG.png',
  'PBKS': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/PBKS/logos/LogoOutline/PBKS.png',
  'PUNJAB KINGS': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/PBKS/logos/LogoOutline/PBKS.png',
  'SRH': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/SRH/logos/LogoOutline/SRH.png',
  'SUNRISERS HYDERABAD': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/SRH/logos/LogoOutline/SRH.png',
  'IPL': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPL/logos/LogoOutline/IPL.png',
  'TATA IPL': 'https://bcciplayerimages.s3.ap-south-1.amazonaws.com/ipl/IPL/logos/LogoOutline/IPL.png',
};

// --- Components ---

const Navbar = ({ logoUrl }: { logoUrl?: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Matches', href: '#matches' },
    { name: 'Menu', href: '#menu' },
    { name: 'Book Table', href: '#booking' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="w-10 h-10 object-contain rounded-full shadow-[0_0_15px_rgba(212,175,55,0.5)]" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)]">
              <Trophy className="text-stadium-black w-6 h-6" />
            </div>
          )}
          <span className="font-display font-bold text-xl tracking-tighter text-glow-gold">
            IPL<span className="text-neon-blue">CAFE</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-white/80 hover:text-gold transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#booking" 
            className="px-6 py-2 bg-gold text-stadium-black font-bold rounded-full hover:bg-gold-light transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            Reserve Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-t border-white/10 p-4 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-white/90"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#booking" 
                className="w-full py-3 bg-gold text-stadium-black font-bold rounded-xl text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Reserve Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const CountdownTimer = ({ targetDateString }: { targetDateString?: string }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(targetDateString || '2026-04-05T19:30:00').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4 sm:gap-8 justify-center mt-8">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds }
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 glass-gold rounded-2xl flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <span className="text-2xl sm:text-3xl font-display font-bold text-gold">{item.value.toString().padStart(2, '0')}</span>
          </div>
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 font-bold">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const Hero = ({ hero, match }: { hero?: any, match?: Match }) => {
  if (!hero) return null;
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={hero.backgroundImage} 
          alt="Cricket Stadium" 
          className="w-full h-full object-cover opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stadium-black via-transparent to-stadium-black" />
        <div className="absolute inset-0 bg-stadium-gradient" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/30 text-neon-blue text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
            Live IPL Screening 2026
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-6">
            {hero.title} <br />
            <span className="text-gold text-glow-gold">{hero.highlight}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 font-light">
            {hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a 
              href={`https://wa.me/${hero?.whatsappNumber || ''}`} 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-[#25D366] text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-[0_0_20px_rgba(37,211,102,0.3)]"
            >
              <MessageCircle className="w-5 h-5" />
              Book on WhatsApp
            </a>
            <a 
              href="#booking" 
              className="w-full sm:w-auto px-8 py-4 glass-gold text-gold font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-gold/10 transition-all"
            >
              Reserve Table
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>

          <div className="pt-8 border-t border-white/10">
            <p className="text-xs uppercase tracking-[0.3em] text-white/40 font-bold mb-4">Next Big Match Starts In</p>
            <CountdownTimer targetDateString={match ? `${match.date}T${match.time.replace(' PM', ':00').replace(' AM', ':00')}` : undefined} />
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

const MatchHighlight = ({ match }: { match?: Match }) => {
  if (!match) return null;

  return (
    <section id="matches" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Tonight's <span className="text-gold">Showdown</span></h2>
          <p className="text-white/50">Don't miss the biggest rivalry of the season</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gold/5 blur-[100px] -z-10 group-hover:bg-gold/10 transition-colors" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Team 1 */}
            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/5 p-4 flex items-center justify-center border border-white/10 shadow-2xl overflow-hidden">
                {match.team1.logo || TEAM_LOGOS[match.team1.name.toUpperCase().trim()] ? (
                  <img 
                    src={match.team1.logo || TEAM_LOGOS[match.team1.name.toUpperCase().trim()]} 
                    alt={match.team1.name} 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer" 
                  />
                ) : (
                  <div className="text-gold font-display font-bold text-4xl">{match.team1.name.substring(0, 2).toUpperCase()}</div>
                )}
              </div>
              <h3 className="text-2xl font-display font-bold">{match.team1.name}</h3>
            </div>

            {/* VS */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-6xl md:text-8xl font-display font-black text-white/5 italic">VS</div>
              <div className="px-4 py-1 rounded-full bg-gold/20 border border-gold/40 text-gold text-xs font-bold uppercase tracking-widest">
                {match.time}
              </div>
              <div className="text-white/40 text-sm font-medium mt-2">{match.date}</div>
            </div>

            {/* Team 2 */}
            <div className="flex flex-col items-center gap-4 flex-1">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/5 p-4 flex items-center justify-center border border-white/10 shadow-2xl overflow-hidden">
                {match.team2.logo || TEAM_LOGOS[match.team2.name.toUpperCase().trim()] ? (
                  <img 
                    src={match.team2.logo || TEAM_LOGOS[match.team2.name.toUpperCase().trim()]} 
                    alt={match.team2.name} 
                    className="w-full h-full object-contain" 
                    referrerPolicy="no-referrer" 
                  />
                ) : (
                  <div className="text-gold font-display font-bold text-4xl">{match.team2.name.substring(0, 2).toUpperCase()}</div>
                )}
              </div>
              <h3 className="text-2xl font-display font-bold">{match.team2.name}</h3>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-xl">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Limited Seats</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-xl">
              <Tv className="w-4 h-4 text-neon-blue" />
              <span className="text-xs font-bold text-white/80 uppercase tracking-wider">120" LED Screen</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-xl">
              <Volume2 className="w-4 h-4 text-gold" />
              <span className="text-xs font-bold text-white/80 uppercase tracking-wider">Live DJ</span>
            </div>
          </div>

          {/* Offer Banner */}
          <div className="mt-8 bg-gold text-stadium-black p-4 rounded-2xl text-center font-bold text-sm md:text-base">
            {match.offer}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = ({ features }: { features?: any[] }) => {
  const icons: Record<string, any> = { Tv, Volume2, Utensils, Zap, Star, Trophy, Clock, MapPin };

  if (!features) return null;

  return (
    <section className="py-24 bg-white/2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = icons[feature.icon] || Zap;
            return (
              <motion.div 
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 glass rounded-3xl hover:border-gold/30 transition-all group"
              >
                <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-gold transition-colors">
                  <Icon className="w-7 h-7 text-gold group-hover:text-stadium-black transition-colors" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{feature.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const FoodCombos = ({ combos }: { combos?: any[] }) => {
  if (!combos) return null;

  return (
    <section id="menu" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Match Day <span className="text-gold">Combos</span></h2>
            <p className="text-white/50">Fuel your excitement with our specially curated IPL platters and deals.</p>
          </div>
          <a href="#" className="text-gold font-bold flex items-center gap-2 hover:underline">
            View Full Menu <ChevronRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {combos.map((combo) => (
            <motion.div 
              key={combo.id}
              whileHover={{ y: -10 }}
              className="glass rounded-[2rem] overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={combo.image} 
                  alt={combo.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {combo.tag && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-neon-blue text-stadium-black text-[10px] font-black uppercase tracking-widest rounded-full">
                    {combo.tag}
                  </div>
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold leading-tight">{combo.name}</h3>
                  <span className="text-gold font-display font-bold">{combo.price}</span>
                </div>
                <p className="text-white/40 text-xs mb-6 line-clamp-2">{combo.description}</p>
                <button className="w-full py-3 glass-gold text-gold text-xs font-bold rounded-xl hover:bg-gold hover:text-stadium-black transition-all">
                  Order Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BookingSection = ({ onBookingSuccess, location }: { onBookingSuccess: () => void, location?: any }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '2',
    team: 'Neutral',
    date: new Date().toISOString().split('T')[0],
    time: '07:30 PM'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert(`Reservation request sent for ${formData.name}! We will contact you shortly.`);
        setFormData({
          name: '',
          phone: '',
          guests: '2',
          team: 'Neutral',
          date: new Date().toISOString().split('T')[0],
          time: '07:30 PM'
        });
        onBookingSuccess();
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to send reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-neon-blue/5 blur-[120px] -z-10" />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
              RESERVE YOUR <br />
              <span className="text-gold">STADIUM SEAT</span>
            </h2>
            <p className="text-white/60 mb-10 text-lg">
              Experience the stadium vibe in the heart of Ahmedabad. 
              Fill the form or connect on WhatsApp for instant confirmation.
            </p>

            <div className="space-y-6">
              {[
                { icon: MapPin, text: location?.address || 'Sindhu Bhavan Road, Ahmedabad' },
                { icon: Phone, text: location?.phone || '+91 99999 88888' },
                { icon: Clock, text: 'Open till 1:00 AM during IPL' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 glass rounded-xl flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="font-medium text-white/80">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-[3rem] p-8 md:p-12 border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Full Name</label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-gold transition-colors"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-gold transition-colors"
                    placeholder="+91 00000 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Guests</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-gold transition-colors appearance-none"
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  >
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n} className="bg-stadium-black">{n} Persons</option>)}
                    <option value="8+" className="bg-stadium-black">8+ (Group)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Supporting Team</label>
                  <select 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-gold transition-colors appearance-none"
                    value={formData.team}
                    onChange={(e) => setFormData({...formData, team: e.target.value})}
                  >
                    {['Neutral', 'CSK', 'MI', 'RCB', 'GT', 'KKR', 'RR', 'LSG', 'DC', 'PBKS', 'SRH'].map(t => <option key={t} value={t} className="bg-stadium-black">{t}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-2">Match Date</label>
                  <input 
                    type="date" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-gold transition-colors"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-gold text-stadium-black font-black uppercase tracking-widest rounded-2xl hover:bg-gold-light transition-all shadow-[0_10px_30px_rgba(212,175,55,0.2)] disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Confirm Reservation'}
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-sm text-white/40 mb-4">Or book instantly via</p>
              <a 
                href="https://wa.me/919999999999" 
                className="inline-flex items-center gap-2 text-[#25D366] font-bold hover:underline"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Booking
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Scarcity = () => {
  return (
    <section className="py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto bg-red-600/10 border border-red-600/30 p-8 rounded-[2rem] text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-red-600/5 animate-pulse" />
        <h3 className="text-2xl md:text-3xl font-display font-bold text-red-500 mb-2">HURRY UP!</h3>
        <p className="text-white/80 font-medium">Only <span className="text-red-500 font-black">7 tables left</span> for tonight’s match!</p>
      </motion.div>
    </section>
  );
};

const SocialProof = ({ testimonials }: { testimonials?: any[] }) => {
  if (!testimonials) return null;

  return (
    <section className="py-24 bg-white/2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">Fan <span className="text-gold">Vibes</span></h2>
          <p className="text-white/50">"Best place in Ahmedabad for IPL screening"</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((t) => (
            <div key={t.id} className="glass p-8 rounded-3xl relative">
              <div className="flex gap-1 text-gold mb-4">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-gold" />)}
              </div>
              <p className="text-white/80 italic mb-6">"{t.comment}"</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full border-2 border-gold/30" referrerPolicy="no-referrer" />
                <span className="font-bold">{t.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Preview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="aspect-square rounded-2xl overflow-hidden glass group">
              <img 
                src={`https://picsum.photos/seed/gallery${i}/400/400`} 
                alt="Gallery" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Location = ({ location }: { location?: any }) => {
  if (!location) return null;

  return (
    <section id="location" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="glass rounded-[3rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="h-[400px] lg:h-auto bg-white/5 relative">
            {/* Map Placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <MapPin className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-bold mb-2">Find Us on Maps</h3>
              <p className="text-white/40 text-sm mb-6">{location.landmark}, Ahmedabad</p>
              <div className="w-full h-full absolute inset-0 opacity-20 grayscale invert">
                <img src={location.mapUrl} className="w-full h-full object-cover" alt="Map" referrerPolicy="no-referrer" />
              </div>
              <button className="relative z-10 px-6 py-2 bg-white/10 border border-white/20 rounded-full text-sm font-bold hover:bg-white/20 transition-all">
                Open in Google Maps
              </button>
            </div>
          </div>
          <div className="p-12 lg:p-20">
            <h2 className="text-3xl font-display font-bold mb-8">Visit <span className="text-gold">IPL Cafe</span></h2>
            <div className="space-y-8">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gold font-bold mb-2">Address</h4>
                <p className="text-white/70">{location.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gold font-bold mb-2">Parking</h4>
                  <p className="text-white/70">{location.parking}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gold font-bold mb-2">Landmark</h4>
                  <p className="text-white/70">{location.landmark}</p>
                </div>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gold font-bold mb-2">Contact</h4>
                <p className="text-white/70">{location.phone} <br /> {location.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
              <Trophy className="text-stadium-black w-4 h-4" />
            </div>
            <span className="font-display font-bold text-lg tracking-tighter">
              IPL<span className="text-neon-blue">CAFE</span>
            </span>
          </div>
          
          <div className="flex gap-8 text-sm text-white/40">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gold transition-colors">Refund Policy</a>
          </div>

          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-gold transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-gold transition-all">
              <MessageCircle className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:text-gold transition-all">
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="mt-12 text-center text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold">
          © 2026 IPL Cafe Ahmedabad. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

const AdminDashboard = ({ data, onUpdate }: { data: any, onUpdate: () => void }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [editData, setEditData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data) setEditData(JSON.parse(JSON.stringify(data)));
  }, [data]);

  if (!editData) return <div className="p-20 text-center text-gold">Loading Admin...</div>;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/admin/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editData,
          token
        }),
      });
      if (response.ok) {
        alert('Website updated successfully!');
        onUpdate();
      } else {
        alert('Unauthorized or session expired. Please login again.');
        localStorage.removeItem('admin_token');
        window.location.reload();
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update website.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateNested = (path: string, value: any) => {
    const keys = path.split('.');
    const newData = JSON.parse(JSON.stringify(editData)); // Deep copy to avoid mutation issues
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;

    // Auto-update logo if team name changes
    if (path === 'match.team1.name') {
      const upperName = (value as string).toUpperCase().trim();
      const logo = TEAM_LOGOS[upperName];
      if (logo) {
        if (!newData.match) newData.match = {};
        if (!newData.match.team1) newData.match.team1 = {};
        newData.match.team1.logo = logo;
      }
    }
    if (path === 'match.team2.name') {
      const upperName = (value as string).toUpperCase().trim();
      const logo = TEAM_LOGOS[upperName];
      if (logo) {
        if (!newData.match) newData.match = {};
        if (!newData.match.team2) newData.match.team2 = {};
        newData.match.team2.logo = logo;
      }
    }

    setEditData(newData);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/';
  };

  const exportBookings = () => {
    const headers = ['Name', 'Phone', 'Guests', 'Team', 'Date', 'Time'];
    const csvContent = [
      headers.join(','),
      ...editData.bookings.map((b: any) => [b.name, b.phone, b.guests, b.team, b.date, b.time].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'match', label: 'Match', icon: Trophy },
    { id: 'features', label: 'Features', icon: Zap },
    { id: 'combos', label: 'Combos', icon: Utensils },
    { id: 'testimonials', label: 'Reviews', icon: Star },
    { id: 'location', label: 'Location', icon: MapPin },
    { id: 'bookings', label: 'Bookings', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-stadium-black pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Tabs */}
          <div className="w-full md:w-64 flex flex-col gap-2">
            <div className="mb-6 px-4">
              <h1 className="text-2xl font-display font-bold text-gold">Admin Panel</h1>
              <p className="text-white/40 text-xs">Manage your IPL Cafe</p>
            </div>

            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-gold text-stadium-black shadow-[0_0_20px_rgba(212,175,55,0.3)]' 
                    : 'text-white/50 hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
            
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="mt-8 px-6 py-4 bg-neon-blue text-stadium-black font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-105 transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'SAVING...' : 'PUBLISH CHANGES'}
            </button>

            <button 
              onClick={handleLogout}
              className="mt-2 px-6 py-4 bg-red-500/10 text-red-500 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-red-500 hover:text-white transition-all"
            >
              <LogOut className="w-5 h-5" />
              LOGOUT
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 glass p-8 rounded-[2.5rem] overflow-hidden">
            {activeTab === 'general' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-display font-bold text-gold">General Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Cafe Logo URL</label>
                    <input 
                      type="text" 
                      value={editData?.logoUrl || ''} 
                      onChange={(e) => updateNested('logoUrl', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-gold outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">WhatsApp Number (with country code)</label>
                    <input 
                      type="text" 
                      value={editData?.hero?.whatsappNumber || ''} 
                      onChange={(e) => updateNested('hero.whatsappNumber', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-gold outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-bold border-b border-white/10 pb-2">Hero Section</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Main Title</label>
                      <input 
                        type="text" 
                        value={editData?.hero?.title || ''} 
                        onChange={(e) => updateNested('hero.title', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-gold outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Highlight Text</label>
                      <input 
                        type="text" 
                        value={editData?.hero?.highlight || ''} 
                        onChange={(e) => updateNested('hero.highlight', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-gold outline-none"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Subtitle</label>
                    <textarea 
                      value={editData?.hero?.subtitle || ''} 
                      onChange={(e) => updateNested('hero.subtitle', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-gold outline-none h-24"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Background Image URL</label>
                    <input 
                      type="text" 
                      value={editData?.hero?.backgroundImage || ''} 
                      onChange={(e) => updateNested('hero.backgroundImage', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-gold outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'match' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-display font-bold text-gold">Match Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  {/* Team 1 */}
                  <div className="space-y-4 p-6 bg-white/5 rounded-3xl border border-white/10">
                    <h3 className="font-bold text-neon-blue">Team 1 (Home)</h3>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Team Name (e.g. CSK, MI)</label>
                      <input 
                        type="text" 
                        list="teams"
                        value={editData?.match?.team1?.name || ''} 
                        onChange={(e) => updateNested('match.team1.name', e.target.value)}
                        placeholder="e.g. Gujarat Titans"
                        className="w-full bg-stadium-black border border-white/10 rounded-xl p-4 text-white focus:border-neon-blue outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Logo URL</label>
                      <div className="flex gap-4 items-center">
                        <input 
                          type="text" 
                          value={editData?.match?.team1?.logo || ''} 
                          onChange={(e) => updateNested('match.team1.logo', e.target.value)}
                          className="flex-1 bg-stadium-black border border-white/10 rounded-xl p-4 text-white focus:border-neon-blue outline-none"
                        />
                        {editData?.match?.team1?.logo && (
                          <div className="w-12 h-12 bg-white/10 rounded-xl p-2 flex items-center justify-center">
                            <img src={editData.match.team1.logo} alt="Logo Preview" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Team 2 */}
                  <div className="space-y-4 p-6 bg-white/5 rounded-3xl border border-white/10">
                    <h3 className="font-bold text-gold">Team 2 (Away)</h3>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Team Name (e.g. CSK, MI)</label>
                      <input 
                        type="text" 
                        list="teams"
                        value={editData?.match?.team2?.name || ''} 
                        onChange={(e) => updateNested('match.team2.name', e.target.value)}
                        placeholder="e.g. Mumbai Indians"
                        className="w-full bg-stadium-black border border-white/10 rounded-xl p-4 text-white focus:border-gold outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Logo URL</label>
                      <div className="flex gap-4 items-center">
                        <input 
                          type="text" 
                          value={editData?.match?.team2?.logo || ''} 
                          onChange={(e) => updateNested('match.team2.logo', e.target.value)}
                          className="flex-1 bg-stadium-black border border-white/10 rounded-xl p-4 text-white focus:border-gold outline-none"
                        />
                        {editData?.match?.team2?.logo && (
                          <div className="w-12 h-12 bg-white/10 rounded-xl p-2 flex items-center justify-center">
                            <img src={editData.match.team2.logo} alt="Logo Preview" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <datalist id="teams">
                  {Object.keys(TEAM_LOGOS).map(team => <option key={team} value={team} />)}
                </datalist>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Date (YYYY-MM-DD)</label>
                    <input 
                      type="date" 
                      value={editData?.match?.date || ''} 
                      onChange={(e) => updateNested('match.date', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-gold outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Time (e.g. 07:30 PM)</label>
                    <input 
                      type="text" 
                      value={editData?.match?.time || ''} 
                      onChange={(e) => updateNested('match.time', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-gold outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Venue</label>
                    <input 
                      type="text" 
                      value={editData?.match?.venue || ''} 
                      onChange={(e) => updateNested('match.venue', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-gold outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Match Day Offer Text</label>
                  <input 
                    type="text" 
                    value={editData?.match?.offer || ''} 
                    onChange={(e) => updateNested('match.offer', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-gold outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-display font-bold text-gold">Features Section</h2>
                  <button 
                    onClick={() => {
                      const newFeatures = [...(editData?.features || []), { id: Date.now(), icon: 'Zap', title: 'New Feature', description: 'Feature description' }];
                      setEditData({ ...editData, features: newFeatures });
                    }}
                    className="px-4 py-2 bg-gold/20 text-gold border border-gold/40 rounded-xl text-xs font-bold hover:bg-gold hover:text-stadium-black transition-all"
                  >
                    + ADD FEATURE
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(editData?.features || []).map((feature: any, idx: number) => (
                    <div key={feature.id} className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4 relative group">
                      <button 
                        onClick={() => {
                          const newFeatures = (editData?.features || []).filter((_: any, i: number) => i !== idx);
                          setEditData({ ...editData, features: newFeatures });
                        }}
                        className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-black text-gold/50">FEATURE #{idx + 1}</span>
                        <select 
                          value={feature?.icon || 'Zap'}
                          onChange={(e) => {
                            const newFeatures = [...(editData?.features || [])];
                            newFeatures[idx].icon = e.target.value;
                            setEditData({ ...editData, features: newFeatures });
                          }}
                          className="bg-stadium-black text-xs border border-white/10 rounded-lg p-1"
                        >
                          <option value="Tv">TV</option>
                          <option value="Volume2">Volume</option>
                          <option value="Utensils">Food</option>
                          <option value="Zap">Zap</option>
                          <option value="Star">Star</option>
                          <option value="Trophy">Trophy</option>
                          <option value="Clock">Clock</option>
                          <option value="MapPin">Map</option>
                        </select>
                      </div>
                      <input 
                        type="text" 
                        value={feature?.title || ''} 
                        onChange={(e) => {
                          const newFeatures = [...(editData?.features || [])];
                          newFeatures[idx].title = e.target.value;
                          setEditData({ ...editData, features: newFeatures });
                        }}
                        className="w-full bg-stadium-black border border-white/10 rounded-xl p-3 text-white font-bold"
                      />
                      <textarea 
                        value={feature?.description || ''} 
                        onChange={(e) => {
                          const newFeatures = [...(editData?.features || [])];
                          newFeatures[idx].description = e.target.value;
                          setEditData({ ...editData, features: newFeatures });
                        }}
                        className="w-full bg-stadium-black border border-white/10 rounded-xl p-3 text-white/60 text-sm h-20"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'combos' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-display font-bold text-gold">Food Combos</h2>
                  <button 
                    onClick={() => {
                      const newCombos = [...(editData?.combos || []), { id: Date.now(), name: 'New Combo', price: '₹499', description: 'Combo description', image: 'https://picsum.photos/seed/food/800/600', tag: 'NEW' }];
                      setEditData({ ...editData, combos: newCombos });
                    }}
                    className="px-4 py-2 bg-gold/20 text-gold border border-gold/40 rounded-xl text-xs font-bold hover:bg-gold hover:text-stadium-black transition-all"
                  >
                    + ADD COMBO
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(editData?.combos || []).map((combo: any, idx: number) => (
                    <div key={combo.id} className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4 relative group">
                      <button 
                        onClick={() => {
                          const newCombos = (editData?.combos || []).filter((_: any, i: number) => i !== idx);
                          setEditData({ ...editData, combos: newCombos });
                        }}
                        className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white z-10"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="flex justify-between items-center">
                        <input 
                          type="text" 
                          value={combo?.name || ''} 
                          onChange={(e) => {
                            const newCombos = [...(editData?.combos || [])];
                            newCombos[idx].name = e.target.value;
                            setEditData({ ...editData, combos: newCombos });
                          }}
                          className="bg-transparent border-none text-lg font-bold text-white outline-none"
                        />
                        <input 
                          type="text" 
                          value={combo?.price || ''} 
                          onChange={(e) => {
                            const newCombos = [...(editData?.combos || [])];
                            newCombos[idx].price = e.target.value;
                            setEditData({ ...editData, combos: newCombos });
                          }}
                          className="bg-stadium-black border border-white/10 rounded-lg px-2 py-1 text-gold font-bold w-20 text-right"
                        />
                      </div>
                      <textarea 
                        value={combo?.description || ''} 
                        onChange={(e) => {
                          const newCombos = [...(editData?.combos || [])];
                          newCombos[idx].description = e.target.value;
                          setEditData({ ...editData, combos: newCombos });
                        }}
                        className="w-full bg-stadium-black border border-white/10 rounded-xl p-3 text-white/60 text-sm h-20"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-white/30 uppercase">Image URL</label>
                          <input 
                            type="text" 
                            value={combo?.image || ''} 
                            onChange={(e) => {
                              const newCombos = [...(editData?.combos || [])];
                              newCombos[idx].image = e.target.value;
                              setEditData({ ...editData, combos: newCombos });
                            }}
                            className="w-full bg-stadium-black border border-white/10 rounded-xl p-2 text-xs"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-white/30 uppercase">Tag (e.g. HOT)</label>
                          <input 
                            type="text" 
                            value={combo?.tag || ''} 
                            onChange={(e) => {
                              const newCombos = [...(editData?.combos || [])];
                              newCombos[idx].tag = e.target.value;
                              setEditData({ ...editData, combos: newCombos });
                            }}
                            className="w-full bg-stadium-black border border-white/10 rounded-xl p-2 text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-display font-bold text-gold">Fan Reviews</h2>
                  <button 
                    onClick={() => {
                      const newT = [...(editData?.testimonials || []), { id: Date.now(), name: 'New Fan', rating: 5, comment: 'Great experience!', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=new' }];
                      setEditData({ ...editData, testimonials: newT });
                    }}
                    className="px-4 py-2 bg-gold/20 text-gold border border-gold/40 rounded-xl text-xs font-bold hover:bg-gold hover:text-stadium-black transition-all"
                  >
                    + ADD REVIEW
                  </button>
                </div>
                <div className="space-y-6">
                  {(editData?.testimonials || []).map((t: any, idx: number) => (
                    <div key={t.id} className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4 relative group">
                      <button 
                        onClick={() => {
                          const newT = (editData?.testimonials || []).filter((_: any, i: number) => i !== idx);
                          setEditData({ ...editData, testimonials: newT });
                        }}
                        className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-4">
                        <img src={t?.avatar || ''} className="w-12 h-12 rounded-full" alt="Avatar" />
                        <input 
                          type="text" 
                          value={t?.name || ''} 
                          onChange={(e) => {
                            const newT = [...(editData?.testimonials || [])];
                            newT[idx].name = e.target.value;
                            setEditData({ ...editData, testimonials: newT });
                          }}
                          className="bg-transparent border-none font-bold text-white outline-none"
                        />
                        <div className="flex gap-1 ml-auto">
                          {[1,2,3,4,5].map(star => (
                            <button 
                              key={star}
                              onClick={() => {
                                const newT = [...(editData?.testimonials || [])];
                                newT[idx].rating = star;
                                setEditData({ ...editData, testimonials: newT });
                              }}
                            >
                              <Star className={`w-4 h-4 ${star <= (t?.rating || 0) ? 'fill-gold text-gold' : 'text-white/20'}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <textarea 
                        value={t?.comment || ''} 
                        onChange={(e) => {
                          const newT = [...(editData?.testimonials || [])];
                          newT[idx].comment = e.target.value;
                          setEditData({ ...editData, testimonials: newT });
                        }}
                        className="w-full bg-stadium-black border border-white/10 rounded-xl p-4 text-white/80 italic h-24"
                      />
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-white/30 uppercase">Avatar URL</label>
                        <input 
                          type="text" 
                          value={t?.avatar || ''} 
                          onChange={(e) => {
                            const newT = [...(editData?.testimonials || [])];
                            newT[idx].avatar = e.target.value;
                            setEditData({ ...editData, testimonials: newT });
                          }}
                          className="w-full bg-stadium-black border border-white/10 rounded-xl p-2 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'location' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-display font-bold text-gold">Location & Contact</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Full Address</label>
                    <textarea 
                      value={editData?.location?.address || ''} 
                      onChange={(e) => updateNested('location.address', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-gold outline-none h-24"
                    />
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Landmark</label>
                      <input 
                        type="text" 
                        value={editData?.location?.landmark || ''} 
                        onChange={(e) => updateNested('location.landmark', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-gold outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Parking Info</label>
                      <input 
                        type="text" 
                        value={editData?.location?.parking || ''} 
                        onChange={(e) => updateNested('location.parking', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-gold outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Phone Number</label>
                    <input 
                      type="text" 
                      value={editData?.location?.phone || ''} 
                      onChange={(e) => updateNested('location.phone', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-gold outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="text" 
                      value={editData?.location?.email || ''} 
                      onChange={(e) => updateNested('location.email', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-gold outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Map Image URL (or Embed URL)</label>
                  <input 
                    type="text" 
                    value={editData?.location?.mapUrl || ''} 
                    onChange={(e) => updateNested('location.mapUrl', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:border-gold outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-8">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-display font-bold text-gold">Recent Bookings</h2>
                  <button 
                    onClick={exportBookings}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold flex items-center gap-2 transition-all"
                  >
                    <Download className="w-4 h-4" />
                    EXPORT CSV
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="pb-4 text-xs font-bold text-white/40 uppercase tracking-widest">Customer</th>
                        <th className="pb-4 text-xs font-bold text-white/40 uppercase tracking-widest">Guests</th>
                        <th className="pb-4 text-xs font-bold text-white/40 uppercase tracking-widest">Team</th>
                        <th className="pb-4 text-xs font-bold text-white/40 uppercase tracking-widest">Date/Time</th>
                        <th className="pb-4 text-xs font-bold text-white/40 uppercase tracking-widest">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {(editData?.bookings || []).slice().reverse().map((booking: any, idx: number) => (
                        <tr key={idx} className="group hover:bg-white/2 transition-colors">
                          <td className="py-4">
                            <div className="font-bold">{booking?.name || 'Unknown'}</div>
                            <div className="text-xs text-white/40">{booking?.phone || 'No Phone'}</div>
                          </td>
                          <td className="py-4 font-mono text-neon-blue">{booking?.guests || 0}</td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                              booking?.team === 'Neutral' ? 'bg-white/10' : 'bg-gold/20 text-gold'
                            }`}>
                              {booking?.team || 'Neutral'}
                            </span>
                          </td>
                          <td className="py-4">
                            <div className="text-sm">{booking?.date || ''}</div>
                            <div className="text-xs text-white/40">{booking?.time || ''}</div>
                          </td>
                          <td className="py-4">
                            <div className="flex gap-2">
                              <a 
                                href={`https://wa.me/91${(booking?.phone || '').replace(/\D/g, '')}`} 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-[#25D366]/20 text-[#25D366] rounded-lg hover:bg-[#25D366] hover:text-white transition-all"
                              >
                                <MessageCircle className="w-4 h-4" />
                              </a>
                              <a 
                                href={`tel:${booking?.phone || ''}`}
                                className="p-2 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue hover:text-stadium-black transition-all"
                              >
                                <Phone className="w-4 h-4" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const WhatsAppFloating = ({ number }: { number?: string }) => {
  return (
    <a 
      href={`https://wa.me/${number || '919999999999'}`} 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform animate-bounce"
    >
      <MessageCircle className="text-white w-8 h-8" />
    </a>
  );
};

const AdminLogin = ({ onLogin }: { onLogin: (token: string) => void }) => {
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('admin_token', json.token);
        onLogin(json.token);
      } else {
        setError(json.message || 'Invalid password');
      }
    } catch (err) {
      setError('Connection error. Try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full glass rounded-[2.5rem] p-10 text-center"
      >
        <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-gold" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-2">Admin Login</h1>
        <p className="text-white/40 mb-8">Enter password to manage your cafe screening.</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            required
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-gold outline-none text-center"
            placeholder="Enter Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
          <button 
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-4 bg-gold text-stadium-black font-black uppercase tracking-widest rounded-2xl hover:bg-gold-light transition-all disabled:opacity-50"
          >
            {isLoggingIn ? 'Verifying...' : 'Login to Dashboard'}
          </button>
        </form>
        <a href="/" className="inline-block mt-8 text-white/40 hover:text-white text-sm font-bold flex items-center justify-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Website
        </a>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [adminToken, setAdminToken] = useState<string | null>(localStorage.getItem('admin_token'));

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-stadium-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen selection:bg-gold selection:text-stadium-black">
        <Navbar logoUrl={data?.logoUrl} />
        
        <Routes>
          {/* Visitor View */}
          <Route path="/" element={
            <>
              <Hero hero={data?.hero} match={data?.match} />
              <MatchHighlight match={data?.match} />
              <Features features={data?.features} />
              <FoodCombos combos={data?.combos} />
              <BookingSection onBookingSuccess={fetchData} location={data?.location} />
              <Scarcity />
              <SocialProof testimonials={data?.testimonials} />
              <Location location={data?.location} />
            </>
          } />

          {/* Hidden Admin Route */}
          <Route path="/admin" element={
            adminToken ? (
              <AdminDashboard data={data} onUpdate={fetchData} />
            ) : (
              <AdminLogin onLogin={(token) => setAdminToken(token)} />
            )
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        
        <Footer />
        <WhatsAppFloating number={data?.hero?.whatsappNumber} />
      </div>
    </Router>
  );
}
