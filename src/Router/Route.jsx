import {
  createBrowserRouter,
} from "react-router";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component:Layout,
    children:[
      {
        index:true,
        Component:Home
      }
    ]
  },
]);
export default router;