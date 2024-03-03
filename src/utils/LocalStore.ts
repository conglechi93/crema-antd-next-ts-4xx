export const loadState = (state: string) => {
  try {
    const serializedState = localStorage.getItem(state);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (name: string, state: any) => {
  if (state == undefined) {
    if (loadState(name) == undefined) localStorage.setItem(name, '0');
  } else {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(name, serializedState);
    } catch (err) {
      return undefined;
    }
  }
};

export const removeState = (removeArr: string[]) => {
  removeArr.forEach((name: string) => {
    localStorage.removeItem(name);
  });
};

export const createInventoryDataSource = (data: any, draftString: string) => {
  saveState(draftString, data);
};

export const createInventoryWarehouseInfo = (
  data: any,
  draftString: string,
) => {
  saveState(draftString, data);
};
