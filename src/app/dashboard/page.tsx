"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);

  // Load tasks and projects for the logged-in user
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername) {
      setUsername(storedUsername);

      // Load tasks
      const savedTasks = JSON.parse(localStorage.getItem(`tasks_${storedUsername}`) || "[]");
      setTasks(savedTasks);

      // Load projects
      const savedProjects = JSON.parse(localStorage.getItem(`projects_${storedUsername}`) || "[]");
      setProjects(savedProjects);
    }
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-1/4 h-screen bg-gray-800 text-white p-6 flex-shrink-0">
        <div className="space-y-4">
          {/* Run Simulation */}
          <button className="w-full px-4 py-2 text-lg font-bold bg-white text-gray-800 rounded shadow hover:bg-gray-300">
            <a href="/startaction" className="block w-full h-full">
              Run Simulation
            </a>
          </button>

          {/* View Projects */}
          <button className="w-full px-4 py-2 text-lg font-bold bg-white text-gray-800 rounded shadow hover:bg-gray-300">
            <a href="/view" className="block w-full h-full">
              View Projects
            </a>
          </button>

          {/* Tasks */}
          <button className="w-full px-4 py-2 text-lg font-bold bg-white text-gray-800 rounded shadow hover:bg-gray-300">
            <a href="/tasks" className="block w-full h-full">
              Tasks
            </a>
          </button>

          {/* History */}
          <button className="w-full px-4 py-2 text-lg font-bold bg-white text-gray-800 rounded shadow hover:bg-gray-300">
            <a href="/history" className="block w-full h-full">
              History
            </a>
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {/* Activities Section */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-4">Activities</h2>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-600 mb-2">Current Year vs Past Year</p>
            {/* Placeholder for Bar Chart */}
            <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500">
              [Bar Chart Placeholder]
            </div>
          </div>
        </section>

        {/* Tasks Section */}
        <section className="mb-6">
          <h2 className="text-lg font-bold mb-4">Your Tasks</h2>
          <div className="bg-white p-4 rounded shadow">
            {tasks.length > 0 ? (
              <ul>
                {tasks.map((task, index) => (
                  <li
                    key={task.id || index}
                    className="flex items-center justify-between p-2 border-b last:border-none"
                  >
                    <div>
                      <p className="text-sm font-bold">{task.title}</p>
                      <p className="text-xs text-gray-500">{task.description}</p>
                      <p className="text-xs text-gray-500">Status: {task.status}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">You have no tasks.</p>
            )}
          </div>
        </section>

        {/* Projects Section */}
        <section>
          <h2 className="text-lg font-bold mb-4">Your Projects</h2>
          <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded shadow">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <div
                  key={project.id || index}
                  className="bg-white p-4 rounded shadow flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-gray-300 rounded mb-2" />
                  <h3 className="text-sm font-bold">{project.name}</h3>
                  <p className="text-xs text-gray-500">
                    Input Params: {project.inputParameters?.length || 0}, Output Params:{" "}
                    {project.outputParameters?.length || 0}, Constraints:{" "}{project.constraints?.length || 0},
                    Constants:{" "}{project.constants?.length || 0}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">You have no project.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
