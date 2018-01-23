using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class DatabaseOperations
    {
        public List<MappingData> SelectAll()
        {
            FMICEntities ctx = new FMICEntities();

            var query = from p in ctx.MappingDatas
                        select p;

            return query.ToList();

        }
    }
}
