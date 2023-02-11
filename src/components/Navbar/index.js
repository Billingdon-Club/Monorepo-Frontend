import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {MonorepoContext} from "../../context/MonorepoContext";
import fetchInfo from "../../utils/fetchInfo";
import HighlightableButton from "../HighlightableButton";
import "./style.css";

export default function Navbar(props) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [profilePic, setProfilePic] = useState("");
	const {jwToken, setJwToken} = useContext(MonorepoContext);

	const navigate = useNavigate();

	const authenticationCheckerFunction = async () => {
		const authenticationCheck = await fetchInfo(
			"/isAuthenticated",
			"GET",
			null,
			jwToken
		);
		console.log(authenticationCheck);
		if (authenticationCheck.isAuthenticated) {
			setIsAuthenticated(true);
		}
	};

	const getProfilePic = async () => {
		const profilePic = await fetchInfo("/profile-pic", "GET", null, jwToken);
		if (profilePic.profilePic) {
			setProfilePic(profilePic.profilePic);
		}
	};

	useEffect(() => {
		authenticationCheckerFunction();
		if (props.currentPage === "snippets") {
			getProfilePic();
		}
	}, []);

	return (
		<div className='navbarMain'>
			<div className='navbarLogoDiv'>
				<h1
					className='navbarLogoContent'
					onClick={() => {
						navigate("/");
					}}>
					monorepo
				</h1>
			</div>
			{props.currentPage === "splash" && (
				<div className='buttonTray'>
					{isAuthenticated ? (
						<>
							<HighlightableButton title='My Snippets' />
							<HighlightableButton title='Logout' />
						</>
					) : (
						<>
							<HighlightableButton title='Login' />
							<HighlightableButton title='Register' />
						</>
					)}
				</div>
			)}

			{props.currentPage === "snippets" && (
				<div className='buttonTray'>
					<HighlightableButton title='Logout' />
					{profilePic !== "" ? (
						<img
							className='profilePic nudgedLeft'
							src={profilePic}
							onClick={() => {
								navigate("/profile");
							}}
						/>
					) : (
						<></>
					)}
				</div>
			)}

			{props.currentPage === "profile" && (
				<div className='buttonTray'>
					<HighlightableButton title='My Snippets' />
					<HighlightableButton title='Logout' />
				</div>
			)}
		</div>
	);
}
