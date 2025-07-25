import type SourcePlugin from './source-plugin'

// 分类信息
interface ICategory {
  name: string // 分类名
  styles: string[] // 风格
}

// 平台信息
interface ISource {
  id: string // 平台唯一ID
  name: string // 平台名
  url: string // 平台主页
  categories: ICategory[] // 分类列表
}

export default class SourceManager {
  plugin: SourcePlugin
  sources: ISource[]

  constructor(sourcePlugin: SourcePlugin) {
    this.plugin = sourcePlugin
    this.sources = []
  }

  // 添加平台
  addSource(name: string, url: string) {
    const id = crypto.randomUUID()
    this.sources.push({ id, name, url, categories: [] })
    return id
  }

  // 删除平台
  removeSource(id: string) {
    this.sources = this.sources.filter(src => src.id !== id)
  }

  // 添加分类到指定平台
  addCategory(sourceId: string, category: ICategory) {
    const source = this.sources.find(src => src.id === sourceId)
    if (source) {
      source.categories.push(category)
    }
  }

  // 删除指定平台下的分类
  removeCategory(sourceId: string, categoryName: string) {
    const source = this.sources.find(src => src.id === sourceId)
    if (source) {
      source.categories = source.categories.filter(cat => cat.name !== categoryName)
    }
  }

  // 查询平台
  getSource(id: string) {
    return this.sources.find(src => src.id === id)
  }

  // 查询所有平台
  getAllSources() {
    return this.sources
  }
}
