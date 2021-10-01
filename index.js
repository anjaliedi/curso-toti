const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')
const Task = require('./models/task')

const app = express()
const sequelize = new Sequelize({ dialect: 'sqlite', storage: './task-list.db' })
const tasks = Task(sequelize, DataTypes)

// We need to parse JSON coming from requests
app.use(express.json())

// List tasks
app.get('/tasks', async (req, res) => {
  
  const tasksall = await tasks.findAll()

  res.json(tasksall)
})

// Create task
app.post('/tasks', async (req, res) => {
  const body = req.body
  await tasks.create(body)
  
  res.json(body)
})

// Show task
app.get('/tasks/:id', async (req, res) => {
  const taskId = req.params.id
const task = await tasks.findByPk(taskId)
  res.send(task)
})



// Update task
app.put('/tasks/:id', async (req, res) => {
  const taskId = req.params.id
  const pasts = req.body
  const pert = await tasks.findByPk(taskId)
  pert.update(pasts)
  

  res.send("atualização feita")
})

// Delete task
app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id
  await tasks.destroy({ where: { id: taskId} })
  res.send("foi deletado")
})

app.listen(3000, () => {
  console.log('Iniciando o ExpressJS na porta 3000')
})
