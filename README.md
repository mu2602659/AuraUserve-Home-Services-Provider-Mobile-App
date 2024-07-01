# AuraUserve 
## Home Maintenance Services Platform 

![Cover Image](./assets/images/uiii.png)

## User and Provider Interface of AuraUserve

![UI Design](./assets/images/UI.png)

## Overview
This project aims to revolutionize the home maintenance services industry in Pakistan by creating a user-friendly mobile and web application. The platform connects homeowners with a network of vetted, reliable service providers for various home maintenance needs such as plumbing, electrical work, cleaning, and gardening. Our solution leverages modern technology to provide transparency, efficiency, and convenience in the process of obtaining maintenance services.

## Key Features
- **User-Friendly Interface**: Intuitive design for seamless booking.
- **Secure and Reliable**: Vetted service providers and robust security measures.
- **Real-Time Booking**: Book services in real-time.
- **In-App Chat System**: Direct communication between users and service providers.
- **Comprehensive Service Listings**: Wide range of services including plumbing, electrical, cleaning, and gardening.
- **Feedback and Rating System**: Users can rate and review service providers.

## Technologies Used
- **Frontend**: React Native
- **Backend**: MERN stack (MongoDB, Express.js, React, Node.js)
- **Database**: MongoDB,Firebase
- **File Storage**: Multer
- **Hosting**: Cloud platform

## Project Implementation
The project integrates a range of modern technologies to provide real-time booking and service tracking. Security protocols are in place to protect user data. Here’s a breakdown of the major components:
### File Structure

```plaintext
.
├── .expo
├── .idea
├── .vscode
├── android
├── assets
│   ├── icons
│   ├── images
│   ├── adaptive-icon.png
│   ├── back_arrow.png
│   ├── favicon.png
│   ├── icon.png
│   ├── splash.png
│   └── splash1.png
├── backend
│   ├── node_modules
│   ├── uploads
│   ├── App.js
│   ├── index_port.js
│   ├── index.js
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   ├── serviceAccountKey.json
│   ├── ui-debug.log
│   └── UserDetails.js
├── config
│   ├── firebase.js
│   └── ip_address.js
├── Dashboards
├── hooks
│   └── useAuth.js
├── node_modules
├── Posts_integration
│   ├── AcceptedBookings.js
│   ├── Comment.js
│   ├── IncomingRequests.js
│   ├── PostDetails.js
│   ├── RatingScreen.js
│   ├── RejectedBookings.js
│   ├── ServicePicker.js
├── screens
│   ├── AppointmentsScreen.js
│   ├── FooterComponent.js
│   ├── HeaderComponent.js
│   ├── HomeScreen.js
│   ├── LoginScreen.js
│   ├── myProfileScreen.js
│   ├── ServicesScreen.js
│   ├── SignUpScreen.js
│   ├── UserScreen.js
│   ├── VerificationComponent.js
│   └── WelcomeScreen.js
├── service_prvdr
│   ├── BookingScreen.js
│   ├── Chat.js
│   ├── EditProfileScreen.js
│   ├── FetchImages.js
│   ├── firebase_img.js
│   ├── HamburgerMenu.js
│   ├── import React, { useState, useEffect } fr.ts
│   ├── List_images.js
│   ├── List_Users.js
│   ├── Mongotry.js
│   ├── NextScreen.js
│   ├── Prov_Requirement.js
│   ├── ProviderForm.js
│   ├── ProviderSignin.js
│   ├── ProviderSignup.js
│   └── stylesProfileEdit.js
├── Services
│   ├── BeautySaloonScreen.js
│   ├── CateringScreen.js
│   ├── CleaningScreen.js
│   ├── ClinicalScreen.js
│   ├── GardeningScreen.js
│   ├── HomeCareScreen.js
│   ├── MaintenanceScreen.js
│   ├── SecurityScreen.js
│   ├── ShiftingScreen.js
│   ├── SolarScreen.js
│   └── WashingScreen.js
├── theme
├── .gitignore
├── App.js
├── app.json
├── babel.config.js
├── colors.js
├── eas.json
├── gitignore
├── index.js
├── metro.config.js
├── package-lock.json
├── package.json
├── README.md
├── replay_pid14860.log
├── tailwind.config.js
└── tsconfig.json
```

### Backend
The backend of the project is built using Node.js and Express.js, providing a robust API for managing users, bookings, service providers, and images. The database is MongoDB, which stores all relevant data for the application. Here are the key functionalities:

- **User Registration and Login**: Secure authentication using JWT tokens.
- **Profile Management**: Users can upload and update profile images.
- **Service Listings**: Allows adding, updating, and retrieving service listings.
- **Booking System**: Handles the creation, updating, and retrieval of service bookings.
- **Rating and Reviews**: Users can submit ratings and reviews for services.
- **In-App Chat**: Facilitates communication between users and service providers.

