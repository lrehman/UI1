"use client";

import { useEffect, useState } from "react";

type Project = {
  id: number;
  name: string;
  inputParameters: any[];
  outputParameters: any[];
  constraints: any[];
  constants: any[];
  scoringFunction: {
    predefined: string;
    custom: string;
  };
};

export default function History() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Load saved projects from localStorage for the logged-in user
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      const userProjectsKey = `projects_${username}`;
      const projects = JSON.parse(localStorage.getItem(userProjectsKey) || "[]");
      setProjects(projects); // Initialize state with the user's projects
    }
  }, []);


  // Handle selecting a project to view its details
  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      
      <h2 className="text-2xl font-bold mb-6">Project History</h2>
      <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700"> 
        <a href="/dashboard">Go Back</a>
      </button>
      <div className="grid grid-cols-2 gap-8">
        {/* List of Projects */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Created Projects</h3>
          {projects.length > 0 ? (
            <ul className="space-y-2">
              {projects.map((project) => (
                <li
                  key={project.id}
                  className="cursor-pointer p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                  onClick={() => handleViewProject(project)}
                >
                  {project.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No projects have been created yet.</p>
          )}
        </div>

        {/* Selected Project Details */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          {selectedProject ? (
            <>
              <h3 className="text-lg font-bold mb-4">Project Details</h3>
              <p className="mb-2">
                <strong>Name:</strong> {selectedProject.name}
              </p>
              <div className="mb-4">
                <h4 className="text-md font-bold">Input Parameters:</h4>
                <ul className="list-disc list-inside">
                  {selectedProject.inputParameters.map((param) => (
                    <li key={param.id}>
                      {param.label} (Lower Bound: {param.lowerBound}, Upper Bound:{" "}
                      {param.upperBound})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="text-md font-bold">Output Parameters:</h4>
                <ul className="list-disc list-inside">
                  {selectedProject.outputParameters.map((param) => (
                    <li key={param.id}>
                      {param.label} (Condition: {param.condition}, Min Value:{" "}
                      {param.minValue}, Max Value: {param.maxValue})
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="text-md font-bold">Constraints:</h4>
                <ul className="list-disc list-inside">
                  {selectedProject.constraints.map((constraint) => (
                    <li key={constraint.id}>{constraint.text}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h4 className="text-md font-bold">Constants:</h4>
                <ul className="list-disc list-inside">
                  {selectedProject.constants.map((constant) => (
                    <li key={constant.id}>
                      {constant.name}: {constant.value}
                    </li>
                  ))}
                </ul>
              </div>

            </>
          ) : (
            <p className="text-gray-600">Select a project to view its details.</p>
          )}
        </div>
      </div>
    </div>
  );
}
