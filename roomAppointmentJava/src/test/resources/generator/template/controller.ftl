package ${basePackage}.web;
import ${basePackage}.core.Result;
import ${basePackage}.core.ResultGenerator;
import ${basePackage}.model.${modelNameUpperCamel};
import ${basePackage}.service.${modelNameUpperCamel}Service;
import ${basePackage}.common.BaseController;
import io.swagger.annotations.Api;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.web.bind.annotation.*;
import io.swagger.annotations.ApiOperation;

import javax.annotation.Resource;
import java.util.List;
import java.util.Date;

@RestController
@RequestMapping("${baseRequestMapping}")
@Api(tags = {"${baseRequestMapping}"}, description = "管理模块")
public class ${modelNameUpperCamel}Controller extends BaseController{
    @Resource
    private ${modelNameUpperCamel}Service ${modelNameLowerCamel}Service;

    @ApiOperation(value = "新增", notes = "新增")
    @RequestMapping(value = "/add", method = {RequestMethod.POST})
    public Result add(@RequestBody ${modelNameUpperCamel} ${modelNameLowerCamel}) {
        ${modelNameLowerCamel}.setCreatedAt(new Date());
        ${modelNameLowerCamel}.setIsDelete(false);
        ${modelNameLowerCamel}.setCreatedBy(super.getUserId());
        ${modelNameLowerCamel}Service.save(${modelNameLowerCamel});
        Result result=ResultGenerator.genSuccessResult();
        result.setData(${modelNameLowerCamel});
        return result;
    }

    @ApiOperation(value = "删除", notes = "删除")
    @RequestMapping(value = "/delete", method = {RequestMethod.POST})
    public Result delete(@RequestParam Long id) {
        ${modelNameUpperCamel} ${modelNameLowerCamel}=new ${modelNameUpperCamel}();
        ${modelNameLowerCamel}.setId(id);
        ${modelNameLowerCamel}.setIsDelete(true);
        ${modelNameLowerCamel}Service.update(${modelNameLowerCamel});
        return ResultGenerator.genSuccessResult();
    }

    @ApiOperation(value = "修改", notes = "修改")
    @RequestMapping(value = "/update", method = {RequestMethod.POST})
    public Result update(@RequestBody ${modelNameUpperCamel} ${modelNameLowerCamel}) {
        ${modelNameLowerCamel}.setUpdatedAt(new Date());
        ${modelNameLowerCamel}Service.update(${modelNameLowerCamel});
        Result result=ResultGenerator.genSuccessResult();
        result.setData(${modelNameLowerCamel});
        return result;
    }

    @ApiOperation(value = "获取单个详情", notes = "获取单个详情")
    @RequestMapping(value = "/detail", method = {RequestMethod.POST})
    public Result detail(@RequestParam(value = "id", required = false) Long id) {
        if (null == id){
            return ResultGenerator.genSuccessResult(new ${modelNameUpperCamel}());
        }else {
            ${modelNameUpperCamel} ${modelNameLowerCamel} = ${modelNameLowerCamel}Service.findById(id);
            if (null == ${modelNameLowerCamel}){
                return ResultGenerator.genSuccessResult(new ${modelNameUpperCamel}());
            }else {
                return ResultGenerator.genSuccessResult(${modelNameLowerCamel});
            }
        }
    }

    @ApiOperation(value = "分页查询", notes = "分页查询")
    @RequestMapping(value = "/findByModal", method = {RequestMethod.POST})
    public Result list(@RequestBody(required =false) ${modelNameUpperCamel} ${modelNameLowerCamel}) {

        if (null == ${modelNameLowerCamel}){
            ${modelNameLowerCamel} = new ${modelNameUpperCamel}();
        }

        PageHelper.startPage(${modelNameLowerCamel}.getPage() == null ? 0 : ${modelNameLowerCamel}.getPage(), ${modelNameLowerCamel}.getLimit() == null ? 10 : ${modelNameLowerCamel}.getLimit());
        ${modelNameLowerCamel}.setIsDelete(false);
        List<${modelNameUpperCamel}> list = ${modelNameLowerCamel}Service.findByModel(${modelNameLowerCamel});
        PageInfo pageInfo = new PageInfo(list);
        return ResultGenerator.genSuccessResult(pageInfo);
    }
}
