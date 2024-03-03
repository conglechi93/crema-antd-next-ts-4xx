import {Checkbox, Tooltip} from 'antd';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

const useStep4 = (
  current: number,
  customerCode: Array<any>,
  tblLabels: Array<any>,
  tblEntries: Array<any>,
  dataSource: Array<any>,
  setDataSource: (dataSource: Array<any>) => void,
) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState<Array<any>>([]);

  useEffect(() => {
    if (current != 3) return;
    const columns: Array<any> = [
      {
        title: 'STT',
        dataIndex: 'index',
        textAlign: 'center',
        width: 40,
        render: (_: any, record: any) => {
          return <div>{record.index}</div>;
        },
      },
      {
        title: 'Trường thôi tin',
        dataIndex: 'category',
        textAlign: 'center',
        width: 100,
        render: (_: any, record: any) => {
          return <div>{record.category}</div>;
        },
      },
    ];
    const data: Array<any> = [];
    const tblEntriesValues: Array<any> = [];
    tblEntries?.map((item: any, index: number) => {
      columns?.push({
        title: `Chi tiết ${index + 1}` as string,
        dataIndex: `${index}`,
        textAlign: 'center',
        editable: true,
        ellipsis: {
          showTitle: false,
        },
        render: (_: any, record: any) => {
          return (
            <>
              <Checkbox checked={record[`${index}`]?.checked ? true : false}>
                {record[`${index}`]?.label ?? ''}
              </Checkbox>
            </>
          );
        },
        width: 150,
      });
      let tblEntriesItem: any = [];
      Object.keys(item).map((key: any, idx: number) => {
        tblEntriesItem.push({
          key: key,
          label: item[key] ?? '',
          value: key,
        });
      });
      tblEntriesValues.push(tblEntriesItem);
    });
    tblLabels?.map((item: any, index: number) => {
      const labelCode = item?.code;
      let dataObjects: any = {
        index: index + 1,
        key: index,
        category: item?.name ?? '',
      };

      tblEntriesValues?.map((tblEntry: Array<any>, tblEntryIndex: number) => {
        tblEntry.map((tblEntryItem: any) => {
          if (labelCode === tblEntryItem?.key) {
            dataObjects = {
              ...dataObjects,
              [tblEntryIndex]: {
                label: tblEntryItem?.label ?? '',
                value: tblEntryItem?.value ?? '',
                checked: false,
              },
            };
          }
        });
      });
      data.push(dataObjects);
    });
    setColumns(columns);
    setDataSource(data);
  }, [current, tblEntries, tblLabels]);

  const handleSave = (row: any, checked: boolean, dataIndex: number) => {
    const selectedRow = row[`${dataIndex}`];
    selectedRow[`${dataIndex}`].checked = checked;
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      [Number(dataIndex)]: {
        ...selectedRow[`${dataIndex}`],
      },
    });
    console.log(newData);
    setDataSource(newData);
  };

  return {columns, handleSave};
};
export default useStep4;
