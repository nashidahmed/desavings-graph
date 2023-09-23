import { OutgoingToken, Saving, Transaction } from "../../generated/schema"
import { ReceivedFunds as ReceivedFundsEvent } from "../../generated/templates/Savings/Savings"

export function handleReceivedFunds(event: ReceivedFundsEvent): void {
  let transaction = new Transaction(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  transaction.savings = event.params.savings
  transaction.tokenIn = event.params.tokenIn
  transaction.amountIn = event.params.amountIn

  for (let x = 0; x < event.params.outgoingTokens.length; x++) {
    let outgoingToken = new OutgoingToken(event.transaction.hash.concatI32(x))
    outgoingToken.transaction = event.transaction.hash.concatI32(
      event.logIndex.toI32()
    )
    outgoingToken.token = event.params.outgoingTokens[x].token
    outgoingToken.amount = event.params.outgoingTokens[x].amount
    outgoingToken.save()
  }

  transaction.save()
}
