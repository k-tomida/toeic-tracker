//dateを2026-06-16から6/16(月)に変える関数
export const formatDate = (date: string): string => {
    const parsedDate = new Date(date);
    const dateParts = date.split("-");
    const dayOfWeekIndex = parsedDate.getDay();
    const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
    return `${dateParts[1]}/${dateParts[2]}(${dayNames[dayOfWeekIndex]})`;
}

export const formatDateSlash = (date: string): string => {
    return date.replaceAll("-", "/");
}

export const formatDateSlashAndRemoveDay = (date: string): string => {
    return date.replaceAll("-", "/").slice(0, 7);
}