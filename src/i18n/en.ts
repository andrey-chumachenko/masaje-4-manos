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
    title1: 'Relaxing massage',
    title2: 'with 4 hands',
    description:
      'Two specialists, one synchronized body-care experience. A space designed for calm, presence and general wellbeing.',
    cta1: 'Explore our services',
    cta2: 'Book on WhatsApp',
    cardQuote:
      'Four-hand relaxing massage offers an enveloping, unhurried and coordinated body experience.',
    ubicacion: 'Location',
    whatsapp: 'WhatsApp',
  },
  about: {
    subtitle: 'About relaxing massage',
    title1: 'With a',
    title2: 'Four-Hand Technique',
    quote:
      'Two specialists — one synchronized experience of attention and body care.',
    paragraphs: [
      'Four-hand relaxing massage combines the coordinated work of two specialists in an enveloping body session.',
      'Attention stays with rhythm, touch and sensation. Each part of the body receives unhurried, synchronized care.',
      'It is a space dedicated to general wellbeing, calm and conscious connection with the body.',
    ],
    stats: [
      { number: '4', label: 'Hands in sync' },
      { number: '1', label: 'Wave of attention' },
      { number: '100%', label: 'Presence' },
    ],
  },
  services: {
    subtitle: 'Our body sessions',
    title1: 'Our',
    title2: 'Services',
    intro:
      'Each body session is provided by two specialists working with attentive coordination.',
    featured: 'Featured experience',
    popular: 'Popular',
    reservar: 'Book',
    biodynamicNote:
      '*Relaxing massage sessions can include biodynamic techniques to accompany a slower, more mindful experience.',
    items: [
      {
        title: 'Relaxing 4-Hand Massage',
        duration: '1 hour',
        price: '100€',
        description:
          'A body session focused on relaxation and general wellbeing. Two specialists work in sync with soft, enveloping movements.',
        benefits: [
          'Soft, coordinated movements',
          'Four-hand body attention',
          'Slow, enveloping rhythm',
          'Space for calm and presence',
          'Experience centered on wellbeing',
        ],
      },
      {
        title: '4-Hand Spa Ritual',
        duration: '1.5 hours',
        price: '130€',
        description:
          'An enveloping body session with a full-body relaxing massage, gentle facial relaxing massage and spa foot care.',
        benefits: [
          'Full-body relaxing massage',
          'Gentle facial relaxing massage',
          'Spa care for feet',
          'Deep body immersion',
        ],
      },
      {
        title: '4-Hand Deep Relax',
        duration: '2 hours',
        price: '170€',
        description:
          'A slow, mindful body practice designed as an extended pause for body and mind.',
        benefits: [
          'Very slow rhythm',
          'Continuous body attention',
          'Mindful movements',
          'Extended time for rest',
        ],
      },
      {
        title: 'Postpartum Care',
        duration: '3 — 3.5 hours',
        price: '350€',
        description:
          'A body-care session designed to accompany the postpartum period with calm and attention. It includes gentle rebozo contact, biodynamic techniques, four-hand relaxing massage, a salt and herb bath and wrapping with cloths.',
        benefits: [
          'Gentle rebozo contact',
          'Gentle biodynamic techniques',
          'Four-hand relaxing massage',
          'Salt and herb bath',
          'Enveloping care with cloths',
        ],
      },
    ],
    process: {
      title: 'How a session unfolds',
      steps: [
        { step: '01', title: 'Welcome', desc: 'We receive you in a warm and calm atmosphere. We talk about your needs.' },
        { step: '02', title: 'Preparation', desc: 'We prepare the table with aromas and gentle music to create a calm atmosphere.' },
        { step: '03', title: 'Synchronized session', desc: 'Two specialists coordinate their movements throughout the four-hand body session.' },
        { step: '04', title: 'Calm close', desc: 'We finish the session slowly, leaving a few minutes to return to your everyday rhythm.' },
      ],
    },
  },
  peleamiento: {
    badge: 'New service',
    title1: 'Body',
    title2: 'Wrap',
    intro:
      'Discover a wellbeing body wrap inspired by traditional rituals, with natural ingredients, warm textures and an unhurried rhythm.',
    whatIs: {
      title: 'What is a body wrap?',
      p1: {
        before: 'A body wrap, also known as ',
        em1: 'body wrapping',
        middle: ' or ',
        em2: 'body wrap',
        after: ', is an aesthetic body-care experience that combines a blend of natural ingredients with warm cloths or specialized film.',
      },
      p2: 'Warmth, aromas and textures accompany a moment of pause, skin care and general wellbeing.',
    },
    process: {
      title: 'How the body session unfolds',
      steps: [
        { title: 'Preparatory exfoliation', desc: 'We begin with gentle cosmetic exfoliation to prepare the skin for the next stages of care.' },
        { title: 'Blend application', desc: 'We apply a blend of clays, seaweed, essential oils and botanical extracts selected for the experience.' },
        { title: 'Wrapping and rest', desc: 'We wrap the body in warm cloths to create an enveloping feeling. The resting stage lasts 20–30 minutes.' },
        { title: 'Final care', desc: 'We remove the wrap and finish with an unhurried application of moisturizing cream.' },
      ],
    },
    benefits: {
      title: 'The experience includes',
      items: [
        'Gentle cosmetic exfoliation',
        'Application of natural ingredients',
        'An enveloping feeling of warmth',
        'A quiet moment of rest',
        'Moisturizing skin care',
        'Personalized body attention',
      ],
    },
    duration: {
      label: 'Session duration',
      value: '90 minutes',
      note: 'Includes exfoliation, application, wrapping and final hydration.',
    },
    cta: 'Check availability',
    ingredients: {
      title: 'Natural ingredients',
      items: [
        { emoji: '🌿', name: 'Green clay', desc: 'A mineral texture for the blend' },
        { emoji: '🌊', name: 'Seaweed', desc: 'A texture inspired by the sea' },
        { emoji: '🥥', name: 'Coconut oil', desc: 'Adds softness to the application' },
        { emoji: '💜', name: 'Lavender', desc: 'A soft floral aroma' },
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
      'Available for four-hand relaxing massage',
      'Coordination via WhatsApp',
      'Attention in Santa Cruz',
    ],
    cta1: 'Request gift voucher',
    cta2: 'View details',
  },
  gallery: {
    subtitle: 'Our space',
    title: 'Gallery',
    instagramText: 'See more moments and updates on Instagram',
  },
  contact: {
    subtitle: 'Let’s talk',
    title: 'Contact',
    bookTitle: 'Book your experience',
    bookDescription:
      'We will be happy to help you. You can book on WhatsApp or send us a message here. We will open WhatsApp with your enquiry ready and reply as soon as possible.',
    whatsapp: 'WhatsApp',
    whatsappIntro: 'Hello, I would like to make an enquiry.',
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
    contactTitle: 'Contact',
    copyright: 'All rights reserved.',
  },
}
