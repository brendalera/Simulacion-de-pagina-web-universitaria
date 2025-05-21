const express = require('express')
const cors = require('cors')
const app = express() 

app.use(cors());
app.use(express.json());
app.use('/data', express.static('data'));
app.use(express.static('public'));
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
})

