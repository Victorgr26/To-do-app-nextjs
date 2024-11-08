import { useState, useEffect } from "react";

interface Task {
  id: number;
  task: string;
  status: boolean;
  date: string;
}

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<string>("");

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
        console.error(error);
      }
    };

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

  const saveTask = async (id: number): Promise<void> => {
    await fetch(`/api/update-task?id=${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: editedTask }),
    });

    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      tasks[taskIndex].task = editedTask;
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
