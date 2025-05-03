export function MergeForms(groupedArrays, groupField) {
    const counts = {};

    groupedArrays.flat().forEach((item) => {
        const key = item[groupField];

        // this assumes count = 1 per row, which might not be correct
        const count = item._count[groupField];
        counts[key] = (counts[key] || 0) + count;
    });

    return Object.entries(counts).map(([key, count]) => ({
        [groupField]: key,
        count,
    }));
}
