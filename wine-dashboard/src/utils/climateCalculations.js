// --- Calcoli climatici e indici ---

import { randomNumBetween } from "./calculations";
import { kFactor } from "../data/mockData";

export function temperatureSimulator(year = new Date().getFullYear()) {
    const temperatures = [];
    const daysInYear =
        year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 366 : 365;

    var prevTempMax = 22;
    var prevTempMin = 12;
    const smoothFactor = 0.3;

    for (let i = 0; i < daysInYear; i++) {
        const date = new Date(year, 0, i + 1);

        // Simula oscillazioni stagionali, andamento a curva (sinusoide)
        const seasonalFactor = Math.sin((Math.PI * i) / daysInYear);
        const baseTempMax = 20 + 10 * seasonalFactor;
        const baseTempMin = 3 + 8 * seasonalFactor;
        // Variazioni giornaliere naturali
        const variationMax = randomNumBetween(-1.5, 1.5);
        const variationMin = randomNumBetween(-1, 1);
        // utlizza il valore temp precedente per smorzare le oscillazioni
        const maxTemp = (baseTempMax + variationMax + (prevTempMax - baseTempMax) * smoothFactor).toFixed(1);
        const minTemp = (baseTempMin + variationMin + (prevTempMin - baseTempMin) * smoothFactor).toFixed(1);

        prevTempMax = parseFloat(maxTemp);
        prevTempMin = parseFloat(minTemp);

        temperatures.push({
            date,
            minTemp: parseFloat(minTemp),
            maxTemp: parseFloat(maxTemp),
        });

    }
    return temperatures;
}

export function calculateDailyGDD(minTemp, maxTemp, baseTemp = 10) {
    const avgTemp = (minTemp + maxTemp) / 2;
    const dailyGDD = avgTemp - baseTemp;
    return Math.max(0, dailyGDD); // il GDD è 0 se la temp media è inferiore alla baseTemp
}

export function calculateWinklerIndex(temperatures, baseTemp = 10) {
    if (!Array.isArray(temperatures)) return 0;

    // Filtra per il periodo Winkler: Aprile - Ottobre
    const winklerTemps = temperatures.filter((day) => {
        const month = new Date(day.date).getMonth() + 1
        return month >= 4 && month <= 10;
    });

    const totalGDD = winklerTemps.reduce((accumulator, day) => {
        return accumulator + calculateDailyGDD(day.minTemp, day.maxTemp, baseTemp);
    }, 0);
    return totalGDD;
}

// Classifica il clima viticolo in base all'indice di Winkler
export function classifyWinkler(totalGDD) {
    switch (true) {
        case (totalGDD <= 1389):
            return {
                region: "I",
                name: "Fredda",
                description: "Ideale per vitigni precoci (es. Riesling, Pinot Nero)."
            };

        case (totalGDD <= 1667):
            return {
                region: "II",
                name: "Intermedia",
                description: "Buona per vitigni da tavola e maturazione intermedia."
            };

        case (totalGDD <= 1944):
            return {
                region: "III",
                name: "Temperata",
                description: "Adatta alla maggior parte dei vitigni classici (es. Sangiovese)."
            };

        case (totalGDD <= 2222):
            return {
                region: "IV",
                name: "Calda",
                description: "Richiede vitigni che amano il calore (es. Syrah, Grenache)."
            };

        default:
            return {
                region: "V",
                name: "Molto Calda",
                description: "Rischio di maturazione troppo rapida e bassa acidità."
            };
    }
}

export function calculateDailyHuglin(minTemp, maxTemp, baseTemp = 10) {
    const avgTemp = (minTemp + maxTemp) / 2;
    const avgWeightedTemp = (avgTemp + maxTemp) / 2;
    const dailyHuglin = avgWeightedTemp - baseTemp;
    return Math.max(0, dailyHuglin);
}

export function calculateHuglinIndex(dailyData, kFactor) {
    if (!Array.isArray(dailyData)) return 0;

    // Filtra per il periodo Huglin: Aprile - Settembre
    const huglinTemps = dailyData.filter((day) => {
        const month = new Date(day.date).getMonth() + 1
        return month >= 4 && month <= 9;
    });

    const accumulatedGDD = huglinTemps.reduce((accumulator, day) => {
        const dailyHuglinValue = calculateDailyHuglin(day.minTemp, day.maxTemp);
        return accumulator + dailyHuglinValue;
    }, 0);

    const totalHuglin = accumulatedGDD * kFactor;
    return totalHuglin;
}

// Classifica il clima viticolo in base all'indice di Huglin
export function classifyHuglin(huglinIndex) {
    switch (true) {
        case (huglinIndex < 1500):
            return {
                region: "I",
                name: "Molto Fredda",
                interval: "< 1500",
                vineyard: "Vitigni estremamente precoci."
            };

        case (huglinIndex < 1800):
            return {
                region: "II",
                name: "Fredda / Moderata",
                interval: "1500 - 1800",
                vineyard: "Müller-Thurgau, Pinot Nero, Riesling."
            };

        case (huglinIndex < 2100):
            return {
                region: "III",
                name: "Temperata / Buona",
                interval: "1800 - 2100",
                vineyard: "Chardonnay, Merlot, Cabernet Sauvignon (Climi Temperati)."
            };

        case (huglinIndex < 2400):
            return {
                region: "IV",
                name: "Calda",
                interval: "2100 - 2400",
                vineyard: "Syrah, Grenache, Zinfandel."
            };

        default:
            return {
                region: "V",
                name: "Molto Calda",
                interval: "≥ 2400",
                vineyard: "Uve da essiccare (Passito), rischio stress termico."
            };
    }
}

export function calculateStress(temperatures) {
    let heatStressDays = 0;
    let droughtStressDays = 0;

    temperatures.forEach(day => {
        if (day.maxTemp > 35) heatStressDays++;
        if (day.maxTemp > 30 && day.rainfall < 1) droughtStressDays++;
    });

    return { heatStressDays, droughtStressDays };
}
