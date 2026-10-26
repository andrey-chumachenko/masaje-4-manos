import type { Lang } from '../i18n/context'

export interface Review {
  id: string
  image: string
  width: number
  height: number
  ksenia?: boolean
  originalLanguage?: 'es-en' | 'ru'
  originalText?: string
  text: Record<Lang, string>
}

const newReviews: Review[] = [
  {
    id: 'great-morning', image: '/images/reviews/great-morning.jpg', width: 1080, height: 880,
    text: {
      es: 'Muy buenos días!\nGenial!!!\nEres la mejor 😊😊',
      ru: 'Доброе утро!\nОтлично!!!\nТы лучшая 😊😊',
      ua: 'Доброго ранку!\nЧудово!!!\nТи найкраща 😊😊',
      en: 'Good morning!\nGreat!!!\nYou are the best 😊😊',
    },
  },
  {
    id: 'in-your-hands-again', image: '/images/reviews/in-your-hands-again.jpg', width: 1080, height: 586,
    text: {
      es: 'Volveré a ponerme en tus manos.\nIgualmente bonita 😘',
      ru: 'Снова доверюсь твоим рукам.\nИ тебе хорошего дня, красавица 😘',
      ua: 'Знову довірюся твоїм рукам.\nІ тобі гарного дня, красуне 😘',
      en: 'I will put myself in your hands again.\nYou too, beautiful 😘',
    },
  },
  {
    id: 'dedicated-to-wellbeing', image: '/images/reviews/dedicated-to-wellbeing.jpg', width: 1080, height: 333,
    text: {
      es: 'Siempre he admirado a la gente que dedica su tiempo y vida para el Bienestar de los demás.',
      ru: 'Я всегда восхищался людьми, которые посвящают своё время и жизнь благополучию других.',
      ua: 'Я завжди захоплювався людьми, які присвячують свій час і життя добробуту інших.',
      en: 'I have always admired people who devote their time and lives to the wellbeing of others.',
    },
  },
  {
    id: 'lighter-legs', image: '/images/reviews/lighter-legs.jpg', width: 1080, height: 640,
    text: {
      es: 'Siiiii.\nLas piernas más ligeras. Sobre todo los pies.\nHe dormido como un niño pequeño.',
      ru: 'Дааааа.\nНоги стали легче. Особенно стопы.\nЯ спал как маленький ребёнок.',
      ua: 'Тааааак.\nНоги стали легшими. Особливо стопи.\nЯ спав як маленька дитина.',
      en: 'Yesssss.\nMy legs feel lighter. Especially my feet.\nI slept like a little child.',
    },
  },
  {
    id: 'professional-followup', image: '/images/reviews/professional-followup.jpg', width: 1080, height: 644,
    text: {
      es: 'Buenos dias Kseniia.\n\nGracias por chequear conmigo.\n\nEstoy super bien. Hoy hice deporte asi que cuerpo está cansado, pero me siento bien. Gracias.\n\nGracias por si tiempo de ayer y la sesión. Muy recomendable y profesional.',
      ru: 'Доброе утро, Ксения.\n\nСпасибо, что поинтересовались моим состоянием.\n\nУ меня всё отлично. Сегодня была тренировка, поэтому тело устало, но чувствую себя хорошо. Спасибо.\n\nСпасибо за ваше время вчера и за сеанс. Очень рекомендую, всё профессионально.',
      ua: 'Доброго ранку, Ксеніє.\n\nДякую, що поцікавилися моїм станом.\n\nУ мене все чудово. Сьогодні було тренування, тому тіло втомилося, але почуваюся добре. Дякую.\n\nДякую за ваш час учора та за сеанс. Дуже рекомендую, усе професійно.',
      en: 'Good morning, Kseniia.\n\nThank you for checking in with me.\n\nI am really well. I exercised today, so my body is tired, but I feel good. Thank you.\n\nThank you for your time yesterday and for the session. Highly recommended and professional.',
    },
  },
  {
    id: 'relaxed-today', image: '/images/reviews/relaxed-today.jpg', width: 1080, height: 441,
    originalLanguage: 'es-en',
    originalText: 'Soo relax today, thanks.\n\nLa próx seguro que iré más relajado porque ya os conozco ye sentiré más tranquilo.',
    text: {
      es: 'Hoy estoy muy relajado, gracias.\n\nLa próxima vez seguro que iré más relajado, porque ya os conozco y me sentiré más tranquilo.',
      ru: 'Сегодня так расслабленно, спасибо.\n\nВ следующий раз я наверняка приду более расслабленным, ведь уже знаю вас и буду чувствовать себя спокойнее.',
      ua: 'Сьогодні так розслаблено, дякую.\n\nНаступного разу я напевно прийду більш розслабленим, адже вже знаю вас і почуватимуся спокійніше.',
      en: 'So relaxed today, thanks.\n\nNext time I will surely arrive feeling more relaxed, because I already know you and will feel calmer.',
    },
  },
  {
    id: 'less-stress', image: '/images/reviews/less-stress.jpg', width: 1080, height: 547,
    text: {
      es: 'Hola, buenos días ☀️\n\nMuy bien intentando tomar las cosas con menos estrés esta semana.',
      ru: 'Здравствуйте, доброе утро ☀️\n\nВсё очень хорошо, на этой неделе стараюсь относиться ко всему с меньшим стрессом.',
      ua: 'Вітаю, доброго ранку ☀️\n\nУсе дуже добре, цього тижня намагаюся ставитися до всього з меншим стресом.',
      en: 'Hello, good morning ☀️\n\nVery well, trying to take things with less stress this week.',
    },
  },
  {
    id: 'thank-you-again', image: '/images/reviews/thank-you-again.jpg', width: 1080, height: 436,
    text: {
      es: 'Muchísimas gracias nuevamente. Me ha gustado mucho el masaje.',
      ru: 'Ещё раз огромное спасибо. Мне очень понравился массаж.',
      ua: 'Ще раз величезне спасибі. Мені дуже сподобався масаж.',
      en: 'Thank you so much once again. I really enjoyed the massage.',
    },
  },
]

