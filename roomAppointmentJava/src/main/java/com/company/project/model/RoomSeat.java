package com.company.project.model;

import com.company.project.common.PageParam;

import javax.persistence.*;
import java.util.Date;

@Table(name = "t_room_seat")
public class RoomSeat extends PageParam {
    /**
     * 记录ID
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * 创建人
     */
    @Column(name = "created_by")
    private String createdBy;

    /**
     * 创建时间
     */
    @Column(name = "created_at")
    private Date createdAt;

    /**
     * 修改人
     */
    @Column(name = "updated_by")
    private String updatedBy;

    /**
     * 更新时间
     */
    @Column(name = "updated_at")
    private Date updatedAt;

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
     * 业务状态(0未售;1已售;2损坏)
     */
    private Integer status;

    /**
     * 横向座位数
     */
    @Column(name = "max_x")
    private Integer maxX;

    /**
     * 纵向座位数
     */
    @Column(name = "max_y")
    private Integer maxY;

    /**
     * 座位名称
     */
    private String name;

    /**
     * 自习室ID
     */
    @Column(name = "room_id")
    private Long roomId;

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
     * 获取业务状态(0未售;1已售;2损坏)
     *
     * @return status - 业务状态(0未售;1已售;2损坏)
     */
    public Integer getStatus() {
        return status;
    }

    /**
     * 设置业务状态(0未售;1已售;2损坏)
     *
     * @param status 业务状态(0未售;1已售;2损坏)
     */
    public void setStatus(Integer status) {
        this.status = status;
    }

    /**
     * 获取横向座位数
     *
     * @return max_x - 横向座位数
     */
    public Integer getMaxX() {
        return maxX;
    }

    /**
     * 设置横向座位数
     *
     * @param maxX 横向座位数
     */
    public void setMaxX(Integer maxX) {
        this.maxX = maxX;
    }

    /**
     * 获取纵向座位数
     *
     * @return max_y - 纵向座位数
     */
    public Integer getMaxY() {
        return maxY;
    }

    /**
     * 设置纵向座位数
     *
     * @param maxY 纵向座位数
     */
    public void setMaxY(Integer maxY) {
        this.maxY = maxY;
    }

    /**
     * 获取座位名称
     *
     * @return name - 座位名称
     */
    public String getName() {
        return name;
    }

    /**
     * 设置座位名称
     *
     * @param name 座位名称
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取自习室ID
     *
     * @return room_id - 自习室ID
     */
    public Long getRoomId() {
        return roomId;
    }

    /**
     * 设置自习室ID
     *
     * @param roomId 自习室ID
     */
    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }
}