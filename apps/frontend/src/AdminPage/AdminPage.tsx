import React, { useState } from 'react';
import { DatabaseController } from './DatabaseController';
import { CSVTable } from './CSVTable';
import {useMantineTheme,Collapse, Button, Divider, Center } from '@mantine/core'
import { useNavigate } from 'react-router-dom';
import Language from "../service-request/service.tsx";
import LanguageRequestHistory from "./LanguageRequestHistory.tsx";

export function AdminPage() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/language-request-history');
  }

    const [showPreview, setShowPreview] = useState(false); // state to control the collapsible section

    return (

      <div className="p-4 sm:p-6 md:p-10 max-w-4xl mx-auto w-full">
        <h1 className="font-bold text-xl mb-4 text-center">Admin Page</h1>
        <Center>
        <Button
            size="md"
            color="dark"
            fw="600"
            bg="black"
            mt="sm"
            style={{
              borderRadius: '50px',
              transition: 'all 0.3s ease',
            }}
            onClick= {handleClick}
          >
            Language Request Form History
          </Button>
        </Center>
          <br/>
          <Divider
            my="md"
            size="sm"
            style={{
              borderTop: '1px dotted black',
            }}
          />
          <br/>
          {/* CSV Import/Export Controls */}
          <DatabaseController table="directory" />

          {/* Toggle Button */}
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              onClick={() => setShowPreview((prev) => !prev)}
            >
              {showPreview ? 'Hide Directory Preview' : 'Preview Directory'}
            </Button>
          </div>

          {/* Collapsible CSV Table */}
          <Collapse in={showPreview} transitionDuration={200}>
            <div className="mt-4">
              <CSVTable table="directory" />
            </div>
          </Collapse>
        </div>

    );
}

export default AdminPage;
