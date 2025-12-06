import React, { useEffect, useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { shoppingViewHeaderMenuItems } from "@/config";
import { HiOutlineShoppingCart } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { UserLogout } from "../../store/auth-slice/index";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import UserCartItemWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";
import Logo from "@/assets/logo";

const MenuItems = () => {
  const location = useLocation();

  return (
    <nav className="flex flex-col lg:flex-row lg:gap-5 gap-2 mb-3 lg:mb-0 lg:items-center">
      {shoppingViewHeaderMenuItems.map((menuItem) => {
        const isActive = location.pathname === menuItem.path;
        return (
          <Link
            className={`text-sm transition-colors duration-200 font-bold ${
              isActive ? "text-black" : "text-[#937c6c] hover:text-[#682c0d]"
            }`}
            key={menuItem.id}
            to={menuItem.path}
          >
            {menuItem.label}
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
      console.log(user.id, "User id from Fetch Cart Items");
      dispatch(fetchCartItems(user.id));
    }
  }, [dispatch, user?.id]); // Keep user?.id dependency but ensure it only refetches when userId actually changes

  return (
    <div className="flex md:text-slate-800  lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartsheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          className="bg-[#f4ddbe] hover:bg-[#f4ddbe]"
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
        >
          <div className="relative">
            <div className="absolute w-4 h-4 bg-red-600 rounded-full -top-3 left-2.5 items-center flex justify-center text-white">
              {cartItems.items?.length}
            </div>
            <HiOutlineShoppingCart className="w-6 h-6" />
          </div>
          <span className="sr-only">User Cart</span>
        </Button>
        <UserCartItemWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems?.items?.length > 0 ? cartItems.items : []
          }
        />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <FaUserCircle className="text-[#f4ddbe] w-6 h-6 hidden lg:block" />
            <span className="text-[#682c0d] hidden lg:block">
              {user?.username}
            </span>
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          side="bottom"
          align="end"
          sideOffset={15}
          className="w-40 gap-4"
        >
          <DropdownMenuItem
            onClick={() => navigate("/shop/useraccount")}
            className="hover:bg-[#682c0d] cursor-pointer hover:text-white rounded-md"
          >
            <div>
              <span className="flex gap-2">
                <CgProfile className="flex w-5 h-5" />
                Your Space
              </span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleLogout}
            className="cursor-pointer w-30 hover:bg-[#682c0d] rounded-md hover:text-white"
          >
            <span className="flex gap-2">
              <IoMdLogOut className="flex w-5 h-5" />
              Logout
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

const ShoppingHeader = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { isAuthanticated } = useSelector((state) => state.auth);

  const handleToggleSheet = () => {
    setIsSheetOpen((prev) => !prev);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-[#f1ebe7]">
        <div className="flex h-20 items-center justify-between px-4 md:px-6">
          <Link to="/shop/home" className="flex items-center">
            <Logo />
          </Link>

          <div className="hidden lg:flex flex-1 justify-center text-white font-HeadFont">
            <MenuItems />
          </div>
          {isAuthanticated ? (
            <div className="hidden lg:block">
              {" "}
              <HeaderRightContent />
            </div>
          ) : null}

          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="flex justify-center lg:hidden sm:block items-center"
                onClick={handleToggleSheet}
              >
                <TiThMenu className="h-6 w-6" />
                <span className="sr-only">Toggle Header Menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div>
                <MenuItems />
                <HeaderRightContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
};

export default ShoppingHeader;
