// utils/dateRanges.js
export function getDateRange({ filter, start, end }) {
    const now = new Date();
    let range = {};

    if (filter === 'week') {
        const pastWeek = new Date(now);
        pastWeek.setDate(now.getDate() - 7);
        range.start = pastWeek;
        range.end = now;
    } else if (filter === 'month') {
        const pastMonth = new Date(now);
        pastMonth.setMonth(now.getMonth() - 1);
        range.start = pastMonth;
        range.end = now;
    } else if (filter === '3months') {
        const past3Months = new Date(now);
        past3Months.setMonth(now.getMonth() - 3);
        range.start = past3Months;
        range.end = now;
    } else if (filter === 'custom') {
        if (start && end) {
            range.start = new Date(start);
            range.end = new Date(end);
        } else if (start && !end) {
            range.start = new Date(start);
        } else if (!start && end) {
            range.end = new Date(end);
        }
        // If neither, will return empty range (=> all)
    }
    return range;
}
