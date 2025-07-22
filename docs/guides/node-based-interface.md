---
title: Node-based Interface
head:
  - - meta
    - name: title
      content: Solana Cookbook | Node-based Interface
  - - meta
    - name: og:title
      content: Solana Cookbook | Node-based Interface
  - - meta
    - name: description
      content: Outline for building a node-based interface using cookbook examples
  - - meta
    - name: og:description
      content: Outline for building a node-based interface using cookbook examples
  - - meta
    - name: og:image
      content: https://solanacookbook.com/cookbook-sharing-card.png
  - - meta
    - name: og:image:alt
      content: Solana splash card
  - - meta
    - name: twitter:card
      content: summary
  - - meta
    - name: twitter:site
      content: "@solanacookbook"
  - - meta
    - name: twitter:image
      content: "https://solanacookbook.com/cookbook-sharing-card.png"
  - - meta
    - name: robots
      content: index,follow,noodp
  - - meta
    - name: googlebot
      content: index,follow
footer: MIT Licensed
---

# Node-based Interface

This guide outlines how to design a flow based interface where every cookbook function can be dropped into a visual node graph. Each node represents a function from the cookbook and can be connected together to build larger transactions.

## Facts

- **Node** – encapsulates a single cookbook function and exposes inputs and outputs for that function.
- **Edge** – connects one node’s output to another node’s input.
- **Conditional Nodes** – allow branching logic based on previous results.
- **Flow** – a graph of connected nodes that executes from left to right or top to bottom.

## Design

1. **Create a node for each function**. For example, a `Generate Keypair` node emits a `Keypair`. A `Verify Signature` node returns a boolean. A `Custom Transaction` node builds a `Transaction` from instructions.
2. **Define standard inputs and outputs** so nodes can connect together. For instance, the `Verify` node should accept a message, signature and public key from previous nodes.
3. **Allow conditional execution** by adding nodes that check booleans and route the flow. If the verification node outputs `true`, the flow can continue to a `Send Transaction` node.
4. **Keep nodes independent** so they can be reused in many flows. Any example from the cookbook can be wrapped this way.

## Example Flow

Below is an abridged TypeScript example that illustrates how a few nodes could be composed programmatically. In a visual editor each node would correspond to one block in the graph.

<CodeGroup>
  <CodeGroupItem title="TS" active>

@[code](@/code/node-interface/flow.en.ts)

  </CodeGroupItem>
</CodeGroup>

## Other Resources

- [Node-RED](https://nodered.org/) – popular open source flow based tool
- [Rete.js](https://rete.js.org/) – framework for building node editors in JavaScript

