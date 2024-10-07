# Radio Browser Challenge

A dynamic audio player for streaming music and radio, designed for effortless control and intuitive management of multiple audio streams, enhancing your listening experience.

### Languages, Frameworks, and Technologies Used

- **JavaScript/TypeScript**: The primary programming languages used for building the application.
- **React**: A JavaScript library for building user interfaces, particularly for creating the audio player component and managing its state.
- **HTML**: The markup language used for structuring the application.
- **CSS**: For styling the audio player and overall application layout.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs without leaving your HTML.
- **Web Audio API**: A browser-based API for processing and synthesizing audio.
- **Hooks (React)**: Specifically, React hooks such as customHooks, `useEffect` and `useRef` for managing side effects and references to DOM elements.
- **NPM/Yarn**: Package managers for managing project dependencies and libraries.
- **Git**: Version control system for tracking changes in the source code.
- **Jest**: A testing framework for JavaScript and TypeScript used for unit and integration tests.
- **Vite**: A build tool and development server for faster development and optimized production builds.
- **ESLint**: A static code analysis tool for identifying and fixing problems in JavaScript and TypeScript code.
- **@testing-library**: A family of libraries for testing React components in a user-centric way.
- **HLS.js**: A JavaScript library for playing HLS (HTTP Live Streaming) videos in browsers.

## Installation

1. **Clone the repository:**

   git clone https://github.com/your-username/radio-browser-challenge-michel-machado.git

2. **Navigate into the project directory:**

   cd radio-browser-challenge-michel-machado

3. **Install dependencies:**

   npm install

   or if you prefer Yarn:

   yarn install

## Usage

To start the development server, run:

npm run dev

or with Yarn:

yarn dev

Visit `http://localhost:3000` in your browser to view the application.

## Decision-Making in Development

I chose to fetch all station data to enhance the user experience. Given the large amount of data, I managed it using a simple database with IndexedDB. This approach provides real database functionality without the need for additional third-party databases, allowing for faster development.

Users will only need to wait for the data to load the first time they access the app; subsequent requests will be fetched from their local IndexedDB.

While I could have used Redux for state management, I opted for React’s Context API instead, as it wasn't specified in the project requirements. This choice helps improve prop drilling.

For audio handling, I utilized the native audio features of the browser, incorporating support for various URL formats through HLS.js. Users will receive alerts for any unsupported stations.

I believe I have successfully fulfilled all the tasks outlined in the job details while ensuring a positive user experience.
