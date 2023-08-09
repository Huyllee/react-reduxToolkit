import React, { useRef, useState } from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment/moment";
import { Link } from "react-router-dom";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text, Title } = Typography;
const { Option } = Select;

const defaultImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified = false }) => {
  const count = simplified ? 6 : 12;
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });
  const ref = useRef("noreferrer");

  if (isFetching) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {data?.data?.coins.map((item) => (
              <Option key={item.uuid} value={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews?.value?.map((item, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card className="news-card" hoverable>
            <a href={item.url} target="_blank" ref={ref}>
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {item.name}
                </Title>
                <img
                  style={{ maxWidth: "200px", maxHeight: "100px" }}
                  src={item?.image?.thumbnail?.contentUrl || defaultImage}
                  alt="news"
                />
              </div>
              <p>
                {item.description.length > 100
                  ? `${item.description.substring(0, 100)}...`
                  : item.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar
                    src={
                      item.provider[0]?.image?.thumbnail?.contentUrl ||
                      defaultImage
                    }
                    alt="news"
                  />
                  <Text className="provider-name">
                    {item.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(item.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
