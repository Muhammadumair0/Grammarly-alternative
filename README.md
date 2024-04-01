# Grammarly Alternative

## Description

Grammarly Alternative is an open-source project designed to improve text document quality by detecting and correcting spelling errors. This web service processes English text documents, identifies misspelled words, and suggests corrections. Users have the option to accept these corrections, resulting in the service generating a new file with the amended spelling. This tool is perfect for developers, content creators, and anyone in need of a quick, reliable spelling correction utility.

## Features

- **Text Analysis:** Rapid identification of misspelled words in English documents.
- **User Interaction:** Prompts for user decision on suggested corrections.
- **Correction Implementation:** Generates a revised document with the selected corrections applied.
- **Open Source:** Allows for community contributions and enhancements.

## Technologies

- Node.js and Express for the backend.
- React for the frontend interface.
- PostgreSQL with pg-promise for database interactions.
- TypeScript for type-safe code.
- Webpack for module bundling.

## Getting Started

To get started with Grammarly Alternative , follow these steps:

1. **Clone the Repository**

  ```sh
  git clone https://github.com/Muhammadumair0/Grammarly-alternative.git
  cd Grammarly-alternative
  ```

2. **Install Dependencies**

  ```sh
  npm install
  ```

3. **Environment Setup**

  Create a `.env` file in the root directory and populate it with the necessary environment variables.

  ```env
  DATABASE_URL="YourPostgresDBUrl"
  ```

4. **Start the Application**

  - For development:

    ```sh
    npm run dev
    ```

  - For production:

    ```sh
    npm start
    ```
