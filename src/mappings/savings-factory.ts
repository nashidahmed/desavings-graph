import { SavingsCreated as SavingsCreatedEvent } from "../../generated/SavingsFactory/SavingsFactory"
import { Saving, TokenDistribution } from "../../generated/schema"
import { Savings as SavingsTemplate } from "../../generated/templates"

export function handleSavingsCreated(event: SavingsCreatedEvent): void {
  SavingsTemplate.create(event.params.savings)
  let saving = new Saving(event.params.savings)
  saving.creator = event.params.creator
  // event.params.whitelistTokens.forEach((token, x) => {
  //   entity.whitelistTokens[x] = token
  // })

  for (let x = 0; x < event.params.tokenDistribution.length; x++) {
    let tokenDistribution = new TokenDistribution(
      event.transaction.hash.concatI32(x)
    )
    tokenDistribution.savings = event.params.savings
    tokenDistribution.token = event.params.tokenDistribution[x].token
    tokenDistribution.distribution =
      event.params.tokenDistribution[x].distribution
    tokenDistribution.save()
  }

  saving.save()
}
