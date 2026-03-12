using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CNCarpinteria.Application.DTOs;

public class CreateImageDto
{
    public string Url { get; set; } = string.Empty;

    public string? Description { get; set; }

    public Guid CategoryId { get; set; }
}
