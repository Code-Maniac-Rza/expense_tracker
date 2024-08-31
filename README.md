# Expense Tracker

This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application for tracking expenses. Users can add, edit, and delete expenses, as well as view their current balance and transaction history.

## Features

- Add new expenses with description, amount, and category
- Edit existing expenses
- Delete expenses
- View current balance
- Display transaction history
- Categorize expenses
- RESTful API for expense management

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **API Communication**: Axios

## Setup and Installation

1. Clone the repository:
   ```
   git clone https://github.com/Code-Maniac-Rza/expense_tracker.git
   cd expense-tracker
   ```

2. Install dependencies:
   ```
   npm install
   cd expense-tracker
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the backend server:
   ```
   npm run server
   ```

5. Start the frontend development server:
   ```
   cd expense-tracker
   npm start
   ```

6. Open your browser and navigate to `http://localhost:5000`

## API Endpoints

- `GET /expenses`: Fetch all expenses
- `POST /expenses`: Add a new expense
- `PUT /expenses/:id`: Update an existing expense
- `DELETE /expenses/:id`: Delete an expense
- `GET /expenses/category/:category`: Fetch expenses by category

## Security Features

- CORS enabled
- Helmet for setting various HTTP headers
- Rate limiting to prevent abuse
- Input validation and sanitization

## Future Improvements

- User authentication and authorization
- Data visualization (charts, graphs)
- Export functionality (CSV, PDF)
- Budget setting and alerts
- Mobile responsiveness

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
