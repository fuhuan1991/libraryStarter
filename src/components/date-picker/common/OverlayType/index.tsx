import React from 'react';
import 'antd/lib/dropdown/style/index.css';
import 'antd/lib/popover/style/index.css';
import './index.less';
import { Popover, Dropdown } from 'antd';

interface Props {
  content: React.ReactNode,
  visible: boolean,
  onVisibleChange: (visible: boolean) => void,
  children: any,
  overlayType?: 'dropdown' | 'popover',
  placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom',
  getPopupContainer?: (triggerNode: Element) => HTMLElement
}

export default class OverlayType extends React.Component<Props> {
  public render() {
    if (this.props.overlayType === 'popover') {
      return (
        <Popover
          content={this.props.content}
          visible={this.props.visible}
          onVisibleChange={this.props.onVisibleChange}
          trigger='click'
          placement={this.props.placement}
          getPopupContainer={this.props.getPopupContainer}
        >
          {this.props.children}
        </Popover>
      )
    }
    return (
      <Dropdown
        overlay={this.props.content}
        visible={this.props.visible}
        onVisibleChange={this.props.onVisibleChange}
        trigger={['click']}
        overlayClassName='gio-datepicker-dropdown-overlay'
        placement={this.props.placement as 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'topCenter' | 'bottomCenter'}
        getPopupContainer={this.props.getPopupContainer}
      >
        {this.props.children}
      </Dropdown>
    )
  }
}
