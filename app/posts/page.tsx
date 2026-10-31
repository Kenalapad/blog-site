import { Suspense } from "react";
import Link from "next/link";

type PostItem = {
  id: number;
  title: string;
};

async function PostList() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status}`);
  }

  const posts: PostItem[] = await response.json();

  return (
    <ul className="space-y-3">
      {posts.slice(0, 5).map((post) => (
        <li key={post.id}>
          <Link
            href={`/posts/${post.id}`}
            className="text-lg font-semibold text-zinc-950 hover:text-2xl"
          >
            {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function PostsPage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-center text-4xl font-semibold text-zinc-950 sm:text-5xl">
          Posts
        </h1>
        <Suspense fallback={<p>Loading posts...</p>}>
          <PostList />
        </Suspense>
      </section>
    </div>
  );
}
