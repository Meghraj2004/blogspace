import { useParams, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { insertPostSchema } from "@shared/schema";
import type { InsertPost } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Editor from "@/components/editor";
import { getPost, createPost, updatePost } from "@/lib/storage";

const DEFAULT_THUMBNAILS = [
  "https://images.unsplash.com/photo-1455849318743-b2233052fcff",
  "https://images.unsplash.com/photo-1496449903678-68ddcb189a24",
  "https://images.unsplash.com/photo-1434030216411-0b793f4b4173"
];

export default function Edit() {
  const { id } = useParams();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: post, isLoading } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id!),
    enabled: !!id
  });

  const form = useForm<InsertPost>({
    resolver: zodResolver(insertPostSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      excerpt: post?.excerpt || "",
      thumbnail: post?.thumbnail || DEFAULT_THUMBNAILS[0]
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertPost) => {
      if (id) {
        return await updatePost(id, data);
      }
      return await createPost(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast({
        title: id ? "Post updated" : "Post created",
        description: id ? "Your post has been updated" : "Your post has been published"
      });
      navigate("/");
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again."
      });
    }
  });

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {id ? "Edit Post" : "Create New Post"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="excerpt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Excerpt</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief description of your post"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Thumbnail</FormLabel>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {DEFAULT_THUMBNAILS.map((url) => (
                    <div
                      key={url}
                      className={`cursor-pointer border-2 rounded-md overflow-hidden ${
                        field.value === url ? 'border-primary' : 'border-transparent'
                      }`}
                      onClick={() => field.onChange(url)}
                    >
                      <img src={url} alt="thumbnail option" className="w-full h-32 object-cover" />
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Editor content={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <Button type="submit" disabled={mutation.isPending}>
              {id ? "Update Post" : "Publish Post"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}