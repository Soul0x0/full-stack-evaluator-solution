import "./App.css";
import Tasks from "./Tasks";
import AddTaskForm from "./TasksAddForm";

function App() {
  return (
    <div className="app">
      <h1>📝 React Task Evaluator</h1>
      <AddTaskForm />
      <Tasks />
    </div>
  );
}

export default App;
