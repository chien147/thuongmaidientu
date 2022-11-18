import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import Grid from "../components/Grid";
import Helmet from "../components/Helmet";
import HeroSlider from "../components/HeroSlider";
import PolicyCard from "../components/PolicyCard";
import ProductCard from "../components/ProductCard";
import Section, { SectionBody, SectionTitle } from "../components/Section";

import heroSliderData from "../assets/fake-data/hero-slider";
import policy from "../assets/fake-data/policy";
import productData from "../assets/fake-data/products";

import { useDispatch, useSelector } from "react-redux";
import banner from "../assets/images/banner.png";
import { getAllProduct } from "../redux/apiRequest";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products?.products);

  useEffect(() => {
    getAllProduct(dispatch);
  }, [dispatch]);

  return (
    <Helmet title="Trang chủ">
      {/* hero slider */}
      <HeroSlider
        data={heroSliderData}
        control={true}
        auto={false}
        timeOut={5000}
      />
      {/* end hero slider */}
      {/* policy section */}
      <Section>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {policy.map((item, index) => (
              <Link key={index} to="/policy">
                <PolicyCard
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
              </Link>
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end policy section */}
      {/* best selling section */}
      <Section>
        <SectionTitle>top sản phẩm bán chạy trong tuần</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {products?.map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image}
                img02={item.image}
                name={item.name}
                price={Number(item.price)}
                discount={Number(item.discount)}
                slug={item.code}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section>
      {/* end best selling section */}
      {/* new arrival section */}
      {/* <Section>
        <SectionTitle>sản phẩm mới</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData.getProducts(8).map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image}
                img02={item.image}
                name={item.name}
                price={Number(item.price)}
                slug={item.code}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section> */}
      {/* end new arrival section */}
      {/* banner */}
      <Section>
        <SectionBody>
          <Link to="/catalog">
            <img src={banner} alt="" />
          </Link>
        </SectionBody>
      </Section>
      {/* end banner */}
      {/* popular product section */}
      {/* <Section>
        <SectionTitle>phổ biến</SectionTitle>
        <SectionBody>
          <Grid col={4} mdCol={2} smCol={1} gap={20}>
            {productData.getProducts(12).map((item, index) => (
              <ProductCard
                key={index}
                img01={item.image}
                img02={item.image}
                name={item.name}
                price={Number(item.price)}
                slug={item.code}
              />
            ))}
          </Grid>
        </SectionBody>
      </Section> */}
      {/* end popular product section */}
    </Helmet>
  );
};

export default Home;
