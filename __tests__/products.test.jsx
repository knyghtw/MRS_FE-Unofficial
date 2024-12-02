import create from "@/api/products/create";
import token from "@/utils/getCookie";

jest.mock("@/utils/getCookie", () => jest.fn());
global.fetch = jest.fn();

describe("Create Product Test", () => {
    const formDataMock = new FormData();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should successfully create a product and return a data", async () => {
        token.mockReturnValue("mock-token");
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({ success: true, message: "Product Created" }),
        };
        fetch.mockResolvedValue(mockResponse);

        const response = await create(formDataMock);

        expect(fetch).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/products`,
            expect.objectContaining({
                method: "POST",
                headers: {
                    Authorization: "Bearer mock-token",
                },
                body: formDataMock,
            })
        );

        expect(response).toEqual({ success: true, message: "Product Created" });
        }
    );

    it("should handle errors if the response is not ok", async () => {
        token.mockReturnValue("mock-token");
        const mockResponse = {
            ok: false,
            status: 400,
            statusText: "Bad Request",
        };
        fetch.mockResolvedValue(mockResponse);

        await expect(create(formDataMock)).rejects.toThrow("Error: 400 Bad Request");        
    });
});