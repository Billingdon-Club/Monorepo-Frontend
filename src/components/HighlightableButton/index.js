import {useNavigate} from "react-router";
import "./style.css";

export default function HighlightableButton(props) {
	const navigate = useNavigate();
	switch (props.title) {
		case "My Snippets":
			return (
				<div
					onClick={() => {
						navigate("/mysnippets");
					}}
					className='highlightableButton nudgedRight'>
					<h2 className='highlightableButtonText'>{props.title}</h2>
				</div>
			);

		case "Login":
			return (
				<a
					href={process.env.REACT_APP_BACKEND_URL + "/login"}
					className='highlightableButton nudgedRight'>
					<h2 className='highlightableButtonText'>{props.title}</h2>
				</a>
			);
		case "Register":
			return (
				<a
					href={process.env.REACT_APP_BACKEND_URL + "/register"}
					className='highlightableButton'>
					<h2 className='highlightableButtonText'>{props.title}</h2>
				</a>
			);
		case "Logout":
			return (
				<a
					href={process.env.REACT_APP_BACKEND_URL + "/logout-direct"}
					className='highlightableButton'>
					<h2 className='highlightableButtonText'>{props.title}</h2>
				</a>
			);

		default:
			return <></>;
	}
}
