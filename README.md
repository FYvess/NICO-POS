# Nico_POS
Nico_POS is a Point of Sale (POS) system designed to help manage products and streamline sales processes. This guide will walk you through initiating the system, managing products, and using the website effectively.

## Getting Started

### Prerequisites
- Ensure you have Visual Studio Code (VS Code) installed on your machine.
- Clone the repository to your local machine:
    ```bash
    git clone https://github.com/your-username/Nico_POS.git
    ```
- Open the project in VS Code:
    1. Launch VS Code.
    2. Click on `File > Open Folder` and select the `Nico_POS` folder.

### Running the Application
- Use the Live Server extension in VS Code:
    1. Install the Live Server extension from the VS Code Extensions Marketplace.
    2. Open the main HTML file (e.g., `index.html`) in the project.
    3. Right-click on the file and select `Open with Live Server`.
    4. Your default browser will open, displaying the application.

### Publishing to GitHub
- To publish your changes to GitHub:
    1. Make your changes in the code.
    2. Save the changes and commit them:
        ```bash
        git add .
        git commit -m "Your commit message"
        ```
    3. Push the changes to the repository:
        ```bash
        git push origin main
        ```
    Replace `main` with the branch name if your repository uses a different default branch.

## Managing Products

### Updating Products
Since there is no admin page, all product management must be done manually in the code. To update products:
1. Open the relevant configuration or data file in the project directory. For example, check `products.js` or `data/products.json` (if available).
2. Locate the product details you want to modify.
3. Edit the product information directly in the code. For example:
    ```javascript
    const products = [
        { id: 1, name: "Product A", price: 10.99 },
        { id: 2, name: "Product B", price: 15.99 },
    ];
    ```
4. Save the changes.
5. Refresh the browser to see the updates.

## Using the Website

### For Customers
- Browse products by category or search for specific items.
- Add items to the cart and proceed to checkout.
- Complete the purchase by providing payment and shipping details.

## Support
If you encounter any issues or have questions, please open an issue in the repository or contact the support team.

## License
This project is licensed under the [MIT License](NICO WEBAPP).
