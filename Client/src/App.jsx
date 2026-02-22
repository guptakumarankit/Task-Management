import { AuthProvider } from "./contextApi/AuthContext";
import { TaskProvider } from "./contextApi/TaskContext";
import AppRoutes from "./Routes/AppRoutes";

const App = () => {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppRoutes />
      </TaskProvider>
    </AuthProvider>
  );
};

export default App;
