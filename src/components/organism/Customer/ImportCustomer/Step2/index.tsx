import AppTypo from 'components/atoms/AppTypo';
import RecordInfo from 'components/molecules/RecordInfo';
import {pageSize} from 'shared/constants/AppConst';
import {Col, Row, Tooltip} from 'antd';
import {useEffect, useState} from 'react';
import {useIntl} from 'react-intl';
import {onGetExcelRecordsByKey} from 'redux/actions/Inventory';
import {AppTableContainer} from '@crema';
import {useDispatch} from 'react-redux';
import iconError from 'assets/icon/DangerCircle.svg';
import clsx from 'clsx';

type PropsTypes = {
  formId: string;
  setDisabled: (value: boolean) => void;
};
const Step2 = (props: PropsTypes) => {
  const {formId, setDisabled} = props;
  const dispatch = useDispatch();
  const {messages} = useIntl();
  const [columns, setColumns] = useState<Array<any>>([]);
  const [dataSource, setDataSource] = useState<Array<any> | undefined>(
    undefined,
  );
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [excelRecordsInfo, setExcelRecordsInfo] = useState({
    total: 0,
    success: 0,
    duplicate: 0,
    error: 0,
  });

  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCard, setActiveCard] = useState<string | null>('total');
  const [searchParams, setSearchParams] = useState<{
    page: number;
    pageSize: number;
    key: string;
    type: string;
  }>({
    page: currentPage,
    pageSize: pageSize.INVENTORY,
    key: '',
    type: '',
  });

  useEffect(() => {
    if (formId) {
      const newSearchParams = {
        ...searchParams,
        key: formId,
        page: 1,
      };
      setSearchParams(newSearchParams);
    }
  }, [formId]);

  useEffect(() => {
    const fetchExcelRecordsByKey = async () => {
      const {key} = searchParams;
      if (!key) return;
      setLoading(true);
      const res: any = await dispatch(onGetExcelRecordsByKey(searchParams));
      const excelRecordsInfo = res?.info || {};
      const {success, total, error, duplicate} = excelRecordsInfo;
      setDisabled(false);
      setExcelRecordsInfo(excelRecordsInfo);
      const tableInfo = res?.table || {};
      const totals = tableInfo?.total || 0;
      const tblLabels: Array<any> = tableInfo?.tblLabels || [];
      const currentPage = res?.table?.page;
      if (isInitialRender) {
        const columns: Array<any> = [
          {
            title: 'STT',
            dataIndex: 'index',
            render: (text, record) => {
              let index =
                (currentPage - 1) * pageSize.INVENTORY_TABLE +
                Number(record.index) +
                1;
              return <div>{index.toString()}</div>;
            },
            width: 80,
          },
        ];

        tblLabels.map((item: any, index: any) => {
          columns.push({
            index: index,
            title: item?.name,
            dataIndex: item?.code,
            key: item?.code,
            width: 150,
            render: (text, record) => {
              return (
                <Tooltip title={text}>
                  <div
                    className={`ellipsis-text ${
                      record?.isCorrect === 'false' ? 'error' : ''
                    }`}
                  >
                    {text}
                  </div>
                </Tooltip>
              );
            },
          });
        });
        if (error) {
          columns.push({
            title: 'Thông tin',
            dataIndex: 'errMessage',
            key: 'operation',
            width: 100,
            fixed: 'right',

            render: (text, record) => {
              return (
                <>
                  {record?.isCorrect === 'false' && (
                    <Tooltip title={text}>
                      <div className='ellipsis-text text-center'>
                        <img src={iconError.src} alt='' />
                      </div>
                    </Tooltip>
                  )}
                </>
              );
            },
          });
        }

        setColumns(columns);
      }
      let dataSource: Array<any> = tableInfo?.tblEntries || [];
      // dataSource = dataSource.map((item: any, index: number) => {
      //   return {
      //     ...item,
      //     index: index,
      //   };
      // });
      setTotal(totals);
      setDataSource(dataSource);
      setLoading(false);
      setIsInitialRender(false);
    };
    fetchExcelRecordsByKey();
  }, [searchParams]);

  const handleChangeSearchParam = (values: any) => {
    const newSearchParams = {
      ...searchParams,
      ...values,
    };
    setSearchParams(newSearchParams);
  };

  const handleClick = async (type: any) => {
    const newSearchParams = {
      ...searchParams,
      key: formId,
      page: 1,
      type: type,
    };
    setSearchParams(newSearchParams);
    setActiveCard(type);
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <AppTypo variant='p-lg-semi'>
            {messages['common.checkUploadData'] as string}
          </AppTypo>
        </Col>
        <Col xs={12} md={6}>
          <RecordInfo
            title={messages['common.totalNumberUpload'] as string}
            total={excelRecordsInfo?.total}
            type='total'
            handleClick={() => handleClick('total')}
            activeCard={activeCard}
          />
        </Col>
        <Col xs={12} md={6}>
          <RecordInfo
            title={messages['common.validDataNumber'] as string}
            total={excelRecordsInfo?.success}
            type='success'
            handleClick={() => handleClick('success')}
            activeCard={activeCard}
          />
        </Col>
        <Col xs={12} md={6}>
          <RecordInfo
            title={messages['common.invalidDataNumber'] as string}
            total={excelRecordsInfo?.error}
            type='error'
            handleClick={() => handleClick('error')}
            activeCard={activeCard}
          />
        </Col>
        <Col xs={12} md={6}>
          <RecordInfo
            title={messages['common.dulicateDataNumber'] as string}
            total={excelRecordsInfo?.duplicate}
            type='duplicate'
            handleClick={() => handleClick('duplicate')}
            activeCard={activeCard}
          />
        </Col>
        <Col xs={24}>
          <AppTableContainer
            rowClassName={'test'}
            loading={loading}
            columns={columns}
            dataSource={dataSource}
            total={total}
            pageSize={pageSize.INVENTORY}
            current={currentPage}
            setCurrent={setCurrentPage}
            scroll={{x: 1000, y: 390}}
            className='table_custom_record'
            handleChangePage={handleChangeSearchParam}
            pagination={{
              position: ['bottomRight'],
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Step2;
