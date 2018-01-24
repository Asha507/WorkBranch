using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using FluentNHibernate.Mapping;
using NHibernate.Caches.Redis.Example.Entities;

namespace NHibernate.Caches.Redis.Example.Mapping
{
    public class StudentMap : ClassMap<Student>
    {
        public StudentMap()
        {
            Id(x => x.Id);

            Map(x => x.Name);

            Map(x => x.Class);

            Table("Student");

            Cache.ReadOnly();
        }
    }
}
