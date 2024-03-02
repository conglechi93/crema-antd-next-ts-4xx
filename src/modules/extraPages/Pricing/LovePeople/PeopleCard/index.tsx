import React from "react";
import { Card } from "antd";
import { StyledHeading, StyledLearnBtn, StyledText } from "./index.styled";
import type { GitPackageType } from "@crema/types/models/extrapages/Pricing";
import { AiOutlineArrowRight } from "react-icons/ai";
import Image from "next/image";

type Props = {
  data: GitPackageType;
};

const PeopleCard = ({ data }: Props) => {
  console.log(data);
  return (
    <Card style={{ minHeight: 320 }}>
      <Image src={data.src} alt="crema-logo" width={106} height={106}/>
      <StyledHeading>{data.heading}</StyledHeading>
      <StyledText>{data.text}</StyledText>
      <StyledLearnBtn type="link">
        <span className="btn-text">Learn More</span>
        <AiOutlineArrowRight className="icon" size={16} />
      </StyledLearnBtn>
    </Card>
  );
};

export default PeopleCard;
