'use client';

import { useState } from 'react';
import Script from 'next/script';
import Header from '@/components/Header';

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
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
    } catch (error) {
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
          className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-blue via-white to-soft-pink overflow-hidden"
        >
          {/* Animated Background Shapes */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="shape-blob w-96 h-96 bg-electric-fuchsia top-10 -left-20 animate-bubble" style={{ animationDelay: '0s' }}></div>
            <div className="shape-blob w-80 h-80 bg-night-blue top-1/3 right-10 animate-bubble" style={{ animationDelay: '2s' }}></div>
            <div className="shape-blob w-64 h-64 bg-soft-pink bottom-20 left-1/4 animate-bubble" style={{ animationDelay: '4s' }}></div>
            <div className="shape-blob w-72 h-72 bg-soft-blue bottom-10 right-1/3 animate-float" style={{ animationDelay: '1s' }}></div>
          </div>

          {/* Glass morphism card */}
          <div className="relative text-center backdrop-blur-md bg-white/30 p-12 rounded-3xl shadow-2xl border border-white/50 max-w-3xl mx-4">
            <h2
              className="text-5xl md:text-7xl font-serif-elegant text-night-blue mb-4 opacity-0 animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              Joyful Time
            </h2>
            <p
              className="text-xl md:text-2xl font-sans-modern text-gray-800 mb-8 opacity-0 animate-fade-in"
              style={{ animationDelay: '1s' }}
            >
              Dedizione e professionalità per il tuo evento perfetto
            </p>
            <div>
                <button
                  className="bg-gradient-to-r from-electric-fuchsia to-pink-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 text-lg relative overflow-hidden group opacity-0 animate-fade-in shadow-lg hover:shadow-2xl hover:scale-105"
                  style={{ animationDelay: '1.5s' }}
                >
                  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                  <span className="relative">Scrivici su WhatsApp</span>
                </button>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="chi-siamo" className="relative py-20 bg-gradient-to-br from-white via-soft-pink/20 to-white overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-soft-blue/30 blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-40 left-20 w-60 h-60 rounded-full bg-soft-pink/30 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: '0.5s' }}
            >
              <img src="https://source.unsplash.com/random/600x800/?team,portrait,event-planner" alt="Il Team di Joyful Time" className="rounded-lg shadow-2xl"/>
            </div>
            <div
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: '1s' }}
            >
              <h3 className="text-4xl font-serif-elegant text-night-blue mb-6">Passione, Creatività, Professionalità</h3>
              <p className="font-sans-modern text-lg mb-4">
                Joyful Time nasce dalla passione per la creazione di momenti indimenticabili. Crediamo che ogni evento sia un capitolo unico nella storia di una persona, e la nostra missione è scriverlo con dedizione e professionalità.
              </p>
              <p className="font-sans-modern text-lg">
                Con anni di esperienza nel settore, il nostro team si impegna a trasformare le vostre idee in realtà, curando ogni singolo dettaglio, dall'ideazione alla realizzazione. Che sia un matrimonio da favola, una festa privata esclusiva o uno spettacolo coinvolgente, il nostro obiettivo è superare le vostre aspettative.
              </p>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="servizi" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h3 className="text-center text-4xl font-serif-elegant text-night-blue mb-12">I Nostri Servizi</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Service Card 1: Matrimoni */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl group h-96">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110" style={{backgroundImage: "url('https://source.unsplash.com/random/600x800/?wedding,ceremony')"}}></div>
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-electric-fuchsia group-hover:bg-opacity-70 transition-all duration-500"></div>
                <div className="relative h-full flex flex-col justify-end p-8 text-white">
                  <h4 className="text-3xl font-serif-elegant mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Matrimoni</h4>
                  <p className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 font-sans-modern">
                    Il vostro giorno più bello, orchestrato alla perfezione con stile, eleganza e un tocco di magia. La nostra specialità, la vostra favola.
                  </p>
                </div>
              </div>

              {/* Service Card 2: Eventi Privati */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl group h-96">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110" style={{backgroundImage: "url('https://source.unsplash.com/random/600x800/?private,party,birthday')"}}></div>
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-night-blue group-hover:bg-opacity-80 transition-all duration-500"></div>
                <div className="relative h-full flex flex-col justify-end p-8 text-white">
                  <h4 className="text-3xl font-serif-elegant mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Eventi Privati</h4>
                  <p className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 font-sans-modern">
                    Feste di compleanno, lauree o anniversari. Trasformiamo ogni occasione in un evento esclusivo e indimenticabile.
                  </p>
                </div>
              </div>

              {/* Service Card 3: Piazze & Locali */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl group h-96">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110" style={{backgroundImage: "url('https://source.unsplash.com/random/600x800/?concert,public,event')"}}></div>
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-gray-800 group-hover:bg-opacity-80 transition-all duration-500"></div>
                <div className="relative h-full flex flex-col justify-end p-8 text-white">
                  <h4 className="text-3xl font-serif-elegant mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Piazze & Locali</h4>
                  <p className="opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 font-sans-modern">
                    Portiamo musica, spettacolo e animazione in piazze, locali e manifestazioni pubbliche, creando un'atmosfera di pura energia.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="recensioni" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h3 className="text-center text-4xl font-serif-elegant text-night-blue mb-12">La Vostra Fiducia, Il Nostro Orgoglio</h3>
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
                <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-2">
                    <StarRating rating={5} />
                  </div>
                  <p className="font-sans-modern text-gray-700 italic mb-4">"Un team eccezionale! Hanno reso il nostro matrimonio una vera favola, curando ogni dettaglio con una professionalità impeccabile. Consigliatissimi!"</p>
                  <p className="font-bold text-night-blue text-right">- Maria & Luca</p>
                </div>
                {/* Testimonial 2 */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-2">
                    <StarRating rating={5} />
                  </div>
                  <p className="font-sans-modern text-gray-700 italic mb-4">"La festa di laurea è stata un successo enorme, tutto merito di Joyful Time. Divertimento, organizzazione perfetta e tanta bella musica!"</p>
                  <p className="font-bold text-night-blue text-right">- Francesca P.</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contatti" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h3 className="text-center text-4xl font-serif-elegant text-night-blue mb-12">Realizziamo Insieme il Tuo Evento</h3>
            <div className="grid lg:grid-cols-2 gap-12">
              
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h4 className="text-2xl font-serif-elegant text-night-blue mb-6">Scrivici</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-sans-modern mb-2">Nome</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-electric-fuchsia" required />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-sans-modern mb-2">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-electric-fuchsia" required />
                  </div>
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-sans-modern mb-2">Messaggio</label>
                    <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-electric-fuchsia" required></textarea>
                  </div>
                  <button type="submit" disabled={formStatus.loading} className="w-full bg-electric-fuchsia text-white font-bold py-3 px-6 rounded-full hover:bg-night-blue transition-all duration-300 disabled:bg-gray-400">
                    {formStatus.loading ? 'Invio in corso...' : 'Invia Messaggio'}
                  </button>
                  {formStatus.success && <p className="text-green-500 mt-4">{formStatus.success}</p>}
                  {formStatus.error && <p className="text-red-500 mt-4">{formStatus.error}</p>}
                </form>
              </div>

              {/* Direct Contact */}
              <div className="flex flex-col justify-center">
                <h4 className="text-2xl font-serif-elegant text-night-blue mb-6">Contatto Immediato</h4>
                <p className="font-sans-modern text-lg mb-6">Preferisci parlarci direttamente? Chiamaci o scrivici su WhatsApp per una risposta più rapida.</p>
                <div className="space-y-4">
                  <button className="w-full bg-green-500 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-all duration-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.357 1.849 6.069l-1.254 4.587 4.68-1.231zm9.35-6.448c-.273-.136-1.618-.799-1.869-.888-.251-.088-.434-.136-.617.137-.182.272-.707.888-.869 1.061-.163.173-.325.192-.601.056-.277-.137-1.176-.433-2.24-1.373-.828-.731-1.389-1.637-1.551-1.912-.162-.273-.017-.42.119-.557.121-.121.273-.318.41-.463.136-.145.182-.273.273-.455.091-.182.045-.344-.023-.481-.068-.136-.617-1.479-.844-2.021-.225-.542-.454-.466-.617-.474-.152-.008-.325-.008-.498-.008-.173 0-.455.068-.693.344-.238.273-.908.888-1.102 2.149-.194 1.26.194 2.474.39 2.691.195.217.771.888 1.865 1.666 1.094.777 1.864 1.245 2.522 1.588.658.344 1.181.273 1.54.163.381-.121 1.176-.481 1.343-.94.168-.459.168-.85.119-.94-.048-.09-.194-.136-.412-.225z"/></svg>
                    Scrivici su WhatsApp
                  </button>
                  <button className="w-full border-2 border-night-blue text-night-blue font-bold py-3 px-6 rounded-full hover:bg-night-blue hover:text-white transition-all duration-300">
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

      <footer className="bg-night-blue text-white py-8">
        <div className="container mx-auto text-center font-sans-modern">
          <p>&copy; {new Date().getFullYear()} Joyful Time. Tutti i diritti riservati.</p>
        </div>
      </footer>
    </div>
  );
}