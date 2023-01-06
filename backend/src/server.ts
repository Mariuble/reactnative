import express from 'express'
import connectDB from './config/db'
import schema from './schemas/movieSchema'
import { ApolloServer } from 'apollo-server-express'

const startServer = async () => {
  const PORT = process.env.PORT || 5000

  const app = express()

  // Connect to the database
  const init = async () => {
    await connectDB()
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
    )
  }

  app.use(express.json()) // Allow JSON data in body

  const server = new ApolloServer({
    schema: schema, // implicit typeDefs and resolver
  })

  await server.start()
  server.applyMiddleware({ app, path: '/graphql' }) // add middleware to handle graphql requests

  app.listen(PORT, init)
}

startServer()
