import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import s from './messagesArea.pcss';

import Message from './components/Message/Message.js';

class MessagesArea extends Component {
	render() {
		return (
			<div className={s.area}>
				<Message
					type='outgoing'
					text='Hola, mundo!'
				/>

				<Message
					type='incoming'
					text='Привет, мир!'
				/>
			</div>
		);
	}
}

export default connect(() => ({}))(MessagesArea);
