import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let mockStdoutWrite: jest.SpyInstance;
  let mockStderrWrite: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    mockStdoutWrite = jest
      .spyOn(process.stdout, 'write')
      .mockImplementation(() => true);
    mockStderrWrite = jest
      .spyOn(process.stderr, 'write')
      .mockImplementation(() => true);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('log() should output correct TSKV format', () => {
    logger.log('Test message', 'TestContext');

    const output = mockStdoutWrite.mock.calls[0][0];
    expect(output).toMatch(
      /timestamp=.+\tlevel=log\tmessage=Test message\tcontext=TestContext\n/,
    );
  });

  it('error() should include stack trace', () => {
    logger.error('Error occurred', 'Error stack', 'ErrorContext');

    const output = mockStderrWrite.mock.calls[0][0];
    expect(output).toMatch(
      /timestamp=.+\tlevel=error\tmessage=Error occurred\tcontext=ErrorContext\tstack=Error stack\n/,
    );
  });

  it('should escape special characters', () => {
    logger.log('Message with\nnew line', 'Context\twith\ttabs');

    const output = mockStdoutWrite.mock.calls[0][0];
    expect(output).toContain('message=Message with\\nnew line');
    expect(output).toContain('context=Context\\twith\\ttabs');
  });

  it('warn() should output without context', () => {
    logger.warn('Warning message');

    const output = mockStdoutWrite.mock.calls[0][0];
    expect(output).toMatch(
      /timestamp=.+\tlevel=warn\tmessage=Warning message\n/,
    );
    expect(output).not.toContain('context=');
  });
});
