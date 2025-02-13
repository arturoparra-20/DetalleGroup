import React from "react";
import GroupPosts from "@/components/GroupPosts";
import MemberCard from "@/components/MemberCard";
import GroupHeader from "@/components/GroupHeader";

const GroupPage = () => {
  const group = {
    id: 1,
    name: "Grupo de Next.js",
    description: "Este es un grupo de desarrollo en Next.js",
    imageUrl: "/group-image.jpg",
    type: "Tecnología",
    members: [
      { id: 1, name: "Juan Pérez", avatar: "/user1.jpg" },
      { id: 2, name: "María López", avatar: "/user2.jpg" },
      { id: 3, name: "Carlos Gómez", avatar: "/user3.jpg" },
    ],
    posts: [
      { id: 1, author: "Juan", content: "Bienvenidos al grupo!" },
      { id: 2, author: "María", videoUrl: "/video.mp4" },
    ],
  };

  return (
    <div className="container mx-auto p-4 flex flex-col space-y-4">
      {/* Contenedor superior (HEADER) */}
      
   
       <GroupHeader
       imageUrl={group.imageUrl}
       name={group.name}
       type={group.type}
       description={group.description}
     />
     

      {/* Contenedor inferior (Miembros + Posts) */}
      <div className="flex space-x-9 ">
        {/* Columna izquierda: Miembros */}
        <div className="w-auto bg-gray-50 p-4 rounded-lg shadow-lg">
          <h2 className="text-gray-800 text-lg font-semibold mb-4">Miembros</h2>
          {group.members.map((member) => (
            <MemberCard key={member.id} {...member} />
          ))}
        </div>

        {/* Columna derecha: Posts */}
        <div className="w-full bg-gray-50 p-4 rounded-lg shadow-lg">
        <div className="w-auto">
          <GroupPosts initialPosts={group.posts} />
        </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
