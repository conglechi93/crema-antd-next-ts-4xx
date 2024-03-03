import {useState} from 'react';
import styles from './style.module.scss';
import AppModal from 'components/molecules/AppModal';
type PropsTypes = {
  modalAddUrl: any;
  modalAddUrlData: any;
  isValidAddUrl: boolean;
  setModalAddUrl: any;
};
const ModalUploadUrl = (props: PropsTypes) => {
  const {modalAddUrl, modalAddUrlData, isValidAddUrl, setModalAddUrl} = props;

  const handleSubmitModalAddUrl = () => {
    alert('đang chờ Api');
  };
  const handleCloseModalAddUrl = () => {
    setModalAddUrl(false);
  };

  return (
    <div>
      <AppModal
        title={modalAddUrlData?.title}
        openModal={modalAddUrl}
        setOpenModal={setModalAddUrl}
        handleSubmit={handleSubmitModalAddUrl}
        handleClose={handleCloseModalAddUrl}
        width={250}
        closeText={modalAddUrlData.closeText}
        submitText={modalAddUrlData.submitText}
        description={
          <p className={styles.modal_content_add_url}>
            {modalAddUrlData.description}
          </p>
        }
        disabled={isValidAddUrl}
      ></AppModal>
    </div>
  );
};

export default ModalUploadUrl;
