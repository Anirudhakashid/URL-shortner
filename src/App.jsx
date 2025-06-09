import { useState } from "react";
import "./App.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import AppLayout from "./Layout/App-layout";
import {
  Authentication,
  Dashboard,
  LandingPage,
  Link,
  RedirectedLink,
} from "./pages/index";
import UrlProvider from "./Context";
import RequireAuth from "./Components/RequireAuth";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<AppLayout />}>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route path="/auth" element={<Authentication />} />
      <Route
        path="/link/:id"
        element={
          <RequireAuth>
            <Link />
          </RequireAuth>
        }
      />
      <Route path="/:id" element={<RedirectedLink />} />
    </Route>
  )
);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <UrlProvider>
        <RouterProvider router={router} />
      </UrlProvider>
    </>
  );
}

export default App;
