import { Injectable } from '@nestjs/common';
import { Font, Workbook } from 'exceljs';

@Injectable()
export class ExportService {
  constructor() {}

  async timeSheet(): Promise<any> {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('TimeSheet');

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

    // * Detail row 5 - 41
    worksheet.getCell('A6').border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };

    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  }
}
