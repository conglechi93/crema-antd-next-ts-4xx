import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {onGetWorkflowDetail} from 'redux/actions/Workflow';

const useWorkFlowDetail = (infoDetail: any) => {
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState<Array<any>>([]);
  const [dataWorkflowInfo, setDataWorkflowInfo] = useState<any>(null);
  const columns = [
    {
      title: 'STT',
      dataIndex: 'index',
      width: 30,
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      width: 'auto',
    },
  ];

  useEffect(() => {
    if (infoDetail) {
      let dataSource: any = [];
      setDataSource([]);
      const fetchWorkflowDetails = async (workflowCode: string) => {
        if (!workflowCode) return;
        const res: any =
          (await dispatch(onGetWorkflowDetail(workflowCode))) ?? {};
        res?.workflowDetails?.forEach((item: any, index: any) => {
          dataSource?.push({
            ...item,
            key: index + 1,
            index: index + 1,
            name: item?.name,
            id: index + 1,
          });
        });
        setDataSource(dataSource);
        if (res) {
        }
        setDataWorkflowInfo(res);
      };
      const workflowCode = infoDetail?.code;
      fetchWorkflowDetails(workflowCode);
    }
  }, [infoDetail]);

  return {
    columns,
    dataSource,
    dataWorkflowInfo,
  };
};

export default useWorkFlowDetail;
