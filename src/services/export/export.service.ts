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

    //#region Table detail
    const dateNow = new Date();

    // * Column Date
    this.generateDetail(worksheet, {
      column: 'A',
      columnTitle: 'Date',
      data: this.generateDate(dateNow),
      isMergeHeader: true,
    });

    // * Column Day
    this.generateDetail(worksheet, {
      column: 'B',
      columnTitle: 'Day',
      data: this.generateDay(dateNow),
      isMergeHeader: true,
    });

    //#region Column Working Time from and to
    // * Column Working Time
    worksheet.mergeCells('C5:D5');
    worksheet.getCell('C5').value = 'Working Time';
    this.style(worksheet, {
      column: 'C5',
      alignment: true,
      font: true,
      border: true,
      bold: true,
    });

    worksheet.getCell('C6').value = 'From';
    this.style(worksheet, {
      column: 'C6',
      alignment: true,
      font: true,
      border: true,
      bold: true,
    });

    worksheet.getCell('D6').value = 'To';
    this.style(worksheet, {
      column: 'D6',
      alignment: true,
      font: true,
      border: true,
      bold: true,
    });

    // * Column from
    await this.generateDetail(worksheet, {
      column: 'C',
      columnTitle: 'From',
      data: this.generateWorkingTimeForm(dateNow),
    });

    // * Column to
    await this.generateDetail(worksheet, {
      column: 'D',
      columnTitle: 'To',
      data: this.generateWorkingTimeTo(dateNow),
    });
    //#endregion

    //#region Column Overtime from and to
    // * Column Overtime
    worksheet.mergeCells('E5:F5');
    worksheet.getCell('E5').value = 'Overtime';
    this.style(worksheet, {
      column: 'E5',
      alignment: true,
      font: true,
      border: true,
      bold: true,
    });

    worksheet.getCell('E6').value = 'From';
    this.style(worksheet, {
      column: 'E6',
      alignment: true,
      font: true,
      border: true,
      bold: true,
    });

    worksheet.getCell('F6').value = 'To';
    this.style(worksheet, {
      column: 'F6',
      alignment: true,
      font: true,
      border: true,
      bold: true,
    });

    // * Column from
    this.generateDetail(worksheet, {
      column: 'E',
      columnTitle: 'From',
      data: this.generateOvertime(dateNow),
    });

    // * Column to
    this.generateDetail(worksheet, {
      column: 'F',
      columnTitle: 'To',
      data: this.generateOvertime(dateNow),
    });

    //#endregion

    //#region Column For payroll
    worksheet.mergeCells('G5:I5');
    worksheet.getCell('G5').value = 'FOR PAYROLL';
    this.style(worksheet, {
      column: 'G5',
      alignment: true,
      font: true,
      border: true,
      bold: true,
    });

    worksheet.getCell('G6').value = '1';
    this.style(worksheet, {
      column: 'G6',
      alignment: true,
      font: true,
      border: true,
      bold: true,
    });

    worksheet.getCell('H6').value = '1.5';
    this.style(worksheet, {
      column: 'H6',
      alignment: true,
      font: true,
      border: true,
      bold: true,
    });

    worksheet.getCell('I6').value = '3';
    this.style(worksheet, {
      column: 'I6',
      alignment: true,
      font: true,
      border: true,
      bold: true,
    });

    // * Column 1
    this.generateDetail(worksheet, {
      column: 'G',
      columnTitle: '1',
      data: this.generateOvertime(dateNow),
      isBgColor: true,
    });

    // * Column 1.5
    this.generateDetail(worksheet, {
      column: 'H',
      columnTitle: '1.5',
      data: this.generateOvertime(dateNow),
      isBgColor: true,
    });

    // * Column 3
    this.generateDetail(worksheet, {
      column: 'I',
      columnTitle: '3',
      data: this.generateOvertime(dateNow),
      isBgColor: true,
    });
    //#endregion

    //#region Column Reasons
    worksheet.mergeCells('J5:L6');
    worksheet.getCell('J5').value = 'Reasons';
    this.style(worksheet, {
      column: 'J5',
      alignment: true,
      font: true,
      border: true,
      bold: true,
    });

    this.generateDetail(worksheet, {
      columnForm: 'J',
      columnTo: 'L',
      isMergeDetail: true,
      columnTitle: 'Reasons',
      data: this.generateReasons(dateNow),
    });

    //#endregion

    //#endregion

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }

  private async generateDetail(
    worksheet: any,
    setting: {
      column?: string;
      columnTitle: string;
      data: any[];
      isMergeHeader?: boolean;
      isBgColor?: boolean;
      columnForm?: string;
      columnTo?: string;
      isMergeDetail?: boolean;
    },
  ): Promise<Worksheet> {
    const {
      column,
      columnTitle,
      data,
      isMergeHeader,
      isBgColor,
      isMergeDetail,
      columnForm,
      columnTo,
    } = setting;

    if (isMergeHeader == true) {
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
    }

    let index = 0;
    for (let i = 7; i <= 6 + data.length; i++) {
      let v: string = column
        ? `${column}${i}`
        : `${columnForm}${i}:${columnTo}${i}`;

      if (isMergeDetail === true) {
        worksheet.mergeCells(v);
      }

      worksheet.getCell(v).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };

      worksheet.getCell(v).value = data[index++];

      worksheet.getCell(v).font = {
        size: 10,
      };

      worksheet.getCell(v).alignment = {
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true,
      };

      if (isBgColor) {
        worksheet.getCell(v).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF808080' },
        };
      }

      if (isMergeDetail === true) {
        const numLines = worksheet.getCell(v).value.split('\n').length;
        worksheet.getRow(i).height = numLines * 20;
        worksheet.getCell(v).alignment = {
          vertical: 'middle',
          horizontal: 'left',
          wrapText: true,
        };
      }
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

  private generateWorkingTimeForm(dateNow: Date): string[] {
    const day = this.generateDay(dateNow);

    return day.map((o) => {
      if (o === 'Sat' || o === 'Sun') return '';
      return '08:00';
    });
  }

  private generateWorkingTimeTo(dateNow: Date): string[] {
    const day = this.generateDay(dateNow);

    return day.map((o) => {
      if (o === 'Sat' || o === 'Sun') return '';
      return '17:00';
    });
  }

  private generateOvertime(dateNow: Date): string[] {
    const day = this.generateDay(dateNow);

    return day.map((o) => {
      return '';
    });
  }

  private generateReasons(dateNow: Date): string[] {
    const day = this.generateDay(dateNow);

    return day.map((o) => {
      return `บรรทัดที่ 1\nบรรทัดที่ 2\nnบรรทัดที่ 3\nบรรทัดที่ 4\nบรรทัดที่ 5`;
    });
  }

  private style(
    worksheet: Worksheet,
    setting: {
      column: string;
      bold?: boolean;
      border?: boolean;
      font?: boolean;
      alignment?: boolean;
    },
  ) {
    const { bold, border, font, alignment, column } = setting;

    if (border) {
      worksheet.getCell(column).border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    }

    if (font) {
      worksheet.getCell(column).font = {
        name: 'Arial',
        size: 12,
        bold: bold,
      };
    }

    if (alignment) {
      worksheet.getCell(column).alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
    }
  }
}
