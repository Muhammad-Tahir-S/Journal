import { collection, getDocs } from "firebase/firestore";

import TradesList from "./components/trades-list";
import { db } from "./firebase/config";

export default async function Home() {
  const fetchTrades = async () => {
    const docSnap = await getDocs(collection(db, "trades"));
    const trades: Trade[] = docSnap.docs.map(
      (d) => ({ ...d.data(), id: d.id }) as Trade,
    );
    console.log("trades", trades);
    return trades;
  };

  const trades = await fetchTrades();

  return <TradesList trades={trades} />;
}
