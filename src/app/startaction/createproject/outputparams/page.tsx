"use client";

import { useState } from "react";
import { useProjectContext } from "@/context/ProjectContext";

export default function OutputParametersPage() {
  const { outputParameters, setOutputParameters } = useProjectContext();
  const [newParameter, setNewParameter] = useState({
    label: "",
    description: "",
    condition: "Minimum",
    minValue: 0,
    maxValue: 0,
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddOrSave = () => {
    if (
      newParameter.label &&
      newParameter.description &&
      newParameter.minValue &&
      newParameter.maxValue
    ) {
      if (editIndex !== null) {
        // Save Edited Item
        const updated = [...outputParameters];
        updated[editIndex] = {
          ...updated[editIndex],
          ...newParameter,
        };
        setOutputParameters(updated);
        setEditIndex(null); // Clear edit index
      } else {
        // Add New Item
        setOutputParameters([
          ...outputParameters,
          {
            id: outputParameters.length + 1,
            ...newParameter,
          },
        ]);
      }
      // Reset input fields
      setNewParameter({
        label: "",
        description: "",
        condition: "Minimum",
        minValue: 0,
        maxValue: 0,
      });
    }
  };

  const handleEditItem = (index: number) => {
    const item = outputParameters[index];
    setNewParameter({
      label: item.label,
      description: item.description,
      condition: item.condition,
      minValue: item.minValue,
      maxValue: item.maxValue,
    });
    setEditIndex(index); // Set the index of the item being edited
  };

  const handleDeleteItem = (index: number) => {
    const updated = outputParameters.filter((_, i) => i !== index);
    setOutputParameters(updated);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleAddOrSave();
    }
  };


  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Output Parameters</h2>
      <div className="flex items-center space-x-4 mb-6">
      <h6 className="flex-1 px-4 py-1 text-lg font-bold">Parameter name</h6>
      <h6 className="flex-1 px-8 py-1 text-lg font-bold">Description</h6>
      <h6 className="w-22 px-4 py-1  text-lg font-bold">Condition</h6>
      <h6 className="w-23 px-4 py-1  text-lg font-bold">Min</h6>
      <h6 className="w-24 px-4 py-1  text-lg font-bold">Max</h6>
      </div>

      {/* Add or Edit Parameter Section */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          className="w-10 h-10 bg-gray-200 rounded-full text-xl font-bold"
          onClick={handleAddOrSave}
        >
          {editIndex !== null ? "✓" : "+"}
        </button>
        <input
          type="text"
          placeholder="Enter Output Label"
          className="flex-1 px-4 py-2 text-black border rounded-md"
          value={newParameter.label}
          onChange={(e) =>
            setNewParameter({ ...newParameter, label: e.target.value })
          }
          onKeyDown={handleKeyDown}
        />
        <input
          type="text"
          placeholder="Enter Description"
          className="flex-1 px-4 py-2 text-black border rounded-md"
          value={newParameter.description}
          onChange={(e) =>
            setNewParameter({ ...newParameter, description: e.target.value })
          }
          onKeyDown={handleKeyDown}
        />
        <select
          value={newParameter.condition}
          onChange={(e) =>
            setNewParameter({ ...newParameter, condition: e.target.value })
          }
          className="px-4 py-2 border rounded-md text-black"
        >
          <option value="Minimum">Minimum</option>
          <option value="Maximum">Maximum</option>
        </select>
        <input
          type="number"
          placeholder="0"
          className="w-20 px-4 py-2 text-black border rounded-md"
          value={newParameter.minValue}
          onChange={(e) =>
            setNewParameter({ ...newParameter, minValue: Number(e.target.value) })
          }
          onKeyDown={handleKeyDown}
        />
        <input
          type="number"
          placeholder="Max Value"
          className="w-20 px-4 py-2 text-black border rounded-md"
          value={newParameter.maxValue}
          onChange={(e) =>
            setNewParameter({ ...newParameter, maxValue: Number(e.target.value) })
          }
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Added Parameters Section */}
      <h3 className="text-lg font-bold mb-4">Added Parameters</h3>
      <ul className="space-y-3">
        {outputParameters.map((param, index) => (
          <li key={param.id} className="flex items-center space-x-4">
            <input type="checkbox" className="w-5 h-5" />
            <input
              type="text"
              value={param.label}
              readOnly
              className="flex-1 px-4 py-2 text-black border rounded-md"
            />
            <input
              type="text"
              value={param.description}
              readOnly
              className="flex-1 px-4 py-2 text-black border rounded-md"
            />
            <select
              value={param.condition}
              className="px-4 py-2 border rounded-md text-black"
            >
              <option value="Minimum">Minimum</option>
              <option value="Maximum">Maximum</option>
            </select>
            <input
              type="number"
              value={param.minValue}
              readOnly
              className="w-20 px-4 py-2 text-black border rounded-md"
            />
            <input
              type="number"
              value={param.maxValue}
              readOnly
              className="w-20 px-4 py-2 text-black border rounded-md"
            />
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
