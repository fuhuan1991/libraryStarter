import React from 'react';
import { Input as AntInput } from 'antd';
import cn from 'classnames';
import { omit } from 'lodash';
import { isNumber } from '../../utils/helpers'
import 'antd/lib/input/style/index.css';
import './index.less';

export interface InputProps {
  className?: string,
  disabled?: boolean,
  [key: string]: any,
  error?: boolean
};

export default class Input extends React.Component<InputProps, {}> {
  public render() {
    const s = isNumber(123)
    return (
      <AntInput
        {...omit(this.props, ['error'])}
        className={cn(
          'gio-input',
          this.props.className,
          {
            ['gio-input--error']: this.props.error,
            large: this.props.size === 'large',
            small: this.props.size === 'small'
          }
        )}
      />
    );
  }
}
