import tinykeys from 'tinykeys'
import cagoToast from 'cogo-toast'
import $ from 'jquery'
import Store from 'store2'

const store = Store.namespace('__HRU__')

const openTrade = (key: string) => {
  const amountInput = $<HTMLInputElement>('#gold')
  const openButton = $<HTMLSpanElement>('#Submit')

  const amount = store.get(key)

  if (!amount) {
    cagoToast.error(`請使用 Shift + ${key} 設定金額`)
    return
  }

  if (amountInput.length && openButton.length) {
    cagoToast.info(`${key} = ＄${amount}`, { position: 'bottom-center' })

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
  F1: event => openTrade(event.key),
  F2: event => openTrade(event.key),
  F3: event => openTrade(event.key),
  F4: event => openTrade(event.key),
  'Shift+F1': event => setAmount(event.key),
  'Shift+F2': event => setAmount(event.key),
  'Shift+F3': event => setAmount(event.key),
  'Shift+F4': event => setAmount(event.key),
})
