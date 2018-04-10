using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace RepairShopAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RepairController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage AddRepairData()
        {
            var httpRequest = HttpContext.Current.Request;
            using (RepairShopEntities db=new RepairShopEntities())
            {
                RepairData data = JsonConvert.DeserializeObject<RepairData>(httpRequest.Params["RepairData"]);                
                db.RepairDatas.Add(data);
                db.SaveChanges();
            }

            return Request.CreateResponse(HttpStatusCode.OK, "Inserted Record");
        }

        [HttpGet]
        public HttpResponseMessage GetRepairs()
        {
            using (RepairShopEntities db=new RepairShopEntities())
            {
                List<RepairData> repairData=db.RepairDatas.Where(x => x.ClaimStatus == "New").ToList();
                return Request.CreateResponse(HttpStatusCode.OK, JsonConvert.SerializeObject(repairData));
            }
            
        }

        [HttpPost]
        public HttpResponseMessage UpdateStatus()
        {
            var httpRequest=HttpContext.Current.Request;
            var claimNumber = httpRequest.Params["ClaimNumber"];
            try
            {
                using (RepairShopEntities db = new RepairShopEntities())
                {
                    RepairData repairData = db.RepairDatas.Where(x => x.ClaimNumber == claimNumber).FirstOrDefault();
                    repairData.ClaimStatus = httpRequest.Params["Status"];
                    db.SaveChanges();
                    return Request.CreateResponse(HttpStatusCode.OK, "Updated");
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
