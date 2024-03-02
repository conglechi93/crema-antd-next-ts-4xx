import React from 'react';
import AppRowContainer from '@crema/components/AppRowContainer';
import { StyledProduct } from './index.styled';
import { Col } from 'antd';
import { ProductType } from '@crema/types/models/extrapages/Portfolio';
import Image from 'next/image';

type Props = {
  product: ProductType[];
};

const Product = ({ product }: Props) => {
  return (
    <StyledProduct>
      <AppRowContainer>
        {product.map((product, index) => (
          <Col xs={24} sm={12} md={6} key={index} className='product-grid'>
            <div className='product-img'>
              <Image
                src={product.srcImg}
                alt='Product'
                width={353}
                height={468}
              />
            </div>
          </Col>
        ))}
      </AppRowContainer>
    </StyledProduct>
  );
};

export default Product;
