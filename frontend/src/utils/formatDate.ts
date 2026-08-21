//dateを2026-06-16から6/16(月)に変える関数
export const formatDate = (date: string): string => {
    const parsedDate = new Date(date);
    const dateParts = date.split("-");
    const dayOfWeekIndex = parsedDate.getDay();
    const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
    return `${dateParts[1]}/${dateParts[2]}(${dayNames[dayOfWeekIndex]})`;
}

export const formatDateSlash = (date: string): string => {
    const parsedDate = new Date(date);
    const dateParts = date.split("-");
    const dayOfWeekIndex = parsedDate.getDay();
    const dayNames = ["日", "月", "火", "水", "木", "金", "土"];
    return `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}(${dayNames[dayOfWeekIndex]})`;
}

export const formatDateSlashAndRemoveDay = (date: string): string => {
    return date.replaceAll("-", "/").slice(0, 7);
}

export const formatLocalDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};