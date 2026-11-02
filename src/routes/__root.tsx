import { Outlet, createRootRoute } from '@tanstack/react-router'

import { TanStackDevtools } from '@tanstack/react-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import { Button } from '@/components/ui/button'
import { ButtonLink } from '@/components/ui/link'
import { Toaster } from '@/components/ui/toast'
import { Alert02Icon, Home01Icon, RefreshIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../styles.css'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
})

function NotFoundComponent() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
      <div className="space-y-6">
        <div>
          <p className="text-6xl font-bold text-emerald-600 sm:text-7xl">404</p>
          <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">Page not found</h1>
          <p className="mt-2 text-neutral-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        <ButtonLink to="/">
          <HugeiconsIcon icon={Home01Icon} />
          Back to home
        </ButtonLink>
      </div>
    </div>
  )
}

function ErrorComponent({ error, reset }: { error: unknown; reset: () => void }) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-6">
        <div>
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-50 text-red-600">
            <HugeiconsIcon icon={Alert02Icon} size={32} />
          </div>
          <h1 className="mt-4 text-2xl font-semibold sm:text-3xl">Something went wrong</h1>
          <p className="mt-2 text-neutral-600">
            We couldn't load this page. Please try again.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button onClick={reset}>
            <HugeiconsIcon icon={RefreshIcon} />
            Try again
          </Button>
          <ButtonLink to="/" variant="outline">
            <HugeiconsIcon icon={Home01Icon} />
            Back to home
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

const queryClient = new QueryClient();

function RootComponent() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
      <Toaster />
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  )
}
