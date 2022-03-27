import { MongoClient } from 'mongodb'

const MONGO_URL = import.meta.env.VITE_MONGO_URL

if (!MONGO_URL) {
  throw("please put your MONGO_URL in the environment")
}

const db = new Promise((resolve,reject) => {
  MongoClient.connect(MONGO_URL,(err, db) => {
    if (err) {reject(err)} else {resolve(db)}
  })})

export const animals_collection = db.then((_) => {return _.db("animals").collection('animals')})

export const get_animals = async () => (await animals_collection).find({}).toArray()

export const get_animal = async (_id) => (await animals_collection).findOne({_id})

export const put_animal = async (animal) => (await animals_collection).insertOne(animal)

export const delete_animal = async (_id) => (await animals_collection).deleteOne({_id})
