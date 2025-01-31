import { LocationId } from "@/utils/locations";

type Move = [string, string];
type UnfinishedMove = [string, null];
type Moves = Move[] | [...Move[], UnfinishedMove];

export interface Opening {
  eco: string;
  name: string;
  aka: string[];
  moves: Moves;
  locations: Set<LocationId>;
}

export const OPENINGS: Opening[] = [
  {
    eco: "A00",
    name: "Polish Opening",
    aka: ["Sokolsky Opening", "Orangutan Opening"],
    moves: [["b4", null]],
    locations: new Set(["poland"]),
  },
  {
    eco: "A00",
    name: "Polish Opening: Dutch Defense",
    aka: [],
    moves: [["b4", "f5"]],
    locations: new Set(["netherlands"]),
  },
  {
    eco: "A00",
    name: "Polish Opening: Czech Defense",
    aka: [],
    moves: [
      ["b4", "e5"],
      ["Bb2", "d6"],
    ],
    locations: new Set(["czechia"]),
  },
  {
    eco: "A00",
    name: "Polish Opening: German Defense",
    aka: [],
    moves: [
      ["b4", "d5"],
      ["Bb2", "Qd6"],
    ],
    locations: new Set(["germany"]),
  },
  {
    eco: "A00",
    name: "Polish Opening: Birmingham Gambit",
    aka: [],
    moves: [["b4", "c5"]],
    locations: new Set(["birmingham"]),
  },
];
