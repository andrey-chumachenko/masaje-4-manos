import type { Lang } from './context'

export const reviewCopy = {
  es: {
    eyebrow: 'Experiencias compartidas', title: 'Opiniones de clientes',
    intro: 'Mensajes que hemos recibido después de las sesiones. Toca una imagen para leerla con más detalle.',
    all: 'Ver todas las opiniones', back: 'Volver al inicio', book: 'Reservar por WhatsApp',
    previous: 'Opiniones anteriores', next: 'Más opiniones', open: 'Abrir opinión', close: 'Cerrar opinión',
    original: 'Original en español', translation: 'Traducción del español',
    message: 'Mensaje de una experiencia', ksenia: 'Sobre el masaje de Ksenia',
    description: 'Lee las experiencias compartidas por clientes de Masaje 4 Manos en Santa Cruz, con sus mensajes originales.',
    email: 'Email', zoom: 'Ampliar imagen', fit: 'Ajustar imagen',
  },
  ua: {
    eyebrow: 'Враження після сеансів', title: 'Відгуки клієнтів',
    intro: 'Повідомлення, які ми отримали після сеансів. Натисніть на зображення, щоб прочитати його докладніше.',
    all: 'Переглянути всі відгуки', back: 'На головну', book: 'Записатися через WhatsApp',
    previous: 'Попередні відгуки', next: 'Наступні відгуки', open: 'Відкрити відгук', close: 'Закрити відгук',
    original: 'Оригінал іспанською', translation: 'Переклад з іспанської',
    message: 'Враження після сеансу', ksenia: 'Про масаж Ксенії',
    description: 'Враження клієнтів Masaje 4 Manos у Санта-Крус: оригінальні повідомлення та переклади відгуків.',
    email: 'Електронна пошта', zoom: 'Збільшити зображення', fit: 'Умістити зображення',
  },
  ru: {
    eyebrow: 'Впечатления после сеансов', title: 'Отзывы клиентов',
    intro: 'Сообщения, которые мы получили после сеансов. Нажмите на изображение, чтобы прочитать его подробнее.',
    all: 'Посмотреть все отзывы', back: 'На главную', book: 'Записаться через WhatsApp',
    previous: 'Предыдущие отзывы', next: 'Следующие отзывы', open: 'Открыть отзыв', close: 'Закрыть отзыв',
    original: 'Оригинал на испанском', translation: 'Перевод с испанского',
    message: 'Впечатления после сеанса', ksenia: 'О массаже Ксении',
    description: 'Впечатления клиентов Masaje 4 Manos в Санта-Крус: оригинальные сообщения и переводы отзывов.',
    email: 'Электронная почта', zoom: 'Увеличить изображение', fit: 'Вписать изображение',
  },
  en: {
    eyebrow: 'Shared experiences', title: 'Client reviews',
    intro: 'Messages we have received after sessions. Tap an image to read it in more detail.',
    all: 'Read all reviews', back: 'Back to home', book: 'Book via WhatsApp',
    previous: 'Previous reviews', next: 'More reviews', open: 'Open review', close: 'Close review',
    original: 'Spanish original', translation: 'Translated from Spanish',
    message: 'A session experience', ksenia: 'About Ksenia’s massage',
    description: 'Read experiences shared by Masaje 4 Manos clients in Santa Cruz, with their original messages and translated reviews.',
    email: 'Email', zoom: 'Zoom in', fit: 'Fit image',
  },
} satisfies Record<Lang, Record<string, string>>
