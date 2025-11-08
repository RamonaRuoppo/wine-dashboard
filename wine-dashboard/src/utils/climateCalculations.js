/** 
 * Calcoli climatici (GDD, Winkler, stress)
 */ 

// Simulatore per le temperature
export function temperatureSimulator(year = new Date().getFullYear()) {
    const temperatures = [];
    const daysInYear =
    year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 366 : 365;

    function randomNumBetween(min, max) {
        return Math.random() * (max - min) + min;
    }

    var prevMax = 22;
    var prevMin = 12;
    const smoothFactor = 0.3; 
    
    for (let i = 0; i < daysInYear; i++) {
        const date = new Date(year, 0, i + 1);

        // Simula oscillazioni stagionali 
        const seasonalFactor = Math.sin((Math.PI * i) / daysInYear);
        const baseMax = 20 + 10 * seasonalFactor; 
        const baseMin = 3 + 8 * seasonalFactor;  

        // Variazioni giornaliere naturali
        const variationMax = randomNumBetween(-2, 2);
        const variationMin = randomNumBetween(-1, 1);

        // utlizza il valore temp precedente per smorzare le oscillazioni
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

export function calculateWinklerIndex(temperatures, baseTemp = 10) {
    if (!Array.isArray(temperatures)) return 0;
    
    // Filtra per il periodo Winkler: Aprile (4) - Ottobre (10)
    const winklerTemps = temperatures.filter((day) => {
        const month = new Date(day.date).getMonth() + 1
        return month >= 4 && month <= 10;
    });

    const totalGDD = winklerTemps.reduce((accumulator, day) => {
        return accumulator + calculateDailyGDD(day.minTemp, day.maxTemp, baseTemp);
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

export function calculateHuglinIndex(dailyData, kFactor = 1.06) {
    if (!Array.isArray(dailyData)) return 0;

    // Filtra per il periodo Huglin: Aprile (4) - Settembre (9)
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