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
    
    public partial class ProductInsureLoginDetail
    {
        public string UBN { get; set; }
        public string UserName { get; set; }
        public string C_password { get; set; }
    
        public virtual ProductDetail ProductDetail { get; set; }
    }
}