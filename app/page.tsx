import { SidebarNavigation } from "../components/sidebar";
import TaskTable from "../components/taskTable";

export default function Home() {
  return (
    <main className="flex min-h-screen gap-2 dark:bg-gray-800">
      <div className="absolute right-0 top-0 m-4"></div>
      <div className="w-64">
        <SidebarNavigation />
      </div>
      <div className="flex-1">
        <TaskTable />
      </div>
    </main>
  );
}
