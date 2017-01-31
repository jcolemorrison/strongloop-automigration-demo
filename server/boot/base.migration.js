'use strict'

// the base loopback models
const models = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role']

module.exports = function updateBaseModels (app, next) {
  // reference to our datasource
  const mysql = app.dataSources.mysql

  // check to see if the model is out of sync with DB
  mysql.isActual(models, (err, actual) => {
    if (err) {
      throw err
    }

    let syncStatus = actual ? 'in sync' : 'out of sync'
    console.log('')
    console.log(`Base models are ${syncStatus}`)
    console.log('')

    // if the models are in sync, move along
    if (actual) return next()

    console.log('Migrating Base Models...')

    // update the models
    mysql.autoupdate(models, (err, result) => {
      if (err) throw err
      console.log('Base models migration successful!')
      console.log('')
      next()
    })
  })
}
