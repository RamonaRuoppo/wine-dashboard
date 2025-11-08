/**
 * Simulazione di dati climatici + produttivi
 */ 

import { temperatureSimulator } from "../utils/climateCalculations";
import { calculateDailyGDD } from "../utils/climateCalculations";

export function generateVineyardData(days = 30) {
    const data = [];
    const today = new Date();
    const temps = temperatureSimulator(); // temperature realistiche giornaliere
    let cumulativeGDD = 0;

    for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - (days - 1 - i)); // genera date dal passato a oggi

        const { minTemp, maxTemp } = temps[i] || { minTemp: 10, maxTemp: 25 };
        const temperature = parseFloat(((minTemp + maxTemp) / 2).toFixed(1));
        const dailyGDD = Math.max(temperature - 10, 0);
        cumulativeGDD += dailyGDD;

        const humidity = parseFloat((Math.random() * 40 + 40).toFixed(1));    // 40–80%
        const rainfall = parseFloat((Math.random() * 8).toFixed(1));          // 0–8mm
        const sunlightHours = parseFloat((Math.random() * 6 + 6).toFixed(1)); // 6–12h

        const growthFactor = (temperature / 25) * (humidity / 70) * (1 + rainfall / 10);
        const grapeYield = parseFloat((growthFactor * (Math.random() * 80 + 70)).toFixed(1));
        const sugarLevel = parseFloat((18 + temperature * 0.3 + sunlightHours * 0.4 - humidity * 0.05).toFixed(1));
        const waterUsed = parseFloat((rainfall * 0.5 + Math.random() * 5 + 15).toFixed(1));
        const fertilizerUsed = parseFloat((Math.random() * 2 + 5).toFixed(1));

        data.push({
            date: date.toISOString().split("T")[0],
            temperature,
            humidity,
            rainfall,
            sunlightHours,
            grapeYield,
            sugarLevel,
            waterUsed,
            fertilizerUsed,
            dailyGDD: parseFloat(dailyGDD.toFixed(1)),
            cumulativeGDD: parseFloat(cumulativeGDD.toFixed(1))
        });
    }

    return data;
}