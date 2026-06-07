import { ChangeEvent, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ROUTE_TYPES, ROUTES, getRoute } from "./data/routes";
import { createHistory, defaultRunState, loadRunState, nextCheckpointStatus, saveRunState } from "./state";
import { Checkpoint, CheckpointStatus, RouteTemplate, RouteType, RunState } from "./types";

const STATUS_LABELS: Record<CheckpointStatus, string> = {
  pending: "Pending",
  reached: "Reached",
  cleared: "Cleared"
};

function formatTime(timestamp: number): string {
  const minutes = Math.max(1, Math.round((Date.now() - timestamp) / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function buildExport(run: RunState): string {
  return JSON.stringify({ app: "OSRS-Routebound", version: 1, run }, null, 2);
}

function routeScore(route: RouteTemplate): number {
  const difficultyScore = route.difficulty === "Hard" ? 3 : route.difficulty === "Moderate" ? 2 : 1;
  return route.checkpoints.length * 2 + difficultyScore;
}

function checkpointPosition(index: number, count: number): { left: number; top: number } {
  const five = [
    { left: 15, top: 72 },
    { left: 32, top: 58 },
    { left: 50, top: 43 },
    { left: 68, top: 31 },
    { left: 84, top: 18 }
  ];
  const four = [
    { left: 16, top: 70 },
    { left: 38, top: 54 },
    { left: 61, top: 36 },
    { left: 83, top: 20 }
  ];
  return (count <= 4 ? four : five)[index] || five[five.length - 1];
}

function App() {
  const [run, setRun] = useState<RunState>(() => loadRunState());
  const [selectedType, setSelectedType] = useState<RouteType | "All">("All");
  const [breachDraft, setBreachDraft] = useState("");
  const [toast, setToast] = useState("");
  const importInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    saveRunState(run);
  }, [run]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 1800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const activeRoute = getRoute(run.activeRouteId);
  const filteredRoutes = useMemo(() => {
    return selectedType === "All" ? ROUTES : ROUTES.filter((route) => route.type === selectedType);
  }, [selectedType]);

  const statusCounts = useMemo(() => {
    return activeRoute.checkpoints.reduce(
      (counts, checkpoint) => {
        const status = run.checkpointStatus[checkpoint.id] || "pending";
        counts[status] += 1;
        return counts;
      },
      { pending: 0, reached: 0, cleared: 0 } as Record<CheckpointStatus, number>
    );
  }, [activeRoute, run.checkpointStatus]);

  const clearedCount = statusCounts.cleared;
  const progress = Math.round((clearedCount / activeRoute.checkpoints.length) * 100);

  function updateRun(updater: (current: RunState) => RunState) {
    setRun((current) => updater(current));
  }

  function chooseRoute(routeId: string, reason = "Route selected") {
    const nextRoute = getRoute(routeId);
    updateRun((current) => ({
      ...current,
      activeRouteId: routeId,
      checkpointStatus: {},
      history: [createHistory(reason, `${nextRoute.name} is now the active route.`), ...current.history]
    }));
  }

  function rollRoute() {
    const pool = filteredRoutes.length ? filteredRoutes : ROUTES;
    const currentIndex = pool.findIndex((route) => route.id === run.activeRouteId);
    const nextRoute = pool[(currentIndex + 1 + Math.floor(Math.random() * Math.max(1, pool.length - 1))) % pool.length];
    chooseRoute(nextRoute.id, "Route rolled");
  }

  function cycleCheckpoint(checkpoint: Checkpoint) {
    const currentStatus = run.checkpointStatus[checkpoint.id] || "pending";
    const nextStatus = nextCheckpointStatus(currentStatus);
    updateRun((current) => ({
      ...current,
      checkpointStatus: { ...current.checkpointStatus, [checkpoint.id]: nextStatus },
      history: [
        createHistory("Checkpoint updated", `${checkpoint.name} marked ${STATUS_LABELS[nextStatus].toLowerCase()}.`),
        ...current.history
      ]
    }));
  }

  function completeRoute() {
    updateRun((current) => ({
      ...current,
      routeHistory: [
        {
          routeId: activeRoute.id,
          routeName: activeRoute.name,
          completedAt: Date.now(),
          clearedStops: clearedCount
        },
        ...current.routeHistory
      ],
      history: [createHistory("Route archived", `${activeRoute.name} completed with ${clearedCount} cleared stops.`), ...current.history]
    }));
    rollRoute();
  }

  function addBreachNote() {
    const note = breachDraft.trim();
    if (!note) return;
    updateRun((current) => ({
      ...current,
      breachNotes: [note, ...current.breachNotes].slice(0, 8),
      history: [createHistory("Breach noted", note), ...current.history]
    }));
    setBreachDraft("");
  }

  function resetRun() {
    setRun(defaultRunState);
    setToast("Run reset");
  }

  async function exportRun() {
    const payload = buildExport(run);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${run.runName || "routebound-run"}.json`.replace(/[^a-z0-9._-]+/gi, "-");
    link.click();
    URL.revokeObjectURL(url);
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(payload);
      setToast("Run exported and copied");
    } else {
      setToast("Run exported");
    }
  }

  function importRun(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result || "{}"));
        const nextRun = parsed.run || parsed;
        setRun({ ...defaultRunState, ...nextRun });
        setToast("Run imported");
      } catch {
        setToast("Import failed");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  return (
    <main className="routebound-shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">RB</div>
          <div>
            <h1>OSRS Routebound</h1>
            <p>Cartographer ledger for route-locked accounts</p>
          </div>
        </div>
        <label className="run-field">
          <span>Run name</span>
          <input value={run.runName} onChange={(event) => updateRun((current) => ({ ...current, runName: event.target.value }))} />
        </label>
        <Stat label="Active route" value={activeRoute.name} />
        <Stat label="Checkpoints" value={`${clearedCount} / ${activeRoute.checkpoints.length}`} />
        <div className="top-actions">
          <button type="button" onClick={rollRoute}>Roll Route</button>
          <button type="button" onClick={exportRun}>Export</button>
          <button type="button" onClick={() => importInputRef.current?.click()}>Import</button>
          <button type="button" className="danger" onClick={resetRun}>Reset</button>
          <input ref={importInputRef} className="hidden-input" type="file" accept="application/json,.json" onChange={importRun} />
        </div>
      </header>

      <section className="app-grid">
        <aside className="route-list panel">
          <PanelTitle title="Route Registry" />
          <div className="type-filter">
            {ROUTE_TYPES.map((type) => (
              <button key={type} type="button" className={selectedType === type ? "active" : ""} onClick={() => setSelectedType(type)}>
                {type}
              </button>
            ))}
          </div>
          <div className="route-stack">
            {filteredRoutes.map((route) => (
              <button
                key={route.id}
                className={`route-card ${route.id === activeRoute.id ? "selected" : ""}`}
                type="button"
                style={{ "--accent": route.accent } as CSSProperties}
                onClick={() => chooseRoute(route.id)}
              >
                <span>{route.type}</span>
                <strong>{route.name}</strong>
                <small>{route.start} to {route.end}</small>
                <div className="route-pips" aria-hidden="true">
                  {route.checkpoints.map((checkpoint) => {
                    const status = route.id === activeRoute.id ? run.checkpointStatus[checkpoint.id] || "pending" : "pending";
                    return <i key={checkpoint.id} className={status} />;
                  })}
                </div>
                <em>{route.difficulty} / score {routeScore(route)}</em>
              </button>
            ))}
          </div>
        </aside>

        <section className="map-panel panel">
          <div className="map-heading">
            <PanelTitle title="Active Route Board" />
            <div className="route-status">
              <span>{activeRoute.difficulty}</span>
              <strong>{progress}% clear</strong>
            </div>
          </div>
          <div className="parchment-map">
            <div className="map-scene">
              <div className="map-title">
                <span>{activeRoute.type} route</span>
                <h2>{activeRoute.name}</h2>
                <p>{activeRoute.summary}</p>
              </div>
              <div className="map-compass" aria-hidden="true">N</div>
              <div className="route-legend" aria-label="Checkpoint legend">
                <span><i className="cleared" />Cleared</span>
                <span><i className="reached" />Reached</span>
                <span><i className="pending" />Pending</span>
              </div>
              {activeRoute.checkpoints.map((checkpoint, index) => {
                const status = run.checkpointStatus[checkpoint.id] || "pending";
                const position = checkpointPosition(index, activeRoute.checkpoints.length);
                return (
                  <button
                    key={checkpoint.id}
                    className={`map-node ${status}`}
                    style={{ left: `${position.left}%`, top: `${position.top}%` }}
                    type="button"
                    onClick={() => cycleCheckpoint(checkpoint)}
                    aria-label={`${checkpoint.name}: ${STATUS_LABELS[status]}`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            <div className="checkpoint-grid">
              {activeRoute.checkpoints.map((checkpoint, index) => {
                const status = run.checkpointStatus[checkpoint.id] || "pending";
                return (
                  <article className={`checkpoint ${status}`} key={checkpoint.id}>
                    <div className="checkpoint-top">
                      <span>{index + 1}</span>
                      <strong>{checkpoint.name}</strong>
                      <em>{STATUS_LABELS[status]}</em>
                    </div>
                    <p>{checkpoint.instruction}</p>
                    <small>{checkpoint.region}</small>
                    <div className="permit-tags">
                      {checkpoint.permit.map((permit) => <span key={permit}>{permit}</span>)}
                    </div>
                    <button type="button" onClick={() => cycleCheckpoint(checkpoint)}>
                      Mark {status === "pending" ? "Reached" : status === "reached" ? "Cleared" : "Pending"}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
          <div className="map-actions">
            <button type="button" disabled={clearedCount !== activeRoute.checkpoints.length} onClick={completeRoute}>
              Complete Route
            </button>
            <span>{activeRoute.reward}</span>
          </div>
        </section>

        <aside className="right-rail">
          <section className="panel permit-panel">
            <PanelTitle title="Travel Permit" />
            <div className="permit-document">
              <strong>{activeRoute.start}</strong>
              <span>to</span>
              <strong>{activeRoute.end}</strong>
              <p>{run.strictMode ? "Strict route law active" : "Flexible route law active"}</p>
              <button type="button" onClick={() => updateRun((current) => ({ ...current, strictMode: !current.strictMode }))}>
                {run.strictMode ? "Relax Strict Mode" : "Enable Strict Mode"}
              </button>
            </div>
          </section>

          <section className="panel legal-panel">
            <PanelTitle title="Legal Content" />
            <LegalGroup title="Regions" items={activeRoute.permissions.regions} />
            <LegalGroup title="Skills" items={activeRoute.permissions.skills} />
            <LegalGroup title="Enemies" items={activeRoute.permissions.enemies} />
            <LegalGroup title="Shops" items={activeRoute.permissions.shops} />
            <LegalGroup title="Transport" items={activeRoute.permissions.transport} />
            <LegalGroup title="Quests" items={activeRoute.permissions.quests} />
          </section>

          <section className="panel restrictions-panel">
            <PanelTitle title="Restrictions" />
            <ul>
              {activeRoute.restrictions.map((restriction) => <li key={restriction}>{restriction}</li>)}
            </ul>
          </section>

          <section className="panel breach-panel">
            <PanelTitle title="Breach Notes" />
            <textarea value={breachDraft} onChange={(event) => setBreachDraft(event.target.value)} placeholder="Log emergency teleports, accidental detours, or rule disputes." />
            <button type="button" onClick={addBreachNote}>Add Note</button>
            <div className="note-list">
              {run.breachNotes.map((note) => <p key={note}>{note}</p>)}
            </div>
          </section>

          <section className="panel history-panel">
            <PanelTitle title="History" />
            <div className="history-list">
              {run.history.slice(0, 7).map((entry) => (
                <article key={entry.id}>
                  <strong>{entry.title}</strong>
                  <span>{formatTime(entry.timestamp)}</span>
                  <p>{entry.detail}</p>
                </article>
              ))}
              {!run.history.length ? <p>No route actions logged yet.</p> : null}
            </div>
          </section>
        </aside>
      </section>

      <footer className="footerbar">
        <span>Archived routes: {run.routeHistory.length}</span>
        <span>Reached: {statusCounts.reached}</span>
        <span>Pending: {statusCounts.pending}</span>
        <span>Auto-save on</span>
      </footer>

      {toast ? <div className="toast">{toast}</div> : null}
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function PanelTitle({ title }: { title: string }) {
  return (
    <div className="panel-title">
      <h2>{title}</h2>
    </div>
  );
}

function LegalGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="legal-group">
      <h3>{title}</h3>
      <div>
        {items.map((item) => <span key={item}>{item}</span>)}
      </div>
    </div>
  );
}

export default App;
