import type * as Tone from 'tone'

export interface ISoundInfo {
  song: string
  url: string
  singer: string
  thumbnail?: string
  lyrics?: string
}

export interface ISoundItem {
  cid: string
  info: ISoundInfo
  player?: Tone.Player
}
