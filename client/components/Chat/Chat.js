import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import classNames from 'classnames/bind';
import s from './chat.pcss';

import Message from './components/Message/Message.js';

import barney from './images/barney.png';
import sendIcon from './images/sendIcon.png';

class Chat extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			message: this.props.message || ''
		};
	}

	handleMessageChange(e) {
		this.setState({ message: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log(this.state.message);
		this.setState({ message: '' });
	}

	render() {
		const { dispatch, open } = this.props;
		const { message } = this.state;
		const st = classNames.bind(s);

		return (
			<div className={ st({ chat: true, open }) }>
				<div className={s.wrapper}>
					<div className={s.header}>
						<div className={s.avatar}>
							<img src={barney}/>
						</div>
						<div className={s.name}>Барни</div>
					</div>

					<div className={s.area}>
						<div className={s.inner}>
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
					</div>

					<form
						className={s.input}
						onSubmit={::this.handleSubmit}>
						<input
							type='text'
							placeholder='Пишите здесь'
							value={message}
							onChange={::this.handleMessageChange}/>
						<button type='submit'>
							<img src={sendIcon}/>
						</button>
					</form>
				</div>
			</div>
		);
	}
}

export default connect(state => ({
	open: state.chat
}))(Chat);
