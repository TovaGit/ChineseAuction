# Web API Project - Chinese Auction

## Project Description

This project is a Web API system for managing a Chinese auction, built with ASP.NET Web API on the server side and React on the client side. The system is designed for managing donors, gifts, and purchases, and includes functionality for conducting raffles.

### Project Goals

To manage a Chinese auction, including both customer and administrative access.

## Admin User

### Features and Management

- **Login**: An admin login page with a username and password. Admin users are pre-existing in the database.
- **Security**: Controllers and actions exclusive to admins are protected with `[Authorize(Roles = "manager")]` and JWT authentication.
- **Donor Management**:
  - View a list of donors.
  - Add, remove, and update donors.
  - Each donor includes a list of their donations.
  - Filter donors by name, email, or gift.
- **Gift Management**:
  - View a list of gifts, including a category for each gift.
  - Add, remove, and update gifts.
  - Search gifts by gift name, donor name, or number of buyers.
  - Set the price of raffle tickets.
- **Purchase Management**:
  - View ticket purchases for each gift.
  - Sort purchases by the most expensive gift or the most purchased gift.
  - View buyer details.
- **Raffle Process**:
  - Admin can perform a raffle on each gift from the list of buyers.
  - Generated a report detailing the winner of each gift.
  - Generated a report of total income from the raffle.
  - **Challenge**: Sended an email to the raffle winner.

## Customer User

- **Login and Registration**: A login or registration screen where users must provide their name, phone number, and email (including server-side validation).
- **Gift List**: View and sort gifts by price or category.
- **Add to Cart**: Add selected gifts to the cart (multiple times for each gift).
- **Drafts and Purchase Confirmation**: Gifts in the cart are saved as drafts in the database until the purchase is confirmed. Once confirmed, the gifts are purchased.
- **No Deletion After Purchase**: Gifts cannot be deleted after purchase, but can be deleted while still in draft status.
- **Post-Raffle View**: After the raffle is conducted, users can see the winners for each gift and cannot make further purchases.

## Development Points

- **Entity Framework Core**: Used Code First approach for database development.
- **Layered Architecture**: Developed the system using a modular, layered approach.
- **Authentication Middleware**: Implemented middleware for authentication.
- **Error Handling and Logging**: Implemented error handling and logging.
- **Dependency Injection**: Utilized DI for managing dependencies.

## Libraries and Frameworks

- **ASP.NET Core**: For building the API on the server side.
- **Entity Framework Core**: For data management.
- **JWT**: For authentication and authorization.
- **Axios**: For HTTP requests from the client side (if used).
- **AutoMapper**: For mapping between data transfer objects (DTOs) and entity models.

## How to Run the Project

1. **Server Setup**:
   - Install dependencies using NuGet.
   - Run the API on the server.

2. **Client Setup**:
   - Install dependencies using `npm install`.
   - Run the React application on the client side.
3. **Run the Server and Client**:
   - Ensure the server is running and the client can connect to it for testing and development.
## Database Setup

To ensure that the application runs smoothly, you will need to set up the database with sample data. This includes images and other initial data required for the application to function properly.
1. **SQL Script**: The project includes an SQL setup file named `scriptForCreatingDataBase.sql` that contains the necessary database schema and sample data.
2. **Run the SQL Script**:
   - Open your SQL server management tool.
   - Execute the `initial_setup.sql` file to create the database schema and populate it with initial data.
   - In the Program file update the `ConnectionStrings` section with your actual database connection string:

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests with improvements and suggestions.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any questions or support, please contact [tova6302@gmail.com].

Good luck!
