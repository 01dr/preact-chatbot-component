import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import s from './messagesArea.pcss';

import Message from './components/Message/Message.js';

class MessagesArea extends Component {
	render() {
		return (
			<div className={s.area}>
				<Message
					type='incoming'
					text='Hola, mundo!'
				/>

				<Message
					type='outgoing'
					text='Привет, мир!'
				/>

				<Message
					type='incoming'
					text='Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.."'
				/>

				<Message
					type='outgoing'
					text='Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться.'
				/>

				<Message
					type='incoming'
					text='Hola, mundo!'
				/>

				<Message
					type='outgoing'
					text='Привет, мир!'
				/>
			</div>
		);
	}
}

export default connect(() => ({}))(MessagesArea);
