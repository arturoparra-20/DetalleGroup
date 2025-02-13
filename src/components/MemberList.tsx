import React from "react";
import MemberCard from "./MemberCard";

interface MembersListProps {
  members: string[];
}

const MembersList: React.FC<MembersListProps> = ({ members }) => {
  return (
    <div>
      <h2 className="text-gray-700 text-xl font-bold mb-4">Miembros</h2>
      {members.map((member, index) => (
        <MemberCard key={index} name={member} />
      ))}
    </div>
  );
};

export default MembersList;
