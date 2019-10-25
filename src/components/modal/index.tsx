import React, { CSSProperties } from 'react';
import { Modal as AntModal } from 'antd';
import Button from '../button';
import Icon from '../icon';
import { noop } from 'lodash';
import cn from 'classnames';

import 'antd/lib/modal/style/index.css';
import './index.less';

export interface ModalProps {
  visible: boolean,
  closable?: boolean,
  className?: string,
  width?: number,
  title: string | React.ReactNode,
  okText?: string,
  cancelText?: string,
  disableOk?: boolean,
  showCancel?: boolean,
  onCancel?: (e?: React.MouseEvent<any>) => void,
  onOk?: () => void | Promise<any>,
  footer?: React.ReactNode,
  children: React.ReactNode,
  confirmLoading?: boolean,
  wrapClassName?: string,
  okButtonType?: 'primary' | 'secondary' | 'subtle';
  cancelButtonType?: 'primary' | 'secondary' | 'subtle';
  maskClosable?: boolean,
  backable?: boolean,
  onBack?: () => void,
  onVisibleChange?: (visible: boolean) => void,
  overflowY?: 'scroll' | 'visible', // 如果内容高于屏幕容器的高度，scroll为屏幕内滚动，visible为溢出屏幕
  minWidth?: number,
  size?: 'large' | 'middle' | 'small',
  okButtonClassName?: string,
  style?: CSSProperties,
  zIndex?: number,
  getContainer?: () => HTMLElement,
  locale?: string
};

const Modal: React.SFC<ModalProps> = ({
  overflowY,
  minWidth,
  onBack,
  backable,
  okButtonClassName,
  style = {},
  ...props
}) => {
  const locale = props.locale;
  const footer = (
    <div className='gio-modal-footer'>
      {props.showCancel && <Button size={props.size} type={props.cancelButtonType || 'subtle'} onClick={props.onCancel}>{props.cancelText ? props.cancelText : (locale === 'en' ? 'Cancel' : '取消')}</Button>}
      <Button size={props.size} type={props.okButtonType || 'secondary'} loading={props.confirmLoading} disabled={props.disableOk ? true : false} onClick={props.onOk} className={okButtonClassName}>
        {props.okText ? props.okText : (locale === 'en' ? 'Confirm' : '确定')}
      </Button>
    </div>
  );
  const className = cn('gio-modal', props.className, {
    ['gio-modal--overflow-y-scroll']: overflowY === 'scroll'
  });
  return (
    <AntModal
      {...props}
      footer={props.footer !== undefined ? props.footer : footer}
      className={className}
      style={{
        minWidth, ...style
      }}
    >
      <div className='gio-modal__step-container'>
        {backable && <div className='gio-modal__step-back'><Icon name='gicon-arrow-left' onClick={onBack} /></div>}
        <div className='gio-modal__step-body'>{props.children}</div>
      </div>
    </AntModal>
  );
}

Modal.defaultProps = {
  visible: false,
  closable: true,
  className: '',
  title: '',
  okText: '',
  cancelText: '',
  disableOk: false,
  showCancel: true,
  onCancel: noop,
  onOk: noop,
  footer: undefined,
  confirmLoading: false,
  overflowY: 'visible'
}

export default Modal;
