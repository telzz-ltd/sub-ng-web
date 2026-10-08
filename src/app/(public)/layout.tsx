import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function PublicLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto h-16 flex items-center justify-between px-3 md:px-0">
          <div className="">
            <Link href="/" className="text-2xl font-bold text-primary">
              Subs.NG
            </Link>
          </div>
          <div className=""></div>
          <div className="space-x-2">
            <Link href="/login">
              <Button
                variant="outline"
                className="border-primary border-2 text-primary"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/register" className="hidden md:inline">
              <Button>Create Account</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
