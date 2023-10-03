const express = require('express')
const app = express()
const cors = require("cors");
require("dotenv").config();
const blogRouter = require('./routes/blog')
const errorMiddleware = require('./middlewares/error')

const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use(cors())
app.use('/api', blogRouter);
app.use(errorMiddleware);


app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})