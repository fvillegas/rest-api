Data model and associations

* User has id (required), name (required), last name (required), email (required), password (required)
* Tutorial has id (required), title (required), video url (optional), description (optional), published status (
  required), deleted at (optional).
* User can create, retrieve, update, delete Tutorials.

API Endpoints

VERB - PATH - Description POST - /auth/ - Authenticate user GET - /tutorials/token - Tutorial token for creation POST -
/tutorials/ - Tutorial create GET - /tutorials/ - Tutorial list Should support query params as well for filtering and
sorting GET - /tutorials/:id - Tutorial show DELETE - /tutorials/:id - Tutorial delete PUT - /tutorials/:id - Tutorial
update DELETE - /tutorials/mass_delete - Delete all tutorials

Requirements

* Use API versioning
* Have an endpoint for user authentication
    * Utilize JWT tokens
* All endpoints except the auth should require user authentication
* Make sure to handle correct status codes for all api responses (200, 201, 401, 403, 404, 500)
* Make use of parameters sanitization
* Use logical deletion for Tutorials
* Tutorial list endpoint should support filtering by title and description
* Tutorial list endpoint should support sorting by id
* Ensure that Tutorial’s video url follows a valid url format
* Validate Tutorial required fields both on model and db layers
* Tutorial create request should send a custom authentication-token header which holds:
    * A JWT token which should send a timestamp taken at the time of the request
    * Token is generated from the API in the /tutorials/token service
    * Token should be validated within a custom middleware
* The create tutorial endpoint should validate the parameters and make sure the timestamp is within 5 minutes. If not,
  should respond with unauthorized.
* There’s no need to create endpoints for the User model.
* Use Postman to create a collection for all endpoints testing

Extra magic hours:

Access Control

Manage the following roles per users

* Admin: can perform all actions in the system
* User: can only perform read only actions in the system

When a user doesn’t have the necessary permissions, the API should respond with unauthorized. Don’ts

* Don’t overthink it Do’s
* Follow coding best practices and standards
* Use any frameworks and libraries you feel will simplify the process
* Make it as simple and intuitive for the user as possible
* Trust your instincts, make any assumptions you need to make it your own project Evaluation We will evaluate
* Backend API coding skills
* Advanced design patterns use
* Timeliness
