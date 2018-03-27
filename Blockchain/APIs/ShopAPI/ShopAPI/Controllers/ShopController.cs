using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ShopAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ShopController : ApiController
    {
        [HttpPost]
        public HttpResponseMessage SaveData()
        {
            var httpRequest = HttpContext.Current.Request;
            Product productdetails = JsonConvert.DeserializeObject<Product>(httpRequest.Params["ShopData"]);
            string UBN = InsertProductDetails(productdetails);

            return Request.CreateResponse(HttpStatusCode.OK, UBN);
        }

        private string InsertProductDetails(Product productdetails)
        {

            ProductDetail details = new ProductDetail();
            details.Item = productdetails.Item;
            details.Name = productdetails.Name;
            details.Model = productdetails.Model;
            details.Cost = productdetails.Cost;
            details.SerialNumber = productdetails.SerialNumber;
            details.UBN = Guid.NewGuid().ToString();

            ProductInsuranceDetail insuranceDetail = new ProductInsuranceDetail();
            insuranceDetail.UBN = details.UBN;
            insuranceDetail.C_contract = productdetails.InsuranceRecord.Contract;
            insuranceDetail.DailyPrice = productdetails.InsuranceRecord.DailyPrice;
            insuranceDetail.ContractTerms = productdetails.InsuranceRecord.ContractTerms;
            insuranceDetail.FirstName = productdetails.InsuranceRecord.FirstName;
            insuranceDetail.LastName = productdetails.InsuranceRecord.LastName;
            insuranceDetail.Email = productdetails.InsuranceRecord.Email;
            insuranceDetail.theftProtection = productdetails.InsuranceRecord.TheftProtection;
            insuranceDetail.StartDate = productdetails.InsuranceRecord.StartDate;
            insuranceDetail.LastDate = productdetails.InsuranceRecord.LastDate;

            ProductInsureLoginDetail loginDetails = new ProductInsureLoginDetail();
            loginDetails.UBN = details.UBN;
            loginDetails.UserName = insuranceDetail.FirstName;
            loginDetails.C_password = details.UBN.Substring(3, 7);

            details.ProductInsuranceDetail = insuranceDetail;
            details.ProductInsureLoginDetail = loginDetails;

            using (ShopEntities db = new ShopEntities())
            {
                db.ProductDetails.Add(details);
                db.SaveChanges();
            }

            return details.UBN;
        }
    }
}
