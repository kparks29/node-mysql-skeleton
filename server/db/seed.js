import Query from '../models/queryModel'
import '../environmentSetup'

let queries = []
let seed = new Query(...queries)

seed.then((results) => {
  console.log('DONE')
  process.exit()
}).catch((err) => {
  console.log(err)
  process.exit()
})
