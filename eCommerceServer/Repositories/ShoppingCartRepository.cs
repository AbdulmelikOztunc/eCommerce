using eCommerceServer.Context;
using eCommerceServer.Models;
using Microsoft.EntityFrameworkCore;

namespace eCommerceServer.Repositories;

public class ShoppingCartRepository
{
    private ApplicationDbContext _context;

    public ShoppingCartRepository()
    {
        _context = new();
    }
    public IEnumerable<ShoppingCart> GetAllByUserId(int userId)
    {
        return
            _context.ShoppingCarts.
            Where(p => p.UserId == userId)
            .Include(p => p.Product).ToList();
    }
    public ShoppingCart? GetByUserIdAndProductId(int userId,int productId)
    {
        return _context.ShoppingCarts
            .Where(p => p.UserId == userId && p.ProductId == productId).FirstOrDefault();
    }
    public void Add(ShoppingCart cart)
    {
        _context.ShoppingCarts.Add(cart);
       _context.SaveChanges();
    }
    public void Update(ShoppingCart cart)
    {
        _context.ShoppingCarts.Update(cart);
        _context.SaveChanges();
    }
    public void Remove(ShoppingCart cart)
    {
        _context.ShoppingCarts.Remove(cart);
        _context.SaveChanges();
    }
    public ShoppingCart? GetById(int Id)
    {
        return _context.ShoppingCarts.
            Find(Id);      
    }
    public void RemoveRange(IEnumerable<ShoppingCart> cart) 
    {
        _context.RemoveRange(cart);
        _context.SaveChanges();
    }
}
