const express = require('express');
const connectDB = require('./config/db');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');
const post = require('./routes/api/posts');
const profile = require('./routes/api/profile');

const app = express();

//Connect database
connectDB();

//Init middlewares
app.use(express.json({
    extented : false
}))

app.get('/', (req, res) => {
    res.send('API Working');
    // console.log("Fetched");
})

app.use('/api/users', users)
app.use('/api/posts', post)
app.use('/api/profile', profile)
app.use('/api/auth', auth);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
})