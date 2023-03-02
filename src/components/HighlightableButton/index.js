import {useContext} from "react";
import {useNavigate} from "react-router";
import {MonorepoContext} from "../../context/MonorepoContext";
import "./style.css";

export default function HighlightableButton(props) {
	const {jwToken, setJwToken} = useContext(MonorepoContext);

	const navigate = useNavigate();
	switch (props.title) {
		case "my snippets":
			return (
				<div
					onClick={() => {
						navigate("/mysnippets");
					}}
					className='highlightableButton nudgedRight'>
					<h2 className='highlightableButtonText'>{props.title}</h2>
				</div>
			);

		case "login":
			return (
				<a
					href={process.env.REACT_APP_BACKEND_URL + "/login"}
					className='highlightableButton nudgedRight'>
					<h2 className='highlightableButtonText'>{props.title}</h2>
				</a>
			);
		case "register":
			return (
				<a
					href={process.env.REACT_APP_BACKEND_URL + "/register"}
					className='highlightableButton'>
					<h2 className='highlightableButtonText'>{props.title}</h2>
				</a>
			);
		case "log out":
			return (
				<a
					href={process.env.REACT_APP_BACKEND_URL + "/logout-direct"}
					className='highlightableButton'
					onClick={() => {
						setJwToken("");
						localStorage.setItem("monorepo_jwt_token", "");
					}}>
					<h2 className='highlightableButtonText'>{props.title}</h2>
				</a>
			);

		case "proceed":
			return (
				<a
					className='largeHighlightableButton'
					onClick={() => {
						if (jwToken) {
							window.location.href = `${process.env.REACT_APP_BACKEND_URL}/login`;
						} else {
							window.location.href = `${process.env.REACT_APP_BACKEND_URL}/register`;
						}
					}}>
					<h2 className='largeHighlightableButtonText'>{props.title}</h2>
				</a>
			);
		case "load more":
			return (
				<a className='highlightableButton loadButton' onClick={props.onClick}>
					<h2 className='highlightableButtonText'>{props.title}</h2>
				</a>
			);

		case "🗑":
			return (
				<div
					className='roundButton deleteButton'
					onClick={props.onClick}
					style={{marginLeft: "1px"}}>
					<h2 className='highlightableButtonText emojiButtonText'>{props.title}</h2>
				</div>
			);

		case "📋":
			return (
				<div
					className='roundButton editButton'
					onClick={props.onClick}
					style={{marginRight: "1px"}}>
					<h2 className='highlightableButtonText emojiButtonText'>{props.title}</h2>
				</div>
			);

		default:
			return <></>;
	}
}
