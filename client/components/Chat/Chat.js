import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import io from 'socket.io-client';
import '../common/PreactRef.js';

import classNames from 'classnames/bind';
import s from './chat.pcss';

import Message from './components/Message/Message.js';

import barneyAvatar from './images/barney.png';
import adminAvatar from './images/admin.png';
import sendIcon from './images/sendIcon.png';

let socket;

class Chat extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			question: this.props.question || '',
            admin: false,
			messages: []
		};
	}

	componentDidMount() {
		socket = io.connect('http://stdio.digital:3334', { reconnect: true });

		socket.on('connect', () => {
			console.info('[io connected]');
		});

		socket.on('hello event', data => {
			this.appendMessage({ type: 'incoming', author: 'bot', text: data.msg });
		});

		socket.on('answer event', data => {
			this.appendMessage({ type: 'incoming', author: 'bot', text: data.answer });
		});

		socket.on('admin connected', () => {
		    this.setState({ admin: true });
        });

		socket.on('admin disconnected', () => {
		    this.setState({ admin: false });
        });

		socket.on('admin message', data => {
		    this.appendMessage({ type: 'incoming', author: 'admin', text: data.message });
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
			this.appendMessage({ type: 'outgoing', author: 'user', text: question });
			this.setState({ question: '' });
		}
	}

	componentDidUpdate() {
		this.refs.messages.scrollIntoView(false);
	}

	render() {
		const { open } = this.props;
		const { question, admin, messages } = this.state;
		const st = classNames.bind(s);

		return (
			<div className={ st({ chat: true, open }) }>
				<div className={s.wrapper}>
					<div className={s.header}>
						<div className={s.avatar}>
							<img src={admin ? adminAvatar : barneyAvatar}/>
						</div>
						<div className={s.name}>{admin ? 'Бродмин' : 'Бробот'}</div>
					</div>

					<div className={s.area}>
						<div className={s.inner} ref={this.linkRef('messages')}>
							{messages.map((message, i) => (
								<Message
									key={i}
									type={message.type}
                                    author={message.author}
									text={message.text}
								/>
							))}
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
