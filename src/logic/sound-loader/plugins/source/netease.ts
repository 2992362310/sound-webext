import forge from 'node-forge'
import mitt from '../../mitt'
import { soundManager } from '~/logic/sound-loader'

export function _create_secret_key(size: number) {
  const result = []
  const choice = '012345679abcdef'.split('')
  for (let i = 0; i < size; i += 1) {
    const index = Math.floor(Math.random() * choice.length)
    result.push(choice[index])
  }
  return result.join('')
}

export function _aes_encrypt(text: string, sec_key: string, algo: forge.cipher.Algorithm) {
  const cipher = forge.cipher.createCipher(algo, sec_key)
  cipher.start({ iv: '0102030405060708' })
  cipher.update(forge.util.createBuffer(text))
  cipher.finish()

  return cipher.output
}

export function _rsa_encrypt(text: string, pubKey: string, modulus: string) {
  text = text.split('').reverse().join('')
  const n = new forge.jsbn.BigInteger(modulus, 16)
  const e = new forge.jsbn.BigInteger(pubKey, 16)
  const b = new forge.jsbn.BigInteger(forge.util.bytesToHex(text), 16)
  const enc = b.modPow(e, n).toString(16).padStart(256, '0')
  return enc
}

export function weapi<T>(text: T) {
  const modulus
    = '00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b72'
      + '5152b3ab17a876aea8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbd'
      + 'a92557c93870114af6c9d05c4f7f0c3685b7a46bee255932575cce10b424d813cfe48'
      + '75d3e82047b97ddef52741d546b8e289dc6935b3ece0462db0a22b8e7'
  const nonce = '0CoJUm6Qyw8W8jud'
  const pubKey = '010001'
  const str = JSON.stringify(text)
  const sec_key = _create_secret_key(16)
  const enc_text = btoa(
    _aes_encrypt(
      btoa(_aes_encrypt(str, nonce, 'AES-CBC').data),
      sec_key,
      'AES-CBC',
    ).data,
  )
  const enc_sec_key = _rsa_encrypt(sec_key, pubKey, modulus)
  const data = {
    params: enc_text,
    encSecKey: enc_sec_key,
  }

  return data
}

// refer to https://github.com/Binaryify/NeteaseCloudMusicApi/blob/master/util/crypto.js
function eapi(url, object) {
  const eapiKey = 'e82ckenh8dichen8'

  const text = typeof object === 'object' ? JSON.stringify(object) : object
  const message = `nobody${url}use${text}md5forencrypt`
  const digest = forge.md5
    .create()
    .update(forge.util.encodeUtf8(message))
    .digest()
    .toHex()
  const data = `${url}-36cd479b6b5-${text}-36cd479b6b5-${digest}`

  return {
    params: _aes_encrypt(data, eapiKey, 'AES-ECB').toHex().toUpperCase(),
  }
}

export function ne_show_toplist(offset) {
  if (offset !== undefined && offset > 0) {
    return {
      success: fn => fn({ result: [] }),
    }
  }

  const url = 'https://music.163.com/weapi/toplist/detail'
  const data = weapi({})

  fetch(url, {
    method: 'post',
    body: new URLSearchParams(data),
  })
    .then(res => res.json())
    .then((response) => {
      const result = []
      response.list.forEach((item) => {
        const playlist = {
          cover_img_url: item.coverImgUrl,
          id: `neplaylist_${item.id}`,
          source_url: `https://music.163.com/#/playlist?id=${item.id}`,
          title: item.name,
        }
        result.push(playlist)
      })
      console.log(result)
    })
}

