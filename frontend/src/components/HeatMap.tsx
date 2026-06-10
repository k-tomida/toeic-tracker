const months: string[] = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月",]
const dayOfTheWeek: string[] = ["", "火", "", "木", "", "土", ""];

//startDateから一年間の日付をYYYY-MM-DDで返す
function getDatesForOneYear(startDate: Date): string[] {
    const dates: string[] = [];
    const current = new Date(startDate);

    for (let i = 0; i < 365; i++) {
        dates.push(current.toISOString().slice(0, 10));
        current.setDate(current.getDate() + 1);
    }
    return dates;
}

export const HeatMap = () => {
    const dates = getDatesForOneYear(new Date("2026-01-01"));

    // 7行（日〜土）× 53列のグリッドに並べる
    const weeks: string[][] = [];
    let week: string[] = [];

    dates.forEach((date, i) => {
        week.push(date);
        if (week.length === 7 || i === date.length - 1) {
            weeks.push(week);
            week = [];
        }
    });
    return (
        <div className="bg-white rounded-md">
            <p className="m-4 pt-3 text-2xl font-medium">学習アクティビティ</p>
            <table>
                <thead>
                    <tr>
                        {months.map((month) => (
                            <td>
                                <span>{month}</span>
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    )
}