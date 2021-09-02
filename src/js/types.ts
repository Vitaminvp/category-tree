export interface Category {
  id: string;
  name: string;
  children?: Category[];
  closed?: boolean;
}

export interface FoundList {
  list?: Category[];
  idx?: number;
}

export interface ModalMarkUp {
  title: string;
  defaultValue?: string;
  alert?: boolean;
  handler?: Function;
}

export type ArrowFn = () => void;
