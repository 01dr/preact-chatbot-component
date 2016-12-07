import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import io from 'socket.io-client';

import classNames from 'classnames/bind';
import s from './chat.pcss';

import Message from './components/Message/Message.js';

import barney from './images/barney.png';
import sendIcon from './images/sendIcon.png';

let socket;

class Chat extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			question: this.props.question || '',
			messages: []
		};
	}

	componentDidMount() {
		socket = io.connect('http://stdio.digital:3334', { reconnect: true });

		socket.on('connect', () => {
			console.info('[io connected]');
		});

		socket.on('hello event', data => {
			console.log(data.msg);
			this.appendMessage({ type: 'incoming', text: data.msg });
		});

		socket.on('answer event', data => {
			console.log(data.answer);
			this.appendMessage({ type: 'incoming', text: data.answer });
		});
	}

	handleQuestionChange(e) {
		this.setState({ question: e.target.value });
	}

	appendMessage(message) {
		const messages = this.state.messages;
		messages.push(message);
		this.setState({ messages });
	}

	handleSubmit(e) {
		e.preventDefault();
		const { question } = this.state;

		if (!socket) {
			console.error('Socket dead');
		} else {
			socket.emit('question event', { question });
			this.appendMessage({ type: 'outgoing', text: question });
			this.setState({ question: '' });
		}
	}

	render() {
		const { dispatch, open } = this.props;
		const { question, messages } = this.state;
		const st = classNames.bind(s);

		console.log(messages);

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
							{/*
							<Message
								type='incoming'
								text='Hola, mundo!'
							/>

							<Message
								type='outgoing'
								text='Привет, мир!'
							/>
 							*/}

							{
								messages.map((message, i) => (
									<Message
										key={i}
										type={message.type}
										text={message.text}
									/>
								))
							}

						</div>
					</div>

					<form
						className={s.input}
						onSubmit={::this.handleSubmit}>
						<input
							type='text'
							placeholder='Пишите здесь'
							value={question}
							onChange={::this.handleQuestionChange}/>
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
