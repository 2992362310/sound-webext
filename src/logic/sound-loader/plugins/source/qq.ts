export function get_playlist_filters() {
  const target_url
      = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_tag_conf.fcg'
        + `?picmid=1&rnd=${Math.random()}&g_tk=732560869`
        + '&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8'
        + '&notice=0&platform=yqq.json&needNewCode=0'

  fetch(target_url).then(res => res.json()).then((data) => {
    console.log(data)
  })
}
