using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace PoliceAPIs.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class StatusController : ApiController
    {

        [HttpPost]
        public HttpResponseMessage UpdateTheftDetails()
        {
            try
            {
                var httpRequest = HttpContext.Current.Request;
                string claimNumber = httpRequest.Params["ClaimNumber"];
                using (PoliceEntities db = new PoliceEntities())
                {
                    TheftData data = db.TheftDatas.Where(x => x.ClaimNumber == claimNumber).FirstOrDefault();
                    if (data != null)
                    {
                        data.firStatus = httpRequest.Params["Status"];
                        data.FIRNumber = httpRequest.Params["FirNumber"];
                        db.SaveChanges();
                    }
                    return Request.CreateResponse(HttpStatusCode.OK, "Updated Claim Status");
                }
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
