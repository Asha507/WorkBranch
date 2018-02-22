using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace InvestmentSubmissionAPI.Controllers
{
    public class ConfigurationController : ApiController    {
   

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
        public HttpResponseMessage GetFieldTemplates()
        {
            try
            {
                List<TemplateFields> fields;
                Dictionary<string, List<TemplateFields>> fieldsData = new Dictionary<string, List<TemplateFields>>();
                string file = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Files", ConfigurationManager.AppSettings["80CFileName"]);
                fields = JsonConvert.DeserializeObject<List<TemplateFields>>(File.ReadAllText(file));
                fieldsData.Add("80C", fields);
                file = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Files", ConfigurationManager.AppSettings["OthersFileName"]);
                fields = JsonConvert.DeserializeObject<List<TemplateFields>>(File.ReadAllText(file));
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
