import fs from 'fs';

// function called to get data from backup.csv for directory department names
export async function parseFullDirectory() {
    // define list of objects for each building containing building name and
    // a "slug" of the name (this is to be used in a url), coords for the map
    const Patriot20: { title: string; slug: string; coords: number[] }[] = [];
    const Patriot22: { title: string; slug: string; coords: number[] }[] = [];

    // gets filepath of csv
    const filePath = './backup.csv';

    // gets data from file as string
    const csvData = fs.readFileSync(filePath, 'utf-8');

    // split data into rows to be parsed through
    const rows = csvData.trim().split('\n');

    // looping through every row of the csv (skipping line 1 which is headers)
    // to get the first column data (department name), and sort them
    // based on what building they're in
    for (let i = 1; i < rows.length; i++) {
        // current
        const row = rows[i];

        const firstCommaIndex = row.indexOf(',');
        const secondCommaIndex = row.indexOf(',', firstCommaIndex + 1);
        const thirdCommaIndex = row.indexOf(',', secondCommaIndex + 1);
        const fourthCommaIndex = row.indexOf(',', thirdCommaIndex + 1);
        const fifthCommaIndex = row.indexOf(',', fourthCommaIndex + 1);

        // gets the 1st, 2nd, and 3rd element of each row --> 1st item is department
        // 2nd is building, 3rd is slug

        // try and rework for efficiency and readibility
        const departmentName = row.slice(0, firstCommaIndex);
        const buildingNum = row.slice(firstCommaIndex + 1, secondCommaIndex);
        const slugVal = row.slice(secondCommaIndex + 1, thirdCommaIndex);
        const absCoord1 = parseInt(row.slice(thirdCommaIndex + 2, fourthCommaIndex));
        const absCoord2 = parseInt(row.slice(fourthCommaIndex + 1, fifthCommaIndex));
        const absCoord3 = parseInt(row.slice(fifthCommaIndex + 1, row.length - 1));

        // checks for building number, puts into proper array
        if (buildingNum == 'Patriot-20') {
            Patriot20.push({
                title: departmentName,
                slug: slugVal,
                coords: [absCoord1, absCoord2, 0],
            });
        } else if (buildingNum == 'Patriot-22') {
            Patriot22.push({
                title: departmentName,
                slug: slugVal,
                coords: [absCoord1, absCoord2, 0],
            });
        } else {
            console.log(
                'Building number must be entered with the format "building-num" where num is the number.'
            );
        }
    }
    return [Patriot20, Patriot22];
}

/*
export async function parseDirectoryData() {

// -- old data from before directory read from database, kept it for reference
    const Patriot20 = [
        {title: 'Electromyography (EMG)', slug: 'emg'},
        {title: 'Nutrition', slug: 'nutrition'},
        {title: 'Pain Medicine', slug: 'pain-medicine'},
        {title: 'Pulmonary Function Testing', slug: 'pft'},
        {title: 'Day Surgery Center', slug: 'dsc'},
        {title: 'Surgical Specialties', slug: 'surgical-specialties'},
        {title: 'Audiology', slug: 'audiology'},
        {title: 'ENT', slug: 'ent'},
        {title: 'General and Gastrointestinal Surgery', slug: 'gi-surgery'},
        {title: 'Plastic Surgery', slug: 'plastic-surgery'},
        {title: 'Thoracic Surgery', slug: 'thoracic-surgery'},
        {title: 'Vascular Surgery', slug: 'vascular-surgery'},
        {title: 'Weight Management and Wellness', slug: 'wellness'},
        {title: 'Sports Medicine Center', slug: 'sport-medicine'},
        {title: 'X-Ray Suite', slug: 'xray'},
        {title: 'Orthopaedics', slug: 'orthopaedics'},
        {title: 'Hand and Upper Extremity', slug: 'hand-upper-extremity'},
        {title: 'Arthroplasty', slug: 'arthroplasty'},
        {title: 'Pediatric Trauma', slug: 'pediatric-trauma'},
        {title: 'Physiatry', slug: 'physiatry'},
        {title: 'Podiatry', slug: 'podiatry'},
        {title: 'Rehabilitation Services', slug: 'rehab'},
        {title: 'Cardiac Rehab', slug: 'cardiac-rehab'},
        {title: 'Occupational Therapy', slug: 'occupational-therapy'},
        {title: 'Hand Therapy', slug: 'hand-therapy'},
        {title: 'Upper Extremity', slug: 'upper-extremity'},
        {title: 'Physical Therapy', slug: 'physical-therapy'},
        {title: 'Speech - Language', slug: 'speech-language'},
        {title: 'Clinical Lab', slug: 'clinical-lab'},
        {title: 'Surgi-Care', slug: 'surg-care'},
        {title: 'Blood Draw/Phlebotomy', slug: 'blood-draw'},
        {title: 'Pharmacy', slug: 'pharmacy'},
        {title: 'Radiology', slug: 'radiology'},
        {title: 'Cardiovascular Services', slug: 'cardiovascular'},
        {title: 'Urology', slug: 'urology'},
        {title: 'Urgent Care Center', slug: 'urgent-care'},
    ];

    const Patriot22 = [
        {title: 'Blood Draw/Phlebotomy', slug: 'blood-draw'},
        {title: 'Community Room', slug: 'community'},
        {title: 'Primary Care', slug: 'primary-care'},
        {title: 'Multi Specialty Clinic', slug: 'specialty-clinic'},
        {title: 'Allergy', slug: 'allergy'},
        {title: 'Cardiac Arrhythmia', slug: 'cardiac-arrhythmia'},
        {title: 'Dermatology', slug: 'dermatology'},
        {title: 'Endocrinology', slug: 'endocrinology'},
        {title: 'Kidney Renal Medicine', slug: 'krm'},
        {title: 'Neurology', slug: 'neurology'},
        {title: 'Neurosurgery', slug: 'neurosurgery'},
        {title: 'Ophthalmology', slug: 'ophthalmology'},
        {title: 'Optometry', slug: 'optometry'},
        {title: 'Pulmonology', slug: 'pulmonology'},
        {title: 'Rheumatology', slug: 'rheumatology'},
        {title: 'Vein Care Services', slug: 'vcs'},
        {title: 'Women\'s Health', slug: 'woman\'s-Health'},
        {title: 'Patient Financial Services', slug: 'financial-services'},
    ];

    return {Patriot20, Patriot22};
}
*/
