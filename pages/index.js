import { ConnectWallet, useNFTs, Web3Button } from "@thirdweb-dev/react";
import {
  useContract,
  useNFT,
  useMintNFT,
  ThirdwebNftMedia,
} from "@thirdweb-dev/react";

export default function Home() {
  const { contract } = useContract(
    "0x4c79a7dFd4b22fcFf10d93a321696a30b5C7FdB5"
  );
  const { data: nfts, isLoading: isReadingNfts } = useNFTs(contract);
  const { mutate: mintNFT, isLoading: isMintingNFT } = useMintNFT(contract);
  const contractAddress = "0x4c79a7dFd4b22fcFf10d93a321696a30b5C7FdB5";

  return (
    <div>
      <div>
        <h2>My NFTs</h2>
        {isReadingNfts ? (
          <p>Loading...</p>
        ) : (
          <div>
            {nfts.map((nft) => (
              <ThirdwebNftMedia
                key={nft.tokenId}
                metadata={nft.metadata}
                height={200}
              />
            ))}
          </div>
        )}
      </div>

      <Web3Button
        contractAddress={contractAddress}
        action={(contract) =>
          contract.erc721.mint({ name: "Hello world!", image: "ipfs://QmQBHarz2WFczTjz5GnhjHrbUPDnB48W5BM2v2h6HbE1rZ/1.png" })
        }
      >
        {" "}
        Mint NFT
      </Web3Button>
    </div>
  );
  // return <ConnectWallet accentColor="#f213a4" colorMode="light" />;
}
