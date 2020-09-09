const mongoose = require('mongoose');

async function connect(url){
    await mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log('Database connected!');
    })
    .catch((err)=>{
        console.error(err);
    })
}

module.exports = connect;