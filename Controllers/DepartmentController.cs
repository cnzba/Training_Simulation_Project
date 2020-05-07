using CBA_Training.Entities;
using CBA_Training.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CBA_Training.Controllers
{
    //[ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _deptService;
        public DepartmentController(IDepartmentService deptService)
        {
            _deptService = deptService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDepartment()
        {
            var deptList = await _deptService.GetAllDepartment();
            return Ok(deptList);
        }

        // GET api/department/2
        [HttpGet("{id}")]
        public async Task<ActionResult<Department>> GetDepartmentById(int id)
        {
            if (id == 0) return BadRequest("Id cannnot be zero..!!");
            var deptList = await _deptService.GetDepartmentById(id);
            return Ok(deptList);
        }

        // Delete api/department/2
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteDepartment(int id)
        {
            try
            {
                if (id == 0) return BadRequest("Id cannnot be zero..!!");

                Department objDepat = await _deptService.GetDepartmentById(id);
                if (objDepat != null)
                {
                    bool result = await _deptService.DeleteDepartment(id);
                    if (result)
                        return Ok("Department deleted successfully..!!");
                    else
                        return BadRequest("Error occured duing deleting department..!!");
                }
                return BadRequest("Department is not available..!!");
            }
            catch (System.Exception ex)
            {
                return BadRequest("Error occured during deleting department..!!" + ex.Message);
            }
        }

        // Put api/department/2
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateDepartment([FromRoute]int id, [FromBody]Department objDept)
        {

            try
            {
                if (id == 0) return BadRequest("Id cannnot be zero..!!");

                Department objDepat = await _deptService.GetDepartmentById(id);
                if (objDepat != null)
                {
                    if (await _deptService.CheckDepartmentExist(objDept.Name))
                        return BadRequest("Department already exist..!!");

                    bool result = await _deptService.UpdateDepartment(id, objDept);
                    if (result)
                        return Ok("Department details have been updated successfully..!!");
                    else
                        return BadRequest("Error occured during updating department..!!");
                }
                return BadRequest("Department is not available..!!");
            }
            catch (System.Exception ex)
            {
                return BadRequest("Error occured during updating department..!!" + ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult> AddDepartment([FromBody]Department objDept)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest("Invalid details");

                if (await _deptService.CheckDepartmentExist(objDept.Name))
                    return BadRequest("Department already exist..!!");

                bool result = await _deptService.AddDepartment(objDept);
                if (result)
                    return Ok("Department added successfully..!!");
                else
                    return BadRequest("Error occured during adding department..!!");
            }
            catch (System.Exception ex)
            {
                return BadRequest("Error occured during adding department..!!" + ex.Message);
            }
        }
    }
}