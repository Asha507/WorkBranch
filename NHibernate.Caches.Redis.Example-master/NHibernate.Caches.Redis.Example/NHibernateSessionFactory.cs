using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using FluentNHibernate.Conventions.Helpers;
using NHibernate.Caches.Redis.Example.Entities;
using NHibernate.Cfg;
using NHibernate.Tool.hbm2ddl;

namespace NHibernate.Caches.Redis.Example
{
    public class NHibernateSessionFactory
    {
        private static ISessionFactory _sessionFactory;

        public static ISessionFactory SessionFactory
        {
            get
            {
                if (_sessionFactory == null)
                    GetFactory();

                return _sessionFactory;
            }
        }

        private static readonly object Padlock = new object();

        private static ISessionFactory GetFactory()
        {
            lock (Padlock)
            {
                if (_sessionFactory == null)
                {
                    try
                    {
                        var connString = ConfigurationSettings.AppSettings["DB"];

                        var configuration = Fluently.Configure()
                            .Database(MsSqlConfiguration.MsSql2008.ConnectionString(connString).ShowSql())
                            .Mappings(m => m.FluentMappings.AddFromAssemblyOf<Student>());

                        if (ConfigurationSettings.AppSettings["IsSetupDb"] == "1")
                        {
                            configuration.ExposeConfiguration(cfg => new SchemaExport(cfg).Create(true, true));
                        }
                        if (ConfigurationSettings.AppSettings["IsCacheable"] == "1")
                        {
                            configuration.Cache(c => c.UseQueryCache().UseSecondLevelCache().ProviderClass<RedisCacheProvider>());
                        }
                        configuration.ExposeConfiguration(c => c.SetProperty("generate_statistics", "true"));
                        _sessionFactory =  configuration.BuildSessionFactory();
                    }
                    catch (Exception exc)
                    {
                        throw new Exception("Bağlantı sağlanamadı.", exc);
                    }
                }

            }

            return _sessionFactory;
        }

        public static ISession OpenSession()
        {
            return SessionFactory.OpenSession();
        }


    }
}

