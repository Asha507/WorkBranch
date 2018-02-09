using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace InvestmentSubmissionAPI
{
    public class TemplateFields
    {
        public string SNO { get;  set; }
        public string Section { get; set; }
        public string Name { get; set; }    
        public string Placeholder { get; set; }
        public string FileName { get; set; }
        public string Amount { get; set; }
        public dynamic FileInfo { get; set; }
        public dynamic AdditionalInfo { get; set; }

    }
}