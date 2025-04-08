import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components"
import { ICoin } from "../types/ICoin";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background: white;
  color: ${props => props.theme.bgColor};
  margin: 0 0 10px 0 ;
  border-radius: 15px;
  a {
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
`;

function Coins() {
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async() => {
      const res = await fetch("https://api.coinpaprika.com/v1/coins")
      const data = await res.json();
      setCoins(data.slice(0, 100));
      setLoading(false);
    })();
  }, [])

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? (
        <Loader>loading...</Loader>
      ) : (
        <CoinsList>
          {coins.map(coin => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin}>
                <Img src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`} />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  )
}

export default Coins