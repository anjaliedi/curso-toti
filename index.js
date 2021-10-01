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

  res.json({"lista de tarefas": tasksall})
})

// Create task
app.post('/tasks', async (req, res) => {
  const body = req.body
  if (Object.keys(body).length != 0){
    await tasks.create(body)
    res.json({"Foi inserida nova tarefa":body})
  } else
  res.send("Não foi criado porque deve enviar pelo menos alguma informação")
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
  if (pert){
    pert.update(pasts)  
    res.send({"atualização feita":pert})
  } else
  res.send("Não foi achado: "+taskId)
  
  
})

// Delete task
app.delete('/tasks/:id', async (req, res) => {
  const taskId = req.params.id
  const tarefa = await tasks.findByPk(taskId)
  if (tarefa){
    await tasks.destroy({ where: { id: taskId} })
 
    res.send("foi deletado")
  } else
  res.send("Não foi achada uma tarefa com o id: "+taskId)
 
})

app.listen(3000, () => {
  console.log('Iniciando o ExpressJS na porta 3000')
})
