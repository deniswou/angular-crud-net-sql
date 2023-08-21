using bk_angular_crud_tc.Models;
using Microsoft.EntityFrameworkCore;

namespace bk_angular_crud_tc
{
    public class AplicationDbContext: DbContext
    {
        public DbSet<TarjetaCredito> TarjetaCredito { get; set; }
        public AplicationDbContext(DbContextOptions<AplicationDbContext> options): base(options) 
        {

        }
    }
}
