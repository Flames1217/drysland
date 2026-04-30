import Modal from '@ui/modal'
import SaveSlot from '@ui/save-slot'
import UI from '@ui/ui'
import debounce from '@utils/debounce'
import Debug from '@utils/debug'
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'
import FirebasApp from './app'
import Auth from './auth'

export default class State {
  static #key = 'state'
  static instance = new State()

  constructor() {
    if (State.instance) return State.instance

    this.db = getFirestore(FirebasApp.instance)
  }

  #formatSyncSummary(state) {
    if (!state) return '云存档：暂无'

    const date = state.timestamp
      ? new Date(state.timestamp).toLocaleString(undefined, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      : '未知时间'

    return `云存档：第 ${state.level} 关（${date}）`
  }

  #setSyncStatus(text) {
    UI.syncStatusText?.set(text).show()
  }

  #save(state) {
    if (Debug.enabled) return

    this.#saveLocal(state)
    this.#saveRemote(state)
      .then(saved => {
        if (saved) this.#setSyncStatus(this.#formatSyncSummary(state))
      })
      .catch(() => this.#setSyncStatus('云存档：同步失败'))
  }

  save = debounce(this.#save.bind(this), 1000)

  load = this.#loadLocal.bind(this)

  async sync() {
    const localState = this.#loadLocal()
    let remoteState

    try {
      remoteState = await this.#loadRemote()
    } catch {
      this.#setSyncStatus('云存档：读取失败')
      return
    }

    if (!localState && !remoteState) {
      this.#setSyncStatus('云存档：暂无')
      return
    }

    if (!localState && remoteState) {
      this.#saveLocal(remoteState)
      this.#setSyncStatus(this.#formatSyncSummary(remoteState))
      return
    }

    if (localState && !remoteState) {
      await this.#saveRemote(localState)
      this.#setSyncStatus(this.#formatSyncSummary(localState))
      return
    }

    if (localState.level === remoteState.level && localState.timestamp === remoteState.timestamp) {
      this.#setSyncStatus(this.#formatSyncSummary(remoteState))
      return
    }

    this.#setSyncStatus('云存档：检测到冲突，请选择版本')

    Modal.instance.open('#state-conflict.modal', {
      disableClose: true,
      onBeforeOpen: content => {
        const slot1 = new SaveSlot(localState)
          .onClick(async () => {
            await this.#saveRemote(localState)
            this.#setSyncStatus(this.#formatSyncSummary(localState))
            Modal.instance.close()
          })
          .show()

        const slot2 = new SaveSlot(remoteState)
          .onClick(() => {
            this.#saveLocal(remoteState)
            this.#setSyncStatus(this.#formatSyncSummary(remoteState))
            Modal.instance.close()
          })
          .show()

        content.querySelector('.slots').innerHTML = ''
        content.querySelector('.slots').append(slot1.element, slot2.element)
      },
    })
  }

  #saveLocal(state) {
    localStorage.setItem(State.#key, btoa(JSON.stringify(state)))
  }

  async #saveRemote(state) {
    if (!navigator.onLine || !Auth.instance.user) return false

    const docRef = doc(this.db, 'states', Auth.instance.user.uid)
    await setDoc(docRef, state, { merge: true })
    return true
  }

  #loadLocal() {
    const state = localStorage.getItem(State.#key)
    if (state) return JSON.parse(atob(state))
  }

  async #loadRemote() {
    return getDoc(doc(this.db, 'states', Auth.instance.user.uid)).then(res => res.data())
  }
}
