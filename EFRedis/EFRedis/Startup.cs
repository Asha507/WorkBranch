using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EFRedis.Startup))]
namespace EFRedis
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
