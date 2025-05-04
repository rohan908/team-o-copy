// src/routes/MergeFormHelper.ts

export function MergeForms(
    groupedArrays: Array<Array<{ [key: string]: any; _count: { [key: string]: number } }>>,
    groupField: string
): { [key: string]: string | number }[] {
    const counts: Record<string, number> = {};

    groupedArrays.flat().forEach((item) => {
        const key = item[groupField];
        const count = item._count[groupField];
        if (key === '' || key == null) return;
        counts[key] = (counts[key] || 0) + count;
    });

    return Object.entries(counts)
        .map(([key, count]) => ({
            [groupField]: key,
            count,
        }))
        .sort((a, b) => b.count - a.count);
}
