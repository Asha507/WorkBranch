using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


namespace EFRedis
{
    public partial class _Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            DatabaseOperations dal = new DatabaseOperations();
            GridView1.DataSource = dal.SelectAll();
            GridView1.DataBind();
        }
    }
}