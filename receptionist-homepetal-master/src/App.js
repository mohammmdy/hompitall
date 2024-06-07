
import './App.css';
import { createBrowserRouter } from "react-router-dom";
import {RouterProvider} from "react-router-dom";
import Receptionist from './components/Receptionist/Receptionist';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import UpdateResp from './components/Receptionist/UpdateResp';
function App() {
  let routers=createBrowserRouter([{
    path:'/',element:<Layout/>,children:[
      {path:'',element:<Receptionist/>},
      {path:'update',element:<UpdateResp/>},
      
    ]

  }])
  return (
    <div>
       <RouterProvider router={routers}></RouterProvider>
      <Toaster />
    </div>
  );
}

export default App;
