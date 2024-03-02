import React from 'react';
import {
  useSidebarActionsContext,
  useSidebarContext,
} from '@crema/context/AppContextProvider/SidebarContextProvider';
import NavMenuStyle from './NavMenuStyle';
import IntlMessages from '@crema/helpers/IntlMessages';
import { CheckOutlined } from '@ant-design/icons';
import { StyledSidebarSettings } from './index.styled';
import {
  StyledCustomizedItem,
  StyledCustomizedSwitch,
  StyledCustomizedSwitchView,
  StyledCustomizeNavOption,
  StyledCustomizeNavOptionContent,
  StyledCustomizeNavOptionItem,
  StyledCustomizeNavOptionRightIcon,
} from '../index.styled';
import { sidebarBgImages } from '@crema/fakedb/navigationStyle';
import Image from 'next/image';

const SidebarSettings = () => {
  const { sidebarBgImageId, allowSidebarBgImage } = useSidebarContext();

  const { updateSidebarBgImage, setSidebarBgImage } =
    useSidebarActionsContext();

  const onToggleSidebarImage = () => {
    setSidebarBgImage(!allowSidebarBgImage);
  };
  const onUpdateSidebarBgImage = (image: number | string) => {
    updateSidebarBgImage(image);
  };

  return (
    <StyledSidebarSettings>
      <NavMenuStyle />
      <StyledCustomizedItem>
        <StyledCustomizedSwitchView>
          <h4>
            <IntlMessages id='customizer.sidebarImage' />
          </h4>
          <StyledCustomizedSwitch
            checked={allowSidebarBgImage}
            onChange={onToggleSidebarImage}
          />
        </StyledCustomizedSwitchView>

        {allowSidebarBgImage ? (
          <StyledCustomizeNavOption style={{ marginTop: 20 }}>
            {sidebarBgImages.map((imagesObj) => {
              return (
                <StyledCustomizeNavOptionItem key={imagesObj.id}>
                  <StyledCustomizeNavOptionContent
                    onClick={() => onUpdateSidebarBgImage(imagesObj.id)}
                  >
                    <Image
                      src={`${imagesObj.image}`}
                      alt='nav'
                      width={40}
                      height={80}
                    />
                    {sidebarBgImageId === imagesObj.id ? (
                      <StyledCustomizeNavOptionRightIcon>
                        <CheckOutlined />
                      </StyledCustomizeNavOptionRightIcon>
                    ) : null}
                  </StyledCustomizeNavOptionContent>
                </StyledCustomizeNavOptionItem>
              );
            })}
          </StyledCustomizeNavOption>
        ) : null}
      </StyledCustomizedItem>
    </StyledSidebarSettings>
  );
};

export default SidebarSettings;
