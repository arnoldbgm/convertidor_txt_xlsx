import { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Papa from 'papaparse';

function App() {
  const fileInputRef = useRef();
  const [fileName, setFileName] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;

      const parsed = Papa.parse(text, {
        delimiter: "|",
        skipEmptyLines: true
      });

      const rawData = parsed.data.map(row =>
        row.map(cell => cell.trim())
      );

      const headers = rawData[0];
      const numericHeaders = [
        "BI Gravado DG",
        "IGV / IPM DG",
        "BI Gravado DGNG",
        "IGV / IPM DGNG",
        "BI Gravado DNG",
        "IGV / IPM DNG",
        "Valor Adq. NG",
        "ISC",
        "ICBPER",
        "Otros Trib/ Cargos",
        "Tipo de Cambio",
        "Valor Facturado Exportación",
        "BI Gravada",
        "Dscto BI",
        "IGV / IPM",
        "Dscto IGV / IPM",
        "Mto Exonerado",
        "Mto Inafecto",
        "ISC",
        "BI Grav IVAP",
        "IVAP",
        "ICBPER",
        "Otros Tributos",
        "Total CP",
        "Tipo Cambio",
      ];

      // Identificar índices de columnas que deben ser numéricas
      const numericIndexes = headers.map((header, i) =>
        numericHeaders.includes(header) ? i : -1
      ).filter(i => i !== -1);

      // Convertir las columnas numéricas
      const data = rawData.map((row, rowIndex) => {
        if (rowIndex === 0) return row; // Dejar los encabezados

        return row.map((cell, colIndex) => {
          // Limpiar comillas internas innecesarias
          if (typeof cell === "string") {
            cell = cell.replace(/"+/g, '').trim(); // Elimina todas las comillas dobles
          }

          // Truncar celdas largas para evitar error de Excel
          if (typeof cell === "string" && cell.length > 32767) {
            return cell.slice(0, 32767); // Limita la longitud a 32,767 caracteres
          }

          // Convertir columnas numéricas
          if (numericIndexes.includes(colIndex)) {
            const cleaned = cell.replace(",", ".").replace(/[^0-9.-]/g, "");
            const number = parseFloat(cleaned);
            return isNaN(number) ? "" : number;
          }

          return cell;
        });
      });

      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");

      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, "archivo_convertido.xlsx");

      // Permitir volver a cargar el mismo archivo
      e.target.value = null;
      fileInputRef.current.value = null;
    };

    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
      <div className="transform scale-[1.5]">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
            📄 Convertidor TXT a Excel 💚 - Para SUNAT 🔴🔵
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm text-center">
            Sube un archivo <code className="bg-gray-200 px-1 rounded dark:bg-gray-700">.txt</code> delimitado por <code className="bg-gray-200 px-1 rounded dark:bg-gray-700">|</code> y se descargará como <code className="bg-gray-200 px-1 rounded dark:bg-gray-700">.xlsx</code>.
          </p>

          <div>
            <label
              htmlFor="file_input"
              className="block w-full text-center py-3 px-4 bg-indigo-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-indigo-700 transition"
            >
              📂 Seleccionar archivo TXT
            </label>

            <input
              id="file_input"
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              ref={fileInputRef}
              className="hidden"
            />

            {fileName && (
              <p className="mt-3 text-sm text-green-500 text-center">
                Archivo seleccionado: <span className="font-medium">{fileName}</span>
              </p>
            )}

            <p className="text-center mt-3 text-amber-50 font-semibold">
              Desarrollado por: Arnold Gallegos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
