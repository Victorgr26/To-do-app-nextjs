"use client";
import React, { useState } from "react";
import { Task } from "../types";

interface SearchBarProps {
  tasks: Task[];
  onSearchResults: (results: Task[]) => void;
}

export function SearchBar({ tasks, onSearchResults }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    const filteredTasks = tasks.filter(
      (task) =>
        task.task.toLowerCase().includes(value.toLowerCase()) ||
        task.id.toString().includes(value),
    );
    onSearchResults(filteredTasks);
  };

  return (
    <form className="mx-1 w-1/2 max-w-lg">
      <label
        htmlFor="default-search"
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
          <svg
            className="size-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="default-search"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pe-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400"
          placeholder="Search tasks..."
          value={query}
          onChange={handleSearch}
        />
      </div>
    </form>
  );
}
