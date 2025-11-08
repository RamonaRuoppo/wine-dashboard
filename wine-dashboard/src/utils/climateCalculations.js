/** 
 * Calcoli climatici (GDD, Winkler, stress)
 */ 

// Simulatore per le temperature necessarie al calcolo del GDD
export function temperatureSimulator(startMonth = 3, endMonth = 10) {
    const today = new Date();
    // Stagione di crescita
    const startOfSeason = new Date(today.getFullYear(), startMonth, 1); // 1 aprile
    const endOfSeason = new Date(today.getFullYear(), endMonth, 0); // 31 ottobre
    const days = Math.floor((endOfSeason - startOfSeason) / (1000 * 60 * 60 * 24)) + 1; //conversione in gg

    const temperatures = [];

    // funzione per generare numeri casuali tra due estremi
    function randomBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    var prevMax = 20;
    var prevMin = 10;
    const smoothFactor = 0.3; // quanto le temperature precedenti influenzano quelle correnti
    
    for (let i = 0; i < days; i++) {
        const date = new Date(startOfSeason);
        date.setDate(startOfSeason.getDate() + i);

        // Simula oscillazioni stagionali (più calde in estate, più fredde a inizio/fine stagione)
        const seasonalFactor = Math.sin((Math.PI * i) / days);
        const baseMax = 20 + 10 * seasonalFactor; // varia tra 20°C e 30°C
        const baseMin = 10 + 5 * seasonalFactor;  // varia tra 10°C e 15°C

        // Variazioni giornaliere naturali
        const variationMax = randomBetween(-1, 1);
        const variationMin = randomBetween(-0.5, 0.5);

        // utlizza il valore precedente per smorzare le oscillazioni tra le temperature
        const maxTemp = (baseMax + variationMax + (prevMax - baseMax) * smoothFactor).toFixed(1);
        const minTemp = (baseMin + variationMin + (prevMin - baseMin) * smoothFactor).toFixed(1);

        prevMax = parseFloat(maxTemp);
        prevMin = parseFloat(minTemp);

        temperatures.push({
            date,
            minTemp: parseFloat(minTemp),
            maxTemp: parseFloat(maxTemp)
        });
        
    }
    console.log("temperature della stagione:", temperatures);
    return temperatures;
}

export function calculateDailyGDD(minTemp, maxTemp, baseTemp = 10) {
    const avgTemp = (minTemp + maxTemp) / 2;
    const dailyGDD = avgTemp - baseTemp;
    return Math.max(0, dailyGDD); // il GDD è 0 se la temp media è inferiore alla baseTemp
}

export function calculateSeasonalGDD(temps, baseTemp = 10) {
    const totalGDD = temps.reduce((accumulator, day) => {
        const dailyGDD = calculateDailyGDD(day.minTemp, day.maxTemp, baseTemp);
        return accumulator + dailyGDD;
    }, 0);
    return totalGDD;
}

// Classifica il clima viticolo in base all'indice di Winkler (sommatoria dei GDD)
export function classifyWinkler(totalGDD) {
    if (totalGDD <= 1389) {
        return { region: "I", name: "Fredda", description: "Ideale per vitigni precoci (es. Riesling, Pinot Nero)." };
    } else if (totalGDD <= 1667) {
        return { region: "II", name: "Intermedia", description: "Buona per vitigni da tavola e maturazione intermedia." };
    } else if (totalGDD <= 1944) {
        return { region: "III", name: "Temperata", description: "Adatta alla maggior parte dei vitigni classici (es. Sangiovese)." };
    } else if (totalGDD <= 2222) {
        return { region: "IV", name: "Calda", description: "Richiede vitigni che amano il calore (es. Syrah, Grenache)." };
    } else {
        return { region: "V", name: "Molto Calda", description: "Rischio di maturazione troppo rapida e bassa acidità." };
    }
}

export function calculateDailyHuglin(minTemp, maxTemp, baseTemp = 10) {
    const avgTemp = (minTemp + maxTemp) / 2;
    const avgWeightedTemp = (avgTemp + maxTemp) / 2;
    const dailyHuglin = avgWeightedTemp - baseTemp;
    return Math.max(0, dailyHuglin);
}

export function calculateHuglinIndex(dailyData, kFactor = 1.06) { // fattore di latitudine Nord Italia
    const accumulatedGDD = dailyData.reduce((accumulator, day) => {
        const dailyHuglinValue = calculateDailyHuglin(day.minTemp, day.maxTemp); 
        return accumulator + dailyHuglinValue;
    }, 0);

    const totalHuglin = accumulatedGDD * kFactor;
    return totalHuglin;
}

export function classifyHuglin(huglinIndex) {
    if (huglinIndex < 1500) {
        return { region: "I", name: "Molto Fredda", interval: "< 1500", vitigni: "Vitigni estremamente precoci." };
    } else if (huglinIndex < 1800) {
        return { region: "II", name: "Fredda / Moderata", interval: "1500 – 1800", vitigni: "Müller-Thurgau, Pinot Nero, Riesling." };
    } else if (huglinIndex < 2100) {
        return { region: "III", name: "Temperata / Buona", interval: "1800 – 2100", vitigni: "Chardonnay, Merlot, Cabernet Sauvignon (Climi Temperati)." };
    } else if (huglinIndex < 2400) {
        return { region: "IV", name: "Calda", interval: "2100 – 2400", vitigni: "Syrah, Grenache, Zinfandel." };
    } else {
        return { region: "V", name: "Molto Calda", interval: "≥ 2400", vitigni: "Uve da essiccare (Passito), rischio stress termico." };
    }
}