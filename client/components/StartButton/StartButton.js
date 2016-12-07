import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { toggleChatWindow } from '../../actions/ChatActions.js';

import classNames from 'classnames/bind';
import s from './startButton.pcss';

import Chat from '../Chat/Chat.js';

class StartButton extends Component {
	render() {
		const {dispatch, open} = this.props;
		const st = classNames.bind(s);

		return (
			<div className={s.broBot}>
				<Chat/>
				<button
					onClick={() => dispatch(toggleChatWindow())}
					className={ st({startButton: true, open}) }>

					<div className={s.front}/>
					<div className={s.back}/>

				</button>
			</div>
		);
	}
}

export default connect(state => ({
	open: state.chat
}))(StartButton);
