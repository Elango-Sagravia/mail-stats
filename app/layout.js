"use client";

import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import {
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeProvider } from "@/components/theme-provider";
import { Input } from "@/components/ui/input";
import ModeToggle from "@/components/mode-toggle";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const routes = [
  { path: "/", name: "Dashboard", icon: <Home className="h-4 w-4" /> },
  {
    path: "/campaigns",
    name: "Campaigns",
    icon: <LineChart className="h-4 w-4" />,
  },
];

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
              <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold"
                  >
                    <Package2 className="h-6 w-6" />
                    <span className="">Sagravia</span>
                  </Link>
                </div>
                <div className="flex-1">
                  <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                    {routes.map((route) => (
                      <Link
                        key={route.path}
                        href={route.path}
                        className={`flex items-center gap-3 rounded-lg  px-3 py-2   transition-all hover:text-primary ${
                          pathname === route.path && "text-primary bg-muted"
                        }`}
                      >
                        {" "}
                        {route.icon}
                        {route.name}
                      </Link>
                    ))}

                    {/* <Link
                      href="#"
                      className="flex items-center gap-3 rounded-lg  px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <Package className="h-4 w-4" />
                      Products{" "}
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <Users className="h-4 w-4" />
                      Customers
                    </Link>
                    <Link
                      href="#"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <LineChart className="h-4 w-4" />
                      Analytics
                    </Link> */}
                  </nav>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="shrink-0 md:hidden"
                    >
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="flex flex-col">
                    <nav className="grid gap-2 text-lg font-medium">
                      <Link
                        href="/"
                        className="flex items-center gap-2 text-lg font-semibold"
                      >
                        <Package2 className="h-6 w-6" />
                        <span className="sr-only">Sagravia</span>
                      </Link>
                      {routes.map((route) => (
                        <Link
                          key={route.path}
                          href={route.path}
                          className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground ${
                            pathname === route.path && "bg-muted "
                          }`}
                        >
                          {" "}
                          {route.icon}
                          {route.name}
                        </Link>
                      ))}
                      {/* <Link
                        href="/"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                      >
                        <Home className="h-5 w-5" />
                        Dashboard
                      </Link>
                      <Link
                        href="/campaigns"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        Campaigns
                      </Link> */}
                    </nav>
                  </SheetContent>
                </Sheet>
                <div className="w-full flex-1">{/* <ModeToggle /> */}</div>
              </header>
              <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
