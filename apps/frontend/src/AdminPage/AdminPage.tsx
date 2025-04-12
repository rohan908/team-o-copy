import React, { useState } from 'react';
import { DatabaseController } from './DatabaseController';
import { CSVTable } from './CSVTable';
import {useMantineTheme,Collapse, Button, Divider, Center, Title } from '@mantine/core'
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
        <Title order={1} className="mb-4 text-center" fw={600}>
          Admin Page
        </Title>

        <Center>
        <Button
            variant="outline"
            size="md"
            color="black"
            fw="600"
            className="nav-element hover-shadow"
            mt="sm"
            styles={{
              root: {
                borderRadius: '50px',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: '#93c5fd',
                  borderColor: 'black',
                  backgroundColor: 'transparent',
                }
              }
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
            color="gray.3"
            className="border-t border-dotted border-gray-300"
          />
          <br/>
          {/* CSV Import/Export Controls */}
          <DatabaseController table="directory" />

          {/* Toggle Button */}
          <Center mt="md">
            <Button
              variant="outline"
              color="dark"
              onClick={() => setShowPreview((prev) => !prev)}
              className="nav-element hover-shadow"
              size="md"
              styles={{
                root: {
                  color: '#93c5fd',
                  boderColor: 'black',
                  backgroundColor: 'transparent',
                }
              }}
              >
              {showPreview ? 'Hide Directory Preview' : 'Directory Preview'}
            </Button>
          </Center>

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
