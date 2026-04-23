require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(error => console.log("Mongo Error: ", error));

// Debugging script to test DB connection
mongoose.connection.on('connected', async () => {
    console.log("Connection state: ", mongoose.connection.readyState);
    console.log("Connected DB: ", mongoose.connection.name);
    console.log("Connected host: ", mongoose.connection.host);

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections in DB:", collections.map(c => c.name));
})


app.get('/', (req, res) => {
    res.json({
        status : "REST API active",
        version : "1.0"
    });
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));



