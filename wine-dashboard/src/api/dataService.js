// Accesso a dati storici e simulati

import { randomNumBetween } from "../utils/statistics";

const historicalAgronomyData = [
    { year: 2025, vineyard: "Tignanello", gdd: 1950, rainfall: 285, brix: 20.5, productivity: 85 },
    { year: 2024, vineyard: "Tignanello", gdd: 1890, rainfall: 285, brix: 20.5, productivity: 85 },
    { year: 2023, vineyard: "Tignanello", gdd: 1750, rainfall: 285, brix: 20.5, productivity: 85 },
    { year: 2022, vineyard: "Tignanello", gdd: 1820, rainfall: 285, brix: 20.5, productivity: 85 },
    { year: 2021, vineyard: "Tignanello", gdd: 1833, rainfall: 285, brix: 20.5, productivity: 85 },

    { year: 2025, vineyard: "Badia a Passignano", gdd: 1850, rainfall: 285, brix: 20.5, productivity: 85 },
    { year: 2024, vineyard: "Badia a Passignano", gdd: 1850, rainfall: 285, brix: 20.5, productivity: 85 },
    { year: 2023, vineyard: "Badia a Passignano", gdd: 1850, rainfall: 285, brix: 20.5, productivity: 85 },
    { year: 2022, vineyard: "Badia a Passignano", gdd: 1850, rainfall: 285, brix: 20.5, productivity: 85 },
    { year: 2021, vineyard: "Badia a Passignano", gdd: 1850, rainfall: 285, brix: 20.5, productivity: 85 },

    { year: 2025, vineyard: "Pèppoli", gdd: 1850, rainfall: 285, brix: 20.5, productivity: 85 },
    { year: 2024, vineyard: "Pèppoli", gdd: 1850, rainfall: 285, brix: 20.5, productivity: 85 },
    { year: 2023, vineyard: "Pèppoli", gdd: 1850, rainfall: 285, brix: 20.5, productivity: 85 },
    { year: 2022, vineyard: "Pèppoli", gdd: 1850, rainfall: 285, brix: 20.5, productivity: 85 },
    { year: 2021, vineyard: "Pèppoli", gdd: 1850, rainfall: 285, brix: 20.5, productivity: 85 },
];

const financialData = [
    { year: 2025, quarter: 4, fatturato: 220000000, mol_perc: 0.28, export_perc: 0.65, canale: 'Export' },
    { year: 2025, quarter: 4, fatturato: 220000000, mol_perc: 0.28, export_perc: 0.65, canale: 'Enoturismo' },
];

export const fetchKPIData = async (yearFilter, vineyardFilter) => {
    const historicalTrend = historicalAgronomyData.map(({ year, gdd, brix }) => ({
        year,
        gdd,
        brix
    }));

    const currentData = historicalAgronomyData.find(d =>
        d.year === yearFilter && d.vineyard === vineyardFilter
    );

    if (!currentData) {
        throw new Error("Dati non trovati per i filtri selezionati.");
    }

    const prevYearData = historicalAgronomyData.find(d =>
        d.year === yearFilter - 1 && d.vineyard === vineyardFilter
    );

    return {

        current: {
            productivity: currentData.productivity,
            gdd: currentData.gdd,
            brix: currentData.brix,
        },

        trend: historicalTrend || [],

        comparison: prevYearData
            ? {
                productivity_prev: prevYearData.productivity,
                gdd_prev: prevYearData.gdd
            } : null,
    };
}

export function generatePlanningData() {
  const vineyards = [
    { name: "Tignanello", variety: "Chianti Classico DOCG Riserva" },
    { name: "Badia a Passignano", variety: "Chianti Classico DOCG Gran Selezione" },
    { name: "Pèppoli", variety: "Chianti Classico DOCG" },
  ];
  
  return vineyards.map(v => ({
    vineyard: v.name,
    variety: v.variety,
    maturation_status: `${randomNumBetween(75, 95)}% (Brix ${ (Math.random() * (25 - 22) + 22).toFixed(1) })`,
    optimal_date: `${randomNumBetween(12, 20)}/09`,
    resources: `${randomNumBetween(5, 10)} persone, ${randomNumBetween(1, 3)} macchine`,
    estimated_quantity: `${randomNumBetween(8, 15)} t`,
  }));
}

export function generateTransportData(giorni = 7) {
  return Array.from({ length: giorni }, (_, i) => {
    const uva = randomNumBetween(8, 18);
    const km = randomNumBetween(5, 12);
    const ore = Math.ceil(uva / 3);
    return {
      giorno: `0${i+1}/09`,
      uvaTrasportata: uva,
      kmPercorsi: km,
      oreLavoro: ore,
    };
  });
}