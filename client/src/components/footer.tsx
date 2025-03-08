import { Link } from "wouter";
import { Github, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">
                BlogSpace
              </h2>
              <p className="mt-4 text-muted-foreground">
                A platform for sharing your thoughts and ideas with the world.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                      Home
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/auth">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                      Sign In
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/post/new">
                    <span className="text-muted-foreground hover:text-foreground cursor-pointer">
                      Write a Post
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/meghraj2004"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/megharaj_2004/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/megharaj-dandgavhal-832683259/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} BlogSpace. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
