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
