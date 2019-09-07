# Git-Event-Tracker
A Git event tracker API built with Express and Nedb


A REST API for tracking Git events. Built with Node.js, Express and Nedb

The API performs has following functionalities and routes as shown below

1 Adding a new event

The service should be able to add a new event by the POST request at /events. The event JSON is sent in the request body.

If an event with the same id already exists then the HTTP response code should be 400, otherwise, the response code should be 201.

2. Route for erasing all the events:
The service should be able to erase all the events by the DELETE request at /erase. The HTTP response code should be 200.

3. Route for returning all the events:
The service should be able to return the JSON array of all the events by the GET request at /events. The HTTP response code should be 200. The JSON array should be sorted in ascending order by event ID.

4. Route for returning the event records filtered by the actor ID:
The service should be able to return the JSON array of all the events which are performed by the actor ID by the GET request at /events/actors/{actorID}. If the requested actor does not exist then HTTP response code should be 404, otherwise, the response code should be 200. The JSON array should be sorted in ascending order by event ID.

5. Route for updating the avatar URL of the actor:
The service should be able to update the avatar URL of the actor by the PUT request at /actors. The actor JSON is sent in the request body. If the actor with the id does not exist then the response code should be 404, or if there are other fields being updated for the actor then the HTTP response code should be 400, otherwise, the response code should be 200.

6. Route for Returning the actor records ordered by the total number of events:
The service should be able to return the JSON array of all the actors sorted by the total number of associated events with each actor in descending order by the GET request at /actors.

If there are more than one actors with the same number of events, then order them by the timestamp of the latest event in the descending order. -desc order of timestamp

If more than one actors have the same timestamp for the latest event, then order them by the alphabetical order of login. The HTTP response code should be 200.

7. Route for returning the actor records ordered by the maximum streak:
The service should be able to return the JSON array of all the actors sorted by the maximum streak (i.e., the total number of consecutive days actor has pushed an event to the system) in descending order by the GET request at /actors/streak. If there are more than one actors with the same maximum streak, then order them by the timestamp of the latest event in the descending order. If more than one actors have the same timestamp for the latest event, then order them by the alphabetical order of login. The HTTP response code should be 200.

Routes 6 and 7 are presently incomplete due to time constraints.

Built with love by Victor Umezuruike.
