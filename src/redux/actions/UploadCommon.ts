import {API_ENDPOINTS} from 'services/apiUrl';
import API from 'api/Request';

export const onUploadFile = (file: any, type: string) => {
  return async (dispatch: any) => {
    try {
      const fmData = new FormData();
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      fmData.append('file', file);
      fmData.append('type', type);
      const res = await API.post(
        API_ENDPOINTS.common.upload_file,
        fmData,
        config,
      );
      return res?.data?.data;
    } catch (error) {
      console.log('error', error);
      return false;
    }
  };
};

export const onRemoveFile = async (id: string) => {
  try {
    await API.delete(
      API_ENDPOINTS.common.delete_file.replace('{attachmentId}', id),
    );
    return true;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
