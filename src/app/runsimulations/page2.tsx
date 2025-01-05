"use client";

import { useProjectContext } from "@/context/ProjectContext";
import { useEffect, useState } from "react";

type SectionKey =
  | "inputParameters"
  | "outputParameters"
  | "constraints"
  | "constants"
  | "scoringFunction";

type SelectedOptions = {
  inputParameters: Record<number, boolean>;
  outputParameters: Record<number, boolean>;
  constraints: Record<number, boolean>;
  constants: Record<number, boolean>;
  scoringFunction: {
    predefined: string; // Holds the predefined scoring function name
    custom: string; // Holds the custom scoring function definition
  };
};

export default function RunSimulationPage() {
  const {
    inputParameters,
    outputParameters,
    constraints,
    constants,
    setInputParameters,
    setOutputParameters,
    setConstraints,
    setConstants,
  } = useProjectContext();

  const [activeSection, setActiveSection] = useState<SectionKey | "">("");
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    inputParameters: {},
    outputParameters: {},
    constraints: {},
    constants: {},
    scoringFunction: {
      predefined: "",
      custom: "",
    },
  });

  useEffect(() => {
    // Load the active project from localStorage on mount
    const activeProject = JSON.parse(localStorage.getItem("activeProject") || "{}");

    if (activeProject) {
      // Populate the context values with the loaded project data
      setInputParameters(activeProject.inputParameters || []);
      setOutputParameters(activeProject.outputParameters || []);
      setConstraints(activeProject.constraints || []);
      setConstants(activeProject.constants || []);
    }
  }, [setInputParameters, setOutputParameters, setConstraints, setConstants]);

  // Toggle the selection of an item
  const toggleSelection = (section: Exclude<SectionKey, "scoringFunction">, id: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as Record<number, boolean>),
        [id]: !prev[section]?.[id],
      },
    }));
  };

  // Update scoring function
  const updateScoringFunction = (key: "predefined" | "custom", value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      scoringFunction: {
        predefined: key === "predefined" ? value : "",
        custom: key === "custom" ? value : "",
      },
    }));
  };

  // Handle simulation start
  const handleStartSimulation = () => {
    // Validate scoring function selection
    const { predefined, custom } = selectedOptions.scoringFunction;
    if (!predefined && !custom) {
      alert("Please select or define a scoring function.");
      return;
    }

    // Update context with selected values
    const updatedInputParameters = inputParameters.filter((param) =>
      selectedOptions.inputParameters[param.id]
    );
    const updatedOutputParameters = outputParameters.filter((param) =>
      selectedOptions.outputParameters[param.id]
    );
    const updatedConstraints = constraints.filter((constraint) =>
      selectedOptions.constraints[constraint.id]
    );
    const updatedConstants = constants.filter((constant) =>
      selectedOptions.constants[constant.id]
    );

    setInputParameters(updatedInputParameters);
    setOutputParameters(updatedOutputParameters);
    setConstraints(updatedConstraints);
    setConstants(updatedConstants);

    // Log selected options or pass to simulation logic
    console.log("Starting simulation with the following options:");
    console.log("Input Parameters:", updatedInputParameters);
    console.log("Output Parameters:", updatedOutputParameters);
    console.log("Constraints:", updatedConstraints);
    console.log("Constants:", updatedConstants);
    console.log(
      "Scoring Function:",
      predefined || `Custom: ${custom}`
    );

    alert("Simulation started successfully!");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "inputParameters":
        return (
          <div className="p-6 bg-gray-800 text-white rounded-md">
            <h2 className="text-xl font-bold mb-4">Input Parameters</h2>
            {inputParameters.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {inputParameters.map((param) => (
                  <div key={param.id} className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id={`input-${param.id}`}
                      checked={!!selectedOptions.inputParameters[param.id]}
                      onChange={() =>
                        toggleSelection("inputParameters", param.id)
                      }
                    />
                    <label htmlFor={`input-${param.id}`} className="ml-2">
                      {param.label}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p>No input parameters defined.</p>
            )}
          </div>
        );

      case "outputParameters":
        return (
          <div className="p-6 bg-gray-800 text-white rounded-md">
            <h2 className="text-xl font-bold mb-4">Output Parameters</h2>
            {outputParameters.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {outputParameters.map((param) => (
                  <div key={param.id} className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id={`output-${param.id}`}
                      checked={!!selectedOptions.outputParameters[param.id]}
                      onChange={() =>
                        toggleSelection("outputParameters", param.id)
                      }
                    />
                    <label htmlFor={`output-${param.id}`} className="ml-2">
                      {param.label}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p>No output parameters defined.</p>
            )}
          </div>
        );

      case "constraints":
        return (
          <div className="p-6 bg-gray-800 text-white rounded-md">
            <h2 className="text-xl font-bold mb-4">Constraints</h2>
            {constraints.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {constraints.map((constraint) => (
                  <div key={constraint.id} className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id={`constraint-${constraint.id}`}
                      checked={!!selectedOptions.constraints[constraint.id]}
                      onChange={() =>
                        toggleSelection("constraints", constraint.id)
                      }
                    />
                    <label htmlFor={`constraint-${constraint.id}`} className="ml-2">
                      {constraint.text}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p>No constraints defined.</p>
            )}
          </div>
        );

      case "constants":
        return (
          <div className="p-6 bg-gray-800 text-white rounded-md">
            <h2 className="text-xl font-bold mb-4">Constants</h2>
            {constants.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {constants.map((constant) => (
                  <div key={constant.id} className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      id={`constant-${constant.id}`}
                      checked={!!selectedOptions.constants[constant.id]}
                      onChange={() =>
                        toggleSelection("constants", constant.id)
                      }
                    />
                    <label htmlFor={`constant-${constant.id}`} className="ml-2">
                      {constant.name}: {constant.value}
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p>No constants defined.</p>
            )}
          </div>
        );

      case "scoringFunction":
        return (
          <div className="p-6 bg-gray-800 text-white rounded-md">
            <h2 className="text-xl font-bold mb-4">Scoring Function</h2>
            <div className="space-y-4">
              <p>Select a scoring function from the predefined options or add a custom one.</p>
              <div>
                <h3 className="text-lg font-bold mb-2">Predefined Scoring Functions:</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    "Uncertainty Sampling",
                    "Expected Model Change",
                    "Query by Committee",
                    "Variance Reduction",
                    "Margin Sampling",
                    "Add Custom Function",
                  ].map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`scoring-${index}`}
                        name="scoringFunction"
                        value={option}
                        onChange={() => updateScoringFunction("predefined", option)}
                        checked={selectedOptions.scoringFunction.predefined === option}
                      />
                      <label htmlFor={`scoring-${index}`}>{option}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Option */}
              {selectedOptions.scoringFunction.predefined === "Add Custom Function" && (
                <div>
                  <h3 className="text-lg font-bold mb-2">Custom Scoring Function:</h3>
                  <textarea
                    className="w-full p-2 rounded-md text-black"
                    rows={4}
                    placeholder="Enter your custom scoring function definition..."
                    value={selectedOptions.scoringFunction.custom || ""}
                    onChange={(e) => updateScoringFunction("custom", e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        );

      default:
        return <p>Select a section to configure parameters.</p>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white p-6">
        <h2 className="text-lg font-bold mb-4">Define Parameters</h2>
        <ul className="space-y-3">
          <li>
            <button
              onClick={() => setActiveSection("inputParameters")}
              className={`w-full text-left px-4 py-2 rounded-md font-bold ${
                activeSection === "inputParameters"
                  ? "bg-gray-400 text-black"
                  : "bg-gray-700 text-white"
              } hover:bg-gray-600`}
            >
              Input Parameters
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("outputParameters")}
              className={`w-full text-left px-4 py-2 rounded-md font-bold ${
                activeSection === "outputParameters"
                  ? "bg-gray-400 text-black"
                  : "bg-gray-700 text-white"
              } hover:bg-gray-600`}
            >
              Output Parameters
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("constraints")}
              className={`w-full text-left px-4 py-2 rounded-md font-bold ${
                activeSection === "constraints"
                  ? "bg-gray-400 text-black"
                  : "bg-gray-700 text-white"
              } hover:bg-gray-600`}
            >
              Constraints
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("constants")}
              className={`w-full text-left px-4 py-2 rounded-md font-bold ${
                activeSection === "constants"
                  ? "bg-gray-400 text-black"
                  : "bg-gray-700 text-white"
              } hover:bg-gray-600`}
            >
              Constants in Model
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection("scoringFunction")}
              className={`w-full text-left px-4 py-2 rounded-md font-bold ${
                activeSection === "scoringFunction"
                  ? "bg-gray-400 text-black"
                  : "bg-gray-700 text-white"
              } hover:bg-gray-600`}
            >
              Scoring Function
            </button>
          </li>
        </ul>
        <button
          className="w-full mt-4 py-2 bg-white text-black rounded-md font-bold hover:bg-gray-300"
          onClick={handleStartSimulation}
        >
          Start Simulation
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">{renderContent()}</main>
    </div>
  );
}
