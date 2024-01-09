using eCommerceServer.Context;
using eCommerceServer.Models;

namespace eCommerceServer.Repositories;

public class ProductRepository
{
    private ApplicationDbContext _context;

    public ProductRepository()
    {
        _context = new();
    }
    public IEnumerable<Product> GetAll()
    {
        return _context.Products.OrderBy(p => p.Name).ToList();
    } 
    
}
