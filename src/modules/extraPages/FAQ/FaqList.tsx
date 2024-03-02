import React from 'react';
import { Collapse } from 'antd';
import { StyledFaqList } from './index.styled';
import { GeneralFaq } from '@crema/fakedb/extraPages';

const { Panel } = Collapse;

function callback(key: any) {
  console.log(key);
}

type FaqListProps = {
  faqList: GeneralFaq[];
};

const FaqList: React.FC<FaqListProps> = ({ faqList }) => {
  console.log(faqList[0].id);

  return (
    <StyledFaqList>
      <Collapse
        defaultActiveKey={faqList[0].id}
        items={faqList.map((item) => {
          return {
            key: item.id,
            label: item.ques,
            children: <p>{item.ans}</p>,
          };
        })}
        onChange={callback}
      />
    </StyledFaqList>
  );
};

export default FaqList;
