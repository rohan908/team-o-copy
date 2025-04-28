import { useState } from 'react';
import { Button, Container, Text, Image, Group, Center, Stack } from '@mantine/core';
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react';

type Member = {
    name: string;
    role: string;
    image: string;
};

const teamMembers: Member[] = [
    {
        name: "Liam O'Driscoll",
        role: 'Project Manager',
        image: 'public/TeamPhotos/liam.png',
    },
    {
        name: 'Logan Winters',
        role: 'Project Owner',
        image: 'public/TeamPhotos/Logan.png',
    },
    {
        name: 'Hudson Kortus',
        role: 'Lead Software Engineer',
        image: 'public/TeamPhotos/HudsonKortus.jpg',
    },
    {
        name: 'Rohan Inamdar',
        role: 'Assistant Lead Software Engineer',
        image: 'public/TeamPhotos/Rohan.jpeg',
    },
    {
        name: 'Owen Hart',
        role: 'Assistant Lead Software Engineer',
        image: 'public/TeamPhotos/Owen.jpeg',
    },
    {
        name: 'Yanding Mario',
        role: 'Assistant Lead Software Engineer',
        image: 'public/TeamPhotos/Yanding.png',
    },
    {
        name: 'Camden Brayton',
        role: 'Full-Time Software Engineer',
        image: 'public/TeamPhotos/Camden.jpg',
    },
    {
        name: 'Joseph Abata',
        role: 'Full-Time Software Engineer',
        image: 'public/TeamPhotos/JoeAbata.JPG',
    },
    {
        name: 'Conner Daly',
        role: 'Full-Time Software Engineer',
        image: 'public/TeamPhotos/conner.png',
    },
    {
        name: 'Adam Blanchard',
        role: 'Scrum Master',
        image: 'public/TeamPhotos/Adam.jpg',
    },
    {
        name: 'Ethan Ramoth',
        role: 'Documentation',
        image: 'public/TeamPhotos/Ethan.png',
    },
];
