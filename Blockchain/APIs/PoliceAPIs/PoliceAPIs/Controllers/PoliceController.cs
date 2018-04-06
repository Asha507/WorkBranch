using Newtonsoft.Json;
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
    public class PoliceController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage TheftDetails()
        {
            var httpRequest = HttpContext.Current.Request;
            var x = JsonConvert.DeserializeObject<TheftData>(httpRequest.Params["Data"]);
            using (PoliceEntities db = new PoliceEntities())
            {
                
                TheftData theftDetails = JsonConvert.DeserializeObject<TheftData>(httpRequest.Params["Data"]);
                db.TheftDatas.Add(theftDetails);
                db.SaveChanges();
            }
                return Request.CreateResponse(HttpStatusCode.OK, "");
        }

        [HttpGet]
        public HttpResponseMessage GetTheftDetails()
        {
            using (PoliceEntities db = new PoliceEntities())
            {
                List<TheftData> theftData = db.TheftDatas.ToList();
                return Request.CreateResponse(HttpStatusCode.OK, JsonConvert.SerializeObject(theftData));
            }                
        }

    }
}
