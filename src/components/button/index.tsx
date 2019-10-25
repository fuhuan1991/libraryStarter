import * as React from 'react';
import 'antd/lib/button/style/index.less';
import 'antd/lib/tooltip/style/index.less';
import pickEventProps from '../../utils/pickEventProps';
import classnames from 'classnames';
import { Button, Tooltip } from 'antd';

import './style.less';

export const Group = Button.Group;
export interface ButtonProps {
  tooltip?: string,
  tooltipPlacement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom',
  className?: string,
  type?: 'primary' | 'secondary' | 'subtle';
  size?: 'large' | 'middle' | 'small';
  rounded?: boolean;
  withoutBg?: boolean;
  disabled?: boolean;
  long?: boolean;
  children?: any;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLElement>, value?: any) => void;
  value?: any;
}

class GIOButton extends React.PureComponent<ButtonProps, {}> {
  public static defaultProps = {
    tooltip: '',
    className: '',
    type: 'primary',
    size: 'large',
    rounded: false,
    withoutBg: false,
    disabled: false,
    long: false,
    loading: false,
  };

  public static Group: any

  constructor(props: ButtonProps) {
    super(props);
  }

  public render() {
    let button;
    if (this.props.withoutBg) {
      const classNames = classnames(
        'gio-btn gio-btn-without-bg default-font-family',
        {['gio-btn-' + this.props.type]: !!this.props.type},
        {disabled: this.props.disabled},
        {undisabled: !this.props.disabled},
        this.props.className
      );
      button = (
        <a
          {...pickEventProps(this.props, ['size', 'type'])}
          className={classNames}
          onClick={this.handleButtonClick}
        >
          {this.props.children}
        </a>
      )
    } else {
      const classNames = classnames(
        'gio-btn gio-btn-with-bg default-font-family',
        {['gio-btn-' + this.props.type]: !!this.props.type},
        {rounded: this.props.rounded},
        {disabled: this.props.disabled},
        {undisabled: !this.props.disabled},
        {long: this.props.long},
        this.props.className
      );
      button = (
        <Button
          {...pickEventProps(this.props, ['size', 'type'])}
          className={classNames}
          onClick={this.handleButtonClick}
          loading={this.props.loading}
        >
          {this.props.children}
        </Button>
      )
    }

    if (this.props.tooltip) {
      const placement = this.props.tooltipPlacement ? this.props.tooltipPlacement : 'top';
      return (
        <Tooltip title={this.props.tooltip} placement={placement}>
          <span className='gio-btn-wrapper'>
            {button}
          </span>
        </Tooltip>
      );
    }
    return button;
  }

  private handleButtonClick = (e: React.MouseEvent<HTMLElement>): void => {
    const { disabled, onClick, value } = this.props;
    if (disabled) { return; }
    if (onClick) {
      onClick(e, value);
    }
  }
}

GIOButton.Group = Button.Group;
export default GIOButton;
