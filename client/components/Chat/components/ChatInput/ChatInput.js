import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import s from './chatInput.pcss';

import sendIcon from './images/sendIcon.png';

class ChatInput extends Component {
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
		const { message } = this.state;

		return (
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
		);
	}
}

export default connect(() => ({}))(ChatInput);
