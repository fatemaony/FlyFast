import {
  createBrowserRouter,
} from "react-router";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import SeconderyLayout from "../Layout/SeconderyLayout";
import SignIn from "../Pages/SignIn";
import SignUp from "../Pages/SignUp";
import Forgotpass from "../Pages/ForgotPassword/Forgotpass";
import ResetCode from "../Pages/ForgotPassword/ResetCode";
import ResetPass from "../Pages/ForgotPassword/ResetPass";
import Coverage from "../Pages/Coverage";
import Rider from "../Pages/Rider";
import About from "../Pages/About";
import AddParcel from "../Pages/Parcel/AddParcel";
import PrivateRoute from "../Hook/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component:Layout,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path: "/coverage",
        Component: Coverage,
        loader: async () => {
          try {
            const response = await fetch("./warehouses.json");
            if (!response.ok) {
              throw new Error("Failed to fetch warehouse data");
            }
            const data = await response.json();
            return data;
          } catch (error) {
            console.error("Error loading warehouse data:", error);
            return []; // Return empty array as fallback
          }
        }
      },
      {
        path:"rider",
        Component:Rider,
        loader:()=>fetch("./warehouses.json")

      },
      {
        path:"about",
        Component:About
      },
      {
        path:"parcel",
       element:
       <PrivateRoute>
          <AddParcel/>
       </PrivateRoute>,
       loader:()=>fetch("./warehouses.json")
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
      },
      {
        path:"signup",
        Component:SignUp
      },
      {
        path:"forgotPass",
        Component:Forgotpass
      },
      {
        path:"code",
        Component:ResetCode
      },
      {
        path:"resetPass",
        Component:ResetPass
      }
    ]
  }
]);
export default router;