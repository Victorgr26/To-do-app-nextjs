"use client";
import { SidebarNavigation } from "../components/sidebar";
import TaskTable from "../components/taskTable";
import withAuth from "../hoc/withAuth";

const Home: React.FC = () => {
  return (
    <main className="flex min-h-screen gap-2 dark:bg-gray-800">
      <div className="absolute right-0 top-0 m-4"></div>
      <SidebarNavigation />
      <div className="ml-64 flex-1">
        <TaskTable />
      </div>
    </main>
  );
};

export default withAuth(Home);
