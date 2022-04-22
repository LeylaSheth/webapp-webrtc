import {
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import { FC, ChangeEvent } from "react";

export interface DeviceSetupProps {
  videoDevices: MediaDeviceInfo[];
  audioDevices: MediaDeviceInfo[];
  onVideoSelect: (event: ChangeEvent<HTMLInputElement>) => void;
  onAudioSelect: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const DevicesSetup: FC<DeviceSetupProps> = (props) => {
  const {
    videoDevices,
    audioDevices,
    onVideoSelect: handleVideoSelect,
    onAudioSelect: handleAudioSelect,
  } = props;

  return (
    <Stack>
      <FormControl>
        <FormLabel>Video Device Selector</FormLabel>
        <RadioGroup onChange={handleVideoSelect}>
          {videoDevices.map((device) => (
            <FormControlLabel
              key={device.deviceId}
              value={device.deviceId}
              control={<Radio />}
              label={device.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Divider />
      <FormControl>
        <FormLabel>Audio Device Selector</FormLabel>
        <RadioGroup onChange={handleAudioSelect}>
          {audioDevices.map((device) => (
            <FormControlLabel
              key={device.deviceId}
              value={device.deviceId}
              control={<Radio />}
              label={device.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};
