import {useEffect, useState} from "react";
import fetchInfo from "../../utils/fetchInfo";
import HighlightableButton from "../HighlightableButton";
import "./style.css";

export default function Navbar(props) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const authenticationCheckerFunction = async () => {
		const authenticationCheck = await fetchInfo("/isAuthenticated");
		console.log(authenticationCheck);
		if (authenticationCheck.isAuthenticated) {
			setIsAuthenticated(true);
		}
	};

	useEffect(() => {
		authenticationCheckerFunction();
	}, []);

	return (
		<div className='navbarMain'>
			<div className='navbarLogoDiv'>
				<h1 className='navbarLogoContent'>monorepo</h1>
			</div>

			<div className='buttonTray'>
				{isAuthenticated ? (
					<HighlightableButton title='My Snippets' />
				) : (
					<>
						<HighlightableButton title='Login' />
						<HighlightableButton title='Register' />
					</>
				)}
			</div>
		</div>
	);
}
