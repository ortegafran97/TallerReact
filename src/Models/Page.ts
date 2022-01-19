export interface IPage<Type> {
  content: Type[];
  pageable: {
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export default class Page<Type> implements IPage<Type> {
  content: Type[] = [];
  offset: number = 0;
  pageSize: number = 0;
  pageNumber: number = 0;
  pageable = {
    sort: {
      empty: true,
      sorted: true,
      unsorted: false,
    },
    offset: 0,
    pageSize: 0,
    pageNumber: 0,
    paged: true,
    unpaged: false,
  };
  paged: boolean = false;
  unpaged: boolean = true;
  last: boolean = true;
  totalElements: number = 0;
  totalPages: number = 0;
  size: number = 0;
  number: number = 0;
  sort = {
    empty: true,
    sorted: false,
    unsorted: true,
  };
  numberOfElements: number = 0;
  first: boolean = true;
  empty: boolean = true;

  public Page(){
      
  }
}
