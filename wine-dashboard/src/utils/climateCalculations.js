// Calcola i Gradi Giorno di Crescita (GDD) per un insieme di dati climatici
export function calculateGDD( data, baseTemperature = 10 ){
    let totalGDD = 0;

    data.forEach(day => {
        const averageTemp = (day.maxTemp + day.minTemp) / 2;
        const dailyGDD = Math.max(averageTemp - baseTemperature, 0);
        totalGDD += dailyGDD;
    });

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

    return climateRegion;
}
