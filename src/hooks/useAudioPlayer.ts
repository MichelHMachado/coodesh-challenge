import { useState, useRef, useEffect } from "react";
import Hls from "hls.js";

const useAudioPlayer = (url: string, isActiveRadio: boolean) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const handleAudioWaiting = () => setIsLoading(true);
    const handleAudioCanPlay = () => setIsLoading(false);
    const handleAudioPlaying = () => setIsLoading(false);

    if (isPlaying && isActiveRadio) {
      if (audioRef.current) {
        audioRef.current.addEventListener("waiting", handleAudioWaiting);
        audioRef.current.addEventListener("canplay", handleAudioCanPlay);
        audioRef.current.addEventListener("playing", handleAudioPlaying);

        if (url.endsWith(".m3u8") && Hls.isSupported()) {
          hlsRef.current = new Hls();
          hlsRef.current.loadSource(url);
          hlsRef.current.attachMedia(audioRef.current);
          hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
            audioRef.current?.play().catch((error) => {
              console.error("Error playing HLS audio:", error);
            });
          });
        } else {
          audioRef.current.src = url;
          audioRef.current.play().catch((error) => {
            console.error("Error playing audio:", error);
            alert("This audio format is not supported on your device.");
            setIsLoading(false);
            setIsPlaying(false);
          });
        }
      }
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (audioRef.current) {
        audioRef.current.removeEventListener("waiting", handleAudioWaiting);
        audioRef.current.removeEventListener("canplay", handleAudioCanPlay);
        audioRef.current.removeEventListener("playing", handleAudioPlaying);
      }
    };
  }, [isPlaying, isActiveRadio, url]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return { isPlaying, togglePlay, isLoading, audioRef };
};

export default useAudioPlayer;
