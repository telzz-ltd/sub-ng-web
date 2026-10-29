import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { Button } from "@heroui/react";

export const Route = createFileRoute('/_public')({
  component: RouteComponent,
})

function RouteComponent() {
  return(
    <div>
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between px-3 md:px-0">
          <div className="">
            <Link to="/" className="text-2xl font-bold text-primary">
              Subs.NG
            </Link>
          </div>
          <div className=""></div>
          <div className="space-x-2">
            <Link to="/login">
              <Button
                variant="outline"
                className="border-primary border-2 text-primary"
              >
                Sign In
              </Button>
            </Link>
            <Link to="/register" className="hidden md:inline">
              <Button>Create Account</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className=""><Outlet /></div>
    </div>
  )
}
