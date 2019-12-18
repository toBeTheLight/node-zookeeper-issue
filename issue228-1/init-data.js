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

client.on('connect', () => {
  let nth = 0
  client.a_create(`${options.root}`, 0, JSON.stringify({}), () => {
    setInterval(() => {
      nth++
      client.a_create(`${options.root}/a-very-long-node-path-${nth}`, JSON.stringify({}) , 0, (...args) => {
        console.log(args)
        if (nth > 8000) {
          throw new Error('enough nodes')
        }
      })
    }, 0)
  })
})
client.on('close', (source, code) => {
  console.log('close')
})