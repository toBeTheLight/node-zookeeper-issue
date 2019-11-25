const Zookeeper = require('../lib')
const options = require('./options')

const client = new Zookeeper({
  connect: options.address,
  timeout: 1000 * 60 * 10,
  data_as_buffer: false,
  debug_level: Zookeeper.ZOO_LOG_LEVEL_WARN
})
client.connect((err) => {
  console.error(err)
})
client.on('empty', (...args) => {
  log.warn(`${this.logPrefix} empty 事件`)
  log.warn(`${this.logPrefix} empty 事件参数`, { ...args })
})
client.on('connect', () => {
  function watchChildren () {
    client.aw_get_children(options.root, (type, state, path) => {
      console.log(`${path} children changed`)
      watchChildren()
    }, (item, code, children) => {
      console.log('children got', children.length)
    })
  }
  watchChildren()
})