// import React from 'react';
import * as React from 'react';
import 'antd/lib/calendar/style/index.css';
import 'antd/lib/date-picker/style/index.css';
import 'antd/lib/tooltip/style/index.less';
import DatePickerDecorator from './DatePickerDecorator';
import OverlayType from './common/OverlayType'
import Range, { RangeDatePickerProps } from './Range';

const DatePicker = DatePickerDecorator()(OverlayType);
DatePicker.Range = Range;

export { RangeDatePickerProps };

export default DatePicker;
