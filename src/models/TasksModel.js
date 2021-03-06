const { ObjectId } = require('mongodb');
const connection = require('../connection/connections');

const getTaskById = async (id) => {
  if (!ObjectId.isValid(id)) { return null; }

  const db = await connection();
  const task = db.collection('tasks').findOne(ObjectId(id));
  return task;
};

const getAllTasks = async () => {
  const db = await connection();
  const tasks = await db.collection('tasks').find().toArray();
  return tasks;
};

const createNewTask = async ({ task, description, status, createdDate }) => {
  const db = await connection();
  const inserted = await db.collection('tasks').insertOne(
    { task, description, status, createdDate },
  );
  return { _id: inserted.insertedId, task, description, status, createdDate };
};

const updateTask = async (id, task) => {
  if (!ObjectId.isValid(id)) { return null; }

  const db = await connection();
  await db.collection('tasks').updateOne(
    { _id: ObjectId(id) }, 
    { $set: task },
  );

  return { _id: id, ...task };
};

const excludeTask = async ({ id }) => {
  if (!ObjectId.isValid(id)) { return null; }

  const db = await connection();
  await db.collection('tasks').deleteOne({ _id: ObjectId(id) });
  return { message: 'Tarefa excluída com sucesso!' };
};

module.exports = { getTaskById, getAllTasks, createNewTask, updateTask, excludeTask };