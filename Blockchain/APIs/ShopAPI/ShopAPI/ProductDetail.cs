//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ShopAPI
{
    using System;
    using System.Collections.Generic;
    
    public partial class ProductDetail
    {
        public string Item { get; set; }
        public string Name { get; set; }
        public string Model { get; set; }
        public string Cost { get; set; }
        public string SerialNumber { get; set; }
        public string UBN { get; set; }
    
        public virtual ProductInsuranceDetail ProductInsuranceDetail { get; set; }
        public virtual ProductInsureLoginDetail ProductInsureLoginDetail { get; set; }
    }
}