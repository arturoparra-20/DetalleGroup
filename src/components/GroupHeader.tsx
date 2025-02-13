interface GroupHeaderProps {
  imageUrl: string;
  name: string;
  type: string;
  description: string;
}

export default function GroupHeader({ imageUrl, name, type, description }: GroupHeaderProps) {
  return (
    <div className=" bg-gray-50 shadow-md rounded-lg p-4 flex items-center">
      <img src={imageUrl} alt={name} className=" w-20 h-20 rounded-full mr-4" />
      <div className="flex justify-between">
        <div>
        <h1 className="text-gray-800 text-2xl font-bold">{name}</h1>
        <p className="text-sm text-gray-600">{type}</p>
        <p className="text-gray-700">{description}</p>
        </div>
        <div style={{marginLeft: "600px"}}>
          <button className="bg-gray-800 text-white rounded-lg px-6 py-2 hover:bg-gray-900">  | Unirse al Grupo</button>
        </div>
      </div>

    </div>
  );
}
