import React from "react";

interface MemberProps {
  name: string;
}

const MemberCard: React.FC<MemberProps> = ({ name }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-3 flex items-center mb-3">
      <img
        src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`}
        alt={name}
        className="w-10 h-10 rounded-full mr-3"
      />
      <p className="text-gray-700 font-medium">{name}</p>
    </div>
  );
};

export default MemberCard;
