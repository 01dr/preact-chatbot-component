import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import { toggleChatWindow } from '../../actions/ChatActions.js';

import s from './startButton.pcss';

import Chat from '../Chat/Chat.js';

class StartButton extends Component {
	render() {
		const {dispatch} = this.props;

		return (
			<div className={s.broBot}>
				<Chat/>
				<button
					onClick={() => dispatch(toggleChatWindow())}
					className={s.startButton} />
			</div>
		);
	}
}

export default connect(() => ({}))(StartButton);
