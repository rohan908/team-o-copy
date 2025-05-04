import { Select, useMantineTheme } from '@mantine/core';
import { IconCheckupList, IconChevronDown } from '@tabler/icons-react';
import { useTimeline } from './TimeLineContext.tsx';
import { NavSelectionItem } from '../contexts/NavigationItem.ts';
import { useNavSelectionContext } from '../contexts/NavigationContext.tsx';
import { useEffect, useRef, useState } from 'react';

interface DepartmentSelectorProps {
  hasIcon: boolean;
  w: string;
}

export function DepartmentSelector(props: DepartmentSelectorProps) {
  const theme = useMantineTheme();
  const { directoryOptions, selectedHospital, setDepartment, department } = useTimeline();
  const NavSelection = useNavSelectionContext();

  const [userSelected, setUserSelected] = useState(false);
  const hasAutoSelected = useRef(false); // prevent repeated auto-selections

  const setSelectedDepartment = (department: string | null, isUserAction = false) => {
    setDepartment(department);
    if (isUserAction) setUserSelected(true);
    NavSelection.dispatch({
      type: 'SET_NAV_REQUEST',
      data: {
        HospitalName: selectedHospital,
        Department: department,
      } as NavSelectionItem,
    });
  };
/* I'm going to be honest, this is a stupid fix to our problem. By automatically selecting and deselecting
a department from the dropdown list, it forces the camera to update. However, this still maintains the user's choice
need be. Unfortunately it is still a useEffect. The few flaws this approach has are likely mitigated by proper
website navigation.*/
  useEffect(() => {
    hasAutoSelected.current = false;
    setUserSelected(false);

    if (
      selectedHospital &&
      directoryOptions.length >= 2 &&
      !userSelected &&
      !department
    ) {
      const secondOption = typeof directoryOptions[1] === 'string'
        ? directoryOptions[1]
        : directoryOptions[1].value;

      setSelectedDepartment(secondOption);

      setTimeout(() => {
        if (!userSelected) {
          setSelectedDepartment(null);
        }
        hasAutoSelected.current = true;
      }, 0);
    }
  }, [selectedHospital]);


  return (
    <Select
      searchable
      placeholder="Select a Department"
      rightSection={
        <IconChevronDown size="16" style={{ color: theme.colors.primaryBlues[8] }} />
      }
      leftSection={
        !props.hasIcon ? null : (
          <IconCheckupList size="16" style={{ color: theme.colors.primaryBlues[8] }} />
        )
      }
      data={directoryOptions}
      onChange={(value) => setSelectedDepartment(value, true)}
      value={department}
      mb="sm"
      radius="md"
      size="xs"
      disabled={!selectedHospital && directoryOptions.length === 0}
      w={props.w}
    />
  );
}
