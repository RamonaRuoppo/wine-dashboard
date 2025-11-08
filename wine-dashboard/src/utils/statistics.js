/** 
 * Calcoli produttivi e statistici (trend, medie, variazioni)
 */ 

export function calculateAverage(data, key) {
    if (!Array.isArray(data) || data.length === 0) return 0;
    return data.reduce((sum, item) => sum + (item[key] || 0), 0) / data.length;
}

export function calculatePercentageDiff(current, previous) {
  if (!previous || previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

export function calculateEfficiency(yieldValue, waterUsed, fertilizerUsed) {
  if (!waterUsed && !fertilizerUsed) return 0;
  const denominator = (waterUsed || 0) + (fertilizerUsed || 0);
  return denominator ? (yieldValue / denominator).toFixed(2) : 0;
}

export function calculateYieldPerHectare(totalYieldKg, areaHectares) {
  if (!areaHectares) return 0;
  return (totalYieldKg / areaHectares).toFixed(2);
}

export function calculatePerformanceIndex(data) {
  const avgYield = calculateAverage(data, "grapeYield");
  const avgSugar = calculateAverage(data, "sugarLevel");
  const avgWater = calculateAverage(data, "waterUsed");
  const avgFertilizer = calculateAverage(data, "fertilizerUsed");

  // Pesi empirici: 40% resa, 30% qualità, penalità per input
  const index = avgYield * 0.4 + avgSugar * 0.3 - avgWater * 0.2 - avgFertilizer * 0.1;
  return index.toFixed(2);
}