import { randomNumBetween } from "../utils/calculations";
import { vineyardList } from "../data/mockData";

export function fetchPlanningData() {
    return vineyardList.map(v => ({
        vineyard: v.name,
        variety: v.variety,
        maturation_status: randomNumBetween(75, 95) + "% (Brix " + (Math.random() * (25 - 22) + 22).toFixed(1) + ")",
        optimal_date: randomNumBetween(12, 20).toString().padStart(2, "0") + "/09",
        resources: randomNumBetween(5, 10) + " persone, " + randomNumBetween(1, 3) + " macchine",
        estimated_quantity: randomNumBetween(8, 15) + " t",
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