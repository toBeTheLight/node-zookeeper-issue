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
  log.warn(`${this.logPrefix} empty event`, { ...args })
})
client.on('connect', () => {
  let nth = 30000
  setInterval(() => {
    client.a_create(`${options.root}/a-node-path-${nth}`, 0, JSON.stringify({}) ,(...args) => {
      console.log(args)
      nth++
    })
  }, 2000)
})