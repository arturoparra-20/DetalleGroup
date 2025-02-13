import React, { useState } from "react";

interface PostFormProps {
  onAddPost: (newPost: { author: string; content?: string; videoUrl?: string; youtubeUrl?: string; }) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onAddPost }) => {
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [post, setPost] = useState({ author: "", content: "", videoUrl: "", youtubeUrl: "" });


  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const video = document.createElement("video");
    video.preload = "metadata";
    video.onloadedmetadata = () => {
      window.URL.revokeObjectURL(video.src);
      if (video.duration > 40) {
        setError("El video debe durar máximo 40 segundos.");
        setVideoFile(null);
        setVideoUrl("");
      } else {
        setError("");
        setVideoFile(file);
        setVideoUrl(URL.createObjectURL(file));
      }
    };
    video.src = URL.createObjectURL(file);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!content && !videoUrl) {
      setError("Debes escribir un mensaje o subir un video.");
      return;
    }

    const newPost = {
      author: "Usuario Actual",
      content: content || undefined,
      videoUrl: videoUrl || undefined,
      youtubeUrl: post.youtubeUrl || undefined,
    };

    onAddPost(newPost);
    setContent("");
    setVideoUrl("");
    setVideoFile(null);
    setError("");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <form onSubmit={handleSubmit}>
       <h2 className="text-gray-900 font-bold">Crea una nueva publicación!!!</h2> 
        <textarea
          className=" text-gray-900 w-full p-2 border rounded-md resize-none"
          rows={4}
          maxLength={250}
          placeholder="Escribe algo... (máximo 4 líneas)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>



        <input
          type="file"
          accept="video/mp4"
          className="mt-2"
          onChange={handleVideoUpload}
        />
        {/* Input para URL de YouTube */}
        <input
          type="text"
          placeholder="Ingresa una URL de YouTube"
          className="border rounded-lg p-2 w-full"
          value={post.youtubeUrl}
          onChange={(e) => setPost({ ...post, youtubeUrl: e.target.value })}
        />


        {videoUrl && (
          <video className="w-full mt-2 rounded-md" controls>
            <source src={videoUrl} type="video/mp4" />
            Tu navegador no soporta videos.
          </video>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          type="submit"
          className="mt-3 bg-gray-800 text-white px-4 py-2 rounded-md w-full hover:bg-gray-900"
        >
          Publicar
        </button>
      </form>
    </div>
  );
};

export default PostForm;
