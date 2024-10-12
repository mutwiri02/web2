import { useEffect, useState } from "react";
import scaffoldConfig from "~~/scaffold.config";
import { fetchPriceFromUniswap } from "~~/utils/scaffold-eth";

const enablePolling = false;

export const useNativeCurrencyPrice = () => {
  const [nativeCurrencyPrice, setNativeCurrencyPrice] = useState(0);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const updatePrice = async () => {
      const price = await fetchPriceFromUniswap();
      setNativeCurrencyPrice(price);

      if (enablePolling) {
        timeoutId = setTimeout(updatePrice, scaffoldConfig.pollingInterval);
      }
    };

    updatePrice();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return nativeCurrencyPrice;
};