import React from 'react';
import moment from 'moment';
import Button from '../../../button';
import { getRangeFromKey, getMomentsFromRange } from '../util/shortcutRange'
import RangeDatePicker from '../RangeDatePicker';
import ShortcutButtons from '../ShortcutButtons';
import './index.less';

export interface DateRangeContentPickerProps {
  value?: string,
  onOk?: (value: string, start: moment.Moment, end: moment.Moment) => void,
  shortcutIncludes?: string[],
  locale: string,
  minDate?: moment.Moment,
  maxDate?: moment.Moment
}

interface DateRangeContentState {
  value: string,
  start: moment.Moment,
  end: moment.Moment
}

const defaultValue = getRangeFromKey('last_7_day')

export default class DateRangeContent extends React.Component<DateRangeContentPickerProps, DateRangeContentState> {
  constructor(props: DateRangeContentPickerProps) {
    super(props);
    const ranges = getRangeFromPropsValue({
      value: props.value,
      defaultValue
    })
    this.state = {
      value: 'value' in props ? props.value : defaultValue,
      start: ranges[0],
      end: ranges[1]
    }
  }
  public componentWillReceiveProps(nextProps: DateRangeContentPickerProps) {
    if (!('value' in nextProps) && nextProps.value === this.props.value) {
      return
    }
    const ranges = getRangeFromPropsValue({
      value: nextProps.value,
      defaultValue
    })
    const nextState = {
      value: nextProps.value,
      start: ranges[0],
      end: ranges[1]
    }
    this.setState(() => nextState)
  }
  public handleChange = (start: moment.Moment, end: moment.Moment) => {
    this.setState(() => ({
      value: '',
      start,
      end
    }))
  }
  public handleRangeClick = (value: string) => {
    const ranges = getRangeFromPropsValue({
      value,
      startTime: this.state.start
    })

    this.setState(() => ({
      value: /since/.test(value) ? `${value}:${ranges[0].valueOf()}` : value,
      start: ranges[0],
      end: ranges[1]
    }), () => this.handleOk())
  }
  public handleOk = () => {
    if (!this.props.onOk) {
      return
    }
    const { onOk } = this.props
    const { start, end, value } = this.state
    if (value) {
      onOk(value, start, end)
    } else {
      onOk(`abs:${start.valueOf()},${end.valueOf()}`, start, end)
    }
  }
  public render() {
    const { start, end } = this.state
    return (
      <div className='gio-datepicker-range-content'>
        <RangeDatePicker
          startTime={start}
          endTime={end}
          onChange={this.handleChange}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
          locale={this.props.locale}
        />
        <div className='operate'>
          <ShortcutButtons
            range={this.state.value}
            onClick={this.handleRangeClick}
            includes={this.props.shortcutIncludes}
            locale={this.props.locale}
          />
          <div className='button'>
            <Button
              type='primary'
              onClick={this.handleOk}
            >
              {this.props.locale === 'en' ? 'confirm' : '确定'}
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const getRangeFromPropsValue = (props: {
  value?: string,
  defaultValue?: string,
  startTime?: moment.Moment
}): moment.Moment[] => {
  const { value, defaultValue, startTime } = props
  if (!value) {
    return getMomentsFromRange(defaultValue)
  }
  if (/abs/.test(value)) {
    return getABSRange(value)
  }
  if (/^since\:\d+/.test(value)) {
    return getSinceRangeFromNumber(parseInt(value.replace('since:', ''), 10))
  }
  if (value === 'since') {
    return getSinceRangeFromMoment(startTime || moment().startOf('day'))
  }
  return getMomentsFromRange(value)
}
const getABSRange = (value: string): moment.Moment[] => {
  const absRangeTimeStamp = value.replace('abs:', '').split(',').map((t: string) => parseInt(t, 10))
  return [
    moment(absRangeTimeStamp[0]).startOf('day'),
    moment(absRangeTimeStamp[1]).startOf('day')
  ]
}

const getSinceRangeFromMoment = (startTime: moment.Moment) => {
  return [
    startTime,
    moment().startOf('day')
  ]
}

const getSinceRangeFromNumber = (startTime: number) => {
  return [
    moment(startTime),
    moment().startOf('day')
  ]
}
