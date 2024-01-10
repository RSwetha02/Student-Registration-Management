const express = require('express');
const router = express.Router();
const User = require('../models/user');// for Schema validation

router.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users from the database
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to add a user
router.post('/users',async(req,res)=>{
    try{
        
        const{rno,Student_Name,Father_Name,Mother_Name,DOB,Email,Phone_No,Gender,Level,Department}=req.body;
        const newprg1=new User({rno,Student_Name,Father_Name,Mother_Name,DOB,Email,Phone_No,Gender,Level,Department});
        const savedprg1=await newprg1.save();
        res.json(savedprg1);

    } catch(error){res.status(500).json({error:error.message});
}
});

router.delete('/users/:rno', async (req, res) => {
    try {
        const { rno } = req.params;
        const deletedUser = await User.findOneAndDelete({ rno: rno });

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/users/:rno', async (req, res) => {
    try {
        const { rno } = req.params;
        const {Student_Name,Father_Name,Mother_Name,DOB,Email,Phone_No,Gender,Level,Department} = req.body;

        // Find the user by SId and update the fields
        const updatedUser = await User.findOneAndUpdate(
            { rno: rno },
            {Student_Name:Student_Name,Father_Name:Father_Name,Mother_Name:Mother_Name,DOB:DOB,Email:Email,Phone_No:Phone_No,Gender:Gender,Level:Level,Department:Department},
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}); 

module.exports = router;

