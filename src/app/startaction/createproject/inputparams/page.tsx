"use client";

import { useState } from "react";
import { useProjectContext } from "@/context/ProjectContext";

export default function InputParametersPage() {
  const { inputParameters, setInputParameters } = useProjectContext();
  const [newParameter, setNewParameter] = useState({
    label: "",
    lowerBound: "",
    upperBound: "",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddOrSave = () => {
    if (
      newParameter.label &&
      !isNaN(Number(newParameter.lowerBound)) &&
      !isNaN(Number(newParameter.upperBound))
    ) {
      if (editIndex !== null) {
        // Save Edited Item
        const updated = [...inputParameters];
        updated[editIndex] = {
          ...updated[editIndex],
          label: newParameter.label,
          lowerBound: Number(newParameter.lowerBound),
          upperBound: Number(newParameter.upperBound),
        };
        setInputParameters(updated);
        setEditIndex(null); // Clear edit index
      } else {
        // Add New Item
        setInputParameters([
          ...inputParameters,
          {
            id: inputParameters.length + 1,
            label: newParameter.label,
            lowerBound: Number(newParameter.lowerBound),
            upperBound: Number(newParameter.upperBound),
          },
        ]);
      }
      // Reset input fields
      setNewParameter({ label: "", lowerBound: "", upperBound: "" });
    }
  };

  const handleEditItem = (index: number) => {
    const item = inputParameters[index];
    setNewParameter({
      label: item.label,
      lowerBound: String(item.lowerBound),
      upperBound: String(item.upperBound),
    });
    setEditIndex(index);
  };

  const handleDeleteItem = (index: number) => {
    const updated = inputParameters.filter((_, i) => i !== index);
    setInputParameters(updated);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleAddOrSave();
    }
  };

  return (
    <div className="bg-white text-black p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Input Parameters</h2>
      <div className="flex items-center space-x-4 mb-6">
      <h4 className="flex-1 px-8 py-1 text-lg font-bold">Parameter Label</h4>
      <h4 className="w-36 px-4 py-2  text-lg font-bold">Lowerbound</h4>
      <h4 className="w-36 px-4 py-2  text-lg font-bold">Upperbound</h4>
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
          placeholder="Enter Parameter Label"
          className="flex-1 px-4 py-2 text-black border rounded-md"
          value={newParameter.label}
          onChange={(e) =>
            setNewParameter({ ...newParameter, label: e.target.value })
          }
          onKeyDown={handleKeyDown}
        />
        <input
          type="number"
          placeholder="0"
          className="w-36 px-4 py-2 text-black border rounded-md"
          value={newParameter.lowerBound}
          onChange={(e) =>
            setNewParameter({ ...newParameter, lowerBound: e.target.value })
          }
          onKeyDown={handleKeyDown}
        />
        <input
          type="number"
          placeholder="0"
          className="w-36 px-4 py-2 text-black border rounded-md"
          value={newParameter.upperBound}
          onChange={(e) =>
            setNewParameter({ ...newParameter, upperBound: e.target.value })
          }
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* Added Parameters Section */}
      <h3 className="text-lg font-bold mb-4">Added Parameters</h3>
      <ul className="space-y-3">
        {inputParameters.map((param, index) => (
          <li key={param.id} className="flex items-center space-x-4">
            <input type="checkbox" className="w-5 h-5" />
            <input
              type="text"
              value={param.label}
              readOnly
              className="flex-1 px-4 py-2 text-black border rounded-md"
            />
            <input
              type="number"
              value={param.lowerBound}
              readOnly
              className="w-36 px-4 py-2 text-black border rounded-md"
            />
            <input
              type="number"
              value={param.upperBound}
              readOnly
              className="w-36 px-4 py-2 text-black border rounded-md"
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
