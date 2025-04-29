import React, { useState, useRef } from 'react';
import { Box, ScrollArea, Text, List, Button, Divider, Transition, Flex } from '@mantine/core';
import { Step } from './Steps';
import { Link } from 'react-router-dom';
import TTSButton from "../Buttons/TTSButton.tsx"; //use ive arrived button to direct to indoor
import {
  IconArrowBearRight,
  IconArrowLeft,
  IconArrowMerge,
  IconArrowRight,
  IconArrowUp,
  IconQuestionMark,
  IconStairs,
} from '@tabler/icons-react';

interface Props {
    steps: Step[];
}

const DirectionsBox = (props: Props) => {
    const steps = props.steps;
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [stepStrings, setStepStrings] = useState<string[]>([]);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    //helper function that transforms html into string
    const parseHTMLtoText = (htmlString: string) => {
        return htmlString.replace(/<[^>]+>/g, '').replace(/\//g, ' '); // replace slashes with spaces
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
      w="100%"
      bg="#EFF4FE"
      p="sm"
      style={{borderRadius: "10px", boxShadow: steps && steps.length > 0 ? "0px 0px 4px 0px #AAAAAA" : "0px 0px 0px 0px #ebf2ff"}}
    >
      <Transition
        mounted={steps && steps.length > 0}
        transition="slide-right"
        duration={400}
        timingFunction="linear"
      >
        {(styles) => (
          <div style={styles}>
            <Box mx="auto" ta='left'>
              <Flex direction="row" gap="md" align={"top"}>
                <Text fw={700} size="md" color="black" mt="5px" mb="xs" ta="left">
                  Directions:
                </Text>
                <Box ta='center'>
                  <TTSButton text={[speechText]}/>
                </Box>
              </Flex>
              <ScrollArea h={235} w="100%">
                <List type="ordered" mt="sm" w="100%">
                  {steps.map((step, index) => {
                    const text = parseHTMLtoText(step.instruction);
                    const icon = text.toLowerCase().includes('continue') ? (
                      <IconArrowUp size={20} color="#0E3B99"/>
                    ) : text.toLowerCase().includes('head') ? (
                      <IconArrowUp size={20} color="#0E3B99"/>
                    ) : text.toLowerCase().includes('merge') ? (
                      <IconArrowMerge size={20} color="#0E3B99"/>
                    ) : text.toLowerCase().includes('take') ? (
                      <IconArrowBearRight size={20} color="#0E3B99"/>
                    ) : text.toLowerCase().includes('left') ? (
                      <IconArrowLeft size={20} color="#0E3B99"/>
                    ) : text.toLowerCase().includes('right') ? (
                      <IconArrowRight size={20} color="#0E3B99"/>
                    ) : (<IconQuestionMark size={20} color="#0E3B99"/>);

                    return (
                    <List.Item key={index} w="100%">
                      <Flex direction="row" gap="sm" align="center">
                        {icon}
                        <Text w="100%" size="xs" my='3px' c="secondaryBlues.5" ta="left">
                          {text}
                        </Text>
                      </Flex>
                      <Divider
                        label={`${step.distance}`}
                        labelPosition="center"
                        w="215px"
                        my="3px"
                        color="yellowAccent.4" // Line color
                        styles={{
                          label: {
                            color: '#000000'
                          } //text color
                        }}/>
                    </List.Item>
                    )})}
                </List>
              </ScrollArea>
            </Box>
            {/*<Box mt="sm" ta='center'>*/}
            {/*  <Button*/}
            {/*    onClick={handleToggle}*/}
            {/*    color={isSpeaking ? 'red' : 'blue'}*/}
            {/*    variant="light"*/}
            {/*    size='sm'*/}
            {/*  >*/}
            {/*    {isSpeaking ? 'Stop' : 'Play Directions'}*/}
            {/*  </Button>*/}
            {/*</Box>*/}
            <Box ta='center' mt="md">
              <Button component={Link} to="/IndoorMapPage" color="secondaryBlues.5" size='compact-sm'>
                See Hospital Map
              </Button>
            </Box>
          </div>)}
      </Transition>
    </Box>
)
}
export default DirectionsBox;
