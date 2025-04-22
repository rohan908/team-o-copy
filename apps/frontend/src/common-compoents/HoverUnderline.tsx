import { Box, BoxProps, createStyles, MantineTheme, useMantineTheme } from '@mantine/core';


// effect from: https://stackoverflow.com/questions/70906977/tailwind-underline-hover-animation
const useStyles = createStyles((theme : MantineTheme) => ({
  container: {
    position: 'relative',
    display: 'inline-block',
    cursor: 'pointer',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '2px',
    width: '80%',
    backgroundColor: theme.colors.yellowAccent[4],
    transition: 'width 300ms ease',
  },
  hoverEffect: {
    '&:hover .underline': {
      width: '100%',
    },
  },
}));

export function HoverUnderline(props: BoxProps) {
  const theme = useMantineTheme();
  const { classes } = useStyles(theme);

  return (
    <Box className={`${classes.container} ${classes.hoverEffect}`} {...props}>
      {props.children}
      <div className="underline" />
    </Box>
  );
}