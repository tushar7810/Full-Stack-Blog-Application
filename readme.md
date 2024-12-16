# Info Blog

Welcome to the official repo of Info Blog .This is a full stack blog website that is fully responsive at any device and fully worked with latest version of tech stack

# 🛠️Tech Stack
This project utilizes the following technologies:
- **Node.js:** A Javascript runtime for executing server-side code.
- **Express.js:** A web application framework for Node.js
- **React.js:** A Javascript library for building user interface.
- **MongoDB:** A noSQL database for storing application data.
- **jsonwebtoken:** A library for creating and verifying JSON Web Token (JWT) for authentication.
- **bcrypt:** A library for encripting passwords.
- **Cloudinary:** A cloud based service for managing images.
- **cookie-parser:** Middleware for parsing cookies.
- **dotenv:** A zero dependency library that loads environment variables from .env file into the runtime environment
- **Github:** Version control and collaboration platform.

# 🎉Key Features
This website includes the following features : 
 1. **Two types of Register System:** In this project, one can register them as an ***Blog Author*** or ***Blog Reader***.The reader only see the blogs and read and find the authors. The author user get  a dashboard  section. 

 2. **Authentication:** Secure login and logout system for both types of user.
 3. **Create Blog Section:** In this section, one can create their own blog in which they must upload additionally three images along with the main cover image.
 4. **My Uploads:** In this section, users can see their uploaded blogs.
 5. **Edit Blog Option:** Users who are register as ***Author*** , can easily update their blogs.
 6. **Delete Blog Option:** User can delete their blog as well.
 7. **Analytics:** User can see their published and unpublished blogs.
 8. **Blogs Section:** Available for both types of user. In this section, users find the blogs which were published.
 9. **All Authors Section:** All users can see the authors.
 10. **Responsive UI :** The website is fully responsive and works on all devices.
 11. **Profile :** Authors are able to view their profile.
 12. **Trending Blog:** Here the trending blogs are shown.
 13. **About :** Information about the website.

# 🔥Installation
To set up this project locally, follow these steps :-
 1. Clone the repository:
 ```
git clone https://github.com/tushar7810/Full-Stack-Blog-Application.git
 ```
 2. Install the dependencies :
 ```
npm install
 ```
 3. Set up environment variables. Create a .env file int the root directory and add the following  :
    
    - Client : 
    ```
    PORT=4000
    ```
    - Server : 
    ```
    PORT=4000
    MONGODB_URI=
    JWT_SECRET_KEY=
    JWT_EXPIRE_TIME=1d
    COOKIE_EXPIRE=1
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_KEY= 
    CLOUDINARY_API_SECRET= 
    CORS_ORIGIN=http://localhost:5173
    ```
 4. Run the development server : 
    ```
    cd backend
    npm run dev
    ```
 5. Run the frontend 
    ```
    cd frontend
    npm run dev
    ```



# Photoes :-
1. Register page

    ![Register](/readmeImages/register.png)
2. Home page

    ![Home page](/readmeImages/home.png)
    ![Home page](/readmeImages/home-2.png)
3. Blogs 

    ![Blogs](/readmeImages/Blogs.png)
4. Dashboard

    ![dashboard](/readmeImages/dashboard.png)
    ![dashboard](/readmeImages/dashboard-2.png)
5. Create Blog Section 

    ![create](/readmeImages/create-blog.png)
    ![create](/readmeImages/create-blog-2.png)

6. Analytics

    ![analytics](/readmeImages/analytics.png)

7. Profile

    ![profile](/readmeImages/profile.png)

8. Update Blog section

    ![updateBlog](/readmeImages/updateblog.png)
    ![updateBlog](/readmeImages/updateblog-2.png)

9. All Authors

    ![allAuthors](/readmeImages/allAuthors.png)



# Thank You ....
