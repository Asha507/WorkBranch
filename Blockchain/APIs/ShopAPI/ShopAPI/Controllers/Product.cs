namespace ShopAPI.Controllers
{
    public class Product
    {
        public string Item { get; set; }
        public string Name { get; set; }
        public string Model { get; set; }
        public string Cost { get; set; }
        public string SerialNumber { get; set; }
        public ProductInsuranceModel InsuranceRecord { get; set; }
    }
}