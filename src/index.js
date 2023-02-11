import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import Splash from "./pages/Splash";
import Snippets from "./pages/Snippets";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {MonorepoProvider} from "./context/MonorepoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<MonorepoProvider>
				<Routes>
					{/* Homepage */}
					<Route index element={<Splash />} />

					{/* View All Blogs Page */}
					<Route path='/mysnippets/' element={<Snippets />} />

					{/* Visit blog */}
					<Route path='/profile' element={<Profile />} />

					{/* 404 error */}
					<Route path='/error' element={<Error />} />
				</Routes>
			</MonorepoProvider>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
