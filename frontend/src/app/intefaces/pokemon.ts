export interface Pokemon {
  abilities: GlobalInfo[];
  height: number;
  id: number;
  name: string;
  species: Description;
  sprites: Sprites;
  types: TypeInfo[];
  weight: number;
}

interface TypeInfo {
  slot: number;
  type: Description;
}

interface Sprites {
  back_default: string;
  back_female?: string;
  back_shiny: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny: string;
  front_shiny_female?: string;
}

interface GlobalInfo {
  ability: Description;
  is_hidden: boolean;
  slot: number;
}

export interface Description {
  name: string;
  url: string;
}
