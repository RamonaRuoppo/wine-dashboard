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
        description: "Misura il consumo idrico specifico per la produzione di uva in campo, correlato all'efficienza dell'irrigazione",
        unit: "L/L",
        baseValue: 1.15
    },
    {
        indicator: "Aria",
        subtitle: "Carbon Footprint",
        description: "Misura le emissioni di gas serra prodotte esclusivamente dall'uso di macchinari agricoli (trattori e attrezzature) durante le ore di lavoro in vigna.",
        unit: "Kg/L",
        baseValue: 0.12
    },
    {
        indicator: "Vigneto",
        subtitle: "Gestione Agronomica",
        description: "Valuta l'efficacia delle pratiche di difesa integrata e l'impatto della gestione agronomica, in particolare l'uso degli agrofarmaci, sulle colture.",
        unit: "interventi",
        baseValue: 2.5
    },
    {
        indicator: "Territorio",
        subtitle: "Resilienza e Paesaggio",
        description: "Monitora la resilienza del vigneto ai cambiamenti climatici (tramite proxy come GDD e Indice di Siccità) e l'impatto della gestione del suolo e degli input sul paesaggio e la biodiversità.",
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
