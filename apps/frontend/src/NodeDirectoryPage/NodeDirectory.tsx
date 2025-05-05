import { useState } from 'react';
import {
    Accordion,
    Center,
    Flex,
    Group,
    Avatar,
    Text,
    Box,
    Title,
} from '@mantine/core';

interface TempDummyNode {
    x: number;
    y: number;
    floor: number;
    type: 'Elevator' | 'Room' | 'Hallway';
    name: string;
    id: number;
    description: string;
    connectingNodes: TempDummyNode[];
}

export function NodeDirectory() {
    //Setup of my test nodes. Should be sourced from backend in future.
    const [nodeList, setNodeList] = useState<TempDummyNode[]>([]);
    const [hasAddedData, setHasAddedData] = useState(false);
    const nodeOne: TempDummyNode = {
        x: 0,
        y: 0,
        floor: 1,
        type: 'Room',
        name: 'TestRoom1',
        id: 1,
        description: 'TestRoom1Description',
        connectingNodes: [],
    };
    const nodeTwo: TempDummyNode = {
        x: 0,
        y: 0,
        floor: 2,
        type: 'Room',
        name: 'TestRoom2',
        id: 2,
        description: 'TestRoom2Description',
        connectingNodes: [nodeOne],
    };
    const nodeThree: TempDummyNode = {
        x: 0,
        y: 0,
        floor: 2,
        type: 'Hallway',
        name: 'TestHallway1',
        id: 2,
        description: 'TestHallway1Description',
        connectingNodes: [],
    };
    const nodeFour: TempDummyNode = {
        x: 0,
        y: 0,
        floor: 1,
        type: 'Elevator',
        name: 'TestElevator1',
        id: 2,
        description: 'TestElevator1Description',
        connectingNodes: [nodeOne, nodeTwo],
    };
    nodeOne.connectingNodes.push(nodeTwo);
    const newNodeList: TempDummyNode[] = [nodeOne, nodeTwo, nodeThree, nodeFour];
    if (!hasAddedData) {
        setNodeList(nodeList.concat(newNodeList));
        setHasAddedData(true);
    }

    //Returns names of nodes in a list. Returns a default value if no nodes are given.
    function returnNodeNames(nodes: TempDummyNode[]) {
        const listOfNames: string[] = [];
        let isThereData = false;
        for (const [index, element] of nodes.entries()) {
            isThereData = true;
            listOfNames.push('ID: ' + element.id + ' Name: ' + element.name);
        }
        if (!isThereData) {
            listOfNames.push('No Registered Connections');
        }
        return listOfNames;
    }

    interface AccordionLabelProps {
        label: string;
        image: string;
    }

    function AccordionLabel({ label, image }: AccordionLabelProps) {
        return (
            <Group wrap="nowrap" bg="themeGold.1">
                <Avatar src={image} radius="xl" size="lg" />
                <Text>{label}</Text>
            </Group>
        );
    }

    //In theory, this returns image tags based on what string is given. In practice, they aren't showing up in the icon slot, but neither is anything else.
    function mapTypesToIcons(type: string) {
        if (type.localeCompare('Elevator') === 0) {
            return 'public/NodeDirectoryIcons/Elevator.png';
        } else if (type.localeCompare('Hallway') === 0) {
            return 'public/NodeDirectoryIcons/Hallway.png';
        } else if (type.localeCompare('Room') === 0) {
            return 'public/NodeDirectoryIcons/Room.png';
        } else {
            return 'public/NodeDirectoryIcons/Room.png';
        }
    }

    const nodes = nodeList.map((item) => (
        <Accordion.Item key={item.id} value={item.name}>
            <Accordion.Control bg={'themeGold.1'}>
                <AccordionLabel
                    label={item.name}
                    image={mapTypesToIcons(item.type)}
                ></AccordionLabel>
            </Accordion.Control>
            <Accordion.Panel bg="blueBase.1">X Coordinate: {item.x}</Accordion.Panel>
            <Accordion.Panel bg="blueBase.1">Y Coordinate:{item.y}</Accordion.Panel>
            <Accordion.Panel bg="blueBase.1">Floor: {item.floor}</Accordion.Panel>
            <Accordion.Panel bg="blueBase.1">Node Type: {item.type}</Accordion.Panel>
            <Accordion.Panel bg="blueBase.1">Description: {item.description}</Accordion.Panel>
            <Accordion.Panel bg="blueBase.1">
                Connections: {returnNodeNames(item.connectingNodes)}
            </Accordion.Panel>
        </Accordion.Item>
    ));

    return (
        <Box className="min-h-screen w-full" bg="terquAccet.2">
            <Center>
                <Flex direction={'column'}>
                    <Title order={2} ta="center" mb="lg">
                        Node Directory Listing
                    </Title>
                    <Accordion>{nodes}</Accordion>
                </Flex>
            </Center>
        </Box>
    );
}
