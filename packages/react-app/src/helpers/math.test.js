import {dieRollDistribution} from './math'

describe("Test die rolling", () => {
  it("Simple distribution is correct", () => {
    const distribution = dieRollDistribution(1, 6)
    expect(distribution.distribution).toEqual(new Map([
      [1, 1/6],
      [2, 1/6],
      [3, 1/6],
      [4, 1/6],
      [5, 1/6],
      [6, 1/6],
    ]))
    expect(distribution.expectedValue).toBe(3.5)
  })

  it("Two die rolled", () => {
    const distribution = dieRollDistribution(2, 4)
    expect(distribution.distribution).toEqual(new Map([
      [2, 1/16],
      [3, 2/16],
      [4, 3/16],
      [5, 4/16],
      [6, 3/16],
      [7, 2/16],
      [8, 1/16],
    ]))
    expect(distribution.expectedValue).toBe(5)
  })
})
