import React, { useState, useRef, useEffect } from 'react';
import { ActionIcon, Loader } from '@mantine/core';
import { IconMicrophone} from '@tabler/icons-react';

interface SpechToTextProps {
    OnResult: (text: string) => void;
}
const SpeechToText: React.FC<SpechToTextProps> = (props: SpechToTextProps) => {
    const OnResult = props.OnResult;
    const [isSpeaking, setSpeaking] = useState(false);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    const startListening = () => {
        const speechRecognition =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!speechRecognition) {
            alert('Speech recognition not supported for this browser!!');
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
                .join('');
            OnResult(transcript);
            SpeechRecognition.stop(); //add this line to stop recording once there is a result
        };

        SpeechRecognition.onend = () => {
            setSpeaking(false);
        };
        return SpeechRecognition;
    };

    const handleToggle = () => {
        if (!recognitionRef.current) {
            recognitionRef.current = startListening();
        }
        const recognition = recognitionRef.current;
        if (!recognition) return;
        if (isSpeaking) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };
    useEffect(() => {
        //use effect to stop recording when user presses "back"
        return () => {
            if (recognitionRef.current && isSpeaking) {
                recognitionRef.current.stop();
            }
        };
    }, [isSpeaking]);
    return (
        <ActionIcon
            variant="outlined"
            color={isSpeaking ? 'red' : '#325ed8'}
            onClick={handleToggle}
        >
            {isSpeaking ? <Loader size="xs" /> : <IconMicrophone size={16} />}
        </ActionIcon>
    );
};

export default SpeechToText;
