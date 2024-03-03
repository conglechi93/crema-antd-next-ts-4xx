import IntlMessages from '@crema/utility/IntlMessages';
import { Col, Form, Row } from 'antd';
import AppTypo from 'components/atoms/AppTypo';
import { onDownloadFile } from 'redux/actions/Files';
import ActivitiesTabs from './ActivitiesTabs';
import AppButton from 'components/atoms/AppButton';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import imgExcel from 'assets/image/Excel.png';
import { onGetProjectDetail } from 'redux/actions/ProjectManagement';

const useTaskViewDetail = (
  detailInfo: any,
  fetchTaskDetails: (code: string) => Promise<void>,
) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [workFlowStatus, setWorkFlowStatus] = useState<any>([]);
  const itemsCollapse = [
    {
      key: '1',
      label: 'Mô tả',
      children: (
        <>
          {/* <p>{detailInfo?.description}</p> */}
          {detailInfo?.description ? (
            <div
              dangerouslySetInnerHTML={{
                __html: detailInfo?.description,
              }}
            ></div>
          ) : (
            <AppTypo variant='p-md-reg'>Chưa có mô tả công việc</AppTypo>
          )}
        </>
      ),
    },
    {
      key: '2',
      label: 'Tệp đính kèm',
      children: (
        <>
          {detailInfo?.fileAttachments ? (
            detailInfo?.fileAttachments?.map((item: any, index: number) => {
              return (
                <Row
                  key={index}
                  gutter={[8, 8]}
                  align={'middle'}
                  style={{ marginTop: '10px' }}
                >
                  <Col>
                    <img
                      style={{ display: 'flex' }}
                      src={imgExcel.src}
                      alt=''
                    />
                  </Col>
                  <Col>
                    <span
                      onClick={() => handleDownloadFile(item)}
                      style={{ cursor: 'pointer' }}
                    >
                      {item?.fileName}
                    </span>
                  </Col>
                </Row>
              );
            })
          ) : (
            <AppTypo variant='p-md-reg'>
              <IntlMessages id='common.notAttachedFiles' />
            </AppTypo>
          )}
        </>
      ),
    },
    {
      key: '3',
      label: 'Hoạt động',
      children: (
        <ActivitiesTabs
          record={detailInfo}
          fetchTaskDetails={fetchTaskDetails}
          workFlowStatus={workFlowStatus}
        />
      ),
    },
  ];
  const handleDownloadFile = async (item: any) => {
    const fileId = item?.id;
    const res = await onDownloadFile(fileId);
    if (res) {
      const fileName = item?.fileName;
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}`);
      document.body.appendChild(link);
      link.click();
    }
  };

  const [itemsBreadcrumb, setItemsBreadcrumb] = useState<any>([]);
  useEffect(() => {
    if (detailInfo) {
      const itemsBreadcrumb: Array<any> = [];
      const taskReferences: Array<any> = detailInfo?.taskReferences || [];
      const lastIndex = taskReferences?.length - 1;
      taskReferences?.map((item: any, index: any) => {
        let breadcrumb: any;
        if (index === lastIndex) {
          breadcrumb = {
            title: <span>{item?.name}</span>,
          };
        } else {
          breadcrumb = {
            title: (
              <AppButton
                type='link'
                onClick={() => {
                  const code = item?.code;
                  fetchTaskDetails(code);
                }}
              >
                {item?.name}
              </AppButton>
            ),
          };
        }
        itemsBreadcrumb?.push(breadcrumb);
      });
      setItemsBreadcrumb(taskReferences.length > 1 ? itemsBreadcrumb : []);

      form.setFieldsValue({
        workflowStatus: detailInfo?.workflowStatus
          ? detailInfo?.workflowStatus?.code
          : '',
      });

      const fetchWorkFlowStatus = async (projectCode: string) => {
        const res: any = await dispatch(onGetProjectDetail(projectCode));
        let options: Array<any> = [];
        if (res) {
          const workflow: Array<any> = res?.workflow?.workflowDetails ?? [];
          workflow.map((item: any) => {
            options.push({
              label: item.name,
              value: item.code,
            });
          });
        }

        setWorkFlowStatus(options);
      };
      const projectCode = detailInfo?.project ? detailInfo?.project?.code : '';
      fetchWorkFlowStatus(projectCode);
    }
  }, [detailInfo]);
  return {
    form,
    itemsCollapse,
    itemsBreadcrumb,
    workFlowStatus,
  };
};

export default useTaskViewDetail;
