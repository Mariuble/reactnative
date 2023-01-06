import mongoose from 'mongoose'

// Defining the data in the actual database. One const per 'collection'
const movieSchema = new mongoose.Schema({
  Title: {
    type: String,
    required: true,
    default: '',
  },
  Type: {
    type: String,
    required: false,
    default: '',
  },
  Episodes: {
    type: Number,
    required: false,
    default: 0,
  },
  Status: {
    type: String,
    required: false,
    default: '',
  },
  Start_airing: {
    type: String,
    required: false,
    default: '',
  },
  End_airing: {
    type: String,
    required: false,
    default: '',
  },
  Starting_season: {
    type: String,
    required: false,
    default: '',
  },
  Broadcast_time: {
    type: String,
    required: false,
    default: '',
  },
  Producers: {
    type: String,
    required: false,
    default: '',
  },
  Licensors: {
    type: String,
    required: false,
    default: '',
  },
  Studios: {
    type: String,
    required: false,
    default: '',
  },
  Sources: {
    type: String,
    required: false,
    default: '',
  },
  Genres: {
    type: String,
    required: false,
    default: '',
  },
  Duration: {
    type: String,
    required: false,
    default: '',
  },
  Rating: {
    type: String,
    required: false,
    default: '',
  },
  Score: {
    type: Number,
    required: false,
    default: 0,
  },
  Scored_by: {
    type: Number,
    required: false,
    default: 0,
  },
  Members: {
    type: Number,
    required: false,
    default: 0,
  },
  Favorites: {
    type: Number,
    required: false,
    default: 0,
  },
  Description: {
    type: String,
    required: false,
    default: '',
  },
})

const Movie = mongoose.model('Movie', movieSchema)

export default Movie
