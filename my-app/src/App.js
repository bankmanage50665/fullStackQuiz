import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import "./index.css";
import RootLayout from "./shared/navigation/RootLayout";
import SignupForm, { action as signupAction } from "./shared/component/Signup";
import LoginForm, { action as loginAction } from "./shared/component/Login";
import EditQuiz, {
  loader as editQuizLoader,
} from "./components/Admin/EditQuiz";

import ErrorHandler from "./shared/component/Error";

//Quiz app
import AdminPage from "./components/Admin/AddQuiz";
import QuestionsList, {
  loader as questionListLoader,
} from "./components/Questions/QuestionList";

const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <ErrorHandler />,
    children: [
      { index: true, element: <QuestionsList />, loader: questionListLoader },
      { path: "admin", element: <AdminPage /> },

      { path: "signup", element: <SignupForm />, action: signupAction },
      { path: "login", element: <LoginForm />, action: loginAction },
      {
        path: ":id",
        children: [
          { path: "edit", element: <EditQuiz />, loader: editQuizLoader },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
