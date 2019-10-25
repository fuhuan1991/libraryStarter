import React from 'react';
import { Radio } from 'antd';
import _ from 'lodash';
import RButton from './Button';
import RGroup from './Group';

import 'antd/lib/radio/style/index.css';
import './index.less';

_.assign(Radio, {
  Button: RButton,
  Group: RGroup
});

export const Button = Radio.Button;
export const Group = Radio.Group;

export default Radio;
