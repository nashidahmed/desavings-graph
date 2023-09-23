import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { SavingsCreated } from "../generated/schema"
import { SavingsCreated as SavingsCreatedEvent } from "../generated/SavingsFactory/SavingsFactory"
import { handleSavingsCreated } from "../src/savings-factory"
import { createSavingsCreatedEvent } from "./savings-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let creator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let savings = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let whitelistTokens = [
      Address.fromString("0x0000000000000000000000000000000000000001")
    ]
    let tokenDistribution = ["ethereum.Tuple Not implemented"]
    let newSavingsCreatedEvent = createSavingsCreatedEvent(
      creator,
      savings,
      whitelistTokens,
      tokenDistribution
    )
    handleSavingsCreated(newSavingsCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("SavingsCreated created and stored", () => {
    assert.entityCount("SavingsCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "SavingsCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "creator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "SavingsCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "savings",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "SavingsCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "whitelistTokens",
      "[0x0000000000000000000000000000000000000001]"
    )
    assert.fieldEquals(
      "SavingsCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenDistribution",
      "[ethereum.Tuple Not implemented]"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