#### Detailed Backend Functionalities

1. **Profile Image Management**
    - **Upload Profile Image**: Allows users to upload their profile images.
    - **Fetch Profile Images**: Retrieves all profile images from the database.
    - **Delete Profile Image**: Deletes a specific profile image by ID.
    - **Fetch Latest Profile Image**: Retrieves the most recently uploaded profile image.

2. **Post Image Management**
    - **Upload Post Image**: Allows users to upload images for service posts.
    - **Fetch Post Images**: Retrieves all post images, with optional filtering by service type.
    - **Delete Post Image**: Deletes a specific post image by ID.

3. **Booking Management**
    - **Create Booking**: Users can create new service bookings.
    - **Fetch All Bookings**: Retrieves all bookings from the database.
    - **Update Booking Status**: Allows updating the status of a booking (e.g., accepted, rejected).
    - **Accept Booking**: Marks a booking as accepted.
    - **Reject Booking**: Marks a booking as rejected, with an optional rejection reason.
    - **Rate Booking**: Allows users to submit a rating and comment for a completed booking.
    - **Fetch Ratings**: Retrieves all ratings and comments for services.

4. **Service Provider Management**
    - **Fetch Providers**: Retrieves all service providers.

### Frontend
- **React Native**: Develops a cross-platform mobile application for Android and iOS.
- **React**: Creates a web interface for desktop users.
- **Redux**: Manages application state for seamless user experience.

## Benefits
- **Convenience**: Easy booking and tracking of services.
- **Trust and Reliability**: High-quality service providers.
- **Efficiency**: Improved communication and service delivery.

## Getting Started

### Prerequisites
- Node.js
- MongoDB
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/mu2602659/AuraUserve-Mobile-App.git
    cd AuraUserve-Mobile-App
    ```

2. **Install node modules:**
    ```bash
    npm install
    ```

3. **Install other dependencies:**
    ```bash
    npm install expo
    npm install -g
    ```
4. **Start front-end server:**
    ```bash
   npx expo start
    ```


### Configuration

1. **Server Configuration:**

   Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
    MONGO_URI=mongodb+srv://serve:aura34@cluster0.jqlyfp6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 //replace with your url
    PORT=5001
    ```

2. **Client Configuration:**

   Create a `.env` file in the `client` directory and add the following environment variables:
    ```env
    REACT_APP_API_URL=http://localhost:5001
    ```

### Running the Application

1. **Replace ipaddress by cmd (ipconfig):**
    ```bash
    export const IMG_URL = 'http://192.168.100.17:5001';
    ```
2. **Install Nodemon:**
    ```bash
    cd ../client
    npm install nodemon
    ```
3. **Install other backend dependencies:**
    ```bash
    by using
    npm install _____
    ```
4. **Start the Back-end server:**
    ```bash
    cd backend
    node App
    ```

### API Endpoints

- **Profile Image Upload:**
    - `POST /profile-image`
    - **Payload:**
        ```json
        {
          "name": "User Name",
          "avatar": "<image file>"
        }
        ```

- **Post Image Upload:**
    - `POST /post-image`
    - **Payload:**
        ```json
        {
          "title": "Service Title",
          "description": "Service Description",
          "price": 100,
          "address": "Service Address",
          "service": "Service Type",
          "avatar": "<image file>"
        }
        ```

- **Fetch Post Images:**
    - `GET /post-images`
    - **Query Parameters:**
        - `service`: Optional, filter by service type.

- **Fetch Profile Images:**
    - `GET /profile-images`

- **Delete Profile Image:**
    - `DELETE /profile-image/:id`

- **Delete Post Image:**
    - `DELETE /post-image/:id`

- **Fetch Latest Profile Image:**
    - `GET /latest-profile-image`

- **Bookings:**
    - `GET /bookings`
    - `POST /bookings`
    - `PATCH /bookings/:id/status`
    - `PUT /bookings/:id/accept`
    - `PUT /bookings/:id/reject`
    - `PUT /bookings/:id/rate`
    - `GET /bookings/ratings`

### License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

### Contact
For any queries or support, please contact us at [infoaurauserve@gmail.com].

### Conclusion
By leveraging cutting-edge technology and a user-centric design approach, this project sets a new standard for home maintenance services in Pakistan. Our platform simplifies the process of finding and hiring trustworthy service providers, enhancing the overall user experience through real-time tracking and secure transactions. This project represents a significant step forward in modernizing the home services industry, providing homeowners with the confidence and convenience they need to maintain their homes effectively.
