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
client.on('connect', async () => {
  function initRoot () {
    return new Promise((resolve, reject) => {
      client.a_create(`${options.root}`, '', false, () => {
        resolve()
      })
    })
  }
  function initLargeNodeData () {
    return new Promise((resolve, reject) => {
      let startLength = 1040000
      function setNode () {
        startLength += 100
        client.a_get(`${options.root}`, false ,(rc, error, stat, data) => {
          const newData = new Array(startLength).fill('1').join('')
          client.a_set(`${options.root}`, newData, stat.version, (rc) => {
            if (rc === 0) {
              setNode()
            } else {
              console.log('node data size', startLength)
              resolve('complete')
            }
          })
        })
      }
      setNode()
    })
  }
  function initEnoughNodes () {
    return new Promise((resolve, reject) => {
      let counts = 0
      function createNode () {
        client.a_create(`${options.root}/a-child-nodes-with-a-very-very-long-path-name-${counts}`, '', false, (rc) => {
          counts += 1
          console.log('children counts, ', counts)
          if (counts >= 100000) {
            return resolve()
          }
          createNode()
        })
      }
      createNode()
      createNode()
      createNode()
      createNode()
      createNode()
      createNode()
      createNode()
      createNode()
      createNode()
      createNode()
      createNode()
      createNode()
      createNode()
      createNode()
      createNode()
      createNode()
      createNode()
      createNode()
      createNode()
      createNode()
    })
  }
  await initRoot()
  await initEnoughNodes()
  await initLargeNodeData()
  client.close()
})