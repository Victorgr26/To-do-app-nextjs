import { useState, useEffect } from "react";

interface Task {
  id: number;
  task: string;
  status: boolean;
  date: string;
}

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/get-task");
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error fetching tasks: ${errorText}`);
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (taskDescription: string) => {
    const newTask = {
      id: tasks.length + 1,
      task: taskDescription,
      status: false,
      date: new Date().toISOString().split("T")[0], // Ensure date is in YYYY-MM-DD format
    };

    try {
      const response = await fetch("/api/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        setTasks((prevTasks) => [...prevTasks, newTask]);
      } else {
        const errorText = await response.text();
        console.error(`Failed to add task: ${errorText}`);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return { tasks, addTask };
};

export default useTasks;
