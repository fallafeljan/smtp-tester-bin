#!/usr/bin/env node
const {basename} = require('path')
const smtpTester = require('smtp-tester')
const parseOptions = require('argv-options')

let serverPort = 3025

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'test') {
  process.exit(0)
}

try {
  const parsedArgs = parseOptions(process.argv.slice(2), {
    p: {
      alias: 'port',
      optional: true
    }
  })

  if (parsedArgs.port) {
    serverPort = parsedArgs.port
  }
} catch (err) {
  const cmd = basename(process.argv[1])
  console.log(`Usage: ${cmd} [--port number]`)

  process.exit(1)
}

function handler(addr, id, email) {
  const emailData = JSON.stringify(email, null, 2)
  console.log(`New message:\n${emailData}\n`)
}

const mailServer = smtpTester.init(serverPort)
console.log(`SMTP server listening at port ${serverPort}.`)

mailServer.bind(handler)

function shutdown() {
  console.log('Shutting down...')

  mailServer.unbind(handler)
  mailServer.stop()
}

['SIGTERM', 'SIGINT'].forEach(sig =>
  process.on(sig, shutdown))
