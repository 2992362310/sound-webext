import * as Tone from 'tone'

export interface ISoundInfo {
  song: string
  singer: string
  url: string
  thumbnail: string
  lyrics: string
}

interface ISoundItem {
  cid: string
  info: ISoundInfo
  player?: Tone.Player
}

export default class SoundManager {
  sounds: ISoundItem[]
  cid: string | null

  constructor() {
    this.sounds = []
    this.cid = null
  }

  add(info: ISoundInfo) {
    const cid = crypto.randomUUID()
    this.sounds.push({ cid, info })
  }

  remove(cid: string) {
    const { sounds } = this
    const index = sounds.findIndex(item => item.cid === cid)
    sounds.splice(index, 0)
  }

  play(cid: string) {
    this.cid = cid

    const sound = this.findSound(cid)
    if (sound.player) {
      sound.player.restart()
    }
    else {
      const { info } = sound
      const player = new Tone.Player(info.url).toDestination()
      player.autostart = true
      sound.player = player
    }
  }

  stop() {
    const { cid } = this
    if (!cid)
      return

    const sound = this.findSound(cid)
    sound.player?.stop()
  }

  pre() {
    const { sounds } = this
    const len = sounds.length
    if (!len)
      return

    this.stop()

    let index = this.findSoundIndex()
    index = (index - 1 + len) % len
    this.play(sounds[index].cid)
  }

  next() {
    const { sounds } = this
    const len = sounds.length
    if (!len)
      return

    this.stop()

    let index = this.findSoundIndex()
    index = (index + 1) % len
    this.play(sounds[index].cid)
  }

  findSound(cid: string) {
    const { sounds } = this
    const sound = sounds.find(item => item.cid === cid)
    return sound || sounds[0]
  }

  findSoundIndex() {
    const { sounds, cid } = this
    const index = sounds.findIndex(item => item.cid === cid)
    return index > -1 ? index : 0
  }
}
