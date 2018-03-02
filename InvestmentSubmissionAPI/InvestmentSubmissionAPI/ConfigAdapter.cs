using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace InvestmentSubmissionAPI
{
    public static class ConfigAdapter
    {
        public static string SecretWebApiKey
        {
            get { return WebConfigurationManager.AppSettings["SecretWebApiKey"]; }
        }

        public static string SecretClientKey
        {
            get { return WebConfigurationManager.AppSettings["SecretClientKey"]; }
        }

        public static string AES_IV
        {
            get { return WebConfigurationManager.AppSettings["AES_IV"]; }
        }

        public static string AES_KEY
        {
            get { return WebConfigurationManager.AppSettings["AES_KEY"]; }
        }

        public static bool ValidateAudience
        {
            get { return bool.Parse(WebConfigurationManager.AppSettings["ValidateAudience"]); }
        }

        public static string EventLogName
        {
            get { return WebConfigurationManager.AppSettings["EventLogName"]; }
        }

        public static string RunAsClientUser
        {
            get { return WebConfigurationManager.AppSettings["RunAsClientUser"]; }
        }

        public static string ApplicationName
        {
            get { return WebConfigurationManager.AppSettings["ApplicationName"]; }
        }

        public static string ApplicationRunningOn
        {
            get { return WebConfigurationManager.AppSettings["ApplicationRunningOn"]; }
        }

        public static string TokenIssuer
        {
            get { return WebConfigurationManager.AppSettings["TokenIssuer"]; }
        }

        public static string TokenAudience
        {
            get { return WebConfigurationManager.AppSettings["TokenAudience"]; }
        }

        public static bool ValidateIssuer
        {
            get { return bool.Parse(WebConfigurationManager.AppSettings["ValidateIssuer"]); }
        }
    }
}