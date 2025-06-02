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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<AppLayout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/auth" element={<Authentication />} />
      <Route path="/link/:id" element={<Link />} />
      <Route path="/:id" element={<RedirectedLink />} />
    </Route>
  )
);

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
