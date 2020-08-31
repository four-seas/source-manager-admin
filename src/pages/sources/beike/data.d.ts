export interface TableListItem {
  id: number;
  created_at: string;
  updated_at: string;
  master_id: number;
  title: string;
  total_price: string;
  total_area: string;
  unit_price_value: string;
  community_name: string;
  area: string;
  addr: string;
  has_elevator: number;
  has_subway: number;
  toward: string;
  establish: number;
  spider_src_url: string;
  spider_type: number;
  images: string[];
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  page: number;
}

export interface TableListData {
  list: TableListItem[];
  total: number;
  pageSize: number;
  page: number;
}

export interface TableListParams {
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
