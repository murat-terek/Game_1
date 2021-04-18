export const ROUND_RESULT = {
  STONE: 1,
  SCISSORS: 2,
  PAPER: 3,
}

export const roundToName = new Map([
  [ROUND_RESULT.STONE, 'Stone'],
  [ROUND_RESULT.SCISSORS, 'Scissors'],
  [ROUND_RESULT.PAPER, 'Paper'],
])

export const getRoundResult = (result1, result2) => {
  if (result1 === result2) {
    return 0
  }
  if (
    result1 === ROUND_RESULT.STONE && result2 === ROUND_RESULT.SCISSORS ||
    result1 === ROUND_RESULT.SCISSORS && result2 === ROUND_RESULT.PAPER ||
    result1 === ROUND_RESULT.PAPER && result2 === ROUND_RESULT.STONE 
  ) {
    return 1
  }

  return -1
}
