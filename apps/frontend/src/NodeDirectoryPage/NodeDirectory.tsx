import {useState} from 'react';
import {Accordion, Image, Box, Center, Flex, useMantineTheme} from '@mantine/core';
import "./NodeDirectory.css"

interface TempDummyNode{
  x: number;
  y: number;
  floor: number;
  type: "Elevator" | "Room" | "Hallway";
  name: string;
  id: number;
  description: string;
  connectingNodes: TempDummyNode[];
}


export function NodeDirectory() {
  const [nodeList, setNodeList] = useState<TempDummyNode[]>([]);
  const [hasAddedData, setHasAddedData] = useState(false);
  const nodeOne : TempDummyNode = {
    x: 0,
    y: 0,
    floor: 1,
    type: "Room",
    name: "TestRoom1",
    id: 1,
    description: "TestRoom1Description",
    connectingNodes: []
  };
  const nodeTwo : TempDummyNode = {
    x: 0,
    y: 0,
    floor: 2,
    type: "Room",
    name: "TestRoom2",
    id: 2,
    description: "TestRoom2Description",
    connectingNodes: [nodeOne]
  };
  const newNodeList : TempDummyNode[] = [nodeOne, nodeTwo];
  if (!hasAddedData) {
    setNodeList(nodeList.concat(newNodeList));
    setHasAddedData(true);
  }

  function returnNodeNames(nodes: TempDummyNode[]) {
    const listOfNames : string[] = [];
    let isThereData = false;
    for (const [index, element] of nodes.entries()){
      isThereData = true;
      listOfNames.push("ID: " + element.id + " Name: " + element.name);
    }
    if (!isThereData) {
      listOfNames.push("No Registered Connections");
    }
    return listOfNames;
  }

  function mapTypesToIcons(type: string){
    if (type == "Elevator"){
      return <Image
        fit="contain"
        radius="md"
        src="public/NodeDirectoryIcons/Elevator.png"
        alt="Hallway Icon"
      />
    }
    if (type == "Hallway"){
      return <Image
        fit="contain"
        radius="md"
        src="public/NodeDirectoryIcons/Hallway.png"
        alt="Hallway Icon"
      />
    }
    if (type == "Room"){
      return <Image
        fit="contain"
        radius="md"
        src="public/NodeDirectoryIcons/Room.png"
        alt="Hallway Icon"
      />
    }
  }

  const nodes = nodeList.map((item) => (
    <Accordion.Item key={item.id} value={item.name}>
      <Accordion.Control icon={mapTypesToIcons(item.type)}>{item.name}</Accordion.Control>
      <Accordion.Panel>X Coordinate: {item.x}</Accordion.Panel>
      <Accordion.Panel>Y Coordinate:{item.y}</Accordion.Panel>
      <Accordion.Panel>Floor: {item.floor}</Accordion.Panel>
      <Accordion.Panel>Node Type: {item.type}</Accordion.Panel>
      <Accordion.Panel>Description: {item.description}</Accordion.Panel>
      <Accordion.Panel>Connections: {returnNodeNames(item.connectingNodes)}</Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Center>
      <Flex align={"center"}  style={{
        margin: 'var(--mantine-spacing-xl)',
        color: 'var(--mantine-color-black)',
        background: '#00A3AC',

      }}>
        <Accordion chevronPosition="right">
          {nodes}
        </Accordion>
      </Flex>
    </Center>
  );

}

