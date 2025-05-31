import { createBrowserRouter } from "react-router-dom";
import ErrorsPage from "../pages/Errors/ErrorsPage";
import UsersPage from "../pages/Users/UsersPage";
import TasksPage from "../pages/Tasks/TasksPage";
import LabelsPage from "../pages/Labels/LabelsPage";
import TaskLabelsPage from "../pages/TaskLabels/TaskLabelsPage";
import Header from "../components/Header/Header";

export const router = createBrowserRouter([
    {
      path:'/',
      element: <Header />,
      errorElement: <ErrorsPage />,
      children: [
        {
          path: "/",
          element: <></>
        },
        {
          path: "/users",
          element: <UsersPage />
        },
        {
          path: "/tasks",
          element: <TasksPage />
        },
        {
          path: "/labels",
          element: <LabelsPage />
        },
        {
          path: "/task-labels",
          element: <TaskLabelsPage />
        }
      ]
    }
])