const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// GET all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// GET a single workout
const getWorkout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Workout!'})
    }

    const workout = await Workout.findById(id)
    if(!workout){
        return res.status(404).json({error: 'No Such Workout!'})
    }

    res.status(200).json(workout)
}

// CREATE a workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){ 
        return res.status(400).json({ error: 'Please fill in all the fields!', emptyFields })
    }

    // Add to DB
    try {
        const workout = await Workout.create({title,load,reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// DELETE a workout
const deleteWorkout = async (req, res) => {
    const {id} = req.params

    //Checking the DATA
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Workout!'})
    }

    //Function DELETE
    const workout = await Workout.findOneAndDelete({_id: id})

    //If the function DELETE not working.
    if(!workout){
        return res.status(400).json({error: 'No Such Workout!'})
    }

    res.status(200).json(workout)
}

// UPDATE a workout
const updateWorkout = async (req, res) => {
    const {id} = req.params

    //Checking the DATA
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No Such Workout!'})
    }

    //Function UPDATE
    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    //If the function UPDATE not working.
    if(!workout){
        return res.status(400).json({error: 'No Such Workout!'})
    }

    res.status(200).json(workout)
}

module.exports = {
    getWorkout,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
}