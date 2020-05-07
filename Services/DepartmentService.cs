using AutoMapper;
using CBA_Training.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CBA_Training.Services
{
    public class DepartmentService : IDepartmentService
    {
        private readonly ILogger<DepartmentService> _logger;
        private readonly CBATrainingContext _dbContext; //Used to work with database.
        private readonly IMapper _mapper; // Used to map values from one obkect to other object.

        public DepartmentService(ILogger<DepartmentService> logger, CBATrainingContext dbContext, IMapper mapper)
        {
            _logger = logger;
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<bool> AddDepartment(Department objDept)
        {
            try
            {
                Department dept = _mapper.Map<Department>(objDept); //Maping valuse
                _dbContext.Add<Department>(dept);
                return await _dbContext.SaveChangesAsync() > 0;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, "AddDepartment");
                throw ex;
            }
        }

        public async Task<bool> DeleteDepartment(int id)
        {
            try
            {
                Department dept = await GetDepartmentById(id);
                _dbContext.Remove<Department>(dept);
                return await _dbContext.SaveChangesAsync() > 0; //If affected rows are greater than one than it will return true.
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, "DeleteDepartment");
                throw ex;
            }
        }

        public async Task<List<Department>> GetAllDepartment()
        {
            return await _dbContext.Department.ToListAsync();
        }

        public async Task<Department> GetDepartmentById(int id)
        {
            return await _dbContext.Department.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> UpdateDepartment(int id, Department objDept)
        {
            try
            {
                Department dept = await GetDepartmentById(id);
                dept.Name = objDept.Name;
                dept.Description = objDept.Description;
                int count = await _dbContext.SaveChangesAsync();
                if (count > 0)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, "UpdateDepartment");
                throw ex;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="department"></param>
        /// <param name="id">it is an optional parameter. It is used to check for update record.</param>
        /// <returns></returns>
        public async Task<bool> CheckDepartmentExist(string department, int id = 0)
        {
            if (await _dbContext.Department.FirstOrDefaultAsync(x => x.Name == department && x.Id != id) == null)
                return false;
            else return true;

        }
    }
}
