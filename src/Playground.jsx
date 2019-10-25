import * as React from 'react';
import './playground.less';
import { JsonEditor } from 'jsoneditor-react';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/github';
// import Tag from './components/tag';
// import Avatar from './components/avatar';
// import Checkbox from './components/checkbox';
import Button from './components/button';
// import Icon from './components/icon';
// import DatePicker from './components/date-picker';
// import Greeting from './components/greeting';
// import Input from './components/input';
// import ErrMsg from './components/err-msg';
// import List from './components/list';
// import Message from './components/message';
// import Option, {OptionGroup, CheckOption} from './components/option';
// import Modal from './components/modal';
// import List from './components/oldlist';
// import Popconfirm from './components/popconfirm';
// import Popover from './components/popover';
// import Progress from './components/progress';
// import Radio from './components/radio';
// import Select from './components/select';
// import Switch from './components/switch';
// import Textarea from './components/textarea';
// import TimePicker from './components/time-picker';
// import Tooltip from './components/tooltip';

const defaultProps = {
  title: 'aaaaa'
}
class App extends React.Component {

  constructor(props) {
    super(props);

    this._handleChange = (v) => {
      console.info('handleChange', v);
      try {
        this.setState({ ...v });
      } catch (e) {
        console.error(e)
      }
    }

    this._setRef = (node) => {
      this.JsonEditorElement = node ? node.jsonEditor : {};
    }

    this.state = { ...defaultProps }
  }

  greeting() {
    Greeting.info('aaa');
  }

  render() {
    return (
      <React.Fragment>
        <h1>{this.props.title}</h1>
        {/* <div className='props'>props:</div> */}
        {/* <div className='editor'>
          <JsonEditor
            handleChange={this._handleChange}
            mode='tree'
            ace={ace}
            value={defaultProps}
            theme='ace/theme/github'
            onChange={this._handleChange}
            ref={this._setRef}
          />
        </div> */}
        <div className='playground'>
          <Button type='primary'>Button</Button><br/>
          <Button type='secondary'>Button</Button><br/>
          <Button type='subtle'>Button</Button><br/>
          <Button disabled type='primary'>Button</Button><br/>
          <Button withoutBg type='primary'>Button</Button><br/>
          <Button withoutBg type='secondary'>Button</Button><br/>
          <Button withoutBg type='subtle'>Button</Button><br/>
          <Button disabled withoutBg type='primary'>Button</Button><br/>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
