import React from 'react';
import {DatabaseController} from './DatabaseController';
import {CSVTable} from './CSVTable';
import {useMantineTheme, Table, Button, Divider } from '@mantine/core'
import { useNavigate } from 'react-router-dom';

import Language from "../service-request/service.tsx";
import LanguageRequestHistory from "./LanguageRequestHistory.tsx";

export function AdminPage() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/language-request-history');
  }

    return (
      <div>
        <div className="p-10">
          <h1 className="font-bold text-xl pb-4">Admin Page</h1>
          <Button
            size="md"
            color="dark"
            fw="600"
            bg="black"
            //leftSection={<IconArrowRight size={14} />}
            style={{
              borderRadius: '50px',
              transition: 'all 0.3s ease',
            }}
            onClick= {handleClick}
          >
            Language Request Form History
          </Button>
          <br/>
          <Divider
            my="md"
            size="sm"
            style={{
              borderTop: '1px dotted black',
            }}
          />
          <br/>
          <DatabaseController table={"directory"}></DatabaseController>
          <CSVTable table="directory"/>
        </div>
      </div>
    );
}

export default AdminPage;
