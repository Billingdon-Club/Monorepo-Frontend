import {useContext, useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import {MonorepoContext} from "../../context/MonorepoContext";
import fetchInfo from "../../utils/fetchInfo";
import "./style.css";

export default function Profile(props) {
	const [userObject, setUserObject] = useState("");

	const {jwToken} = useContext(MonorepoContext);

	const retrieveUserObject = async () => {
		const user = await fetchInfo("/me", "GET", null, jwToken);
		if (user.user) {
			setUserObject(JSON.stringify(user.user, null, 2));
		}
	};

	useEffect(() => {
		retrieveUserObject();
	});

	return (
		<div className='profileMain'>
			<Navbar currentPage='profile' />
			<h1 className='tempUserInfo'>User: {userObject}</h1>
		</div>
	);
}
