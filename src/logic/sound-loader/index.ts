import SoundManager from './manager/sound'
import SourceManager from './manager/source'
import SoundPlugin from './plugins/sound'
import SourcePlugin from './plugins/source'

function initSoundLoader() {
  const sourcePlugin = new SourcePlugin()
  const sourceManager = new SourceManager(sourcePlugin)
  const soundPlugin = new SoundPlugin()
  const soundManager = new SoundManager()

  return { sourcePlugin, sourceManager, soundPlugin, soundManager }
}

const sound = initSoundLoader()
export default sound

export const sourcePlugin = sound.sourcePlugin
export const sourceManager = sound.sourceManager
export const soundPlugin = sound.soundPlugin
export const soundManager = sound.soundManager
