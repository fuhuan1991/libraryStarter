import React, {
  PureComponent,
  SFC,
} from 'react';
import Block from '../../../utils/Block';
import './index.less';

interface P  {
  label: React.ReactNode
}

const OptionGroup: SFC<P> = ({
  children,
  label
}) => (
  <Block
    classNames={[
      'gio-option-group',
    ]}
  >
    <div className='gio-option-group-label'>{label}</div>
    {children}
  </Block>
);

export default OptionGroup;
