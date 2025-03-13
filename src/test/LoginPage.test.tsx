// 1️⃣ Import dependencies
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import LoginPage from "../component/LoginPage";

// 2️⃣ Mock useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// 3️⃣ Group all LoginPage tests
describe("LoginPage Component", () => {
  
  // 4️⃣ Test if component renders correctly
  test("renders LoginPage correctly", () => {
    // Arrange
    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Assert
    expect(getByText("ONLINE BOOK SHOPPING")).toBeInTheDocument();
    expect(getByText("LOGIN")).toBeInTheDocument();
    expect(getByText("SIGNUP")).toBeInTheDocument();
    expect(getByPlaceholderText("yadav.ponam@bridgeit.com")).toBeInTheDocument();
    expect(getByPlaceholderText("Password")).toBeInTheDocument();
  });

  // 5️⃣ Test user input
  test("allows user to type in email and password fields", () => {
    // Arrange
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText("yadav.ponam@bridgeit.com");
    const passwordInput = getByPlaceholderText("Password");

    // Act
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Assert
    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  // 6️⃣ Test form submission
  test("triggers form submission with correct values", () => {
    // Arrange
    console.log = jest.fn(); // Mock console.log
    const { getByPlaceholderText, getByText } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText("yadav.ponam@bridgeit.com");
    const passwordInput = getByPlaceholderText("Password");
    const submitButton = getByText("Login");

    // Act
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);
    
    // Assert
    expect(console.log).toHaveBeenCalledWith("Login submitted:", {
      email: "test@example.com",
      password: "password123",
    });
  });

  // 7️⃣ Test navigation to Signup page
 // 7️⃣ Test navigation to Signup page
test("navigates to signup page when SIGNUP button is clicked", () => {
  // Arrange
  const navigateMock = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(navigateMock); // ✅ Correct way to mock useNavigate

  const { getByText } = render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  // Act
  fireEvent.click(getByText("SIGNUP"));

  // Assert
  expect(navigateMock).toHaveBeenCalledWith("/signup");

    // Act
    fireEvent.click(getByText("SIGNUP"));

    // Assert
    expect(navigateMock).toHaveBeenCalledWith("/signup");
  });

  // 8️⃣ Test navigation to Forgot Password page
  test("navigates to forgot password page when Forgot Password? link is clicked", () => {
    // Arrange
    const { getByText } = render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    // Act
    fireEvent.click(getByText("Forgot Password?"));

    // Assert
    expect(window.location.pathname).toBe("/forgotPassword");
  });
});
