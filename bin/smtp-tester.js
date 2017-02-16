#!/usr/bin/env node
const {basename} = require('path')
const smtpTester = require('smtp-tester')
const parseOptions = require('argv-options')

let serverPort = 25

try {
  const parsedArgs = parseOptions(process.argv.slice(2), {
    p: {
      alias: 'port',
      optional: true
    }
  })

  serverPort = parsedArgs.port
} catch (err) {
  const cmd = basename(process.argv[1])

  // eslint-disable-next-line no-console
  console.log(`Usage: ${cmd} [--port number]`)

  process.exit(1)
}

function handler(addr, id, email) {
  // no-op
}

const mailServer = smtpTester.init(serverPort)
mailServer.bind(handler)

process.on('SIGTERM', () => {
  // eslint-disable-next-line no-console
  console.log('Shutting down...')

  mailServer.unbind(handler)
  mailServer.stop()
})
