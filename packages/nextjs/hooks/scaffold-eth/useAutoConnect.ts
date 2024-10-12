import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { hardhat } from "viem/chains";
import { Connector, useAccount, useConnect } from "wagmi";
import scaffoldConfig from "~~/scaffold.config";
import { burnerWalletId, defaultBurnerChainId } from "~~/services/web3/wagmi-burner/BurnerConnector";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

const SCAFFOLD_WALLET_STORAGE_KEY = "scaffoldEth2.wallet";
const WAGMI_WALLET_STORAGE_KEY = "wagmi.wallet";

// ID of the SAFE connector instance
const SAFE_ID = "safe";


/**
 * This function will get the initial wallet connector (if any), the app will connect to
 * @param previousWalletId
 * @param connectors
 * @returns
 */
const getInitialConnector = (
  previousWalletId: string,
  connectors: Connector[],
): { connector: Connector | undefined; chainId?: number } | undefined => {
  // Look for the SAFE connector instance and connect to it instantly if loaded in SAFE frame
  const safeConnectorInstance = connectors.find(connector => connector.id === SAFE_ID && connector.ready);
  if (safeConnectorInstance) {
    return { connector: safeConnectorInstance };
  }

  const targetNetwork = getTargetNetwork();
  const allowBurner = scaffoldConfig.onlyLocalBurnerWallet ? targetNetwork.id === hardhat.id : true;

  if (!previousWalletId) {
    // The user was not connected to a wallet
    if (allowBurner && scaffoldConfig.walletAutoConnect) {
      const connector = connectors.find(f => f.id === burnerWalletId);
      return { connector, chainId: defaultBurnerChainId };
    }
  } else {
    // the user was connected to wallet
    if (scaffoldConfig.walletAutoConnect) {
      if (previousWalletId === burnerWalletId && !allowBurner) {
        return;
      }
      const connector = connectors.find(f => f.id === previousWalletId);
      return { connector };
    }
  }

  return undefined;
};


export const useAutoConnect = (): void => {
  const [wagmiWalletValue, setWagmiWalletValue] = useState<string | null>(null);
  const [walletId, setWalletId] = useLocalStorage<string>(SCAFFOLD_WALLET_STORAGE_KEY, "");
  const connectState = useConnect();
  const accountState = useAccount();

  useEffect(() => {
    const storedValue = window.localStorage.getItem(WAGMI_WALLET_STORAGE_KEY);
    if (storedValue) {
      try {
        setWagmiWalletValue(JSON.parse(storedValue));
      } catch (error) {
        console.error("Failed to parse stored wallet value:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (wagmiWalletValue && !walletId) {
      setWalletId(wagmiWalletValue);
    }
  }, [wagmiWalletValue, walletId, setWalletId]);

  useEffect(() => {
    if (accountState.isConnected) {
      setWalletId(accountState.connector?.id ?? "");
    } else {
      window.localStorage.setItem(WAGMI_WALLET_STORAGE_KEY, JSON.stringify(""));
      setWalletId("");
    }
  }, [accountState.isConnected, accountState.connector?.id, setWalletId]);

  // Replace useEffectOnce with useEffect and an empty dependency array
  useEffect(() => {
    const initialConnector = getInitialConnector(walletId, connectState.connectors);
    if (initialConnector?.connector) {
      connectState.connect({ connector: initialConnector.connector, chainId: initialConnector.chainId });
    }
  }, []); // Empty dependency array to run only once on mount
};



