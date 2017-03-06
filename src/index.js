/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

// import 'babel-polyfill';

import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { host, port } from './config';
import shop from './shop';

const app = express();

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(cookieParser('my cookie key'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const morgan = require('morgan');
app.use(morgan('dev'));

/*
注册API
*/
app.use('/shop', shop);

/*
处理异常
 */
app.use(async (err, req, res, next) => {
  console.log(err);
  res.json({ret: err.status, data: err.message});
});

app.listen(port, () => {
  console.log(`The server is running at http://${host}/`);
});

//export YktManager from './YktManager.js';
