# Spoiled

Spoiled is a gift registry and e-commerce site created with react and express. I designed spoiled to be a portfolio site with integrated payment and login capabilities.

## Heroku Hosting

For the full experience, the entire application is hosted with Heroku. It may take a minute for both the back-end and front-end to load, so please allow a minute for the page to render. On the products page, there will be many products listed when loaded.

https://spoiled-frontend.herokuapp.com/


## Front-End

The front-end was created with 'create-react-app'. From there, I included react-router to simplify the navigation through the site. 

### Redux

Spoiled has redux integrated for storing information about the current user that is logged in. The redux store also includes the functions for making requests to the backend, in which the responses are saved to the global state. To speed up performance on page reloads, the current-user information is saved in the local storage as well as the redux store.

### Stripe Checkout

In order to mock a real e-commerce site, I integrated Stripe payment in test mode, allowing users to simulate a real payment process.

## Back-end

 The back-end uses Express for routing and MongoDB/Mongoose for data storage. Secure login uses bcrypt for storing passwords, and JWT for creating user sessions. The backend seeds the product information using faker.js, a module for providing dummy data. 
 
Back-end: https://github.com/dawncronin/Spoiled-Backend

## Screen Shots:

![Homepage](https://user-images.githubusercontent.com/12172077/111200668-3c10b200-857f-11eb-9232-3e7b1d7a19be.PNG)
![Products](https://user-images.githubusercontent.com/12172077/111200686-416dfc80-857f-11eb-83df-62f09a12c102.PNG)
![Checkout](https://user-images.githubusercontent.com/12172077/111200683-403ccf80-857f-11eb-8af4-1d605e73af3f.PNG)
![Login](https://user-images.githubusercontent.com/12172077/111200721-459a1a00-857f-11eb-8a61-3d1d7cbd357a.PNG)

