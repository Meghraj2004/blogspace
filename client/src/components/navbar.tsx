import { Link } from "wouter";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PenSquare, LogOut, User } from "lucide-react";

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text cursor-pointer">
              BlogSpace
            </h1>
          </Link>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/post/new">
                  <Button variant="outline" size="sm" className="gap-2">
                    <PenSquare className="h-4 w-4" />
                    Write
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL || undefined} />
                      <AvatarFallback>
                        {user.displayName?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2">
                      <User className="h-4 w-4" />
                      <span>{user.displayName || user.email}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2" onClick={() => signOut()}>
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/auth">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
