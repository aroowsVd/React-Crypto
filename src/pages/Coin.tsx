import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import styled from "styled-components";
import { IInfoData, IPriceData } from "../types/coinDetailInterface";

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

function Coin() {
  const { state } = useLocation();
  const [loading, setLoading] = useState<boolean>(true);
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();

  useEffect(() => {
    (async() => {
      const infoData = await fetch(`https://api.coinpaprika.com/v1/coins/${state.id}`);
      const data01 = await infoData.json();
      const priceData = await fetch(`https://api.coinpaprika.com/v1/tickers/${state.id}`);
      const data02 = await priceData.json();
      setInfo(data01);
      setPriceInfo(data02);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? (
        <Loader>loading...</Loader>
      ) : (
        <span>{info.hello}</span>
      )}
    </Container>
  )
}

export default Coin