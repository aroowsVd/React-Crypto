import { Link, Outlet, useLocation, useMatch, useParams } from "react-router-dom"
import styled from "styled-components";
import { useQueries } from "@tanstack/react-query";
import { fetchCoinInfo, fetchCoinTickers } from "../api/fetchCoins";

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

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin: 0 0 5px 0;
  }
`;

const Description = styled.p`
  margin: 20px 0;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 25px 0;
`;

const Tab = styled.span<{ $isActive: boolean; }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background: rgba(0, 0, 0, 0.5);
  padding: 7px 0;
  border-radius: 10px;
  a {
    display: block;
    color: ${props => props.$isActive ? props.theme.accentColor : props.theme.textColor};
  }
`;

function Coin() {
  const { coinId } = useParams<{ coinId: string | undefined }>();
  const { state } = useLocation();
  const priceMatch = useMatch(`/:coinId/price`);
  const chartMatch = useMatch(`/:coinId/chart`);

  const queries = useQueries({
    queries: [
      {
        queryKey: ['infoData', coinId],
        queryFn: () => fetchCoinInfo(coinId)
      },
      {
        queryKey: ['priceData', coinId],
        queryFn: () => fetchCoinTickers(coinId)
      }
    ]
  })
  const [{ data: info, isLoading: infoLoading }, { data: priceInfo, isLoading: priceLoading }] = queries;
  const loading = infoLoading || priceLoading;

  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name : loading ? "Loading..." : info?.name}</Title>
      </Header>
      {loading ? (
        <Loader>loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab $isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab $isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Outlet />
        </>
      )}
    </Container>
  )
}

export default Coin