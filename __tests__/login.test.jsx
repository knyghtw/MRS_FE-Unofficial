import { render, fireEvent, screen } from "@testing-library/react";
import Login from "@/app/admin/login/page";
import login from "@/api/auth/login";
import setCookie from "@/utils/setCookie";
import setTimeExpired from "@/utils/setTimeExpired";
import { useRouter } from "next/navigation";

jest.mock("@/api/auth/login");
jest.mock("@/utils/setCookie");
jest.mock("@/utils/setTimeExpired");
jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("Login", () => {
  it("should disable the login button when username or password is empty", () => {
    render(<Login />);
    expect(screen.getByRole("button", { name: "LOGIN" })).toBeDisabled();
  });

  it("should enable the login button when username and password are filled", () => {
    render(<Login />);
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin123" } });

    expect(screen.getByRole("button", { name: "LOGIN" })).toBeEnabled();
  });

  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({
      push: mockPush,
    });
  });

  it("should handle successful login", async () => {
    login.mockResolvedValue({
      success: true,
      data: {
        token_detail: {
          token: "mockedToken",
          expires_at: "2024-12-31T23:59:59Z",
        },
      },
    });

    render(<Login />);
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: "LOGIN" });

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "admin123" } });

    fireEvent.click(loginButton);

    await screen.findByText("LOGIN");

    expect(login).toHaveBeenCalledWith(expect.any(FormData));
    expect(setCookie).toHaveBeenCalledWith("mockedToken");
    expect(setTimeExpired).toHaveBeenCalledWith(expect.any(Number));
    expect(mockPush).toHaveBeenCalledWith("/admin/manage-page");
  });

  it("should handle failed login", async () => {
    login.mockResolvedValue({
      success: false,
      message: "Invalid username or password",
    });

    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<Login />);
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: "LOGIN" });

    fireEvent.change(usernameInput, { target: { value: "admina" } });
    fireEvent.change(passwordInput, { target: { value: "admin321" } });

    fireEvent.click(loginButton);

    await screen.findByText("LOGIN");

    expect(login).toHaveBeenCalledWith(expect.any(FormData));
    expect(alertMock).toHaveBeenCalledWith("Invalid username or password");

    expect(mockPush).not.toHaveBeenCalled();

    alertMock.mockRestore();
  });
});