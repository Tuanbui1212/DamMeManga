// OnlySidebarLayout.jsx
import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

function OnlySidebarLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="w-full">{children}</div>
    </div>
  );
}

export default OnlySidebarLayout;
