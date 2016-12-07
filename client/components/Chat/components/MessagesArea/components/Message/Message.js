import { h, Component } from 'preact';
import { connect } from 'preact-redux';

import classNames from 'classnames/bind';
import s from './message.pcss';

export default class Message extends Component {
	render() {
		const st = classNames.bind(s);
		const {type, text} = this.props;

		return (
			<div className={ st('message', type) }>
				{text}
			</div>
		);
	}
}
