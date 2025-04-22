# 🧾 Convertidor TXT a Excel para archivos SUNAT

Esta herramienta web está pensada especialmente para personas que trabajan con archivos `.txt` o `.csv` generados desde la plataforma de la **SUNAT** (Superintendencia Nacional de Administración Tributaria - Perú), y que suelen presentar problemas al abrirse directamente en Excel.

## 🚨 Problema común

Al abrir un archivo `.csv` o `.txt` de SUNAT en Excel:
- Se pierden ceros a la izquierda (`01` se convierte en `1`).
- Los datos se ven desordenados o en columnas incorrectas.
- Excel puede malinterpretar los delimitadores (`|` o `;`).

## ✅ Solución

Esta aplicación permite:

1. Subir un archivo `.txt` delimitado por `|`.
2. Convertirlo automáticamente a un archivo `.xlsx` (Excel).
3. Descargar el archivo ya **organizado y sin pérdida de datos**.

👉 Todos los campos se tratan como texto para mantener formatos como:  
`01`, `000123456`, `A001`, etc.

## 🛠️ Tecnologías utilizadas

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [PapaParse](https://www.papaparse.com/) (lector de `.txt`)
- [SheetJS (XLSX)](https://sheetjs.com/) (para generar Excel)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/) (para forzar la descarga)

## 🚀 ¿Cómo usar?

1. Clona o descarga el repositorio.
2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el proyecto:

   ```bash
   npm run dev
   ```

4. Abre el navegador en `http://localhost:5173` (o el puerto que indique tu terminal).
5. Sube tu archivo `.txt` generado por SUNAT y descarga el `.xlsx` listo para usar.

---

## 👨‍💻 Desarrollado por

**Arnold Gallegos**  
Contribuciones y mejoras son bienvenidas.