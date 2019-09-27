import express from 'express'
import { PokemonCtrl } from '../controllers'
// import isAuth  from '../middlewares/auth'
import { isAuth } from '../middlewares'
const guard = require('express-jwt-permissions')()
// import guard from "express-jwt-permissions"

/* Variables de configuracion */
// guard()
const api = express.Router()
/** **** END POINTS DE Pokemon *****/
api.post('/pokemon', isAuth, guard.check([ ['pokemon'], ['pokemon:create'] ]), PokemonCtrl.savePokemon)
api.get('/pokemons', isAuth, guard.check([ ['pokemon'], ['pokemon:all'] ]), PokemonCtrl.getPokemons)
api.get('/pokemon/:pokemonId', isAuth, guard.check([ ['pokemon'], ['pokemon:read'] ]), PokemonCtrl.getPokemon)
api.get('/pokemon/name/:name', isAuth, guard.check([ ['pokemon'], ['pokemon:read'] ]), PokemonCtrl.getPokemonByName)

export default api
