import DOMPurify, { type Config } from 'dompurify'

export const useHtmlSanitizer = () => {
  const sanitize = (html: string) => {
    const clean = DOMPurify.sanitize(html, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ['target', 'rel'],
    } as Config)

    if (process.client) {
      const div = document.createElement('div')
      div.innerHTML = clean
      div.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((a) => {
        const href = a.getAttribute('href') || ''
        if (/^https?:\/\//i.test(href)) {
          a.setAttribute('target', '_blank')
          a.setAttribute('rel', 'noopener noreferrer')
        }
      })
      return div.innerHTML
    }
    return clean
  }

  return { sanitize }
}
