const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Replace '<your_mongodb_uri>' with the URI of your MongoDB database
        const mongoURI = process.env.MONGO_URI;

        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

// Export the connectDB function
module.exports = connectDB;
