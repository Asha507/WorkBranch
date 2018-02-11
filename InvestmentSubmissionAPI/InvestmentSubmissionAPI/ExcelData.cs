using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace InvestmentSubmissionAPI
{
    public class ExcelData
    {
        public string _vamID { get; set; }
        public string _lic { get; set; }
        public string _ppf { get; set; }
        public string _ncf { get; set; }
        public string _80ccc { get; set; }
        public string _80d { get; set; }
        public string _80e { get; set; }
        public bool _status { get; set; }
        public DateTime _submissionDate { get; set; }
        public DateTime _verifiedDate { get; set; }
        public string _name { get; set; }

    }
}