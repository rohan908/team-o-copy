import PrismaClient from '../../../apps/backend/src/bin/prisma-client';

/*
    Create all initial database values here
    Run "yarn workspace database seed" to populate the table
 */
export async function populate() {

    // !!! NEED TO ADD EMPLOYEE DATA BACK !!!

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
            { dName: 'Patient Financial Services', building: 'Patriot-22', description: 'financial-services', absoluteCoords: [0,0] },
        ],
        skipDuplicates: true,
    });

    // !!! Will want image bitmaps created here !!!

    console.log("\nSuccessfully populated tables\n");
}

// Runs populate on the prisma client
populate()
    .then(async () => {
        await PrismaClient.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await PrismaClient.$disconnect()
    })
