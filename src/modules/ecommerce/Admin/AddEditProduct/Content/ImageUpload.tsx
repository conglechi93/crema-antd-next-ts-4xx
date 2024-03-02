import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  StyledTextPrimary,
  StyledThumb,
  StyledThumbInner,
  StyledThumbsContainer,
  StyledUploadWrapper,
} from './index.styled';
import { FileType } from '@crema/types/models/ecommerce/EcommerceApp';
import Image from 'next/image';

type Props = {
  uploadedFiles: FileType[];
  setUploadedFiles: React.Dispatch<React.SetStateAction<FileType[]>>;
};

const ImgUpload = ({ uploadedFiles, setUploadedFiles }: Props) => {
  const dropzone = useDropzone({
    accept: {
      'image/png': ['.png', '.jpeg', '.jpg'],
    },
    onDrop: (acceptedFiles) => {
      setUploadedFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });
  useEffect(() => {
    setUploadedFiles(dropzone.acceptedFiles);
  }, [dropzone.acceptedFiles]);

  const thumbs = uploadedFiles.map((file) => (
    <StyledThumb key={file.name}>
      <StyledThumbInner>
        <Image alt='preview' src={`${file.preview}`} width={90} height={90} />
      </StyledThumbInner>
    </StyledThumb>
  ));

  return (
    <section className='container'>
      <StyledUploadWrapper>
        <div {...dropzone.getRootProps({ className: 'dropzone' })}>
          <input {...dropzone.getInputProps()} />
          <Image
            src={'/assets/icon/upload.svg'}
            width={40}
            height={40}
            alt='upload'
          />

          <p>
            <StyledTextPrimary>Click to upload</StyledTextPrimary> or drag and
            drop
          </p>
          <p style={{ marginTop: 1 }}>SVG, PNG, JPG or GIF (max. 800x400px)</p>
        </div>

        <StyledThumbsContainer>{thumbs}</StyledThumbsContainer>
      </StyledUploadWrapper>
    </section>
  );
};

export default ImgUpload;
