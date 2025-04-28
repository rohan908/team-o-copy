import React, {useState, useRef} from 'react'
import { Button, } from '@mantine/core';

interface SpechToTextProps {
  OnResult: (text: string) => void;
}
const SpeechToText: React.FC<SpechToTextProps> = (props: SpechToTextProps) => {
  const OnResult = props.OnResult;
  const [isSpeaking , setSpeaking] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const startListening = () => {
    const speechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!speechRecognition) {
      alert("Speech recognition not supported for this browser!!")
      return;
    }

    const SpeechRecognition = new speechRecognition();
    SpeechRecognition.lang = 'en-US';
    SpeechRecognition.continuous = true;

    SpeechRecognition.onstart = () => {
      setSpeaking(true);
    };

    SpeechRecognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      OnResult(transcript);
    };

    SpeechRecognition.onend = () => {
      setSpeaking(false);
    };
    return SpeechRecognition;
  };

  const handleToggle = () => {
    if (!recognitionRef.current){
      recognitionRef.current = startListening();
    }
    const recognition = recognitionRef.current;
    if (!recognition) return;
    if (isSpeaking){
      recognition.stop();
    }
    else{
      recognition.start();
    }
  }

  return (
    <Button
      variant='outlined'
      color={isSpeaking? 'red':'blue'}
      onClick={handleToggle}>
      {isSpeaking? 'Listening...': 'Start'}
    </Button>

  )
}

export default SpeechToText;
