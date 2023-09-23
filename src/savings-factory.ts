import { SavingsCreated as SavingsCreatedEvent } from "../generated/SavingsFactory/SavingsFactory"
import { SavingsCreated } from "../generated/schema"

export function handleSavingsCreated(event: SavingsCreatedEvent): void {
  let entity = new SavingsCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.creator = event.params.creator
  entity.savings = event.params.savings
  entity.whitelistTokens = event.params.whitelistTokens
  entity.tokenDistribution = event.params.tokenDistribution

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
