const express = require('express');
const { run } = require('./config');
const router = require('./routes');
const app = express()
const port = 4001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router)
run().catch(console.dir)

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
