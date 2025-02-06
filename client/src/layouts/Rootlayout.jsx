import "./rootlayout.css"
import { Link, Outlet } from "react-router"
import logo from "/ywlogo.png"
import { ClerkProvider } from "@clerk/clerk-react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'
  const queryClient = new QueryClient()


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}


export default function Rootlayout() {
      
    return (

        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            <QueryClientProvider client={queryClient}>



            <div className="rootlayout">
                <nav>
                    <Link to="/" className="navbar mb-1 items-center">
                        <img className="h-10 w-25 " src="/ywlogo.png" />
                       
                    </Link>
                    <div className="nav size-10 scale-120">
     
                        <SignedIn>
                            <UserButton />
                        </SignedIn></div>
                        
                </nav>
                <main>
                    <Outlet />
                </main>
            </div >
            </QueryClientProvider>
        </ClerkProvider>

    )
}



