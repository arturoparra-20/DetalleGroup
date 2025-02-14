import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import GroupPosts from "@/components/GroupPosts";
import MemberCard from "@/components/MemberCard";
import GroupHeader from "@/components/GroupHeader";

const GroupPage = () => {
  const { user } = useAuth();
  const [members, setMembers] = useState([
    { id: 1, name: "Juan Pérez", avatar: "/user1.jpg" },
    { id: 2, name: "María López", avatar: "/user2.jpg" },
    { id: 3, name: "Carlos Gómez", avatar: "/user3.jpg" },
  ]);

  const isMember = user ? members.some((m) => m.id === user.id) : false;

  const toggleMembership = () => {
    if (!user) return;

    setMembers((prev) =>
      isMember
        ? prev.filter((m) => m.id !== user.id) // Elimina al usuario
        : [...prev, { id: user.id, name: user.name, avatar: "/default.jpg" }] // Lo agrega
    );
  };

  const group = {
    id: 1,
    name: "Grupo de Next.js",
    description: "Este es un grupo de desarrollo en Next.js",
    imageUrl: "/group-image.jpg",
    type: "Tecnología",
    members: members,
    posts: [
      { id: 1, author: "Juan", content: "Bienvenidos al grupo!" },
      { id: 2, author: "María", videoUrl: "/video.mp4" },
    ],
  };

  if (!user) {
    return <p>No tienes acceso a este grupo. Por favor, inicia sesión.</p>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col space-y-4">
      <GroupHeader
        imageUrl={group.imageUrl}
        name={group.name}
        type={group.type}
        description={group.description}
        members={members}
        onToggleMembership={toggleMembership}
      />

      <div className="flex space-x-9">
        <div className="w-auto bg-gray-50 p-4 rounded-lg shadow-lg">
          <h2 className="text-gray-800 text-lg font-semibold mb-4">Miembros</h2>
          {group.members.map((member) => (
            <MemberCard key={member.id} {...member} />
          ))}
        </div>

        <div className="w-full bg-gray-50 p-4 rounded-lg shadow-lg">
          <GroupPosts initialPosts={group.posts} isMember={isMember} />
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
