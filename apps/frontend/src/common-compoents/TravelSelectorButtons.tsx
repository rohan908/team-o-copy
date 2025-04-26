import {useTimeline} from "../HomePage/TimeLineContext.tsx";
import {ColorChangingButton} from "./commonButtons.tsx";
import { Autocomplete, Flex, Select, useMantineTheme } from '@mantine/core';
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
    <Flex direction="column" gap="md" justify="center" align="center" w="100%" mb="md">
      <Flex direction="row" gap="md" w="100%">
        <ColorChangingButton
          w={props.w}
          leftSection={<IconCar size={24} />}
          ValueToCheck={travelMode.toString()}
          ValueForTrigger={google.maps.TravelMode.DRIVING.toString()}
          firstColor="#1C43A7"
          secondColor="#5A83DB"
          onClick={() => setTravelMode(google.maps.TravelMode.DRIVING)}>
          Driving
        </ColorChangingButton>
        <ColorChangingButton
          w={props.w}
          leftSection={<IconTrekking size={24} />}
          ValueToCheck={travelMode.toString()}
          ValueForTrigger={google.maps.TravelMode.WALKING.toString()}
          firstColor="#1C43A7"
          secondColor="#5A83DB"
          onClick={() => setTravelMode(google.maps.TravelMode.WALKING)}>
          Walking
        </ColorChangingButton>
      </Flex>
      <ColorChangingButton
        w={props.w}
        leftSection={<IconTrain size={24} />}
        ValueToCheck={travelMode.toString()}
        ValueForTrigger={google.maps.TravelMode.TRANSIT.toString()}
        firstColor="#1C43A7"
        secondColor="#5A83DB"
        onClick={() => setTravelMode(google.maps.TravelMode.TRANSIT)}>
        Public Transit
      </ColorChangingButton>
    </Flex>
  );
}
