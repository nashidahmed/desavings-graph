import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { SavingsCreated } from "../generated/SavingsFactory/SavingsFactory"

export function createSavingsCreatedEvent(
  creator: Address,
  savings: Address,
  whitelistTokens: Array<Address>,
  tokenDistribution: Array<ethereum.Tuple>
): SavingsCreated {
  let savingsCreatedEvent = changetype<SavingsCreated>(newMockEvent())

  savingsCreatedEvent.parameters = new Array()

  savingsCreatedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  savingsCreatedEvent.parameters.push(
    new ethereum.EventParam("savings", ethereum.Value.fromAddress(savings))
  )
  savingsCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "whitelistTokens",
      ethereum.Value.fromAddressArray(whitelistTokens)
    )
  )
  savingsCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenDistribution",
      ethereum.Value.fromTupleArray(tokenDistribution)
    )
  )

  return savingsCreatedEvent
}
