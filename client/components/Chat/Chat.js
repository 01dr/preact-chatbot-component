import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import classNames from 'classnames/bind';
import s from './chat.pcss';

import ChatHeader from './components/ChatHeader/ChatHeader.js';

class Chat extends Component {
	render() {
		const { dispatch, open } = this.props;
		const st = classNames.bind(s);

		return (
			<div className={ st({ chat: true, open }) }>
				<ChatHeader/>
			</div>
		);
	}
}

export default connect(state => ({
	open: state.chat
}))(Chat);
