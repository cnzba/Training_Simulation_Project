using CBA_Training.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CBA_Training.Services
{
    public interface IDepartmentService
    {
        Task<List<Department>> GetAllDepartment();

        Task<Department> GetDepartmentById(int id);

        Task<bool> DeleteDepartment(int id);

        Task<bool> UpdateDepartment(int id, Department objDept);

        Task<bool> AddDepartment(Department objDept);
       
        Task<bool> CheckDepartmentExist(string department,int id=0);

    }
}
