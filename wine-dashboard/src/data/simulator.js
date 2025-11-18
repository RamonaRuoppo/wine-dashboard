// --- Simulazione di dati climatici + produttivi ---

import { randomNumBetween, round } from "../utils/calculations";
import { calculateDailyGDD } from "../utils/climateCalculations";
import { vineyardList, baseDailyCosts } from "./mockData";

const calculateMargin = (revenue, cost) => round(((revenue - cost) / revenue) * 100, 1);

export function simulateDailyClimate(tempDay, cumulativeGDD) {
    const { minTemp, maxTemp } = tempDay;
    const temperature = round((minTemp + maxTemp) / 2, 1);
    const dailyGDD = calculateDailyGDD(minTemp, maxTemp, 10);
    cumulativeGDD += dailyGDD;

    const rainfall = round(randomNumBetween(0, 8), 1);
    const humidity = round(Math.min(100, Math.max(20, 40 + rainfall * 5 + randomNumBetween(-5, 5))), 1);
    const sunlightHours = round(randomNumBetween(6, 12), 1);

    const growthFactor = (temperature / 25) * (humidity / 70) * (1 + rainfall / 12);
    const grapeYield = round(growthFactor * randomNumBetween(85, 110), 1);
    const sugarLevel = round(18 + temperature * 0.3 + sunlightHours * 0.4 - humidity * 0.05, 1);
    const waterUsed = round(rainfall * 0.3 + randomNumBetween(10, 15) * (1 - humidity / 100), 1);
    const fertilizerUsed = round(randomNumBetween(5, 7), 1);

    return {
        temperature,
        humidity,
        rainfall,
        sunlightHours,
        grapeYield,
        sugarLevel,
        waterUsed,
        fertilizerUsed,
        dailyGDD: round(dailyGDD, 1),
        cumulativeGDD: round(cumulativeGDD, 1),
    };
}

export function fetchVineyardData(annualTemps, days = 30) {
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

        const dailyData = simulateDailyClimate(tempDay, cumulativeGDD);
        cumulativeGDD = dailyData.cumulativeGDD;

        const viva = simulateVivaValues({
            waterUsed: dailyData.waterUsed,
            grapeYield: dailyData.grapeYield,
        });

        const grapePrimeCost = calculateGrapePrimeCost({
            ...baseDailyCosts,
            fertilizerUsed: dailyData.fertilizerUsed,
            waterUsed: dailyData.waterUsed,
            grapeYield: dailyData.grapeYield,
        });

        const sellingPrice = round(randomNumBetween(1.4, 1.8), 2);
        const grossMargin = calculateMargin(sellingPrice, grapePrimeCost);

        data.push({
            date: date.toISOString().split("T")[0],
            ...dailyData,
            grapePrimeCost,
            grossMargin,
            sellingPrice,
            ...viva,
        });
    }
    return data;
}

export function generateFinancialData() {
    return vineyardList.map((v) => {
        const areaHa = v.area;

        let resaPerHa;
        if (v.variety.includes("Gran Selezione")) {
            resaPerHa = randomNumBetween(5, 7);
        } else if (v.variety.includes("Riserva")) {
            resaPerHa = randomNumBetween(6, 8);
        } else {
            resaPerHa = randomNumBetween(7, 10);
        }

        const produzione = round(resaPerHa * areaHa, 1);
        const produzioneKg = produzione * 1000;

        let prezzo;
        if (v.variety.includes("Gran Selezione")) {
            prezzo = round(randomNumBetween(2.9, 3.5), 2);
        } else if (v.variety.includes("Riserva")) {
            prezzo = round(randomNumBetween(2.4, 2.9), 2);
        } else {
            prezzo = round(randomNumBetween(1.5, 2.2), 2);
        }

        const ricavi = round(produzioneKg * prezzo, 0);

        const costoPerHa = randomNumBetween(8000, 11000);
        const costi = round(costoPerHa * areaHa, 0);
        const margine = calculateMargin(ricavi, costi);

        return {
            name: v.name,
            variety: v.variety,
            produzione,
            prezzo,
            ricavi,
            costi,
            margine,
        };
    });
}

export function simulateVivaValues(values) {
    return {
        waterFootprint: round(values.waterUsed / (values.grapeYield || 1) + randomNumBetween(-0.1, 0.1), 2),
        co2Emission: round(0.12 * randomNumBetween(0.7, 1.3), 2),
        agronomicManagement: round(2.5 * randomNumBetween(0.7, 1.3), 1),
        territoryResilience: round(2000 * randomNumBetween(0.8, 1.2), 0),
    };
}

export function calculateGrapePrimeCost(baseDailyCosts) {
    const totalCost =
        baseDailyCosts.laborCost +
        baseDailyCosts.machineryCost * baseDailyCosts.workingHours +
        baseDailyCosts.fertilizerCost * baseDailyCosts.fertilizerUsed * baseDailyCosts.workingHours +
        baseDailyCosts.waterCost * baseDailyCosts.waterUsed +
        baseDailyCosts.pesticideCost * baseDailyCosts.pesticideTreatments;

    return round(totalCost / (baseDailyCosts.grapeYield || 1), 2); // €/kg
}

export function simulateHourlyVineyardData(humidity) {
    const data = [];

    for (let hour = 0; hour < 24; hour++) {
        const sinusoidal = Math.sin((hour / 24) * Math.PI); // Oscillazione giorno-notte
        const randomShift = randomNumBetween(-3, 3);
        const humidityPerHour = round(Math.min(100, Math.max(20, humidity + sinusoidal * 10 + randomShift)), 1);

        const sunlightFactor = round(Math.sin((hour / 24) * Math.PI) * 1200, 2);
        const sunlightPercent = round((sunlightFactor / 1200) * 100, 2);
        const sugarLevel = round(18 + sunlightFactor * 0.01 + randomNumBetween(-0.3, 0.3), 2);

        const multiplier = randomNumBetween(0.9, 1.1);
        const grapePrimeHourlyCost = round(
            baseDailyCosts.laborCost / baseDailyCosts.workingHours +
            baseDailyCosts.machineryCost +
            baseDailyCosts.fertilizerCost * baseDailyCosts.fertilizerUsed * multiplier +
            baseDailyCosts.waterCost * baseDailyCosts.waterUsed * multiplier +
            baseDailyCosts.pesticideCost * baseDailyCosts.pesticideTreatments * multiplier,
            2
        );

        const grossMargin = round(12450 - grapePrimeHourlyCost * 100 + randomNumBetween(-2.5, 2.5), 1);

        data.push({
            hour: `${String(hour).padStart(2, "0")}:00`,
            humidityPerHour,
            sunlightFactor,
            sunlightPercent,
            sugarLevel,
            grapePrimeCost: grapePrimeHourlyCost,
            grossMargin,
        });
    }
    return data;
}
