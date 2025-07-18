import SoundManager from './manager/sound'
import SourceManager from './manager/source'
import SoundPlugin from './plugins/sound'
import SourcePlugin from './plugins/source'

function initSoundLoader() {
  const sourcePlugin = new SourcePlugin()
  const soruceManager = new SourceManager()
  const soundPlugin = new SoundPlugin()
  const soundManager = new SoundManager()

  return { sourcePlugin, soruceManager, soundPlugin, soundManager }
}

const sound = initSoundLoader()

export default sound
