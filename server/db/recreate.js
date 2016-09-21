import Query from '../models/queryModel'
import config from '../../package.json'
import '../environmentSetup'
import fs from 'fs'
import shell from 'shelljs'

let queries = [
  `mysqladmin -u ${process.env['VRS_USER']} --password=${process.env['VRS_PASSWORD']} -f drop ${process.env['VRS_DATABASE']}`,
  `mysqladmin -u ${process.env['VRS_USER']} --password=${process.env['VRS_PASSWORD']} create ${process.env['VRS_DATABASE']}"`
]

function executeQuery (count) {
  if (count >= queries.length) {
    config.currentMigration = 0
    fs.writeFileSync('./package.json', JSON.stringify(config, null, 2))
    return
  } else {
    shell.exec(queries[count], function(code, stdout, stderr) {
      if (stderr) {
          console.log(stderr)
      }
      executeQuery(count + 1)
    })
  }
}

executeQuery(0)
