// Simulatore per le temperature necessarie al calcolo del GDD
export function temperatureSimulator(startMonth = 3, endMonth = 10) {
    const today = new Date();
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

// Calcola i Gradi Giorno di Crescita (GDD) per un la stagione corrente
export function calculateGDD(baseTemperature = 10) {
    const temps = temperatureSimulator();
    let totalGDD = 0;

    temps.forEach(({ minTemp, maxTemp }) => {
        const avgTemp = (maxTemp + minTemp) / 2;
        const dailyGDD = Math.max(avgTemp - baseTemperature, 0);
        totalGDD += dailyGDD;
    });
    console.log('')

    console.log("Somma Termica Effettiva (GDD):", totalGDD.toFixed(2));
    return totalGDD;
}

// Classifica il clima viticolo in base all'indice di Winkler (sommatoria dei GDD)
export function classifyWinkler(totalGDD) {
    let climateRegion = "";

    if (totalGDD < 1390) {
        climateRegion = "Regione I (clima fresco)";
    } else if (totalGDD < 1670) {
        climateRegion = "Regione II (temperato)";
    } else if (totalGDD < 1945) {
        climateRegion = "Regione III (caldo)";
    } else {
        climateRegion = "Regione IV-V (molto caldo)";
    }

    console.log("Regione:", climateRegion)
    return climateRegion;
}