// 音源插件接口
export interface ISourcePlugin {
  id: string
  name: string
  fetchCategories: () => Promise<string[]>
  fetchTracks: (category: string) => Promise<any[]>
}

// 音源插件管理器
export default class SourcePlugin {
  private plugins: ISourcePlugin[] = []

  register(plugin: ISourcePlugin) {
    this.plugins.push(plugin)
  }

  getPlugins() {
    return this.plugins
  }

  getPluginById(id: string) {
    return this.plugins.find(p => p.id === id)
  }
}