// 发现页歌单
export function list(url: string) {
  const order = 'hot'
  const offset = getParameterByName('offset', url)
  const filterId = getParameterByName('filter_id', url)

  if (filterId === 'toplist') {
    return ne_show_toplist(offset)
  }

  let filter = ''
  if (filterId !== '') {
    filter = `&cat=${filterId}`
  }
  let target_url = ''
  if (offset != null) {
    target_url = `https://music.163.com/discover/playlist/?order=${order}${filter}&limit=35&offset=${offset}`
  }
  else {
    target_url = `https://music.163.com/discover/playlist/?order=${order}${filter}`
  }

  fetch(target_url, {
    method: 'get',
  }).then(res => res.text()).then((data) => {
    // 4. 安全插入HTML (使用DOMPurify清理XSS风险)
    // if (containerRef.value) {
    //   const cleanHtml = DOMPurify.sanitize(data)
    //   containerRef.value.innerHTML = cleanHtml
    // }

    const list_elements = Array.from(
      new DOMParser()
        .parseFromString(data, 'text/html')
        .getElementsByClassName('m-cvrlst')[0].children,
    )

    const result = list_elements.map(item => ({
      cover_img_url: item
        .getElementsByTagName('img')[0]
        .src.replace('140y140', '512y512'),

      title: item
        .getElementsByTagName('div')[0]
        .getElementsByTagName('a')[0].title,
      id: `neplaylist_${getParameterByName(
        'id',
        item.getElementsByTagName('div')[0].getElementsByTagName('a')[0]
          .href,
      )}`,
      source_url: `https://music.163.com/#/playlist?id=${getParameterByName(
        'id',
        item.getElementsByTagName('div')[0].getElementsByTagName('a')[0]
          .href,
      )}`,
    }))

    console.log(result)
  })
}

// 歌单歌曲列表
export function ng_parse_playlist_tracks(playlist_tracks: any) {
  const target_url = 'https://music.163.com/weapi/v3/song/detail'
  const track_ids = playlist_tracks.map(i => i.id)
  const d = {
    c: `[${track_ids.map((id: number) => `{"id":${id}}`).join(',')}]`,
    ids: `[${track_ids.join(',')}]`,
  }
  const data = weapi(d)
  fetch(target_url, {
    method: 'post',
    body: new URLSearchParams(data),
  }).then(res => res.json()).then((data) => {
    const tracks = data.songs.map((track_json: any) => ({
      id: `netrack_${track_json.id}`,
      title: track_json.name,
      artist: track_json.ar[0].name,
      artist_id: `neartist_${track_json.ar[0].id}`,
      album: track_json.al.name,
      album_id: `nealbum_${track_json.al.id}`,
      source: 'netease',
      source_url: `https://music.163.com/#/song?id=${track_json.id}`,
      img_url: track_json.al.picUrl,
      // url: `netrack_${track_json.id}`,
    }))
    console.log(tracks)

    bootstrap_track(tracks[1])
  })
}

// 播放歌曲
export function bootstrap_track(track) {
  const target_url = `https://interface3.music.163.com/eapi/song/enhance/player/url`
  let song_id = track.id
  const eapiUrl = '/api/song/enhance/player/url'

  song_id = song_id.slice('netrack_'.length)

  const d = {
    ids: `[${song_id}]`,
    br: 999000,
  }
  const data = eapi(eapiUrl, d)
  const expire
      = (new Date().getTime() + 1e3 * 60 * 60 * 24 * 365 * 100) / 1000

  fetch(target_url, { method: 'post', body: new URLSearchParams(data) })
    .then(res => res.json())
    .then((response) => {
      const { url, br } = response.data[0]
      console.log('response--', response)
      if (url != null) {
        const info = {}
        info.url = url
        const bitrate = `${(br / 1000).toFixed(0)}kbps`
        info.bitrate = bitrate
        info.platform = 'netease'
        info.song = '111'

        const cid = soundManager.add(info)
        soundManager.play(cid)

        mitt.emit('add')

        console.log(url)
      }
    })
}

export function ne_get_playlist(list_id: number) {
  const target_url = 'https://music.163.com/weapi/v3/playlist/detail'
  const d = {
    id: list_id,
    offset: 0,
    total: true,
    limit: 1000,
    n: 1000,
    csrf_token: '',
  }
  const data = weapi(d)

  fetch(target_url, { method: 'post', body: new URLSearchParams(data) }).then(res => res.json())
    .then((data) => {
      const max_allow_size = 1000
      const trackIdsArray = split_array(
        data.playlist.trackIds,
        max_allow_size,
      )
      ng_parse_playlist_tracks(trackIdsArray[0])
    })
}

export function getParameterByName(name: string, url: string) {
  if (!url)
    url = window.location.href
  name = name.replace(/[[\]]/g, '\\$&')
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)

  const results = regex.exec(url)
  if (!results)
    return null
  if (!results[2])
    return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

export function split_array(myarray, size) {
  const count = Math.ceil(myarray.length / size)
  const result = []
  for (let i = 0; i < count; i += 1) {
    result.push(myarray.slice(i * size, (i + 1) * size))
  }
  return result
}
