# Stream Dashboard

For people that stream with image overlays and have someone else change between their overlays on a webpage.

## Working:
 * App that serves full-page images
 * MVP: pressing a number (1,2,3) changes between the scenes.
 * A seperate dashboard page
 	* Switching between scenes on the dashboard updates which image is displayed on the display page

## Developing:
 * A seperate dashboard page
 	* Allows uploading new images 
 	* Load the scene images from database
 	* Use a database to store uploaded images - images stored in base64

##example of displaying base64 image

<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAU1QTFRFNjtAQEVK////bG9zSk9T/v7+/f39/f3+9vf3O0BETlJWNzxB/Pz8d3t+TFFVzM3O1NXX7u/vUldbRElNs7W3v8HCmZyeRkpPW19j8vLy7u7vvsDC9PT1cHR3Oj9Eo6WnxsjJR0tQO>
