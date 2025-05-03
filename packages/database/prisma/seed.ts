import PrismaClient from '../../../apps/backend/src/bin/prisma-client';
import { calculateWeight, edgeData } from '../../common/src/MapHelper.ts';
import { getNodeData } from './SeedData.ts';

/*
    Create all initial database values here
    Run "yarn workspace database seed" to populate the table
 */
export async function populate() {
    // !!! NEED TO ADD EMPLOYEE DATA BACK !!!

    // clears all map data for seeding
    const truncateNodes =
        await PrismaClient.$queryRaw`TRUNCATE TABLE "Node" RESTART IDENTITY CASCADE`;
    const truncateEdges =
        await PrismaClient.$queryRaw`TRUNCATE TABLE "Edge" RESTART IDENTITY CASCADE`;
    const truncateMaps =
        await PrismaClient.$queryRaw`TRUNCATE TABLE "FloorMap" RESTART IDENTITY CASCADE`;

    // ------------------------------------------- //
    // Example floor map and node set up. Writing a script on the front end so we can paste will be much better

    // defines floor maps for each building floor
    const floorMaps = await PrismaClient.floorMap.createMany({
        data: [
            { name: 'Patriot', id: 1 },
            { name: 'Chestnut', id: 2 },
            { name: 'Falkner', id: 3 },
            { name: 'BWH', id: 4 },
        ],
        skipDuplicates: true,
    });

    const Algorithm = await PrismaClient.algorithm.upsert({
        //what da hell boi
        where: { id: 0 },
        update: {},
        create: {
            id: 0,
            algoID: 0,
        },
    });

  // defines security SR data
  const securityRequests = await PrismaClient.securityServiceRequest.createMany({
    data: [
      { requestID: 15, employeeName: 'Rohan Inmadar',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", security: "Safety Hazard", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 16, employeeName: 'Owen Hart',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", security: "Safety Hazard", status: "Done", priority: "High", hospital: "Patriot-22", description: ""},
      { requestID: 17, employeeName: 'Hudson Kortus',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", security: "Safety Hazard", status: "Done", priority: "High", hospital: "Chestnut Hill", description: ""},
      { requestID: 18, employeeName: 'Ethan Ramoth',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", security: "Safety Hazard", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 19, employeeName: 'Camden Brayton',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", security: "Safety Hazard", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 20, employeeName: 'Joseph Abata',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", security: "Safety Hazard", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 21, employeeName: 'Connor Daly',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", security: "Safety Hazard", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 22, employeeName: 'Logan Winters',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", security: "Safety Hazard", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 23, employeeName: 'Rohan Inmadar',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", security: "Safety Hazard", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 24, employeeName: 'Owen Hart',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", security: "Safety Hazard", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
    ],
  });

  // defines language  SR data
  const languageRequests = await PrismaClient.languageServiceRequest.createMany({
    data: [
      { requestID: 25, employeeName: 'Rohan Inmadar',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", language: "English", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 26, employeeName: 'Owen Hart',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", language: "German", status: "Done", priority: "High", hospital: "Patriot-22", description: ""},
      { requestID: 27, employeeName: 'Hudson Kortus',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", language: "French", status: "Done", priority: "High", hospital: "Chestnut Hill", description: ""},
      { requestID: 28, employeeName: 'Ethan Ramoth',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", language: "Spanish", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 29, employeeName: 'Camden Brayton',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", language: "Afrikaans", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 30, employeeName: 'Joseph Abata',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", language: "Portuguese", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 31, employeeName: 'Connor Daly',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", language: "Italian", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 32, employeeName: 'Logan Winters',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", language: "Polish", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 33, employeeName: 'Rohan Inmadar',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", language: "Russian", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 34, employeeName: 'Owen Hart',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", language: "Japanese", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
    ],
  });

  // defines sanitation SR data
  const sanitationRequests = await PrismaClient.sanitationServiceRequest.createMany({
    data: [
      { requestID: 35, employeeName: 'Rohan Inmadar',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", cleanupType: "Spill Cleanup", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 36, employeeName: 'Owen Hart',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", cleanupType: "Biohazard Cleanup", status: "Done", priority: "High", hospital: "Patriot-22", description: ""},
      { requestID: 37, employeeName: 'Hudson Kortus',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", cleanupType: "General Room Cleaning", status: "Done", priority: "High", hospital: "Chestnut Hill", description: ""},
      { requestID: 38, employeeName: 'Ethan Ramoth',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", cleanupType: "Waste Removal", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 39, employeeName: 'Camden Brayton',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", cleanupType: "Waste Removal", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 40, employeeName: 'Joseph Abata',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", cleanupType: "Floor Cleaning (mop, vacuum, etc.)", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 41, employeeName: 'Connor Daly',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", cleanupType: "Floor Cleaning (mop, vacuum, etc.)", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 42, employeeName: 'Logan Winters',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", cleanupType: "Restroom Cleaning", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 43, employeeName: 'Rohan Inmadar',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", cleanupType: "Restroom Cleaning", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
      { requestID: 44, employeeName: 'Owen Hart',  department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "02:39:AM", cleanupType: "Spill Cleanup", status: "Done", priority: "High", hospital: "Patriot-20", description: ""},
    ],
  });

    // adds all node data from /SeedData.ts
    const addDefaultNodes = await PrismaClient.node.createManyAndReturn({
        data: getNodeData(),
    });

    // adds all edges based on connecting nodes in each node
    for (const node of addDefaultNodes) {
        const connections = node.connectingNodes;

        for (const connectingID of connections) {
            const nodeToConnect = await PrismaClient.node.findUnique({
                where: { id: connectingID },
            });

            const addEdge = await PrismaClient.edge.createMany({
                data: edgeData(node, nodeToConnect, 1),
                skipDuplicates: true,
            });
        }
    }

    console.log('\nSuccessfully populated tables\n');
}

// Runs populate on the prisma client
populate()
    .then(async () => {
        await PrismaClient.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await PrismaClient.$disconnect();
    });

/*
// All old directory data:

// Clears directory table for placing default values
    const truncateDirectory = await PrismaClient.directory.deleteMany({});

    // All the default directory information for 20 Patriot Place
    // !!! FILL IN COORDINATE DATA HERE WHEN IMAGES ARE DONE !!!
    const directoriesPatriot20 = await PrismaClient.directory.createMany({
        data: [
            { dName: 'Electromyography (EMG)', building: 'Patriot-20', description: 'emg', absoluteCoords: [0,0] },
            { dName: 'Nutrition', building: 'Patriot-20', description: 'nutrition', absoluteCoords: [0,0] },
            { dName: 'Pain Medicine', building: 'Patriot-20', description: 'pain-medicine', absoluteCoords: [0,0] },
            { dName: 'Pulmonary Function Testing', building: 'Patriot-20', description: 'pft', absoluteCoords: [0,0] },
            { dName: 'Day Surgery Center', building: 'Patriot-20', description: 'dsc', absoluteCoords: [0,0] },
            { dName: 'Surgical Specialties', building: 'Patriot-20', description: 'surgical-specialties', absoluteCoords: [0,0] },
            { dName: 'Audiology', building: 'Patriot-20', description: 'audiology', absoluteCoords: [0,0] },
            { dName: 'ENT', building: 'Patriot-20', description: 'ent', absoluteCoords: [0,0] },
            { dName: 'General and Gastrointestinal Surgery', building: 'Patriot-20', description: 'gi-surgery', absoluteCoords: [0,0] },
            { dName: 'Plastic Surgery', building: 'Patriot-20', description: 'plastic-surgery', absoluteCoords: [0,0] },
            { dName: 'Thoracic Surgery', building: 'Patriot-20', description: 'thoracic-surgery', absoluteCoords: [0,0] },
            { dName: 'Vascular Surgery', building: 'Patriot-20', description: 'vascular-surgery', absoluteCoords: [0,0] },
            { dName: 'Weight Management and Wellness', building: 'Patriot-20', description: 'wellness', absoluteCoords: [0,0] },
            { dName: 'Sports Medicine Center', building: 'Patriot-20', description: 'sport-medicine', absoluteCoords: [0,0] },
            { dName: 'X-Ray Suite', building: 'Patriot-20', description: 'xray', absoluteCoords: [0,0] },
            { dName: 'Orthopaedics', building: 'Patriot-20', description: 'orthopaedics', absoluteCoords: [0,0] },
            { dName: 'Hand and Upper Extremity', building: 'Patriot-20', description: 'hand-upper-extremity', absoluteCoords: [0,0] },
            { dName: 'Arthroplasty', building: 'Patriot-20', description: 'arthroplasty', absoluteCoords: [0,0] },
            { dName: 'Pediatric Trauma', building: 'Patriot-20', description: 'pediatric-trauma', absoluteCoords: [0,0] },
            { dName: 'Physiatry', building: 'Patriot-20', description: 'physiatry', absoluteCoords: [0,0] },
            { dName: 'Podiatry', building: 'Patriot-20', description: 'podiatry', absoluteCoords: [0,0] },
            { dName: 'Rehabilitation Services', building: 'Patriot-20', description: 'rehab', absoluteCoords: [0,0] },
            { dName: 'Cardiac Rehab', building: 'Patriot-20', description: 'cardiac-rehab', absoluteCoords: [0,0] },
            { dName: 'Occupational Therapy', building: 'Patriot-20', description: 'occupational-therapy', absoluteCoords: [0,0] },
            { dName: 'Hand Therapy', building: 'Patriot-20', description: 'hand-therapy', absoluteCoords: [0,0] },
            { dName: 'Upper Extremity', building: 'Patriot-20', description: 'upper-extremity', absoluteCoords: [0,0] },
            { dName: 'Physical Therapy', building: 'Patriot-20', description: 'physical-therapy', absoluteCoords: [0,0] },
            { dName: 'Speech - Language', building: 'Patriot-20', description: 'speech-language', absoluteCoords: [0,0] },
            { dName: 'Clinical Lab', building: 'Patriot-20', description: 'clinical-lab', absoluteCoords: [0,0] },
            { dName: 'Surgi-Care', building: 'Patriot-20', description: 'surg-care', absoluteCoords: [0,0] },
            { dName: 'Blood Draw/Phlebotomy', building: 'Patriot-20', description: 'blood-draw', absoluteCoords: [0,0] },
            { dName: 'Pharmacy', building: 'Patriot-20', description: 'pharmacy', absoluteCoords: [0,0] },
            { dName: 'Radiology', building: 'Patriot-20', description: 'radiology', absoluteCoords: [0,0] },
            { dName: 'Cardiovascular Services', building: 'Patriot-20', description: 'cardiovascular', absoluteCoords: [0,0] },
            { dName: 'Urology', building: 'Patriot-20', description: 'urology', absoluteCoords: [0,0] },
            { dName: 'Urgent Care Center', building: 'Patriot-20', description: 'urgent-care', absoluteCoords: [0,0] },
        ],
        skipDuplicates: true,
    });
    const directoriesPatriot22 = await PrismaClient.directory.createMany({
        data: [
            { dName: 'Blood Draw/Phlebotomy', building: 'Patriot-22', description: 'blood-draw', absoluteCoords: [0,0] },
            { dName: 'Community Room', building: 'Patriot-22', description: 'community', absoluteCoords: [0,0] },
            { dName: 'Primary Care', building: 'Patriot-22', description: 'primary-care', absoluteCoords: [0,0] },
            { dName: 'Multi Specialty Clinic', building: 'Patriot-22', description: 'specialty-clinic', absoluteCoords: [0,0] },
            { dName: 'Allergy', building: 'Patriot-22', description: 'allergy', absoluteCoords: [0,0] },
            { dName: 'Cardiac Arrhythmia', building: 'Patriot-22', description: 'cardiac-arrhythmia', absoluteCoords: [0,0] },
            { dName: 'Dermatology', building: 'Patriot-22', description: 'dermatology', absoluteCoords: [0,0] },
            { dName: 'Endocrinology', building: 'Patriot-22', description: 'endocrinology', absoluteCoords: [0,0] },
            { dName: 'Kidney Renal Medicine', building: 'Patriot-22', description: 'krm', absoluteCoords: [0,0] },
            { dName: 'Neurology', building: 'Patriot-22', description: 'neurology', absoluteCoords: [0,0] },
            { dName: 'Neurosurgery', building: 'Patriot-22', description: 'neurosurgery', absoluteCoords: [0,0] },
            { dName: 'Ophthalmology', building: 'Patriot-22', description: 'ophthalmology', absoluteCoords: [0,0] },
            { dName: 'Optometry', building: 'Patriot-22', description: 'optometry', absoluteCoords: [0,0] },
            { dName: 'Pulmonology', building: 'Patriot-22', description: 'pulmonology', absoluteCoords: [0,0] },
            { dName: 'Rheumatology', building: 'Patriot-22', description: 'rheumatology', absoluteCoords: [0,0] },
            { dName: 'Vein Care Services', building: 'Patriot-22', description: 'vcs', absoluteCoords: [0,0] },
            { dName: 'Women\'s Health', building: 'Patriot-22', description: 'woman\'s-Health', absoluteCoords: [0,0] },
            { dName: 'Patient Financial Services', building: 'Patriot-22', description: 'financial-OldMapServices', absoluteCoords: [0,0] },
        ],
        skipDuplicates: true,
    });
 */
