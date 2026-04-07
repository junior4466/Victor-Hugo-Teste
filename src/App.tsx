/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight, 
  Instagram, 
  Facebook, 
  Search,
  User
} from 'lucide-react';
import { PRODUCTS, Product } from './types';

// --- Components ---

const Navbar = ({ 
  onNavigate, 
  cartCount, 
  onOpenCart 
}: { 
  onNavigate: (page: string) => void; 
  cartCount: number;
  onOpenCart: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden text-luxury-black"
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
          <div className="hidden lg:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] font-medium">
            <button onClick={() => onNavigate('belmont')} className="hover:text-luxury-leather transition-colors">Belmont</button>
            <button onClick={() => onNavigate('siena')} className="hover:text-luxury-leather transition-colors">Siena</button>
            <button className="hover:text-luxury-leather transition-colors">Coleções</button>
          </div>
        </div>

        <button 
          onClick={() => onNavigate('home')}
          className="absolute left-1/2 -translate-x-1/2 text-xl md:text-2xl font-serif tracking-[0.3em] uppercase whitespace-nowrap"
        >
          Victor Hugo
        </button>

        <div className="flex items-center gap-6">
          <button className="hidden md:block hover:text-luxury-leather transition-colors">
            <Search size={20} strokeWidth={1.2} />
          </button>
          <button className="hidden md:block hover:text-luxury-leather transition-colors">
            <User size={20} strokeWidth={1.2} />
          </button>
          <button 
            onClick={onOpenCart}
            className="relative hover:text-luxury-leather transition-colors"
          >
            <ShoppingBag size={20} strokeWidth={1.2} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-luxury-leather text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[60] p-8 flex flex-col"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X size={32} strokeWidth={1} />
              </button>
            </div>
            <div className="mt-12 flex flex-col gap-8 text-3xl font-serif">
              <button onClick={() => { onNavigate('belmont'); setIsMobileMenuOpen(false); }}>Coleção Belmont</button>
              <button onClick={() => { onNavigate('siena'); setIsMobileMenuOpen(false); }}>Coleção Siena</button>
              <button className="opacity-50">Acessórios</button>
              <button className="opacity-50">Mundo VH</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const ProductCard = ({ 
  product, 
  onClick 
}: { 
  product: Product; 
  onClick: () => void;
  key?: string | number;
}) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[3/4] overflow-hidden bg-luxury-beige mb-6 relative">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </div>
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-widest text-luxury-gray mb-1">{product.collection}</p>
        <h3 className="text-lg font-serif mb-2">{product.name}</h3>
        <p className="text-sm font-light tracking-wider">R$ {product.price.toLocaleString('pt-BR')},00</p>
      </div>
    </motion.div>
  );
};

