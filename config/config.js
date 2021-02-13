// CHECKED!!

const config = {
    development: {
        PORT: 3333,
        SALT_ROUNDS: 10,
        SECRET: 'examSecrets'
    }
};

module.exports = config[process.env.NODE_ENV.trim()];


// ВНИМАВАЙ С DEPENDENCIES!!!



