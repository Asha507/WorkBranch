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
            }
            return Request.CreateResponse(HttpStatusCode.OK, "Completed");
        }
    }
}
