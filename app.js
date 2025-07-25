require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./src/routes/userRoute');
const categoryRoutes = require('./src/routes/categoryRoute');
const tutorRoutes = require('./src/routes/tutorRoute');
const kelasRoutes = require('./src/routes/kelasRoute');
const authRoutes = require('./src/routes/authRoute');
const userController = require('./src/controllers/userController')
const port = 3000;

app.use(express.json());
app.get('/api/users/verify-email', userController.verifyEmail);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', tutorRoutes);
app.use('/api', kelasRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});