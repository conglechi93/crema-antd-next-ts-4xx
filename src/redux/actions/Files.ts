import {API_ENDPOINTS} from 'services/apiUrl';
import API from 'api/Request';
import {SHOW_MESSAGE} from 'types/actions/Common.action';
export const onDownloadFile = async (fileId: string) => {
  try {
    const res = await API.get(
      API_ENDPOINTS.files.download_file.replace('{fileId}', fileId),
      {
        responseType: 'blob',
      },
    );
    return res;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};
