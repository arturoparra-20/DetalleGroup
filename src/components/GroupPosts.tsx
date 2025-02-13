import React, { useState } from "react";
import PostCard from "./PostCard";
import PostForm from "./CreatePostForm";

interface Post {
  id: number;
  author: string;
  content?: string;
  videoUrl?: string;
}

interface GroupPostsProps {
  initialPosts: Post[];
}

const GroupPosts: React.FC<GroupPostsProps> = ({ initialPosts }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleAddPost = (newPost: Omit<Post, "id">) => {
    const newPostWithId: Post = { id: posts.length + 1, ...newPost };
    setPosts([newPostWithId, ...posts]);
  };

  

  return (
    <>
    <div className=" text-gray-800 text-3xl font-bold mb-6">Publicaciones del Grupo</div>

    <div className="w-full">
      <PostForm onAddPost={handleAddPost} />
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
    </>
  );
};

export default GroupPosts;
