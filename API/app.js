const Router = require('./route');
const express = require('express');
const app = express();
const port = 3001;

const InternalIp = require('internal-ip');
const internalIP = InternalIp.v4.sync();

app.use(express.json());
app.use(Router);

app.listen(port, internalIP, () => {
    console.log(`Server is running on adresse : http://${internalIP}:${port}`);
});