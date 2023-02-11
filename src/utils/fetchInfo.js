export default async function fetchInfo(
	extension,
	method = "GET",
	information = null,
	authorizationToken = ""
) {
	const requestObject = {
		method: method,
		headers: {
			"Content-Type": "application/json",
		},
	};

	if (information !== null) {
		requestObject["body"] = information;
	}
	console.log(authorizationToken);
	if (
		authorizationToken !== "" &&
		authorizationToken !== null &&
		authorizationToken != "null"
	) {
		requestObject.headers["Authorization"] = `Bearer ${authorizationToken}`;
	}

	console.log(requestObject);

	const result = await fetch(
		process.env.REACT_APP_BACKEND_URL + extension,
		requestObject
	);
	console.log(result, process.env.BACKEND_URL + extension);
	const data = await result.json();
	return data;
}
