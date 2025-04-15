import React, { useState, useEffect, useRef } from 'react';
import {Link} from "react-router-dom"; //use ive arrived button to direct to /indoor
import {BlackButton} from "../common-compoents/commonButtons.tsx"
import {TwoPartInteractiveBox} from "../common-compoents/standAloneFrame.tsx";
import {HospitalDepartment, Patriot20, Patriot22, ChestnutHill} from '../directory/components/directorydata.tsx'; //this is now static lol

import {
    Box,
    Text,
    Title,
    Flex,
    Button,
    Divider,
    Select,
    useMantineTheme,
    Collapse,
    TextInput,
    Stack
} from '@mantine/core';
import * as L from 'leaflet';

interface HospitalSelectBoxProps {        //props to pass to main map Display
    onSelectHospital: (coordinate: L.LatLng) => void;
    onSelectDepartment?: (dept: string) => void;
    onSetUserCoordinates?: (coordinate: {lat: number, long: number}) => void;
    onSetTravelMode?: (mode: google.maps.TravelMode) => void;

}

const SelectBox: React.FC<HospitalSelectBoxProps> = (props) => {
    const {onSelectHospital, onSelectDepartment, onSetUserCoordinates, onSetTravelMode} = props;
    const theme = useMantineTheme();
    const [hospital, setHospital] = useState<string | null>(null); //initialize  hospital building as null
    const [department, setDepartment] = useState<string | null>(null); //also for department
    const [collapsed, setCollapsed] = useState(false); //select box has 2 states, collapsed and popped up
    const [departmentOptions, setDepartmentOptions] = useState<
        { value: string; label: string }[]
    >([]); //this is needed to display department options when entered a hospital
    const [userStartLocation, setUserStartLocation] = useState<{lat: number, long: number} | null>(null); // store user location input
    const input = useRef<HTMLInputElement>(null);
    const autocompleteRef = useRef<google.maps.places.Autocomplete|null>(null);
    const [navigationMethod, setNavigationMethod] = useState<google.maps.TravelMode | null>(null);

    const MapDepartment = (department: HospitalDepartment[]) =>
      department.map((department) =>({
        value: department.slug,
        label: department.title,
      }));

    const handleFindPath = () => {
        if (hospital == "Chestnut Hill") {
            onSelectHospital(new L.LatLng(42.32624893122403, -71.14948990068949));
        }
        else if(hospital =="20 Patriot Pl"){
          onSelectHospital(new L.LatLng(42.092759710546595, -71.26611460791148));
        }
        else if(hospital =="22 Patriot Pl"){
          onSelectHospital(new L.LatLng(42.09304546224412, -71.26680481859991));
        }
        if (department && onSelectDepartment) {
            onSelectDepartment(department);
        }
        if (department == "pharmacy"){
          onSelectHospital(new L.LatLng(42.093429, -71.268228)); //this is fixed location for pharmacy, should route to specific parking lot
        }
        if (userStartLocation && onSetUserCoordinates) {
          onSetUserCoordinates(userStartLocation);
        }
        if (navigationMethod && onSetTravelMode) {
          onSetTravelMode(navigationMethod);
        }
        setCollapsed(true);
    };

    const setHospitalLocation = (hospital: string | null) =>{
      if (hospital === '20 Patriot Pl') {
        setDepartmentOptions(MapDepartment(Patriot20));
      } else if (hospital === '22 Patriot Pl') {
        setDepartmentOptions(MapDepartment(Patriot22));
      }
      else if (hospital == 'Chestnut Hill'){
        setDepartmentOptions(MapDepartment(ChestnutHill));
      }
      else {
        setDepartmentOptions([]);
      }
      setHospital(hospital);
      setDepartment(null);
    }

  useEffect(() => { //use effect to render google autocomplete
    if (!input.current) return;
    autocompleteRef.current = new window.google.maps.places.Autocomplete(input.current, {types: ['geocode']});
    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (place?.geometry?.location) {
        const location = place.geometry.location;
        const latlng = {
          lat: location.lat(),
          long: location.lng(),
        };
        setUserStartLocation(latlng);
      }
    });
  }, []);



    return (
      <Flex w="100%" h="100vh" justify="center" align="center" pl={{ md: '20%', sm: '0%' }}>
        <TwoPartInteractiveBox
            title="Find your Way!"
            subtitle="Use our interactive map to find departments, parking, and efficient routes"
        >
          {!collapsed?(
            <>
              <Stack w="100%">
                <Box>
                  <Text ta="left" mb="sm" fw={500}>
                    Insert Starting Location:
                  </Text>
                  <TextInput
                    color = "#A5A7AC"
                    ref={input}
                    placeholder ="--Enter a Location--"
                  />
                </Box>
                <Box>
                  <Text ta="left" mb="sm" fw={500}>
                    Select Hospital:
                  </Text>
                  <Select
                    color = "#A5A7AC"
                    placeholder ="--Select Hospital--"
                    data={[
                        { value: '20 Patriot Pl', label: '20 Patriot Pl' },
                        { value: '22 Patriot Pl', label: '22 Patriot Pl' },
                        { value: 'Chestnut Hill', label: 'Chestnut Hill' }]}
                    value = {hospital}
                    onChange={setHospitalLocation}/>
                </Box>
                <Box>
                  <Text ta="left" mb="sm" fw={500}>
                    Select Department:
                  </Text>
                  <Select
                    color = "#A5A7AC"
                    placeholder ="--Select Department--"
                    data = {departmentOptions}
                    value={department}
                    onChange={setDepartment}
                    disabled={!hospital || departmentOptions.length === 0}/>
                </Box>
                <Box>
                  <Text ta="left" mb="sm" fw={500}>
                    Select Navigation Method:
                  </Text>
                  <Select
                    color = "#A5A7AC"
                    placeholder ="--Select Navigation Method--"
                    data = {[
                      {value: google.maps.TravelMode.WALKING, label: 'Walking'},
                      {value: google.maps.TravelMode.TRANSIT, label: 'Public Transportation'},
                      {value: google.maps.TravelMode.DRIVING, label: 'Driving'},
                    ]}
                    value = {navigationMethod}
                    onChange = {setNavigationMethod}
                    disabled={!hospital}
                  />
                </Box>
              </Stack>
              </>
                  ) : (
                    <Box/>
                )}
        </TwoPartInteractiveBox>
      </Flex>
      );
};

export default SelectBox;
