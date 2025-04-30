"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, User, Calculator, Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 md:flex">
          <Link href="/" className="flex items-center space-x-2">
            <Calculator className="h-6 w-6" />
            <span className="font-bold">Aýlyk Hasaplaýjysy</span>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-4">
                <Link href="/dashboard" className={pathname === "/dashboard" ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"}>
                  Paneller
                </Link>
                <Link href="/calculate" className={pathname === "/calculate" ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"}>
                  Hasapla
                </Link>
              </div>
              
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full h-8 w-8"
                    >
                      <User className="h-4 w-4" />
                      <span className="sr-only">Ulanyjy menýusyny üýtgetmek</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem disabled>
                      <span className="font-medium">{user.firstName} {user.lastName}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      <span className="text-sm text-muted-foreground capitalize">{user.role}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => logout()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Ulgamdan çykmak</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full h-8 w-8"
                    >
                      {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      <span className="sr-only">Tema üýtgetmek</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Açyk</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Ýapyk</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full h-8 w-8 md:hidden"
                    >
                      <Menu className="h-4 w-4" />
                      <span className="sr-only">Menýuny üýtgetmek</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right">
                    <div className="flex flex-col gap-4 mt-8">
                      <Link
                        href="/dashboard"
                        className="text-lg font-medium"
                      >
                        Panell
                      </Link>
                      <Link
                        href="/calculate"
                        className="text-lg font-medium"
                      >
                        Hasapla
                      </Link>
                      <Button
                        variant="outline"
                        className="justify-start"
                        onClick={() => logout()}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Ulgamdan Çykmak
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full h-8 w-8"
                  >
                    {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    <span className="sr-only">Tema üýtgetmek</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Açyk</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Moon className="mr-2 h-4 w-4" />
                    <span>Ýapyk</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link href="/login">
                <Button variant="outline" size="sm">
                 Ulgama girmek
                </Button>
              </Link>
              
              <Link href="/register">
                <Button size="sm">Giriş etmek</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}