import {useEffect, useState} from 'react';

const usePickListOptions = (
  options: Array<{
    id: number;
    value: string;
  }>,
  setOptions: (options: any) => void,
  setDisabled: (boolean) => void,
  handleCheckFormData: () => void,
) => {
  const [indexCount, setIndexCount] = useState(0);
  useEffect(() => {
    setIndexCount(options?.length || 0);
  }, [options]);
  const handleDragStart = (event: any, id: number) => {
    event.dataTransfer.setData('id', id.toString());
  };
  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handleDrop = (event: any, id: number) => {
    event.preventDefault();
    const draggedId = parseInt(event.dataTransfer.getData('id'));
    const draggedOption: any = options.find(
      (option: any) => option.id == draggedId,
    );
    const draggedIndex = options.findIndex(
      (option: any) => option.id == draggedId,
    );
    const dropIndex = options.findIndex((option: any) => option.id == id);
    const newOptions = [...options];
    newOptions.splice(draggedIndex, 1);
    newOptions.splice(dropIndex, 0, draggedOption);
    setOptions(newOptions);
  };

  const handleAddOption = (id: number) => {
    const newOption = {id: indexCount + 1, value: ''};
    const newOptions: any = [...options];
    newOptions.splice(id + 1, 0, newOption);
    setOptions(newOptions);
    setIndexCount((prevState) => prevState + 1);
    setDisabled(true);
  };

  const handleDeleteOption = (id: number) => {
    const newOptions = options.filter((option: any) => option.id !== id);
    setOptions(newOptions);
  };

  const handleChangeOption = async (id: number, value: string) => {
    const newOptions = options.map((option: any) => {
      if (option.id === id) {
        return {...option, value};
      }
      return option;
    });
    setOptions(newOptions);
    if (!value) {
      setDisabled(true);
    } else {
      handleCheckFormData();
    }
  };
  return {
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleAddOption,
    handleDeleteOption,
    handleChangeOption,
  };
};

export default usePickListOptions;
