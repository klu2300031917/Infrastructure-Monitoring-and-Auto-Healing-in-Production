import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cpu, setCpu] = useState(0);
  const [memory, setMemory] = useState(0);
  const [disk, setDisk] = useState(0);
  const [status, setStatus] = useState("System Healthy");
  const [logs, setLogs] = useState([]);

  function randomUsage(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function addLog(message) {
    setLogs(prev => [...prev, message]);
  }

  function autoHeal(issue) {
    if (issue === "CPU") {
      setStatus("Scaling Infrastructure...");
      addLog("High CPU detected → Launching new instance...");
    }
    if (issue === "MEMORY") {
      setStatus("Restarting Application...");
      addLog("Memory issue detected → Restarting service...");
    }
    if (issue === "DISK") {
      setStatus("Running Cleanup...");
      addLog("Disk full → Cleaning temporary files...");
    }

    setTimeout(() => {
      setStatus("System Healthy");
      addLog("Auto-Healing Completed ✓");
    }, 3000);
  }

  function monitor() {
    const c = randomUsage(20, 95);
    const m = randomUsage(20, 90);
    const d = randomUsage(30, 92);

    setCpu(c);
    setMemory(m);
    setDisk(d);

    if (c > 80) autoHeal("CPU");
    else if (m > 75) autoHeal("MEMORY");
    else if (d > 85) autoHeal("DISK");
  }

  useEffect(() => {
    addLog("Monitoring Started...");
    const interval = setInterval(monitor, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <h1>Infrastructure Monitoring & Auto-Healing</h1>

      <div className="container">
        <div className="card"><h2>CPU</h2><p>{cpu}%</p></div>
        <div className="card"><h2>Memory</h2><p>{memory}%</p></div>
        <div className="card"><h2>Disk</h2><p>{disk}%</p></div>
      </div>

      <h2>Status</h2>
      <p className="status">{status}</p>

      <h2>Logs</h2>
      <div className="logs">
        {logs.map((log, i) => <div key={i}>➤ {log}</div>)}
      </div>
    </div>
  );
}

export default App;