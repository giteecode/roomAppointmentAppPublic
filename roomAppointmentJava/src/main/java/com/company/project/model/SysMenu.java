package com.company.project.model;

import com.company.project.common.PageParam;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Table(name = "t_sys_menu")
public class SysMenu extends PageParam implements Serializable {
    /**
     * 记录ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 创建时间
     */
    @Column(name = "created_at")
    private Date createdAt;

    /**
     * 创建人
     */
    @Column(name = "created_by")
    private String createdBy;

    /**
     * 更新时间
     */
    @Column(name = "updated_at")
    private Date updatedAt;

    /**
     * 修改人
     */
    @Column(name = "updated_by")
    private String updatedBy;

    /**
     * 是否删除(0false未删除 1true已删除)
     */
    @Column(name = "is_delete")
    private Boolean isDelete;

    /**
     * 版本号
     */
    private Integer version;

    /**
     * 业务状态是否默认(1是)
     */
    private Integer status;

    /**
     * 角色id
     */
    @Column(name = "parent_id")
    private Long parentId;

    /**
     * 菜单名称
     */
    private String name;

    /**
     * 菜单URL
     */
    @Column(name = "link_url")
    private String linkUrl;

    /**
     * 菜单图片url
     */
    @Column(name = "image_url")
    private String imageUrl;

    /**
     * 是否禁用（0启用1禁用）
     */
    @Column(name = "enable_flag")
    private Boolean enableFlag;

    /**
     * 排序
     */
    @Column(name = "sort_id")
    private Integer sortId;

    /**
     * 获取记录ID
     *
     * @return id - 记录ID
     */
    public Long getId() {
        return id;
    }

    /**
     * 设置记录ID
     *
     * @param id 记录ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * 获取创建时间
     *
     * @return created_at - 创建时间
     */
    public Date getCreatedAt() {
        return createdAt;
    }

    /**
     * 设置创建时间
     *
     * @param createdAt 创建时间
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    /**
     * 获取创建人
     *
     * @return created_by - 创建人
     */
    public String getCreatedBy() {
        return createdBy;
    }

    /**
     * 设置创建人
     *
     * @param createdBy 创建人
     */
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    /**
     * 获取更新时间
     *
     * @return updated_at - 更新时间
     */
    public Date getUpdatedAt() {
        return updatedAt;
    }

    /**
     * 设置更新时间
     *
     * @param updatedAt 更新时间
     */
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    /**
     * 获取修改人
     *
     * @return updated_by - 修改人
     */
    public String getUpdatedBy() {
        return updatedBy;
    }

    /**
     * 设置修改人
     *
     * @param updatedBy 修改人
     */
    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    /**
     * 获取是否删除(0false未删除 1true已删除)
     *
     * @return is_delete - 是否删除(0false未删除 1true已删除)
     */
    public Boolean getIsDelete() {
        return isDelete;
    }

    /**
     * 设置是否删除(0false未删除 1true已删除)
     *
     * @param isDelete 是否删除(0false未删除 1true已删除)
     */
    public void setIsDelete(Boolean isDelete) {
        this.isDelete = isDelete;
    }

    /**
     * 获取版本号
     *
     * @return version - 版本号
     */
    public Integer getVersion() {
        return version;
    }

    /**
     * 设置版本号
     *
     * @param version 版本号
     */
    public void setVersion(Integer version) {
        this.version = version;
    }

    /**
     * 获取业务状态是否默认(1是)
     *
     * @return status - 业务状态是否默认(1是)
     */
    public Integer getStatus() {
        return status;
    }

    /**
     * 设置业务状态是否默认(1是)
     *
     * @param status 业务状态是否默认(1是)
     */
    public void setStatus(Integer status) {
        this.status = status;
    }

    /**
     * 获取角色id
     *
     * @return parent_id - 角色id
     */
    public Long getParentId() {
        return parentId;
    }

    /**
     * 设置角色id
     *
     * @param parentId 角色id
     */
    public void setParentId(Long parentId) {
        this.parentId = parentId;
    }

    /**
     * 获取菜单名称
     *
     * @return name - 菜单名称
     */
    public String getName() {
        return name;
    }

    /**
     * 设置菜单名称
     *
     * @param name 菜单名称
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取菜单URL
     *
     * @return link_url - 菜单URL
     */
    public String getLinkUrl() {
        return linkUrl;
    }

    /**
     * 设置菜单URL
     *
     * @param linkUrl 菜单URL
     */
    public void setLinkUrl(String linkUrl) {
        this.linkUrl = linkUrl;
    }

    /**
     * 获取菜单图片url
     *
     * @return image_url - 菜单图片url
     */
    public String getImageUrl() {
        return imageUrl;
    }

    /**
     * 设置菜单图片url
     *
     * @param imageUrl 菜单图片url
     */
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    /**
     * 获取是否禁用（0启用1禁用）
     *
     * @return enable_flag - 是否禁用（0启用1禁用）
     */
    public Boolean getEnableFlag() {
        return enableFlag;
    }

    /**
     * 设置是否禁用（0启用1禁用）
     *
     * @param enableFlag 是否禁用（0启用1禁用）
     */
    public void setEnableFlag(Boolean enableFlag) {
        this.enableFlag = enableFlag;
    }

    /**
     * 获取排序
     *
     * @return sort_id - 排序
     */
    public Integer getSortId() {
        return sortId;
    }

    /**
     * 设置排序
     *
     * @param sortId 排序
     */
    public void setSortId(Integer sortId) {
        this.sortId = sortId;
    }
}
