import React, {
  SFC,
} from 'react';
import cn from 'classnames';
import { noop } from 'lodash';
import pure from '../HOC/pure';

interface ClassDictionary {
  [id: string]: boolean | undefined | null
}

type ClassValue = string | number | ClassDictionary | ClassArray | undefined | null | false;

interface ClassArray extends Array<ClassValue> {

}

interface P {
  top?: number
  bottom?: number
  right?: number
  left?: number
  height?: number
  width?: number
  onClick?: () => void
  className?: string
  classNames?: ClassArray
}

const Block: SFC<P> = ({
  top = 0,
  bottom = 0,
  right = 0,
  left = 0,
  height,
  width,
  onClick = noop,
  children,
  className,
  classNames = []
}) => (
  <div
    style={{
      paddingBottom: bottom,
      paddingLeft: left,
      paddingRight: right,
      paddingTop: top,
      height,
      width
    }}
    onClick={onClick}
    className={cn(className, ...classNames)}
  >
    {children}
  </div>
);

export  default pure(Block);
