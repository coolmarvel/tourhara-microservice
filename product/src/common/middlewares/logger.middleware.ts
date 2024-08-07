import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

import { logger } from '../logger';

@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');

      logger.info(`${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`);
    });

    next();
  }
}
