import React, { useState } from "react";

interface PostFormProps {
  onAddPost: (newPost: {
    author: string;
    content?: string;
    videoUrl?: string;
    youtubeUrl?: string;
    groupId: number;
    reactions: { like: number; dislike: number; sad: number; angry: number; surprised: number };
  }) => void;
}

const CreatePostForm: React.FC<PostFormProps> = ({ onAddPost }) => {
  const [error, setError] = useState("");

  const [postData, setPostData] = useState({
    author: "Usuario Actual", // Temporal, luego vendrá del backend
    content: "",
    videoUrl: "",
    youtubeUrl: "",
    groupId: 1, // Temporal, luego vendrá del backend
    reactions: { like: 0, dislike: 0, sad: 0, angry: 0, surprised: 0 },
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const video = document.createElement("video");
      video.preload = "metadata";
      video.src = reader.result as string;

      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        if (video.duration > 40) {
          setError("El video debe durar máximo 40 segundos.");
          setPostData((prev) => ({ ...prev, videoUrl: "" }));
        } else {
          setError("");
          setPostData((prev) => ({ ...prev, videoUrl: reader.result as string }));
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const validateYouTubeUrl = async (url: string) => {
    const youtubeId = extractYouTubeId(url);
    if (!youtubeId) {
      setError("URL de YouTube no válida.");
      setPostData((prev) => ({ ...prev, youtubeUrl: "" }));
      return;
    }

    setPostData((prev) => ({ ...prev, youtubeUrl: url })); // Guardar la URL antes de validar

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${youtubeId}&part=contentDetails&key=TU_API_KEY`
      );
      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        setError("");
        return;
      }

      const durationISO = data.items[0].contentDetails.duration;
      const durationSeconds = parseYouTubeDuration(durationISO);

      if (durationSeconds > 40) {
        setError("El video de YouTube no puede durar más de 40 segundos.");
      } else {
        setError("");
      }
    } catch (error) {
      console.error("Error validando YouTube:", error);
      setError("");
    }
  };

  const extractYouTubeId = (url: string) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const parseYouTubeDuration = (isoDuration: string) => {
    const match = isoDuration.match(/PT(\d+)S/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!postData.content && !postData.videoUrl && !postData.youtubeUrl) {
      setError("Debes escribir un mensaje o subir un video.");
      return;
    }

    console.log("Post enviado:", postData);

    onAddPost(postData);

    setPostData({
      author: "Usuario Actual",
      content: "",
      videoUrl: "",
      youtubeUrl: "",
      groupId: 1,
      reactions: { like: 0, dislike: 0, sad: 0, angry: 0, surprised: 0 },
    });
    setError("");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <form onSubmit={handleSubmit}>
        <h2 className="text-gray-900 font-bold">Crea una nueva publicación!!!</h2>

        {/* Input de texto */}
        <textarea
          name="content"
          className="text-gray-900 w-full p-2 border rounded-md resize-none"
          rows={4}
          maxLength={250}
          placeholder="Escribe algo... (máximo 4 líneas)"
          value={postData.content}
          onChange={handleChange}
        ></textarea>

        {/* Input para subir video */}
        <input type="file" accept="video/mp4" className="mt-2" onChange={handleVideoUpload}/>

        {/* Input para URL de YouTube */}
        <input
          type="text"
          name="youtubeUrl"
          placeholder="Ingresa una URL de YouTube"
          className="border rounded-lg p-2 w-full mt-2"
          value={postData.youtubeUrl}
          onChange={(e) => validateYouTubeUrl(e.target.value)}
        />

        {/* Mostrar previsualización del video si hay uno */}
        {postData.videoUrl && (
          <video className="w-full mt-2 rounded-md" controls>
            <source src={postData.videoUrl} type="video/mp4" />
            Tu navegador no soporta videos.
          </video>
        )}

        {/* Mostrar previsualización del video de YouTube */}
        {postData.youtubeUrl && (
          <iframe
            className="w-full mt-2 rounded-md"
            src={`https://www.youtube.com/embed/${extractYouTubeId(postData.youtubeUrl)}`}
            title="YouTube video"
            allowFullScreen
          ></iframe>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button type="submit" className="mt-3 bg-gray-800 text-white px-4 py-2 rounded-md w-full hover:bg-gray-900">
          Publicar
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
