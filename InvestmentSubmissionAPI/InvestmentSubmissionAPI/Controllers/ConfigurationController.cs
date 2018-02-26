using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace InvestmentSubmissionAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ConfigurationController : ApiController
    {
        public bool isRecordExists = false;

        [HttpGet]
        [ActionName("GetConfiguration")]

        public HttpResponseMessage GetConfiguration()
        {
            Dictionary<string, string> configValues = new Dictionary<string, string>();
            try
            {
                configValues.Add("FinancialYear", ConfigurationManager.AppSettings["FinancialYear"]);
                configValues.Add("StartDate", ConfigurationManager.AppSettings["StartDate"]);
                configValues.Add("EndDate", ConfigurationManager.AppSettings["EndDate"]);

                return Request.CreateResponse(HttpStatusCode.OK, configValues);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

        }

        [HttpGet]
        public HttpResponseMessage CheckIfAdmin(int id)
        {
            string status = "false";
            try
            {
                List<string> adminIDs = ConfigurationManager.AppSettings["Admins"].Split(',').ToList();
                status=adminIDs.Contains(id.ToString())?"true":"false";
                return Request.CreateResponse(HttpStatusCode.OK, status);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }
        [HttpGet]
        [ActionName("GetMobileEmail")]

        public HttpResponseMessage GetMobileEmail(int id)
        {
            string email = "";
            string mobile = "";
            try
            {
                FileController fileController = new FileController();
                string jsonString = fileController.GetResponseJson(id);
                if (jsonString != "[]")
                {
                    dynamic json = JsonConvert.DeserializeObject(jsonString);
                    foreach (var item in json[0])
                    {
                        if (item.Name.Contains("MobileNumber"))
                        {
                            mobile = item.Value;
                        }
                        else if (item.Name.Contains("Email"))
                        {
                            email = item.Value;
                        }

                    }
                    return Request.CreateResponse(HttpStatusCode.OK, "MobileNumber:" + mobile + ",Email:" + email);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "");
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }


        [HttpGet]
        [ActionName("GetGuideLines")]
        public HttpResponseMessage GetGuideLines()
        {
            try
            {
                List<string> guidelinesList = ConfigurationManager.AppSettings["GuideLines"].Split(',').ToList();
                return Request.CreateResponse(HttpStatusCode.OK, guidelinesList);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

        }
        [HttpGet]
        [ActionName("GetFields")]
        public HttpResponseMessage GetFieldTemplates(int id)
        {
            try
            {
                List<TemplateFields> fields;
                Dictionary<string, List<TemplateFields>> fieldsData = new Dictionary<string, List<TemplateFields>>();
                string file = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Files", ConfigurationManager.AppSettings["80CFileName"]);
                fields = JsonConvert.DeserializeObject<List<TemplateFields>>(File.ReadAllText(file));
                fieldsData.Add("80C", fields);
                FileController fileController = new FileController();
                string jsonString = "";
                if (File.Exists(ConfigurationManager.AppSettings["ExcelLocation"]))
                {
                   jsonString = fileController.GetResponseJson(id);
                }
                
                if (jsonString != "[]" && jsonString != "")
                {
                    dynamic json = JsonConvert.DeserializeObject(jsonString);

                    foreach (TemplateFields field in fields)
                    {
                        foreach (var item in json[0])
                        {
                            if (item.Name.Contains("MobileNumber"))
                            {

                            }
                            if (item.Name.Contains("Amount_" + field.itemCode) && item.Value != "--")
                            {
                                field.Amount = item.Value;
                            }
                            if (item.Name.Contains("Filename_" + field.itemCode) && item.Value != "--")
                            {
                                field.FileName = item.Value;
                            }
                        }
                    }
                }
                file = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Files", ConfigurationManager.AppSettings["OthersFileName"]);
                fields = JsonConvert.DeserializeObject<List<TemplateFields>>(File.ReadAllText(file));
                if (jsonString != "[]" && jsonString != "")
                {
                    dynamic json = JsonConvert.DeserializeObject(jsonString);
                    foreach (TemplateFields field in fields)
                    {
                        foreach (var item in json[0])
                        {
                            if (item.Name.Contains("Amount_" + field.itemCode) && item.Value != "--")
                            {
                                field.Amount = item.Value;
                            }
                            if (item.Name.Contains("Filename_" + field.itemCode) && item.Value != "--")
                            {
                                field.FileName = item.Value;
                            }
                        }
                    }
                }
                fieldsData.Add("Others", fields);
                return Request.CreateResponse(HttpStatusCode.OK, fieldsData);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }

        }
    }
}
