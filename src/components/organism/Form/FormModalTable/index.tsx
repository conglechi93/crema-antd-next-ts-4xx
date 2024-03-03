import {AppTableContainer} from '@crema';
import useFormModalTable from './useFormModalTable';
import {pageSize} from 'shared/constants/AppConst';
type FormModalTableProps = {
  loading: boolean;
  dataSource: Array<any> | undefined;
};
const FormModalTable = (props: FormModalTableProps) => {
  const {loading, dataSource} = props;
  const {columns} = useFormModalTable();

  return (
    <>
      <AppTableContainer
        total={0} // Hide pagination
        className=''
        loading={loading}
        columns={columns}
        isShowTitle={false}
        dataSource={dataSource}
        pagination={false}
        scroll={{x: 1000, y: 390}}
      />
    </>
  );
};
export default FormModalTable;
