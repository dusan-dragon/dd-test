import express from 'express'
import http from 'http'
import './NotWorkingTracer'

import { ApolloServer } from 'apollo-server-express'


// Setup GQL server
const typeDefs = `
  type Query {
    hello(name: String): String!
    hola(name: String): String!
    ahoy(name: String): String!
  }
`

const resolvers = {
  Query: {
    hello: (_: any, { name }: { name: String }) => `Hello ${name || 'World'}`,
    hola: (_: any, { name }: { name: String }) => `Hola ${name || 'World'}`,
    ahoy: (_: any, { name }: { name: String }) => `Ahoy ${name || 'World'}`,
  },
}

const runServer = async () => {
  const app = express()
  const apollo = new ApolloServer({
    resolvers: resolvers,
    typeDefs,
  })

  apollo.applyMiddleware({ app, path: '/' })

  const server = http.createServer(app)

  // Required to ignore because there's a type mismatch
  // @ts-ignore
  apollo.installSubscriptionHandlers(server)

  server
    .listen({ port: 4000 }, () => {
      console.log(`🚀 Server ready on http://localhost:${4000}${apollo.graphqlPath}`)
      console.log(`🚀 Subscriptions ready on http://localhost:${4000}${apollo.subscriptionsPath}`)
    })
    .on('error', (error: Error) => console.error('GQL server failed', error))
}

runServer()
