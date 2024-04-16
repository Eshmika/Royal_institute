const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://kaveeshaliyanage65:Kn%4020001114A@cluster0.eeayfx6.mongodb.net/Main", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// Create User
app.post('/createUser', (req, res) => {
    UserModel.create(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.error("Error creating user:", err);
            res.status(500).json({ error: "An error occurred while creating user." });
        });
});

// Get all users
app.get('/users', (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => {
            console.error("Error fetching users:", err);
            res.status(500).json({ error: "An error occurred while fetching users." });
        });
});

// Get user by ID
app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found." });
            }
            res.json(user);
        })
        .catch(err => {
            console.error("Error fetching user:", err);
            res.status(500).json({ error: "An error occurred while fetching user." });
        });
});

// Update user
app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found." });
            }
            res.json(user);
        })
        .catch(err => {
            console.error("Error updating user:", err);
            res.status(500).json({ error: "An error occurred while updating user." });
        });
});

// Delete user
app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete(id)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found." });
            }
            res.json(user);
        })
        .catch(err => {
            console.error("Error deleting user:", err);
            res.status(500).json({ error: "An error occurred while deleting user." });
        });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
