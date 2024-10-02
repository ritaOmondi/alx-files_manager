// utils/redis.js
const redis = require('redis');

class RedisClient {
    constructor() {
        this.client = redis.createClient();

        // Handle errors
        this.client.on('error', (err) => {
            console.error('Redis Client Error', err);
        });

        this.client.on('connect', () => {
            console.log('Connected to Redis');
        });
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });
    }

    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.setex(key, duration, value, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    }

    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, reply) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(reply);
                }
            });
        });
    }
}

// Create and export an instance of RedisClient
	const redisClient = new RedisClient();
	module.exports = { redisClient };
