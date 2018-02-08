using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
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
            HttpResponseMessage response = new HttpResponseMessage();
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                foreach (string file in httpRequest.Files)
                {
                    var postedFile = httpRequest.Files[file];
                    var filePath =ConfigurationManager.AppSettings["FilesShareLocation"];
                    string folderName = "VAM_"+httpRequest.Params["VamID"];
                    string fileName = httpRequest.Params["FileType"] + "_"+postedFile.FileName;
                    if(!Directory.Exists(Path.Combine(filePath,folderName)))
                    {
                        Directory.CreateDirectory(Path.Combine(filePath, folderName));
                    }
                    if(File.Exists(Path.Combine(filePath, folderName, fileName)))
                    {
                        File.Delete(Path.Combine(filePath, folderName, fileName));
                    }
                    postedFile.SaveAs(Path.Combine(filePath,folderName,fileName));
                }
              }
            return response;
        }
    }
}
