import tinykeys from 'tinykeys'
import cagoToast from 'cogo-toast'
import $ from 'jquery'
import Store from 'store2'

const store = Store.namespace('__HRU__')

if (globalThis['module']?.hot) {
  globalThis['module']?.hot.accept()
}

window.addEventListener(
  'message',
  event => {
    const key = event.data

    const targetDocument = $('#mem_order')
      .contents()
      .find('#bet_order_frame')
      .contents()

    const doc = targetDocument.get(0) as Document

    if (
      typeof key === 'string' &&
      key.toUpperCase().startsWith('F') &&
      targetDocument.length &&
      doc
    ) {
      openTrade(doc, key)
    }
  },
  false,
)

const postMessage = (key: string) => {
  window.postMessage(key, '*')
}

const openTrade = (doc: Document, key: string) => {
  const amountInput = $(doc).find<HTMLInputElement>('#gold')
  const openButton = $(doc).find<HTMLSpanElement>('#Submit')

  const amount = store.get(key)

  if (!amount) {
    cagoToast.error(`請使用 Shift + ${key} 設定金額`)
    return
  }

  if (amountInput.length && openButton.length) {
    try {
      cagoToast.info(`${key} = ＄${amount}`, { position: 'bottom-center' })
    } catch (error) {
      console.warn(`💩 Error: ${error?.message}`, location.href)
    }

    amountInput.trigger('focus')

    amountInput.val(amount).trigger('change')

    openButton.trigger('click')

    const confirm = $('#confirm_bet')

    if (confirm.length) {
      confirm.trigger('click')
    } else {
      cagoToast.error(`錯誤！找不到下注按鈕！`)
    }
  }
}

const setAmount = (key: string) => {
  const _key = key.replace(/shift+/i, '')
  const amount = store.get(_key) || 0
  const newValue = Number(prompt(`輸入 ${_key} ㄉ金額`, amount))

  if (newValue && !Number.isNaN(newValue)) {
    store.set(key, newValue)
  } else {
    cagoToast.error('輸入錯誤')
  }
}

tinykeys(window, {
  F1: event => postMessage(event.key),
  F2: event => postMessage(event.key),
  F3: event => postMessage(event.key),
  F4: event => postMessage(event.key),
  'Shift+F1': event => setAmount(event.key),
  'Shift+F2': event => setAmount(event.key),
  'Shift+F3': event => setAmount(event.key),
  'Shift+F4': event => setAmount(event.key),
})
