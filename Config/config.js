module.exports = {
    api:{
       port: process.env.PORT || 3000, 
    },
    db:{
        dbURL: process.env.DB_URL || 'mongodb+srv://db_user_projectBack:0mMFsGbQYoZt00UO@cluster0.qihyq.mongodb.net/practice_db?retryWrites=true&w=majority'
    },
    jwt:{
        secret: process.env.MY_SECRET || 'mysecret'
    },
}