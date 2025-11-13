import { randomNumBetween, round } from "../utils/calculations";
import { vineyardList } from "../data/mockData";

export function fetchPlanningData() {
    return vineyardList.map(v => ({
        vineyard: v.name,
        variety: v.variety,
        maturationStatus: round(randomNumBetween(75, 95), 2)+ "% (Brix " + round((Math.random() * (25 - 22) + 22), 2) + ")",
        optimalDate: round(randomNumBetween(12, 20),0).toString().padStart(2, "0") + "/09",
        resources: round(randomNumBetween(5, 10), 0) + " persone, " + round(randomNumBetween(1, 3), 0) + " macchine",
        estimatedQuantity: round(randomNumBetween(8, 15),2) + " t",
    }));
}

export function fetchTransportData(days = 7) {
    return Array.from({ length: days }, (_, i) => {
        const uva = randomNumBetween(8, 18);
        const km = randomNumBetween(5, 12);
        const ore = Math.ceil(uva / 3);
        return {
            day: (i + 1).toString().padStart(2, "0") + "/09",
            uvaTrasportata: uva,
            kmPercorsi: km,
            oreLavoro: ore,
        };
    });
}