// ==UserScript==
// @name         梁董的愛 oh my hg030
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @!match        http://*.hga030.com/app/member/FT_index.php*
// @!match        http://hga030.com/app/member/order.php?*
// @match        http://*.hga030.com/*
// @grant        none
// ==/UserScript==

// @ts-check

;(function () {
  addScript({
    url: 'http://localhost:28771/index.js',
  })
})()

function addScript(
  /** @type {{ url: string }} */
  props,
) {
  console.info(`載入...梁董的愛 📦 ${globalThis.location.href}`)
  const randomKey = Math.random().toString(36).slice(2)
  const script = globalThis.document.createElement('script')
  script.src = props.url
  script.id = 'oh-my-bets__script-loader' + randomKey
  script.async = true

  const target =
    globalThis.document.querySelector('body') ||
    globalThis.document.querySelector('html')

  if (target) {
    target?.appendChild(script)
  } else {
    alert(`錯誤發生在梁董的愛：tampermonkey 找不到介入點`)
  }
}
