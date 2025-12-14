export default defineNuxtPlugin(() => {
  return new Promise<void>((resolve) => {
    // 既にスクリプトが読み込まれている場合
    if ((window as any).twttr?.widgets) {
      resolve()
      return
    }

    // スクリプト要素が既に存在する場合は、読み込み完了を待つ
    const existingScript = document.getElementById('twitter-wjs')
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve())
      return
    }

    // 新規にスクリプトを追加
    const s = document.createElement('script')
    s.id = 'twitter-wjs'
    s.async = true
    s.src = 'https://platform.twitter.com/widgets.js'
    s.onload = () => resolve()
    s.onerror = () => {
      console.error('Failed to load Twitter widgets script')
      resolve() // エラーでも続行
    }
    document.head.appendChild(s)
  })
})
