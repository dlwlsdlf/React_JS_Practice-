import Button from "./Button";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const [money,setMoney] =useState(0);
  const [result,setResult] =useState(0);
  const onChange = (event)=>setMoney(event.target.value);
  const onSelect = (event) =>setResult(event.target.value);

  return (
    <div>
      <h1>The Coins! {loading ? "" :`(${coins.length})` }</h1>
      {loading ? <strong>Loding...</strong> : (
        <select onChange={onSelect}>
        {coins.map((coin) => (
          <option key={coin.id} value={coin.quotes.USD.price}>
            {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
          </option>
        ))}
      </select>)}
      <input
        value={money}
        type="number"
        placeholder="money (us)"
        onChange={onChange}
      />
      <h2> you get ({money/result})</h2>
    </div>
  );
}

export default App;
