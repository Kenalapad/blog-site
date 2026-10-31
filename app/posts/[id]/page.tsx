import { Suspense } from "react";
import { notFound } from "next/navigation";

type PostItem = {
  id: number;
  title: string;
  body: string;
};

async function PostDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const postId = Number(id);
  if (!Number.isInteger(postId) || postId < 1) {
    notFound();
  }

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { cache: "no-store" },
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.status}`);
  }

  const post: PostItem = await response.json();
  if (!post.id) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <div className="space-y-4">
        <h1 className="text-center text-4xl font-semibold text-zinc-950 sm:text-5xl">
          {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
        </h1>
        <p className="text-lg leading-8 text-zinc-800">{post.body}</p>
      </div>
    </article>
  );
}

export default function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p>Loading post...</p>}>
      <PostDetails params={params} />
    </Suspense>
  );
}
