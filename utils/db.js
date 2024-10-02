// utils/db.js
const { MongoClient } = require('mongodb');

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';

        this.url = `mongodb://${host}:${port}`;
        this.databaseName = database;
        this.client = new MongoClient(this.url);

        this.client.connect()
            .then(() => console.log('Connected to MongoDB'))
            .catch(err => console.error('MongoDB Client Error', err));
    }

    isAlive() {
        return this.client.isConnected();
    }

    async nbUsers() {
        const db = this.client.db(this.databaseName);
        const usersCollection = db.collection('users');
        return await usersCollection.countDocuments();
    }

    async nbFiles() {
        const db = this.client.db(this.databaseName);
        const filesCollection = db.collection('files');
        return await filesCollection.countDocuments();
    }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
module.exports = { dbClient };
