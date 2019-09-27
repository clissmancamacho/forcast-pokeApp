import { Description } from './pokemon';

export interface PokemonEvolutionChain {
  baby_trigger_item?: any;
  chain: Chain;
  id: number;
}

interface Chain {
  evolution_details: any[];
  evolves_to: EvolvesToInfo[];
  is_baby: boolean;
  species: Description;
}

interface EvolvesToInfo {
  evolves_to: EvolvesToDetail[];
  is_baby: boolean;
  species: Description;
}

interface EvolvesToDetail {
  evolves_to: any[];
  is_baby: boolean;
  species: Description;
}
