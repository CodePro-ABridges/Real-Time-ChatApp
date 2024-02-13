import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { WebSocketServer } from "ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/lib/use/ws";
import dotenv from "dotenv";
import cors from "cors";
import resolvers from "./schemas/resolvers";
import typeDefs from "./schemas/typeDefs";

dotenv.config();
const app = express();
app.use(cors());

const PORT = 8080;
const httpServer = http.createServer(app);

const socketServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({ schema });

(async () => {
  try{
  useServer({ schema }, socketServer)
  await server.start();
  httpServer.listen({ port: PORT }, () => {
      console.log(`Server listening on http://localhost:${PORT}${server.graphqlPath}`);
    });


  }
})
