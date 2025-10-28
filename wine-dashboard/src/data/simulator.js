export function generateVineyardData(days = 30) {
    const data = [];
    for (let i = 0; i < days; i++) {
        data.push({
            day: i + 1,
            temperature: parseFloat((Math.random() * 10 + 15).toFixed(1)), // 15-25°C
            humidity: parseFloat((Math.random() * 40 + 40).toFixed(1)),    // 40-80%
            rainfall: parseFloat((Math.random() * 8).toFixed(1)),          // 0-8mm
            yield: parseFloat((Math.random() * 80 + 70).toFixed(1))        // 70-150 q/ha
        });
    }
    return data;
}