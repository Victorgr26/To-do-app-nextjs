import { useState, useEffect } from "react";
import { Task } from "../types";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<string>("");

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/get-task");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching tasks: ${errorText}`);
      }
      const data = await response.json();
      setTasks(data.sort((a: Task, b: Task) => a.id - b.id)); // Sort tasks by ID
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task: string) => {
    const newTask = {
      task,
      status: false,
      date: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/add-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error adding task: ${errorText}`);
      }

      const addedTask = await response.json();
      setTasks([addedTask, ...tasks]); // Add the new task to the top of the list
    } catch (error) {
      console.error(error);
    }
  };

  const editTask = (id: number, task: string): void => {
    setEditingTaskId(id);
    setEditedTask(task);
  };

  const saveTask = async (id: number, updates: Partial<Task>) => {
    try {
      const existingTask = tasks.find((task) => task.id === id);
      const response = await fetch(`/api/update-task?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...existingTask, ...updates }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error updating task: ${errorText}`);
      }

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task)),
      );
    } catch (error) {
      console.error(error);
    }
    setEditingTaskId(null);
  };

  const deleteTask = async (id: number): Promise<void> => {
    try {
      const response = await fetch(`/api/delete-task?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error deleting task: ${errorText}`);
      }

      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    tasks,
    addTask,
    editingTaskId,
    editedTask,
    editTask,
    saveTask,
    deleteTask,
    setEditedTask,
  };
};

export default useTasks;
