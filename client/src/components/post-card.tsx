import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "wouter";
import { Post } from "@shared/schema";
import { format } from "date-fns";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden">
      <img 
        src={post.thumbnail} 
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <CardContent className="pt-6">
        <Link href={`/post/${post.id}`}>
          <h2 className="text-2xl font-bold hover:text-primary cursor-pointer">
            {post.title}
          </h2>
        </Link>
        <p className="text-sm text-muted-foreground mt-2">
          {format(post.createdAt, 'MMMM d, yyyy')}
        </p>
        <p className="mt-2 text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/post/${post.id}`}>
          <span className="text-sm font-medium text-primary hover:underline cursor-pointer">
            Read more →
          </span>
        </Link>
      </CardFooter>
    </Card>
  );
}
