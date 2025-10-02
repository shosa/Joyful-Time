'use client';

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import Header from '@/components/Header';

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${index < rating ? 'text-gold-bright drop-shadow-md' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
};

declare global {
    interface Window { 
        wpShowRatedWAv3: (id: string, year: string) => void;
    }
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: '',
    error: '',
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [showOverlay, setShowOverlay] = useState(true);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      setShowOverlay(false);
      videoRef.current.play();
    }
  };

  // Scroll animation observer with varied animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animationType = entry.target.getAttribute('data-animation');
          if (animationType) {
            entry.target.classList.add(animationType);
          }
          entry.target.classList.remove('opacity-0');
        }
      });
    }, observerOptions);

    // Observe all elements with animations
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach((element) => {
      element.classList.add('opacity-0');
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: '', error: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus({ loading: false, success: 'Messaggio inviato con successo!', error: '' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        setFormStatus({ loading: false, success: '', error: data.message || 'Si è verificato un errore. Riprova più tardi.' });
      }
    } catch {
      setFormStatus({ loading: false, success: '', error: 'Si è verificato un errore di rete. Riprova più tardi.' });
    }
  };

  return (
    <div className="bg-white text-gray-800">
      <Header />

      <main className="pt-16"> {/* Add padding to avoid content being hidden by fixed header */}
        {/* Hero Section */}
        <section
          id="home"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Glass morphism card with organic shape */}
          <div className="relative text-center max-w-3xl mx-6 md:mx-4">
            {/* Secondary shape - behind main card */}
            <div className="absolute inset-0 backdrop-blur-sm bg-white/10 border border-white/20 transform rotate-6 scale-105" style={{ borderRadius: '55% 45% 40% 60% / 50% 60% 40% 50%' }}></div>

            {/* Main card */}
            <div className="relative backdrop-blur-md bg-white/30 p-6 md:p-12 shadow-2xl border border-white/50 overflow-hidden" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}>
              {/* Inner decorative gradients */}
              <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
                background: 'radial-gradient(ellipse at 30% 20%, rgba(254, 163, 13, 0.3) 0%, transparent 50%)',
              }}></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-oxford-blue/10 to-transparent rounded-full blur-3xl -mb-20 -mr-20"></div>

            <div
              className="flex justify-center mb-4 md:mb-6 opacity-0 animate-fade-in relative z-10"
              style={{ animationDelay: '0.5s' }}
            >
              <img
                src="/logo.png"
                alt="Joyful Time"
                className="h-16 md:h-32"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3)) brightness(0.85) contrast(1.1)', mixBlendMode: 'multiply', opacity: 0.7 }}
              />
            </div>

            {/* Rating Stars */}
            <div className="flex justify-center gap-1 mb-3 md:mb-4 opacity-0 animate-fade-in relative z-10" style={{ animationDelay: '0.7s' }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 md:w-6 md:h-6 text-gold-bright drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>

            {/* Matrimonio.com badge */}
            <div className="flex items-center justify-center gap-2 mb-4 md:mb-6 opacity-0 animate-fade-in relative z-10" style={{ animationDelay: '0.9s' }}>
              <span className="text-xs md:text-sm font-sans-modern text-gray-700">Partner di</span>
              <img src="/mat_logo.svg" alt="Matrimonio.com" className="h-5 md:h-6" />
            </div>

            <p
              className="text-lg md:text-2xl font-sans-modern text-gray-800 mb-6 md:mb-8 opacity-0 animate-fade-in relative z-10"
              style={{ animationDelay: '1.1s' }}
            >
              Dedizione e professionalità per il tuo evento perfetto
            </p>
            <div className="relative z-10 hidden md:block">
                <button
                  className="btn-gold text-white font-bold py-4 px-10 rounded-full transition-all duration-300 text-lg opacity-0 animate-fade-in"
                  style={{ animationDelay: '1.5s' }}
                >
                  <span className="relative">Scrivici su WhatsApp</span>
                </button>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
            <svg
              className="w-8 h-8 text-white drop-shadow-lg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </section>

        {/* About Us Section */}
        <section id="chi-siamo" className="relative py-20 bg-gradient-to-br from-white via-soft-orange/20 to-white overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-light-blue/30 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-40 left-20 w-60 h-60 rounded-full bg-gold-bright/30 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

          {/* Solid shapes */}
          <div className="absolute -left-20 top-1/4 w-64 h-64 bg-gold-dark/10 rounded-full"></div>
          <div className="absolute -right-32 bottom-1/3 w-96 h-96 bg-oxford-blue/10 rounded-full"></div>

          {/* Wave decoration */}
          <svg className="absolute bottom-0 left-0 w-full h-32 opacity-20" preserveAspectRatio="none" viewBox="0 0 1440 320">
            <path fill="#D4AF37" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,181.3C960,181,1056,139,1152,128C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>

          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div data-animation="animate-slide-in-left">
              <img src="/team-portrait.jpg" alt="Il Team di Joyful Time" className="rounded-lg shadow-2xl" loading="lazy" />
            </div>
            <div data-animation="animate-slide-in-right">
              <h3 className="text-4xl font-serif-elegant text-oxford-blue mb-6">Passione, Creatività, Professionalità</h3>
              <p className="font-sans-modern text-lg mb-4">
                Joyful Time nasce dalla passione per la creazione di momenti indimenticabili. Crediamo che ogni evento sia un capitolo unico nella storia di una persona, e la nostra missione è scriverlo con dedizione e professionalità.
              </p>
              <p className="font-sans-modern text-lg">
                Con anni di esperienza nel settore, il nostro team si impegna a trasformare le vostre idee in realtà, curando ogni singolo dettaglio, dall&apos;ideazione alla realizzazione. Che sia un matrimonio da favola, una festa privata esclusiva o uno spettacolo coinvolgente, il nostro obiettivo è superare le vostre aspettative.
              </p>
            </div>
          </div>
        </section>

        {/* Second About Section - Inverted Layout */}
        <section className="relative py-20 bg-white overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-40 left-10 w-52 h-52 rounded-full bg-gold-bright/20 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full bg-light-blue/30 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

          {/* Solid shapes */}
          <div className="absolute -right-20 top-1/3 w-80 h-80 bg-light-blue/15 rounded-full"></div>
          <div className="absolute -left-32 bottom-1/4 w-72 h-72 bg-gold-dark/15 rounded-full"></div>

          {/* Wave decoration top */}
          <svg className="absolute top-0 left-0 w-full h-32 opacity-20 rotate-180" preserveAspectRatio="none" viewBox="0 0 1440 320">
            <path fill="#141E3B" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,181.3C960,181,1056,139,1152,128C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>

          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Testo a sinistra */}
            <div data-animation="animate-slide-in-left" className="md:order-1">
              <h3 className="text-4xl font-serif-elegant text-oxford-blue mb-6">Eventi Su Misura per Te</h3>
              <p className="font-sans-modern text-lg mb-4">
                Ogni celebrazione merita un&apos;attenzione particolare. Dalla musica dal vivo alla scenografia, ogni elemento è curato nei minimi dettagli per creare un&apos;atmosfera unica e memorabile.
              </p>
              <p className="font-sans-modern text-lg">
                Il nostro approccio personalizzato ci permette di adattarci perfettamente alle vostre esigenze, rendendo ogni momento speciale e indimenticabile. La vostra gioia è la nostra missione.
              </p>
            </div>

            {/* Immagine a destra */}
            <div data-animation="animate-slide-in-right" className="md:order-2">
              <img src="/team-eventi.jpg" alt="Eventi Joyful Time" className="rounded-lg shadow-2xl" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servizi" className="relative py-20 bg-gradient-to-br from-light-blue/30 via-white to-soft-orange/30 overflow-hidden">
          {/* Floating shapes */}
          <div className="absolute top-0 left-1/4 w-32 h-32 rounded-full bg-gold-bright/20 blur-2xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-oxford-blue/20 blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>

          {/* Solid geometric shapes */}
          <div className="absolute -left-24 top-1/2 w-96 h-96 bg-gold/8 rounded-full"></div>
          <div className="absolute -right-24 top-1/4 w-80 h-80 bg-oxford-blue/8 rounded-full"></div>

          {/* Triangular shapes */}
          <div className="absolute left-10 bottom-20 w-0 h-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-b-[150px] border-b-gold-dark/10 rotate-45"></div>
          <div className="absolute right-10 top-32 w-0 h-0 border-l-[80px] border-l-transparent border-r-[80px] border-r-transparent border-b-[120px] border-b-light-blue/15 -rotate-12"></div>

          {/* Wave decoration */}
          <svg className="absolute top-0 left-0 w-full h-24 opacity-15" preserveAspectRatio="none" viewBox="0 0 1440 320">
            <path fill="#FFD700" d="M0,64L60,80C120,96,240,128,360,133.3C480,139,600,117,720,112C840,107,960,117,1080,138.7C1200,160,1320,192,1380,208L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
          </svg>

          <div className="container mx-auto px-4 relative z-10">
            <h3 data-animation="animate-slide-up" className="text-center text-4xl font-serif-elegant text-oxford-blue mb-12">I Nostri Servizi</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Service Card 1: Matrimoni */}
              <div data-animation="animate-scale-in" className="relative rounded-3xl overflow-hidden shadow-2xl group h-96 transition-all duration-500 hover:-translate-y-2 hover:shadow-orange-web/50">
                <img src="/matrimoni.jpg" alt="Matrimoni" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-orange-web/50 group-hover:from-orange-web/70 group-hover:to-pink-600/70 transition-all duration-500"></div>
                <div className="relative h-full flex flex-col justify-end p-8 text-white">
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">💍</span>
                  </div>
                  <h4 className="text-3xl font-serif-elegant mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Matrimoni</h4>
                  <p className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 font-sans-modern">
                    Il vostro giorno più bello, orchestrato alla perfezione con stile, eleganza e un tocco di magia. La nostra specialità, la vostra favola.
                  </p>
                </div>
              </div>

              {/* Service Card 2: Eventi Privati */}
              <div data-animation="animate-scale-in" className="relative rounded-3xl overflow-hidden shadow-2xl group h-96 transition-all duration-500 hover:-translate-y-2 hover:shadow-oxford-blue/50">
                <img src="/private.jpg" alt="Eventi Privati" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-oxford-blue/50 group-hover:from-oxford-blue/70 group-hover:to-blue-900/70 transition-all duration-500"></div>
                <div className="relative h-full flex flex-col justify-end p-8 text-white">
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">🎉</span>
                  </div>
                  <h4 className="text-3xl font-serif-elegant mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Eventi Privati</h4>
                  <p className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 font-sans-modern">
                    Feste di compleanno, lauree o anniversari. Trasformiamo ogni occasione in un evento esclusivo e indimenticabile.
                  </p>
                </div>
              </div>

              {/* Service Card 3: Piazze & Locali */}
              <div data-animation="animate-scale-in" className="relative rounded-3xl overflow-hidden shadow-2xl group h-96 transition-all duration-500 hover:-translate-y-2 hover:shadow-purple-500/50">
                <img src="/piazze.jpg" alt="Piazze e Locali" loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-gray-800/50 group-hover:from-purple-900/70 group-hover:to-gray-800/70 transition-all duration-500"></div>
                <div className="relative h-full flex flex-col justify-end p-8 text-white">
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">🎵</span>
                  </div>
                  <h4 className="text-3xl font-serif-elegant mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Piazze & Locali</h4>
                  <p className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 font-sans-modern">
                    Portiamo musica, spettacolo e animazione in piazze, locali e manifestazioni pubbliche, creando un&apos;atmosfera di pura energia.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="recensioni" className="relative py-20 bg-gradient-to-br from-white via-light-blue/20 to-soft-orange/20 overflow-hidden">
          {/* Animated decorations */}
          <div className="absolute top-10 left-10 w-48 h-48 rounded-full bg-gold/10 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full bg-oxford-blue/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

          <div className="container mx-auto px-4 relative z-10">
            <h3 className="text-center text-4xl font-serif-elegant text-oxford-blue mb-12">La Vostra Fiducia, Il Nostro Orgoglio</h3>
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              
              {/* Wedding Award Badge */}
              <div className="lg:col-span-1 flex flex-col items-center justify-center text-center p-8">
                <div id="wp-ratedWA">
                    <a target="_blank" href="https://m.matrimonio.com/musica-matrimonio/joyful-time--e208010" rel="nofollow" title="Joyful Time, vincitore Wedding Awards 2025 Matrimonio.com">
                        <img width="125" height="125" alt="Joyful Time, vincitore Wedding Awards 2025 Matrimonio.com" id="wp-ratedWA-img-2025" src="https://cdn1.matrimonio.com/img/badges/2025/badge-weddingawards_it_IT.jpg" />
                    </a>
                </div>
                <Script 
                  src="https://cdn1.matrimonio.com/_js/wp-rated.js?v=4" 
                  strategy="afterInteractive"
                  onReady={() => {
                    if (typeof window.wpShowRatedWAv3 === 'function') {
                      window.wpShowRatedWAv3('208010', '2025');
                    }
                  }}
                />
              </div>

              {/* Testimonials */}
              <div className="lg:col-span-2 space-y-8">
                {/* Testimonial 1 */}
                <div className="backdrop-blur-sm bg-white/60 p-8 rounded-3xl shadow-xl border border-white/40 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="flex items-center mb-3">
                    <StarRating rating={5} />
                  </div>
                  <p className="font-sans-modern text-gray-800 italic mb-4 text-lg">&ldquo;Un team eccezionale! Hanno reso il nostro matrimonio una vera favola, curando ogni dettaglio con una professionalità impeccabile. Consigliatissimi!&rdquo;</p>
                  <div className="flex items-center justify-end gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-web to-pink-500"></div>
                    <p className="font-bold text-oxford-blue">Maria & Luca</p>
                  </div>
                </div>
                {/* Testimonial 2 */}
                <div className="backdrop-blur-sm bg-white/60 p-8 rounded-3xl shadow-xl border border-white/40 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="flex items-center mb-3">
                    <StarRating rating={5} />
                  </div>
                  <p className="font-sans-modern text-gray-800 italic mb-4 text-lg">&ldquo;La festa di laurea è stata un successo enorme, tutto merito di Joyful Time. Divertimento, organizzazione perfetta e tanta bella musica!&rdquo;</p>
                  <div className="flex items-center justify-end gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-oxford-blue to-blue-500"></div>
                    <p className="font-bold text-oxford-blue">Francesca P.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Matrimonio.com Section */}
        <section className="relative py-16 bg-gradient-to-br from-white via-soft-orange/20 to-light-blue/20 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-oxford-blue/10 rounded-full translate-y-1/2 -translate-x-1/3"></div>

          {/* Wave decoration */}
          <svg className="absolute bottom-0 left-0 w-full h-20 opacity-10" preserveAspectRatio="none" viewBox="0 0 1440 320">
            <path fill="#D4AF37" d="M0,224L60,208C120,192,240,160,360,160C480,160,600,192,720,197.3C840,203,960,181,1080,170.7C1200,160,1320,160,1380,160L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
          </svg>

          <div className="container mx-auto px-4 text-center relative z-10">
            <h3 className="text-3xl font-serif-elegant text-oxford-blue mb-6">Scoprici su Matrimonio.com</h3>
            <p className="text-lg font-sans-modern text-gray-700 mb-8 max-w-2xl mx-auto">Siamo orgogliosi di essere partner ufficiali di Matrimonio.com. Visita il nostro profilo per scoprire le recensioni dei nostri clienti!</p>
            <a
              href="https://www.matrimonio.com/animazione-per-matrimonio/joyful-time--e193091"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src="/mat_logo.svg"
                alt="Matrimonio.com"
                className="h-20 mx-auto opacity-90 hover:opacity-100 transition-opacity duration-300"
                loading="lazy"
              />
            </a>
          </div>
        </section>

        {/* Spot Video Section */}
        <section className="relative h-screen w-full bg-gradient-to-br from-oxford-blue via-black to-oxford-blue flex items-center justify-center overflow-hidden">
          {/* Video */}
          <video
            ref={videoRef}
            loop
            playsInline
            controls={!showOverlay}
            className="w-full h-full object-cover"
            poster="/logo.png"
          >
            <source src="/spot.mp4" type="video/mp4" />
          </video>

          {/* Play Overlay */}
          {showOverlay && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 transition-all duration-500 cursor-pointer"
              onClick={handlePlayVideo}
            >
              <div className="text-center">
                <h3 className="text-5xl md:text-6xl font-serif-elegant text-white mb-6 drop-shadow-2xl">Guarda il Nostro Spot</h3>
                <p className="text-xl md:text-2xl font-sans-modern text-white/90 mb-8 drop-shadow-lg">Scopri l&apos;emozione dei nostri eventi</p>
                <div className="flex items-center justify-center gap-4">
                  <svg className="w-20 h-20 text-gold-bright animate-pulse drop-shadow-2xl" fill="currentColor" viewBox="0 0 24 24" style={{filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.8))'}}>
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Contact Section */}
        <section id="contatti" className="relative py-20 bg-gradient-to-br from-soft-orange/30 via-white to-light-blue/30 overflow-hidden">
          {/* Floating elements */}
          <div className="absolute top-1/4 left-0 w-32 h-32 rounded-full bg-gold-bright/20 blur-2xl animate-float"></div>
          <div className="absolute bottom-1/4 right-0 w-40 h-40 rounded-full bg-oxford-blue/20 blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>

          <div className="container mx-auto px-4 relative z-10">
            <h3 className="text-center text-4xl font-serif-elegant text-oxford-blue mb-12">Realizziamo Insieme il Tuo Evento</h3>
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div className="backdrop-blur-sm bg-white/80 p-10 rounded-3xl shadow-2xl border border-white/50 transform transition-all duration-300 hover:shadow-orange-web/20">
                <h4 className="text-2xl font-serif-elegant text-oxford-blue mb-6">Scrivici</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-sans-modern mb-2">Nome</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-web focus:ring-2 focus:ring-orange-web/20 transition-all duration-300 bg-white/50" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-sans-modern mb-2">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-web focus:ring-2 focus:ring-orange-web/20 transition-all duration-300 bg-white/50" required />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-sans-modern mb-2">Messaggio</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-web focus:ring-2 focus:ring-orange-web/20 transition-all duration-300 bg-white/50" required></textarea>
                  </div>
                  <button type="submit" disabled={formStatus.loading} className="w-full btn-gold text-white font-bold py-4 px-6 rounded-full transition-all duration-300 disabled:bg-gray-400 disabled:shadow-none">
                    {formStatus.loading ? 'Invio in corso...' : 'Invia Messaggio'}
                  </button>
                  {formStatus.success && <p className="text-green-500 mt-4">{formStatus.success}</p>}
                  {formStatus.error && <p className="text-red-500 mt-4">{formStatus.error}</p>}
                </form>
              </div>

              {/* Direct Contact */}
              <div className="flex flex-col justify-center backdrop-blur-sm bg-white/40 p-10 rounded-3xl border border-white/50">
                <h4 className="text-2xl font-serif-elegant text-oxford-blue mb-6">Contatto Immediato</h4>
                <p className="font-sans-modern text-lg mb-8 text-gray-700">Preferisci parlarci direttamente? Chiamaci o scrivici su WhatsApp per una risposta più rapida.</p>
                <div className="space-y-4">
                  <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 px-6 rounded-full hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 transform">
                    <svg
                      viewBox="0 0 32 32"
                      className="w-6 h-6 mr-3"
                      fill="currentColor"
                    >
                      <path d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.247 1.414 1.414-5.247-0.292-0.507c-1.224-2.162-1.87-4.588-1.87-7.07 0-7.589 6.145-13.733 13.733-13.733s13.733 6.145 13.733 13.733-6.145 13.733-13.733 13.733zM21.937 18.645c-0.357-0.179-2.103-1.040-2.43-1.161-0.326-0.121-0.565-0.179-0.804 0.179s-0.923 1.161-1.13 1.4c-0.208 0.239-0.417 0.268-0.774 0.089s-1.510-0.557-2.876-1.779c-1.063-0.951-1.78-2.126-1.988-2.483s-0.022-0.549 0.157-0.728c0.161-0.161 0.357-0.417 0.536-0.625s0.238-0.357 0.357-0.595c0.119-0.238 0.060-0.446-0.030-0.625s-0.804-1.937-1.102-2.653c-0.290-0.696-0.585-0.601-0.804-0.612-0.208-0.011-0.446-0.013-0.685-0.013s-0.625 0.089-0.953 0.446c-0.328 0.357-1.25 1.220-1.25 2.975s1.279 3.451 1.458 3.689c0.179 0.238 2.517 3.842 6.098 5.385 0.852 0.368 1.518 0.587 2.037 0.751 0.856 0.272 1.636 0.233 2.253 0.141 0.687-0.103 2.103-0.860 2.4-1.690s0.297-1.542 0.208-1.690c-0.089-0.148-0.327-0.238-0.685-0.417z"/>
                    </svg>
                    Scrivici su WhatsApp
                  </button>
                  <button className="w-full btn-gold-outline font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 transform flex items-center justify-center">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-6 h-6 mr-3"
                      fill="currentColor"
                    >
                      <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                    </svg>
                    Chiama Ora
                  </button>
                </div>
                <div className="mt-8 font-sans-modern text-center">
                  <p className="text-lg">Joyful Time Eventi</p>
                  <p>Via Roma, 123 - 73100 Lecce (LE)</p>
                  <p>info@joyfultime.it</p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 items-center mb-8">
            {/* Info aziendale */}
            <div className="text-center md:text-left">
              <h3 className="text-xl font-serif-elegant mb-2">Joyful Time</h3>
              <p className="text-sm text-gray-300">
                Via Roma, 123 - 73100 Lecce (LE)<br />
                info@joyfultime.it
              </p>
            </div>

            {/* Logo Matrimonio.com */}
            <div className="flex justify-center">
              <a
                href="https://m.matrimonio.com/musica-matrimonio/joyful-time--e208010"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110"
              >
                <img
                  src="/mat_logo.svg"
                  alt="Matrimonio.com"
                  className="h-16 opacity-80 hover:opacity-100 transition-opacity duration-300 brightness-0 invert"
                />
              </a>
            </div>

            {/* Links social */}
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-300 mb-2">Seguici sui social</p>
              <div className="flex gap-4 justify-center md:justify-end">
                <a href="#" className="text-white hover:text-orange-web transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="text-white hover:text-orange-web transition-colors duration-300">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 text-center font-sans-modern">
            <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} Joyful Time. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}