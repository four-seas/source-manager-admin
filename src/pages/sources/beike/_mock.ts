// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import Mock from 'mockjs';
import { TableListItem } from './data.d';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: TableListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    tableListDataSource.push(
      Mock.mock({
        id: '@increment',
        created_at: '@datetime',
        updated_at: '@datetime',
        master_id: '@integer',
        title: '@cword(5, 10)',
        total_price: /[0-9]{2,3}\.00/,
        total_area: /[0-9]{2,3}\.00/,
        unit_price_value: /[0-9]{2,3}00\.00/,
        community_name: `${Mock.mock('@cword(3, 7)')}小区`,
        area: '@cword(2, 3)',
        addr: '@county(true)',
        door_model: /[2-4]室[1-3]厅[1-3]卫/,
        has_elevator: Math.random() > 0.5 ? 0 : 1,
        has_subway: Math.random() > 0.5 ? 0 : 1,
        toward: /[东南西北]{1,2}/,
        establish: 0,
        spider_src_url: '',
        spider_type: 1,
        images: new Array(5).fill('https://source.unsplash.com/random'),
      }),
    );
  }
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getRule(req: Request, res: Response) {
  const dataSource = genList(1, 30);
  const result = {
    data: dataSource,
    total: Mock.mock('@integer(100, 1000)'),
    pageSize: 30,
    page: 1,
  };

  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      break;
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule = {
          key: tableListDataSource.length,
          href: 'https://ant.design',
          avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
          ][i % 2],
          name,
          owner: '曲丽丽',
          desc,
          callNo: Math.floor(Math.random() * 1000),
          status: (Math.floor(Math.random() * 10) % 2).toString(),
          updatedAt: new Date(),
          createdAt: new Date(),
          progress: Math.ceil(Math.random() * 100),
        };
        tableListDataSource.unshift(newRule);
        return res.json(newRule);
      })();
      return;

    case 'update':
      (() => {
        let newRule = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newRule = { ...item, desc, name };
            return { ...item, desc, name };
          }
          return item;
        });
        return res.json(newRule);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/rule': getRule,
  'POST /api/rule': postRule,
};
