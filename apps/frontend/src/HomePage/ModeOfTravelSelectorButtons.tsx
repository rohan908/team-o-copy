import { Autocomplete, Flex, Select, useMantineTheme } from '@mantine/core';
import {
    IconCar,
    IconCarFilled,
    IconChevronDown,
    IconMapPinFilled,
    IconTrain,
    IconTrekking,
} from '@tabler/icons-react';
import { useTimeline } from './TimeLineContext.tsx';
import {ColorChangingButton} from "../common-compoents/commonButtons.tsx";

export function ModeOfTravelSelectorButtons() {
    const theme = useMantineTheme();
    const { setTravelMode, travelMode } = useTimeline();
    setTravelMode(google.maps.TravelMode.DRIVING);
    return (
      <Flex direction="column" gap="md" justify="center" align="center" w="100%" mb="md">
        <Flex direction="row" gap="md" w="100%">
          <ColorChangingButton
            w="175px"
            leftSection={<IconCar size={24} />}
            ValueToCheck={travelMode.toString()}
            ValueForTrigger={google.maps.TravelMode.DRIVING.toString()}
            firstColor="#1C43A7"
            secondColor="#5A83DB"
            onClick={() => setTravelMode(google.maps.TravelMode.DRIVING)}>
            Driving
          </ColorChangingButton>
          <ColorChangingButton
            w="175px"
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
          w="175px"
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
