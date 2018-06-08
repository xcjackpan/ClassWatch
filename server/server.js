const http = require('http');
const fs = require('fs');
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const scraper = require('./scraper.js');
const firebase = require('firebase');

const hostname = '127.0.0.1';
const port = 8080;

server.use(bodyParser.urlencoded({ extended: true })); 
server.use(cors({origin: 'http://localhost:3000'}));

firebase.initializeApp({
  apiKey: "AIzaSyBI-v9SUhZ8NFZG5d1V46SHNnNu7zRSrsA",
  authDomain: "uwclasswatch.firebaseapp.com",
  databaseURL: "https://uwclasswatch.firebaseio.com",
  projectId: "uwclasswatch",
  storageBucket: "uwclasswatch.appspot.com",
  messagingSenderId: "968124232562"
});

const tracked_courses = firebase.app().database().ref();

server.get('/', (req, res) => res.send('Hello World!'));


// when the server receives a POST request to /scrape, execute the code

let results;

tracked_courses.on('value', function(data) {
	console.log(data.val());
});

server.post('/scrape', async (req, res) => {
	const course_code = req.body.course;
	const subject = course_code.match(/[A-z]+/)[0].trim();
	const course_number = course_code.match(/\d+/)[0].trim();
	results = await scraper.go_to_page(1179, subject, course_number);
	console.log(results);
	/*
	let course_info = {subject:subject, course_number:course_number};
	tracked_courses.push(course_info);

	let del_ref = firebase.app().database().ref().child('-LESU1MyLZcl-o2mLRxv');
	del_ref.remove()
	*/
});


server.post("/track", async (req, res) => {
	const course_code = req.body.course;
	const email = req.body.email;
	const subject = course_code.match(/[A-z]+/)[0].trim();
	const course_number = course_code.match(/\d+/)[0].trim();
	let course_info = {subject:subject, course_number:course_number, email:email};
	tracked_courses.push(course_info);
});

server.post("/remove", async (req, res) => {
	const course_code = req.body.course;
	const email = req.body.email;
	const subject = course_code.match(/[A-z]+/)[0].trim();
	const course_number = course_code.match(/\d+/)[0].trim();
	let course_info = {subject:subject, course_number:course_number, email:email};

	let del_ref = admin.database().ref("")
});

function isEqual(a, b) {
	try {
		if ((a.subject == b.subject) && (a.course_number == b.course_number) && (a.email == b.email)) {
			return true;
		} else {
			return false;
		}
	} catch (e) {

	};
}

server.get('/data', async (req, res) => await res.send(results));

server.listen(port, () => console.log('Example server up on port 8080'));

// now is set to the current date in milliseconds since some date
function customSchedule() {
	var now = Date.now();

	//  1,800,000 is 30 minutes in milliseconds, so if an interval of 30 minutes has passed since that date, we trigger
	if (now % 1800000 <= 60000) {
		//const scraper = require('./scraper.js');
		//scraper.go_to_page(1179, 'CS', 136);
		console.log("trigger");
	}

	// fire the next time in 1min
	setTimeout(customSchedule, 1000 * 60);
}

customSchedule();