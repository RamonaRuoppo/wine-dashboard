export function generateVineyardData(days = 30) {
    const data = [];

    for (let i = 0; i < days; i++) {
        // dati ambientali
        const temperature = parseFloat((Math.random() * 10 + 15).toFixed(1)); // 15-25°C
        const humidity = parseFloat((Math.random() * 40 + 40).toFixed(1));    // 40-80%
        const rainfall = parseFloat((Math.random() * 8).toFixed(1));          // 0-8mm
        const sunlightHours = parseFloat((Math.random() * 6 + 6).toFixed(1)); // 6-12h

        // fattore di crescita basato su condizioni ambientali
        const growthFactor = (temperature / 25) * (humidity / 70) * (1 + rainfall / 10);

        // dati di produzione
        const grapeYield = parseFloat((growthFactor * (Math.random() * 80 + 70)).toFixed(1));  // 70-150 q/ha
        const sugarLevel = parseFloat((Math.random() * 5 + 20 + growthFactor * 5).toFixed(1)); // 20-30 Brix
        const waterUsed = parseFloat((rainfall * 0.5 + Math.random() * 5 + 15).toFixed(1));    // litri/pianta
        const fertilizerUsed = parseFloat((Math.random() * 2 + 5).toFixed(1));                 // kg/pianta

        data.push({
            day: i + 1,
            temperature,
            humidity,
            rainfall,
            sunlightHours,
            grapeYield,
            sugarLevel,
            waterUsed,
            fertilizerUsed
        });
    }
    return data;
}