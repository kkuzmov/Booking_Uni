const express = require('express');

const app = express();
const config = require('./config/config');
const expressConfig = require('./config/express');
const mongoose = require('./config/mongoose');
const routes = require('./routes');

expressConfig(app);
mongoose(app);

app.use(routes);

app.listen(config.PORT, ()=>{
    console.log(`Server is running on port ${config.PORT}`)
});

// ЧАСТ ОТ EXAM PACKAGE!