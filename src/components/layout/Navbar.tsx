import NotificationMenu from "@/components/notification-menu";
import UserMenu from "@/components/user-menu";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Logo from "@/assets/icons/Logo";
import { ModeToggler } from "./ModeToggler";
import { Link } from "react-router";
import {
  authApi,
  useLogoutMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth.api";
import { useDispatch } from "react-redux";
import { role } from "@/constants/role";
const navigationLinks = [
  { href: "/", label: "Home", role: "PUBLIC" },
  { href: "/requestRide", label: "Ride", role: role.rider },
  { href: "/about", label: "About Us", role: "PUBLIC" },
  { href: "/features", label: "Features", role: "PUBLIC" },
  { href: "/contact", label: "Contact", role: "PUBLIC" },
  { href: "/faq", label: "FAQ", role: "PUBLIC" },
  { href: "/admin", label: "Dashboard", role: role.admin },
  { href: "/driver", label: "Dashboard", role: role.driver },
  { href: "/rider", label: "Dashboard", role: role.rider },
];

export default function Navbar() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    logout(undefined);
    dispatch(authApi.util.resetApiState());
  };
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Link to="/" className="group size-8 md:hidden">
                <Logo />
              </Link>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => {
                    const userRole = data?.data?.user?.role;
                    if (link.role === "PUBLIC" || link.role === userRole) {
                      return (
                        <NavigationMenuItem key={index} className="w-full">
                          <NavigationMenuLink asChild className="py-1.5">
                            <Link to={link.href}>{link.label}</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      );
                    }
                    return null;
                  })}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-primary hover:text-primary/90">
              <Logo />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => {
                  const userRole = data?.data?.user?.role;
                  if (link.role === "PUBLIC" || link.role === userRole) {
                    return (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          asChild
                          className="py-1.5 font-medium text-muted-foreground hover:text-primary"
                        >
                          <Link to={link.href}>{link.label}</Link>
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    );
                  }
                  return null;
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ModeToggler />
            {/* Notification */}
            {data?.data?.user?.email && <NotificationMenu />}
          </div>
          {/* User menu */}

          {data?.data?.user?.email && <UserMenu />}
          {!data?.data?.user?.email && (
            <Button asChild size="sm" className="text-sm">
              <Link to="/login">Login</Link>
            </Button>
          )}
          {data?.data?.user?.email && (
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="text-sm"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
