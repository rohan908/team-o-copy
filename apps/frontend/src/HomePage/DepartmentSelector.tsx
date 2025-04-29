import { Autocomplete, Select, useMantineTheme } from '@mantine/core';
import {IconBuilding, IconCheckupList, IconChevronDown, IconHospital} from '@tabler/icons-react';
import { DirectoryNodeItem } from '../contexts/DirectoryItem.ts';
import { useTimeline } from './TimeLineContext.tsx';
import { NavSelectionItem } from '../contexts/NavigationItem.ts';
import { useNavSelectionContext } from '../contexts/NavigationContext.tsx';
import {useEffect, useState} from "react";

interface DepartmentSelectorProps {
  hasIcon: boolean
  w: string
}

export function DepartmentSelector(props:DepartmentSelectorProps) {
    const theme = useMantineTheme();
    const [dummyState, setDummyState] = useState(0)
    const [realDept, setRealDept] = useState<string>("");

    const { directoryOptions, selectedHospital, setDepartment, selectedAlgorithm, department } =
        useTimeline();
    const NavSelection = useNavSelectionContext();

    const setSelectedDepartment = (department: string | null) => {
        setDepartment(department);
        if (selectedAlgorithm) {
            NavSelection.dispatch({
                type: 'SET_NAV_REQUEST',
                data: {
                    HospitalName: selectedHospital,
                    Department: department,
                    AlgorithmName: selectedAlgorithm,
                } as NavSelectionItem,
            });
        }
    };

    return (
        <Select
          searchable
            placeholder="Select a Department"
            rightSection={
              <IconChevronDown size="16" style={{ color: theme.colors.primaryBlues[8] }} />
            }
            leftSection={!props.hasIcon ? null :
              <IconCheckupList size="16" style={{ color: theme.colors.primaryBlues[8]}} />
            }
            data={directoryOptions}
            onChange={setSelectedDepartment}
            value={department}
            radius="md"
            mb="sm"
            size="xs"
            disabled={!selectedHospital && directoryOptions.length === 0}
            w={props.w}
        />
    );
}
