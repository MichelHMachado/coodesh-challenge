import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import { RadioProvider } from "./contexts/RadioContext";

function App() {
  return (
    <RadioProvider>
      <div className="flex w-full min-h-full">
        <Sidebar />
        <Main />
      </div>
    </RadioProvider>
  );
}

export default App;
