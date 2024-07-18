# React Quiz Application

This project is a dynamic quiz application built with React. It fetches questions from an API, presents them to the user with a timer, and provides a summary of answers at the end.

## Features

- Fetches quiz questions from an external API
- Timed questions with a 30-second countdown for each
- Visual progress bar for remaining time
- Disabled answer options for the first 10 seconds of each question
- Results table displayed at the end of the quiz
- Responsive design for various screen sizes

## Components

### Main Components

1. `Quiz`: The main component that manages the quiz state and logic
2. `ProgressBar`: Displays the remaining time for each question
3. `Table`: Shows the summary of user answers at the end of the quiz

### Additional Components

- `Check` icon from `lucide-react` for completed questions

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server

## Usage

1. Launch the application
2. Click the "Start" button to begin the quiz
3. Answer each question within the 30-second time limit
4. Answers will become clickable after 10 seconds
5. View your answers at the end of the quiz
6. Click "Restart Quiz" to play again

## Current Question and Options logic

- Application fetches mock data from `https://jsonplaceholder.typicode.com/posts`.
- Example data for a question:

```
  {
    "userId": 1,
    "id": 5,
    "title": "nesciunt quas odio",
    "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
  }
```

- Data is mapped as an understandable object after fetch process:

```
  {
    "question": "lorem ipsum",
    "options": {
      A: "",
      B: "",
      C: "",
      D: ""
    }
  }
```

- Quiz App uses `title` as the question
- Quiz App uses `body` as options. In order to generate random options, random slices of `body` taken using `Math.random()`

## Dependencies

- React
- lucide-react (for icons)

## API

The application fetches quiz questions from `https://jsonplaceholder.typicode.com/posts`. In a production environment, you would replace this with your actual quiz API.

## Customization

You can customize various aspects of the quiz:

- Modify the `fetchQuestions` function to use a different API or question format
- Adjust the time limit by changing the initial `timeLeft` state (currently set to 30 seconds)
- Customize styles using Tailwind CSS classes or by modifying the existing classes

## Future Improvements

- Add difficulty levels
- Implement user authentication
- Store high scores
- Add sound effects for correct/incorrect answers
- Implement different question types (multiple choice, true/false, etc.)

## License

This project is open source and available under the [MIT License](LICENSE).
