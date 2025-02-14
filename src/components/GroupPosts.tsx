import React, { useState } from "react";
import PostCard from "./PostCard";
import PostForm from "./CreatePostForm";

const GroupPosts: React.FC<GroupPostsProps> = ({ initialPosts, isMember }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const handleAddPost = (newPost: Omit<Post, "id">) => {
    const newPostWithId: Post = { id: posts.length + 1, ...newPost };
    setPosts([newPostWithId, ...posts]);
  };

  return (
    <>
      <div className="text-gray-800 text-3xl font-bold mb-6">
        Publicaciones del Grupo
      </div>

      <div className="w-full">
        {isMember ? (
          <PostForm onAddPost={handleAddPost} />
        ) : (
          <h3 className="text-gray-600 font-bold mb-9">Únete al grupo para publicar!!!.</h3>
        )}
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
};

interface Post {
  id: number;
  author: string;
  content?: string;
  videoUrl?: string;
}

interface GroupPostsProps {
  initialPosts: Post[];
  isMember: boolean;
}

export default GroupPosts;
