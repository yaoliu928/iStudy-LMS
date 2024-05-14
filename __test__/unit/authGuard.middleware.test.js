const authGuardMiddleware = require('../../src/middleware/authGuard.middleware');
const { validateToken } = require('../../src/common/utils/jwt');
jest.mock('../../src/common/utils/jwt');

describe("authentication guard middleware", () => {
  beforeEach(() => {
    validateToken.mockReset();
  });

  it("should return 401 if authorization header is not defined", () => {
    // setup
    const req = {
      header: jest.fn(),
    };
    const res = {
      formatResponse: jest.fn(),
    };
    const next = jest.fn();

    // execute
    authGuardMiddleware(req, res, next);

    // compare
    expect(res.formatResponse).toHaveBeenCalledWith('Missing authorization token', 401)
  }),
    it("should call next function when token is valid", () => {
      const req = {
        header: jest.fn(),
      };
      const res = {
        formatResponse: jest.fn(),
      };
      const next = jest.fn();
      const token = 'any_token';

      req.header.mockReturnValue(`Bearer ${token}`);
      validateToken.mockImplementation((token) => {
        return { token };
      });

      authGuardMiddleware(req, res, next);

      expect(req.user).toEqual({ token });
      expect(next).toHaveBeenCalled();
    })
})