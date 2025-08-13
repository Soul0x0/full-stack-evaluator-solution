import "./App.css";
import Tasks from "./Tasks";
import AddTaskForm from "./TasksAddForm";

function App() {
  return (
    <div className="app">
      <h1>📝 React Task Evaluator</h1>
      <div className="add_task">
        <AddTaskForm />
      </div>
      <Tasks />
    </div>
  );
}

export default App;
