using Microsoft.Office.Interop.Excel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Web;
using System.Web.Helpers;
using System.Web.Http;

namespace InvestmentSubmissionAPI.Controllers
{
    public class FileController : ApiController
    {
        public void DownloadFile(string fileName)
        {

        }



        [HttpPost]
        public HttpResponseMessage UploadFile()
        {
            List<TemplateFields> templateFieldsList = new List<TemplateFields>();
            var httpRequest = HttpContext.Current.Request;
            string id = httpRequest.Params["VamID"];
            string userName = httpRequest.Params["EmployeeName"];
            string submissionDate = httpRequest.Params["SubmissionDate"];
            try
            {
                //Download files 
                if (httpRequest.Files.Count > 0)
                {
                    for (int i = 0; i < httpRequest.Files.Count; i++)
                    {
                        var postedFile = httpRequest.Files[i];
                        if (postedFile != null && postedFile.ContentLength != 0)
                        {
                            var filePath = ConfigurationManager.AppSettings["FilesShareLocation"];
                            string folderName = "VAM_" + id;
                            string fileName = postedFile.FileName;
                            if (!Directory.Exists(Path.Combine(filePath, folderName)))
                            {
                                Directory.CreateDirectory(Path.Combine(filePath, folderName));
                            }
                            if (File.Exists(Path.Combine(filePath, folderName, fileName)))
                            {
                                File.Delete(Path.Combine(filePath, folderName, fileName));
                            }
                            postedFile.SaveAs(Path.Combine(filePath, folderName, fileName));
                        }
                    }
                }

                foreach (var item in JArray.Parse(httpRequest.Params["Data"]))
                {
                    foreach (var field in item)
                    {
                        templateFieldsList.Add(field.ToObject<TemplateFields>());
                    }
                }
                CreateExcelDoc(id, userName, templateFieldsList);
                return Request.CreateResponse(HttpStatusCode.OK, "Uploaded Sucessfully");
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }


        [HttpGet]
        public HttpResponseMessage GetExcelData()
        {
            Application xlApp;
            object misValue;
            Workbook xlWorkBook;
            Worksheet xlWorkSheet;
            xlApp = new Application();
            System.Data.DataTable dt = new System.Data.DataTable();
            if (xlApp == null)
            {
                throw new Exception("Excel is not properly istalled");
            }
            misValue = System.Reflection.Missing.Value;
            xlWorkBook = xlApp.Workbooks.Open(ConfigurationManager.AppSettings["ExcelLocation"]);
            xlWorkSheet = (Worksheet)xlWorkBook.Worksheets.get_Item(1);
            int rowCount = xlWorkSheet.UsedRange.Rows.Count;
            int columnCount = xlWorkSheet.UsedRange.Columns.Count;
            int rowNumber = 1;
            for (int c = 1; c <= columnCount; c++)
            {
                string colname = xlWorkSheet.Cells[1, c].Text;
                dt.Columns.Add(colname);
                rowNumber = 2;
            }
            for (int r = rowNumber; r <= rowCount; r++)
            {
                DataRow dr = dt.NewRow();
                for (int c = 1; c <= columnCount; c++)
                {
                    dr[c - 1] = xlWorkSheet.Cells[r, c].Text;
                }
                dt.Rows.Add(dr);
            }
            DisposeExcel(ref xlApp, misValue, ref xlWorkBook, ref xlWorkSheet);
            return Request.CreateResponse(HttpStatusCode.OK, dt);

        }

        private void CreateExcelDoc(string id, string name, List<TemplateFields> fieldsList)
        {
            Application xlApp;
            object misValue;
            Workbook xlWorkBook;
            xlApp = new Application();
            if (xlApp == null)
            {
                throw new Exception("Excel is not properly istalled");
            }
            misValue = System.Reflection.Missing.Value;

            System.Data.DataTable dt;
            DataRow datarow;
            GenerateDataTable(id, name, fieldsList, out dt, out datarow);

            int row, col;

            Worksheet xlWorkSheet = null;
            Range objRange = null;
            if (!File.Exists(ConfigurationManager.AppSettings["ExcelLocation"]))
            {
                row = 1; col = 1;
                int j = col;

                xlWorkBook = xlApp.Workbooks.Add(1);
                xlWorkSheet = (Worksheet)xlWorkBook.Worksheets.get_Item(1);
                xlWorkSheet.Name = "Proofs Submitted";

                GenerateHeaders(dt, row, xlWorkSheet, ref objRange, ref j);
                row++;
                InsertToExcel(dt, datarow, row, xlWorkSheet, ref objRange);
            }
            else
            {
                bool recordExists = false;
                xlWorkBook = xlApp.Workbooks.Open(ConfigurationManager.AppSettings["ExcelLocation"]);
                xlWorkSheet = (Worksheet)xlWorkBook.Worksheets.get_Item(1);
                row = xlWorkSheet.UsedRange.Rows.Count + 1;
                for (int i = 2; i < row; i++)
                {
                    if (xlWorkSheet.Cells[i, 1].Text == id)
                    {
                        InsertToExcel(dt, datarow, i, xlWorkSheet, ref objRange);
                        recordExists = true;
                    }
                }
                if (!recordExists)
                {
                    InsertToExcel(dt, datarow, row, xlWorkSheet, ref objRange);
                }
            }
            SaveExcelData(misValue, xlWorkBook);
            DisposeExcel(ref xlApp, misValue, ref xlWorkBook, ref xlWorkSheet);
        }

        private static void GenerateHeaders(System.Data.DataTable dt, int row, Worksheet xlWorkSheet, ref Range objRange, ref int j)
        {
            foreach (DataColumn column in dt.Columns)
            {

                objRange = (Range)xlWorkSheet.Cells[row, j];
                objRange.Value2 = column.ColumnName;
                j++;
            }
        }

        private static void DisposeExcel(ref Application xlApp, object misValue, ref Workbook xlWorkBook, ref Worksheet xlWorkSheet)
        {
            xlWorkBook.Close(true, misValue, misValue);
            xlApp.Quit();
            Marshal.ReleaseComObject(xlWorkSheet);
            Marshal.ReleaseComObject(xlWorkBook);
            Marshal.ReleaseComObject(xlApp);


            xlWorkSheet = null;
            xlWorkBook = null;
            xlApp = null;

            GC.GetTotalMemory(false);
            GC.Collect();
            GC.WaitForPendingFinalizers();
            GC.Collect();
            GC.GetTotalMemory(true);
        }

        private static void SaveExcelData(object misValue, Workbook xlWorkBook)
        {
            if (!File.Exists(ConfigurationManager.AppSettings["ExcelLocation"]))
            {
                xlWorkBook.SaveAs(ConfigurationManager.AppSettings["FilesShareLocation"], XlFileFormat.xlWorkbookNormal, misValue, misValue, misValue, misValue, XlSaveAsAccessMode.xlExclusive, misValue, misValue, misValue, misValue, misValue);

            }
            else
            {
                xlWorkBook.Save();
            }
        }

        private static void GenerateDataTable(string id, string name, List<TemplateFields> fieldsList, out System.Data.DataTable dt, out DataRow datarow)
        {
            dt = new System.Data.DataTable();
            string file = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Files", ConfigurationManager.AppSettings["ExcelData"]);
            List<Dictionary<string, string>> excelFields = JsonConvert.DeserializeObject<List<Dictionary<string, string>>>(File.ReadAllText(file));

            foreach (var item in excelFields[0])
            {
                dt.Columns.Add(item.Key);
            }

            datarow = dt.NewRow();
            datarow["VamID"] = id;
            datarow["Name"] = name;
            datarow["Date"] = DateTime.Now;
            foreach (var item in fieldsList)
            {
                if (item.Amount != "" && Convert.ToInt64(item.Amount) > 0)
                {
                    datarow["Amount_" + item.itemCode] = item.Amount;
                    datarow["Filename_" + item.itemCode] = item.FileName;
                }
            }
        }

        private void InsertToExcel(System.Data.DataTable dt, DataRow datarow, int row, Worksheet xlWorkSheet, ref Range objRange)
        {
            int col = 1;
            int count = dt.Columns.Count;
            int k = col;
            for (int i = 0; i < count; i++)
            {
                objRange = (Range)xlWorkSheet.Cells[row, k];
                objRange.Value2 = datarow[i].ToString();
                k++;
            }
        }
    }
}
