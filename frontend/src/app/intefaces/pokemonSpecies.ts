export interface PokemonSpecies {
  evolution_chain: EvolutionChain;
  evolves_from_species: EvolvesFromSpecies;
}

interface EvolvesFromSpecies {
  name: string;
  url: string;
}

interface EvolutionChain {
  url: string;
}
