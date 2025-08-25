import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import type { IAlumnoListado } from '../views/alumnos/ListAlumnos';


export const exportToExcel = async (alumnos: IAlumnoListado[], actividadNombre: string, mes: string) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(actividadNombre);

  // Estilos definidos con tipos correctos
  const headerStyle: Partial<ExcelJS.Style> = {
    font: { bold: true, size: 12, color: { argb: 'FFFFFF' } },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } },
    alignment: { vertical: 'middle', horizontal: 'center' },
    border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
  };

  const titleStyle: Partial<ExcelJS.Style> = {
    font: { bold: true, size: 14 },
    alignment: { vertical: 'middle', horizontal: 'left' }
  };

  const normalStyle: Partial<ExcelJS.Style> = {
    font: { size: 11 },
    alignment: { vertical: 'middle', horizontal: 'left' },
    border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
  };

  const nomenclatorStyle: Partial<ExcelJS.Style> = {
    font: { size: 10, italic: true },
    alignment: { vertical: 'middle', horizontal: 'left' }
  };

  // Fila 1: GRUPO y CIERRE MENSUAL
  const row1 = worksheet.addRow([]);
  row1.getCell(1).value = 'GRUPO:';
  row1.getCell(1).style = titleStyle;
  row1.getCell(2).value = actividadNombre;
  row1.getCell(2).style = titleStyle;
  
  // Unir celdas para CIERRE MENSUAL (AA)
  worksheet.mergeCells(`AA1:AB1`);
  row1.getCell(27).value = 'CIERRE MENSUAL';
  row1.getCell(27).style = { 
    ...headerStyle, 
    alignment: { vertical: 'middle', horizontal: 'center' } as ExcelJS.Alignment 
  };

  // Fila 2: MES y Situaciones
  const row2 = worksheet.addRow([]);
  row2.getCell(1).value = 'MES:';
  row2.getCell(1).style = titleStyle;
  row2.getCell(2).value = mes;
  row2.getCell(2).style = titleStyle;
  
  // Situación escolar y PIVE
  row2.getCell(27).value = 'Situación escolar';
  row2.getCell(27).style = headerStyle;
  row2.getCell(28).value = 'Situación PIVE';
  row2.getCell(28).style = headerStyle;

  // Fila 3: Encabezados
  const row3 = worksheet.addRow([]);
  row3.getCell(1).value = 'N°';
  row3.getCell(1).style = headerStyle;
  row3.getCell(2).value = 'NOMBRE';
  row3.getCell(2).style = headerStyle;

  // Aplicar estilo de header a todas las celdas de la fila 3
  for (let i = 1; i <= 28; i++) {
    if (!row3.getCell(i).value) {
      row3.getCell(i).value = '';
      row3.getCell(i).style = headerStyle;
    }
  }

  // Filas de alumnos
  alumnos.forEach((alumno, index) => {
    const row = worksheet.addRow([]);
    row.getCell(1).value = `${index + 1}.0`;
    row.getCell(1).style = normalStyle;
    row.getCell(2).value = `${alumno.apellido} ${alumno.nombre}`;
    row.getCell(2).style = normalStyle;

    // Rellenar el resto de celdas con estilo
    for (let i = 3; i <= 28; i++) {
      row.getCell(i).value = '';
      row.getCell(i).style = normalStyle;
    }
  });

  // Totales
  const totalPresentes = worksheet.addRow([]);
  totalPresentes.getCell(1).value = 'TOTAL PRESENTES';
  totalPresentes.getCell(1).style = titleStyle;

  const totalAusentes = worksheet.addRow([]);
  totalAusentes.getCell(1).value = 'TOTAL AUSENTES';
  totalAusentes.getCell(1).style = titleStyle;

  // Espacio en blanco
  worksheet.addRow([]);

  // Nomencladores
  const addNomenclatorRow = (colB: string, colD: string, colI: string) => {
    const row = worksheet.addRow([]);
    if (colB) {
      row.getCell(2).value = colB;
      row.getCell(2).style = nomenclatorStyle;
    }
    if (colD) {
      row.getCell(4).value = colD;
      row.getCell(4).style = nomenclatorStyle;
    }
    if (colI) {
      row.getCell(9).value = colI;
      row.getCell(9).style = nomenclatorStyle;
    }
  };

  addNomenclatorRow('NOMENCLADOR ASISTENCIA', 'NOMENCLADOR ESCOLARIDAD', 'NOMENCLADOR PIVE');
  addNomenclatorRow('P. Presente', 'R: Regular', '1. Acciones para la vinculación/revinc.');
  addNomenclatorRow('A. Ausente', 'D: Discontinua', '2. Fortalec. Del rol del estud.');
  addNomenclatorRow('AJ. Ausente justificado', 'DP: Dif Pedag.', '3. Trabajo ind. lectura y escritura');
  addNomenclatorRow('C. Contacté', 'DPyD: Dif ped y Disc', '4. Elaborac de prop. Ped. Compartida');
  addNomenclatorRow('', 'DV: Desvinculación', '5. Definición conjunta de evaluac y acred.');

  // Ajustar anchos de columnas
  worksheet.columns = [
    { width: 20 },  // A
    { width: 30 }, // B
    { width: 5 },  // C
    { width: 15 }, // D
    { width: 5 },  // E
    { width: 5 },  // F
    { width: 5 },  // G
    { width: 5 },  // H
    { width: 40 }, // I
    { width: 5 },  // J
    { width: 5 },  // K
    { width: 5 },  // L
    { width: 5 },  // M
    { width: 5 },  // N
    { width: 5 },  // O
    { width: 5 },  // P
    { width: 5 },  // Q
    { width: 5 },  // R
    { width: 5 },  // S
    { width: 5 },  // T
    { width: 5 },  // U
    { width: 5 },  // V
    { width: 5 },  // W
    { width: 5 },  // X
    { width: 5 },  // Y
    { width: 5 },  // Z
    { width: 15 }, // AA
    { width: 15 }  // AB
  ];

  // Generar el archivo
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { 
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
  });
  
  saveAs(blob, `Asistencia_${actividadNombre}_${mes}.xlsx`);
};