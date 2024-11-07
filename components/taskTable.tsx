import { DarkThemeToggle } from "flowbite-react";
import React from "react";
import { Button } from "flowbite-react";
import { DatePicker } from "./DatePicker";

const TaskTable = () => {
  return (
    <div className="size-full overflow-x-auto shadow-md sm:rounded-lg">
      <div className="m-1 w-1/4">
        <DatePicker />
      </div>
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4"></th>
            <th scope="col" className="px-6 py-3">
              Task
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              Actions
            </th>
            <th scope="col" className="p-1 text-right">
              <DarkThemeToggle />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-table-search-1"
                  type="checkbox"
                  className="size-4 rounded border-gray-300 bg-gray-100 text-green-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800"
                />
                <label htmlFor="checkbox-table-search-1" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="row"
              className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
            >
              Apple MacBook Pro 17
            </th>

            <td className="flex items-center justify-end px-2 py-4 text-right">
              <Button size="xs" color="blue" className="mr-2">
                Edit
              </Button>
              <Button size="xs" color="failure" className="ml-2">
                Delete
              </Button>
            </td>
          </tr>
          {/* Repeat similar structure for other rows */}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
