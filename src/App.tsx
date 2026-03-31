/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ExternalLink
} from 'lucide-react';
import { FOOD_COMBOS, FEATURES, TESTIMONIALS } from './constants';
import { Match } from './types';

// --- Components ---

const Navbar = () => {
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
          <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)]">
            <Trophy className="text-stadium-black w-6 h-6" />
          </div>
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

const Hero = ({ match }: { match?: Match }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=2000" 
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
            WATCH IPL LIVE ON <br />
            <span className="text-gold text-glow-gold">GIANT SCREEN</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 font-light">
            Book your table now for tonight’s big match, enjoy exciting food combos, 
            live crowd energy, and exclusive match-day offers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a 
              href="https://wa.me/919999999999" 
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
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/5 p-4 flex items-center justify-center border border-white/10 shadow-2xl">
                <img src={match.team1.logo} alt={match.team1.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
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
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/5 p-4 flex items-center justify-center border border-white/10 shadow-2xl">
                <img src={match.team2.logo} alt={match.team2.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
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
            🔥 OFFER: Free fries on every six hit by your favorite team!
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const icons: Record<string, any> = { Tv, Volume2, Utensils, Zap };

  return (
    <section className="py-24 bg-white/2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = icons[feature.icon];
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

const FoodCombos = () => {
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
          {FOOD_COMBOS.map((combo) => (
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

const BookingSection = ({ onBookingSuccess }: { onBookingSuccess: () => void }) => {
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
                { icon: MapPin, text: 'Sindhu Bhavan Road, Ahmedabad' },
                { icon: Phone, text: '+91 99999 88888' },
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

const SocialProof = () => {
  return (
    <section className="py-24 bg-white/2">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display font-bold mb-4">Fan <span className="text-gold">Vibes</span></h2>
          <p className="text-white/50">"Best place in Ahmedabad for IPL screening"</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {TESTIMONIALS.map((t) => (
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

const Location = () => {
  return (
    <section id="location" className="py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="glass rounded-[3rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          <div className="h-[400px] lg:h-auto bg-white/5 relative">
            {/* Map Placeholder */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <MapPin className="w-12 h-12 text-gold mb-4" />
              <h3 className="text-xl font-bold mb-2">Find Us on Maps</h3>
              <p className="text-white/40 text-sm mb-6">Sindhu Bhavan Road, near XYZ Landmark, Ahmedabad</p>
              <div className="w-full h-full absolute inset-0 opacity-20 grayscale invert">
                <img src="https://picsum.photos/seed/map/800/600" className="w-full h-full object-cover" alt="Map" referrerPolicy="no-referrer" />
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
                <p className="text-white/70">Shop 4-5, Premium Plaza, Sindhu Bhavan Road, Ahmedabad, Gujarat 380054</p>
              </div>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gold font-bold mb-2">Parking</h4>
                  <p className="text-white/70">Valet Parking Available</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-gold font-bold mb-2">Landmark</h4>
                  <p className="text-white/70">Near Metro Pillar 42</p>
                </div>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gold font-bold mb-2">Contact</h4>
                <p className="text-white/70">+91 99999 88888 <br /> hello@iplcafe.com</p>
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
  const [matchForm, setMatchForm] = useState(data.match);
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdateMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const response = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(matchForm),
      });
      if (response.ok) {
        alert('Match schedule updated successfully!');
        onUpdate();
      }
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-gold mb-2">Admin Dashboard</h1>
          <p className="text-white/50">Manage match schedule and view customer bookings.</p>
        </div>
        <div className="flex gap-4">
          <a 
            href="/api/export" 
            className="px-6 py-3 glass rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all font-bold text-sm"
          >
            <Download className="w-4 h-4" />
            Export to Excel (CSV)
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Match Settings */}
        <div className="lg:col-span-1">
          <div className="glass rounded-3xl p-8 sticky top-32">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5 text-gold" />
              Update Match
            </h2>
            <form onSubmit={handleUpdateMatch} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-white/40">Team 1 Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none"
                  value={matchForm.team1.name}
                  onChange={(e) => setMatchForm({...matchForm, team1: {...matchForm.team1, name: e.target.value}})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-white/40">Team 2 Name</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none"
                  value={matchForm.team2.name}
                  onChange={(e) => setMatchForm({...matchForm, team2: {...matchForm.team2, name: e.target.value}})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-white/40">Date</label>
                <input 
                  type="date" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none"
                  value={matchForm.date}
                  onChange={(e) => setMatchForm({...matchForm, date: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-white/40">Time</label>
                <input 
                  type="text" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-gold outline-none"
                  placeholder="07:30 PM"
                  value={matchForm.time}
                  onChange={(e) => setMatchForm({...matchForm, time: e.target.value})}
                />
              </div>
              <button 
                type="submit"
                disabled={isSaving}
                className="w-full py-4 bg-gold text-stadium-black font-bold rounded-xl hover:bg-gold-light transition-all disabled:opacity-50 mt-4"
              >
                {isSaving ? 'Saving...' : 'Update Schedule'}
              </button>
            </form>
          </div>
        </div>

        {/* Bookings List */}
        <div className="lg:col-span-2">
          <div className="glass rounded-3xl p-8 overflow-hidden">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-neon-blue" />
              Recent Bookings ({data.bookings.length})
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-4 text-[10px] uppercase font-bold text-white/40 px-2">Customer</th>
                    <th className="pb-4 text-[10px] uppercase font-bold text-white/40 px-2">Guests</th>
                    <th className="pb-4 text-[10px] uppercase font-bold text-white/40 px-2">Team</th>
                    <th className="pb-4 text-[10px] uppercase font-bold text-white/40 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {data.bookings.slice().reverse().map((booking: any) => (
                    <tr key={booking.id} className="group">
                      <td className="py-4 px-2">
                        <div className="font-bold">{booking.name}</div>
                        <div className="text-xs text-white/40">{booking.phone}</div>
                      </td>
                      <td className="py-4 px-2">
                        <span className="px-2 py-1 bg-white/5 rounded-lg text-xs font-bold">{booking.guests}</span>
                      </td>
                      <td className="py-4 px-2">
                        <span className={`text-xs font-bold ${booking.team === 'Neutral' ? 'text-white/40' : 'text-gold'}`}>
                          {booking.team}
                        </span>
                      </td>
                      <td className="py-4 px-2">
                        <div className="flex gap-2">
                          <a 
                            href={`https://wa.me/91${booking.phone.replace(/\D/g, '')}`} 
                            target="_blank"
                            className="p-2 glass rounded-lg text-[#25D366] hover:bg-[#25D366]/10 transition-all"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                          <a 
                            href={`tel:${booking.phone}`} 
                            className="p-2 glass rounded-lg text-neon-blue hover:bg-neon-blue/10 transition-all"
                            title="Call Customer"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {data.bookings.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-20 text-center text-white/20 italic">
                        No bookings yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WhatsAppFloating = () => {
  return (
    <a 
      href="https://wa.me/919999999999" 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform animate-bounce"
    >
      <MessageCircle className="text-white w-8 h-8" />
    </a>
  );
};

// --- Main App ---

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="min-h-screen selection:bg-gold selection:text-stadium-black">
      <Navbar />
      
      {/* Admin Toggle (Hidden in production, but for demo we show it) */}
      <button 
        onClick={() => setIsAdmin(!isAdmin)}
        className="fixed bottom-28 right-8 z-50 w-12 h-12 glass rounded-full flex items-center justify-center text-white/50 hover:text-gold transition-all"
        title={isAdmin ? "View Site" : "Admin Panel"}
      >
        {isAdmin ? <ArrowLeft className="w-5 h-5" /> : <Settings className="w-5 h-5" />}
      </button>

      {isAdmin ? (
        <AdminDashboard data={data} onUpdate={fetchData} />
      ) : (
        <>
          <Hero match={data?.match} />
          <MatchHighlight match={data?.match} />
          <Features />
          <FoodCombos />
          <BookingSection onBookingSuccess={fetchData} />
          <Scarcity />
          <SocialProof />
          <Location />
        </>
      )}
      
      <Footer />
      <WhatsAppFloating />
    </div>
  );
}
