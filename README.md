# DeSavings Subgraph

Here lies the code of the Subgraph used by DeSavings to fetch the transaction data. The overall data structure would look like the following

```gql
saving {
  id
  tokenDistribution {
    token
    distribution
  }
  transactions {
    id
    tokenIn
    amountIn
    outgoingTokens {
      token
      amount
    }
  }
}
```
