import { Injectable } from '@nestjs/common';
import { Font, Workbook, Worksheet } from 'exceljs';
import { startOfMonth, endOfMonth, eachDayOfInterval, format } from 'date-fns';

@Injectable()
export class ExportService {
  constructor() {}

  async timeSheet(): Promise<any> {
    const workbook = new Workbook();
    let worksheet = workbook.addWorksheet('TimeSheet');

    workbook.title = 'TimeSheet';

    //* Topic Time sheet Form
    worksheet.mergeCells('A1:L1');
    worksheet.getCell('A1').value = 'Time sheet Form';
    worksheet.getCell('A1').font = {
      name: 'Century Gothic',
      size: 20.5,
      bold: true,
      italic: true,
    };
    worksheet.getCell('A1').alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };

    //#region Personal Information
    const fontSizePI = 15;
    const fontNamePI = 'Century Gothic';
    worksheet.mergeCells('A2:L2');
    worksheet.getCell('A2').value = {
      richText: [
        {
          text: 'Name: ',
          font: { name: 'Century Gothic', bold: true, size: fontSizePI },
        },
        {
          text: 'Phrompong Khagtes    ',
          font: {
            underline: 'single',
          },
        },
        {
          text: 'Position: ',
          font: { bold: true },
        },
        {
          text: 'Senior Full Stack Developer',
          font: {
            underline: 'single',
          },
        },
      ],
    };
    worksheet.getCell('A2').font = {
      name: fontNamePI,
      size: fontSizePI,
    };

    worksheet.mergeCells('A3:L3');
    worksheet.getCell('A3').value = {
      richText: [
        {
          text: 'Project Code: ',
          font: { name: fontNamePI, bold: true, size: fontSizePI },
        },
        {
          text: '-    ',
          font: {
            name: fontNamePI,
            underline: 'single',
            size: fontSizePI,
          },
        },
        {
          text: 'Location: ',
          font: { name: fontNamePI, bold: true, size: fontSizePI },
        },
        {
          text: 'Bedrock',
          font: {
            name: fontNamePI,
            underline: 'single',
            size: fontSizePI,
          },
        },
      ],
    };
    worksheet.getCell('A3').font = {
      name: fontNamePI,
      size: fontSizePI,
    };

    worksheet.mergeCells('A4:L4');
    worksheet.getCell('A4').value = {
      richText: [
        {
          text: 'Project Name: LI-Platform ',
          font: { name: fontNamePI, bold: true, size: fontSizePI },
        },
        {
          text: 'CDDP   ',
          font: {
            name: fontNamePI,
            underline: 'single',
            size: fontSizePI,
          },
        },
        {
          text: 'Period: ',
          font: { name: fontNamePI, bold: true, size: fontSizePI },
        },
        {
          text: '01/07/2024 - 31/07/2024',
          font: {
            name: fontNamePI,
            underline: 'single',
            size: fontSizePI,
          },
        },
      ],
    };
    worksheet.getCell('A4').font = {
      name: fontNamePI,
      size: fontSizePI,
    };

    //#endregion

    //#region Header Date
    const dateNow = new Date();

    await this.generateDetail(worksheet, {
      column: 'A',
      columnTitle: 'Date',
      data: this.generateDate(dateNow),
    });

    await this.generateDetail(worksheet, {
      column: 'B',
      columnTitle: 'Day',
      data: this.generateDay(dateNow),
    });
    // worksheet.mergeCells('A5:A6');
    // worksheet.getCell(`A5`).value = 'Date';
    // worksheet.getCell(`A5`).alignment = {
    //   vertical: 'middle',
    //   horizontal: 'center',
    // };
    // worksheet.getCell(`A5`).font = {
    //   name: fontNamePI,
    //   size: fontSizePI,
    //   bold: true,
    // };
    // worksheet.getCell(`A5`).border = {
    //   top: { style: 'thin' },
    //   left: { style: 'thin' },
    //   bottom: { style: 'thin' },
    //   right: { style: 'thin' },
    // };

    // //TODO change month
    // let day = 1;
    // for (let i = 7; i <= 6 + 30; i++) {
    //   worksheet.getCell(`A${i}`).border = {
    //     top: { style: 'thin' },
    //     left: { style: 'thin' },
    //     bottom: { style: 'thin' },
    //     right: { style: 'thin' },
    //   };

    //   worksheet.getCell(`A${i}`).value = day++;

    //   worksheet.getCell(`A${i}`).font = {
    //     name: fontNamePI,
    //     size: fontSizePI,
    //   };

    //   worksheet.getCell(`A${i}`).alignment = {
    //     vertical: 'middle',
    //     horizontal: 'center',
    //   };
    // }
    //#endregion

    //#region Header Day
    // worksheet.mergeCells('B5:B6');
    // worksheet.getCell(`B5`).value = 'Day';
    // worksheet.getCell(`B5`).alignment = {
    //   vertical: 'middle',
    //   horizontal: 'center',
    // };
    // worksheet.getCell(`B5`).font = {
    //   name: fontNamePI,
    //   size: fontSizePI,
    //   bold: true,
    // };
    // worksheet.getCell(`B5`).border = {
    //   top: { style: 'thin' },
    //   left: { style: 'thin' },
    //   bottom: { style: 'thin' },
    //   right: { style: 'thin' },
    // };

    //#endregion

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }

  private async generateDetail(
    worksheet: any,
    setting: { column: string; columnTitle: string; data: any[] },
  ): Promise<Worksheet> {
    const { column, columnTitle, data } = setting;

    if (!column || !data) throw new Error('Invalid column or data');

    worksheet.mergeCells(`${column}5:${column}6`);
    worksheet.getCell(`${column}5`).value = columnTitle;
    worksheet.getCell(`${column}5`).alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };
    worksheet.getCell(`${column}5`).font = {
      size: 12,
      bold: true,
    };
    worksheet.getCell(`$${column}5`).border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    let index = 0;
    for (let i = 7; i <= 6 + data.length; i++) {
      worksheet.getCell(`${column}${i}`).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };

      worksheet.getCell(`${column}${i}`).value = data[index++];

      worksheet.getCell(`${column}${i}`).font = {
        size: 10,
      };

      worksheet.getCell(`${column}${i}`).alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
    }

    return worksheet;
  }

  private generateDate(dateNow: Date): number[] {
    const daysOfWeek = eachDayOfInterval({
      start: startOfMonth(dateNow),
      end: endOfMonth(dateNow),
    });

    return daysOfWeek.map((day) => day.getDate());
  }

  private generateDay(dateNow: Date): string[] {
    const daysOfWeek = eachDayOfInterval({
      start: startOfMonth(dateNow),
      end: endOfMonth(dateNow),
    });

    return daysOfWeek.map((day) => format(day, 'EEE'));
  }
}
