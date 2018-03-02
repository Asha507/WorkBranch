using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using log4net;

[assembly: OwinStartup(typeof(InvestmentSubmissionAPI.Startup))]

namespace InvestmentSubmissionAPI
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
