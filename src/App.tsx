import { useState, useEffect } from "react";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import { RadioProvider } from "./contexts/RadioContext";

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767) {
        setIsSidebarVisible(true);
      } else {
        setIsSidebarVisible(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <RadioProvider>
      <div className="flex w-full min-h-full">
        <Sidebar
          isSidebarVisible={isSidebarVisible}
          handleToggleSidebar={handleToggleSidebar}
        />
        <Main
          isSidebarVisible={isSidebarVisible}
          handleToggleSidebar={handleToggleSidebar}
        />
      </div>
    </RadioProvider>
  );
}

export default App;
