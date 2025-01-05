"use client";

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function View() {
  const [projects, setProjects] = useState<any[]>([]);
  const [username, setUsername] = useState<string | null>(null); // Track the logged-in user
  const [newComment, setNewComment] = useState<string>(""); // Track new comments
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({}); // Track visibility of comments for each project
  const router = useRouter();

  // Load projects for the logged-in user
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername); // Set the logged-in user
      const userProjectsKey = `projects_${storedUsername}`; // Use username-specific key
      const savedProjects = JSON.parse(localStorage.getItem(userProjectsKey) || "[]");
      setProjects(savedProjects);
    } else {
      // Redirect to login if no user is logged in
      router.push("/login");
    }
  }, [router]);

  const handleOpenProject = (project: any) => {
    console.log("Opening project:", project); // Debugging
    localStorage.setItem("activeProject", JSON.stringify(project));
    router.push("/runsimulations");
  };
  

  const handleEditProject = (project: any) => {
    // Save the selected project to localStorage for editing
    localStorage.setItem("editingProject", JSON.stringify(project));
    router.push("/startaction/createproject");
  };

  const toggleComments = (projectId: number) => {
    setShowComments((prevState) => ({
      ...prevState,
      [projectId]: !prevState[projectId],
    }));
  };

  const addComment = (projectId: number) => {
    if (!newComment.trim()) {
      alert("Please enter a comment.");
      return;
    }

    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        return {
          ...project,
          comments: [...(project.comments || []), newComment], // Add comment to existing comments
        };
      }
      return project;
    });

    setProjects(updatedProjects);
    setNewComment("");

    // Save updated projects to localStorage for the current user
    if (username) {
      localStorage.setItem(`projects_${username}`, JSON.stringify(updatedProjects));
    }
  };

  const deleteComment = (projectId: number, commentIndex: number) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        const updatedComments = (project.comments || []).filter((_: any, index: number) => index !== commentIndex);
        return { ...project, comments: updatedComments };
      }
      return project;
    });

    setProjects(updatedProjects);

    // Save updated projects to localStorage for the current user
    if (username) {
      localStorage.setItem(`projects_${username}`, JSON.stringify(updatedProjects));
    }
  };

  if (!username) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl font-bold text-gray-600">Please log in to view projects.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Projects for {username}</h2>
      <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700"> 
        <a href="/dashboard">Go Back</a>
      </button>
      {projects.length > 0 ? (
        <ul className="space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="p-4 bg-gray-100 rounded-md shadow-md">
              <h3 className="text-lg font-bold">{project.name}</h3>
              <p>Input Parameters: {project.inputParameters.length}</p>
              <p>Output Parameters: {project.outputParameters.length}</p>
              <p>Constraints: {project.constraints.length}</p>
              <p>Constants: {project.constants.length}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleOpenProject(project)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2 hover:bg-gray-700"
                >
                  Open
                </button>
                <button
                  onClick={() => handleEditProject(project)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2 hover:bg-gray-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => toggleComments(project.id)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  {showComments[project.id] ? "Hide Comments" : "Show Comments"}
                </button>
              </div>
              {showComments[project.id] && (
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md text-black mb-2"
                  />
                  <button
                    onClick={() => addComment(project.id)}
                    className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-600"
                  >
                    Add Comment
                  </button>
                  <ul className="mt-4">
                    {(project.comments || []).map((comment: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, index: Key | null | undefined) => (
                      <li
                        key={index}
                        className="mb-2 p-2 border rounded-md flex justify-between items-center"
                      >
                        {comment}
                        <button
                          onClick={() => deleteComment(project.id, index as number)}
                          className="px-2 py-1 bg-red-500 text-white rounded-md"
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No projects have been created yet.</p>
      )}
    </div>
  );
}
