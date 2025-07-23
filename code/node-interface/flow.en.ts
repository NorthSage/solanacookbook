import {
  Connection,
  Keypair,
  Transaction,
  TransactionInstruction,
  PublicKey,
} from "@solana/web3.js";
import * as nacl from "tweetnacl";

interface Node<TInput = any, TOutput = any> {
  run(input: TInput): Promise<TOutput>;
}

class GenerateKeypairNode implements Node<void, Keypair> {
  async run(): Promise<Keypair> {
    return Keypair.generate();
  }
}

class VerifySignatureNode
  implements
    Node<
      { message: Uint8Array; signature: Uint8Array; pubkey: PublicKey },
      boolean
    >
{
  async run({ message, signature, pubkey }): Promise<boolean> {
    return nacl.sign.detached.verify(message, signature, pubkey.toBytes());
  }
}

class CustomTransactionNode
  implements Node<{ instruction: TransactionInstruction }, Transaction>
{
  async run({ instruction }): Promise<Transaction> {
    return new Transaction().add(instruction);
  }
}

class SendTransactionNode
  implements
    Node<
      { connection: Connection; transaction: Transaction; signer: Keypair },
      string
    >
{
  async run({ connection, transaction, signer }): Promise<string> {
    return connection.sendTransaction(transaction, [signer]);
  }
}

(async () => {
  const connection = new Connection("https://api.devnet.solana.com");

  const keypair = await new GenerateKeypairNode().run();

  const message = new TextEncoder().encode("hello world");
  const signature = nacl.sign.detached(message, keypair.secretKey);
  const verified = await new VerifySignatureNode().run({
    message,
    signature,
    pubkey: keypair.publicKey,
  });

  if (verified) {
    const instruction = new TransactionInstruction({
      programId: keypair.publicKey,
      keys: [],
      data: Buffer.alloc(0),
    });
    const tx = await new CustomTransactionNode().run({ instruction });
    await new SendTransactionNode().run({
      connection,
      transaction: tx,
      signer: keypair,
    });
  }
})();
