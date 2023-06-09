const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT | 5000


require('dotenv').config()
const app = express()

const { query } = require('express');


// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.feigjta.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    const db = client.db('red-onion')
    const Meals = db.collection('meals')

    app.get('/meals', async (req, res) => {
      const meals = await Meals.find({}).toArray()
      res.send(meals)
    })

    app.get('/meals/:category', async (req, res) => {
      const {category} = req.params
      const meals = await Meals.find({category}).toArray()
      res.send(meals)
    })
    
    app.get('/meal/:mealId', async (req, res) => {
      const {mealId} = req.params
      const meal = await Meals.findOne({_id: new ObjectId(mealId)})
      res.send(meal)
    })

    
    // : Previous system
    // app.get('/meal/:mealId', async(req, res) => {
    //   const id = req.params.mealId
    //   const query = { _id: new ObjectId(id)}
    //   const meal = await Meals.findOne(query)
    //   res.send(meal)
    // })

  }
  finally {

  }

}
run().catch(console.log);




app.get('/', async (req, res) => {
  res.send('RedOnion Server is running.')
})

app.listen(port, () => console.log(`RedOnion running at ${port}`))

