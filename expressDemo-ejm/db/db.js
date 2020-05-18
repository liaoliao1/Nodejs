let mongoose = require('mongoose')
const DB_NAME = 'users'
const DB_URL = 'localhost:27017'

let dbPromise = new Promise((resolve, reject) => {
    mongoose.set('useCreateIndex', true)
    mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`, {useNewUrlParser: true,useUnifiedTopology: true})
    mongoose.connection.on('open', (err) => {
        if (!err) {
            console.log(`位于${DB_URL}的${DB_NAME}数据库连接成功`);
            resolve()
        } else {
            reject(err)
        }
    })
})

module.exports = dbPromise