// expectedDieValue calculates the expected value of rolling `n` X-sided side.
export function dieRollDistribution(n, dX) {
  const freqs = new Map();
  frequencyHelper(n, dX, freqs, 0);
  const totalCount = dX ** n;
  const probs = new Map();
  let expectedValue = 0;
  freqs.forEach((freq, num) => {
    const prob = freq / totalCount;
    probs.set(num, prob);
    expectedValue += num * prob;
  });
  return { distribution: probs, expectedValue };
}

function frequencyHelper(n, dX, freqs, total) {
  if (n === 0) {
    freqs.set(total, (freqs.get(total) || 0) + 1);
    return;
  }
  for (let i = 1; i <= dX; i++) {
    frequencyHelper(n - 1, dX, freqs, total + i);
  }
}

// Generates a random integer in [min, max)
export function randInt(min, max) {
  if (max === undefined) {
    max = min;
    min = 0;
  }
  return Math.floor(Math.random() * (max - min) + min);
}
