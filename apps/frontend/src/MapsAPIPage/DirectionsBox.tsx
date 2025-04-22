import React, {useState, useRef} from 'react'
import {Box, ScrollArea, Text, List, Button, Divider } from '@mantine/core';
import {Step} from './Steps'
import { Link } from "react-router-dom"; //use ive arrived button to direct to indoor


interface Props {
  steps: Step[];
}

const DirectionsBox = (props: Props) => {
  const steps = props.steps;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  //helper function that transforms html into string
  const parseHTMLtoText = (htmlString: string) => {
    return htmlString.replace(/<[^>]+>/g, '').replace(/\//g, ' ');    // replace slashes with spaces

  };

  //transform directions info from google, from html to string
  const speechText = steps.map((step) =>
    parseHTMLtoText(step.instruction)).join('....');

  //control play/stop logic
  const handleToggle = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(speechText); //create new instance everytime it plays
      utterance.lang = 'en-US';
      utterance.rate = 0.75; //how fast talk
      utterance.pitch = 0.5; //voice pitch
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.cancel(); // Clear queue
      window.speechSynthesis.speak(utterance);
      utteranceRef.current = utterance;
      setIsSpeaking(true);
    }
  };
return (
      <Box //custom box for directions
        pos="absolute"
        bottom="4rem"
        left="0.5rem"
        maw={225}
        bg="#EFF4FE"
        p="sm"
        radius="md"
        shadow="md"
        bd ="1px solid white"
        style={{borderRadius: "10px"}}
      >
        <Box mx="auto" ta='center'>
          <Text fw={700} size="md" color="black" mb="xs" ta="left">
            Directions:
          </Text>
          <ScrollArea h={200}>
            <List type="ordered"mt="sm">
            {steps.map((step, index) => (
              <List.Item key={index}>
                <Text size="xs" my='xs' color="#1C43A7" ta="center">
                  {parseHTMLtoText(step.instruction)}
                </Text>
                <Divider label={`${step.distance}`}
                         labelPosition="center"
                         my="xs"
                         color="#F6D161" // Line color
                         styles={{
                           label: {
                             color: '#000000'} //text colot
                         }}/>
              </List.Item>
            ))}
          </List>
        </ScrollArea>
        </Box>
        <Box mt="sm" ta='center'>
          <Button
            onClick={handleToggle}
            color={isSpeaking ? 'red' : 'blue'}
            variant="light"
            size='sm'
          >
            {isSpeaking ? 'Stop' : 'Play Directions'}
          </Button>
        </Box>
        <Box ta='center' mt="md">
          <Button component={Link} to="/IndoorMapPage" color="#F8D261">
            I've Arrived
          </Button>
        </Box>
      </Box>
)
}
export default DirectionsBox;
