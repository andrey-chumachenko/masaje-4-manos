import type { Lang } from '../i18n/context'

export interface Review {
  id: string
  image: string
  width: number
  height: number
  ksenia?: boolean
  text: Record<Lang, string>
}

export const reviews: Review[] = [
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
    id: 'time-for-yourself', image: '/images/reviews/time-for-yourself.png', width: 655, height: 470,
    text: {
      es: 'Dos horas en un espacio donde por fin encuentras tiempo para mirar hacia dentro. La magia está en que, al entrar, te sientes como al ponerte las zapatillas de estar por casa: todo transmite calma, seguridad y mucha confianza.\n\nEl trabajo corporal empieza poco a poco y te permite sumergirte varias veces en tu interior, respirar profundamente y salir sintiéndote diferente. No se trata de que te «amasen al estilo tailandés», sino de establecer una conexión auténtica y profunda. Ante todo, contigo.',
      ru: 'Два часа в пространстве, где наконец находишь время заглянуть внутрь себя. Волшебство в том, что, войдя, чувствуешь себя словно в домашних тапочках: всё дарит спокойствие, безопасность и большое доверие.\n\nРабота с телом начинается постепенно и позволяет несколько раз погрузиться в себя, глубоко дышать и выйти с другим ощущением. Дело не в том, чтобы тебя «размяли в тайском стиле», а в том, чтобы установить настоящую и глубокую связь. Прежде всего — с собой.',
      ua: 'Дві години у просторі, де нарешті знаходиш час зазирнути всередину себе. Магія в тому, що, увійшовши, почуваєшся наче в домашніх капцях: усе дарує спокій, безпеку та велику довіру.\n\nРобота з тілом починається поступово й дозволяє кілька разів зануритися в себе, глибоко дихати та вийти з іншим відчуттям. Ідеться не про те, щоб тебе «розім’яли в тайському стилі», а про встановлення справжнього й глибокого зв’язку. Насамперед — із собою.',
      en: 'Two hours in a space where you finally find time to look within. The magic is that, as you enter, it feels like slipping into your slippers at home: everything conveys calm, safety and a great sense of trust.\n\nThe bodywork begins gradually and lets you turn inward several times, breathe deeply and leave feeling different. It is not about being “kneaded Thai-style”, but about forming a genuine, deep connection. Above all, with yourself.',
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
  {
    id: 'professional-care', image: '/images/reviews/professional-care.jpg', width: 462, height: 464,
    text: {
      es: 'Buenos dias Kseniia. Gracias por chequear conmigo. Estoy super bien. Hoy hice deporte asi que cuerpo está cansado, pero me siento bien. Gracias.\n\nGracias por si tiempo de ayer y la sesión. Muy recomendable y profesional.',
      ru: 'Доброе утро, Ксения. Спасибо, что поинтересовались моим состоянием. У меня всё отлично. Сегодня я занимался спортом, поэтому тело устало, но чувствую себя хорошо. Спасибо.\n\nСпасибо за ваше время вчера и за сеанс. Очень рекомендую, всё профессионально.',
      ua: 'Доброго ранку, Ксеніє. Дякую, що поцікавилися моїм станом. У мене все чудово. Сьогодні я займався спортом, тому тіло втомилося, але почуваюся добре. Дякую.\n\nДякую за ваш час учора та за сеанс. Дуже рекомендую, усе професійно.',
      en: 'Good morning, Kseniia. Thank you for checking in with me. I am really well. I exercised today, so my body is tired, but I feel good. Thank you.\n\nThank you for your time yesterday and for the session. Highly recommended and professional.',
    },
  },
]
