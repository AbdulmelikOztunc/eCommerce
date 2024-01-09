using eCommerceServer.Context;
using eCommerceServer.Models;
using Microsoft.EntityFrameworkCore;

namespace eCommerceServer.Repositories;

public class OrderRepository
{
    private ApplicationDbContext _context;
    public OrderRepository()
    {
        _context = new ApplicationDbContext();
    }
    public IEnumerable<Order> GetAllByUserId(int userId)
    {
        return _context.Orders.Where(u=>u.UserId==userId).Include(o=>o.Details)!.ThenInclude(p=>p.Product).OrderByDescending(p=>p.Id).ToList();
    } 
    public void Add(Order order)
    {
        _context.Orders.Add(order);
        _context.SaveChanges();
    }    
}
