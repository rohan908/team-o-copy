import React, {useState, useRef} from 'react'
import {Box, ScrollArea, Text, List, Button} from '@mantine/core';
import {Step} from './Steps'


interface Props {
  steps: Step[];
}

const DirectionsBox = (props: Props) => {
  const steps = props.steps;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  //transform directions info from google, from html to string
  const speechText = steps.map((step) =>
    step.instruction.replace(/<[^>]+>/g, '')).join('...');

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
        bottom="2rem"
        left="0.5rem"
        maw={250}
        bg="white"
        p="md"
        radius="md"
        shadow="md"
        bd ="1px solid white"
        style={{borderRadius: "10px"}}
      >
        <Text fw={700} mb="sm">Directions:</Text>
        <ScrollArea h={250}>

          <List type="ordered" pl="md" mt="sm">
            {steps.map((step, index) => (
              <List.Item key={index}>
                <Text size="xs" color="dimmed" mt={2}>
                  ({step.distance}, {step.duration})
                </Text>
                <Box dangerouslySetInnerHTML={{ __html: step.instruction }} mb="sm" />
              </List.Item>
            ))}
          </List>
        </ScrollArea>
        <Box mt="sm">
          <Button
            fullWidth
            onClick={handleToggle}
            color={isSpeaking ? 'red' : 'blue'}
            variant="light"
          >
            {isSpeaking ? 'Stop' : 'Play Directions'}
          </Button>
        </Box>
      </Box>
)
}
export default DirectionsBox;
