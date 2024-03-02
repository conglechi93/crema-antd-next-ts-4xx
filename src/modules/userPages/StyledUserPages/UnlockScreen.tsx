import React from 'react';
import IntlMessages from '@crema/helpers/IntlMessages';
import AppAnimate from '@crema/components/AppAnimate';
import { useIntl } from 'react-intl';
import AppRowContainer from '@crema/components/AppRowContainer';
import { Col, Form, Input } from 'antd';
import AppPageMeta from '@crema/components/AppPageMeta';
import Logo from '../../../assets/user/lock-screen.png';
import {
  StyledUserCardHeader,
  StyledUserCardPara,
  StyledUserCardUnlock,
  StyledUserContainer,
  StyledUserForm,
  StyledUserFormBtn,
  StyledUserPages,
  StyledUserStyledImgAuto,
} from '../index.styled';
import Image from 'next/image';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const UnlockScreen = () => {
  const { messages } = useIntl();

  return (
    <StyledUserPages>
      <AppPageMeta title='Unlock Screen' />
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <StyledUserContainer key='a'>
          <StyledUserCardUnlock>
            <AppRowContainer>
              <Col xs={24} md={12}>
                <StyledUserStyledImgAuto className='user-styled-img'>
                  <Image alt='logo' src={Logo} width={422} height={382} />
                </StyledUserStyledImgAuto>
              </Col>

              <Col xs={24} md={12}>
                <StyledUserCardHeader>
                  <h3>
                    <IntlMessages id='common.unlockScreen' />
                  </h3>
                </StyledUserCardHeader>
                <StyledUserCardPara>
                  <span>
                    <IntlMessages id='common.unlockScreenTextOne' />
                  </span>
                  <span>
                    <IntlMessages id='common.unlockScreenTextTwo' />
                  </span>
                </StyledUserCardPara>

                <StyledUserForm
                  className='mb-0'
                  name='basic'
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    name='password'
                    className='form-field-lg'
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Password!',
                      },
                    ]}
                  >
                    <Input
                      type='password'
                      placeholder={messages['common.password'] as string}
                    />
                  </Form.Item>

                  <StyledUserFormBtn type='primary' htmlType='submit'>
                    <IntlMessages id='common.unlockItForMe' />
                  </StyledUserFormBtn>
                </StyledUserForm>
              </Col>
            </AppRowContainer>
          </StyledUserCardUnlock>
        </StyledUserContainer>
      </AppAnimate>
    </StyledUserPages>
  );
};

export default UnlockScreen;
