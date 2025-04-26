import {useTimeline} from "../HomePage/TimeLineContext.tsx";
import {ColorChangingButton} from "./commonButtons.tsx";
import { Autocomplete, Box, Flex, Select, Tooltip, useMantineTheme } from '@mantine/core';
import {
  IconCar,
  IconCarFilled,
  IconChevronDown,
  IconMapPinFilled,
  IconTrain,
  IconTrekking,
} from '@tabler/icons-react';
import {useState} from "react";

interface TravelSelectorButtonProps {
  w: string;
}

export const TravelSelectorButtons: React.FC<TravelSelectorButtonProps> = (props) => {
  const theme = useMantineTheme();
  const { setTravelMode, travelMode } = useTimeline();
  const [hasAvoidedNull, setHasAvoidedNull] = useState<boolean>(false);
  //Ensures that the Travel Mode is set to a default value on page load.
  //For some reason, it wasn't liking me trying to set this default value directly in the context.
  if (!travelMode && !hasAvoidedNull) {
    setTravelMode(google.maps.TravelMode.DRIVING)
    setHasAvoidedNull(true);
  }

  return (
      <Flex direction="row" justify="space-around" gap="md" w="100%" mb="md">
        <Tooltip label="Driving">
          <Box>
            <ColorChangingButton
              w={props.w}
              ValueToCheck={travelMode.toString()}
              ValueForTrigger={google.maps.TravelMode.DRIVING.toString()}
              firstColor="primaryBlues.9"
              secondColor="secondaryBlues.5"
              borderRadius="30px"
              onClick={() => setTravelMode(google.maps.TravelMode.DRIVING)}>
              <IconCar size={24} />
            </ColorChangingButton>
          </Box>
        </Tooltip>
        <Tooltip label="Walking">
          <Box>
            <ColorChangingButton
              w={props.w}
              ValueToCheck={travelMode.toString()}
              ValueForTrigger={google.maps.TravelMode.WALKING.toString()}
              firstColor="primaryBlues.9"
              secondColor="secondaryBlues.5"
              borderRadius="30px"
              onClick={() => setTravelMode(google.maps.TravelMode.WALKING)}>
              <IconTrekking size={24} />
            </ColorChangingButton>
          </Box>
        </Tooltip>
        <Tooltip label="Public Transit">
          <Box>
            <ColorChangingButton
              w={props.w}
              ValueToCheck={travelMode.toString()}
              ValueForTrigger={google.maps.TravelMode.TRANSIT.toString()}
              firstColor="primaryBlues.9"
              secondColor="secondaryBlues.5"
              onClick={() => setTravelMode(google.maps.TravelMode.TRANSIT)}
              borderRadius="30px">
              <IconTrain size={24} />
            </ColorChangingButton>
          </Box>
        </Tooltip>
      </Flex>
  );
}
