import React, { useEffect } from "react";

import Grid from "../components/Grid";
import Helmet from "../components/Helmet";
import ProductCard from "../components/ProductCard";
import ProductView from "../components/ProductView";
import Section, { SectionBody, SectionTitle } from "../components/Section";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetailProduct } from "../redux/apiRequest";
import Loading from "../components/Loading";

const Product = (props) => {
  const slug = useParams();

  console.log(slug);
  const dispatch = useDispatch();

  useEffect(() => {
    getDetailProduct(dispatch, slug.slug);
  }, [slug.slug, dispatch]);

  const product_detail = useSelector((state) => state.products.product);
  const products = useSelector((state) => state.products.products);
  const pending = useSelector((state) => state.products.pending);

  const getProducts = (count) => {
    const max = products.length - count;
    const min = 0;
    const start = Math.floor(Math.random() * (max - min) + min);
    return products.slice(start, start + count);
  };
  const relatedProducts = getProducts(4);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [product_detail]);

  return (
    <Helmet title={product_detail.name}>
      {pending && product_detail ? (
        <Loading />
      ) : (
        <>
          <Section>
            <SectionBody>
              <ProductView product={product_detail} />
            </SectionBody>
          </Section>
          <Section>
            <SectionTitle>Khám phá thêm</SectionTitle>
            <SectionBody>
              <Grid col={4} mdCol={2} smCol={1} gap={20}>
                {relatedProducts?.map((item, index) => (
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
          </Section>
        </>
      )}
    </Helmet>
  );
};

export default Product;

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import Helmet from "../components/Helmet";
// import ProductView from "../components/ProductView";
// import Section, { SectionBody, SectionTitle } from "../components/Section";
// import { getDetailProduct } from "../redux/apiRequest";
// // getAllProduct
// const Product = () => {
//   const slug = useParams();

//   console.log(slug);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     getDetailProduct(dispatch, slug.slug);
//   }, [slug.slug, dispatch]);

//   const product_detail = useSelector((state) => state.products.product);
//   //   const products = useSelector((state) => state.product.products);

//   //   const getProducts = (count) => {
//   //     const max = products.length - count;
//   //     const min = 0;
//   //     const start = Math.floor(Math.random() * (max - min) + min);
//   //     return products.slice(start, start + count);
//   //   };
//   //   const relatedProducts = getProducts(4);

//   return (
//     <Helmet title={product_detail.name}>
//       <Section>
//         <SectionBody>
//           <ProductView product={product_detail} />
//         </SectionBody>
//       </Section>
//       <Section>
//         <SectionTitle>Khám phá thêm</SectionTitle>
//         <SectionBody>
//           {/* <Grid col={4} mdCol={2} smCol={1} gap={20}>
//             {relatedProducts.map((item, index) => (
//               <ProductCard
//                 key={index}
//                 img1={item.image}
//                 name={item.name}
//                 price={Number(item.price)}
//                 slug={item.code}
//               />
//             ))}
//           </Grid> */}
//         </SectionBody>
//       </Section>
//     </Helmet>
//   );
// };

// export default Product;
