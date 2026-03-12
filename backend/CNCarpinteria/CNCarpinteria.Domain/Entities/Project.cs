using System;
using System.Collections.Generic;

namespace CNCarpinteria.Domain.Entities
{
    public class Project
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public Guid CategoryId { get; set; }

        public Category? Category { get; set; }

        public string CoverImageUrl { get; set; }

        public ICollection<Image>? Images { get; set; }
    }
}