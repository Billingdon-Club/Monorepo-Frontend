export default async function fetchInfo(
	extension,
	method = "GET",
	information = null
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

	const result = await fetch(
		process.env.REACT_APP_BACKEND_URL + extension,
		information
	);
	console.log(result, process.env.BACKEND_URL + extension);
	const data = await result.json();
	return data;
}
