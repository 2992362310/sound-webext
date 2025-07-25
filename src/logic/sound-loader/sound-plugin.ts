// 处理插件接口
export interface IProcessorPlugin {
  id: string
  name: string
  process: (track: any) => Promise<any>
}

// 处理插件管理器
export default class SoundPlugin {
  private plugins: IProcessorPlugin[] = []

  register(plugin: IProcessorPlugin) {
    this.plugins.push(plugin)
  }

  getPlugins() {
    return this.plugins
  }

  getPluginById(id: string) {
    return this.plugins.find(p => p.id === id)
  }
}
