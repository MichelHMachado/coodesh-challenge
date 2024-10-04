import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <Main />
    </div>
  );
}

export default App;
