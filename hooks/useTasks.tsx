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
    // Fetch tasks from the API
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

  const addTask = (task: string) => {
    const newTask = {
      id: Date.now(),
      task,
      status: false,
      date: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const editTask = (id: number, task: string): void => {
    setEditingTaskId(id);
    setEditedTask(task);
  };

  const saveTask = async (id: number): Promise<void> => {
    await fetch(`/api/tasks/${id}`, {
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

  return {
    tasks,
    addTask,
    editingTaskId,
    editedTask,
    editTask,
    saveTask,
    setEditedTask,
  };
};

export default useTasks;
