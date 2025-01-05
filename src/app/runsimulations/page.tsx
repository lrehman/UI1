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
    if (!inputParameters.length && !outputParameters.length && !constraints.length && !constants.length) {
      console.warn("No parameters available. Make sure they are added during project creation.");
    }
  }, [inputParameters, outputParameters, constraints, constants]);

  const toggleSelection = (section: Exclude<SectionKey, "scoringFunction">, id: number) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as Record<number, boolean>),
        [id]: !prev[section]?.[id],
      },
    }));
  };

  const updateScoringFunction = (key: "predefined" | "custom", value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      scoringFunction: {
        predefined: key === "predefined" ? value : "",
        custom: key === "custom" ? value : "",
      },
    }));
  };

  const handleStartSimulation = () => {
    if (!Object.values(selectedOptions.scoringFunction).some(Boolean)) {
      alert("Please select or define a scoring function.");
      return;
    }

    const updatedInputParameters = inputParameters.filter((param) => selectedOptions.inputParameters[param.id]);
    const updatedOutputParameters = outputParameters.filter((param) => selectedOptions.outputParameters[param.id]);
    const updatedConstraints = constraints.filter((constraint) => selectedOptions.constraints[constraint.id]);
    const updatedConstants = constants.filter((constant) => selectedOptions.constants[constant.id]);

    console.log("Simulation Configuration:");
    console.log("Input Parameters:", updatedInputParameters);
    console.log("Output Parameters:", updatedOutputParameters);
    console.log("Constraints:", updatedConstraints);
    console.log("Constants:", updatedConstants);
    console.log("Scoring Function:", selectedOptions.scoringFunction);

    alert("Simulation started successfully!");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "inputParameters":
        return renderSection(inputParameters, "inputParameters", "Input Parameters");
      case "outputParameters":
        return renderSection(outputParameters, "outputParameters", "Output Parameters");
      case "constraints":
        return renderSection(constraints, "constraints", "Constraints");
      case "constants":
        return constantsSection();
      case "scoringFunction":
        return renderScoringFunctionSection();
      default:
        return <p>Select a section to configure parameters.</p>;
    }
  };

  const renderSection = (items: any[], section: SectionKey, title: string) => (
    <div className="p-6 bg-gray-800 text-white rounded-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4">
              <input
                type="checkbox"
                id={`${section}-${item.id}`}
                checked={!!(selectedOptions[section] as Record<number, boolean>)[item.id]}
                onChange={() => toggleSelection(section as Exclude<SectionKey, "scoringFunction">, item.id)}
              />
              <label htmlFor={`${section}-${item.id}`} className="ml-2">
                {item.label || item.name || "Unnamed Parameter"} <span className="ml-4">{item.description || item.value || ""}</span>
                <span className="ml-4">{item.lowerBound || item.Minvalue || ""}</span>
                <span className="ml-4">{item.upperBound || item.maxValue || ""}</span>
              </label>
            </div>
          ))}
        </div>
      ) : (
        <p>No {title.toLowerCase()} available.</p>
      )}
    </div>
  );

  const constantsSection = () =>
        (
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
                      {constant.name} <span className="ml-4">{constant.value}</span>
                    </label>
                  </div>
                ))}
              </div>
            ) : (
              <p>No constants defined.</p>
            )}
          </div>)

  const renderScoringFunctionSection = () => (
    <div className="p-6 bg-gray-800 text-white rounded-md">
      <h2 className="text-xl font-bold mb-4">Scoring Function</h2>
      <div className="space-y-4">
        <p>Select a scoring function from the predefined options or define a custom one.</p>
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
