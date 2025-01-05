"use client";

import { useState } from "react";
import { useProjectContext } from "@/context/ProjectContext";

type Constraint = {
  id: number;
  text: string;
  selected: boolean; // Track whether the constraint is selected
};

export default function ConstraintsPage() {
  const { constraints, setConstraints } = useProjectContext(); // Access global constraints
  const [newConstraint, setNewConstraint] = useState(""); // Temporary input for a new constraint
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track the index being edited

  const handleAddOrSave = () => {
    if (newConstraint.trim()) {
      if (editIndex !== null) {
        // Save Edited Constraint
        const updated = [...constraints];
        updated[editIndex] = {
          ...updated[editIndex],
          text: newConstraint,
        };
        setConstraints(updated);
        setEditIndex(null); // Clear edit index
      } else {
        // Add New Constraint
        setConstraints([
          ...constraints,
          {
            id: constraints.length + 1,
            text: newConstraint,
            selected: false,
          },
        ]);
      }
      // Reset input field
      setNewConstraint("");
    }
  };

  const handleEditItem = (index: number) => {
    const constraint = constraints[index];
    setNewConstraint(constraint.text);
    setEditIndex(index); // Set the index being edited
  };

  const handleDeleteItem = (index: number) => {
    const updated = constraints.filter((_, i) => i !== index);
    setConstraints(updated);
  };

  const handleCheckboxChange = (id: number) => {
    const updated = constraints.map((constraint) =>
      constraint.id === id
        ? { ...constraint, selected: !constraint.selected }
        : constraint
    );
    setConstraints(updated);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleAddOrSave();
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Constraints</h2>
      <div className="flex items-center space-x-4 mb-6">
      <h4 className="flex-1 px-8 py-1 text-lg font-bold">Constraint</h4>
      </div>

      {/* Add or Edit Constraint Section */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          className="w-10 h-10 bg-gray-200 rounded-full text-xl font-bold"
          onClick={handleAddOrSave}
        >
          {editIndex !== null ? "✓" : "+"}
        </button>
        <input
          type="text"
          placeholder="Enter a constraint"
          className="flex-1 px-4 py-2 text-black border rounded-md"
          value={newConstraint}
          onChange={(e) => setNewConstraint(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Existing Constraints Section */}
      <h3 className="text-lg font-bold mb-4">Existing Constraints</h3>
      <ul className="space-y-3">
        {constraints.map((constraint, index) => (
          <li key={constraint.id} className="flex items-center space-x-4">
            {/* Checkbox */}
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={constraint.selected}
              onChange={() => handleCheckboxChange(constraint.id)}
            />

            {/* Editable Text */}
            <input
              type="text"
              value={constraint.text}
              onChange={(e) =>
                handleEditItem(index) // Update the text for editing
              }
              className="flex-1 px-4 py-2 text-black border rounded-md"
            />

            {/* Change and Delete Buttons */}
            <button
              className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
              onClick={() => handleEditItem(index)}
            >
              Change
            </button>
            <button
              className="px-4 py-2 bg-red-300 rounded-md hover:bg-red-400 transition"
              onClick={() => handleDeleteItem(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
