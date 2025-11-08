/**
 * Simulazione di dati climatici + produttivi
 */

import { calculateDailyGDD } from "../utils/climateCalculations";

export function generateVineyardData(annualTemps, days = 30) {
    const data = [];
    const today = new Date();
    const currentYear = today.getFullYear();

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (days - 1));
    const startOfDayYear = Math.floor((startDate - new Date(currentYear, 0, 1)) / (1000 * 60 * 60 * 24));

    let cumulativeGDD = 0;

    for (let i = 0; i < days; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        const tempIndex = startOfDayYear + i;

        const tempDay = annualTemps[tempIndex] || { minTemp: 10, maxTemp: 25 };
        const { minTemp, maxTemp } = tempDay;

        const temperature = parseFloat(((minTemp + maxTemp) / 2).toFixed(1));
        const dailyGDD = calculateDailyGDD(minTemp, maxTemp, 10);
        cumulativeGDD += dailyGDD;

        const humidity = parseFloat((Math.random() * 40 + 40).toFixed(1));
        const rainfall = parseFloat((Math.random() * 8).toFixed(1));
        const sunlightHours = parseFloat((Math.random() * 6 + 6).toFixed(1));

        const growthFactor = (temperature / 25) * (humidity / 70) * (1 + rainfall / 10);
        const grapeYield = parseFloat((growthFactor * (Math.random() * 80 + 70)).toFixed(1));
        const sugarLevel = parseFloat((18 + temperature * 0.3 + sunlightHours * 0.4 - humidity * 0.05).toFixed(1));
        const waterUsed = parseFloat((rainfall * 0.5 + Math.random() * 5 + 15).toFixed(1));
        const fertilizerUsed = parseFloat((Math.random() * 2 + 5).toFixed(1));

        // Indicatori VIVA
        const co2PerBottle = parseFloat((fertilizerUsed * 0.2 + 1).toFixed(2));
        const waterPerLiter = parseFloat((waterUsed / (grapeYield || 1)).toFixed(2));
        const territoryIndex = ["Alto", "Medio", "Basso"][Math.floor(Math.random() * 3)];
        const sustainablePractices = parseFloat((Math.random() * 20 + 80).toFixed(1));

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
            cumulativeGDD: parseFloat(cumulativeGDD.toFixed(1)),
            co2PerBottle,
            waterPerLiter,
            territoryIndex,
            sustainablePractices
        });
    }
    return data;
}