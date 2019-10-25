import React from 'react';
import { Moment } from 'moment';
import DatePicker from '../../common/DatePicker';
import moment from 'moment';
import './index.less';

export interface RangeDatePickerProps {
    startTime?: Moment,
    endTime?: Moment,
    onChange: (startTime: Moment, endTime: Moment) => void,
    minDate?: Moment,
    maxDate?: Moment,
    locale: string
}

interface RangeDatePickerState {
    start: Moment,
    end: Moment
}

export default class RangeDatePicker extends React.PureComponent<RangeDatePickerProps, RangeDatePickerState> {
    // React16版
    // public static getDerivedStateFromProps(nextProps: RangeDatePickerProps, prevState: RangeDatePickerState) {
    //     if (!('startTime' in nextProps) || !('endTime' in nextProps)) {
    //         return null
    //     }
    //     if (nextProps.startTime.isSame(this.state.start) && nextProps.endTime.isSame(this.state.end)) {
    //         return null
    //     }
    //     return {
    //         start: 'startTime' in nextProps ? nextProps.startTime : prevState.start,
    //         end: 'endTime' in nextProps ? nextProps.endTime : prevState.end
    //     }
    // }
    constructor(props: RangeDatePickerProps) {
        super(props);
        let start = moment().startOf('day');
        let end = moment().endOf('day');
        if ('startTime' in props && props.startTime) {
            start = props.startTime;
        }
        if ('endTime' in props && props.endTime) {
            end = props.endTime;
        }
        this.state = {
            start,
            end
        }
    }
    public componentWillReceiveProps(nextProps: RangeDatePickerProps) {
        const nextStartTime = nextProps.startTime
        const nextEndTime = nextProps.endTime
        if (!('startTime' in nextProps) || !('endTime' in nextProps)) {
            return
        }
        if (
            nextStartTime &&
            nextEndTime &&
            nextStartTime.isSame(this.state.start) &&
            nextEndTime.isSame(this.state.end)
        ) {
            return
        }
        this.setState(() => ({
            start: nextProps.startTime,
            end: nextProps.endTime
        }))
    }
    public handleSelectStartTime = (start: Moment) => {
        const { minDate, maxDate } = this.props;
        let startTime = start.clone();
        const endTime = this.state.end.clone();
        if (minDate && start.isBefore(minDate)) {
            startTime = minDate.clone().startOf('day');
        } else if (maxDate && start.isAfter(maxDate)) {
            startTime = maxDate.clone().startOf('day');
        }
        const startMoment = moment.min(startTime, this.state.end).clone().startOf('day');
        const endMoment = moment.max(startTime, this.state.end).clone().endOf('day');

        if ('startTime' in this.props && 'endTime' in this.props) {
            const { onChange } = this.props
            onChange(startMoment, endMoment)
        } else {
            this.setState(() => ({
                start: startMoment,
                end: endMoment
            }))
        }
    }
    public handleSelectEndTime = (end: Moment) => {
        const { minDate, maxDate } = this.props;
        const startTime = this.state.start.clone();
        let endTime = end.clone();
        if (maxDate && end.isAfter(maxDate)) {
            endTime = this.props.maxDate.clone().endOf('day');
        } else if (minDate && end.isBefore(minDate)) {
            endTime = minDate.clone().endOf('day');
        }
        const startMoment = moment.min(this.state.start, endTime).clone().startOf('day');
        const endMoment = moment.max(this.state.start, endTime).clone().endOf('day')
        if ('startTime' in this.props && 'endTime' in this.props) {
            const { onChange } = this.props
            onChange(startMoment, endMoment)
        } else {
            this.setState(() => ({
                start: startMoment,
                end: endMoment
            }))
        }
    }
    public render() {
        const { minDate, maxDate, locale } = this.props;
        const { start, end } = this.state;
        const isSameDate = start.isSame(end);
        return (
            <div className='gio-datepicker-range-date'>
                <DatePicker
                    className='gio-datepicker-range-date-child'
                    value={minDate && moment(start).isBefore(minDate) && !isSameDate ? minDate : start}
                    onChange={this.handleSelectStartTime}
                    disabledDate={this.disabledDate}
                    locale={locale}
                    type='start'
                />
                <DatePicker
                    className='gio-datepicker-range-date-child'
                    value={maxDate && moment(maxDate).isBefore(end) && !isSameDate ? maxDate : end}
                    onChange={this.handleSelectEndTime}
                    disabledDate={this.disabledDate}
                    locale={locale}
                    type='end'
                />
            </div>
        )
    }
    private disabledDate = (current: any): boolean => {
        const { minDate, maxDate } = this.props;
        let isDisabledDate = false;
        if (minDate && !maxDate) {
            isDisabledDate = moment(current).isBefore(minDate);
        }
        if (!minDate && maxDate) {
            isDisabledDate = moment(maxDate).isBefore(current);
        }
        if (minDate && maxDate) {
            isDisabledDate = moment(maxDate).isBefore(current) || moment(current).isBefore(minDate);
        }
        return isDisabledDate;
    }
}
