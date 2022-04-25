import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { streamManager } from "../../../common";

export const useDevice = () => {
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);

  const [videoSelected, setVideoSelected] = useState("");
  const [audioSelected, setAudioSelected] = useState("");

  const handleDeviceChange = useCallback(() => {
    window.navigator.mediaDevices.enumerateDevices().then((devices) => {
      setVideoDevices(devices.filter((d) => d.kind === "videoinput"));
      setAudioDevices(devices.filter((d) => d.kind === "audioinput"));
    });
  }, []);
  useEffect(() => {
    streamManager
      .requestPermission()
      .then(() => {
        handleDeviceChange();
      })
      .catch((e) => {
        console.error("request permission error !!!", e);
      });

    window.navigator.mediaDevices.addEventListener(
      "devicechange",
      handleDeviceChange
    );
    return () => {
      window.navigator.mediaDevices.removeEventListener(
        "devicechange",
        handleDeviceChange
      );
    };
  }, [handleDeviceChange]);

  const handleVideoSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setVideoSelected(e.target.value);
    }
  }, []);

  const handleAudioSelect = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setAudioSelected(e.target.value);
    }
  }, []);

  const handleReset = useCallback(() => {
    setVideoSelected("");
    setAudioSelected("");
  }, []);

  return {
    videoSelected,
    audioSelected,
    videoDevices,
    audioDevices,
    handleVideoSelect,
    handleAudioSelect,
    handleReset,
  };
};
