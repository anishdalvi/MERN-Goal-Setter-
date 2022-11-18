const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

// @desc Get Goals
// @route GET /api/goals
// @access Private

const getGoals = asyncHandler( async (req, res) => {
    const goals = await Goal.find()
    res.status(200).json([{message:"Get Goals"}, goals])
})

// @desc Set Goals
// @route POST /api/goals
// @access Private

const setGoals = asyncHandler( async (req, res) => {
    
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add something in a text field')   // express error handler
    }

    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json([{message:"Goal Created"}, goal])
})


// @desc Update Goals
// @route PUT /api/goals/:id
// @access Private

const updateGoals = asyncHandler( async (req, res) => {

    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    })

    res.status(200).json([{message:"Goal Updated"}, updatedGoal])
})


// @desc Delete Goals
// @route DELETE /api/goals/:id
// @access Private

const deleteGoals = asyncHandler( async(req, res) => {

    const id = req.params.id
    const goal = await Goal.findById(id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }


    await goal.remove()


    res.status(200).json([{message:`Goal ${req.params.id} Deleted`}, id])
})


module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}