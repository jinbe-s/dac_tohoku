export default defineNuxtPlugin(() => {
  if (document.getElementById('twitter-wjs')) return
  const s = document.createElement('script')
  s.id = 'twitter-wjs'
  s.async = true
  s.src = 'https://platform.twitter.com/widgets.js'
  document.head.appendChild(s)
})
