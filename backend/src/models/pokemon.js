'use strict'

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const description = { name: String, url: String }
const descriptionSchema = new Schema(description)

const globalInfo = { ability: { type: descriptionSchema }, is_hidden: Boolean, slot: Number }
const globalInfoSchema = new Schema(globalInfo)

const sprites = {
  back_default: String,
  back_female: String,
  back_shiny: String,
  back_shiny_female: String,
  front_default: String,
  front_female: String,
  front_shiny: String,
  front_shiny_female: String
}
const spritesSchema = new Schema(sprites)

const typeInfo = { slot: Number, type: descriptionSchema }
const typeInfoSchema = new Schema(typeInfo)

const PokemonSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  height: { type: Number },
  weight: { type: Number },
  abilities: [{ type: globalInfoSchema }],
  sprites: { type: spritesSchema },
  species: { type: descriptionSchema },
  types: [{ type: typeInfoSchema }]
})

export default mongoose.model('Pokemon', PokemonSchema, 'pokemon')
