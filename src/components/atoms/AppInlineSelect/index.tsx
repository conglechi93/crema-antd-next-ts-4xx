import {useState} from 'react';

import {jsx} from '@emotion/react';

import {Box, xcss} from '@atlaskit/primitives';
import {ValueType} from '@atlaskit/select';
import Tag from '@atlaskit/tag';
import Group from '@atlaskit/tag-group';
import {
  fontSize as getFontSize,
  // eslint-disable-next-line @atlaskit/design-system/no-deprecated-imports
  gridSize as getGridSize,
} from '@atlaskit/theme/constants';
import styles from './style.module.scss';

import InlineEdit from '@atlaskit/inline-edit';
import AppFormItem from 'components/atoms/AppFormItem';
import {Select} from 'antd';
interface OptionType {
  label: string;
  value: string;
}
const containerStyles = xcss({
  paddingBlockStart: 'space.100',
  paddingInlineEnd: 'space.100',
  paddingBlockEnd: 'space.600',
});

const fontSize = getFontSize();
const gridSize = getGridSize();

const readViewContainerStyles = xcss({
  display: 'flex',
  maxWidth: '100%',
  height: `${(gridSize * 2.5) / fontSize}em`,
  paddingBlock: 'space.100',
  paddingInline: 'space.075',
  fontSize: `${fontSize}px`,
  lineHeight: `${(gridSize * 2.5) / fontSize}`,
});

const editViewContainerStyles = xcss({
  position: 'relative',
  zIndex: 'dialog',
});
const tagGroupContainerStyles = xcss({padding: 'space.050'});
interface Props {
  fieldName?: string;
  editValue: ValueType<OptionType, true>;
  setEditValue: (value: ValueType<OptionType, true>) => void;
  options: OptionType[];
  placeholder?: string;
  isMulti?: boolean;
}
const AppInlineSelect = (props: Props) => {
  const {
    editValue,
    setEditValue,
    options,
    placeholder,
    isMulti = false,
    fieldName = '',
  } = props;
  const [viewOptions, setViewOptions] = useState<any>([]);
  const handleChangeSelect = (e, options) => {
    if (!e) {
      setViewOptions([]);
      return;
    }
    const values: any = isMulti ? options : [options];
    setViewOptions(values);
  };
  const onConfirm = (value: ValueType<OptionType, true>) => {
    if (!value) {
      setEditValue([]);
      return;
    }
    setEditValue(viewOptions);
  };
  return (
    <div className={styles.app_inline_select}>
      <Box xcss={containerStyles}>
        <InlineEdit<ValueType<OptionType, true>>
          defaultValue={editValue}
          editView={(fieldProps) => (
            <Box xcss={editViewContainerStyles}>
              <AppFormItem name={fieldName}>
                <Select
                  options={options}
                  autoFocus
                  allowClear
                  defaultValue={
                    isMulti ? editValue.map((item) => item?.value) : editValue
                  }
                  placeholder={placeholder ? placeholder : 'Chọn giá trị'}
                  mode={isMulti ? 'multiple' : undefined}
                  onChange={handleChangeSelect}
                />
              </AppFormItem>
            </Box>
          )}
          readView={() =>
            editValue && editValue.length === 0 ? (
              <Box xcss={readViewContainerStyles}>
                {placeholder ? placeholder : 'Chọn giá trị'}
              </Box>
            ) : (
              <Box xcss={tagGroupContainerStyles}>
                <Group>
                  {editValue &&
                    editValue?.map((option: OptionType) => (
                      <Tag text={option?.label} key={option?.label} />
                    ))}
                </Group>
              </Box>
            )
          }
          onConfirm={onConfirm}
        />
      </Box>
    </div>
  );
};
export default AppInlineSelect;
