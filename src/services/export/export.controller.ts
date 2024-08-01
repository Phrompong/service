import { Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExportService } from './export.service';
import { Response } from 'express';

@ApiTags('ExportController')
@Controller('export')
export class ExportController {
  constructor(private readonly exportService: ExportService) {}

  @Post('/timeSheet')
  async timeSheet(@Res() res: Response) {
    const buffer = await this.exportService.timeSheet();

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=example.xlsx',
      'Content-Length': buffer.length,
    });

    res.end(buffer);
  }
}
