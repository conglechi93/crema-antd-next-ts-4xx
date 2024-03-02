'use client';
import React, { useEffect } from 'react';
import AppCard from '@crema/components/AppCard';
import AppInfoView from '@crema/components/AppInfoView';
import AppAnimate from '@crema/components/AppAnimate';
import AppRowContainer from '@crema/components/AppRowContainer';
import { Col } from 'antd';
import AppPageMeta from '@crema/components/AppPageMeta';
import { useParams, useRouter } from 'next/navigation';
import { StyledProductDetails } from './index.styled';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import ProductImageSlide from './ProductImageSlide';
import Header from './Header';
import ProductView from './ProductView';
import SimilarProduct from './SimilarProduct';
import type { ProductDataType } from '@crema/types/models/ecommerce/EcommerceApp';

const ProductDetail = () => {
  const params = useParams();
  const { all } = params;

  const [{ apiData: currentProduct }, { setQueryParams }] =
    useGetDataApi<ProductDataType>('ecommerce', undefined, {}, false);

  useEffect(() => {
    setQueryParams({ id: all?.[0] });
  }, [all]);

  return (
    <StyledProductDetails>
      <AppPageMeta title='Product Details' />
      {currentProduct ? (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <AppCard key='product_detail'>
            <Header product={currentProduct} />
            <AppRowContainer>
              <Col sm={24} lg={8}>
                <ProductImageSlide product={currentProduct} />
              </Col>
              <Col sm={24} lg={16}>
                <ProductView product={currentProduct} />
              </Col>
            </AppRowContainer>
            <SimilarProduct />
          </AppCard>
        </AppAnimate>
      ) : null}
      <AppInfoView />
    </StyledProductDetails>
  );
};

export default ProductDetail;
