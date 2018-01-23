using HibernatingRhinos.Profiler.Appender.NHibernate;
using NHibernate.Cache;
using NHibernate.Cfg;
using NHibernate.Dialect;
using NHibernate.Driver;
using NHibernate.Stat;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace NHibernateDemoApp
{
    class Program
    {
        static void Main(string[] args)
        {

            NHibernateProfiler.Initialize();

            var cfg = new Configuration();


            cfg.Configure();

            cfg.Cache(c =>
            {
                c.UseMinimalPuts = true;
                c.UseQueryCache = true;
            });

            cfg.SessionFactory().Caching.Through<HashtableCacheProvider>()
               .WithDefaultExpiration(1440);

            var sefact = cfg.BuildSessionFactory();

            var stats = sefact.Statistics;
            var status = stats.IsStatisticsEnabled;
            printStats(stats, 0);

            var session = sefact.OpenSession();
            var anotherSession = sefact.OpenSession();

            var transaction = session.BeginTransaction();
            var anothertransaction = anotherSession.BeginTransaction();

            Student studentUsingTheFirstQuery = session.Get<Student>("1");

            printData(studentUsingTheFirstQuery, stats, 1);

            studentUsingTheFirstQuery = session.Get<Student>("1");

            printData(studentUsingTheFirstQuery, stats, 2);

            session.Evict(studentUsingTheFirstQuery);

            studentUsingTheFirstQuery = session.Get<Student>("1");

            printData(studentUsingTheFirstQuery, stats, 3);

            studentUsingTheFirstQuery = session.Get<Student>("1");

            printData(studentUsingTheFirstQuery, stats, 4);

            studentUsingTheFirstQuery = anotherSession.Get<Student>("1");

            printData(studentUsingTheFirstQuery, stats, 5);


        }

        private static void printData(Student studentUsingTheFirstQuery, IStatistics stats, int count)
        {
            Console.WriteLine(count + ":: Name=" + studentUsingTheFirstQuery.Name + ", class=" + studentUsingTheFirstQuery.Class);
            printStats(stats, count);
        }

        private static void printStats(IStatistics stats, int i)
        {
            Console.WriteLine("***** " + i + " *****");
            Console.WriteLine("Fetch Count=" + stats.EntityFetchCount);
            Console.WriteLine("Second Level Hit Count=" + stats.SecondLevelCacheHitCount);
            Console.WriteLine("Second Level Miss Count=" + stats.SecondLevelCacheMissCount);
            Console.WriteLine("Second Level Put Count=" + stats.SecondLevelCachePutCount);
        }
    }
}

