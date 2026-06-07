export type RouteType = "Skilling" | "Combat" | "Questing" | "Supply" | "Mixed";
export type CheckpointStatus = "pending" | "reached" | "cleared";

export interface Checkpoint {
  id: string;
  name: string;
  region: string;
  instruction: string;
  permit: string[];
}

export interface RouteTemplate {
  id: string;
  name: string;
  type: RouteType;
  difficulty: "Light" | "Moderate" | "Hard";
  start: string;
  end: string;
  summary: string;
  checkpoints: Checkpoint[];
  permissions: {
    regions: string[];
    skills: string[];
    enemies: string[];
    shops: string[];
    transport: string[];
    quests: string[];
  };
  restrictions: string[];
  reward: string;
  accent: string;
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  title: string;
  detail: string;
}

export interface ArchivedRoute {
  routeId: string;
  routeName: string;
  completedAt: number;
  clearedStops: number;
}

export interface RunState {
  runName: string;
  activeRouteId: string;
  checkpointStatus: Record<string, CheckpointStatus>;
  routeHistory: ArchivedRoute[];
  breachNotes: string[];
  history: HistoryEntry[];
  strictMode: boolean;
}
