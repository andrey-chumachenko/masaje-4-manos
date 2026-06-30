import type { Translations } from './context'

export const en: Translations = {
  nav: {
    inicio: 'Home',
    nosotras: 'About us',
    servicios: 'Services',
    peleamiento: 'Body Wrap',
    bonoRegalo: 'Gift Voucher',
    galeria: 'Gallery',
    contacto: 'Contact',
    reservar: 'Book',
    language: 'Language',
  },
  hero: {
    tagline: 'Santa Cruz · Wellness · Harmony',
    title1: 'Healing massage',
    title2: 'with 4 hands',
    description:
      'Two massage therapists, one wave of attention to your body and psyche. A deep, synchronized experience designed to reset the nervous system.',
    cta1: 'Explore our services',
    cta2: 'Book on WhatsApp',
    cardQuote:
      'Four-hand massage is not twice the intensity: it is deeper, more enveloping and more restorative.',
    ubicacion: 'Location',
    instagram: 'Instagram',
  },
  about: {
    subtitle: 'Who we are',
    title1: 'About',
    title2: 'Us',
    quote:
      'Two massage therapists — one wave of attention to your body and psyche.',
    paragraphs: [
      'Four-hand massage is not twice the intensity. It is deeper. When two people work with the body at the same time, the psyche stops trying to control the process and enters a full reset.',
      'Attention does not scatter: it deepens. Every part of the body receives synchronized, attentive care. The body relaxes. The psyche exhales.',
      'The effect is not only in the muscles and connective tissue, but in the whole state of being. It is a quality investment in your beauty, health and vital energy.',
    ],
    stats: [
      { number: '4', label: 'Hands in sync' },
      { number: '1', label: 'Wave of attention' },
      { number: '100%', label: 'Presence' },
    ],
  },
  services: {
    subtitle: 'Our treatments',
    title1: 'Our',
    title2: 'Services',
    intro:
      'Each treatment is performed by two therapists working in perfect synchronization, multiplying the benefits of every session.',
    featured: 'Featured experience',
    popular: 'Popular',
    reservar: 'Book',
    biodynamicNote:
      '*All our massages are complemented with biodynamic techniques for even deeper relaxation and body healing.',
    items: [
      {
        title: 'Relaxing 4-Hand Massage',
        duration: '1 hour',
        price: '100€',
        description:
          'A treatment to relieve stress and restore wellbeing. Two therapists work in sync with soft, enveloping movements.',
        benefits: [
          'Deep and fast relaxation',
          'Release of tension',
          'Bilateral brain stimulation',
          'Improved blood circulation',
          'Reduced stress and anxiety',
        ],
      },
      {
        title: '4-Hand Spa Ritual',
        duration: '1.5 hours',
        price: '130€',
        description:
          'A space for deep body immersion: full-body massage with a gentle facial massage and spa foot treatment.',
        benefits: [
          'Full-body massage',
          'Gentle facial massage',
          'Spa treatment for feet',
          'Deep body immersion',
        ],
      },
      {
        title: '4-Hand Deep Relax',
        duration: '2 hours',
        price: '170€',
        description:
          'A very slow and deep practice for total relaxation of the body and mind.',
        benefits: [
          'Total body relaxation',
          'Deep mental calm',
          'Slow and mindful practice',
          'Complete disconnection',
        ],
      },
      {
        title: 'Postpartum Wrapping',
        duration: '3 — 3.5 hours',
        price: '350€',
        description:
          'A deep psycho-body postpartum recovery practice. Includes contactless rebozo massage, gentle biodynamic corrections, 4-hand massage, a salt and herb bath and the sacred ritual of wrapping with cloths.',
        benefits: [
          'Contactless rebozo massage',
          'Biodynamic corrections',
          '4-hand massage',
          'Salt and herb bath',
          'Ritual cloth wrapping',
        ],
      },
    ],
    process: {
      title: 'How a session unfolds',
      steps: [
        { step: '01', title: 'Welcome', desc: 'We receive you in a warm and calm atmosphere. We talk about your needs.' },
        { step: '02', title: 'Preparation', desc: 'We prepare the massage table with aromas and relaxing music to create the right atmosphere.' },
        { step: '03', title: 'Synchronized massage', desc: 'Four hands work in harmony on your body throughout the session.' },
        { step: '04', title: 'Complete wellbeing', desc: 'The session ends with a feeling of lightness, balance and full renewal.' },
      ],
    },
  },
  peleamiento: {
    badge: 'New service',
    title1: 'Body',
    title2: 'Wrap',
    intro:
      'Discover our new therapeutic body wrap: an ancestral restoration ritual that covers the body with natural ingredients to detoxify, nourish and renew the skin and spirit.',
    whatIs: {
      title: 'What is a body wrap?',
      p1: {
        before: 'A body wrap, also known as ',
        em1: 'body wrapping',
        middle: ' or ',
        em2: 'body wrap',
        after: ', is an ancestral aesthetic and therapeutic treatment that applies a blend of natural ingredients to the skin and wraps the body in warm cloths or specialized film.',
      },
      p2: 'This ritual allows active ingredients to penetrate deeply into the skin while the warmth of the wrap supports toxin release, intensive hydration and a deep feeling of wellbeing and containment.',
    },
    process: {
      title: 'Treatment process',
      steps: [
        { title: 'Preparatory exfoliation', desc: 'We prepare the skin with gentle exfoliation to remove dead cells and open the pores, maximizing absorption of active ingredients.' },
        { title: 'Blend application', desc: 'We generously apply a personalized blend of clays, seaweed, essential oils and botanical extracts selected for your needs.' },
        { title: 'Wrapping and rest', desc: 'We wrap the body in warm cloths, creating a protective cocoon. For 20-30 minutes, the ingredients act deeply while you relax.' },
        { title: 'Final hydration', desc: 'We remove the wrap and apply a nourishing moisturizer. Your skin feels soft, luminous and deeply nourished.' },
      ],
    },
    benefits: {
      title: 'Benefits',
      items: [
        'Deep detoxification of the body',
        'Intensive skin hydration',
        'Reduced fluid retention',
        'Circulation stimulation',
        'Firming and toning effect',
        'Reduced measurements in localized areas',
        'Relief of muscle pain',
        'Deep relaxation and emotional wellbeing',
        'Improved skin texture and radiance',
        'Lymphatic system stimulation',
      ],
    },
    duration: {
      label: 'Treatment duration',
      value: '90 minutes',
      note: 'Includes exfoliation, application, wrapping and final hydration.',
    },
    cta: 'Check availability',
    ingredients: {
      title: 'Natural ingredients',
      items: [
        { emoji: '🌿', name: 'Green clay', desc: 'Purifying and remineralizing' },
        { emoji: '🌊', name: 'Seaweed', desc: 'Rich in minerals and antioxidants' },
        { emoji: '🥥', name: 'Coconut oil', desc: 'Deep hydration and nourishment' },
        { emoji: '💜', name: 'Lavender', desc: 'Relaxing and calming effect' },
      ],
    },
  },
  certificate: {
    subtitle: 'Give wellbeing',
    title1: 'Gift',
    title2: 'Voucher',
    description:
      'An elegant detail to surprise someone with calm, care and presence. Our gift voucher is ideal for birthdays, anniversaries or simply offering a real moment of wellbeing.',
    features: [
      'Valid for two months',
      'Available for four-hand massage',
      'Coordination via WhatsApp',
      'Attention in Santa Cruz',
    ],
    cta1: 'Request gift voucher',
    cta2: 'View details',
  },
  gallery: {
    subtitle: 'Our space',
    title: 'Gallery',
    instagramText: 'Discover more of our work on Instagram',
  },
  contact: {
    subtitle: 'Let’s talk',
    title: 'Contact',
    bookTitle: 'Book your experience',
    bookDescription:
      'We will be happy to help you. You can book on WhatsApp, write to us on Instagram or send us a message here. We will reply as soon as possible.',
    whatsapp: 'WhatsApp',
    ubicacion: 'Location',
    formTitle: 'Send us a message',
    formName: 'Name',
    formNamePlaceholder: 'Your name',
    formEmail: 'Email',
    formEmailPlaceholder: 'you@email.com',
    formMessage: 'Message',
    formMessagePlaceholder: 'Tell us what you need...',
    formSubmit: 'Send message',
  },
  footer: {
    tagline1: 'Double technique, double relaxation.',
    tagline2: 'A unique wellbeing experience.',
    navTitle: 'Navigation',
    socialTitle: 'Follow us',
    copyright: 'All rights reserved.',
  },
}

