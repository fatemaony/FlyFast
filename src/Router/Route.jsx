import {
  createBrowserRouter,
} from "react-router";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import SeconderyLayout from "../Layout/SeconderyLayout";
import SignIn from "../Pages/SignIn";

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
  {
    path:"/",
    Component:SeconderyLayout,
    children:[
      {
        path:"signin",
        Component:SignIn,
      }
    ]
  }
]);
export default router;