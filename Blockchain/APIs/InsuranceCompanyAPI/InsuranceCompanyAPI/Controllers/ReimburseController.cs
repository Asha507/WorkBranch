using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace InsuranceCompanyAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ReimburseController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage ReimburseClaim()
        {
            var httpRequest = HttpContext.Current.Request;
            var claimNumber = httpRequest.Params["ClaimNumber"];
            using (InsuranceCompanyEntities db = new InsuranceCompanyEntities())
            {
               Claim claim= db.Claims.Where(x => x.ClaimNumber == claimNumber).FirstOrDefault();
                if(claim !=null)
                {
                    claim.claimstatus = httpRequest.Params["Status"];
                    claim.reimbursable = httpRequest.Params["Amount"];
                    db.SaveChanges();
                }
            }
            return Request.CreateResponse(HttpStatusCode.OK, "Completed");
        }
    }
}
