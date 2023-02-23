import {createContext, useState} from "react";
import {useNavigate} from "react-router-dom";

export const MonorepoContext = createContext();

export const MonorepoProvider = (props) => {
	const [jwToken, setJwToken] = useState(
		localStorage.getItem("monorepo_jwt_token") || ""
	);

	return (
		<MonorepoContext.Provider value={{jwToken, setJwToken}}>
			{props.children}
		</MonorepoContext.Provider>
	);
};
