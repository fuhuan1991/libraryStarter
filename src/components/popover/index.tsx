import React from 'react';
import { Popover as AtndPopover } from 'antd';
import 'antd/lib/popover/style/index.css';

export interface PropsType {
    content: string | React.ReactNode,
    prefixCls?: string,
    title?: string | React.ReactNode,
    arrowPointAtCenter?: boolean,
    autoAdjustOverflow?: boolean,
    getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement,
    mouseEnterDelay?: number,
    mouseLeaveDelay?: number,
    overlayClassName?: string,
    overlayStyle?: object,
    placement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom',
    trigger?: 'hover' | 'focus' | 'click',
    defaultVisible?: boolean,
    visible?: boolean,
    onVisibleChange?: (visible: boolean) => void
    children: React.ReactNode
}

const Popover = (props: PropsType) => (
    <AtndPopover {...props} />
)
export default Popover;
