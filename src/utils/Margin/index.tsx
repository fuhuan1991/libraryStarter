import React, {
  SFC,
} from 'react';
import pure from '../HOC/pure';

interface P {
  top?: number | string,
  bottom?: number | string,
  right?: number | string,
  left?: number | string,
  visible?: boolean,
  classname?: string,
}

const Margin: SFC<P> = ({
  top = 0,
  bottom = 0,
  right = 'auto',
  left = 'auto',
  visible = true,
  classname = '',
  children
}) => (
  <div
    style={{
      marginBottom: bottom,
      marginLeft: left,
      marginRight: right,
      marginTop: top,
      display: visible ? undefined : 'none'
    }}
    className={classname}
  >
    {children}
  </div>
);

export  default pure(Margin);
