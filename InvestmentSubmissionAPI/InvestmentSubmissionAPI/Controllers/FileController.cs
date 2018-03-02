using log4net;
using Microsoft.Office.Interop.Excel;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Web;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Http.Cors;

namespace InvestmentSubmissionAPI.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class FileController : ApiController
    {

        [HttpPost]
        public HttpResponseMessage UploadFile()
        {
            Logger.Info("Started downloading files");
            List<TemplateFields> templateFieldsList = new List<TemplateFields>();
            var httpRequest = HttpContext.Current.Request;
            string id = httpRequest.Params["VamID"];
            string userName = httpRequest.Params["EmployeeName"];
            string submissionDate = httpRequest.Params["SubmissionDate"];
            string mobileNumber = httpRequest.Params["MobileNumber"];
            string months = httpRequest.Params["HraAmount"];
            try
            {
                foreach (var item in JArray.Parse(httpRequest.Params["Data"]))
                {
                    foreach (var field in item)
                    {
                        templateFieldsList.Add(field.ToObject<TemplateFields>());
                    }
                }
                var code="";
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
                            if (fileName.Equals(httpRequest.Params["PanFile"]))
                            {
                                code = "Pan";
                            }
                            else if (fileName.Equals(httpRequest.Params["RentReciptFile"]))
                            {
                                code = "Rent";
                            }
                            else if (fileName.Equals(httpRequest.Params["AggrementFile"]))
                            {
                                code = "RentAggrement";
                            }
                            else if (fileName.Equals(httpRequest.Params["Medical_File"]))
                            {
                                code = "Medical";
                            }
                            else
                            {
                                code = (templateFieldsList.Where(x => x.FileName == postedFile.FileName)).First().itemCode;
                            }
                            
                            if (!Directory.Exists(Path.Combine(filePath, folderName)))
                            {
                                Directory.CreateDirectory(Path.Combine(filePath, folderName));
                            }
                            if (File.Exists(Path.Combine(filePath, folderName, fileName)))
                            {
                                File.Delete(Path.Combine(filePath, folderName, fileName));
                            }
                            string[] files = Directory.GetFiles(Path.Combine(filePath, folderName), code+"*.*");
                            foreach (var file in files)
                            {
                                File.Delete(file);
                            }
                            postedFile.SaveAs(Path.Combine(filePath, folderName,code+"_"+fileName));
                        }
                    }
                }
                Logger.Info("Downloaded all files");
                CreateExcelDoc(httpRequest, templateFieldsList);
                Logger.Info("Saving in excel completed");
                //Add HRA Data
                String encryptedResponse = new JSONWebTokens("Uploaded Sucessfully", 300).GetEncryptedJwtToken();
                return Request.CreateResponse(HttpStatusCode.OK, encryptedResponse);
            }
            catch (Exception ex)
            {
                Logger.Fatal("VAMID: " + id+"Failed at Upload File", ex);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }

        [HttpPost]
        public HttpResponseMessage UpdateStatus([FromBody] dynamic data)
        {
            var httpRequest = HttpContext.Current.Request;
            string id =data["VamID"].Value;
            string status = data["Status"].Value;
            string remark = data["Remark"].Value;
            Application xlApp;
            object misValue;
            Workbook xlWorkBook;
            Worksheet xlWorkSheet;
            xlApp = new Application();
            xlApp.DisplayAlerts = false;
            System.Data.DataTable dt = new System.Data.DataTable();
            if (xlApp == null)
            {
                throw new Exception("Excel is not properly istalled");
            }
            misValue = System.Reflection.Missing.Value;
            try
            {
                xlWorkBook = xlApp.Workbooks.Open(ConfigurationManager.AppSettings["ExcelLocation"]);
                xlWorkSheet = (Worksheet)xlWorkBook.Worksheets.get_Item(1);
                int rowCount = xlWorkSheet.UsedRange.Rows.Count;
                int columnCount = xlWorkSheet.UsedRange.Columns.Count;
                Range objRange;
                for (int r = 2; r <= rowCount; r++)
                {
                    if (xlWorkSheet.Cells[r, 1].Text == id)
                    {
                        objRange = (Range)xlWorkSheet.Cells[r, columnCount-1];
                        objRange.Value2 = status;
                        objRange = (Range)xlWorkSheet.Cells[r, columnCount];
                        objRange.Value2 = remark;
                        break;
                    }
                }
                SaveExcelData(misValue, xlWorkBook);
                DisposeExcel(ref xlApp, misValue, ref xlWorkBook, ref xlWorkSheet);
                String encryptedResponse = new JSONWebTokens("Success", 300).GetEncryptedJwtToken();
                return Request.CreateResponse(HttpStatusCode.OK, encryptedResponse);
            }
            catch (Exception ex)
            {
                Logger.Fatal("VAMID: "+ id +"Failed at Update Status", ex);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);

            }
        }

        [HttpGet]
        public HttpResponseMessage GetExcelData(int id=0)
        {
            try
            {
                string json = GetResponseJson(id);
                String encryptedResponse = new JSONWebTokens(json, 300).GetEncryptedJwtToken();
                return Request.CreateResponse(HttpStatusCode.OK, encryptedResponse);
            }
            catch (Exception ex)
            {
                Logger.Fatal("VAMID: " + id + "Failed at GetExcelData", ex);
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

        }



        public string GetResponseJson(int id)
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
            string json = "";
            if (File.Exists(ConfigurationManager.AppSettings["ExcelLocation"]))
            {
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
                    if (0 != id)
                    {
                        if (Convert.ToInt32(dr["VamID"]) == id)
                        {
                            dt.Rows.Add(dr);
                            break;
                        }
                    }
                    else
                    {
                        dt.Rows.Add(dr);
                    }
                }
                DisposeExcel(ref xlApp, misValue, ref xlWorkBook, ref xlWorkSheet);
                json = DataTableToJSON(dt);
            }
            return json;
        }

        public string GetHRAResponseJson(int id)
        {
            Application xlApp;
            object misValue;
            Workbook xlWorkBook;
            Worksheet xlWorkSheet;
            xlApp = new Application();
            xlApp.DisplayAlerts = false;
            System.Data.DataTable dt = new System.Data.DataTable();
            if (xlApp == null)
            {
                throw new Exception("Excel is not properly istalled");
            }
            misValue = System.Reflection.Missing.Value;
            string json = "";
            if (File.Exists(ConfigurationManager.AppSettings["ExcelLocation"]))
            {
                xlWorkBook = xlApp.Workbooks.Open(ConfigurationManager.AppSettings["ExcelLocation"]);
                xlWorkSheet = (Worksheet)xlWorkBook.Worksheets.get_Item(2);
                int rowCount = xlWorkSheet.UsedRange.Rows.Count;
                int columnCount = xlWorkSheet.UsedRange.Columns.Count;
                int rowNumber = 1;
                for (int c = 3; c <= columnCount; c++)
                {
                    string colname = xlWorkSheet.Cells[1, c].Text;
                    dt.Columns.Add(colname);
                    rowNumber = 2;
                }
                for (int r = rowNumber; r <= rowCount; r++)
                {
                    DataRow dr = dt.NewRow();
                    for (int c = 3; c <= columnCount; c++)
                    {
                        dr[c - 3] = xlWorkSheet.Cells[r, c].Text;
                    }
                    if (0 != id)
                    {
                        if (Convert.ToInt32(xlWorkSheet.Cells[r, 1].Text) == id)
                        {
                            dt.Rows.Add(dr);
                            break;
                        }
                    }
                }
                DisposeExcel(ref xlApp, misValue, ref xlWorkBook, ref xlWorkSheet);
                json = DataTableToJSON(dt);
            }
            return json;
        }

        private void CreateExcelDoc(HttpRequest httpRequest, List<TemplateFields> fieldsList)
        {
            Application xlApp;
            object misValue;
            Workbook xlWorkBook;
            xlApp = new Application();
            xlApp.DisplayAlerts = false;
            if (xlApp == null)
            {
                throw new Exception("Excel is not properly istalled");
            }
            misValue = System.Reflection.Missing.Value;

            System.Data.DataTable dt;
            DataRow datarow;
            System.Data.DataTable hradt;
            DataRow hradatarow;
            GenerateDataTable(httpRequest, fieldsList, out dt, out datarow);
            GenerateHraDataTable(httpRequest, fieldsList, out hradt, out hradatarow);
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

                row = 1; col = 1;
                 j = col;
                objRange = null;
                xlWorkBook.Sheets.Add(After: xlWorkBook.Sheets[xlWorkBook.Sheets.Count]);
                xlWorkSheet = (Worksheet)xlWorkBook.Worksheets.get_Item(2);
                xlWorkSheet.Name = "HRA Details";

                GenerateHeaders(hradt, row, xlWorkSheet, ref objRange, ref j);
                row++;
                InsertToExcel(hradt, hradatarow, row, xlWorkSheet, ref objRange);

            }
            else
            {
                bool recordExists = false;
                xlWorkBook = xlApp.Workbooks.Open(ConfigurationManager.AppSettings["ExcelLocation"]);
                xlWorkSheet = (Worksheet)xlWorkBook.Worksheets.get_Item(1);
                row = xlWorkSheet.UsedRange.Rows.Count + 1;
                for (int i = 2; i < row; i++)
                {
                    if (xlWorkSheet.Cells[i, 1].Text == httpRequest.Params["VamID"])
                    {
                        InsertToExcel(dt, datarow, i, xlWorkSheet, ref objRange);
                        recordExists = true;
                        break;
                    }
                }
                if (!recordExists)
                {
                    InsertToExcel(dt, datarow, row, xlWorkSheet, ref objRange);
                }

                bool hrarecordExists = false;
                xlWorkSheet = (Worksheet)xlWorkBook.Worksheets.get_Item(2);
                row = xlWorkSheet.UsedRange.Rows.Count + 1;
                for (int i = 2; i < row; i++)
                {
                    if (xlWorkSheet.Cells[i, 1].Text == httpRequest.Params["VamID"])
                    {
                        InsertToExcel(hradt, hradatarow, i, xlWorkSheet, ref objRange);
                        hrarecordExists = true;
                        break;
                    }
                }
                if (!hrarecordExists)
                {
                    InsertToExcel(hradt, hradatarow, row, xlWorkSheet, ref objRange);
                }
            }
            //Save HRA Data

            SaveExcelData(misValue, xlWorkBook);
            DisposeExcel(ref xlApp, misValue, ref xlWorkBook, ref xlWorkSheet);
        }

        private void GenerateHraDataTable(HttpRequest httpRequest, List<TemplateFields> fieldsList, out System.Data.DataTable hradt, out DataRow hradatarow)
        {
            hradt = new System.Data.DataTable();

            hradt.Columns.Add("VamID");
            hradt.Columns.Add("Name");
            foreach (dynamic item in JArray.Parse(httpRequest.Params["HraAmount"]))
            {
                hradt.Columns.Add(item.Name.Value);
            }

            hradt.Columns.Add("Total_Rent");
            hradt.Columns.Add("RentReciptFile");
            hradt.Columns.Add("PanFile");
            hradt.Columns.Add("AggrementFile");
            hradatarow = hradt.NewRow();
            hradatarow["VamID"] = httpRequest.Params["VamID"];
            hradatarow["Name"] = httpRequest.Params["EmployeeName"];
            foreach (dynamic item in JArray.Parse(httpRequest.Params["HraAmount"]))
            {
                if (item.Name.Value != "")
                {
                    hradatarow[item.Name.Value] = item.Amount.Value;
                }
                else
                {
                    hradatarow[item.Name.Value] = "--";
                }
            }
            hradatarow["Total_Rent"] = httpRequest.Params["RentAmount"];
            hradatarow["RentReciptFile"] = httpRequest.Params["RentReciptFile"];
            hradatarow["PanFile"] = httpRequest.Params["PanFile"];
            hradatarow["AggrementFile"] = httpRequest.Params["AggrementFile"];

        }

        public string DataTableToJSON(System.Data.DataTable table)
        {
            string JSONString = string.Empty;
            JSONString = JsonConvert.SerializeObject(table);
            return JSONString;
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
                xlWorkBook.SaveAs(ConfigurationManager.AppSettings["ExcelLocation"], XlFileFormat.xlWorkbookNormal, misValue, misValue, misValue, misValue, XlSaveAsAccessMode.xlExclusive, misValue, misValue, misValue, misValue, misValue);

            }
            else
            {
                xlWorkBook.Save();
            }
        }

        private void GenerateDataTable(HttpRequest httpRequest, List<TemplateFields> fieldsList, out System.Data.DataTable dt, out DataRow datarow)
        {
            dt = new System.Data.DataTable();
            string file = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Files", ConfigurationManager.AppSettings["ExcelData"]);
            List<Dictionary<string, string>> excelFields = JsonConvert.DeserializeObject<List<Dictionary<string, string>>>(File.ReadAllText(file));

            foreach (var item in excelFields[0])
            {
                dt.Columns.Add(item.Key);
            }

            datarow = dt.NewRow();
            datarow["VamID"] = httpRequest.Params["VamID"];
            datarow["Name"] = httpRequest.Params["EmployeeName"];
            datarow["Submission_Date"] =httpRequest.Params["SubmissionDate"];
            datarow["Status"] = httpRequest.Params["Status"];
            datarow["Remark"] = "--";
            datarow["MobileNumber"] = httpRequest.Params["MobileNumber"];
            datarow["Email"]= httpRequest.Params["Email"];
            datarow["HRA_Amount"]= httpRequest.Params["RentAmount"];
            datarow["PanFile"] = httpRequest.Params["panFile"] != "" ? httpRequest.Params["panFile"] : "--";
            datarow["RentReciptFile"] = httpRequest.Params["RentReciptFile"] != "" ? httpRequest.Params["RentReciptFile"] : "--";
            datarow["AggrementFile"] = httpRequest.Params["AggrementFile"] != "" ? httpRequest.Params["AggrementFile"] : "--";
            datarow["Medical_Amount"] = httpRequest.Params["Medical_Amount"];
            datarow["Medical_File"] = httpRequest.Params["Medical_File"]!=""? httpRequest.Params["Medical_File"]:"--";
            foreach (var item in fieldsList)
            {
                if (item.Amount != "" && Convert.ToDecimal(item.Amount) > 0)
                {
                    datarow["Amount_" + item.itemCode] = item.Amount;
                    datarow["Filename_" + item.itemCode] = item.FileName;
                }
                else
                {
                    datarow["Amount_" + item.itemCode] = "--";
                    datarow["Filename_" + item.itemCode] = "--";
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
                objRange.Value2 = datarow[i];
                k++;
            }
        }

        
    }
}
