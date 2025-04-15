import {Select, SelectProps } from '@mantine/core';
import {Patriot20, Patriot22, ChestnutHill, HospitalDepartment} from '../../directory/components/directorydata.tsx'

interface DepartmentProps extends SelectProps {
  hospital: string;
}

const DepartmentSelect: React.FC<DepartmentProps> = (props, hospital) => {
  let departments: HospitalDepartment[] = [];

  switch (hospital) {
    case '20 Patriot Place':
      departments = Patriot20;
      break;
    case '22 Patriot Place':
      departments = Patriot22;
      break;
    case 'Chestnut Hill':
      departments = ChestnutHill;
      break;
    default:
      departments = [];
  }
// both are title because we don't need the slug but need to satisfy the Mantine
  const departmentOptions = departments.map((dept) => ({
    value: dept.title,
    label: dept.title,
  }));
  return (
    <Select
      label="Choose the Department"
      placeholder={
        hospital ? '--Select a Department--' : 'Select hospital first'
      }
      searchable
      data={departmentOptions}
      nothingFoundMessage="Directory not found"
      radius="sm"
      disabled={!hospital}
      mb="sm"
      size = "xs"
      {...props}
    />
  );
};

export default DepartmentSelect;
