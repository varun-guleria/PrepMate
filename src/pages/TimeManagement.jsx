import { useState, useEffect } from "react";

export default function TimeManagement() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [estimatedTime, setEstimatedTime] = useState(30); // in minutes
  const [status, setStatus] = useState("Not Started");
  const [activeTaskId, setActiveTaskId] = useState(null);

  // Progress calculation
  const totalTime = tasks.reduce((sum, task) => sum + task.estimatedTime, 0);
  const completedTime = tasks.reduce(
    (sum, task) =>
      task.status === "Completed" ? sum + task.estimatedTime : sum,
    0
  );
  const progress = totalTime ? (completedTime / totalTime) * 100 : 0;

  const allTasksCompleted = tasks.length > 0 && completedTime === totalTime;

  // Timer for active task
  useEffect(() => {
    let interval;
    if (activeTaskId) {
      interval = setInterval(() => {
        setTasks((prev) =>
          prev.map((task) => {
            if (task.id === activeTaskId && task.remainingTime > 0) {
              return { ...task, remainingTime: task.remainingTime - 1 };
            }
            return task;
          })
        );
      }, 60000); // 1 minute tick
    }
    return () => clearInterval(interval);
  }, [activeTaskId]);

  // Watch for time ending
  useEffect(() => {
    tasks.forEach((task) => {
      if (task.remainingTime === 0 && task.id === activeTaskId) {
        alert(`Time's up for "${task.name}". Want to borrow more time?`);
        setActiveTaskId(null);
      }
    });
  }, [tasks, activeTaskId]);

  const addTask = () => {
    if (!taskName) return alert("Enter task name!");
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        name: taskName,
        estimatedTime: Number(estimatedTime),
        remainingTime: Number(estimatedTime),
        status,
      },
    ]);
    setTaskName("");
    setEstimatedTime(30);
    setStatus("Not Started");
  };

  const removeTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

  const updateTaskStatus = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: newStatus } : task))
    );
    if (newStatus === "In Progress") setActiveTaskId(id);
    if (newStatus === "Completed") setActiveTaskId(null);
  };

  const borrowTime = (id, amount) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, remainingTime: Math.max(0, task.remainingTime + amount) }
          : task
      )
    );
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">
        Time Management & Scheduler
      </h1>

      {/* Add Task */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task name"
          className="border p-2 rounded flex-1"
        />
        <input
          type="number"
          value={estimatedTime}
          onChange={(e) => setEstimatedTime(e.target.value)}
          placeholder="Estimated time (minutes)"
          className="border p-2 rounded w-40"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 rounded w-40"
        >
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <button
          onClick={addTask}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Task
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="h-4 bg-gray-200 rounded">
          <div
            className="h-4 bg-indigo-600 rounded"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Progress: {completedTime} / {totalTime} minutes completed
        </p>
      </div>

      {/* Congrats Message */}
      {allTasksCompleted && (
        <div className="my-6 p-6 bg-green-100 border border-green-300 rounded-lg text-center shadow-lg">
          <h2 className="text-2xl font-bold text-green-700 mb-2">
            🎉 Congratulations! 🎉
          </h2>
          <p className="text-lg text-green-600">
            You’ve completed all your tasks! Keep up the great work! 💪
          </p>
        </div>
      )}

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 border rounded bg-white shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div>
              <h3 className="font-semibold text-lg">{task.name}</h3>
              <p className="text-sm text-gray-600">
                Remaining: {task.remainingTime} min / {task.estimatedTime} min
              </p>
              <p className="text-sm">Status: {task.status}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateTaskStatus(task.id, "In Progress")}
                className="px-3 py-1 bg-yellow-500 text-white rounded"
              >
                Start
              </button>
              <button
                onClick={() => updateTaskStatus(task.id, "Completed")}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Complete
              </button>
              <button
                onClick={() => borrowTime(task.id, 5)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                +5 min
              </button>
              <button
                onClick={() => borrowTime(task.id, -5)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                -5 min
              </button>
              <button
                onClick={() => removeTask(task.id)}
                className="px-3 py-1 bg-gray-600 text-white rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}