"use client";
import React, { useState, useEffect } from "react";
import { Button } from "flowbite-react";
import { SearchBar } from "./searchbar";
import { DarkThemeToggle } from "flowbite-react";
import useTasks from "../hooks/useTasks";
import { Task } from "../types";

const TaskTable = () => {
  const {
    tasks,
    addTask,
    editingTaskId,
    editedTask,
    editTask,
    saveTask,
    deleteTask,
    setEditedTask,
  } = useTasks();

  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  const handleSearchResults = (results: Task[]) => {
    setFilteredTasks(results);
  };

  const handleBlur = (id: number) => {
    saveTask(id);
  };

  return (
    <div className="size-full overflow-x-auto shadow-md sm:rounded-lg">
      <div className="m-2 flex items-center justify-between">
        <SearchBar tasks={tasks} onSearchResults={handleSearchResults} />
        <div className="m-5 flex justify-end">
          <Button size="sm" onClick={() => addTask("New task")} color="success">
            Add new task +
          </Button>
        </div>
        <DarkThemeToggle />
      </div>
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4"></th>
            <th scope="col" className="px-6 py-3">
              Task
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-4 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr
              key={task.id}
              className="border-b  bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-search-${task.id}`}
                    type="checkbox"
                    className="size-4 rounded border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                  />
                  <label
                    htmlFor={`checkbox-table-search-${task.id}`}
                    className="sr-only"
                  ></label>
                </div>
              </td>
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {editingTaskId === task.id ? (
                  <input
                    className="w-fullS block w-60 min-w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                    onBlur={() => handleBlur(task.id)}
                    autoFocus
                  />
                ) : (
                  <span
                    className="block w-60 min-w-full cursor-pointer rounded-md bg-blue-100/50 p-2 hover:bg-blue-100 dark:bg-[#374151] dark:hover:bg-[#1f2937]"
                    onClick={() => editTask(task.id, task.task)}
                  >
                    {task.task}
                  </span>
                )}
              </th>
              <td className="max-w-0 px-6 py-4">
                {task.status ? "Completed" : "Pending"}
              </td>
              <td className="max-w-10 p-4">{task.date}</td>
              <td className=" flex items-center justify-end px-5 py-4 text-right">
                <Button
                  size="sm"
                  color="failure"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
