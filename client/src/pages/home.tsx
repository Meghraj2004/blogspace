import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { getPosts } from "@/lib/storage";
import PostCard from "@/components/post-card";
import { PenSquare } from "lucide-react";

export default function Home() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts
  });

  if (isLoading) {
    return <div className="p-8">Loading posts...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[400px] bg-black">
        <img 
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
          alt="Blog hero"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Welcome to My Blog
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto px-4">
              Share your thoughts and ideas with the world
            </p>
            <Link href="/post/new">
              <Button size="lg" className="gap-2">
                <PenSquare className="h-5 w-5" />
                Write a Post
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {!posts?.length && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-2">No posts yet</h2>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first blog post
            </p>
            <Link href="/post/new">
              <Button>Create Post</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}