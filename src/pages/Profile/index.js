import {useContext, useEffect, useState} from "react";
import Navbar from "../../components/Navbar";
import {MonorepoContext} from "../../context/MonorepoContext";
import fetchInfo from "../../utils/fetchInfo";
import "./style.css";

export default function Profile(props) {
	const [userObject, setUserObject] = useState([]);

	const {jwToken} = useContext(MonorepoContext);

	const retrieveUserObject = async () => {
		const user = await fetchInfo("/me", "GET", null, jwToken);
		if (user.user) {
			setUserObject([user.user]);
		}
	};

	useEffect(() => {
		retrieveUserObject();
	}, []);

	return (
		<div className='profileMain'>
			<Navbar currentPage='profile' />
			{userObject.map((value) => {
				return (
					<div className='profileSection nudgedRight'>
						<img className='profilePicFull' src={value.profilePic} />
						<h1 className='tempUserInfo'>Name: {value.name}</h1>
						<h1 className='tempUserInfo'>Username: {value.username}</h1>
						<h1 className='tempUserInfo'>Email: {value.email}</h1>
						{value.role === "admin" && (
							<h1 className='tempUserInfo'>Role: {value.role}</h1>
						)}
					</div>
				);
			})}
		</div>
	);
}
