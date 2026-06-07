import { RouteTemplate, RouteType } from "../types";

export const ROUTES: RouteTemplate[] = [
  {
    id: "lumbridge-varrock-road",
    name: "Lumbridge to Varrock Road",
    type: "Mixed",
    difficulty: "Light",
    start: "Lumbridge",
    end: "Varrock",
    summary: "A classic beginner road that opens basic skilling, low combat, and early shops along the central road.",
    checkpoints: [
      { id: "lumbridge-castle", name: "Lumbridge Castle", region: "Lumbridge", instruction: "Bank, gather starter supplies, and declare the route.", permit: ["Bank", "General store", "Low combat"] },
      { id: "cow-field", name: "Cow Field", region: "Lumbridge", instruction: "Clear a small food or hide task before moving north.", permit: ["Cows", "Cooking", "Crafting hides"] },
      { id: "draynor-crossroad", name: "Draynor Crossroad", region: "Draynor", instruction: "Use only roadside tasks before entering Varrock approach.", permit: ["Trees", "Fishing spots", "Draynor market"] },
      { id: "varrock-south-gate", name: "Varrock South Gate", region: "Varrock", instruction: "Reach the city gate and log one city preparation task.", permit: ["Guards", "Varrock shops", "Grand Exchange scouting"] },
      { id: "varrock-square", name: "Varrock Square", region: "Varrock", instruction: "Complete the route by banking or buying one legal upgrade.", permit: ["Bank", "Anvils", "City quests"] }
    ],
    permissions: {
      regions: ["Lumbridge", "Draynor", "Varrock road", "Varrock"],
      skills: ["Woodcutting", "Cooking", "Crafting", "Melee", "Mining"],
      enemies: ["Cows", "Goblins", "Highwaymen", "Guards"],
      shops: ["Lumbridge General Store", "Draynor Market", "Varrock Swordshop", "Varrock General Store"],
      transport: ["Walking", "Canoe stops if unlocked"],
      quests: ["Cook's Assistant", "Romeo & Juliet", "Demon Slayer prep"]
    },
    restrictions: ["No detours into Morytania", "No Wilderness shortcuts", "No banking outside connected stops"],
    reward: "Archive route and unlock one adjacent central-road route.",
    accent: "#5aa7b8"
  },
  {
    id: "port-sarim-karamja-supply",
    name: "Port Sarim Karamja Supply Run",
    type: "Supply",
    difficulty: "Moderate",
    start: "Port Sarim",
    end: "Brimhaven Dock",
    summary: "A ship-and-supply route focused on legal shops, food prep, fishing, and coastal gathering.",
    checkpoints: [
      { id: "port-sarim-dock", name: "Port Sarim Dock", region: "Asgarnia", instruction: "Buy or gather only supplies needed for the voyage.", permit: ["Fishing shop", "Food", "Boat fare"] },
      { id: "banana-plantation", name: "Musa Point Plantation", region: "Karamja", instruction: "Complete a gathering task before leaving the plantation.", permit: ["Bananas", "Low combat", "Cooking"] },
      { id: "karamja-volcano", name: "Karamja Volcano Edge", region: "Karamja", instruction: "Clear one combat or mining stop without entering unrelated dungeons.", permit: ["Lesser demons edge", "Mining", "Fishing"] },
      { id: "brimhaven-dock", name: "Brimhaven Dock", region: "Karamja", instruction: "Finish by banking via legal route or purchasing a ship-linked upgrade.", permit: ["Brimhaven shops", "Agility arena scouting"] }
    ],
    permissions: {
      regions: ["Port Sarim", "Musa Point", "Karamja Volcano", "Brimhaven"],
      skills: ["Fishing", "Cooking", "Agility", "Mining", "Ranged"],
      enemies: ["Monkeys", "Scorpions", "Pirates", "Lesser demon edge"],
      shops: ["Port Sarim Fishing Shop", "Karamja General Store", "Brimhaven Food Shop"],
      transport: ["Charter ships", "Port Sarim ferry"],
      quests: ["Pirate's Treasure", "Jungle Potion prep"]
    },
    restrictions: ["No deep jungle routes", "No unrelated charter destinations", "No off-route clue steps"],
    reward: "Earn one supply permit for the next coastal route.",
    accent: "#2f8f7a"
  },
  {
    id: "falador-dwarven-forge",
    name: "Falador Dwarven Forge Line",
    type: "Skilling",
    difficulty: "Moderate",
    start: "Falador",
    end: "Dwarven Mine",
    summary: "A mining and smithing line that makes ore, bars, and crafted upgrades the legal route currency.",
    checkpoints: [
      { id: "falador-bank", name: "Falador East Bank", region: "Falador", instruction: "Declare tools and empty supplies before heading underground.", permit: ["Bank", "Anvil", "Furnace route"] },
      { id: "mining-guild-edge", name: "Mining Guild Edge", region: "Falador", instruction: "Mine route ore and log the ore tier used.", permit: ["Mining", "Pickaxes", "Dwarves"] },
      { id: "dwarven-mine-hub", name: "Dwarven Mine Hub", region: "Dwarven Mine", instruction: "Clear one underground gathering or combat stop.", permit: ["Mining", "Scorpions", "Dwarven shops"] },
      { id: "ice-mountain-pass", name: "Ice Mountain Pass", region: "Ice Mountain", instruction: "Complete a cold-route gathering or combat checkpoint.", permit: ["Icefiends", "Clay", "Blurite scouting"] }
    ],
    permissions: {
      regions: ["Falador", "Dwarven Mine", "Ice Mountain"],
      skills: ["Mining", "Smithing", "Crafting", "Defence"],
      enemies: ["Dwarves", "Scorpions", "Icefiends"],
      shops: ["Falador Shield Shop", "Dwarven Mine Pickaxe Shop"],
      transport: ["Walking", "Mine ladders"],
      quests: ["The Knight's Sword prep", "Doric's Quest"]
    },
    restrictions: ["No Motherlode Mine unless selected as a stop", "No Port Sarim detours", "No unrelated smithing upgrades"],
    reward: "Claim one forged upgrade permit.",
    accent: "#c79a42"
  },
  {
    id: "ardougne-trial-walk",
    name: "Ardougne Trial Walk",
    type: "Questing",
    difficulty: "Hard",
    start: "East Ardougne",
    end: "Tree Gnome Stronghold",
    summary: "A western questing route built around errands, agility paths, gnome access, and controlled unlocks.",
    checkpoints: [
      { id: "east-ardy-market", name: "East Ardougne Market", region: "Kandarin", instruction: "Complete a market or thieving task to validate the route.", permit: ["Stalls", "Ardougne shops", "Agility"] },
      { id: "monastery-road", name: "Monastery Road", region: "Kandarin", instruction: "Use only road-connected combat or prayer stops.", permit: ["Prayer", "Low combat", "Herblore prep"] },
      { id: "gnome-maze", name: "Gnome Maze", region: "Gnome lands", instruction: "Clear the maze checkpoint before using gnome services.", permit: ["Agility", "Gnome errands"] },
      { id: "stronghold-gate", name: "Stronghold Gate", region: "Tree Gnome Stronghold", instruction: "Finish by logging one gnome-linked quest or skilling action.", permit: ["Gnome shops", "Cooking", "Ranged"] }
    ],
    permissions: {
      regions: ["East Ardougne", "Kandarin roads", "Tree Gnome Maze", "Tree Gnome Stronghold"],
      skills: ["Agility", "Thieving", "Ranged", "Cooking", "Prayer"],
      enemies: ["Guards", "Khazard troops", "Terrorbird routes"],
      shops: ["Ardougne Market", "Gnome shops"],
      transport: ["Walking", "Spirit tree only after route completion"],
      quests: ["Plague City prep", "Tree Gnome Village", "Grand Tree prep"]
    },
    restrictions: ["No teleport skipping", "No Fishing Guild detour", "No Castle Wars bank unless route-added"],
    reward: "Unlock one gnome transport permit after completion.",
    accent: "#7eab57"
  },
  {
    id: "morytania-lantern-patrol",
    name: "Morytania Lantern Patrol",
    type: "Combat",
    difficulty: "Hard",
    start: "Paterdomus",
    end: "Canifis",
    summary: "A grim combat patrol where every legal action must keep to the road into Morytania.",
    checkpoints: [
      { id: "paterdomus-gate", name: "Paterdomus Gate", region: "Misthalin", instruction: "Declare supplies before crossing the gate.", permit: ["Prayer", "Food prep", "Low combat"] },
      { id: "temple-road", name: "Temple Road", region: "Morytania", instruction: "Clear one roadside enemy task.", permit: ["Ghasts edge", "Werewolves", "Prayer"] },
      { id: "canifis-crossing", name: "Canifis Crossing", region: "Canifis", instruction: "Reach Canifis and log the legal city actions.", permit: ["Canifis bank", "Slayer master scouting"] },
      { id: "swamp-border", name: "Swamp Border", region: "Morytania", instruction: "Stop before deep swamp unless the next route extends it.", permit: ["Mushrooms", "Low swamp resources"] }
    ],
    permissions: {
      regions: ["Paterdomus", "Morytania road", "Canifis edge"],
      skills: ["Prayer", "Combat", "Slayer", "Herblore"],
      enemies: ["Werewolves", "Bats", "Ghasts edge"],
      shops: ["Canifis General Store", "Slayer supplies"],
      transport: ["Walking only", "No fairy rings"],
      quests: ["Priest in Peril follow-up", "Creature of Fenkenstrain prep"]
    },
    restrictions: ["No Barrows", "No swamp shortcuts", "No Slayer tasks outside road permissions"],
    reward: "Earn one haunted-road combat permit.",
    accent: "#8e6ad4"
  },
  {
    id: "desert-waterline",
    name: "Desert Waterline",
    type: "Supply",
    difficulty: "Moderate",
    start: "Al Kharid",
    end: "Pollnivneach Gate",
    summary: "A water-and-trade route that requires supply planning before crossing desert stops.",
    checkpoints: [
      { id: "al-kharid-bank", name: "Al Kharid Bank", region: "Al Kharid", instruction: "Bank supplies and declare waterskin count.", permit: ["Bank", "Tannery", "Gem trader"] },
      { id: "shantay-pass", name: "Shantay Pass", region: "Desert", instruction: "Buy pass supplies and lock the route inventory.", permit: ["Shantay shop", "Waterskins"] },
      { id: "bedabin-camp", name: "Bedabin Camp", region: "Desert", instruction: "Complete a trade or survival checkpoint.", permit: ["Camels", "Desert survival", "Cooking"] },
      { id: "pollnivneach-gate", name: "Pollnivneach Gate", region: "Desert", instruction: "End at the gate and archive supply use.", permit: ["Agility", "Thieving", "Desert quests"] }
    ],
    permissions: {
      regions: ["Al Kharid", "Shantay Pass", "Bedabin Camp", "Pollnivneach edge"],
      skills: ["Agility", "Crafting", "Cooking", "Thieving"],
      enemies: ["Scorpions", "Desert wolves", "Bandits if provoked"],
      shops: ["Shantay Pass Shop", "Al Kharid stores"],
      transport: ["Carpet routes only if checkpointed", "Walking"],
      quests: ["The Feud prep", "Tourist Trap prep"]
    },
    restrictions: ["No Sophanem until a later route", "No pyramid looting detour", "No teleport exit except emergency breach"],
    reward: "Unlock one desert supply permit.",
    accent: "#d6a24f"
  },
  {
    id: "kourend-library-loop",
    name: "Kourend Library Loop",
    type: "Questing",
    difficulty: "Moderate",
    start: "Kourend Castle",
    end: "Arceuus Library",
    summary: "A Zeah knowledge route about books, favor errands, prayer, and controlled library movement.",
    checkpoints: [
      { id: "kourend-castle", name: "Kourend Castle", region: "Great Kourend", instruction: "Declare the house route and gather first instructions.", permit: ["Castle bank", "House errands"] },
      { id: "hosidius-road", name: "Hosidius Road", region: "Hosidius", instruction: "Complete one supply or farming stop.", permit: ["Farming", "Cooking", "Hosidius shops"] },
      { id: "arceuus-bridge", name: "Arceuus Bridge", region: "Arceuus", instruction: "Switch to book and prayer permissions.", permit: ["Prayer", "Magic", "Runecraft prep"] },
      { id: "grand-library", name: "Grand Library", region: "Arceuus", instruction: "Finish by recovering or cataloguing route books.", permit: ["Books", "Magic", "Library tasks"] }
    ],
    permissions: {
      regions: ["Kourend Castle", "Hosidius road", "Arceuus", "Grand Library"],
      skills: ["Farming", "Cooking", "Magic", "Prayer", "Runecraft"],
      enemies: ["Sand crabs only if route-added", "Library-safe combat only"],
      shops: ["Kourend general stores", "Arceuus supplies"],
      transport: ["Walking", "Minecart only after checkpoint"],
      quests: ["Client of Kourend", "X Marks the Spot follow-up"]
    },
    restrictions: ["No catacombs unless route-added", "No Shayzien combat detour", "No house favor outside route"],
    reward: "Archive a library permit for a future knowledge route.",
    accent: "#6f7fd6"
  },
  {
    id: "wilderness-border-scout",
    name: "Wilderness Border Scout",
    type: "Combat",
    difficulty: "Hard",
    start: "Edgeville",
    end: "Wilderness Ditch",
    summary: "A risky border route that permits only shallow Wilderness scouting and escape planning.",
    checkpoints: [
      { id: "edgeville-bank", name: "Edgeville Bank", region: "Edgeville", instruction: "Declare risk items and lock supplies.", permit: ["Bank", "Low-risk gear", "Food"] },
      { id: "ditch-crossing", name: "Wilderness Ditch", region: "Wilderness border", instruction: "Cross only after recording the scout objective.", permit: ["Shallow Wilderness", "Low combat"] },
      { id: "monastery-edge", name: "Monastery Edge", region: "Edgeville", instruction: "Use prayer or recovery only at legal border stops.", permit: ["Prayer", "Recovery"] },
      { id: "return-bank", name: "Return Bank", region: "Edgeville", instruction: "Route ends only when risk and loot are logged.", permit: ["Bank", "Archive loot"] }
    ],
    permissions: {
      regions: ["Edgeville", "Wilderness ditch", "Shallow Wilderness border"],
      skills: ["Combat", "Prayer", "Agility", "Fishing"],
      enemies: ["Skeletons", "Men", "Border creatures"],
      shops: ["Edgeville supplies"],
      transport: ["Walking only", "Emergency teleport counts as breach note"],
      quests: ["Wilderness diary prep"]
    },
    restrictions: ["No deep Wilderness", "No revenants", "No clue steps beyond border"],
    reward: "Gain one border-risk reroll token.",
    accent: "#c65353"
  }
];

export const ROUTE_TYPES: Array<RouteType | "All"> = ["All", "Skilling", "Combat", "Questing", "Supply", "Mixed"];

export function getRoute(id: string): RouteTemplate {
  return ROUTES.find((route) => route.id === id) || ROUTES[0];
}
