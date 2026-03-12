/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Wind, Factory, ChefHat, Leaf, Settings, Wrench, 
  BarChart3, Phone, ShieldCheck, Zap, ArrowRight, 
  Menu, X, CheckCircle2, Activity, Droplets, ArrowLeft,
  Users, MapPin, Cpu, Recycle, Handshake, TrendingUp, History, Download, Power,
  FileText, Building2, Award, Sun, Moon, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type Tab = 'home' | 'about' | 'products' | 'services' | 'portal' | 'support' | 'careers' | 'industrial-specs' | 'restaurant-specs' | 'service-maintenance' | 'service-cleaning' | 'service-monitoring' | 'manage-mode' | 'unit-uta-01' | 'unit-uta-02' | 'unit-cap-01' | 'unit-ext-01' | 'profile' | 'theme' | 'help-resources' | 'cookie-policy' | 'privacy-policy';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = (tab: Tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-900 flex flex-col">
      <Navbar activeTab={activeTab} navigate={navigate} isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      
      <main className="pt-20 flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && <Home key="home" navigate={navigate} />}
          {activeTab === 'about' && <About key="about" />}
          {activeTab === 'products' && <Products key="products" navigate={navigate} />}
          {activeTab === 'services' && <Services key="services" navigate={navigate} />}
          {activeTab === 'portal' && <ClientPortal key="portal" navigate={navigate} />}
          {activeTab === 'support' && <Support key="support" navigate={navigate} />}
          {activeTab === 'careers' && <Careers key="careers" navigate={navigate} />}
          {activeTab === 'industrial-specs' && <IndustrialSpecs key="industrial-specs" navigate={navigate} />}
          {activeTab === 'restaurant-specs' && <RestaurantSpecs key="restaurant-specs" navigate={navigate} />}
          {activeTab === 'service-maintenance' && <ServiceMaintenance key="service-maintenance" navigate={navigate} />}
          {activeTab === 'service-cleaning' && <ServiceCleaning key="service-cleaning" navigate={navigate} />}
          {activeTab === 'service-monitoring' && <ServiceMonitoring key="service-monitoring" navigate={navigate} />}
          {activeTab === 'manage-mode' && <ManageMode key="manage-mode" navigate={navigate} />}
          {activeTab === 'unit-uta-01' && <UnitDetail key="unit-uta-01" navigate={navigate} unitId="UTA-01" />}
          {activeTab === 'unit-uta-02' && <UnitDetail key="unit-uta-02" navigate={navigate} unitId="UTA-02" />}
          {activeTab === 'unit-cap-01' && <UnitDetail key="unit-cap-01" navigate={navigate} unitId="CAP-01" />}
          {activeTab === 'unit-ext-01' && <UnitDetail key="unit-ext-01" navigate={navigate} unitId="EXT-01" />}
          {activeTab === 'profile' && <Profile key="profile" navigate={navigate} />}
          {activeTab === 'theme' && <ThemeSettings key="theme" navigate={navigate} />}
          {activeTab === 'help-resources' && <HelpResources key="help-resources" navigate={navigate} />}
          {activeTab === 'cookie-policy' && <CookiePolicy key="cookie-policy" navigate={navigate} />}
          {activeTab === 'privacy-policy' && <PrivacyPolicy key="privacy-policy" navigate={navigate} />}
        </AnimatePresence>
      </main>

      <Footer navigate={navigate} />
    </div>
  );
}

