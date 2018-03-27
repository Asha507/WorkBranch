using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BlockChainAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BlockChainController : ApiController
    {

        [HttpPost]
        public HttpResponseMessage AddBlock()
        {
            var httpRequest = HttpContext.Current.Request;
            var peer = httpRequest.Params["Peer"];
            var ubn = httpRequest.Params["UBN"];
            object details = JsonConvert.DeserializeObject<object>(httpRequest.Params["Data"]);
            Block block = new Block(1,ubn,peer,details,null);
           // InsertProductDetails(productdetails);
            return Request.CreateResponse(HttpStatusCode.OK, "Added Block");
        }
      
    }
}
