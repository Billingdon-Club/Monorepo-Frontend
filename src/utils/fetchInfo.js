export default async function fetchInfo(
	extension,
	method = "GET",
	information = null,
	authorizationToken = ""
) {
	const requestObject = {
		method: method,
		headers: {"Content-Type": "application/json"},
	};

	if (information !== null) {
		requestObject["body"] = JSON.stringify(information);
		requestObject.headers["Content-Length"] =
			JSON.stringify(information).length.toString();
	}
	console.log(authorizationToken);
	if (
		authorizationToken !== "" &&
		authorizationToken !== null &&
		authorizationToken != "null"
	) {
		requestObject.headers["Authorization"] = `Bearer ${
			authorizationToken + "//" + process.env.REACT_APP_FRONTEND_KEY
		}`;
	}

	console.log(requestObject);

	const result = await fetch(
		process.env.REACT_APP_BACKEND_URL + extension,
		requestObject
	);
	console.log(result, process.env.REACT_APP_BACKEND_URL + extension);
	const data = await result.json();
	return data;
}