const previousReviews: Review[] = [
  {
    id: 'warm-hands', image: '/images/reviews/warm-hands.jpg', width: 1080, height: 635, ksenia: true,
    text: {
      es: 'El masaje de Ksenia es mi forma favorita de relajación y recuperación. Para mí es un honor haber sido uno de sus primeros clientes y seguir eligiéndola y recomendándola con tanta confianza.\n\nCon solo pensar en sus manos cálidas, me transporta a la infancia, a aquellos tiempos en los que la vida era pura magia.',
      ru: 'Массаж Ксении — мой любимый способ расслабления и восстановления. Для меня честь быть одним из её первых клиентов, продолжать выбирать её и с такой уверенностью рекомендовать.\n\nСтоит лишь подумать о её тёплых руках, как я переношусь в детство, в те времена, когда жизнь была настоящим волшебством.',
      ua: 'Масаж Ксенії — мій улюблений спосіб розслаблення та відновлення. Для мене честь бути одним із її перших клієнтів, продовжувати обирати її та з такою впевненістю рекомендувати.\n\nВарто лише подумати про її теплі руки, як я переношуся в дитинство, у ті часи, коли життя було справжньою магією.',
      en: 'Ksenia’s massage is my favourite way to relax and recover. It is an honour to have been one of her first clients and to keep choosing her and recommending her with such confidence.\n\nJust thinking of her warm hands takes me back to childhood, to those days when life was pure magic.',
    },
  },
  {
    id: 'moment-of-relaxation', image: '/images/reviews/moment-of-relaxation.jpg', width: 1080, height: 372,
    text: {
      es: 'Echo de menos mi momento de relax!!!',
      ru: 'Мне так не хватает моего момента расслабления!!!',
      ua: 'Мені так бракує моєї миті розслаблення!!!',
      en: 'I miss my moment of relaxation!!!',
    },
  },
  {
    id: 'renewed-energy', image: '/images/reviews/renewed-energy.jpg', width: 1080, height: 778,
    text: {
      es: 'Llegué con mucho estrés y agotamiento, con tensión entre el omóplato y la columna vertebral. Desde la reserva me recibieron con una atmósfera muy cálida y atenta. Durante el masaje, con música, pude relajarme profundamente y recuperar energía. Después me sentí renovado: mejoró mi sueño, aclaré mi mente y desapareció gran parte de la tensión. Lo recomiendo mucho a quienes quieren volver a conectar con su cuerpo y cuidar de sí mismos.',
      ru: 'Я пришёл с сильным стрессом и усталостью, с напряжением между лопаткой и позвоночником. Уже с момента записи меня окружили очень тёплым и внимательным отношением. Во время массажа под музыку я смог глубоко расслабиться и восстановить силы. После сеанса я почувствовал себя обновлённым: сон улучшился, мысли прояснились, большая часть напряжения ушла. Очень рекомендую тем, кто хочет снова почувствовать связь со своим телом и позаботиться о себе.',
      ua: 'Я прийшов із сильним стресом і втомою, з напруженням між лопаткою та хребтом. Уже з моменту запису мене оточили дуже теплим і уважним ставленням. Під час масажу під музику я зміг глибоко розслабитися та відновити сили. Після сеансу я відчув себе оновленим: сон покращився, думки прояснилися, більша частина напруження зникла. Дуже рекомендую тим, хто хоче знову відчути зв’язок зі своїм тілом і подбати про себе.',
      en: 'I arrived feeling very stressed and exhausted, with tension between my shoulder blade and spine. From the moment I booked, I was met with a very warm and attentive atmosphere. During the massage, with music playing, I was able to relax deeply and regain energy. Afterwards I felt renewed: my sleep improved, my mind cleared, and much of the tension disappeared. I highly recommend it to anyone who wants to reconnect with their body and take care of themselves.',
    },
  },
  {
    id: 'total-relaxation', image: '/images/reviews/total-relaxation.jpg', width: 1080, height: 1128,
    text: {
      es: 'Muchas gracias, muy buen masaje, me gustó mucho, me he quedado relax total.\n\nIgualmente 😊\nMuy bueno',
      ru: 'Большое спасибо, очень хороший массаж, мне очень понравилось, я полностью расслабился.\n\nВзаимно 😊\nОчень хорошо.',
      ua: 'Дуже дякую, дуже хороший масаж, мені дуже сподобалося, я повністю розслабився.\n\nНавзаєм 😊\nДуже добре.',
      en: 'Thank you so much, a very good massage. I really enjoyed it and felt completely relaxed.\n\nLikewise 😊\nVery good.',
    },
  },
  {
    id: 'wonderful-experience', image: '/images/reviews/wonderful-experience.jpg', width: 1080, height: 671,
    text: {
      es: 'Ha sido una experiencia maravillosa. Muchas gracias chicas 🫶🏻 La intensidad en las piernas y los pies era perfecta, es lo que más se me carga por los entrenos.',
      ru: 'Это был чудесный опыт. Большое спасибо, девушки 🫶🏻 Интенсивность массажа ног и стоп была идеальной — именно они у меня больше всего нагружаются на тренировках.',
      ua: 'Це був чудовий досвід. Дуже дякую, дівчата 🫶🏻 Інтенсивність масажу ніг і стоп була ідеальною — саме вони в мене найбільше навантажуються на тренуваннях.',
      en: 'It was a wonderful experience. Thank you so much, girls 🫶🏻 The intensity on my legs and feet was perfect — those are the areas that feel the most strain from training.',
    },
  },
  {
    id: 'feeling-great', image: '/images/reviews/feeling-great.jpg', width: 576, height: 972,
    text: {
      es: 'Súper relajante gracias a vosotras.\n\nHola buenos días.\nSuperbien 😊😊😊',
      ru: 'Очень расслабляет, спасибо вам.\n\nЗдравствуйте, доброе утро.\nОтлично 😊😊😊',
      ua: 'Дуже розслабляє, дякую вам.\n\nВітаю, доброго ранку.\nЧудово 😊😊😊',
      en: 'So relaxing, thank you both.\n\nHello, good morning.\nReally great 😊😊😊',
    },
  },
  {
    id: 'a-great-session', image: '/images/reviews/a-great-session.jpg', width: 1080, height: 228,
    text: {
      es: 'Muchas gracias por hoy! Ha estado genial 🙂',
      ru: 'Большое спасибо за сегодня! Было здорово 🙂',
      ua: 'Дуже дякую за сьогодні! Було чудово 🙂',
      en: 'Thank you so much for today! It was great 🙂',
    },
  },
  {
    id: 'restful-sleep', image: '/images/reviews/restful-sleep.jpg', width: 926, height: 333,
    text: {
      es: 'He dormido como un niño pequeño. Hahahahah. Me siento mucho mejor, más ligero y las piernas más relajadas.',
      ru: 'Я спал как маленький ребёнок. Ха-ха-ха. Чувствую себя гораздо лучше, легче, и ноги более расслабленные.',
      ua: 'Я спав як маленька дитина. Ха-ха-ха. Почуваюся значно краще, легше, і ноги більш розслаблені.',
      en: 'I slept like a little child. Hahahahah. I feel much better, lighter, and my legs feel more relaxed.',
    },
  },
]

