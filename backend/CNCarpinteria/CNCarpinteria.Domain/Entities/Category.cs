using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CNCarpinteria.Domain.Entities;

public class Category
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public string Slug { get; private set; }

    private Category() { } // EF Core necesita constructor vacío

    public Category(string name)
    {
        Id = Guid.NewGuid();
        Name = name;
        Slug = GenerateSlug(name);
    }

    private string GenerateSlug(string name)
    {
        return name
            .ToLower()
            .Replace(" ", "-");
    }

    public void Update(string name)
    {
        Name = name;
        Slug = GenerateSlug(name);
    }
}
