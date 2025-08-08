export type Player = {
  id: number;
  name: string;
  class: string;
  heritage: string;
  subclass: string;
  level: number;
  agility: number;
  current_hp: number;
  max_hp: number;
  current_armor: number;
  max_armor: number;
  current_stress: number;
  max_stress: number;
  current_hope: number;
  max_hope: number;
}

export type DamageLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
