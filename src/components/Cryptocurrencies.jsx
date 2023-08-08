import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified = false }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList?.data?.coins, searchTerm]);

  if (isFetching) return "Loading..";

  return (
    <>
      <div className="search-crypto">
        <Input
          placeholder="Search Cryptocurrency"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos &&
          cryptos.length > 0 &&
          cryptos.map((item) => (
            <Col xs={24} sm={12} lg={6} className="crypto-card" key={item.uuid}>
              <Link to={`/ctypto/${item.uuid}`}>
                <Card
                  title={`${item.rank}. ${item.name}`}
                  extra={<img className="crypto-image" src={item.iconUrl} />}
                  hoverable
                >
                  <p>Price: {millify(item.price)}</p>
                  <p>Market Cap: {millify(item.marketCap)}</p>
                  <p>Daily Change: {millify(item.change)}%</p>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
