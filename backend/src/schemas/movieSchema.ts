import {
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'
import { title } from 'process'
import Movie from '../models/movieModel'

// Object type, gql vs. GraphQLObjectType??
// const MovieType2 = gql`
//   type Movie {
//     title: String!
//     type: String!
//     episodes: Number!
//     status: String!
//     start-airing: String!
//     end-airing: String!
//     starting-season: String!
//     broadcast-time: String!
//     producers: [String]!
//     licensors: [String]!
//     studios: String!
//     sources: String!
//     genres: [String]!
//     duration: String!
//     rating: String!
//     score: Number!
//     scored_by: Number!
//     members: Number!
//     favorites: Number!
//     description: String!
//   }
// `
const MovieType = new GraphQLObjectType({
  name: 'movie',
  fields: () => ({
    _id: { type: GraphQLString },
    Title: { type: GraphQLString },
    Type: { type: GraphQLString },
    Episodes: { type: GraphQLInt },
    Status: { type: GraphQLString },
    Start_airing: { type: GraphQLString },
    End_airing: { type: GraphQLString },
    Starting_season: { type: GraphQLString },
    Broadcast_time: { type: GraphQLString },
    Producers: { type: GraphQLString },
    Licensors: { type: GraphQLString },
    Studios: { type: GraphQLString },
    Sources: { type: GraphQLString },
    Genres: { type: GraphQLString },
    Duration: { type: GraphQLString },
    Rating: { type: GraphQLString },
    Score: { type: GraphQLFloat },
    Scored_by: { type: GraphQLInt },
    Members: { type: GraphQLInt },
    Favorites: { type: GraphQLInt },
    Description: { type: GraphQLString },
  }),
})

// Endpoint for queries
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    //Query tags
    countMoviesByTitle: {
      type: GraphQLInt,
      args: {
        title: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const movies = await Movie.count({
          Title: new RegExp(args.title, 'i'),
        })
        return movies
      },
    },
    sortMoviesByTitle: {
      type: new GraphQLList(MovieType),
      args: {
        title: { type: GraphQLString },
        first: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        sort: { type: GraphQLString },
      },
      async resolve(parent, args) {
        //Finds all documents with a title containing the text from the search field, paginates based on the offset and limits results per query by "first"(limit), and then sorts the output based on the selected sorting value
        if (args.sort === 'Title') {
          const movies = await Movie.find({
            Title: new RegExp(args.title, 'i'),
          })
            .skip(args.offset)
            .limit(args.first)
            .sort({ Title: 1 })
          return movies
        } else if (args.sort === 'Score') {
          const movies = await Movie.find({
            Title: new RegExp(args.title, 'i'),
          })
            .skip(args.offset)
            .limit(args.first)
            .sort({ Score: -1 })
          return movies
        }
        const movies = await Movie.find({
          Title: new RegExp(args.title, 'i'),
        })
        return movies
      },
    },
    testQuery: {
      type: new GraphQLList(MovieType),
      args: {
        title: { type: GraphQLString },
        first: { type: GraphQLInt },
        offset: { type: GraphQLInt },
        sorting: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const movies = await Movie.find({ Score: { $elemMatch: { $gte: 8 } } })
        return movies
      },
    },
  },
})

// Mutation query under here...

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    addMovie: {
      type: new GraphQLList(MovieType),
      args: {
        title: { type: GraphQLString },
        type: { type: GraphQLString },
        episodes: { type: GraphQLInt },
        score: { type: GraphQLFloat },
        description: { type: GraphQLString },
      },
      async resolve(parent, args) {
        await Movie.insertMany({
          Title: args.title,
          Type: args.type,
          Episodes: args.episodes,
          Score: args.score,
          Description: args.description,
        })
      },
    },
  },
})

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
})

export default schema
