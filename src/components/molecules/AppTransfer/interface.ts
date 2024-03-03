export type TransferProps = {
  dataSource: Array<RecordType>;
  selected?: Array<string>;
  getTargetValue: (targetKeys: Array<string>) => void;
};

export interface RecordType {
  disabled: any;
  key: string;
  title: string;
  description: string;
  chosen: boolean;
}
