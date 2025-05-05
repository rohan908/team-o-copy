export function MergeForms(dataArrays: any[][], field: string) {
    const counts: Record<string, number> = {};

    dataArrays.flat().forEach((item) => {
        const key = item[field];
        const count = item._count[field];
        if (key === '' || key == null) return;
        counts[key] = (counts[key] || 0) + count;
    });

    return Object.entries(counts)
        .map(([key, count]) => ({
            [field]: key,
            count,
        }))
        .sort((a, b) => b.count - a.count);
}
