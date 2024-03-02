import React from 'react';
import AppRowContainer from '@crema/components/AppRowContainer';
import { Col } from 'antd';
import Link from 'next/link';
import {
  StyledConfirmationCard,
  StyledLinkBtn,
  StyledOrderPlacedAction,
  StyledOrderPlacedActionThumb,
  StyledOrderPlacedContent,
  StyledOrderPlacedInfo,
} from './index.styled';
import { getTotalPrice } from './helper';
import type { CartItemsType } from '@crema/types/models/ecommerce/EcommerceApp';
import Image from 'next/image';

type Props = {
  cartItems: CartItemsType[];
};
const OrderPlaced = ({ cartItems }: Props) => {
  return (
    <StyledConfirmationCard>
      <AppRowContainer>
        <Col xs={24} lg={16}>
          <StyledOrderPlacedInfo>
            <Image
              src={'/assets/images/ecommerce/gift.png'}
              alt='confirm'
              width={72}
              height={80}
            />
            <StyledOrderPlacedContent>
              <h3>Order placed for ${getTotalPrice(cartItems)}!</h3>
              <p className='mb-0'>
                Your {cartItems.length} Item will be delivered by Mon, 27 Aug
                20.
              </p>
            </StyledOrderPlacedContent>
          </StyledOrderPlacedInfo>
        </Col>
        <Col xs={24} lg={8}>
          <StyledOrderPlacedAction>
            <div>
              <p>Why call? Just click!</p>
              <p>Easily track all your orders! </p>
              <StyledLinkBtn type='primary'>
                <Link href='/ecommerce/orders'>Go to My Orders</Link>
              </StyledLinkBtn>
            </div>
            <StyledOrderPlacedActionThumb>
              <Image
                style={{ marginTop: 20 }}
                src={'/assets/images/ecommerce/confirm-box.png'}
                alt='confirm'
                height={60}
                width={57}
              />
            </StyledOrderPlacedActionThumb>
          </StyledOrderPlacedAction>
        </Col>
      </AppRowContainer>
    </StyledConfirmationCard>
  );
};

export default OrderPlaced;
