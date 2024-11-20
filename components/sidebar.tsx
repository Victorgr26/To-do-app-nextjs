"use client";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiTable } from "react-icons/hi";
import { DarkThemeToggle } from "flowbite-react";

const SidebarNavigation: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 h-full w-64">
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item>
              <DarkThemeToggle />
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiChartPie}>
              Home
            </Sidebar.Item>
            <Sidebar.Item href="/404" icon={HiInbox}>
              404
            </Sidebar.Item>
            <Sidebar.Item href="/signin" icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
            <Sidebar.Item href="/signup" icon={HiTable}>
              Sign Up
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default SidebarNavigation;
