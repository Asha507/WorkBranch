using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace InsuranceCompanyAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ClaimsController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage NewClaim()
        {
            Claim claim;
            var httpRequest = HttpContext.Current.Request;
            using (InsuranceCompanyEntities db=new InsuranceCompanyEntities() )
            {
                 claim = new Claim();
                claim.UBN = httpRequest.Params["UBN"];
                claim.ClaimNumber = Guid.NewGuid().ToString();
                claim.CreationDate = DateTime.Now.ToString();
                claim.TheftProtection = httpRequest.Params["theft"];
                claim.Description = httpRequest.Params["Desciption"];
                claim.claimstatus = httpRequest.Params["Status"];
                claim.reimbursable = "0";
                db.Claims.Add(claim);
                db.SaveChanges();
            }
            return Request.CreateResponse(HttpStatusCode.OK, claim.ClaimNumber);
        }
    }
}
