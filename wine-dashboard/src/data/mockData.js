export const vineyardList = [
    { name: "Tignanello", variety: "Chianti Classico DOCG Riserva" },
    { name: "Badia a Passignano", variety: "Chianti Classico DOCG Gran Selezione" },
    { name: "Pèppoli", variety: "Chianti Classico DOCG" },
];

export const kFactor = 1.06;

export const vivaIndicators = [
    {
        indicator: "Acqua",
        subtitle: "Water Footprint",
        description: "Misura il consumo idrico specifico per la produzione di uva in campo, correlato all'efficienza dell'irrigazione, e il volume di acqua inquinata (Scarsità idrica e Degradazione della qualità idrica).",
        unit: "L/L",
        baseValue: 1.15
    },
    {
        indicator: "Aria",
        subtitle: "Carbon Footprint",
        description: "Esprime l’impatto che la produzione di uno specifico prodotto (CFP=Carbon Footprint of a Product) e/o l’insieme delle attività aziendali (GHGI=Greenhouse Gas Inventory) hanno sul cambiamento climatico.",
        unit: "Kg/L",
        baseValue: 0.12
    },
    {
        indicator: "Vigneto",
        subtitle: "Gestione Agronomica",
        description: "Prende in considerazione le pratiche di gestione agronomica del vigneto ed in particolare valuta l’utilizzo degli agrofarmaci e le relative conseguenze sui corpi idrici e sul suolo. Analizza inoltre gli aspetti legati alla biodiversità, alla gestione del suolo e alla fertilità.",
        unit: "interventi",
        baseValue: 2.5
    },
    {
        indicator: "Territorio",
        subtitle: "Paesaggio e Società",
        description: "Insieme di indicatori qualitativi e quantitativi capaci di misurare gli effetti sul territorio delle azioni intraprese dalle aziende. Gli ambiti di analisi sono la biodiversità, il paesaggio, la società e la collettività, con riferimento anche alle ricadute economiche sul territorio e sulla comunità locale.",
        unit: "°C/giorni",
        baseValue: 2000
    }
];

export const risksIndicators = [
    {
        indicator: "Peronospora della vite",
        description: "TODO",
        level: "basso"
    },
    {
        indicator: "Muffa grigia della vite",
        description: "TODO",
        level: "basso"
    },
    {
        indicator: "Oidio della vite",
        description: "TODO",
        level: "basso"
    },
    {
        indicator: "Tignoletta della vite",
        description: "TODO",
        level: "basso"
    }
];

export const baseDailyCosts = {
    laborCost: 300,           // € per la giornata di lavoro
    machineryCost: 25,        // € per ora
    fertilizerCost: 0.8,      // € per kg
    waterCost: 0.002,         // € per litro
    pesticideCost: 20,        // € per trattamento
    workingHours: 8,          // ore macchina totali
    fertilizerUsed: 0.012,    // kg per ora
    waterUsed: 1200,          // litri
    pesticideTreatments: 3,   // interventi
    grapeYield: 10000
};
