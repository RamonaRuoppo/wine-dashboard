// Accesso a dati storici e simulati

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

    { year: 2025, vineyard: "Pian delle Vigne", gdd: 1850, rainfall: 285, brix: 20.5, productivity: 85 },
    { year: 2024, vineyard: "Pian delle Vigne", gdd: 1850, rainfall: 285, brix: 20.5, productivity: 85 },
    { year: 2023, vineyard: "Pian delle Vigne", gdd: 1850, rainfall: 285, brix: 20.5, productivity: 85 },
    { year: 2022, vineyard: "Pian delle Vigne", gdd: 1850, rainfall: 285, brix: 20.5, productivity: 85 },
    { year: 2021, vineyard: "Pian delle Vigne", gdd: 1850, rainfall: 285, brix: 20.5, productivity: 85 },
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