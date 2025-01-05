"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define types for the project data
type InputParameter = { id: number; label: string; lowerBound: number; upperBound: number };
type OutputParameter = { id: number; label: string; description: string; condition: string; minValue: number; maxValue: number };
type Constraint = {
  selected: any; id: number; text: string 
};
type Constant = { id: number; name: string; value: string; selected: boolean;};
export type TaskType = {
  status(status: any): ReactNode;
  id: number;
  title: string;
  description: string;
  comments: string[];
};

type ProjectContextType = {
  inputParameters: InputParameter[];
  outputParameters: OutputParameter[];
  constraints: Constraint[];
  constants: Constant[];
  tasks: TaskType[];
  setInputParameters: React.Dispatch<React.SetStateAction<InputParameter[]>>;
  setOutputParameters: React.Dispatch<React.SetStateAction<OutputParameter[]>>;
  setConstraints: React.Dispatch<React.SetStateAction<Constraint[]>>;
  setConstants: React.Dispatch<React.SetStateAction<Constant[]>>;
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
};

// Create the Project Context
const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Provider Component
export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [inputParameters, setInputParameters] = useState<InputParameter[]>([]);
  const [outputParameters, setOutputParameters] = useState<OutputParameter[]>([]);
  const [constraints, setConstraints] = useState<Constraint[]>([]);
  const [constants, setConstants] = useState<Constant[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);

  return (
    <ProjectContext.Provider
      value={{
        inputParameters,
        outputParameters,
        constraints,
        constants,
        tasks,
        setInputParameters,
        setOutputParameters,
        setConstraints,
        setConstants,
        setTasks,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

// Hook to use Project Context
export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectContext must be used within a ProjectProvider");
  }
  return context;
};
