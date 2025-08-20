import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let mockConsoleLog: jest.SpyInstance;
  let mockConsoleError: jest.SpyInstance;

  beforeEach(() => {
    logger = new JsonLogger();
    mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
    mockConsoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('log', () => {
    it('should output valid JSON with level "log"', () => {
      logger.log('Test message', 'Context', 123);
      const output = mockConsoleLog.mock.calls[0][0];
      expect(JSON.parse(output)).toEqual({
        level: 'log',
        message: 'Test message',
        optionalParams: ['Context', 123],
      });
    });
  });

  describe('error', () => {
    it('should output valid JSON with level "error"', () => {
      logger.error('Failed!', { details: 'DB timeout' });
      const output = mockConsoleError.mock.calls[0][0];
      expect(JSON.parse(output)).toEqual({
        level: 'error',
        message: 'Failed!',
        optionalParams: [{ details: 'DB timeout' }],
      });
    });
  });

  describe('warn', () => {
    it('should output valid JSON with level "warn"', () => {
      logger.warn('Warning', 'Deprecated API');
      const output = mockConsoleLog.mock.calls[0][0];
      expect(JSON.parse(output)).toEqual({
        level: 'warn',
        message: 'Warning',
        optionalParams: ['Deprecated API'],
      });
    });
  });
});
