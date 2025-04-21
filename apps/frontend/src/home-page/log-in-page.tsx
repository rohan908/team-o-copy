import WaveAnimation from './components/waveAnimation.tsx';
import LogInBox from './components/LogInBox.tsx';
import { Box } from '@mantine/core';

export function LogInPage() {
    return (
        <>
            <Box
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100vh',
                    overflow: 'hidden',
                }}
            >
                <WaveAnimation id="waveCanvas" />
                <LogInBox />
            </Box>
        </>
    );
}
