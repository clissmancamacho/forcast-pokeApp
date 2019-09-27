'use strict'

/* Global Imports */
import { dbPokemon } from '../db-api'
import { Error, Success } from '../util'
import Debug from 'debug'

/* Config Vars */
const debug = new Debug('nodejs-pokeApp-backend:controllers:pokemon')

const getPokemon = async (req, res) => {
  try {
    let { pokemonId } = req.params
    const pokemon = await dbPokemon.findByPokemonId(pokemonId)

    if (!pokemon) return Error({ message: 'Pokemon not found', status: 404 }, res)

    Success(res, { data: pokemon, model: 'pokemon' })
  } catch (error) {
    Error(error, res)
  }
}

const getPokemonByName = async (req, res) => {
  try {
    let { name } = req.params
    let pokemon = await dbPokemon.findByPokemonName(name)

    if (!pokemon) return Error({ message: 'Pokemon not found', status: 404 }, res)
    Success(res, { data: pokemon, model: 'pokemon' })
  } catch (error) {
    Error(error, res)
  }
}

const getPokemons = async (req, res) => {
  try {
    const pokemons = await dbPokemon.findAll()
    if (!pokemons) return Error({ message: 'Pokemons not found', status: 404 }, res)
    Success(res, { data: pokemons, model: 'pokemons' })
  } catch (error) {
    Error(error, res)
  }
}

const savePokemon = async (req, res) => {
  try {
    const objectPokemon = req.body
    const pokemon = await dbPokemon.create(objectPokemon)
    Success(res, { data: pokemon, model: 'pokemon' }, 201)
  } catch (error) {
    Error(error, res)
  }
}
export default {
  savePokemon,
  getPokemon,
  getPokemons,
  getPokemonByName
}
