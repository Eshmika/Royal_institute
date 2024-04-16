const UserModel = require('../models/Users');

// Create User
const createuser = (req, res) => {
    UserModel.create(req.body)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.error("Error creating user:", err);
            res.status(500).json({ error: "An error occurred while creating user." });
        });
}

// Get all users
const getusers = (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => {
            console.error("Error fetching users:", err);
            res.status(500).json({ error: "An error occurred while fetching users." });
        });
}

// Get user by ID
const getusersid = (req, res) => {
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
}

// Update user
const updateuser = (req, res) => {
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
}

// Delete user
const deleteuser = (req, res) => {
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
}

module.exports = {   
    createuser,
    getusers,
    getusersid,
    updateuser,
    deleteuser
}