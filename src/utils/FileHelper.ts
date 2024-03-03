export const createImageJson = (
  id: string,
  url: string,
  name: string,
  extension?: string,
  typeUpload?: string,
  status = 'done',
) => {
  return {
    uid: id,
    url,
    name,
    extension,
    typeUpload,
    status,
  };
};

export const getFileExtension = (filename: string) => {
  const extension = filename?.split('.').pop();
  return extension?.toLowerCase();
};
