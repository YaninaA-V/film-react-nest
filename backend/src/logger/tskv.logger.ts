import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private format(
    level: string,
    message: string,
    context?: string,
    stack?: string,
  ) {
    const timestamp = new Date().toISOString();
    const fields = [
      `timestamp=${timestamp}`,
      `level=${level}`,
      `message=${this.escapeValue(message)}`,
      ...(context ? [`context=${this.escapeValue(context)}`] : []),
      ...(stack ? [`stack=${this.escapeValue(stack)}`] : []),
    ];
    return fields.join('\t') + '\n';
  }

  private escapeValue(value: string): string {
    return value.replace(/\n/g, '\\n').replace(/\t/g, '\\t');
  }

  log(message: string, context?: string) {
    process.stdout.write(this.format('log', message, context));
  }

  error(message: string, trace?: string, context?: string) {
    process.stderr.write(this.format('error', message, context, trace));
  }

  warn(message: string, context?: string) {
    process.stdout.write(this.format('warn', message, context));
  }

  debug(message: string, context?: string) {
    process.stdout.write(this.format('debug', message, context));
  }

  verbose(message: string, context?: string) {
    process.stdout.write(this.format('verbose', message, context));
  }
}