function Navbar({ activeTab, navigate, isMobileMenuOpen, setIsMobileMenuOpen }: any) {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Chi Siamo' },
    { id: 'products', label: 'Prodotti' },
    { id: 'services', label: 'Servizi' },
    { id: 'portal', label: 'Area Clienti' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('home')}>
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
              <Wind className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">GreenFlow<span className="text-emerald-600">.</span></span>
          </div>

          <div className="hidden md:flex items-center gap-1 bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => navigate(tab.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.id 
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 bg-white overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.id)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Home({ navigate }: { navigate: (tab: Tab) => void, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="absolute top-6 right-4 lg:right-8 z-20">
        <button 
          onClick={() => navigate('careers')}
          className="px-6 py-2 bg-white/90 backdrop-blur-sm text-slate-900 border border-slate-200 rounded-full font-medium shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2 text-sm"
        >
          <Users className="w-4 h-4" />
          Lavora con Noi
        </button>
      </div>

      <div className="py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-6">
            <Leaf className="w-4 h-4" />
            <span>Sostenibilità ed Efficienza</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
            L'aria pulita è il motore del tuo <span className="text-emerald-600">business.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
            Con 20 anni di esperienza, progettiamo e produciamo impianti di aerazione e aspirazione all'avanguardia per il settore industriale e ristorativo. Innovazione, risparmio energetico e qualità senza compromessi.
          </p>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => navigate('products')} className="px-8 py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors flex items-center gap-2">
              Scopri i Prodotti <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('portal')} className="px-8 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
              Area Clienti <BarChart3 className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-3xl overflow-hidden bg-slate-200 relative">
            <img 
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000" 
              alt="Impianto di aspirazione industriale" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 to-transparent"></div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-xs">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-500 font-medium">Risparmio Energetico</p>
                <p className="text-2xl font-bold text-slate-900">Fino al 45%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 border-t border-slate-200">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Perché scegliere i nostri impianti</h2>
          <p className="text-slate-600">Uniamo l'esperienza ventennale alle più recenti innovazioni tecnologiche per offrirti soluzioni su misura, efficienti e durevoli.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Zap, title: "Efficienza Energetica", desc: "Motori EC ad altissimo rendimento e sistemi di recupero calore avanzati." },
            { icon: Leaf, title: "Sostenibilità", desc: "Materiali riciclabili e abbattimento delle emissioni nocive nell'ambiente." },
            { icon: Settings, title: "Personalizzazione", desc: "Progettazione su misura per le specifiche esigenze del tuo spazio." },
            { icon: ShieldCheck, title: "Qualità Garantita", desc: "Materiali premium e collaudi rigorosi per una durata eccezionale." }
          ].map((feat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-900 mb-6 border border-slate-100">
                <feat.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{feat.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function About() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-6">
          <History className="w-4 h-4" />
          <span>Dal 1961</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
          Eccellenza Italiana, <span className="text-emerald-600">Leadership Globale</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          GreenFlow Systems S.r.l. è protagonista mondiale nella produzione di motori elettrici e ventilatori ad alte prestazioni. 
          Con oltre 60 anni di storia, uniamo tradizione ingegneristica e innovazione tecnologica per creare il futuro dell'HVAC e delle applicazioni industriali.
        </p>
      </div>

      {/* Key Stats & Plants */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mx-auto mb-4">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-2">12.000+</h3>
          <p className="text-slate-500">Dipendenti nel mondo</p>
          <p className="text-sm text-emerald-600 font-medium mt-2">250 specialisti in Italia</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mx-auto mb-4">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-2">3</h3>
          <p className="text-slate-500">Stabilimenti produttivi italiani</p>
          <p className="text-sm text-slate-600 mt-2">Mozzate (CO) • Treviglio (BG) • Caravate (VA)</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 mx-auto mb-4">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-3xl font-bold text-slate-900 mb-2">100%</h3>
          <p className="text-slate-500">Ciclo produttivo integrato</p>
          <p className="text-sm text-slate-600 mt-2">Dalla progettazione al test finale</p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-24">
        
        {/* Innovation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-4">
              <Cpu className="w-4 h-4" />
              <span>Ricerca e Sviluppo</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Tecnologia al servizio della performance</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Investiamo costantemente in R&D per sviluppare motori brushless e sistemi di controllo elettronico all'avanguardia. 
              I nostri prodotti si distinguono per leggerezza, efficienza energetica e silenziosità, garantendo prestazioni superiori anche nelle condizioni più gravose.
            </p>
            <ul className="space-y-3">
              {['Motori Brushless ad alta efficienza', 'Materiali compositi avanzati', 'Ventilatori a basso impatto acustico'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 lg:order-2 rounded-3xl overflow-hidden shadow-lg h-80 lg:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=1000" 
              alt="Laboratorio R&D GreenFlow" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Partnership Aera */}
        <div className="bg-slate-900 rounded-3xl overflow-hidden text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-sm font-medium mb-6 w-fit">
                <Handshake className="w-4 h-4" />
                <span>Partnership Strategica</span>
              </div>
              <h2 className="text-3xl font-bold mb-6">GreenFlow + Aera: L'unione fa la forza</h2>
              <p className="text-slate-300 leading-relaxed mb-8">
                La collaborazione con Aera ci permette di offrire cappe aspiranti di eccellenza. Non siamo solo fornitori, ma partner proattivi che contribuiscono al design e allo sviluppo di nuovi modelli, adattando le nostre tecnologie alle esigenze specifiche di ogni prodotto Aera.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-white mb-1">Co-Design</h4>
                  <p className="text-sm text-slate-400">Sviluppo congiunto di soluzioni su misura</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Leadership</h4>
                  <p className="text-sm text-slate-400">Consolidamento nel mercato internazionale</p>
                </div>
              </div>
            </div>
            <div className="h-80 lg:h-auto relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                alt="Collaborazione strategica" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent lg:bg-gradient-to-t"></div>
            </div>
          </div>
        </div>

        {/* Sustainability & Challenges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-lg h-80 lg:h-auto">
            <img 
              src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1000" 
              alt="Sostenibilità ambientale" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-sm font-medium mb-4">
              <Recycle className="w-4 h-4" />
              <span>Sostenibilità e Resilienza</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Sfide complesse, risposte concrete</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              In un mercato caratterizzato dalla volatilità dei costi e normative sempre più stringenti, GreenFlow Systems mantiene la leadership grazie alla capacità di adattamento.
              Sviluppiamo processi produttivi a basso impatto, utilizziamo materiali riciclabili e riduciamo le emissioni di CO2, trasformando le sfide ambientali in opportunità di innovazione.
            </p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex items-start gap-4">
                <TrendingUp className="w-6 h-6 text-emerald-600 mt-1" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Visione Futura</h4>
                  <p className="text-slate-600 text-sm mt-1">
                    Tradizione e innovazione si fondono per creare valore condiviso e garantire un futuro più sostenibile nel settore degli elettrodomestici.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function Products({ navigate }: { navigate: (tab: Tab) => void, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Le Nostre Soluzioni</h1>
        <p className="text-lg text-slate-600">Sistemi di aerazione all'avanguardia progettati specificamente per le sfide del tuo settore.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
          <div className="h-64 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000" alt="Industria" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8">
              <div className="flex items-center gap-3 text-white">
                <Factory className="w-8 h-8" />
                <h2 className="text-3xl font-bold">Settore Industriale</h2>
              </div>
            </div>
          </div>
          <div className="p-8 flex-grow flex flex-col">
            <p className="text-slate-600 mb-6 leading-relaxed">
              Impianti ad alta portata progettati per ambienti di produzione complessi. Garantiamo l'abbattimento di fumi, polveri e sostanze volatili, assicurando un ambiente di lavoro sicuro e conforme alle normative.
            </p>
            <ul className="space-y-3 mb-8 flex-grow">
              {['Sistemi di filtrazione multistadio', 'Recupero termico ad alta efficienza', 'Insonorizzazione avanzata', 'Integrazione con sistemi BMS'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => navigate('industrial-specs')}
              className="w-full py-4 bg-slate-50 text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-colors border border-slate-200"
            >
              Richiedi Specifiche Tecniche
            </button>
          </div>
        </div>

        <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
          <div className="h-64 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&q=80&w=1000" alt="Ristorazione" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-8">
              <div className="flex items-center gap-3 text-white">
                <ChefHat className="w-8 h-8" />
                <h2 className="text-3xl font-bold">Settore Ristorativo</h2>
              </div>
            </div>
          </div>
          <div className="p-8 flex-grow flex flex-col">
            <p className="text-slate-600 mb-6 leading-relaxed">
              Cappe aspiranti intelligenti e sistemi di trattamento aria per cucine professionali. Eliminiamo odori e vapori grassi mantenendo il comfort termico in cucina e in sala.
            </p>
            <ul className="space-y-3 mb-8 flex-grow">
              {['Cappe a compensazione intelligente', 'Abbattimento odori ad ozono/UV', 'Design personalizzabile in acciaio inox', 'Sistemi antincendio integrati'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => navigate('restaurant-specs')}
              className="w-full py-4 bg-slate-50 text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-colors border border-slate-200"
            >
              Richiedi Specifiche Tecniche
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Services({ navigate }: { navigate: (tab: Tab) => void, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Servizi Integrati</h1>
        <p className="text-lg text-slate-600">Non ci limitiamo a vendere un prodotto. Ti accompagniamo per tutto il ciclo di vita dell'impianto.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            id: 'service-maintenance',
            icon: Wrench,
            title: "Manutenzione Programmata",
            desc: "Piani di manutenzione preventiva per evitare fermi macchina e garantire sempre la massima efficienza del tuo impianto.",
            features: ["Check-up periodici", "Sostituzione filtri", "Taratura sensori", "Intervento prioritario"]
          },
          {
            id: 'service-cleaning',
            icon: Droplets,
            title: "Pulizia e Sanificazione",
            desc: "Interventi specializzati per la rimozione di grassi e residui, fondamentali per la sicurezza antincendio e l'igiene.",
            features: ["Pulizia condotti", "Sanificazione antibatterica", "Certificazione a norma di legge", "Prodotti ecologici"]
          },
          {
            id: 'service-monitoring',
            icon: Activity,
            title: "Monitoraggio 24/7",
            desc: "Telecontrollo continuo dei parametri di funzionamento per ottimizzare i consumi e prevenire guasti.",
            features: ["Dashboard in tempo reale", "Allarmi anomalie", "Report consumi", "Ottimizzazione remota"]
          }
        ].map((service, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
              <service.icon className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
            <p className="text-slate-600 mb-8 flex-grow">{service.desc}</p>
            <ul className="space-y-3 mb-8">
              {service.features.map((feat, j) => (
                <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  {feat}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => navigate(service.id as Tab)}
              className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors mt-auto"
            >
              Scopri di più
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ClientPortal({ navigate }: { navigate: (tab: Tab) => void, key?: React.Key }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const units = [
    { id: "UTA-01", name: "Reparto Produzione A", status: "Ottimale", power: "4.2 kW", flow: "12,000 m³/h" },
    { id: "UTA-02", name: "Reparto Produzione B", status: "Ottimale", power: "3.8 kW", flow: "10,500 m³/h" },
    { id: "CAP-01", name: "Mensa Aziendale", status: "Standby", power: "0.5 kW", flow: "0 m³/h" },
    { id: "EXT-01", name: "Estrazione Fumi Saldatura", status: "Attenzione", power: "5.1 kW", flow: "8,200 m³/h" }
  ];

  const downloadReport = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Report Stato Unità Operative', 14, 22);
    
    doc.setFontSize(11);
    doc.text('ID CLIENTE: #4920-IND-MI', 14, 30);
    doc.text(`Data: ${new Date().toLocaleDateString()}`, 14, 36);

    autoTable(doc, {
      startY: 45,
      head: [['ID Unità', 'Reparto', 'Stato', 'Potenza', 'Portata']],
      body: units.map(u => [u.id, u.name, u.status, u.power, u.flow]),
      theme: 'grid',
      headStyles: { fillColor: [16, 185, 129] } // emerald-500
    });

    doc.save('report-impianti-greenflow.pdf');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard Impianti</h1>
          <p className="text-slate-500 font-mono text-sm mt-1">ID CLIENTE: #4920-IND-MI</p>
        </div>
        <div className="flex items-center gap-3 relative">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 font-medium text-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            Sistema Online
          </div>
          <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          <AnimatePresence>
            {isSettingsOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50"
              >
                <div className="py-1">
                  {[
                    { label: 'Profilo', tab: 'profile' as Tab },
                    { label: 'Tema', tab: 'theme' as Tab },
                    { label: 'Aiuto e risorse', tab: 'help-resources' as Tab },
                    { label: 'Assistenza', tab: 'support' as Tab },
                    { label: 'Cookie policy', tab: 'cookie-policy' as Tab },
                    { label: 'Privacy policy', tab: 'privacy-policy' as Tab }
                  ].map((item, i) => (
                    <button 
                      key={i} 
                      onClick={() => navigate(item.tab)}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                  <div className="h-px bg-slate-200 my-1"></div>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    Esci
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: "EFFICIENZA GLOBALE", value: "94.2%", trend: "+2.1%", positive: true },
          { label: "RISPARMIO ENERGETICO", value: "1,240 kWh", trend: "Questo mese", positive: true },
          { label: "QUALITÀ ARIA (AQI)", value: "Eccellente", trend: "PM2.5 < 5µg/m³", positive: true },
          { label: "PROSSIMA MANUTENZIONE", value: "12 Nov 2026", trend: "Tra 45 giorni", positive: false }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-xs font-mono text-slate-500 mb-2">{kpi.label}</p>
            <p className="text-3xl font-bold text-slate-900 mb-2">{kpi.value}</p>
            <p className={`text-sm font-medium ${kpi.positive ? 'text-emerald-600' : 'text-amber-600'}`}>
              {kpi.trend}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
            <h2 className="text-lg font-bold text-slate-900">Stato Unità Operative</h2>
            <button onClick={downloadReport} className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              <Download className="w-4 h-4" /> Scarica Report
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {units.map((unit, i) => (
              <div 
                key={i} 
                onClick={() => navigate(`unit-${unit.id.toLowerCase()}` as Tab)}
                className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-2 h-10 rounded-full ${unit.status === 'Ottimale' ? 'bg-emerald-500' : unit.status === 'Standby' ? 'bg-slate-300' : 'bg-amber-500'}`}></div>
                  <div>
                    <p className="font-bold text-slate-900">{unit.id}</p>
                    <p className="text-sm text-slate-500">{unit.name}</p>
                  </div>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-mono text-slate-600">
                  <div className="text-right">
                    <p className="text-xs text-slate-400">POTENZA</p>
                    <p>{unit.power}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">PORTATA</p>
                    <p>{unit.flow}</p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Wind className="w-32 h-32" />
            </div>
            <h3 className="text-lg font-bold mb-2 relative z-10">Modalità Eco Attiva</h3>
            <p className="text-slate-400 text-sm mb-6 relative z-10">Il sistema sta ottimizzando i consumi in base all'occupazione degli ambienti.</p>
            <div className="flex items-center justify-between relative z-10">
              <span className="text-2xl font-bold text-emerald-400">-15% Consumi</span>
              <button 
                onClick={() => navigate('manage-mode')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm"
              >
                Gestisci
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Richiedi Assistenza</h3>
            <p className="text-sm text-slate-600 mb-4">Hai bisogno di un intervento tecnico o di una pulizia straordinaria?</p>
            <button 
              onClick={() => navigate('support')}
              className="w-full py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl font-medium hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" /> Contatta Supporto
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ManageMode({ navigate }: { navigate: (tab: Tab) => void, key?: React.Key }) {
  const [activeMode, setActiveMode] = useState<'eco' | 'stable' | 'performance'>('eco');
  const [isSystemOn, setIsSystemOn] = useState(true);

  const modes = [
    { id: 'eco', name: 'Eco', desc: 'Ottimizza i consumi energetici riducendo la portata quando i reparti non sono a pieno regime. Ideale per le ore notturne o di bassa attività.', icon: Leaf, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200' },
    { id: 'stable', name: 'Stabile', desc: 'Mantiene un flusso costante e bilanciato in tutti i reparti. Consigliato per le normali ore lavorative.', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-200' },
    { id: 'performance', name: 'Alte Prestazioni', desc: 'Massima potenza di aspirazione e ventilazione per gestire picchi di produzione o situazioni di emergenza.', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-200' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative"
    >
      <button 
        onClick={() => navigate('portal')}
        className="absolute top-12 left-4 lg:left-8 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-600 rounded-full shadow-sm border border-slate-200 transition-all z-20 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Gestione Modalità Impianto</h1>
        <p className="text-lg text-slate-600">Configura le prestazioni del sistema in base alle tue esigenze operative.</p>
      </div>

      {/* Top Section: Active Mode & Power */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${isSystemOn ? modes.find(m => m.id === activeMode)?.bg : 'bg-slate-100'} ${isSystemOn ? modes.find(m => m.id === activeMode)?.color : 'text-slate-400'}`}>
            {isSystemOn ? (
              activeMode === 'eco' ? <Leaf className="w-10 h-10" /> :
              activeMode === 'stable' ? <Activity className="w-10 h-10" /> :
              <Zap className="w-10 h-10" />
            ) : <Power className="w-10 h-10" />}
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Stato Sistema</p>
            <h2 className="text-3xl font-bold text-slate-900">
              {isSystemOn ? `Modalità ${modes.find(m => m.id === activeMode)?.name}` : 'Impianto Spento'}
            </h2>
          </div>
        </div>
        <button 
          onClick={() => setIsSystemOn(!isSystemOn)}
          className={`px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 transition-all ${isSystemOn ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30'}`}
        >
          <Power className="w-6 h-6" />
          {isSystemOn ? 'Spegni Impianto' : 'Accendi Impianto'}
        </button>
      </div>

      {/* Middle Section: Mode Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {modes.map(mode => (
          <div 
            key={mode.id}
            onClick={() => { if(isSystemOn) setActiveMode(mode.id as any) }}
            className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${activeMode === mode.id && isSystemOn ? mode.border + ' ' + mode.bg : 'border-slate-100 bg-white hover:border-slate-200'} ${!isSystemOn && 'opacity-50 cursor-not-allowed'}`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${activeMode === mode.id && isSystemOn ? 'bg-white shadow-sm' : mode.bg} ${mode.color}`}>
                <mode.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{mode.name}</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{mode.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom Section: Stats & Departments */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Wind className="w-64 h-64" />
        </div>
        <h3 className="text-2xl font-bold mb-8 relative z-10">Statistiche e Portata Attuale</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10 mb-12">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <p className="text-slate-400 text-sm mb-2">Portata Totale</p>
            <p className="text-3xl font-bold">
              {!isSystemOn ? '0' : activeMode === 'eco' ? '22,500' : activeMode === 'stable' ? '30,700' : '45,000'} <span className="text-lg font-normal text-slate-400">m³/h</span>
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <p className="text-slate-400 text-sm mb-2">Potenza Assorbita</p>
            <p className="text-3xl font-bold">
              {!isSystemOn ? '0' : activeMode === 'eco' ? '8.5' : activeMode === 'stable' ? '13.6' : '22.4'} <span className="text-lg font-normal text-slate-400">kW</span>
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <p className="text-slate-400 text-sm mb-2">Efficienza (COP)</p>
            <p className="text-3xl font-bold">
              {!isSystemOn ? '-' : activeMode === 'eco' ? '4.8' : activeMode === 'stable' ? '4.2' : '3.5'}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
            <p className="text-slate-400 text-sm mb-2">Risparmio Stimato</p>
            <p className="text-3xl font-bold text-emerald-400">
              {!isSystemOn ? '-' : activeMode === 'eco' ? '+35%' : activeMode === 'stable' ? 'Normale' : '-15%'}
            </p>
          </div>
        </div>

        <h4 className="text-lg font-bold mb-6 text-slate-300 relative z-10">Capacità per Reparto</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {[
            { name: 'Reparto Produzione A', eco: '45%', stable: '70%', perf: '100%' },
            { name: 'Reparto Produzione B', eco: '40%', stable: '65%', perf: '100%' },
            { name: 'Mensa Aziendale', eco: '20%', stable: '50%', perf: '80%' },
            { name: 'Estrazione Fumi Saldatura', eco: '60%', stable: '85%', perf: '100%' }
          ].map((dept, i) => (
            <div key={i} className="bg-slate-800/50 p-4 rounded-xl flex items-center justify-between border border-slate-700">
              <span className="font-medium">{dept.name}</span>
              <div className="flex items-center gap-3">
                <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${!isSystemOn ? 'w-0' : activeMode === 'eco' ? 'bg-emerald-500' : activeMode === 'stable' ? 'bg-blue-500' : 'bg-amber-500'}`}
                    style={{ width: !isSystemOn ? '0%' : activeMode === 'eco' ? dept.eco : activeMode === 'stable' ? dept.stable : dept.perf }}
                  ></div>
                </div>
                <span className="text-sm font-mono w-12 text-right text-slate-400">
                  {!isSystemOn ? '0%' : activeMode === 'eco' ? dept.eco : activeMode === 'stable' ? dept.stable : dept.perf}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function UnitDetail({ navigate, unitId }: { navigate: (tab: Tab) => void, unitId: string, key?: React.Key }) {
  const unitsData: Record<string, any> = {
    "UTA-01": { name: "Reparto Produzione A", status: "Ottimale", power: "4.2 kW", flow: "12,000 m³/h", temp: "22.5°C", humidity: "45%", filter: "85%", lastMaint: "12 Set 2025" },
    "UTA-02": { name: "Reparto Produzione B", status: "Ottimale", power: "3.8 kW", flow: "10,500 m³/h", temp: "23.1°C", humidity: "42%", filter: "78%", lastMaint: "05 Ott 2025" },
    "CAP-01": { name: "Mensa Aziendale", status: "Standby", power: "0.5 kW", flow: "0 m³/h", temp: "20.0°C", humidity: "50%", filter: "92%", lastMaint: "20 Nov 2025" },
    "EXT-01": { name: "Estrazione Fumi Saldatura", status: "Attenzione", power: "5.1 kW", flow: "8,200 m³/h", temp: "26.8°C", humidity: "35%", filter: "15%", lastMaint: "10 Ago 2025" }
  };

  const unit = unitsData[unitId];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative"
    >
      <button 
        onClick={() => navigate('portal')}
        className="absolute top-12 left-4 lg:left-8 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-600 rounded-full shadow-sm border border-slate-200 transition-all z-20 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-2">
          <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${unit.status === 'Ottimale' ? 'bg-emerald-100 text-emerald-700' : unit.status === 'Standby' ? 'bg-slate-200 text-slate-700' : 'bg-amber-100 text-amber-700'}`}>
            Stato: {unit.status}
          </div>
          <p className="text-slate-500 font-mono text-sm">ID: {unitId}</p>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-8">{unit.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><Activity className="w-5 h-5 text-emerald-600" /> Parametri Operativi</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Potenza Attuale</span>
                  <span className="font-bold text-slate-900">{unit.power}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="w-3/4 h-full bg-blue-500"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Portata Aria</span>
                  <span className="font-bold text-slate-900">{unit.flow}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="w-4/5 h-full bg-emerald-500"></div></div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Temperatura</p>
                  <p className="text-xl font-bold text-slate-900">{unit.temp}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Umidità</p>
                  <p className="text-xl font-bold text-slate-900">{unit.humidity}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2"><Wrench className="w-5 h-5 text-emerald-600" /> Manutenzione</h3>
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-sm text-slate-500 mb-1">Ultimo Intervento</p>
                <p className="font-bold text-slate-900">{unit.lastMaint}</p>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Stato Filtri</span>
                  <span className={`font-bold ${parseInt(unit.filter) < 20 ? 'text-red-600' : 'text-emerald-600'}`}>{unit.filter} Residuo</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${parseInt(unit.filter) < 20 ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: unit.filter }}></div>
                </div>
                {parseInt(unit.filter) < 20 && (
                  <p className="text-xs text-red-600 mt-2 flex items-center gap-1"><Zap className="w-3 h-3" /> Sostituzione filtri consigliata a breve</p>
                )}
              </div>

              <button 
                onClick={() => navigate('support')}
                className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
              >
                Richiedi Intervento
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Support({ navigate }: { navigate: (tab: Tab) => void, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative"
    >
      <button 
        onClick={() => navigate('portal')}
        className="absolute top-12 left-4 lg:left-8 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-600 rounded-full shadow-sm border border-slate-200 transition-all z-20 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Supporto e Assistenza</h1>
        <p className="text-lg text-slate-600">Siamo sempre al tuo fianco per garantire la massima efficienza dei tuoi impianti GreenFlow.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-emerald-900 text-white p-8 rounded-3xl shadow-lg">
            <h3 className="text-2xl font-bold mb-6">Contatti Diretti</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-emerald-200 mb-1">Numero Verde Assistenza</p>
                  <p className="text-xl font-semibold">+39 339 211 9179</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-emerald-200 mb-1">Orari di Servizio</p>
                  <p className="text-lg font-medium">Lunedì - Sabato</p>
                  <p className="text-emerald-100">08:00 - 20:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">In cosa consiste la nostra assistenza?</h2>
            
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">Pronto Intervento Tecnico</h4>
                  <p className="text-slate-600 leading-relaxed">
                    I nostri tecnici specializzati sono pronti a intervenire rapidamente in caso di guasti o malfunzionamenti. Grazie alla diagnostica da remoto, spesso riusciamo a individuare il problema prima ancora di arrivare sul posto, riducendo al minimo i tempi di fermo impianto.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">Manutenzione e Pulizia Straordinaria</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Offriamo servizi di bonifica e sanificazione profonda delle condotte aerauliche e delle cappe aspiranti. Utilizziamo prodotti ecologici e tecnologie all'avanguardia per rimuovere grassi e residui, prevenendo il rischio di incendi e garantendo la salubrità dell'aria.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Settings className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-2">Ottimizzazione e Aggiornamento</h4>
                  <p className="text-slate-600 leading-relaxed">
                    Il nostro supporto non si limita alle riparazioni. Ti aiutiamo a ottimizzare i parametri di funzionamento del tuo impianto per massimizzare il risparmio energetico e ti proponiamo aggiornamenti software e hardware per mantenere il tuo sistema sempre efficiente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Careers({ navigate }: { navigate: (tab: Tab) => void, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative"
    >
      <button 
        onClick={() => navigate('home')}
        className="absolute top-12 left-4 lg:left-8 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-600 rounded-full shadow-sm border border-slate-200 transition-all z-20 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Lavora con Noi</h1>
        <p className="text-lg text-slate-600">Entra a far parte di un team internazionale che sta plasmando il futuro dell'HVAC.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Contatti Aziendali</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Telefono Azienda</p>
                  <p className="text-lg font-semibold text-slate-900">+39 339 211 9179</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="text-lg font-semibold text-slate-900">info@greenflow.it</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Assistenza Tecnica</p>
                  <p className="text-lg font-semibold text-slate-900">Lun-Sab 08:00 - 20:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-lg text-center">
            <h2 className="text-3xl font-bold mb-4 font-mono">Invia il tuo CV</h2>
            <p className="text-slate-300 mb-8">
              Siamo sempre alla ricerca di talenti appassionati di innovazione e sostenibilità.
            </p>
            <form className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Nome e Cognome</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500" placeholder="Inserisci il tuo nome e cognome" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500" placeholder="Inserisci la tua email" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Posizione di interesse</label>
                <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500">
                  <option>Ingegnere HVAC</option>
                  <option>Tecnico Manutentore</option>
                  <option>Sviluppatore Software</option>
                  <option>Commerciale</option>
                  <option>Altro</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Allega CV (PDF)</label>
                <input type="file" accept=".pdf" className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
              </div>
              <button type="button" className="w-full py-4 bg-emerald-500 text-white rounded-xl font-bold hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 mt-4">
                Invia
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl overflow-hidden h-64 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" 
              alt="Ufficio GreenFlow" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-64 shadow-md mt-8">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
              alt="Team al lavoro" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-64 shadow-md">
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000" 
              alt="Meeting room" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="rounded-2xl overflow-hidden h-64 shadow-md mt-8">
            <img 
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000" 
              alt="Presentazione aziendale" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function IndustrialSpecs({ navigate }: { navigate: (tab: Tab) => void, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative"
    >
      <button 
        onClick={() => navigate('products')}
        className="absolute top-12 left-4 lg:left-8 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-600 rounded-full shadow-sm border border-slate-200 transition-all z-20 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Specifiche Tecniche Industriali</h1>
        <p className="text-lg text-slate-600">Eccellenza tecnologica per la massima efficienza produttiva e ambientale.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Activity className="w-6 h-6 text-emerald-600" />
              Prestazioni e Valori
            </h3>
            <div className="space-y-4">
              {[
                { label: "Portata d'aria", value: "Fino a 120.000 m³/h" },
                { label: "Pressione statica", value: "Fino a 3.500 Pa" },
                { label: "Efficienza Motori", value: "IE5 Ultra-Premium" },
                { label: "Recupero Termico", value: "> 93% (EN 308)" },
                { label: "Livello Sonoro", value: "< 65 dB(A) a 3m" },
                { label: "Filtrazione", value: "ISO ePM1 85% (F9)" }
              ].map((spec, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                  <span className="text-slate-600 font-medium">{spec.label}</span>
                  <span className="text-slate-900 font-bold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              Certificazioni
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {['CE Compliance', 'Eurovent Certified', 'ISO 9001:2015', 'ISO 14001:2015', 'ErP 2018 Ready', 'ATEX Option'].map((cert, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-700 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200">
            <img 
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1000" 
              alt="Impianto di aspirazione industriale innovativo" 
              className="w-full h-64 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-6 bg-white">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Design Modulare Avanzato</h4>
              <p className="text-slate-600 text-sm">Struttura in alluminio a taglio termico T2/TB2 per la massima efficienza energetica e assenza di ponti termici.</p>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <BarChart3 className="w-32 h-32" />
            </div>
            <h3 className="text-2xl font-bold mb-6 relative z-10">Efficientamento Garantito</h3>
            <div className="space-y-6 relative z-10">
              <div>
                <div className="flex justify-between text-sm mb-2 text-slate-300">
                  <span>Risparmio Energetico</span>
                  <span className="text-emerald-400 font-bold">45%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[45%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2 text-slate-300">
                  <span>Riduzione Rumore</span>
                  <span className="text-emerald-400 font-bold">35%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[35%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2 text-slate-300">
                  <span>Riduzione CO2</span>
                  <span className="text-emerald-400 font-bold">60%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[60%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 lg:p-12 text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-6">
          <Zap className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-emerald-900 mb-4">Offerta Controllo Gratuito</h2>
        <p className="text-emerald-800 text-lg max-w-2xl mx-auto mb-8">
          Richiedi un check-up completo dei tuoi vecchi impianti. Analizzeremo gratuitamente consumi occulti, livelli di inquinamento e inefficienze sonore per proporti un piano di miglioramento.
        </p>
        <div className="bg-white inline-block px-8 py-4 rounded-2xl shadow-sm border border-emerald-100">
          <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Per richiedere un preventivo</p>
          <p className="text-2xl font-bold text-slate-900">chiama il numero <span className="text-emerald-600">+39 339 211 9179</span></p>
        </div>
      </div>
    </motion.div>
  );
}

function RestaurantSpecs({ navigate }: { navigate: (tab: Tab) => void, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative"
    >
      <button 
        onClick={() => navigate('products')}
        className="absolute top-12 left-4 lg:left-8 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-600 rounded-full shadow-sm border border-slate-200 transition-all z-20 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Specifiche Tecniche Ristorazione</h1>
        <p className="text-lg text-slate-600">Sicurezza, igiene e comfort per le cucine professionali più esigenti.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <ChefHat className="w-6 h-6 text-emerald-600" />
              Tecnologia Cappe
            </h3>
            <div className="space-y-4">
              {[
                { label: "Efficienza Filtrazione Grassi", value: "> 98% (UL 1046)" },
                { label: "Abbattimento Odori", value: "Ozono + UV-C" },
                { label: "Portata Aspirazione", value: "Calcolo VDI 2052" },
                { label: "Rumorosità in cucina", value: "< 55 dB(A)" },
                { label: "Costruzione", value: "AISI 304 Scotch Brite" },
                { label: "Sicurezza Antincendio", value: "Integrata (ANSUL)" }
              ].map((spec, i) => (
                <div key={i} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                  <span className="text-slate-600 font-medium">{spec.label}</span>
                  <span className="text-slate-900 font-bold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              Conformità Normativa
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {['HACCP Compliant', 'UNI 10339', 'EN 16282', 'CE Certified', 'Fire Safe', 'Eco Design'].map((cert, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-700 bg-slate-50 px-4 py-3 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-medium">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200">
            <img 
              src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1000" 
              alt="Cucina professionale moderna" 
              className="w-full h-64 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-6 bg-white">
              <h4 className="text-lg font-bold text-slate-900 mb-2">Sistemi a Flusso Bilanciato</h4>
              <p className="text-slate-600 text-sm">Cappe a induzione che riducono il volume d'aria trattata fino al 40% mantenendo la massima efficacia di captazione.</p>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Wind className="w-32 h-32" />
            </div>
            <h3 className="text-2xl font-bold mb-6 relative z-10">Performance di Abbattimento</h3>
            <div className="space-y-6 relative z-10">
              <div>
                <div className="flex justify-between text-sm mb-2 text-slate-300">
                  <span>Odori (Tecnologia UV-C/Ozono)</span>
                  <span className="text-emerald-400 font-bold">42%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[42%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2 text-slate-300">
                  <span>Grassi e Vapori</span>
                  <span className="text-emerald-400 font-bold">98%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[98%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2 text-slate-300">
                  <span>Sicurezza Antincendio</span>
                  <span className="text-emerald-400 font-bold">100%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[100%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 rounded-3xl p-8 lg:p-12 text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-6">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-bold text-emerald-900 mb-4">Check-up Gratuito Sicurezza e Odori</h2>
        <p className="text-emerald-800 text-lg max-w-2xl mx-auto mb-8">
          Non rischiare sanzioni o lamentele. Offriamo un controllo gratuito dei tuoi attuali impianti per rilevare fughe di odori, inefficienze e rischi antincendio dovuti a sistemi obsoleti.
        </p>
        <div className="bg-white inline-block px-8 py-4 rounded-2xl shadow-sm border border-emerald-100">
          <p className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Per richiedere un preventivo</p>
          <p className="text-2xl font-bold text-slate-900">chiama il numero <span className="text-emerald-600">+39 339 211 9179</span></p>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceMaintenance({ navigate }: { navigate: (tab: Tab) => void, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative"
    >
      <button 
        onClick={() => navigate('services')}
        className="absolute top-12 left-4 lg:left-0 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-600 rounded-full shadow-sm border border-slate-200 transition-all z-20 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 p-12 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
            <Wrench className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Manutenzione Programmata</h1>
          <p className="text-slate-400 max-w-xl mx-auto">La prevenzione è la chiave per la longevità del tuo impianto.</p>
        </div>
        <div className="p-8 lg:p-12">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Cosa include il servizio:</h3>
          <ul className="space-y-4 mb-8">
            {[
              "Ispezione completa di motori, cinghie e cuscinetti",
              "Verifica e taratura dei sistemi di regolazione e sonde",
              "Controllo serraggio connessioni elettriche",
              "Verifica allineamento pulegge e tensionamento cinghie",
              "Controllo efficienza batterie di scambio termico",
              "Report dettagliato con analisi predittiva guasti"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-2">Perché abbonarsi?</h4>
            <p className="text-slate-600 text-sm">I clienti con contratto di manutenzione hanno priorità di intervento garantita entro 4 ore e sconti sui ricambi originali.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceCleaning({ navigate }: { navigate: (tab: Tab) => void, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative"
    >
      <button 
        onClick={() => navigate('services')}
        className="absolute top-12 left-4 lg:left-0 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-600 rounded-full shadow-sm border border-slate-200 transition-all z-20 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-emerald-900 p-12 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
            <Droplets className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Pulizia e Sanificazione</h1>
          <p className="text-emerald-200 max-w-xl mx-auto">Igiene certificata e sicurezza antincendio per i tuoi condotti.</p>
        </div>
        <div className="p-8 lg:p-12">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Il nostro protocollo di intervento:</h3>
          <ul className="space-y-4 mb-8">
            {[
              "Videoispezione preliminare robotizzata",
              "Spazzolatura meccanica e aspirazione con filtri HEPA",
              "Sgrassaggio con schiume attive ecologiche",
              "Sanificazione finale con prodotti virucidi certificati",
              "Rilascio certificazione di avvenuta bonifica (D.Lgs 81/08)",
              "Analisi microbiologica pre e post intervento (opzionale)"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
            <h4 className="font-bold text-emerald-900 mb-2">Sicurezza Antincendio</h4>
            <p className="text-emerald-800 text-sm">La rimozione periodica dei grassi dai condotti è obbligatoria per legge e fondamentale per prevenire incendi devastanti nelle cucine professionali.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceMonitoring({ navigate }: { navigate: (tab: Tab) => void, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative"
    >
      <button 
        onClick={() => navigate('services')}
        className="absolute top-12 left-4 lg:left-0 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-600 rounded-full shadow-sm border border-slate-200 transition-all z-20 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-indigo-900 p-12 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
            <Activity className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Monitoraggio 24/7</h1>
          <p className="text-indigo-200 max-w-xl mx-auto">Il controllo totale del tuo impianto, ovunque tu sia.</p>
        </div>
        <div className="p-8 lg:p-12">
          <h3 className="text-xl font-bold text-slate-900 mb-6">Funzionalità del sistema GreenFlow Connect:</h3>
          <ul className="space-y-4 mb-8">
            {[
              "Dashboard cloud accessibile da smartphone e PC",
              "Monitoraggio in tempo reale di consumi, temperature e portate",
              "Notifiche push immediate in caso di anomalie o guasti",
              "Storico dati illimitato per analisi trend energetici",
              "Possibilità di teleassistenza da parte dei nostri tecnici",
              "Integrazione con i principali sistemi BMS aziendali"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
            <h4 className="font-bold text-indigo-900 mb-2">Risparmio Intelligente</h4>
            <p className="text-indigo-800 text-sm">I nostri algoritmi di AI ottimizzano automaticamente il funzionamento dell'impianto in base alle reali necessità, riducendo i consumi fino al 25%.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Footer({ navigate }: { navigate?: (tab: Tab) => void }) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white">
                <Wind className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">GreenFlow<span className="text-emerald-500">.</span></span>
            </div>
            <p className="text-sm max-w-sm leading-relaxed">
              Soluzioni avanzate per l'aerazione e l'aspirazione industriale e ristorativa. 20 anni di innovazione, efficienza e sostenibilità.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contatti</h4>
            <ul className="space-y-2 text-sm">
              <li>Via Rossaro, 14</li>
              <li>24047 Treviglio (BG), Italia</li>
              <li>info@greenflow.it</li>
              <li>+39 339 211 9179</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Certificazioni</h4>
            <ul className="space-y-2 text-sm">
              <li>ISO 9001:2015</li>
              <li>ISO 14001:2015</li>
              <li>Certificazione CE</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} GreenFlow Systems S.r.l. Tutti i diritti riservati.</p>
          <div className="flex gap-4">
            {navigate ? (
              <>
                <button onClick={() => navigate('privacy-policy')} className="hover:text-white transition-colors">Privacy Policy</button>
                <button onClick={() => navigate('cookie-policy')} className="hover:text-white transition-colors">Cookie Policy</button>
              </>
            ) : (
              <>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

function PrivacyPolicy({ navigate }: { navigate: (tab: Tab) => void, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative"
    >
      <button 
        onClick={() => navigate('home')}
        className="absolute top-12 left-4 lg:left-0 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-600 rounded-full shadow-sm border border-slate-200 transition-all z-20 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 lg:p-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="lead text-lg text-slate-600 mb-6">
            Informativa sul trattamento dei dati personali ai sensi dell'art. 13 del Regolamento (UE) 2016/679 (GDPR).
          </p>
          
          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Titolare del Trattamento</h3>
          <p className="text-slate-600 mb-4">
            Il Titolare del trattamento è GreenFlow Systems S.r.l., con sede legale in Via Rossaro, 14 - 24047 Treviglio (BG), Italia, P.IVA IT 13759798500.
          </p>
          
          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Dati raccolti e finalità</h3>
          <p className="text-slate-600 mb-4">Raccogliamo e trattiamo i seguenti dati personali:</p>
          <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
            <li><strong>Dati di navigazione:</strong> indirizzi IP, nomi a dominio dei computer utilizzati dagli utenti, URI delle risorse richieste, orario della richiesta.</li>
            <li><strong>Dati forniti volontariamente:</strong> nome, cognome, indirizzo email, numero di telefono, dati inseriti nei form di contatto o candidatura.</li>
          </ul>
          <p className="text-slate-600 mb-4">Le finalità del trattamento includono:</p>
          <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
            <li>Fornitura dei servizi richiesti e gestione dell'Area Clienti.</li>
            <li>Risposta a richieste di informazioni o assistenza.</li>
            <li>Valutazione delle candidature spontanee (sezione Lavora con Noi).</li>
            <li>Adempimento di obblighi di legge.</li>
          </ul>
          
          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Modalità del trattamento e conservazione</h3>
          <p className="text-slate-600 mb-4">
            Il trattamento viene effettuato mediante strumenti informatici e telematici, con logiche strettamente correlate alle finalità indicate e, comunque, in modo da garantire la sicurezza e la riservatezza dei dati stessi. I dati saranno conservati per il tempo strettamente necessario a conseguire gli scopi per cui sono stati raccolti.
          </p>
          
          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Diritti dell'interessato</h3>
          <p className="text-slate-600 mb-4">
            In qualità di interessato, hai il diritto di chiedere al Titolare l'accesso ai tuoi dati personali, la rettifica, la cancellazione degli stessi, la limitazione del trattamento o di opporti al loro trattamento, oltre al diritto alla portabilità dei dati. Puoi esercitare questi diritti contattandoci all'indirizzo info@greenflow.it.
          </p>
          
          <p className="text-sm text-slate-500 mt-12 pt-6 border-t border-slate-100">
            Ultimo aggiornamento: Ottobre 2023
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function CookiePolicy({ navigate }: { navigate: (tab: Tab) => void, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative"
    >
      <button 
        onClick={() => navigate('home')}
        className="absolute top-12 left-4 lg:left-0 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-600 rounded-full shadow-sm border border-slate-200 transition-all z-20 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 lg:p-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Cookie Policy</h1>
        
        <div className="prose prose-slate max-w-none">
          <p className="lead text-lg text-slate-600 mb-6">
            La presente Cookie Policy spiega come GreenFlow Systems S.r.l. utilizza i cookie e tecnologie simili per riconoscerti quando visiti il nostro sito web.
          </p>
          
          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Cosa sono i cookie?</h3>
          <p className="text-slate-600 mb-4">
            I cookie sono piccoli file di dati che vengono inseriti sul tuo computer o dispositivo mobile quando visiti un sito web. I cookie sono ampiamente utilizzati dai proprietari di siti web per far funzionare i loro siti, o per farli funzionare in modo più efficiente, nonché per fornire informazioni di reportistica.
          </p>
          
          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Come utilizziamo i cookie?</h3>
          <p className="text-slate-600 mb-4">Utilizziamo i cookie per i seguenti scopi:</p>
          <ul className="list-disc pl-6 text-slate-600 mb-6 space-y-2">
            <li><strong>Cookie Essenziali:</strong> Necessari per fornirti i servizi disponibili attraverso il nostro sito web e per utilizzare alcune delle sue funzionalità.</li>
            <li><strong>Cookie di Prestazione e Funzionalità:</strong> Utilizzati per migliorare le prestazioni e la funzionalità del nostro sito web ma non sono essenziali per il suo utilizzo.</li>
            <li><strong>Cookie Analitici e di Personalizzazione:</strong> Raccolgono informazioni che vengono utilizzate in forma aggregata per aiutarci a capire come viene utilizzato il nostro sito web o quanto sono efficaci le nostre campagne di marketing.</li>
          </ul>
          
          <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Come posso controllare i cookie?</h3>
          <p className="text-slate-600 mb-4">
            Hai il diritto di decidere se accettare o rifiutare i cookie. Puoi esercitare i tuoi diritti sui cookie impostando le tue preferenze nel Cookie Consent Manager. Puoi anche impostare o modificare i controlli del tuo browser web per accettare o rifiutare i cookie.
          </p>
          
          <p className="text-sm text-slate-500 mt-12 pt-6 border-t border-slate-100">
            Ultimo aggiornamento: Ottobre 2023
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function HelpResources({ navigate }: { navigate: (tab: Tab) => void, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative"
    >
      <button 
        onClick={() => navigate('portal')}
        className="absolute top-12 left-4 lg:left-0 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-600 rounded-full shadow-sm border border-slate-200 transition-all z-20 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 p-12 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Aiuto e Risorse</h1>
          <p className="text-slate-400 max-w-xl mx-auto">Informazioni aziendali, certificazioni e documentazione legale.</p>
        </div>
        
        <div className="p-8 lg:p-12 space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-emerald-500" />
              Dati Societari
            </h2>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-500">Ragione Sociale</p>
                  <p className="font-medium text-slate-900">GreenFlow Systems S.r.l.</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Partita IVA / C.F.</p>
                  <p className="font-medium text-slate-900">IT 13759798500</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Sede Legale ed Operativa</p>
                  <p className="font-medium text-slate-900">Via Rossaro, 14 - 24047 Treviglio (BG), Italia</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Capitale Sociale</p>
                  <p className="font-medium text-slate-900">€ 2.600.000,00 i.v.</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">REA</p>
                  <p className="font-medium text-slate-900">BG - 374510</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">PEC</p>
                  <p className="font-medium text-slate-900">greenflow@pec.it</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Award className="w-6 h-6 text-emerald-500" />
              Certificazioni Aziendali
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-slate-200 rounded-xl flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">ISO 9001:2015</h4>
                  <p className="text-sm text-slate-500">Sistema di Gestione per la Qualità</p>
                </div>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">ISO 14001:2015</h4>
                  <p className="text-sm text-slate-500">Sistema di Gestione Ambientale</p>
                </div>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Certificazione CE</h4>
                  <p className="text-sm text-slate-500">Conformità Europea sui Prodotti</p>
                </div>
              </div>
              <div className="p-4 border border-slate-200 rounded-xl flex items-start gap-4">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 shrink-0">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">F-Gas</h4>
                  <p className="text-sm text-slate-500">Certificazione per gas fluorurati</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
}

function ThemeSettings({ navigate }: { navigate: (tab: Tab) => void, key?: React.Key }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative"
    >
      <button 
        onClick={() => navigate('portal')}
        className="absolute top-12 left-4 lg:left-0 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-600 rounded-full shadow-sm border border-slate-200 transition-all z-20 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 lg:p-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-8">Impostazioni Tema</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button 
              onClick={() => setTheme('light')}
              className={`p-6 rounded-2xl border-2 text-left transition-all ${theme === 'light' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-slate-300'}`}
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-sm mb-4">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Tema Chiaro</h3>
              <p className="text-slate-500 text-sm">L'aspetto predefinito, ottimizzato per la leggibilità in ambienti luminosi.</p>
            </button>
            
            <button 
              onClick={() => setTheme('dark')}
              className={`p-6 rounded-2xl border-2 text-left transition-all ${theme === 'dark' ? 'border-emerald-500 bg-slate-800' : 'border-slate-200 hover:border-slate-300 bg-slate-50'}`}
            >
              <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-sm mb-4">
                <Moon className="w-6 h-6" />
              </div>
              <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Tema Scuro</h3>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Ideale per ambienti poco illuminati o per ridurre l'affaticamento visivo.</p>
            </button>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 text-blue-800 rounded-xl flex gap-3 text-sm">
            <Info className="w-5 h-5 shrink-0" />
            <p>Nota: Il cambio del tema è attualmente in fase di sviluppo e verrà applicato a tutta l'interfaccia nei prossimi aggiornamenti.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Profile({ navigate }: { navigate: (tab: Tab) => void, key?: React.Key }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative"
    >
      <button 
        onClick={() => navigate('portal')}
        className="absolute top-12 left-4 lg:left-0 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-600 rounded-full shadow-sm border border-slate-200 transition-all z-20 group"
      >
        <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 p-12 text-center">
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mx-auto mb-6 text-3xl font-bold">
            MR
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Mario Rossi</h1>
          <p className="text-slate-400">Amministratore Impianto</p>
        </div>
        
        <div className="p-8 lg:p-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Informazioni Account</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500">ID Cliente</p>
                  <p className="font-medium text-slate-900">CLI-2023-8942</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email</p>
                  <p className="font-medium text-slate-900">info@HSpharma.com</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Telefono</p>
                  <p className="font-medium text-slate-900">+39 333 376 5893</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Creazione Profilo</p>
                  <p className="font-medium text-slate-900">15 Gennaio 2023</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Dettagli Impianto</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500">Localizzazione Impianto</p>
                  <p className="font-medium text-slate-900">Stabilimento Nord - Via Gardini, 37</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Tipo Impianto</p>
                  <p className="font-medium text-slate-900">HVAC Industriale Avanzato</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Stato Abbonamento</p>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mt-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Premium Attivo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
