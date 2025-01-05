"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useProjectContext } from "@/context/ProjectContext";

export default function CreateProjectLayout({ children }: { children: React.ReactNode }) {
  const { inputParameters, outputParameters, constraints, constants, setInputParameters, setOutputParameters, setConstraints, setConstants } =
    useProjectContext();

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [projectName, setProjectName] = useState(""); // Project name state
  const [savedProjects, setSavedProjects] = useState<any[]>([]); // List of saved projects
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null); // Currently editing project

  const router = useRouter();

  // Load saved projects from localStorage on component mount
// Load saved projects for the logged-in user
    useEffect(() => {
      const username = localStorage.getItem("username");
      if (username) {
        const userProjectsKey = `projects_${username}`;
        const projects = JSON.parse(localStorage.getItem(userProjectsKey) || "[]");
        setSavedProjects(projects); // Initialize state with the user's projects
      }
    }, []);


  

  const handleSaveProject = () => {
    if (!projectName.trim()) {
      alert("Please enter a valid project name.");
      return;
    }
  
    const username = localStorage.getItem("username"); // Get logged-in user
    if (!username) {
      alert("You must be logged in to save a project.");
      return;
    }
  
    // Combine all data with the project name
    const updatedProject = {
      id: editingProjectId || Date.now(), // Use existing ID if editing
      name: projectName,
      inputParameters,
      outputParameters,
      constraints,
      constants,
    };
  
    // Retrieve existing projects for the user
    const userProjectsKey = `projects_${username}`;
    const existingProjects = JSON.parse(localStorage.getItem(userProjectsKey) || "[]");
  
    let updatedProjects;
    if (editingProjectId) {
      // Update existing project
      updatedProjects = existingProjects.map((project: { id: number; }) =>
        project.id === editingProjectId ? updatedProject : project
      );
    } else {
      // Add new project
      updatedProjects = [...existingProjects, updatedProject];
    }
  
    // Save updated projects back to localStorage
    localStorage.setItem(userProjectsKey, JSON.stringify(updatedProjects));
    setSavedProjects(updatedProjects); // Update state with the new list
  
    // Reset state and close modal
    setIsModalOpen(false);
    setProjectName("");
    setEditingProjectId(null);
  
    // Redirect to the simulation screen
    router.push("/runsimulations");
  };
  

  const handleLoadProject = (projectId: number) => {
    const username = localStorage.getItem("username"); // Get logged-in user
    if (!username) {
      alert("You must be logged in to load a project.");
      return;
    }
  
    const userProjectsKey = `projects_${username}`;
    const savedProjects = JSON.parse(localStorage.getItem(userProjectsKey) || "[]");
  
    const projectToLoad = savedProjects.find((project: { id: number; }) => project.id === projectId);
    if (projectToLoad) {
      // Load project data into context
      setProjectName(projectToLoad.name);
      setInputParameters(projectToLoad.inputParameters);
      setOutputParameters(projectToLoad.outputParameters);
      setConstraints(projectToLoad.constraints);
      setConstants(projectToLoad.constants);
  
      // Set editing project ID
      setEditingProjectId(projectToLoad.id);
    }
  };
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white p-6">
        <h2 className="text-xl font-bold mb-4">Set Parameters</h2>
        <ul className="space-y-3">
          <li>
            <Link
              href="/startaction/createproject/inputparams"
              className="block bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Set Input Parameters
            </Link>
          </li>
          <li>
            <Link
              href="/startaction/createproject/outputparams"
              className="block bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Set Output Parameters
            </Link>
          </li>
          <li>
            <Link
              href="/startaction/createproject/constraints"
              className="block bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Set Project Constraints
            </Link>
          </li>
          <li>
            <Link
              href="/startaction/createproject/constants"
              className="block bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Set Constants in Model
            </Link>
          </li>
        </ul>

        {/* Create Button */}
        <button
          onClick={() => setIsModalOpen(true)} // Open modal
          className="mt-6 w-full bg-white px-4 py-2 rounded-md text-black font-bold hover:bg-gray-300"
        >
          {editingProjectId ? "Save Changes" : "Create Project"}
        </button>

        {/* Load Existing Projects */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Select an existing project:</h3>
          <select
            className="w-full px-4 py-2 rounded-md text-black"
            onChange={(e) => handleLoadProject(Number(e.target.value))}
            value={editingProjectId || ""}
          >
            <option value="" disabled>
              Select a project
            </option>
            {savedProjects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingProjectId ? "Edit Project" : "Save Project"}
            </h2>
            <input
              type="text"
              placeholder="Enter Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-4 py-2 text-black border rounded-md mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingProjectId(null); // Cancel editing
                }} // Close modal
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProject} // Save project
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-600 transition"
              >
                {editingProjectId ? "Save Changes" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
