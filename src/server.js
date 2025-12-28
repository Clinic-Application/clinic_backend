const db = require('./config/database');
const app = require('./app');

const port = 5002;

// ready the database
db.serialize(() =>{
    console.log('Database initialized')
})


app.listen(port, () =>{
    console.log(`server running on port ${port}`);
})
