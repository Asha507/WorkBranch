using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace InvestmentSubmissionAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
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
               
                CreateRecordInDatabase(httpRequest, templateFieldsList, id);
            //    CreateExcelDoc(httpRequest, templateFieldsList);
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

        private void CreateRecordInDatabase(HttpRequest httpRequest, List<TemplateFields> templateFieldsList,string id)
        {
            System.Data.DataTable dt;
    
            System.Data.DataTable hradt;
            DataRow hradatarow;
            try
            {

                GenerateDataTable(httpRequest, templateFieldsList, out dt);
                GenerateHraDataTable(httpRequest, templateFieldsList, out hradt);
                InsertToDatabase(dt,hradt,id);
            }
            catch(Exception ex)
            {

            }
         }

        [HttpPost]
        public HttpResponseMessage UpdateStatus([FromBody] dynamic data)
        {
            var httpRequest = HttpContext.Current.Request;
            string id =data["VamID"].Value;
            string status = data["Status"].Value;
            string remark = data["Remark"].Value;

            System.Data.DataTable dt = new System.Data.DataTable();

            try
            {
                using (var cnnSQL = new SqlConnection(ConfigurationManager.ConnectionStrings["SqlConnection"].ToString()))
                {
                    cnnSQL.Open();
                    using (SqlCommand cmmSQL = new SqlCommand("sp_UpdateStatus", cnnSQL))
                    {
                        cmmSQL.CommandType = System.Data.CommandType.StoredProcedure;

                        cmmSQL.Parameters.AddWithValue("@ID", id);
                        cmmSQL.Parameters.AddWithValue("@Status", status);
                        cmmSQL.Parameters.AddWithValue("@Remark", remark);
                        cmmSQL.ExecuteNonQuery();
                    }
                }
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
        public HttpResponseMessage GetEmployeeData(int id=0)
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
            string json = "";
            System.Data.DataTable dt = new System.Data.DataTable();
            using (var cnnSQL = new SqlConnection(ConfigurationManager.ConnectionStrings["SqlConnection"].ToString()))
            {
                cnnSQL.Open();
                using (SqlCommand cmmSQL = new SqlCommand("sp_GetProofsData", cnnSQL))
                {
                    cmmSQL.CommandType = System.Data.CommandType.StoredProcedure;

                    cmmSQL.Parameters.AddWithValue("@ID", id);
                    SqlDataReader dataReader = cmmSQL.ExecuteReader();
                    dt.Load(dataReader);
                }
            }
            json = DataTableToJSON(dt);              
            
            return json;
        }

        public string GetHRAResponseJson(int id)
        {
            System.Data.DataTable dt = new System.Data.DataTable();

            string json = "";

            using (var cnnSQL = new SqlConnection(ConfigurationManager.ConnectionStrings["SqlConnection"].ToString()))
            {
                cnnSQL.Open();
                using (SqlCommand cmmSQL = new SqlCommand("sp_GetHraData", cnnSQL))
                {
                    cmmSQL.CommandType = System.Data.CommandType.StoredProcedure;
                    cmmSQL.Parameters.AddWithValue("@ID", id);
                    SqlDataReader dataReader = cmmSQL.ExecuteReader();
                    dt.Load(dataReader);
                }
            }
            json = DataTableToJSON(dt);
            return json;
        }

        private void GenerateHraDataTable(HttpRequest httpRequest, List<TemplateFields> fieldsList, out System.Data.DataTable hradt)
        {
            DataRow hradatarow;
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
            hradt.Rows.Add(hradatarow);
        }

        public string DataTableToJSON(System.Data.DataTable table)
        {
            string JSONString = string.Empty;
            JSONString = JsonConvert.SerializeObject(table);
            return JSONString;
        }

        private void GenerateDataTable(HttpRequest httpRequest, List<TemplateFields> fieldsList, out System.Data.DataTable dt)
        {
            DataRow datarow;
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
            dt.Rows.Add(datarow);         
        }

        private void InsertToDatabase(System.Data.DataTable dt, System.Data.DataTable hradt,string id)
        {
            using (var cnnSQL = new SqlConnection(ConfigurationManager.ConnectionStrings["SqlConnection"].ToString()))
            {
                cnnSQL.Open();
                using (SqlCommand cmmSQL = new SqlCommand("sp_SaveProofsData", cnnSQL))
                {                   
                    cmmSQL.CommandType = System.Data.CommandType.StoredProcedure;

                    cmmSQL.Parameters.AddWithValue("@ID", id);
                    cmmSQL.Parameters.AddWithValue("@Details", dt);
                    cmmSQL.ExecuteNonQuery();
                }
                using (SqlCommand cmmSQL = new SqlCommand("sp_SaveHraData", cnnSQL))
                {
                    cmmSQL.CommandType = System.Data.CommandType.StoredProcedure;

                    cmmSQL.Parameters.AddWithValue("@ID", id);
                    cmmSQL.Parameters.AddWithValue("@Details", hradt);
                    cmmSQL.ExecuteNonQuery();
                }
            }
        }
       

    }
}
