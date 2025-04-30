/**
 Author: Liam O'Driscoll
 Use: Takes in a string[] and does tts for all items
 NOTES: This was all copied from yanding's
 */

import React, { useRef, useState } from 'react';
import { Button, Group } from '@mantine/core';
import { IconVolume, IconPlayerStop } from '@tabler/icons-react';
interface TTSButtonProps {
    text: string[];
}

const TTSButton: React.FC<TTSButtonProps> = ({ text }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    const handleToggle = () => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            // changing to be
            const utterance = new SpeechSynthesisUtterance(text.join('....'));
            utterance.lang = 'en-US';
            utterance.rate = 0.75;
            utterance.pitch = 0.5;
            utterance.onend = () => setIsSpeaking(false);

            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
            utteranceRef.current = utterance;
            setIsSpeaking(true);
        }
    };
    // disable closing of according
    // Used: https://stackoverflow.com/questions/69358781/material-ui-expand-accordion-by-clicking-the-icon-only*/
    return (
        <Button
            onClick={(e) => {
                e.stopPropagation();
                handleToggle();
            }}
            color={isSpeaking ? 'red' : '#5A83DB'}
            variant="light"
            size="sm"
        >
            <Group>
                {isSpeaking ? <IconPlayerStop size="16" /> : <IconVolume size="16" />}
                {isSpeaking ? 'Stop' : ''}
            </Group>
        </Button>
    );
};

export default TTSButton;
