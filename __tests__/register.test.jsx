import { render, fireEvent, screen } from "@testing-library/react";
import RegisterLayout from "@/app/register/page";
import register from "@/api/auth/register";
import login from "@/api/auth/login";
import setCookie from "@/utils/setCookie";
import setTimeExpired from "@/utils/setTimeExpired";
import { useRouter } from "next/navigation";

jest.mock("@/api/auth/register");
jest.mock("@/api/auth/login");
jest.mock("@/utils/setCookie");
jest.mock("@/utils/setTimeExpired");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Register", () => {
  it("should disable the register button when username or password is empty", () => {
    render(<RegisterLayout />);
    expect(screen.getByRole("button", { name: "Daftar Akun" })).toBeDisabled();
  });

  it("should enable the register button when username and password are filled", () => {
    render(<RegisterLayout />);
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const passwordConfirmationInput =
      screen.getByPlaceholderText("Ulangi Password");

    fireEvent.change(usernameInput, { target: { value: "mikehawk" } });
    fireEvent.change(passwordInput, { target: { value: "mikehawk123" } });
    fireEvent.change(passwordConfirmationInput, {
      target: { value: "mikehawk123" },
    });

    expect(screen.getByRole("button", { name: "Daftar Akun" })).toBeEnabled();
  });

  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({
      push: mockPush,
    });
  });

  it("should handle successful registration", async () => {
    const mockToken = "mockedToken";
    const mockExpiresAt = new Date().getTime() + 3600 * 1000; // 1 hour from now
    const mockUserCredential = {
      data: {
        token_detail: {
          token: mockToken,
          expires_at: new Date(mockExpiresAt).toISOString(),
        },
      },
    };

    register.mockResolvedValue({ success: true });
    login.mockResolvedValue(mockUserCredential);
    setCookie.mockResolvedValue();
    setTimeExpired.mockResolvedValue();

    render(<RegisterLayout />);
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const passwordConfirmationInput =
      screen.getByPlaceholderText("Ulangi Password");
    const registerButton = screen.getByRole("button", { name: "Daftar Akun" });

    fireEvent.change(usernameInput, { target: { value: "mikehawk" } });
    fireEvent.change(passwordInput, { target: { value: "mikehawk123" } });
    fireEvent.change(passwordConfirmationInput, {
      target: { value: "mikehawk123" },
    });

    fireEvent.click(registerButton);

    await screen.findByText("Daftar Akun");

    expect(register).toHaveBeenCalledWith(expect.any(FormData));
    expect(login).toHaveBeenCalledWith(expect.any(FormData));
    expect(setCookie).toHaveBeenCalledWith("mockedToken");
    expect(setTimeExpired).toHaveBeenCalledWith(expect.any(Number));
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("should handle failed registration", async () => {
    const mockError = new Error("Registration failed");
    register.mockRejectedValue(mockError);

    render(<RegisterLayout />);
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInput = screen.getByPlaceholderText("Password");
    const passwordConfirmationInput =
      screen.getByPlaceholderText("Ulangi Password");
    const registerButton = screen.getByRole("button", { name: "Daftar Akun" });

    fireEvent.change(usernameInput, { target: { value: "mikehawk" } });
    fireEvent.change(passwordInput, { target: { value: "mikehawk123" } });
    fireEvent.change(passwordConfirmationInput, {
      target: { value: "mikehawk123" },
    });

    fireEvent.click(registerButton);

    await screen.findByText("Daftar Akun");

    expect(register).toHaveBeenCalledWith(expect.any(FormData));
    expect(login).not.toHaveBeenCalled();
    expect(setCookie).not.toHaveBeenCalled();
    expect(setTimeExpired).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
