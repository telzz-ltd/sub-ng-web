import { ButtonLink } from "@/components/ui/link";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu09Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
    component: PublicLayout,
});

const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
];

function PublicLayout() {
    return (
        <Sheet>
            <div className="min-h-svh bg-white">
                <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white">
                    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
                        <Link to="/" className="flex shrink-0 items-center">
                            <img
                                src="/logo.png"
                                width={112}
                                height={38}
                                alt="Subs.NG"
                                className="h-9 w-auto object-contain"
                            />
                        </Link>

                        <nav className="hidden items-center gap-6 md:flex">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-sm font-medium text-neutral-600 transition-colors hover:text-emerald-600"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>

                        <div className="flex items-center gap-2">
                            <ButtonLink variant="ghost" to="/login" className="font-medium">
                                Sign in
                            </ButtonLink>
                            <ButtonLink to="/register" className="hidden sm:inline-flex font-medium">
                                Get Started
                            </ButtonLink>
                            <SheetTrigger className="md:hidden">
                                <HugeiconsIcon icon={Menu09Icon} size={28} />
                            </SheetTrigger>
                        </div>
                    </div>
                </header>

                <SheetContent className="max-w-70">
                    <SheetHeader>
                        <SheetTitle>
                            <img src="/logo.png" width={104} height={34} alt="Subs.NG" className="h-8 w-auto object-contain" />
                        </SheetTitle>
                        <SheetDescription></SheetDescription>
                    </SheetHeader>
                    <div className="px-4">
                        <div className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-emerald-600"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="mt-6 flex flex-col gap-2">
                            {/* <div className="mb-2 items-center justify-between">
                                <p className="font-bold">Appearance</p>
                                <p>Theme Toggle</p>
                            </div> */}
                            <ButtonLink className="w-full" variant="outline" size="lg" to="/login"> Sign in </ButtonLink>
                            <ButtonLink to="/register" className="w-full" size="lg"> Create account </ButtonLink>
                        </div>
                    </div>
                </SheetContent>

                <main>
                    <Outlet />
                </main>

                <footer className="border-t border-gray-100 bg-gray-50">
                    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
                        <div>
                            <img
                                src="/logo.png"
                                width={112}
                                height={38}
                                alt="Subs.NG"
                                className="h-9 w-auto object-contain"
                            />
                            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
                                The simple way to pay for airtime, data, bills and subscriptions
                                in Nigeria.
                            </p>
                        </div>

                        {[
                            {
                                title: "Services",
                                links: ["Airtime", "Data bundles", "Cable TV", "Electricity"],
                            },
                            {
                                title: "Company",
                                links: ["About us", "Contact", "Careers", "Blog"],
                            },
                            {
                                title: "Support",
                                links: ["Help center", "FAQs", "Terms", "Privacy"],
                            },
                        ].map((group) => (
                            <div key={group.title}>
                                <p className="text-sm font-bold">
                                    {group.title}
                                </p>
                                <ul className="mt-3 space-y-2">
                                    {group.links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="text-sm text-gray-500 transition-colors hover:text-blue-600"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-200">
                        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-gray-500 sm:flex-row sm:px-6">
                            <span>© {new Date().getFullYear()} Subs.NG. All rights reserved.</span>
                            <span>Built for everyday payments in Nigeria.</span>
                        </div>
                    </div>
                </footer>
            </div>
        </Sheet>
    );
}
