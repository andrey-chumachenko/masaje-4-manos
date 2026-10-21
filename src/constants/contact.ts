export const WHATSAPP_PHONE = '+34 627 796 083'
export const WHATSAPP_URL = 'https://wa.me/34627796083'

export function createWhatsAppUrl(message?: string) {
  return message
    ? `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
    : WHATSAPP_URL
}
