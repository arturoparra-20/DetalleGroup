import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

interface GroupHeaderProps {
  imageUrl: string;
  name: string;
  type: string;
  description: string;
  members: { id: number; name: string }[];
  onToggleMembership: () => void;
}

export default function GroupHeader({
  imageUrl,
  name,
  type,
  description,
  members,
  onToggleMembership,
}: GroupHeaderProps) {
  const { user } = useAuth();
  const isMember = user ? members.some((m) => m.id === user.id) : false;

  return (
    <div className="bg-gray-50 shadow-md rounded-lg p-4 flex items-center">
      <img src={imageUrl} alt={name} className="w-20 h-20 rounded-full mr-4" />
      <div className="flex justify-between w-full">
        <div>
          <h1 className="text-gray-800 text-2xl font-bold">{name}</h1>
          <p className="text-sm text-gray-600">{type}</p>
          <p className="text-gray-700">{description}</p>
        </div>
        <div>
          {user ? (
            <button
              onClick={onToggleMembership}
              className={`px-6 py-2 font-bold rounded-lg mt-4 ${
                isMember
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-800 text-white hover:bg-gray-900"
              }`}
            >
              {isMember ? "Abandonar Grupo" : "Unirse al Grupo"}
            </button>
          ) : (
            <p className="text-gray-600 mt-4">Inicia sesión para unirte</p>
          )}
        </div>
      </div>
    </div>
  );
}