const Footer = () => (
  <footer className="bg-luxury-beige pt-24 pb-12 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
      <div className="col-span-1 md:col-span-1">
        <h2 className="text-2xl font-serif tracking-widest uppercase mb-8">Victor Hugo</h2>
        <p className="text-sm text-luxury-gray leading-relaxed max-w-xs">
          Excelência em couro e design autoral desde 1975. Uma jornada de sofisticação e herança brasileira.
        </p>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">Coleções</h4>
        <ul className="flex flex-col gap-4 text-sm text-luxury-gray">
          <li><button className="hover:text-luxury-black transition-colors">Belmont</button></li>
          <li><button className="hover:text-luxury-black transition-colors">Siena</button></li>
          <li><button className="hover:text-luxury-black transition-colors">Acessórios</button></li>
          <li><button className="hover:text-luxury-black transition-colors">Edições Limitadas</button></li>
        </ul>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">Serviços</h4>
        <ul className="flex flex-col gap-4 text-sm text-luxury-gray">
          <li><button className="hover:text-luxury-black transition-colors">Atendimento Exclusivo</button></li>
          <li><button className="hover:text-luxury-black transition-colors">VH Care</button></li>
          <li><button className="hover:text-luxury-black transition-colors">Localizador de Lojas</button></li>
          <li><button className="hover:text-luxury-black transition-colors">Privacidade</button></li>
        </ul>
      </div>
      <div>
        <h4 className="text-xs uppercase tracking-widest font-semibold mb-6">Newsletter</h4>
        <p className="text-sm text-luxury-gray mb-6">Inscreva-se para receber convites e lançamentos exclusivos.</p>
        <div className="flex border-b border-luxury-black/20 pb-2">
          <input 
            type="email" 
            placeholder="Seu e-mail" 
            className="bg-transparent flex-1 text-sm outline-none"
          />
          <button><ArrowRight size={18} strokeWidth={1} /></button>
        </div>
        <div className="flex gap-4 mt-8">
          <Instagram size={20} strokeWidth={1.2} />
          <Facebook size={20} strokeWidth={1.2} />
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto pt-12 border-t border-luxury-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-luxury-gray">
      <p>© 2026 Victor Hugo. Todos os direitos reservados.</p>
      <div className="flex gap-8">
        <span>Brasil</span>
        <span>English</span>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ onNavigate, onProductClick }: { onNavigate: (p: string) => void, onProductClick: (p: Product) => void }) => {
  const [isHoveringSiena, setIsHoveringSiena] = useState(false);
  const [currentBelmontIndex, setCurrentBelmontIndex] = useState(0);
  const [showExclusiveText, setShowExclusiveText] = useState(false);
  const [showSienaPopup, setShowSienaPopup] = useState(false);
  const sienaSectionRef = useRef<HTMLDivElement>(null);
  
  const belmontProducts = useMemo(() => PRODUCTS.filter(p => p.collection === 'Belmont'), []);
  const sienaProducts = useMemo(() => PRODUCTS.filter(p => p.collection === 'Siena'), []);

  // Belmont Slideshow logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBelmontIndex((prev) => (prev + 1) % belmontProducts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [belmontProducts.length]);

  // Exclusive text delay logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowExclusiveText(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Siena Popup logic with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const timer = setTimeout(() => {
            setShowSienaPopup(true);
          }, 2000);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (sienaSectionRef.current) {
      observer.observe(sienaSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full">
      {/* IMPACT HERO - BELMONT & SIENA */}
      <section className="relative h-screen w-full flex flex-col md:flex-row overflow-hidden">
        {/* Belmont Side with Automatic Slideshow */}
        <div className="relative flex-1 h-1/2 md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentBelmontIndex}
              src={belmontProducts[currentBelmontIndex].images[0]} 
              alt="Belmont Collection"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </AnimatePresence>
          
          <div className="absolute inset-0 bg-black/40 z-10" />
          
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center p-6">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] uppercase tracking-[0.4em] mb-4 font-medium"
            >
              O Ícone da Estação
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-7xl font-serif mb-6 tracking-tight"
            >
              Belmont
            </motion.h2>
            
            <AnimatePresence>
              {showExclusiveText && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[11px] md:text-xs uppercase tracking-[0.2em] mb-8 font-light max-w-[280px] md:max-w-md leading-relaxed"
                >
                  Desenvolvida para uma seleção exclusiva Victor Hugo
                </motion.p>
              )}
            </AnimatePresence>
            
            <motion.button 
              onClick={() => onNavigate('belmont')}
              className="px-10 py-4 border border-white text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-luxury-black transition-all duration-500 font-semibold"
            >
              Descobrir coleção
            </motion.button>
          </div>
        </div>

        {/* Siena Side */}
        <div ref={sienaSectionRef} className="relative flex-1 h-1/2 md:h-full group overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1200" 
            alt="Siena"
            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20 z-10" />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white text-center p-6">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] uppercase tracking-[0.4em] mb-4 font-medium"
            >
              O Essencial Contemporâneo
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-7xl font-serif mb-10 tracking-tight"
            >
              Siena
            </motion.h2>
            
            <div className="relative">
              <motion.button 
                onMouseEnter={() => setIsHoveringSiena(true)}
                onMouseLeave={() => setIsHoveringSiena(false)}
                onClick={() => onNavigate('siena')}
                className="px-10 py-4 border border-white text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-luxury-black transition-all duration-500 font-semibold"
              >
                Explorar Siena
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* MINIMALIST TICKER SECTION */}
      <div className="w-full bg-luxury-black py-3 overflow-hidden border-y border-white/5">
        <div className="flex whitespace-nowrap">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ 
              repeat: Infinity, 
              duration: 20, 
              ease: "linear" 
            }}
            className="flex items-center gap-20 pr-20"
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <p className="text-white text-[10px] uppercase tracking-[0.4em] font-light">
                  Alta demanda produção limitada para este lançamento
                </p>
              </div>
            ))}
          </motion.div>
          {/* Duplicate for seamless loop */}
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ 
              repeat: Infinity, 
              duration: 20, 
              ease: "linear" 
            }}
            className="flex items-center gap-20 pr-20"
          >
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <p className="text-white text-[10px] uppercase tracking-[0.4em] font-light">
                  Alta demanda produção limitada para este lançamento
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* BRAND HERITAGE SECTION */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1 space-y-10 text-center md:text-left">
            <span className="text-[10px] uppercase tracking-[0.5em] text-luxury-leather font-bold">Heritage Victor Hugo</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">Uma História Esculpida em Couro e Paixão</h2>
            <p className="text-luxury-gray text-base md:text-lg font-light leading-relaxed">
              Desde 1975, a Victor Hugo tem sido sinônimo de excelência na marroquinaria brasileira. Nossa jornada começou com o desejo de criar objetos que não apenas servissem a um propósito, mas que contassem uma história de sofisticação e herança.
            </p>
            <div className="grid grid-cols-2 gap-8 md:gap-12 pt-8">
              <div>
                <h4 className="text-3xl font-serif mb-2">1975</h4>
                <p className="text-[10px] uppercase tracking-widest text-luxury-gray">Fundação no Rio de Janeiro</p>
              </div>
              <div>
                <h4 className="text-3xl font-serif mb-2">100%</h4>
                <p className="text-[10px] uppercase tracking-widest text-luxury-gray">Couro de Grão Integral</p>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            <img 
              src="https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=1000" 
              alt="Craftsmanship"
              className="w-full aspect-[4/5] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-10 -left-10 bg-luxury-beige p-10 hidden lg:block max-w-xs shadow-xl">
              <p className="italic font-serif text-lg text-luxury-black mb-4">"O luxo está nos detalhes que o olho não vê, mas a alma sente."</p>
              <p className="text-[10px] uppercase tracking-widest font-bold">— Victor Hugo</p>
            </div>
          </div>
        </div>
      </section>

      {/* CRAFTSMANSHIP VIDEO/IMAGE BLOCK */}
      <section className="py-20 md:py-32 px-6 bg-luxury-beige">
        <div className="max-w-7xl mx-auto text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Mestres da Marroquinaria</h2>
          <p className="text-luxury-gray uppercase tracking-[0.2em] text-xs md:text-sm">Onde a tradição encontra a inovação</p>
        </div>
        <div className="max-w-5xl mx-auto relative group cursor-pointer overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1500" 
            alt="Process"
            className="w-full aspect-video object-cover transition-transform duration-[3s] group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border border-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
              <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-2" />
            </div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-4">Seleção Manual</h4>
            <p className="text-xs text-luxury-gray leading-relaxed">Cada pele é inspecionada manualmente para garantir zero imperfeições.</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-4">Ferragens em Ouro</h4>
            <p className="text-xs text-luxury-gray leading-relaxed">Banho de ouro 18k para durabilidade e brilho eterno.</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-4">Costura de Sela</h4>
            <p className="text-xs text-luxury-gray leading-relaxed">Técnica ancestral que garante a estrutura vitalícia da peça.</p>
          </div>
        </div>
      </section>

      {/* BLOCO SIENA - REFINED GRID */}
      <section className="py-20 md:py-32 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 md:mb-24 gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Siena: O Novo Clássico</h2>
              <p className="text-luxury-gray font-light text-base md:text-lg">Desenhada para a mulher que transita entre o profissional e o pessoal com fluidez e elegância.</p>
            </div>
            <button 
              onClick={() => onNavigate('siena')}
              className="text-[10px] uppercase tracking-widest font-bold border-b border-luxury-black pb-1 hover:text-luxury-leather hover:border-luxury-leather transition-colors"
            >
              Ver toda a linha Siena
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {sienaProducts.map(product => (
              <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
            ))}
          </div>
        </div>
      </section>

      {/* EXCLUSIVITY BANNER */}
      <section className="py-16 md:py-24 bg-luxury-black text-white text-center px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.5em] text-luxury-leather font-bold mb-6 md:mb-8 block">Atendimento Personalizado</span>
          <h2 className="text-3xl md:text-5xl font-serif mb-8 md:text-10 leading-tight">Deseja uma peça sob medida ou atendimento em boutique?</h2>
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <button className="px-10 py-4 bg-white text-luxury-black text-[10px] uppercase tracking-widest hover:bg-luxury-leather hover:text-white transition-all duration-500">
              Agendar Consultoria
            </button>
            <button className="px-10 py-4 border border-white text-[10px] uppercase tracking-widest hover:bg-white hover:text-luxury-black transition-all duration-500">
              Localizar Boutique
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const BelmontPage = ({ onNavigate, onProductClick }: { onNavigate: (p: string) => void, onProductClick: (p: Product) => void }) => {
  return (
    <div className="pt-24">
      <section className="h-[70vh] relative overflow-hidden mb-24">
        <img 
          src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=2000" 
          alt="Belmont Hero"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white p-6 text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">Coleção Belmont</h1>
          <p className="max-w-xl text-base md:text-lg font-light leading-relaxed">
            Design autoral, couro de grão integral e uma presença que redefine o luxo contemporâneo.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {PRODUCTS.filter(p => p.collection === 'Belmont').map(product => (
            <ProductCard key={product.id} product={product} onClick={() => onProductClick(product)} />
          ))}
        </div>
      </section>

      <section className="py-32 bg-luxury-beige px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-luxury-gray uppercase tracking-widest text-xs mb-6">Para uma interpretação mais versátil da elegância</p>
          <h2 className="text-5xl font-serif mb-12">Siena</h2>
          <button 
            onClick={() => onNavigate('siena')}
            className="px-12 py-4 border border-luxury-black text-xs uppercase tracking-widest hover:bg-luxury-black hover:text-white transition-all duration-500"
          >
            Explorar Siena
          </button>
        </div>
      </section>
    </div>
  );
};

