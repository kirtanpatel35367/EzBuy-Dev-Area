import React, { useEffect, useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, User, LogOut, LayoutDashboard, UserCircle, Search, Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { UserLogout } from "../../store/auth-slice/index";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";
import Logo from "@/assets/logo";

const MenuItems = ({ orientation = "horizontal" }) => {
  const location = useLocation();

  return (
    <nav className={`flex ${orientation === "horizontal" ? "flex-row items-center gap-8" : "flex-col gap-6"}`}>
      {shoppingViewHeaderMenuItems.map((menuItem) => {
        const isActive = location.pathname === menuItem.path;
        return (
          <Link
            className={`text-sm font-semibold tracking-wide transition-all duration-300 relative group overflow-hidden ${
              isActive ? "text-primary" : "text-white/70 hover:text-white"
            }`}
            key={menuItem.id}
            to={menuItem.path}
          >
            {menuItem.label}
            <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-primary transition-transform duration-300 origin-left ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}></span>
          </Link>
        );
      })}
    </nav>
  );
};

const HeaderRightContent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shoppingcart);
  const navigate = useNavigate();
  const [openCartsheet, setOpenCartSheet] = useState(false);

  const handleLogout = () => {
    dispatch(UserLogout());
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="flex items-center gap-6">
      <button className="text-white/70 hover:text-white transition-colors">
        <Search size={20} />
      </button>

      <Sheet open={openCartsheet} onOpenChange={setOpenCartSheet}>
        <button
          className="relative text-white/70 hover:text-white transition-colors group"
          onClick={() => setOpenCartSheet(true)}
        >
          <ShoppingCart size={22} />
          {cartItems.items?.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(204,255,0,0.5)]">
              {cartItems.items?.length}
            </span>
          )}
        </button>
        <UserCartItemWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={cartItems?.items?.length > 0 ? cartItems.items : []}
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2 outline-none group">
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 transition-colors">
              <User size={18} className="text-white/70 group-hover:text-primary transition-colors" />
            </div>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="end"
          sideOffset={15}
          className="w-56 glass border-white/10 text-white p-2"
        >
          <div className="px-2 py-3">
            <p className="text-sm font-bold text-white mb-0.5">{user?.username}</p>
            <p className="text-[10px] text-white/50 uppercase tracking-widest">{user?.email}</p>
          </div>
          <DropdownMenuSeparator className="bg-white/5" />
          <DropdownMenuItem
            onClick={() => navigate("/shop/useraccount")}
            className="flex gap-3 py-2.5 px-3 cursor-pointer hover:bg-white/5 focus:bg-white/5 transition-colors rounded-md group"
          >
            <UserCircle size={18} className="text-white/50 group-hover:text-primary transition-colors" />
            <span className="text-sm">Account Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex gap-3 py-2.5 px-3 cursor-pointer hover:bg-red-500/10 focus:bg-red-500/10 transition-colors rounded-md group"
          >
            <LogOut size={18} className="text-white/50 group-hover:text-red-500 transition-colors" />
            <span className="text-sm group-hover:text-red-500 transition-colors">Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthanticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? "py-4 glass border-b shadow-2xl" : "py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/shop/home" className="flex items-center relative z-10">
          <Logo />
        </Link>

        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
          <MenuItems />
        </div>

        <div className="flex items-center gap-4">
          {isAuthanticated && (
            <div className="hidden lg:block">
              <HeaderRightContent />
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-white hover:bg-white/5"
              >
                <Menu size={24} />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="glass border-white/10 text-white w-[300px]">
              <SheetHeader className="text-left mb-8">
                <SheetTitle className="text-white">Menu</SheetTitle>
              </SheetHeader>
              <div className="space-y-8">
                <MenuItems orientation="vertical" />
                <div className="pt-8 border-t border-white/10">
                  <HeaderRightContent />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
