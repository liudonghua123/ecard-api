/*
 eslint-disable no-param-reassign
*/

import { Router } from 'express';
import expressJwt from 'express-jwt';
import { getToken } from './utils';
import YktManager from './YktManager';

import {
  database_connectionLimit,
  database_host,
  database_user,
  database_password,
  database_database,
  secret,
} from './config';

const router = new Router();
const yktManager = new YktManager({
  connectionLimit: database_connectionLimit,
  host: database_host,
  user: database_user,
  password: database_password,
  database: database_database,
});

const expressJwtOptions = {
  secret,
  credentialsRequired: true,
  getToken,
};

// 获取所有商户的信息
// GET /shop/all?token=TOKEN
router.get('/all', expressJwt(expressJwtOptions), async (req, res) => {
  try {
    const shops = await yktManager.getShops();
    res.json({ ret: 0, data: shops });
  } catch (err) {
    res.json({ ret: 500, data: err });
  }
});

// 获取指定商户信息
// GET /shop/:shopId?token=TOKEN
router.get('/:shopId', expressJwt(expressJwtOptions), async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const shop = await yktManager.getShop(shopId);
    res.json({ ret: 0, data: shop });
  } catch (err) {
    res.json({ ret: 500, data: err });
  }
});

// 获取指定日期所有商户的日账单
// GET /shop/all/daily-bill/:accDate?token=TOKEN
router.get('/all/daily-bill/:accDate', expressJwt(expressJwtOptions), async (req, res) => {
  try {
    const accDate = req.params.accDate;
    const shopBills = await yktManager.getShopBillsByAccDate(accDate);
    res.json({ ret: 0, data: shopBills });
  } catch (err) {
    res.json({ ret: 500, data: err });
  }
});

// 获取指定商户单日账单
// GET /shop/:shopId/daily-bill/:accDate?token=TOKEN
router.get('/:shopId/daily-bill/:accDate', expressJwt(expressJwtOptions), async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const accDate = req.params.accDate;
    const shopBill = await yktManager.getShopBill(shopId, accDate);
    res.json({ ret: 0, data: shopBill });
  } catch (err) {
    res.json({ ret: 500, data: err });
  }
});

// 获取指定商户日账单列表
// GET /shop/:shopId/daily-bill?token=TOKEN
router.get('/:shopId/daily-bill', expressJwt(expressJwtOptions), async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const shopBills = await yktManager.getShopBillsByShopId(shopId);
    res.json({ ret: 0, data: shopBills });
  } catch (err) {
    res.json({ ret: 500, data: err });
  }
});

// 获取子商户单日账单列表
// GET /shop/:fShopId/sub-shop-daily-bills/:accDate?token=TOKEN
router.get(
  '/:fShopId/sub-shop-daily-bills/:accDate',
  expressJwt(expressJwtOptions),
  async (req, res) => {
    try {
      const fShopId = req.params.fShopId;
      const accDate = req.params.accDate;
      const shopBills = await yktManager.getShopBills(fShopId, accDate);
      res.json({ ret: 0, data: shopBills });
    } catch (err) {
      res.json({ ret: 500, data: err });
    }
  }
);

// 获取所属商户的设备的日账单列表
// GET /shop/:shopId/device-daily-bills/:accDate?token=TOKEN
router.get(
  '/:shopId/device-daily-bills/:accDate',
  expressJwt(expressJwtOptions),
  async (req, res) => {
    try {
      const shopId = req.params.shopId;
      const accDate = req.params.accDate;
      const deviceBills = await yktManager.getDeviceBills(shopId, accDate);
      res.json({ ret: 0, data: deviceBills });
    } catch (err) {
      res.json({ ret: 500, data: err });
    }
  }
);

// 获取指定日期所有商户的月账单
// GET /shop/all/monthly-bill/:accDate?token=TOKEN
router.get('/all/monthly-bill/:accDate', expressJwt(expressJwtOptions), async (req, res) => {
  try {
    const accDate = req.params.accDate;
    const shopBillsMonth = await yktManager.getShopBillsMonth(null, accDate);
    res.json({ ret: 0, data: shopBillsMonth });
  } catch (err) {
    res.json({ ret: 500, data: err });
  }
});

// 获取指定商户单月账单
// GET /shop/:shopId/monthly-bill/:accDate?token=TOKEN
router.get('/:shopId/monthly-bill/:accDate', expressJwt(expressJwtOptions), async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const accDate = req.params.accDate;
    const shopBillMonth = await yktManager.getShopBillMonth(shopId, accDate);
    res.json({ ret: 0, data: shopBillMonth });
  } catch (err) {
    res.json({ ret: 500, data: err });
  }
});

// 获取指定商户月账单列表
// GET /shop/:shopId/monthly-bill/?token=TOKEN
router.get('/:shopId/monthly-bill/', expressJwt(expressJwtOptions), async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const shopBillMonth = await yktManager.getShopBillMonth(shopId, null);
    res.json({ ret: 0, data: shopBillMonth });
  } catch (err) {
    res.json({ ret: 500, data: err });
  }
});

// 获取子商户月账单列表
// GET /shop/:fShopId/sub-shop-monthly-bills/:accDate?token=TOKEN
router.get(
  '/:fShopId/sub-shop-monthly-bills/:accDate',
  expressJwt(expressJwtOptions),
  async (req, res) => {
    try {
      const fShopId = req.params.fShopId;
      const accDate = req.params.accDate;
      const shopBillsMonth = await yktManager.getShopBillsMonth(fShopId, accDate);
      res.json({ ret: 0, data: shopBillsMonth });
    } catch (err) {
      res.json({ ret: 500, data: err });
    }
  }
);

// 获取所属商户的设备的月账单列表
// GET /shop/:shopId/device-monthly-bills/:accDate?token=TOKEN
router.get(
  '/:shopId/device-monthly-bill/:accDate',
  expressJwt(expressJwtOptions),
  async (req, res) => {
    try {
      const shopId = req.params.shopId;
      const accDate = req.params.accDate;
      // const deviceBills = await yktManager.getDeviceBillsMonth(shopId, accDate);
      const deviceBills = {};
      res.json({ ret: 0, data: deviceBills });
    } catch (err) {
      res.json({ ret: 500, data: err });
    }
  }
);

// 获取指定商户节点的所有祖先节点
// GET /shop/:shopId/ancestors?token=TOKEN
router.get('/:shopId/ancestors', expressJwt(expressJwtOptions), async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const shops = await yktManager.getAncestorShops(shopId);
    res.json({ ret: 0, data: shops });
  } catch (err) {
    res.json({ ret: 500, data: err });
  }
});

export default router;
