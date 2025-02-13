import React, { useState } from "react";

interface PostProps {
  author: string;
  content?: string;
  videoUrl?: string;
  youtubeUrl?: string;
}

const PostCard: React.FC<PostProps> = ({ author, content, videoUrl, youtubeUrl }) => {

  const [post, setPost] = useState({ author: "", content: "", videoUrl: "", youtubeUrl: "" });


  function generarURLYoutubeEmbebido(url: string): string {
    if (!url) return "";
    const video_id = url.split("v=")[1]?.split("&")[0];
    return video_id ? `https://www.youtube.com/embed/${video_id}` : "";
  }


  return (
    <div className="text-gray-800 bg-gray-100 p-4 rounded-lg shadow-md mb-4">
      <h3 className="font-bold">{author}</h3>
      {content && <p className="mt-2">{content}</p>}

      {videoUrl && (
        <video controls className="w-full rounded-lg">
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no soporta la reproducción de videos.
        </video>
      )}


      {/* Mostrar video de YouTube si hay un youtubeUrl */}
      {youtubeUrl && (
        <iframe
          className="w-full rounded-lg"
          height="315"
          src={generarURLYoutubeEmbebido(youtubeUrl)}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}


      <div className="flex space-x-4 mt-2">
        <button className="hover:text-blue-500">👍 Me gusta</button>
        <button className="hover:text-red-500">👎 No me gusta</button>
        <button className="hover:text-yellow-500">😢 Entristece</button>
        <button className="hover:text-red-500">😡 Me enoja</button>
        <button className="hover:text-yellow-500">😮 Sorprende</button>
      </div>
    </div>
  );
};

export default PostCard;
