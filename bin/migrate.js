'use strict'

const path = require('path')

// import our app for one time usage
const server = require(path.resolve(__dirname, '../server/server.js'))

// reference to our datasource that we named 'mysql'
const mysql = server.dataSources.mysql

// the basic loopback model tables
const base = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role']

// our custom models
const custom = ['Widget', 'Client']
const lbTables = [].concat(base, custom)

// Run through and create all of them
mysql.automigrate(lbTables, function (err) {
  if (err) throw err
  console.log(' ')
  console.log('Tables [' + lbTables + '] reset in ' + mysql.adapter.name)
  console.log(' ')
  mysql.disconnect()
  process.exit(0)
})
