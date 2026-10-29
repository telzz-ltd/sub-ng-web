import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="grid md:grid-cols-2 min-h-screen bg-gray-50">
      <div className="bg-blue-900 hidden md:block"></div>
      <div className="flex flex-col items-center justify-center gap-8 px-4">
        <div className="">
          <img src={"/logo.png"} width={200} height={100} alt="Subs.NG" />
        </div>
        <div className="w-full max-w-100">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
