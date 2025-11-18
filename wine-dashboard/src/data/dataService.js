import { calculateAverage, randomNumBetween, round } from "../utils/calculations";
import { vineyardList } from "./mockData";
import { fetchVineyardData } from "./simulator";

export function fetchPlanningData() {
    const dailyData = fetchVineyardData([], 30);
    const avgSugar = calculateAverage(dailyData, "sugarLevel");
    const avgYield = calculateAverage(dailyData, "grapeYield");
    const avgGDD = dailyData[dailyData.length - 1]?.cumulativeGDD || 0;

    function determineStage(brix) {
        if (brix < 19) return "Pre-invaiatura";
        if (brix < 21) return "Invaiatura";
        if (brix < 23) return "Maturazione";
        return "Pronto alla raccolta";
    }

    function estimateHarvestDate(gdd) {
        if (gdd > 1900) return "02/10";
        if (gdd > 1750) return "07/10";
        if (gdd > 1650) return "12/10";
        return "20/10";
    }

    function estimateResources(vineyardYield) {
        const seasonalYieldKg = vineyardYield * 120;
        const people = Math.max(8, Math.ceil(seasonalYieldKg / 250));
        const machines = Math.ceil(people / 8);
        return people + " persone, " + machines + " macchine";
    }

    return vineyardList.map((v, index) => {
        const yieldFactor = 0.85 + index * 0.08;
        const sugarAdjustment = index === 0 ? 0.4 : index === 1 ? 0.1 : -0.3;

        const vineyardYield = avgYield * yieldFactor;
        const vineyardSugar = avgSugar + sugarAdjustment;

        return {
            vineyard: v.name,
            variety: v.variety,
            maturationStatus: `${determineStage(vineyardSugar)} (Brix ${round(vineyardSugar, 1)})`,
            optimalDate: estimateHarvestDate(avgGDD),
            resources: estimateResources(vineyardYield),
            estimatedQuantity: round(vineyardYield * 120 / 1000, 2) + " t"
        };
    });
}

export function fetchTransportData(days = 31) {
    const dailyData = fetchVineyardData([], days);

    return dailyData.map((d, i) => {
        const transported = d.grapeYield * randomNumBetween(0.8, 1.2);

        return {
            day: (i + 1).toString().padStart(2, "0") + "/10",
            uvaTrasportata: round(transported, 1),
            kmPercorsi: round(randomNumBetween(5, 12), 1),
            oreLavoro: Math.ceil(transported / 3)
        };
    });
}