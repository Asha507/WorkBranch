using DataAccessLayer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class DatabaseOperations
    {
        public List<Student> SelectAll()
        {
            SampleEntities ctx = new SampleEntities();

            var query = from p in ctx.Students
                        select p;

            return query.ToList();

        }
    }
}
