import React from "react";
import { FiSearch } from "react-icons/fi";
import { AiOutlineLink } from "react-icons/ai";
import CardWrapper from "./CardMediaWrapper";
import {
  StyledCardWrapper,
  StyledSecondaryText,
  StyledTitle,
} from "./index.styled";
import { PortfolioTypes } from "@crema/types/models/extrapages/Portfolio";
import Image from "next/image";

type Props = {
  portfolio: PortfolioTypes;
  onViewPortfolioDetail: (data: PortfolioTypes) => void;
};

const PortfolioCard = ({ portfolio, onViewPortfolioDetail }: Props) => {
  return (
    <CardWrapper onClick={() => onViewPortfolioDetail(portfolio)}>
      <div className="card-media-wrapper">
        <StyledCardWrapper
          cover={<Image alt="example" src={portfolio.srcImg} width={376} height={325}/>}
          alt="Portfolio"
        />
        <div className="card-media-content">
          <div className="icon">
            <FiSearch />
          </div>
          <div className="icon">
            <AiOutlineLink />
          </div>
        </div>
      </div>
      <div className="card-content">
        <StyledTitle>{portfolio.title}</StyledTitle>
        <StyledSecondaryText>{portfolio.subTitle}</StyledSecondaryText>
      </div>
    </CardWrapper>
  );
};

export default PortfolioCard;
