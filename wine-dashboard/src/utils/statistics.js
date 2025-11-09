// --- Calcoli produttivi e statistici (trend, medie, variazioni) ---


export function safeValue(value) {
    return (typeof value === "number" && value >= 0) ? value : 0;
}

export function randomNumBetween(min, max) {
    return Math.random() * (max - min) + min;
}

export function calculateAverage(data, key) {
    if (!Array.isArray(data) || data.length === 0) return 0;
    return data.reduce((sum, item) => sum + (item[key] || 0), 0) / data.length;
}

export function calculatePercentageDiff(current, previous) {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
}

export function calculateWaterEfficiency(yieldValue, waterUsed) {
  return waterUsed ? (yieldValue / waterUsed).toFixed(2) : 0;
}

export function calculateFertilizerEfficiency(yieldValue, fertilizerUsed) {
  return fertilizerUsed ? (yieldValue / fertilizerUsed).toFixed(2) : 0;
}


export function calculateYieldPerHectare(totalYieldKg, areaHectares) {
    if (!areaHectares) return 0;
    return (totalYieldKg / areaHectares).toFixed(2);
}

export function calculatePerformanceIndex(data, weights = { yield: 0.4, sugar: 0.3, water: -0.2, fertilizer: -0.1 }) {
    const avgYield = calculateAverage(data, "grapeYield");
    const avgSugar = calculateAverage(data, "sugarLevel");
    const avgWater = calculateAverage(data, "waterUsed");
    const avgFertilizer = calculateAverage(data, "fertilizerUsed");

    const index = avgYield * weights.yield + avgSugar * weights.sugar + avgWater * weights.water + avgFertilizer * weights.fertilizer;
    return index.toFixed(2);
}


export function calculateStats(data, key) {
    if (!Array.isArray(data) || data.length === 0) return { avg: 0, min: 0, max: 0, stdDev: 0 };
    const values = data.map(item => safeValue(item[key]));
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const variance = values.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);
    return { avg, min, max, stdDev };
}

export function calculateCO2PerBottle(fertilizerUsed, yieldValue) {
    return (fertilizerUsed * 0.2 + yieldValue * 0.001).toFixed(2);
}

export function calculateWaterPerLiter(waterUsed, yieldValue) {
    return yieldValue ? (waterUsed / yieldValue).toFixed(2) : 0;
}
