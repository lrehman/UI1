"use client";


import { useState } from "react";
import { useProjectContext, TaskType } from "@/context/ProjectContext";

export default function TasksPage() {
  const { tasks, setTasks } = useProjectContext();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskStatus, setNewTaskStatus] = useState("Future Task");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState<{ [key: number]: boolean }>({});

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      title: newTaskTitle,
      description: newTaskDescription,
      status: newTaskStatus as unknown as TaskType['status'],
      comments: [],
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskStatus("Future Task");
  };

  const saveTask = () => {
    const updatedTasks = tasks.map(task =>
      task.id === editingTaskId ? { ...task, title: newTaskTitle, description: newTaskDescription, status: newTaskStatus as unknown as TaskType['status'] } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskStatus("Future Task");
  };

  const editTask = (taskId: number) => {
    const task = tasks.find(task => task.id === taskId);
    if (task) {
      setEditingTaskId(taskId);
      setNewTaskTitle(task.title);
      setNewTaskDescription(task.description);
      setNewTaskStatus(task.status as unknown as string);
    }
  };

  const addComment = (taskId: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, comments: [...task.comments, newComment] } : task
    );
    setTasks(updatedTasks);
    setNewComment("");
  };

  const deleteComment = (taskId: number, commentIndex: number) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const updatedComments = task.comments.filter((_, index) => index !== commentIndex);
        return { ...task, comments: updatedComments };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const toggleComments = (taskId: number) => {
    setShowComments(prevState => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Tasks</h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Task Title"
          value={newTaskTitle}
          className="w-full px-4 py-2 text-black border rounded-md mb-2"
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Task Description"
          value={newTaskDescription}
          className="w-full px-4 py-2 text-black border rounded-md mb-2"
          onChange={(e) => setNewTaskDescription(e.target.value)}
        />
        <select
          value={newTaskStatus}
          onChange={(e) => setNewTaskStatus(e.target.value)}
          className="w-full px-4 py-2 text-black border rounded-md mb-2"
        >
          <option value="Future Task">Future Task</option>
          <option value="In process">In process</option>
          <option value="Completed">Completed</option>
        </select>
        {editingTaskId ? (
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={saveTask}
          >
            Save Task
          </button>
        ) : (
          <button
            className="w-full px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={addTask}
          >
            Add Task
          </button>
        )}
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="mb-4 p-4 border rounded-md shadow-sm">
            <h3 className="text-xl font-bold">{task.title}</h3>
            <p className="mb-2">{task.description}</p>
            <p className="mb-2">Status: {String(task.status)}</p>
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded-md mr-2"
              onClick={() => editTask(task.id)}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
              onClick={() => toggleComments(task.id)}
            >
              {showComments[task.id] ? "Hide Comments" : "Show Comments"}
            </button>
            {showComments[task.id] && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Add Comment"
                  value={newComment}
                  className="w-full px-4 py-2 text-black border rounded-md mb-2"
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-md"
                  onClick={() => addComment(task.id)}
                >
                  Add Comment
                </button>
                <ul className="mt-4">
                  {task.comments.map((comment, index) => (
                    <li key={index} className="mb-2 p-2 border rounded-md flex justify-between items-center">
                      {comment}
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded-md"
                        onClick={() => deleteComment(task.id, index)}
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
    </div>
  );
}