const SienaPage = ({ onProductClick }: { onProductClick: (p: Product) => void }) => {
  return (
    <div className="pt-24">
      <section className="h-[60vh] relative overflow-hidden mb-24">
        <img 
          src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=2000" 
          alt="Siena Lifestyle"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center text-white p-6 text-center">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">Siena</h1>
          <p className="text-lg md:text-xl font-light tracking-widest uppercase">Versatilidade e Estrutura</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Repeat some products to show density as requested */}
          {[...PRODUCTS.filter(p => p.collection === 'Siena'), ...PRODUCTS.filter(p => p.collection === 'Siena')].map((product, i) => (
            <ProductCard key={`${product.id}-${i}`} product={product} onClick={() => onProductClick(product)} />
          ))}
        </div>
        
        <div className="mt-32 text-center border-t border-luxury-black/5 pt-16">
          <p className="italic font-serif text-xl text-luxury-gray">"A bolsa perfeita para o dia a dia, combina com tudo e a qualidade é impecável."</p>
          <p className="text-[10px] uppercase tracking-widest mt-4">— Cliente VH Selecionada</p>
        </div>
      </section>
    </div>
  );
};

const PDP = ({ product, onAddToCart }: { product: Product, onAddToCart: (p: Product) => void }) => {
  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
        <div className="space-y-8">
          <div className="aspect-[3/4] bg-luxury-beige overflow-hidden">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="aspect-square bg-luxury-beige"></div>
            <div className="aspect-square bg-luxury-beige"></div>
          </div>
        </div>
        
        <div className="flex flex-col justify-center lg:sticky lg:top-32 h-fit">
          <p className="text-xs uppercase tracking-[0.3em] text-luxury-gray mb-4">{product.collection}</p>
          <h1 className="text-5xl font-serif mb-4">{product.name}</h1>
          <p className="text-xl font-light italic text-luxury-leather mb-8">{product.subheadline}</p>
          <p className="text-2xl font-light mb-12">R$ {product.price.toLocaleString('pt-BR')},00</p>
          
          <div className="space-y-8 mb-12">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest font-semibold mb-4">Cor</h4>
              <div className="flex gap-3">
                <button className="w-8 h-8 rounded-full bg-luxury-leather border-2 border-white ring-1 ring-luxury-leather" />
                <button className="w-8 h-8 rounded-full bg-luxury-black" />
                <button className="w-8 h-8 rounded-full bg-[#D2B48C]" />
              </div>
            </div>
          </div>

          <button 
            onClick={() => onAddToCart(product)}
            className="w-full py-5 bg-luxury-black text-white text-xs uppercase tracking-widest hover:bg-luxury-leather transition-colors duration-500"
          >
            Adicionar à seleção
          </button>
          
          <div className="mt-12 pt-12 border-t border-luxury-black/5">
            <h4 className="text-[10px] uppercase tracking-widest font-semibold mb-4">Detalhes</h4>
            <p className="text-luxury-gray font-light leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      <section className="border-t border-luxury-black/5 pt-24">
        <h3 className="text-3xl font-serif mb-16 text-center">Complete sua seleção</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {PRODUCTS.slice(0, 4).map(p => (
            <ProductCard key={p.id} product={p} onClick={() => {}} />
          ))}
        </div>
      </section>
    </div>
  );
};

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  items: Product[];
  onRemove: (id: string) => void;
}) => {
  const total = items.reduce((acc, item) => acc + item.price, 0);
  const threshold = 5000;
  const progress = Math.min((total / threshold) * 100, 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[70] backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-white z-[80] shadow-2xl flex flex-col"
          >
            <div className="p-8 flex justify-between items-center border-b border-luxury-black/5">
              <h2 className="text-2xl font-serif">Sua seleção Victor Hugo</h2>
              <button onClick={onClose}><X size={24} strokeWidth={1} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 hide-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-luxury-gray">
                  <ShoppingBag size={48} strokeWidth={0.5} className="mb-4" />
                  <p className="font-light">Sua seleção está vazia.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {items.map((item, i) => (
                    <div key={`${item.id}-${i}`} className="flex gap-6">
                      <div className="w-24 aspect-[3/4] bg-luxury-beige overflow-hidden">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 className="font-serif text-lg">{item.name}</h4>
                          <p className="text-[10px] uppercase tracking-widest text-luxury-gray">{item.collection}</p>
                        </div>
                        <div className="flex justify-between items-end">
                          <p className="text-sm">R$ {item.price.toLocaleString('pt-BR')},00</p>
                          <button 
                            onClick={() => onRemove(item.id)}
                            className="text-[10px] uppercase tracking-widest text-luxury-gray hover:text-luxury-black"
                          >
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-8 bg-luxury-beige/50 border-t border-luxury-black/5">
              <div className="mb-8">
                <p className="text-[10px] uppercase tracking-[0.2em] mb-3 text-center">
                  {progress < 100 
                    ? "Sua seleção se aproxima de condições exclusivas" 
                    : "Sua experiência Victor Hugo foi elevada"}
                </p>
                <div className="h-[2px] w-full bg-luxury-black/10 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-luxury-leather"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-xs uppercase tracking-widest font-semibold">Subtotal</span>
                <span className="text-xl font-light">R$ {total.toLocaleString('pt-BR')},00</span>
              </div>

              <button className="w-full py-5 bg-luxury-black text-white text-xs uppercase tracking-widest hover:bg-luxury-leather transition-colors duration-500">
                Finalizar Seleção
              </button>
              
              <p className="text-[10px] text-center text-luxury-gray mt-6 tracking-widest">
                FRETE E PARCELAMENTO CALCULADOS NO CHECKOUT
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedProduct]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('pdp');
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => [...prev, product]);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => {
      const index = prev.findIndex(item => item.id === id);
      if (index > -1) {
        const newCart = [...prev];
        newCart.splice(index, 1);
        return newCart;
      }
      return prev;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        onNavigate={(page) => { setCurrentPage(page); setSelectedProduct(null); }} 
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + (selectedProduct?.id || '')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {currentPage === 'home' && (
              <HomePage 
                onNavigate={setCurrentPage} 
                onProductClick={handleProductClick} 
              />
            )}
            {currentPage === 'belmont' && (
              <BelmontPage 
                onNavigate={setCurrentPage} 
                onProductClick={handleProductClick} 
              />
            )}
            {currentPage === 'siena' && (
              <SienaPage 
                onProductClick={handleProductClick} 
              />
            )}
            {currentPage === 'pdp' && selectedProduct && (
              <PDP 
                product={selectedProduct} 
                onAddToCart={handleAddToCart} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
}
