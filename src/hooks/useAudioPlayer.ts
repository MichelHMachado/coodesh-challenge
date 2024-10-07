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

    // Copy the audioRef.current to a local variable for cleanup
    const currentAudio = audioRef.current;

    if (isPlaying && isActiveRadio) {
      if (currentAudio) {
        currentAudio.addEventListener("waiting", handleAudioWaiting);
        currentAudio.addEventListener("canplay", handleAudioCanPlay);
        currentAudio.addEventListener("playing", handleAudioPlaying);

        if (url.endsWith(".m3u8") && Hls.isSupported()) {
          hlsRef.current = new Hls();
          hlsRef.current.loadSource(url);
          hlsRef.current.attachMedia(currentAudio);
          hlsRef.current.on(Hls.Events.MANIFEST_PARSED, () => {
            currentAudio?.play().catch((error) => {
              console.error("Error playing HLS audio:", error);
            });
          });
        } else {
          currentAudio.src = url;
          currentAudio.play().catch((error) => {
            console.error("Error playing audio:", error);
            alert("This audio format is not supported on your device.");
            setIsLoading(false);
            setIsPlaying(false);
          });
        }
      }
    } else {
      currentAudio?.pause();
      setIsPlaying(false);
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      if (currentAudio) {
        currentAudio.removeEventListener("waiting", handleAudioWaiting);
        currentAudio.removeEventListener("canplay", handleAudioCanPlay);
        currentAudio.removeEventListener("playing", handleAudioPlaying);
      }
    };
  }, [isPlaying, isActiveRadio, url]);

  const togglePlay = () => {
    const allAudioElements = document.querySelectorAll("audio");
    allAudioElements.forEach((audioElement) => {
      if (audioElement !== audioRef.current) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
    });

    setIsPlaying((prev) => !prev);
  };

  return { isPlaying, togglePlay, isLoading, audioRef };
};

export default useAudioPlayer;
