class DefiLiquidityTool {
  calculateLiquidity(tokenA, tokenB, reserveA, reserveB) {
    const k = reserveA * reserveB;
    const price = reserveB / reserveA;
    return {
      pair: `${tokenA}/${tokenB}`,
      reserveA, reserveB, k, price,
      tvl: (reserveA + reserveB * price)
    };
  }

  calculateSwap(inputAmount, reserveIn, reserveOut) {
    const inputWithFee = inputAmount * 0.997;
    const output = (inputWithFee * reserveOut) / (reserveIn + inputWithFee);
    const newReserveIn = reserveIn + inputAmount;
    const newReserveOut = reserveOut - output;
    return { outputAmount: output, newReserveIn, newReserveOut };
  }

  calculateImpermanentLoss(priceRatioChange) {
    const sqrt = Math.sqrt(priceRatioChange);
    const il = 2 * sqrt / (1 + priceRatioChange) - 1;
    return (il * 100).toFixed(4) + '%';
  }
}

module.exports = DefiLiquidityTool;
