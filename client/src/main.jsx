import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router'
import HomePage from './routes/homepage/HomePage.jsx'
import DashBoard from './routes/dashboard/DashBoard.jsx'
import Rootlayout from './layouts/Rootlayout.jsx'
import DashBoardLayout from './layouts/DashboardLayout/DashboardLayout.jsx'
import ChatPage from './routes/chatpage/ChatPage.jsx'
import SignInPage from './routes/signinpage/SignInPage.jsx'
import SignUpPage from './routes/signuppage/SignUpPage.jsx'
import Example from './components/Pricing.jsx'





const router = createBrowserRouter([{
  path:"/pricing",
  element: <Example/>,
},{

  element: <Rootlayout />,
  children: [
    {
    path: "/",
    element: <HomePage />,
  },
    {
    path: "/sign-up/*",
    element: <SignUpPage />,
  },
    {
    path: "/sign-in/*",
    element: <SignInPage />,
  },
    {
    path: "/pricing/*",
    element: <Example />,
  },
  {
    
    element: <DashBoardLayout />,
    children:[{
      path:"/dashboard",
      element: <DashBoard/>,
    },
  {
    path:"/dashboard/chats/:id",
      element: <ChatPage/>,
  }]
  }]}
])

ReactDOM.createRoot(document.getElementById('root')).render(
 

    <RouterProvider router={router} />

 
)
