import { Link } from "react-router-dom";
import styled from "styled-components"
import { ICoin } from "../types/ICoin";
import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api/fetchCoins";

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
  const { data, isLoading } = useQuery<ICoin[]>({
    queryKey: ['allCoins'],
    queryFn: fetchCoins,
  })

  return (
    <Container>
      <Header>
        <Title>COINS</Title>
      </Header>
      {isLoading ? (
        <Loader>loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map(coin => (
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