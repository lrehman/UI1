"use client";

import { useState } from "react";
import { useProjectContext } from "@/context/ProjectContext";

export default function ConstantsInModelPage() {
  const {constants, setConstants } = useProjectContext(); // Access global constants
  const [newConstant, setNewConstant] = useState({ name: "", value: "" });
  const [editIndex, setEditIndex] = useState<number | null>(null); // Track the index being edited

  const handleAddOrSave = () => {
    if (newConstant.name && newConstant.value) {
      if (editIndex !== null) {
        // Save Edited Constant
        const updated = [...constants];
        updated[editIndex] = {
          ...updated[editIndex],
          name: newConstant.name,
          value: newConstant.value,
        };
        setConstants(updated);
        setEditIndex(null); // Clear edit index
      } else {
        // Add New Constant
        setConstants([
          ...constants,
          {
            id: constants.length + 1,
            name: newConstant.name,
            value: newConstant.value,
            selected: true,
          },
        ]);
      }
      // Reset input fields
      setNewConstant({ name: "", value: "" });
    }
  };

  const handleEditItem = (index: number) => {
    const constant = constants[index];
    setNewConstant({ name: constant.name, value: constant.value });
    setEditIndex(index); // Set the index being edited
  };

  const handleDeleteItem = (index: number) => {
    const updated = constants.filter((_, i) => i !== index);
    setConstants(updated);
  };

  const handleCheckboxChange = (id: number) => {
    const updated = constants.map((constant) =>
      constant.id === id ? { ...constant, selected: !constant.selected } : constant
    );
    setConstants(updated);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleAddOrSave();
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Constants in Model</h2>
      <div className="flex items-center space-x-4 mb-6">
      <h4 className="flex-1 px-8 py-1 text-lg font-bold">Constant Label</h4>
      <h4 className="w-36 px-4 py-2  text-lg font-bold">Constant Value</h4>
      </div>

      {/* Add or Edit Constant Section */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          className="w-10 h-10 bg-gray-200 rounded-full text-xl font-bold"
          onClick={handleAddOrSave}
        >
          {editIndex !== null ? "✓" : "+"}
        </button>
        <input
          type="text"
          placeholder="Enter Constant Label"
          className="flex-1 px-4 py-2 text-black border rounded-md"
          value={newConstant.name}
          onChange={(e) => setNewConstant({ ...newConstant, name: e.target.value })}
          onKeyDown={handleKeyDown}
        />
        <input
          type="text"
          placeholder="Enter Value"
          className="w-32 px-4 py-2 text-black border rounded-md"
          value={newConstant.value}
          onChange={(e) => setNewConstant({ ...newConstant, value: e.target.value })}
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Added Constants Section */}
      <h3 className="text-lg font-bold mb-4">Existing Constants</h3>
      <ul className="space-y-3">
        {constants.map((constant, index) => (
          <li key={constant.id} className="flex items-center space-x-4">
            {/* Checkbox */}
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={constant.selected}
              onChange={() => handleCheckboxChange(constant.id)}
            />

            {/* Name and Value */}
            <input
              type="text"
              value={constant.name}
              readOnly
              className="flex-1 px-4 py-2 text-black border rounded-md"
            />
            <input
              type="number"
              value={constant.value}
              readOnly
              className="w-32 px-4 py-2 text-black border rounded-md"
            />

            {/* Edit and Delete Buttons */}
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