import { getUSer } from "@/lib/auth-server";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import React, { Suspense } from "react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { LogOut } from "lucide-react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Header = () => {
  return (
    <header className="flex items-center gaop-4 px-4 py-2 border-b max-w-md mx-auto border-x">
      <Link href="/">App</Link>
      <div className="flex-1"></div>
      <Suspense fallback={<Skeleton className="w-24 h-8" />}>
        {/* AuthButton will fetch the user data and render accordingly */}
        <AuthButton />
      </Suspense>
    </header>
  );
};

export default Header;

export const AuthButton = async () => {
  const user = await getUSer();

  if (!user) {
    return (
      <Link href="/auth/signin" className="text-sm text-blue-500">
        Sign in
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Avatar className="size-6">
            <AvatarFallback>{user.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <p>{user?.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <form>
            <Button
              className="flex items-center gap-2 w-full"
              formAction={async () => {
                "use server";
                // Implement logout logic here
                // For example, clear the session or token
                await auth.api.signOut({
                  headers: await headers(),
                });
                redirect("/auth/signin");
              }}
            >
              <LogOut className="size-6 mr-2" />
              Logout
            </Button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
