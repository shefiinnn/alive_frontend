import {useState} from "react";
import { HashLink } from "react-router-hash-link";
import { Menu, ShoppingCart, Search } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function AppNavbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", to: "/" },
    { name: "Gallery", to: "/#gallery" },
    { name: "Products", to: "/products" },
    { name: "Contact Us", to: "/#contact" },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="rounded-full shadow-lg bg-white px-3 py-1 w-full max-w-5xl h-16 items-center">
        <div className="flex items-center justify-between">
          <HashLink to="/" className="flex items-center gap-2 pl-1 py- mb-5">
            <img src="/alive-logo.png" alt="ALIVE Logo" className="h-15 w-15 object-contain" />
          </HashLink>
          <div className="hidden md:flex items-center gap-1 mb-5">
            <NavigationMenu>
              <NavigationMenuList>
                {links.map((link) => (
                  <NavigationMenuItem key={link.to}>
                    <HashLink
                      to={link.to}
                      smooth
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent"
                      )}
                    >
                      {link.name}
                    </HashLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <HashLink
              to="/cart"
              className="rounded-md p-2 hover:bg-accent text-foreground"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
            </HashLink>
            <button
              type="button"
              className="rounded-md p-2 hover:bg-accent text-foreground"
              aria-label="Search"
            >
              <Search className="h-5 w-5 bg-white" />
            </button>
          </div>
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen} >
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-md">
                  <Menu className="h-5 w-5 mb-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="top"
                className="bg-white rounded-b-xl shadow-lg max-h-[100vh] overflow-y-auto border-t border-gray-500"
              >
                <SheetHeader>
                  <SheetTitle className="flex mb-2">
                    <HashLink to="/" className="flex items-center gap-2">
                      <img src="/alive-logo.png" alt="ALIVE Logo" className="h-16 w-16 object-contain" />
                    </HashLink>
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-2 space-y-2 px-4">
                  {links.map((link) => (
                    <HashLink
                      key={link.to}
                      to={link.to}
                      smooth
                      className="block rounded-md px-4 py-3 text-lg text-gray-900 font-medium hover:bg-gray-100 transition"
                      onClick={() => setOpen(false)}
                    >
                      {link.name}
                    </HashLink>
                  ))}
                  <div className="mt-3 flex items-center gap-2 border-t pt-3">
                    <HashLink
                      to="/cart"
                      className="rounded-md hover:bg-accent"
                      onClick={() => setOpen(false)}
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </HashLink>
                    <button
                      type="button"
                      aria-label="Search"
                      onClick={() => setOpen(false)}
                    >
                      <Search className="h-5 w-5" />
                    </button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </div>
  );
}
