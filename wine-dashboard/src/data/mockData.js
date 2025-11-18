export const vineyardList = [
    { name: "Tignanello", variety: "Chianti Classico DOCG Riserva", area: 50 },
    { name: "Badia a Passignano", variety: "Chianti Classico DOCG Gran Selezione", area: 54 },
    { name: "Pèppoli", variety: "Chianti Classico DOCG" , area: 45},
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
        description: "Malattia fungina che colpisce le foglie, gli steli, i fiori e i frutti della vite. Permane nel terreno sotto forma di spore e il suo sviluppo è legato alle condizioni metereologiche, infatti, si trova più comunemente nei climi umidi dove ci sono grandi quantità di precipitazioni durante la stagione di crescita. Si manifesta principalmente in primavera",
        symptoms: "Aree clorotiche, alterazioni di colore, lesioni su acini, Avvizzimenti e dissecamenti, Aree necrotiche sui germogli",
        level: "basso",
        value: 20
    },
    {
        indicator: "Muffa grigia della vite",
        description: "Fungo presente in tutti gli ambienti agricoli, compresi quelli viticoli, che può attaccare qualsiasi tipo di substrato organico, potendo vivere in modo saprofitario e/o parassitario in base alle condizioni ambientali e climatiche. La loro produzione è concentrata in due momenti: tra maggio e giugno, in corrispondenza della fioritura, e in autunno, con le prime piogge, in concomitanza alla maturazione.",
        symptoms: "Attacca foglie, tralci, grappoli, acini maturi; raro sulle foglie (se clima è favorevole: caldo-umido). Macchie clorotiche che si trasformano in necrosi localizzate; in caso di elevata umidità, effluorescenza grigiastra.",
        level: "basso",
        value: 12
    },
    {
        indicator: "Oidio della vite",
        description: "Malattia fungina causata dal fungo Uncinula necator. Infesta le foglie, i grappoli e i germogli della pianta, impedendo il normale sviluppo e riducendo la capacità di fotosintesi. La sua diffusione è favorita da condizioni ambientali particolarmente favorevoli, come temperature tra i 18 e i 28 gradi Celsius e un'umidità relativa relativamente bassa, ma con abbondanti rugiade notturne.",
        symptoms: "Depositi bianchi e polverosi, Deformazione delle foglie, Impedimento alla crescita dei grappoli, Rallentamento della crescita dei germogli",
        level: "basso",
        value: 28
    },
    {
        indicator: "Tignoletta della vite",
        description: "Lepidottero tortricide presente in tutta Italia, con prevalenza nelle zone più meridionali, ed è dannoso per molte varietà di vite. Le infestazioni sono influenzate dalle condizioni climatiche e microambientali, per cui possono variare da un anno all'altro.",
        symptoms: "Distruzione dei bottoni fiorali e dei racimoli, svuotamento e disseccamento dei grappoli.",
        level: "basso",
        value: 10
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