const russianReviews: Review[] = [
  {
    id: 'time-for-yourself', image: '/images/reviews/time-for-yourself-ru.jpg', width: 1080, height: 1045,
    originalLanguage: 'ru',
    text: {
      ru: 'Два часа в пространстве, где ты наконец-то нашел время посмотреть в себя. Магия в том, что входишь сюда как в домашние тапочки — тут спокойно, безопасно и очень доверительно. Работа с телом начинается медленно и дает возможность несколько раз нырнуть внутрь, продышаться и выйти в другом состоянии. Это не про «промять по-тайски», это про хороший и глубокий контакт. В первую очередь — с собой.',
      es: 'Dos horas en un espacio donde por fin has encontrado tiempo para mirar hacia dentro. La magia está en que entrar aquí es como ponerse las zapatillas de estar por casa: hay calma, seguridad y mucha confianza. El trabajo corporal empieza lentamente y te permite sumergirte varias veces en tu interior, respirar profundamente y salir en un estado diferente. No se trata de que te «amasen al estilo tailandés», sino de establecer un contacto bueno y profundo. Ante todo, contigo mismo.',
      en: 'Two hours in a space where you have finally found time to look within. The magic is that coming here feels like slipping into your slippers at home — it is calm, safe and full of trust. The bodywork starts slowly and gives you a chance to dive inward several times, breathe deeply and leave in a different state. It is not about being “kneaded Thai-style”, but about good, deep connection. First and foremost, with yourself.',
      ua: 'Дві години у просторі, де ти нарешті знайшов час зазирнути в себе. Магія в тому, що приходиш сюди наче в домашні капці — тут спокійно, безпечно й дуже довірливо. Робота з тілом починається повільно й дає змогу кілька разів пірнути всередину, продихатися та вийти в іншому стані. Це не про «розім’яти по-тайськи», це про хороший і глибокий контакт. Насамперед — із собою.',
    },
  },
  {
    id: 'being-authentic', image: '/images/reviews/being-authentic.jpg', width: 590, height: 1280,
    originalLanguage: 'ru', ksenia: true,
    text: {
      ru: 'Я просто обожаю людей, которые проявляют себя, исследуют этот мир и не боятся быть настоящими.\n\nЯ хожу к Ксюше на массаж.\n\nИ мне каждый раз кажется, что она проводит надо мной свои собственные опыты.\n\nС такой хитрой улыбкой: «Дорогой, посмотрим, насколько тебе вообще может быть хорошо? Думал, что самое хорошо уже было?\n\nА вот и нет».\n\nОчень ценно.',
      es: 'Simplemente adoro a las personas que se expresan, exploran este mundo y no tienen miedo de ser auténticas.\n\nVoy a darme masajes con Ksenia.\n\nY cada vez tengo la impresión de que está haciendo sus propios experimentos conmigo.\n\nCon esa sonrisa pícara: «Querido, vamos a ver lo bien que puedes llegar a sentirte. ¿Pensabas que lo mejor ya había pasado?\n\nPues no».\n\nLo valoro muchísimo.',
      en: 'I absolutely love people who express themselves, explore this world and are not afraid to be authentic.\n\nI go to Ksenia for massage.\n\nAnd each time it feels as though she is conducting her own experiments on me.\n\nWith that mischievous smile: “My dear, let’s see just how good you can feel. Did you think you had already experienced the best?\n\nWell, no.”\n\nI really value it.',
      ua: 'Я просто обожнюю людей, які проявляють себе, досліджують цей світ і не бояться бути справжніми.\n\nЯ ходжу до Ксюші на масаж.\n\nІ мені щоразу здається, що вона проводить наді мною власні досліди.\n\nЗ такою хитрою усмішкою: «Любий, подивімося, наскільки тобі взагалі може бути добре? Думав, що найкраще вже було?\n\nА от і ні».\n\nДуже цінно.',
    },
  },
]

const closingReviewIds = new Set(['warm-hands', 'renewed-energy'])

export const reviews: Review[] = [
  ...newReviews,
  ...previousReviews.filter((review) => !closingReviewIds.has(review.id)),
  ...russianReviews,
  ...previousReviews.filter((review) => closingReviewIds.has(review.id)),
]
