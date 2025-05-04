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

  const truncateLanguageSR =
    await PrismaClient.$queryRaw`TRUNCATE TABLE "languageServiceRequest" RESTART IDENTITY CASCADE`;

  const truncateSanitationSR =
    await PrismaClient.$queryRaw`TRUNCATE TABLE "sanitationServiceRequest" RESTART IDENTITY CASCADE`;

  const truncateSecuritySR =
    await PrismaClient.$queryRaw`TRUNCATE TABLE "securityServiceRequest" RESTART IDENTITY CASCADE`;

  const truncateMaintenanceSR =
    await PrismaClient.$queryRaw`TRUNCATE TABLE "maintenanceServiceRequest" RESTART IDENTITY CASCADE`;

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
      { requestID: 15, employeeName: 'Rohan Inmadar', department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 5, 2025", time: "07:16:PM", security: "Building Security", status: "Done", priority: "Medium", hospital: "20 Patriot Place", description: "" },
      { requestID: 16, employeeName: 'Owen Hart', department: "Vein Care Services", createdAt: "2025-04-02T02:39:00Z", date: "May 4, 2025", time: "11:52:AM", security: "Building Security", status: "Done", priority: "Low", hospital: "20 Patriot Place", description: "" },
      { requestID: 17, employeeName: 'Hudson Kortus', department: "Blood Work", createdAt: "2025-04-02T02:39:00Z", date: "May 6, 2025", time: "03:27:PM", security: "Escort Service", status: "Done", priority: "Emergency", hospital: "Chestnut Hill", description: "" },
      { requestID: 18, employeeName: 'Ethan Ramoth', department: "Endocrinology", createdAt: "2025-04-02T02:39:00Z", date: "May 3, 2025", time: "02:13:AM", security: "Safety Hazard", status: "Done", priority: "High", hospital: "20 Patriot Place", description: "" },
      { requestID: 19, employeeName: 'Camden Brayton', department: "Ambulatory Care", createdAt: "2025-04-02T02:39:00Z", date: "May 7, 2025", time: "04:44:PM", security: "Safety Hazard", status: "Done", priority: "Medium", hospital: "Chestnut Hill", description: "" },
      { requestID: 20, employeeName: 'Joseph Abata', department: "Primary Care Check-In", createdAt: "2025-04-02T02:39:00Z", date: "May 8, 2025", time: "10:05:AM", security: "Escort Service", status: "Done", priority: "Low", hospital: "22 Patriot Place", description: "" },
      { requestID: 21, employeeName: 'Connor Daly', department: "Admitting", createdAt: "2025-04-02T02:39:00Z", date: "May 9, 2025", time: "09:32:PM", security: "Building Security", status: "Done", priority: "High", hospital: "Faulkner", description: "" },
      { requestID: 22, employeeName: 'Logan Winters', department: "GI Endoscopy", createdAt: "2025-04-02T02:39:00Z", date: "May 5, 2025", time: "12:28:AM", security: "Surveillance", status: "Done", priority: "Medium", hospital: "Faulkner", description: "" },
      { requestID: 23, employeeName: 'Rohan Inmadar', department: "Weight Management and Metabolic Surgery", createdAt: "2025-04-02T02:39:00Z", date: "May 6, 2025", time: "05:59:AM", security: "Surveillance", status: "Done", priority: "Emergency", hospital: "BWH Campus", description: "" },
      { requestID: 24, employeeName: 'Owen Hart', department: "Gastroenterology and Hepatology", createdAt: "2025-04-02T02:39:00Z", date: "May 4, 2025", time: "06:25:PM", security: "Safety Hazard", status: "Done", priority: "High", hospital: "BWH Campus", description: "" },
    ],
  });

  // defines language SR data
  const languageRequests = await PrismaClient.languageServiceRequest.createMany({
    data: [
      { requestID: 25, employeeName: 'Rohan Inmadar', department: "Gastroenterology and Hepatology", createdAt: "2025-04-02T02:39:00Z", date: "May 5, 2025", time: "01:11:AM", language: "English", status: "Done", priority: "Low", hospital: "BWH Campus", description: "" },
      { requestID: 26, employeeName: 'Owen Hart', department: "Admitting", createdAt: "2025-04-02T02:39:00Z", date: "May 3, 2025", time: "07:48:PM", language: "German", status: "Done", priority: "Emergency", hospital: "Faulkner", description: "" },
      { requestID: 27, employeeName: 'Hudson Kortus', department: "Blood Work", createdAt: "2025-04-02T02:39:00Z", date: "May 6, 2025", time: "03:05:PM", language: "French", status: "Done", priority: "High", hospital: "Chestnut Hill", description: "" },
      { requestID: 28, employeeName: 'Ethan Ramoth', department: "Endocrinology", createdAt: "2025-04-02T02:39:00Z", date: "May 4, 2025", time: "11:36:AM", language: "Spanish", status: "Done", priority: "Medium", hospital: "20 Patriot Place", description: "" },
      { requestID: 29, employeeName: 'Camden Brayton', department: "Ambulatory Care", createdAt: "2025-04-02T02:39:00Z", date: "May 7, 2025", time: "05:22:PM", language: "Afrikaans", status: "Done", priority: "Low", hospital: "Chestnut Hill", description: "" },
      { requestID: 30, employeeName: 'Joseph Abata', department: "Primary Care Check-In", createdAt: "2025-04-02T02:39:00Z", date: "May 8, 2025", time: "09:01:AM", language: "Portuguese", status: "Done", priority: "High", hospital: "22 Patriot Place", description: "" },
      { requestID: 31, employeeName: 'Connor Daly', department: "GI Endoscopy", createdAt: "2025-04-02T02:39:00Z", date: "May 9, 2025", time: "10:34:AM", language: "Italian", status: "Done", priority: "Emergency", hospital: "Faulkner", description: "" },
      { requestID: 32, employeeName: 'Logan Winters', department: "Weight Management and Metabolic Surgery", createdAt: "2025-04-02T02:39:00Z", date: "May 4, 2025", time: "02:14:PM", language: "Polish", status: "Done", priority: "Medium", hospital: "BWH Campus", description: "" },
      { requestID: 33, employeeName: 'Rohan Inmadar', department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 5, 2025", time: "04:50:AM", language: "Russian", status: "Done", priority: "Low", hospital: "20 Patriot Place", description: "" },
      { requestID: 34, employeeName: 'Owen Hart', department: "Vein Care Services", createdAt: "2025-04-02T02:39:00Z", date: "May 7, 2025", time: "08:02:PM", language: "Japanese", status: "Done", priority: "High", hospital: "20 Patriot Place", description: "" },
    ],
  });

  // defines sanitation SR data
  const sanitationRequests = await PrismaClient.sanitationServiceRequest.createMany({
    data: [
      { requestID: 35, employeeName: 'Rohan Inmadar', department: "Endocrinology", createdAt: "2025-04-02T02:39:00Z", date: "May 6, 2025", time: "07:27:PM", cleanupType: "Spill Cleanup", status: "Done", priority: "High", hospital: "20 Patriot Place", description: "" },
      { requestID: 36, employeeName: 'Owen Hart', department: "Primary Care Check-In", createdAt: "2025-04-02T02:39:00Z", date: "May 8, 2025", time: "10:55:AM", cleanupType: "Biohazard Cleanup", status: "Done", priority: "Medium", hospital: "22 Patriot Place", description: "" },
      { requestID: 37, employeeName: 'Hudson Kortus', department: "Blood Work", createdAt: "2025-04-02T02:39:00Z", date: "May 9, 2025", time: "01:14:PM", cleanupType: "Biohazard Cleanup", status: "Done", priority: "High", hospital: "Chestnut Hill", description: "" },
      { requestID: 38, employeeName: 'Ethan Ramoth', department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 5, 2025", time: "11:27:AM", cleanupType: "Trash Cleanup", status: "Done", priority: "Low", hospital: "Faulkner", description: "" },
      { requestID: 39, employeeName: 'Camden Brayton', department: "GI Endoscopy", createdAt: "2025-04-02T02:39:00Z", date: "May 7, 2025", time: "02:43:PM", cleanupType: "Trash Cleanup", status: "Done", priority: "Medium", hospital: "Faulkner", description: "" },
      { requestID: 40, employeeName: 'Joseph Abata', department: "Vein Care Services", createdAt: "2025-04-02T02:39:00Z", date: "May 5, 2025", time: "09:58:AM", cleanupType: "Trash Cleanup", status: "Done", priority: "Low", hospital: "20 Patriot Place", description: "" },
      { requestID: 41, employeeName: 'Connor Daly', department: "Weight Management and Metabolic Surgery", createdAt: "2025-04-02T02:39:00Z", date: "May 4, 2025", time: "02:06:AM", cleanupType: "Spill Cleanup", status: "Done", priority: "High", hospital: "20 Patriot Place", description: "" },
      { requestID: 42, employeeName: 'Logan Winters', department: "Ambulatory Care", createdAt: "2025-04-02T02:39:00Z", date: "May 6, 2025", time: "11:30:PM", cleanupType: "Biohazard Cleanup", status: "Done", priority: "Medium", hospital: "Chestnut Hill", description: "" },
      { requestID: 43, employeeName: 'Rohan Inmadar', department: "Blood Work", createdAt: "2025-04-02T02:39:00Z", date: "May 9, 2025", time: "05:12:PM", cleanupType: "Trash Cleanup", status: "Done", priority: "Low", hospital: "BWH Campus", description: "" },
      { requestID: 44, employeeName: 'Owen Hart', department: "Ambulatory Care", createdAt: "2025-04-02T02:39:00Z", date: "May 7, 2025", time: "04:55:PM", cleanupType: "Spill Cleanup", status: "Done", priority: "High", hospital: "BWH Campus", description: "" },
    ],
  });


  // defines security SR data
  const maintenanceRequests = await PrismaClient.maintenanceServiceRequest.createMany({
    data: [
      { requestID: 45, employeeName: 'Rohan Inmadar', department: "Pulmonary", createdAt: "2025-04-02T02:39:00Z", date: "May 3, 2025", time: "08:24:PM", maintenanceType: "Medical Equipment", status: "Done", priority: "Low", hospital: "22 Patriot Place", description: "" },
      { requestID: 46, employeeName: 'Owen Hart', department: "Ambulatory Care", createdAt: "2025-04-02T02:39:00Z", date: "May 6, 2025", time: "01:12:AM", maintenanceType: "Plumbing", status: "Done", priority: "Emergency", hospital: "Chestnut Hill", description: "" },
      { requestID: 47, employeeName: 'Hudson Kortus', department: "Blood Work", createdAt: "2025-04-02T02:39:00Z", date: "May 7, 2025", time: "11:48:PM", maintenanceType: "Electrical", status: "Done", priority: "Medium", hospital: "Chestnut Hill", description: "" },
      { requestID: 48, employeeName: 'Ethan Ramoth', department: "Primary Care Check-In", createdAt: "2025-04-02T02:39:00Z", date: "May 4, 2025", time: "06:35:AM", maintenanceType: "Building Structure", status: "Done", priority: "High", hospital: "22 Patriot Place", description: "" },
      { requestID: 49, employeeName: 'Camden Brayton', department: "Admitting", createdAt: "2025-04-02T02:39:00Z", date: "May 5, 2025", time: "02:19:PM", maintenanceType: "Elevator", status: "Done", priority: "Low", hospital: "Faulkner", description: "" },
      { requestID: 50, employeeName: 'Joseph Abata', department: "Nutrition", createdAt: "2025-04-02T02:39:00Z", date: "May 6, 2025", time: "10:57:AM", maintenanceType: "HVAC", status: "Done", priority: "Medium", hospital: "20 Patriot Place", description: "" },
      { requestID: 51, employeeName: 'Connor Daly', department: "Endocrinology", createdAt: "2025-04-02T02:39:00Z", date: "May 3, 2025", time: "03:08:PM", maintenanceType: "Medical Equipment", status: "Done", priority: "Emergency", hospital: "20 Patriot Place", description: "" },
      { requestID: 52, employeeName: 'Logan Winters', department: "Gastroenterology and Hepatology", createdAt: "2025-04-02T02:39:00Z", date: "May 8, 2025", time: "07:31:AM", maintenanceType: "Plumbing", status: "Done", priority: "High", hospital: "BWH Campus", description: "" },
      { requestID: 53, employeeName: 'Rohan Inmadar', department: "Weight Management and Metabolic Surgery", createdAt: "2025-04-02T02:39:00Z", date: "May 2, 2025", time: "09:14:PM", maintenanceType: "Electrical", status: "Done", priority: "Medium", hospital: "BWH Campus", description: "" },
      { requestID: 54, employeeName: 'Owen Hart', department: "Vein Care Services", createdAt: "2025-04-02T02:39:00Z", date: "May 9, 2025", time: "12:02:AM", maintenanceType: "Building Structure", status: "Done", priority: "High", hospital: "20 Patriot Place", description: "" },
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
            { dName: 'Electromyography (EMG)', building: '20 Patriot Place', description: 'emg', absoluteCoords: [0,0] },
            { dName: 'Nutrition', building: '20 Patriot Place', description: 'nutrition', absoluteCoords: [0,0] },
            { dName: 'Pain Medicine', building: '20 Patriot Place', description: 'pain-medicine', absoluteCoords: [0,0] },
            { dName: 'Pulmonary Function Testing', building: '20 Patriot Place', description: 'pft', absoluteCoords: [0,0] },
            { dName: 'Day Surgery Center', building: '20 Patriot Place', description: 'dsc', absoluteCoords: [0,0] },
            { dName: 'Surgical Specialties', building: '20 Patriot Place', description: 'surgical-specialties', absoluteCoords: [0,0] },
            { dName: 'Audiology', building: '20 Patriot Place', description: 'audiology', absoluteCoords: [0,0] },
            { dName: 'ENT', building: '20 Patriot Place', description: 'ent', absoluteCoords: [0,0] },
            { dName: 'General and Gastrointestinal Surgery', building: '20 Patriot Place', description: 'gi-surgery', absoluteCoords: [0,0] },
            { dName: 'Plastic Surgery', building: '20 Patriot Place', description: 'plastic-surgery', absoluteCoords: [0,0] },
            { dName: 'Thoracic Surgery', building: '20 Patriot Place', description: 'thoracic-surgery', absoluteCoords: [0,0] },
            { dName: 'Vascular Surgery', building: '20 Patriot Place', description: 'vascular-surgery', absoluteCoords: [0,0] },
            { dName: 'Weight Management and Wellness', building: '20 Patriot Place', description: 'wellness', absoluteCoords: [0,0] },
            { dName: 'Sports Medicine Center', building: '20 Patriot Place', description: 'sport-medicine', absoluteCoords: [0,0] },
            { dName: 'X-Ray Suite', building: '20 Patriot Place', description: 'xray', absoluteCoords: [0,0] },
            { dName: 'Orthopaedics', building: '20 Patriot Place', description: 'orthopaedics', absoluteCoords: [0,0] },
            { dName: 'Hand and Upper Extremity', building: '20 Patriot Place', description: 'hand-upper-extremity', absoluteCoords: [0,0] },
            { dName: 'Arthroplasty', building: '20 Patriot Place', description: 'arthroplasty', absoluteCoords: [0,0] },
            { dName: 'Pediatric Trauma', building: '20 Patriot Place', description: 'pediatric-trauma', absoluteCoords: [0,0] },
            { dName: 'Physiatry', building: '20 Patriot Place', description: 'physiatry', absoluteCoords: [0,0] },
            { dName: 'Podiatry', building: '20 Patriot Place', description: 'podiatry', absoluteCoords: [0,0] },
            { dName: 'Rehabilitation Services', building: '20 Patriot Place', description: 'rehab', absoluteCoords: [0,0] },
            { dName: 'Cardiac Rehab', building: '20 Patriot Place', description: 'cardiac-rehab', absoluteCoords: [0,0] },
            { dName: 'Occupational Therapy', building: '20 Patriot Place', description: 'occupational-therapy', absoluteCoords: [0,0] },
            { dName: 'Hand Therapy', building: '20 Patriot Place', description: 'hand-therapy', absoluteCoords: [0,0] },
            { dName: 'Upper Extremity', building: '20 Patriot Place', description: 'upper-extremity', absoluteCoords: [0,0] },
            { dName: 'Physical Therapy', building: '20 Patriot Place', description: 'physical-therapy', absoluteCoords: [0,0] },
            { dName: 'Speech - Language', building: '20 Patriot Place', description: 'speech-language', absoluteCoords: [0,0] },
            { dName: 'Clinical Lab', building: '20 Patriot Place', description: 'clinical-lab', absoluteCoords: [0,0] },
            { dName: 'Surgi-Care', building: '20 Patriot Place', description: 'surg-care', absoluteCoords: [0,0] },
            { dName: 'Blood Draw/Phlebotomy', building: '20 Patriot Place', description: 'blood-draw', absoluteCoords: [0,0] },
            { dName: 'Pharmacy', building: '20 Patriot Place', description: 'pharmacy', absoluteCoords: [0,0] },
            { dName: 'Radiology', building: '20 Patriot Place', description: 'radiology', absoluteCoords: [0,0] },
            { dName: 'Cardiovascular Services', building: '20 Patriot Place', description: 'cardiovascular', absoluteCoords: [0,0] },
            { dName: 'Urology', building: '20 Patriot Place', description: 'urology', absoluteCoords: [0,0] },
            { dName: 'Urgent Care Center', building: '20 Patriot Place', description: 'urgent-care', absoluteCoords: [0,0] },
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
