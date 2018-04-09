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
    public class PoliceController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage UpdateClaim()
        {
            var httpRequest = HttpContext.Current.Request;
            using (InsuranceCompanyEntities db = new InsuranceCompanyEntities())
            {
                try
                {
                    string claimNumber = httpRequest.Params["ClaimNumber"];
                    Claim claim = db.Claims.Where(x => x.ClaimNumber == claimNumber).FirstOrDefault();
                    if (claim != null)
                    {
                        claim.claimstatus = httpRequest.Params["Status"];
                        db.SaveChanges();
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, "Updated Claim Status");
                }
                catch (System.Data.Entity.Validation.DbEntityValidationException dbEx)
                {
                    Exception raise = dbEx;
                    foreach (var validationErrors in dbEx.EntityValidationErrors)
                    {
                        foreach (var validationError in validationErrors.ValidationErrors)
                        {
                            string message = string.Format("{0}:{1}",
                                validationErrors.Entry.Entity.ToString(),
                                validationError.ErrorMessage);
                            // raise a new exception nesting
                            // the current instance as InnerException
                            raise = new InvalidOperationException(message, raise);
                        }
                    }
                    throw raise;
                }
              
            }
        }

      
    }
}
