export interface Product {
  id: string;
  name: string;
  collection: 'Belmont' | 'Siena';
  price: number;
  description: string;
  subheadline: string;
  images: string[];
  category: 'work' | 'travel' | 'night';
}

export const PRODUCTS: Product[] = [
  {
    id: 'belmont-01',
    name: 'Belmont Grand Icon',
    collection: 'Belmont',
    price: 4850,
    subheadline: 'O ápice do design autoral',
    description: 'Uma peça que transcende o tempo. Couro de grão integral com fecho central em banho de ouro 18k.',
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=1000'],
    category: 'night'
  },
  {
    id: 'belmont-02',
    name: 'Belmont Petite',
    collection: 'Belmont',
    price: 3200,
    subheadline: 'Sofisticação em escala reduzida',
    description: 'A essência da coleção Belmont em um formato compacto e impactante.',
    images: ['https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=1000'],
    category: 'night'
  },
  {
    id: 'siena-01',
    name: 'Siena Tote',
    collection: 'Siena',
    price: 2450,
    subheadline: 'Elegância contemporânea para o cotidiano',
    description: 'Estrutura impecável e espaço generoso. A companheira ideal para a mulher dinâmica.',
    images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1000'],
    category: 'work'
  },
  {
    id: 'siena-02',
    name: 'Siena Crossbody',
    collection: 'Siena',
    price: 1850,
    subheadline: 'Versatilidade sem concessões',
    description: 'Leveza e praticidade com o acabamento luxuoso característico da Victor Hugo.',
    images: ['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=1000'],
    category: 'travel'
  },
  {
    id: 'siena-03',
    name: 'Siena Bucket',
    collection: 'Siena',
    price: 2100,
    subheadline: 'Design fluido e atemporal',
    description: 'Uma silhueta moderna que se adapta a qualquer ocasião com naturalidade.',
    images: ['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&q=80&w=1000'],
    category: 'work'
  },
  {
    id: 'belmont-03',
    name: 'Belmont Satchel',
    collection: 'Belmont',
    price: 4100,
    subheadline: 'Presença e autoridade',
    description: 'Linhas arquitetônicas que definem o novo padrão de luxo brasileiro.',
    images: ['https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&q=80&w=1000'],
    category: 'work'
  }
];
