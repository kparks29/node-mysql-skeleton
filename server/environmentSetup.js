import config from '../config.json'

if (!config) {
    console.log('Missing config.json')
} else {
  if (process.argv[2] === 'test' || process.argv[2] === './**/*.test.js') {
    console.log('using test database')
    config.database = config.testDatabase
  }
  process.env['VRS_HOST'] = config.host || ''
  process.env['VRS_USER'] = config.user || ''
  process.env['VRS_PASSWORD'] = config.password || ''
  process.env['VRS_DATABASE'] = config.database || ''
  process.env['VRS_PORT'] = config.port || ''
  process.env['VRS_SECRETKEY'] = config.secretKey || ''
}
