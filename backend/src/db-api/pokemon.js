'use strict'

/* Global Imports */
import Debug from 'debug'
import { Pokemon } from '../models'

/* Config vars */
const debug = new Debug('nodejs-pokeApp-backend:db-api:pokemon')

export default {

  create: async (objectPokemon) => {
    debug('Create Pokemon')
    const pokemon = new Pokemon(objectPokemon)
    return pokemon.save()
  },

  findById: async (_id) => {
    debug('FindById Pokemon')
    const pokemon = await Pokemon.findOne({ _id })
    return pokemon
  },

  findByPokemonId: async (id) => {
    debug('FindByPokemonId Pokemon')
    const pokemon = await Pokemon.findOne({ id })
    return pokemon
  },

  findByPokemonName: async (name) => {
    debug('FindByPokemonName Pokemon')
    const pokemon = await Pokemon.findOne({ name })
    return pokemon
  },

  findAll: async () => {
    debug('FindAll Pokemon')
    const pokemons = await Pokemon.find()
    return pokemons
  },

  update: async (_id, objectPokemon) => {
    debug('Update Pokemon')
    const pokemonUpdated = await Pokemon.findByIdAndUpdate(_id, objectPokemon)
    return pokemonUpdated
  },

  delete: async (_id) => {
    debug('Delete Pokemon')
    const pokemonDeleted = await Pokemon.findOneAndDelete(_id)
    return pokemonDeleted
  }

}
