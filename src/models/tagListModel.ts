import createId from '@/lib/idCreator'

const localStorageKeyName = 'tagList'

const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]')
    return this.data
  },
  update(id, name) {
    // duplicated
    if (this.data.find(item => item.name === name)) {
      return 'duplicated'
    }

    const tag = this.data.find(item => item.id === id)
    // not found
    if (!tag) {
      return 'not found'
    } else {
      tag.name = name
      this.save()
      return 'success'
    }
  },
  remove(id: string) {
    this.data = this.data.filter(item => item.id != id)
    this.save()
    return 'success'
  },
  create(name: string) {
    const id = createId().toString()
    const names = this.data.map(item => item.name)
    if (names.indexOf(name) >= 0) return 'duplicated'
    this.data.push({id, name})
    this.save()
    return 'success'
  },
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data))
  }
}

export default tagListModel
