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
		} else {
			setUserObject([
				{
					profilePic:
						"https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg",
					username: "wowWhatAMan",
					email: "steve@gary.com",
					name: "Steven Gareth",
				},
			]);
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
						<div className='profileInformationSection'>
							<h1 className='tempUserInfo'>
								<span className='infoLabel'>Name: </span>
								{value.name}
							</h1>
							<h1 className='tempUserInfo'>
								<span className='infoLabel'>Username: </span>
								{value.username}
							</h1>
							<h1 className='tempUserInfo'>
								<span className='infoLabel'>Email: </span>
								{value.email}
							</h1>
						</div>
						{value.role === "admin" && (
							<h1 className='tempUserInfo'>Role: {value.role}</h1>
						)}
					</div>
				);
			})}
		</div>
	);
}
