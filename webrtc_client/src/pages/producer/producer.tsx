import "webrtc-adapter";
import React from "react";
import { RoomState } from "../../common";
import {
  RemoteVideo,
  LocalPreview,
  DevicesSetup,
  Header,
  RoomSetup,
} from "../../components";
import "./style.scss";
import { useDevice, useLocalStream, useRoom } from "./hooks";
import { Box, Grid } from "@mui/material";
import { PaperSection } from "./style";

export const Producer: React.FC = () => {
  const { localStreamReady } = useLocalStream();
  const { roomState } = useRoom();
  const {
    videoSelected,
    audioSelected,
    videoDevices,
    audioDevices,
    handleVideoSelect,
    handleAudioSelect,
  } = useDevice();

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        height: "100vh",
      }}
    >
      <Header />
      <Grid container padding={1}>
        <Grid item xs={3}>
          <PaperSection elevation={8}>
            <DevicesSetup
              videoDevices={videoDevices}
              onVideoSelect={handleVideoSelect}
              audioDevices={audioDevices}
              onAudioSelect={handleAudioSelect}
            />
          </PaperSection>
          <PaperSection elevation={8}>
            <RoomSetup
              enterDisabled={!localStreamReady || roomState !== RoomState.leave}
              leaveDisabled={roomState === RoomState.leave}
            />
          </PaperSection>
        </Grid>
        <Grid item xs>
          <PaperSection elevation={8} sx={{ height: "100%" }}>
            <LocalPreview
              videoSelected={videoSelected}
              audioSelected={audioSelected}
            />
            <RemoteVideo />
          </PaperSection>
        </Grid>
        <Grid item xs={3}>
          <PaperSection elevation={8} sx={{ height: "100%" }}>
            log
          </PaperSection>
        </Grid>
      </Grid>
    </Box>
  );
};
